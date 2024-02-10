import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { clsx } from 'clsx';
import { DE, US } from 'country-flag-icons/react/3x2';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const RptLanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const availableLanguages = Object.keys( i18n.store.data );

    const [ open, setOpen ] = useState<boolean>( false );

    // the helpers could be outsourced but are kept in here for now for simplicity
    const languageFlag = ( language?: string ) => {
        if ( language === 'de-DE' ) {
            return <DE className="h-4"/>
        }
        return <US className="h-4"/>
    }

    const languageNativeName = ( language: string ) => {
        if ( language === 'de-DE' ) {
            return 'Deutsch';
        }

        return 'English';
    }

    return <DropdownMenu.Root open={open} onOpenChange={( newOpen ) => setOpen( newOpen )}>
        <DropdownMenu.Trigger asChild
                              className="text-white bg-zinc-500 rounded-lg px-3 py-1 outline-none focus:outline-2 focus:outline-green-500">
            <button className="flex items-center gap-1">
                {languageFlag( i18n.resolvedLanguage )}
                <span className={clsx( 'material-symbols-rounded', open && 'rotate-180' )}>expand_more</span>
            </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="min-w-min text-white bg-zinc-500 shadow-xl rounded-lg" align="end"
                              sideOffset={6}>
            {availableLanguages.map( language => (
                <DropdownMenu.CheckboxItem
                    className="cursor-pointer rounded-lg hover:bg-zinc-400"
                    checked={language === i18n.resolvedLanguage}
                    onClick={() => i18n.changeLanguage( language ).then( th => console.log( 'th', th ) ).catch( err => console.log( 'err', err ) )}>
                    <div className="flex items-center gap-8 px-3 py-2">
                        <div className="flex items-center gap-2">
                            {languageFlag( language )}
                            <span>{languageNativeName( language )}</span>
                        </div>
                        <DropdownMenu.ItemIndicator className="flex items-center justify-center">
                            <span className='material-symbols-rounded'>check</span>
                        </DropdownMenu.ItemIndicator>
                    </div>
                </DropdownMenu.CheckboxItem>
            ) )}
        </DropdownMenu.Content>
    </DropdownMenu.Root>
}