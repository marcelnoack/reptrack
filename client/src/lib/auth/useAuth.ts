import { useApi } from '../data-access/useApi';
import { z } from 'zod';


export const useAuth = () => {
    const { useGet } = useApi();

    const ProfileSchema = z.object( {
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
    } );

    type ProfileType = z.infer<typeof ProfileSchema>;

    const {
        isLoading,
        isError,
        data,
        isFetching
    } = useGet<ProfileType>( '/profile', { credentials: 'include', schema: ProfileSchema } );

    const user = data;

    return {
        user,
        isLoading,
        isFetching,
        isError
    }

}