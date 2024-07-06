import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import appRouter from './App.jsx'
import AuthContextProvider from '../context/AuthContext.jsx'
import UserContextProvider from '../context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <UserContextProvider>
            <RouterProvider router={appRouter} />
        </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
