import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
// import './index.css'

console.log(import.meta.env.VITE_API_HOST)

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <   App />
    </BrowserRouter>
)
