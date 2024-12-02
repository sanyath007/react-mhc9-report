// import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./views/Layouts/Default"
import Dashboard from "./views/Dashboard"
import CheckinSummary from "./views/Checkin/Summary"
import CheckinList from "./views/Checkin/List"
import CheckinMap from "./views/Checkin/Map"
import Login from "./views/Auth/Login"
import Register from "./views/Auth/Register"
import GuardRoute from './components/GuardRoute'

function App() {
    return (
        <Routes>
            <Route path="/" element={<GuardRoute><DefaultLayout /></GuardRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="/checkins" element={<CheckinSummary />} />
                <Route path="/checkins/follow-up/:amphur?/:changwat?/:sdate?/:edate?" element={<CheckinList />} />
                <Route path="/checkins/:changwat/map" element={<CheckinMap />} />
                {/* other routes here... */}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    )
}

export default App
