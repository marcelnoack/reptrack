'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useStorage } from '@/lib/data-access/useStorage';
import { useLocalizedUrl } from '@/lib/i18n/useLocalizedUrl';

export const useAuth = () => {
    const router = useRouter()
    const pathname = usePathname();
    const { get } = useStorage();
    const { localizedUrl: localizedSignInPath } = useLocalizedUrl( '/signin' );
    const { localizedUrl: localizedHomePath } = useLocalizedUrl( '/' );

    const csrf: any = get( 'csrf' );

    if ( !csrf?.length && !pathname.includes( 'signin' ) && !pathname.includes( 'signup' ) ) {
        router.push( localizedSignInPath );
        return;
    }

    if( csrf?.length && ( pathname.includes( 'signin' ) || pathname.includes( 'signup' ) ) ) {
        router.push( localizedHomePath );
    }

    // const accessToken = jwt.accessToken;
    // // TODO: Domain-Object
    // const decodedAccessToken: any = jwtDecode( accessToken );
    // const expiryTime = decodedAccessToken.exp;
    // if ( expiryTime && Date.now() >= expiryTime * 1000 ) {
    //     router.push( localizedSignInPath );
    // }
}