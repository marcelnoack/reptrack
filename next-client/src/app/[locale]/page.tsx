'use client';

import { useApi } from '@/lib/data-access/useApi';

export default function Home( { params }: {params: {lang: string}} ) {
    const { usePost } = useApi();

    const { mutate } = usePost<any>( '/auth/signup', JSON.stringify( {
        user: {
            username: 'FromNextClient',
            firstName: 'Marcel',
            lastName: 'Noack',
            email: 'somemail@mail.com',
            password: 'Nockeball98!'
        }
    } ) );

    const handleSignup = () => {
        mutate();
    };

    return <div>
        {JSON.stringify( params )}
    </div>
}
