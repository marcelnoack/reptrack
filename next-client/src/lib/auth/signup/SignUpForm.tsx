'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useApi } from '@/lib/data-access/useApi';
import { RptInput } from '@/components/input/RptInput';
import RptLocalizedLink from '@/lib/i18n/RptLocalizedLink';
import { useLocalizedUrl } from '@/lib/i18n/useLocalizedUrl';

export const SignUpForm = () => {

    const router = useRouter();

    const tCommon = useTranslations( 'common' );
    const tSignUp = useTranslations( 'page.signUp' );

    const { localizedUrl: localizedSignInHref } = useLocalizedUrl( '/signin' );

    const [ username, setUsername ] = useState( '' );
    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const { usePost } = useApi();
    const { mutateAsync, isLoading } = usePost<any>( '/auth/signup', JSON.stringify( {
        user: {
            username,
            firstName,
            lastName,
            email,
            password
        }
    } ) )

    const handleSignup = async ( e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        try {
            await mutateAsync();
            router.push( localizedSignInHref );
        } catch ( error ) {
            // TODO: Set error message prompt in form
        }
    }


    return <form className={'flex flex-col gap-4 p-10 w-full'} onSubmit={( e ) => handleSignup( e )}>
        <h1 className={'lg:hidden flex items-center justify-center gap-2'}>
            <img src="/Logo3-128_x_128.png" alt="reptrack logo" className="h-12"/>
            <span className={'text-2xl font-medium text-green-500'}>Reptrack</span>
        </h1>
        <h2 className={'text-white mb-2'}>{tSignUp( 'labelSignUp' )}</h2>
        <RptInput
            id={'signup_username_input'}
            label={tCommon( 'general.username' )}
            value={username}
            onChange={( value ) => setUsername( value )}
            placeholder={tCommon( 'general.username' )}
            required/>
        <RptInput
            id={'signup_firstname_input'}
            label={tCommon( 'general.firstName' )}
            value={firstName}
            onChange={( value ) => setFirstName( value )}
            placeholder={tCommon( 'general.firstName' )}
            required/>
        <RptInput
            id={'signup_lastname_input'}
            label={tCommon( 'general.lastName' )}
            value={lastName}
            onChange={( value ) => setLastName( value )}
            placeholder={tCommon( 'general.lastName' )}
            required/>
        <RptInput
            id={'signup_email_input'}
            label={tCommon( 'general.email' )}
            value={email}
            onChange={( value ) => setEmail( value )}
            placeholder={tCommon( 'general.email' )}
            required/>
        <RptInput
            id={'signup_password_input'}
            label={tCommon( 'general.password' )}
            value={password}
            onChange={( value ) => setPassword( value )}
            placeholder={tCommon( 'general.password' )}
            required
            isPassword/>
        {/*TODO: create button component*/}
        <button
            type={'submit'}
            disabled={isLoading}
            className={'bg-green-500 text-black rounded-md p-3 hover:bg-green-400 focus:bg-green-400 disabled:bg-gray-600 disabled:cursor-not-allowed outline-none'}>{tSignUp( 'labelSignUp' )}</button>
        <div className={'flex flex-wrap items-center justify-center gap-2 text-white'}>
            <span>{tSignUp( 'labelAlreadyAccount' )}</span>
            <RptLocalizedLink href={'/signin'}>{tSignUp( 'labelSignIn' )}</RptLocalizedLink>
        </div>
    </form>
}