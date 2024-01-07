import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '../data-access/useApi';


export const useAuth = () => {
    const { t: tCommon } = useTranslation( 'common' )

    const [ loadingMessage, setLoadingMessage ] = useState<string>( '' );

    const { useGet } = useApi();

    const ProfileSchema = z.object( {
        user: z.object( {
            userId: z.number(),
            email: z.string().email(),
            password: z.string().optional(),
            firstName: z.string(),
            middleName: z.string().optional(),
            lastName: z.string(),
            provider: z.object( {
                providerName: z.string(),
                googleId: z.string(),
                displayName: z.string(),
                picture: z.string()
            } ).optional()
        } )
    } );

    type ProfileType = z.infer<typeof ProfileSchema>;

    const {
        isLoading,
        isError,
        data,
        isFetching
    } = useGet<ProfileType>( '/profile', { credentials: 'include', schema: ProfileSchema } );

    useEffect( () => {
        if ( ( isLoading || isFetching ) ) {
            data ? setLoadingMessage( 'Logging you out' ) : setLoadingMessage( tCommon( 'loading', { objectToLoad: tCommon( 'general.userdata' ) } ) );
            return;
        }

        setLoadingMessage( '' );
    }, [ isLoading, isFetching, data, tCommon ] )


    const user = data;

    return {
        user,
        isLoading,
        isFetching,
        isError,
        loadingMessage
    }
}