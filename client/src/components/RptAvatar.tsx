import * as Avatar from '@radix-ui/react-avatar';
import { useEffect, useRef } from 'react';

interface RptAvatarProps {
    firstName: string;
    lastName: string;
    imageSrc?: string;
}

const capitalizeNameInitials = ( firstName: string, lastName: string ): string => {
    if ( !firstName?.length || !lastName?.length ) {
        return '?';
    }

    return `${firstName.charAt( 0 ).toUpperCase()}${lastName.charAt( 0 ).toUpperCase()}`
}

export const RptAvatar = ( { firstName, lastName, imageSrc }: RptAvatarProps ) => {
    const imgRef = useRef<HTMLImageElement>( null );

    useEffect( () => {
        if ( imgRef.current ) {
            imgRef.current.setAttribute( 'referrerpolicy', 'no-referrer' );
        }
    }, [ imgRef ] );

    return (
        <Avatar.Root className="size-full">
            <Avatar.Image src={imageSrc} referrerPolicy={'no-referrer'} ref={imgRef}
                          className="w-full h-full rounded-lg"/>
            <Avatar.Fallback delayMs={600}
                             className="size-full flex items-center justify-center bg-zinc-700 text-slate-200 rounded-lg text-sm border-green-500 border">
                {capitalizeNameInitials( firstName, lastName )}
            </Avatar.Fallback>
        </Avatar.Root>
    )
}