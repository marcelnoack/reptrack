import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Profile, ProfileSchema } from '../../../types/Profile';
import { useApi } from '../../../hooks/data-access/useApi';

export const useAuth = (): { user: Profile | undefined; isLoading: boolean; isFetching: boolean; isError: boolean; loadingMessage: string } => {
    const { t: tCommon } = useTranslation( 'common' )

    const [ loadingMessage, setLoadingMessage ] = useState<string>( '' );

    const { useGet } = useApi();

    const {
        isLoading,
        isError,
        data,
        isFetching
    } = useGet<Profile>( '/profile', { credentials: 'include', schema: ProfileSchema } );

    useEffect( () => {
        if ( ( isLoading || isFetching ) ) {
            data ? setLoadingMessage( 'Logging you out' ) : setLoadingMessage( tCommon( 'loading', { objectToLoad: tCommon( 'general.userdata' ) } ) );
            return;
        }

        setLoadingMessage( '' );
    }, [ isLoading, isFetching, data, tCommon ] )

    return {
        user: data,
        isLoading,
        isFetching,
        isError,
        loadingMessage
    }
}