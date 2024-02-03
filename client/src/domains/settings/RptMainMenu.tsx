import { useRptStore } from '../../stores';
import { RptDrawer } from '../../components/overlay/RptDrawer';
import { RptAvatar } from '../../components/RptAvatar';
import { useAuth } from '../auth/hooks/useAuth';
import { useLogout } from '../auth/hooks/useLogout';
import { RptMenuItem } from './components/RptMenuItem';

export const RptMainMenu = () => {
    const { user } = useAuth();
    const { logout } = useLogout();
    const { mainMenuOpen, toggleMainMenu } = useRptStore();

    return <RptDrawer open={mainMenuOpen} onBackdropClick={() => toggleMainMenu()}
                      drawerContent={<div className="h-full flex flex-col">
                          <section id="profile-section" className="p-3 border-b border-zinc-500">
                              <div className="flex flex-col items-start gap-3 p-3">
                                  <div className="size-12">
                                      <RptAvatar firstName={user?.firstName || ''}
                                                 lastName={user?.lastName || ''}
                                                 imageSrc={user?.provider?.picture}/>
                                  </div>
                                  <div className="flex flex-col text-slate-200">
                                      <span
                                          className="font-bold">{user?.provider ? user.provider.displayName : `${user?.firstName} ${user?.lastName}`}</span>
                                      <span className="text-sm">{user?.email}</span>
                                  </div>
                              </div>
                          </section>
                          <section className="p-3 border-b border-zinc-500 flex flex-col gap-3">
                              <RptMenuItem label="Account" icon="account_circle" onClick={() => console.log( 'Soon' )}/>
                              <RptMenuItem label="Settings" icon="settings" onClick={() => console.log( 'Soon' )}/>
                          </section>
                          <section className="p-3 border-b border-zinc-500 flex flex-col gap-3">
                              <RptMenuItem label="FAQ/Help" icon="help" onClick={() => console.log( 'Soon' )}
                                           href="https://google.com"/>
                              <RptMenuItem label="About" icon="info" onClick={() => console.log( 'Soon' )}/>
                          </section>
                          <div className="w-full border-b border-zinc-500 grow"></div>
                          <section className="p-3">
                              <RptMenuItem label="Logout" icon="logout" onClick={() => logout()}/>
                          </section>
                      </div>}/>
}