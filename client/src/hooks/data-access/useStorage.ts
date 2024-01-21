type StorageKey = 'loginTargetPath';

export const useStorage = () => {
    const set = ( key: StorageKey, value: any ) => {
        const serializedValue = JSON.stringify( value );
        localStorage.setItem( key, typeof value === 'string' ? value : serializedValue );
    }

    const get = ( key: StorageKey ): string | null => {
        const serializedValue = localStorage.getItem( key );

        if ( !serializedValue ) {
            return null;
        }

        try {
            return JSON.parse( serializedValue );
        } catch ( error ) {
            return serializedValue;
        }
    }

    const clear = ( key: StorageKey ): void => {
        localStorage.removeItem( key );
    }

    return { set, get, clear };
}