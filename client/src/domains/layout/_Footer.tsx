import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RptRoute {
    name: string;
    path: string;
    translationKey: string;
    icon: string;
}

const mainRoutes: RptRoute[] = [
    { name: 'Home', path: '/', translationKey: 'home.routeName', icon: 'home' },
    { name: 'Workouts', path: '/workouts', translationKey: 'workouts.routeName', icon: 'fitness_center' },
    { name: 'Progress', path: '/progress', translationKey: 'progress.routeName', icon: 'trending_up' },
    { name: 'Calendar', path: '/calendar', translationKey: 'calendar.routeName', icon: 'date_range' },
]

const RptFooter = () => {
    const { t } = useTranslation( 'translation' );

    return (
        <nav className="absolute w-full h-full flex items-center justify-center bg-transparent">
            <div className="w-full h-full flex items-center justify-evenly bg-transparent">
                {mainRoutes.map( mainRoute => <NavLink key={`Main-Route-${mainRoute.name}`} to={mainRoute.path}
                                                      className={( { isActive } ) => {
                                                          const baseStyling = 'w-full h-full flex flex-col items-center justify-center bg-gray-600 outline-none border-t-2 border-transparent text-xs hover:border-green-400 hover:bg-gray-500';

                                                          return `${baseStyling} ${isActive ? 'text-green-500' : 'text-slate-50'}`
                                                      }
                                                      }>
                    <span className="material-icons">{mainRoute.icon}</span>
                    {t( mainRoute.translationKey, { defaultValue: mainRoute.name } )}
                </NavLink> )}
            </div>
        </nav>
    )
}

export default RptFooter;