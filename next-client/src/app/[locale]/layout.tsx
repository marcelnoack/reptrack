'use client';

import { ReactNode, useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../globals.scss';

const queryClient = new QueryClient();

interface LocaleProps {
    children: ReactNode;
    params: { locale: string };
}

export default function LocaleLayout( {
                                         children,
                                         params: { locale },
                                     }: LocaleProps ) {

    const [ messages, setMessages ] = useState( undefined );

    useEffect( () => {
        const fetchMessages = async () => {
            const localeMessages = ( await import( `../../locales/${locale}.json` ) ).default;
            setMessages( localeMessages );
        }
        fetchMessages();
    }, [ locale ] )

    return (
        <html lang={locale}>
        <head>
            {/*TODO: Use current route name*/}
            <title>reptrack-app - current route</title>
            <meta http-equiv="Content-Security-Policy" content="default-src 'self';"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="keywords"
                  content="gym, exercise, workout, training, fitness, assistant, track, repetitions, sets, share, easily"/>
            <meta name="description"
                  content="Gym assistant to track your exercise repetitions, sets and be able to share easily them with others."/>
        </head>
        <body>
        <QueryClientProvider client={queryClient}>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <div className="h-screen flex flex-col">
                    <header className="sticky top-0 z-50">
                        <div className="py-4 mx-4 lg:mx-0">
                            <div className="flex items-center">
                                <img src="/Logo3.png" alt="reptrack logo" className="h-12"/>
                                <h1 className="mx-auto">Current Route</h1>
                                <div>Actions</div>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto">{children}</main>
                    <footer className="sticky bottom-0 z-50">FOOTER</footer>
                </div>
            </NextIntlClientProvider>
        </QueryClientProvider>
        </body>
        </html>
    );
}