'use client';

import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import RptLocalizedLink from '@/lib/i18n/RptLocalizedLink';
import { getLocalizedUrl } from '@/lib/i18n/i18n-helper';

interface RptRoute {
    name: string;
    path: string;
    translationKey: string;
    icon: string;
}

export const BottomNav = () => {

    const pathname = usePathname();
    const t = useTranslations( 'routes' );
    const locale = useLocale();

    const isActiveRoute = ( href: string ): boolean => {
        const localizedHref = getLocalizedUrl( href, locale );
        
        if( href === '' || href === '/' ) {
            const localizedPathname = getLocalizedUrl( pathname, locale );
            return localizedPathname === localizedHref;
        }

        return pathname.startsWith( localizedHref );
    }

    const mainRoutes: RptRoute[] = [
        { name: 'Home', path: '/home', translationKey: 'home.routeName', icon: 'home' },
        { name: 'Workouts', path: '/workouts', translationKey: 'workouts.routeName', icon: 'fitness_center' },
        { name: 'Progress', path: '/progress', translationKey: 'progress.routeName', icon: 'trending_up' },
        { name: 'Calendar', path: '/calendar', translationKey: 'calendar.routeName', icon: 'date_range' },
    ]

    return (
        <nav className="absolute w-full h-full flex items-center justify-center bg-transparent">
            <div className="w-full h-full flex items-center justify-evenly bg-transparent">
                {mainRoutes.map( route => <RptLocalizedLink key={'Main-Route-' + route.name} href={route.path}
                    className={`w-full h-full flex flex-col items-center justify-center ${isActiveRoute( route.path )? 'text-green-500': 'text-slate-50'} bg-gray-600 outline-none border-t-2 border-transparent text-xs hover:border-green-400 hover:bg-gray-500`}>
                    <span className="material-icons">{route.icon}</span>
                    {t( route.translationKey )}
                </RptLocalizedLink> )}
            </div>
        </nav>
    )
}