import { useTranslation } from 'react-i18next';
import * as Tooltip from '@radix-ui/react-tooltip';

import rptLogo from '../../assets/Logo-64x64.png'
import { useAuth } from '../auth/hooks/useAuth';
import { RptAvatar } from '../../components/RptAvatar';
import { useRptStore } from '../../stores';

const RptHeader = () => {
    const { t } = useTranslation( 'common' );
    const { user } = useAuth();

    const { toggleMainMenu } = useRptStore();

    return (
        <div className="py-3 mx-4 lg:mx-0">
            <div className="flex items-center justify-between">
                <img src={rptLogo} alt="Logo" className="h-8"/>
                {user?.user &&
                    (
                        <Tooltip.Provider delayDuration={500}>
                            <Tooltip.Root>
                                {/*TODO: Outsource tooltip into own component once its used again somewhere else*/}
                                <Tooltip.Trigger
                                    className="size-8 border border-transparent hover:border-green-500 focus:outline-none focus:border-green-500 rounded-full"
                                    onClick={() => toggleMainMenu()}>
                                    <RptAvatar firstName={user?.user.firstName} lastName={user?.user.lastName}
                                               imageSrc={user?.user.provider?.picture}/>
                                </Tooltip.Trigger>
                                <Tooltip.Content sideOffset={4} collisionPadding={12}
                                                 className="border border-green-500 rounded-lg p-1 text-sm"
                                                 aria-label={t( 'openSettingsMenu', { defaultValue: 'Open Settings Menu' } )}>
                                    <div className="flex flex-col flex-nowrap">
                                        <span
                                            className="font-semibold">{`${user?.user.firstName} ${user?.user.lastName}`}</span>
                                        <span>{user?.user.email}</span>
                                    </div>
                                </Tooltip.Content>
                            </Tooltip.Root>
                        </Tooltip.Provider>
                    )
                }
            </div>
        </div>
    )
}

export default RptHeader;