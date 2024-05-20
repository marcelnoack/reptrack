import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { rptRouter } from './routes';
import './i18n';
import './index.css'

const queryClient = new QueryClient();
ReactDOM.createRoot( document.getElementById( 'root' )! ).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={rptRouter}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
