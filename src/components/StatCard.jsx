import React from 'react'
import { Card } from 'react-bootstrap'
import { FaUsers, FaArrowAltCircleRight } from "react-icons/fa"
import { Link } from 'react-router-dom'

const StatCard = ({ title, value, link, bgColor }) => {
    return (
        <Card className={bgColor}>
            <Card.Body>
                <div className="">
                    <div className="flex flex-row gap-2">
                        <div className="w-[75%]">
                            <h4 className="text-2xl font-bold">{value} ราย</h4>
                            <hr className="border-2" />
                            <p className="my-1 text-xs">{title}</p>
                        </div>
                        <div className="flex justify-center items-center p-2">
                            <FaUsers size={'60px'} />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center mt-2">
                        <Link to={link}>ดูรายละเอียด</Link>
                        <FaArrowAltCircleRight />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default StatCard