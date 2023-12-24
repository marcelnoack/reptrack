import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from './domains/layout';
import './i18n';
import './index.css'

const router = createBrowserRouter( [
    {
        id: 'root',
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <div>Home</div>
            },
            {
                path: 'workouts',
                element: <div>Workouts</div>
            },
            {
                path: 'progress',
                element: <div>Progress</div>
            },
            {
                path: 'calendar',
                element: <div>Calendar</div>
            },
        ]
    },
] )

const queryClient = new QueryClient();
ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
