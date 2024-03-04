import { useTranslation } from 'react-i18next';

import { useRptStore } from '../../stores';
import { RptLanguageSwitcher } from '../../components/RptLanguageSwitcher';
import { RptDrawer } from '../../components/overlay/RptDrawer';
import { RptAvatar } from '../../components/RptAvatar';
import { useAuth } from '../auth/hooks/useAuth';
import { useLogout } from '../auth/hooks/useLogout';
import { RptMenuItem } from './components/RptMenuItem';

export const RptMainMenu = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { logout } = useLogout();
    const { mainMenuOpen, toggleMainMenu } = useRptStore();

    const handleLogout = async () => {
        await logout();
        toggleMainMenu();
    }

    return <RptDrawer open={mainMenuOpen} onBackdropClick={() => toggleMainMenu()}>
        <div
            className="h-full">
            <div className="h-full flex flex-col">
                <section id="profile-section" className="ps-6 pr-3 py-5 border-b border-zinc-500">
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex items-start justify-between gap-2 w-full">
                            <div className="size-12">
                                <RptAvatar firstName={user?.firstName || ''}
                                           lastName={user?.lastName || ''}
                                           imageSrc={user?.provider?.picture}/>
                            </div>
                            <RptLanguageSwitcher/>
                        </div>
                        <div className="flex flex-col text-slate-200">
                                      <span
                                          className="font-bold">{user?.provider ? user.provider.displayName : `${user?.firstName} ${user?.lastName}`}</span>
                            <span className="text-sm text-green-500">{user?.email}</span>
                        </div>
                    </div>
                </section>
                <section className="p-3 border-b border-zinc-500 flex flex-col gap-3">
                    <RptMenuItem label={t( 'settings.labelAccount', { defaultValue: 'Account' } )}
                                 icon="account_circle"
                                 onClick={() => console.log( 'Soon' )} disabled/>
                    <RptMenuItem label={t( 'settings.labelSettings', { defaultValue: 'Settings' } )}
                                 icon="settings" onClick={() => console.log( 'soon' )} disabled/>
                </section>
                <section className="p-3 border-b border-zinc-500 flex flex-col gap-3">
                    <RptMenuItem label={t( 'settings.labelFAQ', { defaultValue: 'FAQ/Help' } )} icon="help"
                                 onClick={() => console.log( 'Soon' )}
                                 href="https://google.com" disabled/>
                    <RptMenuItem label={t( 'settings.labelAbout', { defaultValue: 'About' } )} icon="info"
                                 onClick={() => console.log( 'Soon' )} disabled/>
                </section>
                <div className="w-full border-b border-zinc-500 grow"></div>
                <section className="p-3">
                    <RptMenuItem label="Logout" icon="logout" onClick={() => handleLogout()}/>
                </section>
            </div>
        </div>
    </RptDrawer>
}