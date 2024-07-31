import CodeModal from '@/Components/Modals/CodeModal'
import DeleteConfirmModal from '@/Components/Modals/DeleteConfirmModal'
import React from 'react'

type Props = {}

const ModalProvider = (props: Props) => {
    return (
        <>
            <CodeModal />
            <DeleteConfirmModal />
        </>
    )
}

export default ModalProvider