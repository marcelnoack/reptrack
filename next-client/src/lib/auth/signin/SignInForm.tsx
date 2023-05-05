'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RptInput } from '@/components/input/RptInput';
import RptLocalizedLink from '@/lib/i18n/RptLocalizedLink';
import { useApi } from '@/lib/data-access/useApi';

export const SignInForm = () => {
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const tCommon = useTranslations( 'common' );
    const tSignIn = useTranslations( 'page.signIn' );

    const { usePost } = useApi();
    const { mutate, isLoading } = usePost<any>( '/auth/signin', JSON.stringify( {
        user: { email, password }
    } ), { credentials: 'include' } )


    return <form className={'flex flex-col gap-4 p-10 w-full'} onSubmit={( e ) => {
        e.preventDefault();
        mutate();
    }}>
        <h1 className={'lg:hidden flex items-center justify-center gap-2'}>
            <img src="/Logo3-128_x_128.png" alt="reptrack logo" className="h-12"/>
            <span className={'text-2xl font-medium text-green-500'}>Reptrack</span>
        </h1>
        <h2 className={'text-white mb-2'}>{tSignIn( 'labelSignIn' )}</h2>
        <RptInput
            id={'signin_email_input'}
            label={tCommon( 'general.email' )}
            value={email}
            onChange={( value ) => setEmail( value )}
            placeholder={tCommon( 'general.email' )}
            error={email.trim().length === 0 ? tSignIn( 'labelEmailRequired' ) : ''}
            required/>
        <RptInput
            id={'signin_password_input'}
            label={tCommon( 'general.password' )}
            value={password}
            onChange={( value ) => setPassword( value )}
            placeholder={tCommon( 'general.password' )}
            error={password.trim().length === 0 ? tSignIn( 'labelPasswordRequired' ) : ''}
            required
            isPassword/>
        <button
            type={'submit'}
            disabled={isLoading}
            className={'w-full bg-green-500 text-black rounded-md p-3 hover:bg-green-400 focus:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed outline-none'}>{tSignIn( 'labelSignIn' )}</button>
        <div className={'flex flex-wrap items-center justify-center gap-2 text-white'}>
            <span>{tSignIn( 'labelNoAccount' )}</span>
            <RptLocalizedLink href={'/signup'}>{tSignIn( 'labelSignUp' )}</RptLocalizedLink>
        </div>
    </form>
}