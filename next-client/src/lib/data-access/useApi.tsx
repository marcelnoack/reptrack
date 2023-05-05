import { usePathname } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getLanguageFromPath } from '@/lib/i18n/i18n-helper';

import { useHttp } from './useHttp';

export interface QueryFilter {
    filterKey: string;
    filterValues: string[];
}

const _queryFiltersToString = ( queryFilters?: QueryFilter[] ): string => {
    if ( !queryFilters ) return '';

    return queryFilters
        .map( queryFilter => `${queryFilter.filterKey}=${queryFilter.filterValues.join( ',' )}` )
        .join( '&' );
}

export const useApi = () => {
    const baseUrl: string = process.env['NEXT_PUBLIC_API_URL'] || '';
    const path = usePathname();
    const locale = getLanguageFromPath( path );
    const queryClient = useQueryClient();

    const http = useHttp( {
        headers: {
            acceptLanguage: locale,
            accept: 'application/json',
            contentType: 'application/json',
        }
    } );

    const useGet = <T, >( path: string, options?: { credentials: RequestCredentials }, queryFilters?: QueryFilter[] ) => {
        const convertedQueryFilters = _queryFiltersToString( queryFilters );

        return useQuery( [ path, convertedQueryFilters ], async () => await http.get<T>( `${baseUrl}${path}${convertedQueryFilters}`, options ), {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            keepPreviousData: true,
            staleTime: Infinity
        } );
    };

    const usePatch = <T, >( path: string, body: BodyInit, collectionKeys?: string[] ) => useMutation(
        async () => await http.patch<T>( `${baseUrl}${path}`, body ), {
            onSuccess: () => {
                queryClient.invalidateQueries( collectionKeys );
            }
        } );

    const usePost = <T, >( path: string, body: BodyInit, options?: { credentials: RequestCredentials }, collectionKeys?: string[] ) => useMutation(
        async () => await http.post<T>( `${baseUrl}${path}`, body, options ), {
            onSuccess: () => {
                queryClient.invalidateQueries( collectionKeys );
            },
            onError: ( error ) => {
                console.error( error );
            }
        }
    );

    const useDelete = <T, >( path: string, collectionKeys?: string[] ) => useMutation(
        async () => await http.httpDelete<T>( `${baseUrl}${path}` ), {
            onSuccess: () => {
                queryClient.invalidateQueries( collectionKeys );
            }
        } );

    return {
        useGet,
        usePatch,
        usePost,
        useDelete,
    }
}