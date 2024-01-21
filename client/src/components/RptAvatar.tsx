import * as Avatar from '@radix-ui/react-avatar';

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
    return (
        <Avatar.Root className="size-full">
            <Avatar.Image src={imageSrc}
                          className="w-full h-full rounded-full"/>
            <Avatar.Fallback delayMs={600}
                             className="size-full flex items-center justify-center bg-zinc-700 hover:bg-zinc-500 rounded-full text-sm border-green-500 border">
                {capitalizeNameInitials( firstName, lastName )}
            </Avatar.Fallback>
        </Avatar.Root>
    )
}