import Aside from '@/Components/Aside';
import Nav from '@/Components/Nav';
import { cn } from '@/lib/utils';
import ModalProvider from '@/Providers/ModalProvider';
import { Code } from '@/types';
import { ReactNode, useState } from 'react'

type Props = {
    children:ReactNode;
    selectedCode?: Code;
}

const Layout = (props: Props) => {
    const {children,selectedCode} = props;
    
    return (
        <>
            <main className="h-full bg-secondary ">
                <Nav  selectedCode={selectedCode} />
                <Aside selectedCode={selectedCode} />
                <div className={cn("pt-[4.5rem] pb-4 h-full bg-background  ease-in-out transition-all duration-300 pl-0 md:pl-64")}>                
                    {children}                
                </div>
            </main>
            <ModalProvider selectedCode={selectedCode} />
        </>
    )
}

export default Layout