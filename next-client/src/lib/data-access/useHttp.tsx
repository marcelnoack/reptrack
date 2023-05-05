import { useStorage } from '@/lib/data-access/useStorage';

export interface RequestOptions {
    headers: {
        // authorization: string;
        acceptLanguage: string;
        accept: string;
        contentType: string;
    }
}

export const useHttp = ( options: RequestOptions ): {
    get: <T>( url: string, options?: { credentials: RequestCredentials } ) => Promise<T>;
    post: <T>( url: string, body: BodyInit, options?: { credentials: RequestCredentials } ) => Promise<T>;
    patch: <T>( url: string, body: BodyInit ) => Promise<T>;
    httpDelete: <T>( url: string ) => Promise<T>;
} => {
    const { headers } = options;

    const storage = useStorage();

    const _headers: HeadersInit = {
        // Authorization: headers.authorization,
        'Accept-Language': headers.acceptLanguage,
        accept: headers.accept,
        'Content-Type': headers.contentType,
        'X-CSRF-Token': localStorage.getItem( 'csrfToken' ) || ''
        // 'Content-Security-Policy': 'default-src \'self\'',
    };

    const get = <T, >( url: string, options?: { credentials: RequestCredentials } ): Promise<T> => fetch( url, {
        method: 'GET',
        headers: _headers,
        credentials: options?.credentials,
    } ).then( res => res.json() ).catch( err => {
        throw new Error( err )
    } );

    const post = <T, >( url: string, body: BodyInit, options?: { credentials?: RequestCredentials } ): Promise<T> => fetch( url, {
        method: 'POST',
        headers: _headers,
        credentials: options?.credentials,
        body,
    } ).then( res => {
        const csrfHeader = res.headers.get( 'X-CSRF-Token' );

        if ( csrfHeader ) {
            storage.set( 'csrf', csrfHeader );
        }

        if( !res.ok ) {
            return res.json().then( error => {
                throw new Error( error.message );
            } )
        }

        return res.json();
    } );

    const patch = <T, >( url: string, body: BodyInit ): Promise<T> => fetch( url, {
        method: 'PATCH',
        headers: _headers,
        body,
    } ).then( res => res.json() ).catch( err => err );

    // delete not allowed, because it's a reserved word
    const httpDelete = <T, >( url: string ): Promise<T> => fetch( url, {
        method: 'DELETE',
        headers: _headers,
    } ).then( res => res.json() ).catch( err => err );

    return {
        get,
        post,
        patch,
        httpDelete
    }
}