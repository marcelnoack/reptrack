import { useState } from 'react';

import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

export type AuthPage = 'login' | 'register';

export const AuthLayout = () => {
    const [ activePage, setActivePage ] = useState<AuthPage>( 'login' );

    return <main className="flex-1 overflow-y-auto bg-zinc-800">
        {activePage === 'login' ? <LoginPage onNav={( to ) => setActivePage( to )}/> :
            <RegisterPage onNav={( to ) => setActivePage( to )}/>}
    </main>
}