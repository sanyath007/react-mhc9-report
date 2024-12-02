import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import Map from '../../components/Map'

const CheckinMap = () => {
    return (
        <div className="container py-3 px-4 w-full bg-white border">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/checkins">Mental Health Checkin</Breadcrumb.Item>
                <Breadcrumb.Item active>แผนที่กลุ่มเสี่ยง</Breadcrumb.Item>
            </Breadcrumb>

            <div className="content">
                <h1 className="text-2xl font-bold mb-2">แผนที่กลุ่มเสี่ยง</h1>

                <div className="overflow-hidden rounded-md">
                    <Map />
                </div>
            </div>
        </div>
    )
}

export default CheckinMap