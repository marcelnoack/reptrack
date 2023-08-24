import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from '@/lib/i18n/i18n-helper';

export default function middleware( request: NextRequest ) {
    const pathname = request.nextUrl.pathname;
    const pathnameParts = pathname.toLowerCase().split( '/' );

    const isImage = pathname.match( /\.(png|jpg|jpeg|gif|svg|ico)$/i );
    if( isImage ) return NextResponse.next();

    if ( pathnameParts[1] === defaultLocale && pathnameParts.length === 2 ) {
        return NextResponse.redirect( new URL(
            pathname.replace( `/${defaultLocale}`, '/' ),
            request.url
        ) )
    }

    const pathnameIsMissingValidLocale = locales.every( ( locale ) => {
        return !pathname.startsWith( `/${locale}` )
    } );

    if( pathnameIsMissingValidLocale ) {
        return NextResponse.rewrite( new URL( `/${defaultLocale}${pathname}`, request.url ) );
    }
}

export const config = {
// do not localize next.js paths
    matcher: [ '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)', ],
};