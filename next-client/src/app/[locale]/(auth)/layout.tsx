import { PropsWithChildren } from 'react';

export default async function AuthLayout( { children }: PropsWithChildren ) {

    return ( <main className="flex-1 overflow-y-auto bg-zinc-800">{children}</main> );
}