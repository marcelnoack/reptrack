import { createBrowserRouter } from 'react-router-dom';

import Layout from './domains/layout';
import { AuthLayout } from './domains/auth/AuthLayout';
import { LoginPage } from './domains/auth/LoginPage';
import { RegisterPage } from './domains/auth/RegisterPage';
import { EmailVerifyPage } from './domains/auth/EmailVerifyPage';

export const rptRoutes = {
    home: '/',
    workouts: '/workouts',
    progress: '/progress',
    calendar: '/calendar',
    login: '/login',
    register: '/register',
    emailVerify: '/auth/email-verify'
}

export const rptRouter = createBrowserRouter( [
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
                path: rptRoutes.workouts,
                element: <div>Workouts</div>
            },
            {
                path: rptRoutes.progress,
                element: <div>Progress</div>
            },
            {
                path: rptRoutes.calendar,
                element: <div>Calendar</div>
            },
            {
                path: rptRoutes.emailVerify,
                element: <EmailVerifyPage/>
            }
        ]
    },
    {
        id: 'login',
        path: rptRoutes.login,
        element: <AuthLayout>
            <LoginPage/>
        </AuthLayout>
    },
    {
        id: 'register',
        path: rptRoutes.register,
        element: <AuthLayout>
            <RegisterPage/>
        </AuthLayout>
    },
] )