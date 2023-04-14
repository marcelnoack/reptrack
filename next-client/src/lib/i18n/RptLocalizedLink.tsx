import { ComponentProps, forwardRef } from 'react';
import NextLink from 'next/link';
import { useLocalizedUrl } from '@/lib/i18n/useLocalizedUrl';

type Props = ComponentProps<typeof NextLink>;

const RptLocalizedLink = ( { href, ...rest }: Props, ref: Props['ref'] ) => {
    const { localizedUrl: localizedHref } = useLocalizedUrl( href as string );

    return <NextLink href={localizedHref} ref={ref} {...rest} className={'text-green-500 hover:text-green-400'} />;
}

export default forwardRef( RptLocalizedLink );