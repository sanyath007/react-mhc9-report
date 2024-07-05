import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const DefaultLayout = () => {
    return (
        <div>
            <Navbar />

            <section className="flex justify-center min-h-[680px]">
                <Outlet />
            </section>

            <Footer />
        </div>
    )
}

export default DefaultLayout