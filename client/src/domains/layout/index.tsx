import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../lib/auth/useAuth';
import { useApi } from '../../lib/data-access/useApi';
import { LoadingPage } from '../../components/LoadingPage';
import { AuthLayout } from '../auth/AuthLayout';
import RptHeader from './_Header';
import RptFooter from './_Footer';

const Layout = () => {
    const { t: tCommon } = useTranslation( 'common' );
    const { isLoading, isFetching, isError } = useAuth();

    const { usePost } = useApi();
    const { mutate, } = usePost( '/auth/logout', '', { credentials: 'include' }, [ '/profile' ] );

    if ( isLoading || isFetching ) {
        return <LoadingPage message={tCommon( 'loading', { objectToLoad: tCommon( 'general.userdata' ) } )}/>
    }

    if ( isError ) {
        return <AuthLayout/>
    }

    const handleLogout = () => {
        mutate();
    }

    return (
        <div className="h-screen flex flex-col">
            <header className="sticky top-0 z-50 bg-zinc-800 shadow-md text-white">
                <RptHeader/>
                <button onClick={() => handleLogout()}>Logout</button>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800 pt-2">
                <Outlet/>
            </main>
            <footer className="sticky bottom-0 left-0 w-full h-14 z-50 bg-zinc-800">
                <RptFooter/>
            </footer>
        </div> )
}

export default Layout;