import { useLocale } from 'next-intl';
import { defaultLocale } from '@/lib/i18n/i18n-helper';

export const useLocalizedUrl = ( url: string ) => {
    const locale = useLocale();
    const _getLocalizedUrl = ( originalHref: string ) => originalHref.replace( /^\//, '/' + locale + '/' );

    const localizedUrl = locale !== defaultLocale ? _getLocalizedUrl( url ): url;

    return { localizedUrl }
}