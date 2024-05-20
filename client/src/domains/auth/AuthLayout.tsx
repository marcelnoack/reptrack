import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from './hooks/useAuth';
import { LoadingPage } from '../../components/LoadingPage';

export const AuthLayout = ( { children }: PropsWithChildren ) => {
    const { user, isLoading, isFetching, isError } = useAuth();

    if ( isLoading || isFetching ) {
        return <LoadingPage/>;
    }

    if ( !isError && user ) {
        return <Navigate to={'/'} replace/>
    }

    return <main className="flex-1 overflow-y-auto bg-zinc-800">
        <div className='min-h-screen flex items-center justify-center'>
            {children}
        </div>
    </main>
}