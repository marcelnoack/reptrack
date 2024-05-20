import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useApi } from '../../hooks/data-access/useApi';
import { useAuth } from './hooks/useAuth';

// TODO: Outsource components
export const EmailVerifyPage = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ code, setCode ] = useState( Array( 6 ).fill( '' ) );
    const inputRefs = useRef<( HTMLInputElement | null )[]>( Array( 6 ).fill( '' ) );

    const [ enterManually, setEnterManually ] = useState( false );

    const { user } = useAuth();
    const { usePost } = useApi();
    const { mutate, isLoading, isSuccess, isError } = usePost( '/auth/local/verify-email', JSON.stringify( {
        code: code.join( '' )
    } ), {
        credentials: 'include',
    }, [ '/profile' ] );
    const {
        mutate: resendMutate,
        isLoading: resendLoading
    } = usePost( '/auth/local/resend-verification-email', JSON.stringify( {} ), {
        credentials: 'include',
    }, [] );

    // initialize code from url if present
    useEffect( () => {
        const queryCode = searchParams.get( 'code' );
        if ( queryCode && /^\d{6}$/.test( queryCode ) ) {
            const newCode = queryCode.split( '' ).slice( 0, 6 );
            setCode( newCode );
            setEnterManually( true );

            searchParams.delete( 'code' );
            setSearchParams( searchParams );

            // mutate();
        }
    }, [] );

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement>, index: number ) => {
        const { value } = event.target;
        const newCode = [ ...code ];
        if ( /^\d?$/.test( value ) ) {
            newCode[index] = value;
            if ( value !== '' && index < newCode.length - 1 ) {
                inputRefs.current[index + 1]!.focus();
            }
            setCode( newCode );
        }
    };

    // TODO
    if ( isSuccess ) {
        return <div>
            <h1>Email Verified</h1>
        </div>
    }

    // TODO: i18n
    const renderInfo = () => {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-5 text-white">
                <span className="material-symbols-rounded text-4xl text-green-500">mail</span>
                <h1 className="text-center text-2xl font-bold">Check your email</h1>
                <div>
                    <p className="text-center">We sent a verification link to</p>
                    <p className="text-center"><b>{user?.email}</b></p>
                </div>
                <div className="flex items-center gap-1">
                    <span>Didn't receive the email?</span>
                    <button
                        disabled={resendLoading}
                        onClick={() => resendMutate()}
                        className="border-b-2 border-transparent hover:border-green-500 focus:border-green-500 text-green-500 disabled:text-gray-600 disabled:cursor-not-allowed">Click
                        to resend
                    </button>
                </div>
                <button
                    onClick={() => setEnterManually( true )}
                    className="bg-green-500 text-black rounded-md p-3 hover:bg-green-400 focus:bg-green-400 outline-none w-full">
                    Enter code manually
                </button>
                <button
                    className="border-b-2 border-transparent hover:border-green-500 focus:border-green-500 text-green-500 flex items-center justify-center w-fit outline-none">
                    <span className="material-symbols-rounded">arrow_back</span>
                    <span>Back to log in</span>
                </button>
            </div>
        )
    }

    // TODO: i18n
    const renderCodeEnter = () => {
        return (
            <div className="w-full text-slate-200 flex flex-col items-center justify-center gap-5">
                <span className="material-symbols-rounded text-4xl text-green-500">mail</span>
                <div>
                    <p className="text-center">Please enter the code we sent to</p>
                    <p className="text-center"><b>{user?.email}</b></p>
                </div>
                <div className="flex items-center gap-1">
                    <span>Didn't receive the email?</span>
                    <button
                        onClick={() => resendMutate()}
                        disabled={resendLoading}
                        className="border-b-2 border-transparent hover:border-green-500 focus:border-green-500 text-green-500 disabled:text-gray-600 disabled:cursor-not-allowed">Click
                        to resend
                    </button>
                </div>
                <div className="flex items-center justify-center gap-2">
                    {code.map( ( digit, index ) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            className="w-10 h-10 text-center text-slate-200 bg-zinc-800 rounded border border-zinc-400 focus:border-green-500 hover:border-slate-200 p-3 outline-0 resize-none transition ease-out duration-100"
                            onChange={( event ) => handleInputChange( event, index )}
                            ref={( ref ) => ( inputRefs.current[index] = ref )}
                        />
                    ) )}
                </div>
                <button
                    onClick={() => mutate()}
                    disabled={isLoading || code.some( digit => digit === '' )}
                    className="bg-green-500 text-black rounded-md p-3 hover:bg-green-400 focus:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed outline-none w-full flex items-center justify-center gap-2">
                    <span>
                        Verify Email
                    </span>
                    {isLoading && (
                        <div
                            className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-green-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status">
                                              <span
                                                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                              >Loading...</span
                                              >
                        </div>
                    )}
                </button>
                {isError &&
                  <span className="text-red-500">The code you entered is either invalid or has expired.</span>
                }
            </div>
        )
    }

    return <div className="w-full h-full flex items-center justify-center p-5">
        {enterManually ? renderCodeEnter() : renderInfo()}
    </div>
}