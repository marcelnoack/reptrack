import { Outlet } from 'react-router-dom';
import RptHeader from './_Header';
import RptFooter from './_Footer';

const Layout = () => (
    <div className="h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-zinc-800 shadow-md text-white">
            <RptHeader/>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800 pt-2">
            <Outlet/>
        </main>
        <footer className="sticky bottom-0 left-0 w-full h-14 z-50 bg-zinc-800">
            <RptFooter/>
        </footer>
    </div>
)

export default Layout;