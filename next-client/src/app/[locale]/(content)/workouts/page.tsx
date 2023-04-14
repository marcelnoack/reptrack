'use client';

import RptLocalizedLink from '@/lib/i18n/RptLocalizedLink';
import { useAuth } from '@/lib/data-access/auth/useAuth';

export default function Workouts() {
    useAuth()
    return <div>
        <span>Workouts</span>
        <RptLocalizedLink href={'/progress'}>To Progress</RptLocalizedLink>
    </div>
}
