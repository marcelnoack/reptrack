type StorageKey = 'jwt';
export const useStorage = () => {
    const set = ( key: StorageKey, value: any ) => {
        const serializedValue = JSON.stringify( value );
        localStorage.setItem( key, serializedValue );
    }

    const get = ( key: StorageKey ): string| null => {
        const serializedValue = localStorage.getItem( key );
        return serializedValue ? JSON.parse( serializedValue ) : null;
    }

    return { set, get };
}