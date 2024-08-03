import CodeModal from '@/Components/Modals/CodeModal'
import DeleteConfirmModal from '@/Components/Modals/DeleteConfirmModal'
import SourceCodeModal from '@/Components/Modals/SourceCodeModal'
import { Code } from '@/types'
import React from 'react'

type Props = {
    selectedCode?: Code;
}

const ModalProvider = (props: Props) => {
    const {selectedCode} = props;
    return (
        <>
            <CodeModal />
            <DeleteConfirmModal />
            <SourceCodeModal selectedCode={selectedCode}/>
        </>
    )
}

export default ModalProvider