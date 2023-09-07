export const getLanguageFromPath = ( url: string ): string => {
    const match = url.match( /^\/([a-z]{2})\/(.*)$/ );
    return match?.[1] ?? defaultLocale;
}

export const getLocalizedUrl = ( path: string, targetLocale: string ) => {
    // Remove leading and trailing slashes from the path
    const cleanedPath = path.replace( /^\/|\/$/g, '' );

    // If the targetLocale equals the defaultLocale
    if ( targetLocale === defaultLocale ) {
        // Remove preceding locale marker if it exists
        if ( cleanedPath.startsWith( `${defaultLocale}/` ) ) {
            return `/${cleanedPath.substring( defaultLocale.length + 1 )}`;
        }
        return cleanedPath === '' ? '/' : `/${cleanedPath}`;
    }

    // Construct the localized URL
    const localizedPath = cleanedPath === '' ? '' : `${targetLocale}/${cleanedPath}`;

    return `/${localizedPath}`;
}


export const defaultLocale = 'en';
export const locales = [ defaultLocale, 'de' ];