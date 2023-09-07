import { ComponentProps, forwardRef } from 'react';
import NextLink from 'next/link';

import { useLocalizedUrl } from '@/lib/i18n/useLocalizedUrl';

interface Props extends ComponentProps<typeof NextLink> {
}

const RptLocalizedLink = ( { href, className, ...rest }: Props, ref: Props['ref'] ) => {
    const { localizedUrl: localizedHref } = useLocalizedUrl( href as string );

    const defaultClasses = 'text-green-500 hover:text-green-400';

    return <NextLink
        href={localizedHref}
        ref={ref}
        className={className || defaultClasses}
        {...rest}
    />;
}

export default forwardRef( RptLocalizedLink );