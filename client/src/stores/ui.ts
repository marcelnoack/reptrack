import { StateCreator } from 'zustand';

export interface UiSlice {
    loadingMessage: string;
    setLoadingMessage: ( message: string ) => void;
}

export const uiSlice: StateCreator<UiSlice> = ( set ) => ( {
    loadingMessage: '',
    setLoadingMessage: ( message: string ) => set( () => ( { loadingMessage: message } ) )
} )