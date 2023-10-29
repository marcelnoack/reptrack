import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './domains/layout';
import './i18n';
import './index.css'

const router = createBrowserRouter( [
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/workouts',
                element: <div>Workouts</div>
            }
        ]
    },
] )

ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
