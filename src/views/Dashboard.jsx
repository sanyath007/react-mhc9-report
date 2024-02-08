import React from 'react'
import { Col, Row } from 'react-bootstrap'
import StatCard from '../components/StatCard'

const Dashboard = () => {
    return (
        <div className="container p-5 border w-full">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            {/* Stat Card */}
            <Row>
                <Col md={3}>
                    <StatCard
                        title="จำนวนผู้เข้าร่วมโครงการ"
                        value={'1,400'}
                        bgColor={'bg-red-200'}
                    />
                </Col>
                <Col md={3}>
                    <StatCard
                        title="จำนวนผู้รับบริการ Max Pulse"
                        value={'500'}
                        bgColor={'bg-green-200'}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard