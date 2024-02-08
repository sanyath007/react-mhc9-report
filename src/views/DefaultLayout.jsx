import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div className="border">
            <Outlet />
        </div>
    )
}

export default DefaultLayout