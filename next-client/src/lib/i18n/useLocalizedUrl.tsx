import { useLocale } from 'next-intl';
import { defaultLocale, getLocalizedUrl } from '@/lib/i18n/i18n-helper';

export const useLocalizedUrl = ( url: string ) => {
    const locale = useLocale();

    const localizedUrl = locale !== defaultLocale ? getLocalizedUrl( url, locale ): url;

    return { localizedUrl }
}