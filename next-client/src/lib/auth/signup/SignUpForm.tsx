'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useApi } from '@/lib/data-access/useApi';
import { RptInput } from '@/components/input/RptInput';
import RptLocalizedLink from '@/lib/i18n/RptLocalizedLink';

export const SignUpForm = () => {

    const tCommon = useTranslations( 'common' );
    const tSignUp = useTranslations( 'page.signUp' );

    const { usePost } = useApi();
    const { mutate } = usePost<any>( '/signup', JSON.stringify( {
        user: {
            username: 'FromNextClient',
            firstName: 'Marcel',
            lastName: 'Noack',
            email: 'somemail@mail.com',
            password: 'MyPassWd1234!'
        }
    } ) )

    const [ username, setUsername ] = useState( '' );
    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    return <>
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
        <button
            className={'bg-green-500 text-black rounded-md p-3 hover:bg-green-400 focus:bg-green-400 outline-none'}>{tSignUp( 'labelSignUp' )}</button>
        <div className={'flex flex-wrap items-center justify-center gap-2 text-white'}>
            <span>{tSignUp( 'labelAlreadyAccount' )}</span>
            <RptLocalizedLink href={'/signin'}>{tSignUp( 'labelSignIn' )}</RptLocalizedLink>
        </div>
    </>
}