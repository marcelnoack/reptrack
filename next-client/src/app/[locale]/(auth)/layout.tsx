'use client';

import { PropsWithChildren } from 'react';
import { useAuth } from '@/lib/data-access/auth/useAuth';

export default function AuthLayout( { children }: PropsWithChildren ) {

    useAuth();

    return ( <main className="flex-1 overflow-y-auto bg-zinc-800">{children}</main> );
}