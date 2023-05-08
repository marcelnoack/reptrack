'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { RptInput } from '@/components/input/RptInput';
import RptLocalizedLink from '@/lib/i18n/RptLocalizedLink';
import { useApi } from '@/lib/data-access/useApi';
import { useLocalizedUrl } from '@/lib/i18n/useLocalizedUrl';

export const SignInForm = () => {

    const router = useRouter();
    const tCommon = useTranslations( 'common' );
    const tSignIn = useTranslations( 'page.signIn' );
    const { localizedUrl: localizedHomeHref } = useLocalizedUrl( '/' );

    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const { usePost } = useApi();
    const { mutate, isLoading, isSuccess, isError, error } = usePost<any>( '/auth/signin', JSON.stringify( {
        user: { email, password }
    } ), { credentials: 'include' } )

    const handleSignin = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        try {
            await mutate();
            router.push( localizedHomeHref );
        } catch ( error ) {
            // TODO: Set error message prompt in form
        }
    }

    const emailError = (): string => {

        if ( email.trim().length === 0 ) {
            return tSignIn( 'labelEmailRequired' );
        }

        if ( !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test( email.trim() ) ) {
            return tSignIn( 'labelEmailInvalid' );
        }

        return '';
    }

    const passwordError = (): string => {

        if ( password.trim().length === 0 ) {
            return tSignIn( 'labelPasswordRequired' );
        }

        return '';
    }

    return <form className={`flex flex-col gap-4 p-10 w-full overflow-hidden transition-{max-height} ease duration-300 ${isSuccess ? 'max-h-[200px]': 'max-h-[2000px]'}`}
                 onSubmit={( e ) => handleSignin( e )}>
        <h1 className={'lg:hidden flex items-center justify-center gap-2'}>
            <img src="/Logo3-128_x_128.png" alt="reptrack logo" className="h-12"/>
            <span className={'text-2xl font-medium text-green-500'}>Reptrack</span>
        </h1>
        {/*TODO: Loading Spinner*/}
        {isSuccess && <div className={'w-full text-white text-center'}>Success! You are now being redirected...</div>}
        <div className={`flex flex-col gap-4 ${isSuccess && 'opacity-0'}`}>
            <h2 className={'text-white mb-2'}>{tSignIn( 'labelSignIn' )}</h2>
            <RptInput
                id={'signin_email_input'}
                label={tCommon( 'general.email' )}
                value={email}
                onChange={( value ) => setEmail( value )}
                placeholder={tCommon( 'general.email' )}
                error={emailError()}
                required/>
            <RptInput
                id={'signin_password_input'}
                label={tCommon( 'general.password' )}
                value={password}
                onChange={( value ) => setPassword( value )}
                placeholder={tCommon( 'general.password' )}
                error={passwordError()}
                required
                isPassword/>
            {isError && <div className={'text-red-500'}>{( error as any )?.message}</div>}
            <button
                type={'submit'}
                disabled={isLoading || emailError().length > 0 || passwordError().length > 0}
                className={'w-full bg-green-500 text-black rounded-md p-3 hover:bg-green-400 focus:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed outline-none'}>{tSignIn( 'labelSignIn' )}</button>
            <div className={'flex flex-wrap items-center justify-center gap-2 text-white'}>
                <span>{tSignIn( 'labelNoAccount' )}</span>
                <RptLocalizedLink href={'/signup'}>{tSignIn( 'labelSignUp' )}</RptLocalizedLink>
            </div>
        </div>
    </form>
}