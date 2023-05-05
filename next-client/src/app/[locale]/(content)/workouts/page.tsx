'use client';

import RptLocalizedLink from '@/lib/i18n/RptLocalizedLink';

export default function Workouts() {
    return <div>
        <span>Workouts</span>
        <RptLocalizedLink href={'/progress'}>To Progress</RptLocalizedLink>
    </div>
}
