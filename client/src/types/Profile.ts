import { z } from 'zod';

export const ProfileSchema = z.object( {
    userId: z.number(),
    email: z.string().email(),
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

export type Profile = z.infer<typeof ProfileSchema>;