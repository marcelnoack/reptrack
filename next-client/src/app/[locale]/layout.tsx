import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl/client';
import { notFound } from 'next/navigation';
import QueryProvider from '@/components/providers/QueryProvider';

import '../globals.scss';


interface LocaleProps {
    children: ReactNode;
    params: { locale: string };
}

export default async function RootLayout( {
                                               children,
                                               params: { locale },
                                           }: LocaleProps ) {

    let messages;
    try {
        messages = ( await import( `../../locales/${locale}.json` ) ).default;
    } catch ( e ) {
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
            <link rel="shortcut icon" href="/favicon.ico"/>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
        </head>
        <body>
        <QueryProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </QueryProvider>
        </body>
        </html>
    );
}