// import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./views/DefaultLayout"
import Dashboard from "./views/Dashboard"
import CheckinSummary from "./views/Checkin/Summary"
import CheckinList from "./views/Checkin/List"

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/checkins" element={<CheckinSummary />} />
                <Route path="/checkins/follow-up" element={<CheckinList />} />
                {/* other routes here... */}

                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
        </Routes>
    )
}

export default App
