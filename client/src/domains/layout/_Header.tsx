// import { useTranslation } from 'react-i18next';
import rptLogo from '../../assets/Logo3-64_x_64.png'

const RptHeader = () => {
    // const { t } = useTranslation( 'common' );

    return (
        <div className="py-3 mx-4 lg:mx-0">
            <div className="flex items-center justify-center">
                {/*TODO: Back button and its logic, maybe a drawer*/}
                <img src={rptLogo} alt="" className="h-8"/>
                {/*<div>*/}
                {/*    /!*<button>{t( 'submit' )}</button>*!/*/}
                {/*    <button>{t( 'submit' )}</button>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default RptHeader;