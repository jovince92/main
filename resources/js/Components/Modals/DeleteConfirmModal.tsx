import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useDeleteConfirmModal } from '@/Hooks/useDeleteConfirmModal'
import { useSelectedCode } from '@/Hooks/useSelectedCode'
import { router } from '@inertiajs/react'


const DeleteConfirmModal = () => {
    const {isOpen,onClose} = useDeleteConfirmModal();
    const {selectedCode} = useSelectedCode();
    
    return (
        <AlertDialog>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the item and all of its children and data.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button>Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteConfirmModal