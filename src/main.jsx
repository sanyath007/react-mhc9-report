import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import store from './features/store.js'
import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <Router>
                    <App />
                </Router>
            </AuthProvider>
        </Provider>
    </React.StrictMode>,
)
