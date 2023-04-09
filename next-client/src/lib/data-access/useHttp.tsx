export interface RequestOptions {
    headers: {
        authorization: string;
        acceptLanguage: string;
        accept: string;
        contentType: string;
    }
}

export const useHttp = ( options: RequestOptions ): {
    get: <T>( url: string ) => Promise<T>;
    post: <T>( url: string, body: BodyInit ) => Promise<T>;
    patch: <T>( url: string, body: BodyInit ) => Promise<T>;
    httpDelete: <T>( url: string ) => Promise<T>;
} => {
    const { headers } = options;

    const _headers: HeadersInit = {
        Authorization: headers.authorization,
        'Accept-Language': headers.acceptLanguage,
        accept: headers.accept,
        'Content-Type': headers.contentType,
    };

    const get = <T, >( url: string ): Promise<T> => fetch( url, {
        method: 'GET',
        headers: _headers,
    } ).then( res => res.json() ).catch( err => err );

    const post = <T, >( url: string, body: BodyInit ): Promise<T> => fetch( url, {
        method: 'POST',
        headers: _headers,
        body,
    } ).then( res => res.json() ).catch( err => err );

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