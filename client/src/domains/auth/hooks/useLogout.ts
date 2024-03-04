import { useApi } from '../../../hooks/data-access/useApi';

export const useLogout = () => {
    const { usePost } = useApi();
    const { mutateAsync: logout } = usePost( '/auth/logout', '', {
        credentials: 'include',
        headers: {
            accept: 'application/json',
            'Content-Type': 'text/plain'
        }
    }, [ '/api/profile' ] );

    return {
        logout
    }
}

