import { ComponentProps, forwardRef } from 'react';
import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import { defaultLocale } from '@/lib/i18n/i18n-helper';

type Props = ComponentProps<typeof NextLink>;

const RptLocalizedLink = ( { href, ...rest }: Props, ref: Props['ref'] ) => {

    const locale = useLocale();

    const _getLocalizedHref = ( originalHref: string ) => originalHref.replace( /^\//, '/' + locale + '/' );

    const localizedHref =
        typeof href === 'string'
            ? locale !== defaultLocale ? _getLocalizedHref( href ): href
            : href.pathname != null
                ? { ...href, pathname: locale !== defaultLocale ? _getLocalizedHref( href.pathname ): href.pathname }
                : href;

    return <NextLink href={localizedHref} ref={ref} {...rest} />;
}

export default forwardRef( RptLocalizedLink );