import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';

import { useHttp } from './useHttp';
import { config } from '../../config';

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

export const baseUrl: string = config.envs.baseUrl;

export const useApi = () => {
    const queryClient = useQueryClient();
    const { i18n } = useTranslation()

    const http = useHttp( {
        headers: {
            acceptLanguage: i18n.language,
            accept: 'application/json',
            contentType: 'application/json',
        }
    } )

    const useGet = <T>( path: string, options?: { credentials: RequestCredentials, schema?: z.Schema<T> }, queryFilters?: QueryFilter[] ) => {
        const convertedQueryFilters = _queryFiltersToString( queryFilters );

        return useQuery( [ path, convertedQueryFilters ], async () => await http.get<T>( `${baseUrl}${path}${convertedQueryFilters}`, options ), {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            keepPreviousData: true,
            staleTime: Infinity,
            retry: 2,
        } );
    };

    const usePatch = <T, >( path: string, body: BodyInit, collectionKeys?: string[] ) => useMutation(
        async () => await http.patch<T>( `${baseUrl}${path}`, body ), {
            onSuccess: () => {
                queryClient.invalidateQueries( { queryKey: collectionKeys } );
            }
        } );

    const usePost = <T, >( path: string, body: BodyInit, options?: {
        credentials: RequestCredentials, headers?: HeadersInit
    }, collectionKeys?: string[] ) => useMutation(
        async () => await http.post<T>( `${baseUrl}${path}`, body, options ), {
            onSuccess: () => {
                queryClient.invalidateQueries( { queryKey: collectionKeys } );
            },
            onError: ( error ) => {
                console.error( error );
            }
        }
    );

    const useDelete = <T, >( path: string, collectionKeys?: string[] ) => useMutation(
        async () => await http.httpDelete<T>( `${baseUrl}${path}` ), {
            onSuccess: () => {
                queryClient.invalidateQueries( { queryKey: collectionKeys } );
            }
        } );

    return {
        useGet,
        usePatch,
        usePost,
        useDelete,
    }
}