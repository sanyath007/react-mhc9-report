import React from 'react'
import { Navbar as BsNavbar, Container } from 'react-bootstrap'

const Navbar = () => {
    return (
        <BsNavbar bg="dark" data-bs-theme="dark">
            <Container>
                <BsNavbar.Brand className="px-2">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/f9/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%97%E0%B8%A3%E0%B8%A7%E0%B8%87%E0%B8%AA%E0%B8%B2%E0%B8%98%E0%B8%B2%E0%B8%A3%E0%B8%93%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.png"
                        alt="logo"
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                    />{' '}
                    <span className="font-bold">ศูนย์สุขภาพจิตที่ 9</span>
                </BsNavbar.Brand>
            </Container>
        </BsNavbar>
    )
}

export default Navbar