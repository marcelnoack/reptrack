'use client';

import { PropsWithChildren } from 'react';

import { useAuth } from '@/lib/data-access/auth/useAuth';
import { BottomNav } from '@/lib/layout/BottomNav';

export default function ContentLayout( {
                                               children,
                                           }: PropsWithChildren ) {

    useAuth();

    return (
        <div className={'h-screen flex flex-col'}>
            <header className={'sticky top-0 z-50 bg-zinc-800 shadow-md text-white'}>
                <div className={'py-4 mx-4 lg:mx-0'}>
                    <div className={'flex items-center'}>
                        <img src="/logo3-64_x_64.png" alt="reptrack logo" className={'h-8'}/>
                        <h1 className={'mx-auto'}>current route</h1>
                        <div>actions</div>
                    </div>
                </div>
            </header>
            <main className={'flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800 pt-2'}>{children}</main>
            <footer className={'sticky bottom-0 left-0 w-full h-14 z-50 bg-zinc-800'}>
                <BottomNav />
            </footer>
        </div>
    );
}