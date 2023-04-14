'use client';

import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import { useStorage } from '@/lib/data-access/useStorage';
import { useLocalizedUrl } from '@/lib/i18n/useLocalizedUrl';

export const useAuth = () => {
    const router = useRouter()
    const { get } = useStorage();
    const { localizedUrl: localizedSignInPath } = useLocalizedUrl( '/signin' );

    const jwt: any = get( 'jwt' );

    if ( !jwt ) {
        router.push( localizedSignInPath );
        return;
    }

    const accessToken = jwt.accessToken;
    // TODO: Domain-Object
    const decodedAccessToken: any = jwtDecode( accessToken );
    const expiryTime = decodedAccessToken.exp;
    if ( expiryTime && Date.now() >= expiryTime * 1000 ) {
        router.push( localizedSignInPath );
    }
}