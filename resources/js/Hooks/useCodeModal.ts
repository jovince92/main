import { Code } from '@/types';
import {create} from 'zustand';

type Props = {
    currentCode?: Code;
    parentCode?: Code;
    isOpen: boolean;
    onOpen: (
        parentCode?: Code,
        currentCode?: Code,
        isAddingSrcCode?: boolean
    ) => void;
    onClose: () => void;
}

export const useCodeModal = create<Props>((set) => ({
    currentCode: undefined,
    parentCode: undefined,
    isOpen: false,
    onOpen: (
        currentCode?: Code,
        parentCode?: Code,
    ) => set({ 
        currentCode, 
        parentCode, 
        isOpen: true,
    }),
    onClose: () => set({ 
        isOpen: false,
        currentCode: undefined,
        parentCode: undefined,
    }),    
}));