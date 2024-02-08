import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <section className="flex justify-center min-h-[640px]">
            <Outlet />
        </section>
    )
}

export default DefaultLayout