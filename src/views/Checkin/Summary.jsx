import React from 'react'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckinSummary = () => {
    return (
        <div className="container py-3 px-4 w-full bg-white border">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Mental Health Checkin</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-3xl font-bold mb-2">Mental Health Checkin</h1>

                <div className="flex justify-end items-center mb-2">
                    <Link to="/checkins/follow-up" className="btn btn-danger">ติดตาม</Link>
                </div>
                <Row className='border'>
                    <Col>
                        
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CheckinSummary