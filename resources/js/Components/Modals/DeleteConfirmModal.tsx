import React, { useState } from 'react';
import { AlertDialog,  AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useDeleteConfirmModal } from '@/Hooks/useDeleteConfirmModal';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type Props = {
    
}

const DeleteConfirmModal = () => {
    const {isOpen,onClose,code} = useDeleteConfirmModal();
    const [processing,setProcessing] = useState(false);
    const onDelete = () => {
        if(!code) return;
        router.delete(route('destroy',{id:code.id}),{
            onStart:()=>setProcessing(true),
            onFinish:()=>setProcessing(false),
            onError:e=>{
                console.error(e);
                toast.error('Something went wrong. Please try again');
            },
            onSuccess:()=>{
                toast.success('Item deleted successfully');
                onClose();
            }
        });
    }


    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {`This will delete ${code?.name} and all of it's children permanently. This action cannot be undone.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
                    <Button onClick={onDelete} disabled={processing}>
                        {processing&& <Loader2 className='h-5 w-5 mr-2 animate-spin' />}
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteConfirmModal