import React, { useEffect, useState } from 'react'
import { Pagination as BsPagination } from 'react-bootstrap'
import { range } from 'lodash'

const Pagination = ({ pager, onPageClick }) => {
    const [pageItems, setPageItems] = useState([]);

    useEffect(() => {
        if (parseInt(pager.currentPage)+6 >= pager.lastPage) {
            setPageItems(range(parseInt(pager.currentPage)-5, parseInt(pager.currentPage)+1))
        } else {
            setPageItems(range(parseInt(pager.currentPage), parseInt(pager.currentPage)+6))
        }
    }, [pager]);

    const handlePageClick = (page) => {
        onPageClick(`/api/checkins?page=${page}`);
    };

    return (
        <BsPagination>
            <BsPagination.First onClick={() => handlePageClick(1)} />
            <BsPagination.Prev disabled={pager.currentPage == 1} onClick={() => handlePageClick(parseInt(pager.currentPage)-1)} />
            {pageItems.map(page => (
                <BsPagination.Item
                    key={page}
                    onClick={() => handlePageClick(page)}
                    active={parseInt(pager.currentPage) === page}
                >
                    {page}
                </BsPagination.Item>
            ))}
            {parseInt(pager.currentPage) != pager.lastPage && <BsPagination.Ellipsis onClick={() => handlePageClick(parseInt(pager.currentPage)+6)} />}
            <BsPagination.Next disabled={pager.currentPage == pager.lastPage} onClick={() => handlePageClick(parseInt(pager.currentPage)+1)} />
            <BsPagination.Last onClick={() => handlePageClick(pager.lastPage)} />
        </BsPagination>
    )
}

export default Pagination
