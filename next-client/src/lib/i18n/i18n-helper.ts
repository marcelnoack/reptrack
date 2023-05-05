export const getLanguageFromPath = ( url: string ): string => {
    const match = url.match( /^\/([a-z]{2})\/(.*)$/ );
    return match?.[1] ?? defaultLocale;
}

export const defaultLocale = 'en';
export const locales = [ defaultLocale, 'de' ];