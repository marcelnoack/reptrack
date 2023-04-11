import { usePathname } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

const _getLanguageFromPath = ( url: string ): string | undefined => {
    const match = url.match( /^\/([a-z]{2})\/(.*)$/ );
    return match?.[1];
}

export const useApi = () => {
    const baseUrl: string = process.env['NEXT_PUBLIC_API_URL'] || '';
    const path = usePathname();
    const locale = _getLanguageFromPath( path );
    const queryClient = useQueryClient();

    const http = useHttp( {
        headers: {
            authorization: 'Bearer token',
            acceptLanguage: locale ?? 'en',
            accept: 'application/json',
            contentType: 'application/json'
        }
    } );

    const useGet = <T, >( path: string, queryFilters?: QueryFilter[] ) => {
        const convertedQueryFilters = _queryFiltersToString( queryFilters );

        return useQuery( [ path, convertedQueryFilters ], async () => await http.get<T>( `${baseUrl}${path}${convertedQueryFilters}` ), {
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

    const usePost = <T, >( path: string, body: BodyInit, collectionKeys?: string[] ) => useMutation(
        async () => await http.post<T>( `${baseUrl}${path}`, body ), {
            onSuccess: () => {
                queryClient.invalidateQueries( collectionKeys );
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