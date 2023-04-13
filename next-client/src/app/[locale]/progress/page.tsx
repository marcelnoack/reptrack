'use client';

import { useTranslations } from 'next-intl';

export default function Progress() {
    const tCommon = useTranslations( 'common.prompts' );

    return <>Progress {tCommon( 'enterEmail' )}</>
}
