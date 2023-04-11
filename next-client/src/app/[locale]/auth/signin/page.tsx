'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { RptInput } from '@/components/input/RptInput';

export default function SignIn() {
    const tCommon = useTranslations( 'common' );

    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    return <>
        <RptInput
            label={'Email'}
            value={email}
            onChange={( value ) => setEmail( value )}
            placeholder={tCommon( 'prompts.enterEmail' )}
            error={'Some Error'}
            required/>
        <div className="py-4"></div>
        <RptInput
            label={'Password'}
            value={password}
            onChange={( value ) => setPassword( value )}
            placeholder={tCommon( 'prompts.enterPassword' )}
            required
            isPassword/>
    </>
}
