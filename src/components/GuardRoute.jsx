import React from 'react'
import { Navigate } from 'react-router-dom'

const GuardRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    console.log(token);

    if (!token) return <Navigate to="/login" replace />

    return children;
}

export default GuardRoute