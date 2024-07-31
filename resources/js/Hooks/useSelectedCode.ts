import { Code } from '@/types';
import {create} from 'zustand';

type Props = {
    selectedCode?: Code;
    setSelectedCode: (code?: Code) => void;
}

export const useSelectedCode = create<Props>((set) => ({
    setSelectedCode: (code?: Code) => set({ 
        selectedCode: code,
    }),
}));