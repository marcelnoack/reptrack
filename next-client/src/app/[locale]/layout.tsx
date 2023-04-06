import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl/client';

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
    } catch ( error ) {
        notFound();
    }

    return (
        <html lang={locale}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <body>
            {children}
            </body>
        </NextIntlClientProvider>
        </html>
    );
}
