import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useDeleteConfirmModal } from '@/Hooks/useDeleteConfirmModal'
import { useSelectedCode } from '@/Hooks/useSelectedCode'
import { router } from '@inertiajs/react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const DeleteConfirmModal = () => {
    const {isOpen,onClose} = useDeleteConfirmModal();
    const {selectedCode,setSelectedCode} = useSelectedCode();
    const [processing,setProcessing] = useState(false);
    const onDelete = () => {
        if(!selectedCode) return;
        router.delete(route('destroy',{id:selectedCode.id}),{
            onStart:()=>setProcessing(true),
            onFinish:()=>setProcessing(false),
            onError:e=>{
                console.error(e);
                toast.error('Something went wrong. Please try again');
            },
            onSuccess:()=>{
                toast.success('Item deleted successfully');
                onClose();
                setSelectedCode(undefined);
            }
        });
    }


    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the item and all of its children and data.
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