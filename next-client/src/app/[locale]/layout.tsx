import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl/client';
import { notFound } from 'next/navigation';
import QueryProvider from '@/components/providers/QueryProvider';

import '../globals.scss';


interface LocaleProps {
    children: ReactNode;
    params: { locale: string };
}

export default async function LocaleLayout( {
                                         children,
                                         params: { locale },
                                     }: LocaleProps ) {

    let messages;
    try {
        messages = ( await import( `../../locales/${locale}.json` ) ).default;
    } catch( e ) {
        notFound()
    }

    return (
        <html lang={locale}>
        <head>
            {/*TODO: Use current route name*/}
            <title>reptrack-app - current route</title>
            {/*<meta http-equiv="Content-Security-Policy" content="default-src 'self';"/>*/}
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="keywords"
                  content="gym, exercise, workout, training, fitness, assistant, track, repetitions, sets, share, easily"/>
            <meta name="description"
                  content="Gym assistant to track your exercise repetitions, sets and be able to share easily them with others."/>
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
        </head>
        <body>
        <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <div className="h-screen flex flex-col">
                    <header className="sticky top-0 z-50 bg-zinc-800 shadow-md text-white">
                        <div className="py-4 mx-4 lg:mx-0">
                            <div className="flex items-center">
                                <img src="/Logo3-128_x_128.png" alt="reptrack logo" className="h-8"/>
                                <h1 className="mx-auto">Current Route</h1>
                                <div>Actions</div>
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto bg-zinc-800 p-2">{children}</main>
                    <footer className="sticky bottom-0 z-50">FOOTER</footer>
                </div>
            </NextIntlClientProvider>
        </QueryProvider>
        </body>
        </html>
    );
}