import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { APIProvider } from '@vis.gl/react-google-maps'
import App from './App.jsx'
import './index.css'
import store from './features/store.js'
import { AuthProvider } from './contexts/AuthContext'
import { ApiProvider } from '@reduxjs/toolkit/query/react'


const GMAP_API_KEY = import.meta.env.VITE_GMAP_API_KEY;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <APIProvider apiKey={GMAP_API_KEY}>
                <AuthProvider>
                    <Router>
                        <App />
                    </Router>
                </AuthProvider>
            </APIProvider>
        </Provider>
    </React.StrictMode>,
)
