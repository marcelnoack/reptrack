export const getLanguageFromPath = ( url: string ): string | undefined => {
    const match = url.match( /^\/([a-z]{2})\/(.*)$/ );
    return match?.[1];
}

export const defaultLocale = 'en';
export const locales = [ defaultLocale, 'de' ];