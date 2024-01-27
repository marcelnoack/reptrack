import { RptDrawer } from '../../components/overlay/RptDrawer';
import { useRptStore } from '../../stores';

export const RptMainMenu = () => {
    const { mainMenuOpen, toggleMainMenu } = useRptStore();

    return <RptDrawer open={mainMenuOpen} onBackdropClick={() => toggleMainMenu()} drawerContent={<></>}/>
}