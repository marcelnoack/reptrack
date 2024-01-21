import { create } from 'zustand';

import { UiSlice, uiSlice } from './ui';

export const useRptStore = create<UiSlice>()( ( ...a ) => ( {
    ...uiSlice( ...a )
} ) )