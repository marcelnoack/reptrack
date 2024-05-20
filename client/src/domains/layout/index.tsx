import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { LoadingPage } from '../../components/LoadingPage';
import { rptRoutes } from '../../routes';
import { useAuth } from '../auth/hooks/useAuth';
import { RptMainMenu } from '../settings/RptMainMenu';
import RptHeader from './_Header';
import RptFooter from './_Footer';

const Layout = () => {
    const { pathname } = useLocation();
    const { isLoading, isFetching, isError, user } = useAuth();

    if ( isLoading || isFetching ) {
        return <LoadingPage/>
    }

    if ( isError ) {
        return <Navigate to={'/login'} replace/>
    }

    // additional guard clause to prevent user from accessing other pages if email is not verified
    if ( !user?.active && pathname !== rptRoutes.emailVerify ) {
        return <Navigate to={rptRoutes.emailVerify}/>
    }

    // additional guard clause to prevent user from accessing email verification page if email is already verified
    if ( user?.active && pathname === rptRoutes.emailVerify ) {
        return <Navigate to={rptRoutes.home}/>
    }

    const mainContent = <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800">
        <Outlet/>
    </main>;

    return (
        <div className="h-screen flex flex-col">
            {pathname === rptRoutes.emailVerify ? mainContent :
                <>
                    <header className="sticky top-0 z-20 bg-zinc-800 text-white">
                        <RptHeader/>
                    </header>
                    {mainContent}
                    <footer className="sticky bottom-0 left-0 w-full h-14 z-20 bg-zinc-800">
                        <RptFooter/>
                    </footer>
                    <RptMainMenu/>
                </>
            }
        </div> )
}

export default Layout;