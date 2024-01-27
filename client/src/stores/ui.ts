import { StateCreator } from 'zustand';

export interface UiSlice {
    loadingMessage: string;
    setLoadingMessage: ( message: string ) => void;
    mainMenuOpen: boolean;
    toggleMainMenu: () => void;
}

export const uiSlice: StateCreator<UiSlice> = ( set ) => ( {
    loadingMessage: '',
    mainMenuOpen: false,
    setLoadingMessage: ( message: string ) => set( () => ( { loadingMessage: message } ) ),
    toggleMainMenu: () => set( ( state ) => ( { mainMenuOpen: !state.mainMenuOpen } ) )
} )