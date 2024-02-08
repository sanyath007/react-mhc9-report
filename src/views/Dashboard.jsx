import React from 'react'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import StatCard from '../components/StatCard'

const Dashboard = () => {
    return (
        <div className="container py-3 px-4 w-full bg-white border">
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                {/* <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item> */}
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>

                {/* Stat Card */}
                <Row>
                    <Col md={4} className="max-md:mb-4">
                        <StatCard
                            title="จำนวนผู้เข้าร่วมโครงการ"
                            value={'1,400'}
                            bgColor={'bg-red-200'}
                        />
                    </Col>
                    <Col md={4} className="max-md:mb-4">
                        <StatCard
                            title="จำนวนผู้รับบริการ Max Pulse"
                            value={'500'}
                            bgColor={'bg-green-200'}
                        />
                    </Col>
                    <Col md={4} className="max-md:mb-4">
                        <StatCard
                            title="จำนวนผู้ตอบแบบประเมิน Mental Health Checkin"
                            value={'28,104'}
                            bgColor={'bg-indigo-200'}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Dashboard