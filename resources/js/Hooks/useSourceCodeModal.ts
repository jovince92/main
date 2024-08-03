import { Code } from '@/types';
import {create} from 'zustand';

type Props = {
    isOpen: boolean;
    onOpen: (code?:Code) => void;
    onClose: () => void;
    sourceCode?: Code;
}

export const useSourceCodeModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: (sourceCode?:Code) => set({
        isOpen: true,
        sourceCode,
    }),
    onClose: () => set({ 
        isOpen: false, 
        sourceCode: undefined,
    }),    
}));