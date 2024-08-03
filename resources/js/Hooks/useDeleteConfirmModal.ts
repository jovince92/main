import { Code } from '@/types';
import {create} from 'zustand';

type Props = {
    isOpen: boolean;
    onOpen: (code:Code) => void;
    onClose: () => void;
    code?: Code;
}

export const useDeleteConfirmModal = create<Props>((set) => ({
    isOpen: false,
    onOpen: (code) => set({
        isOpen: true,
        code
    }),
    onClose: () => set({ 
        isOpen: false,
        code: undefined,
    }),    
}));