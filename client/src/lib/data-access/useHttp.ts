import { z } from 'zod';

interface RequestOptions {
    headers: {
        acceptLanguage: string;
        accept: string;
        contentType: string;
    }
}

export const useHttp = ( options: RequestOptions ): {
    get: <T>( url: string, options?: { credentials: RequestCredentials, schema?: z.Schema<T> } ) => Promise<T>;
    post: <T>( url: string, body: BodyInit, options?: { credentials: RequestCredentials } ) => Promise<T>;
    patch: <T>( url: string, body: BodyInit ) => Promise<T>;
    httpDelete: <T>( url: string ) => Promise<T>;
} => {
    const { headers } = options;

    const _headers: HeadersInit = {
        'Accept-Language': headers.acceptLanguage ?? 'en',
        accept: headers.accept ?? 'application/json',
        'Content-Type': headers.contentType ?? 'application/json',
    }

    const get = <T>( url: string, options?: { credentials: RequestCredentials, schema?: z.Schema<T> } ): Promise<T> => fetch( url, {
        method: 'GET',
        headers: _headers,
        credentials: options?.credentials
    } ).then( res => {
        if ( !res.ok ) {
            return res.json().then( error => {
                throw new Error( error.message )
            } );
        }

        return res.json();
    } ).then( json => {
        if ( options?.schema ) {
            return options.schema.parse( json );
        }

        return json;
    } ).catch( err => {
        throw new Error( err );
    } )

    const post = <T, >( url: string, body: BodyInit, options?: { credentials?: RequestCredentials } ): Promise<T> => fetch( url, {
        method: 'POST',
        headers: _headers,
        credentials: options?.credentials,
        body,
    } ).then( res => {
        if ( !res.ok ) {
            return res.json().then( error => {
                throw new Error( error.message );
            } )
        }

        if ( res.status === 204 ) {
            return '';
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