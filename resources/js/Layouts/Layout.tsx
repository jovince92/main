import Aside from '@/Components/Aside';
import Nav from '@/Components/Nav';
import { cn } from '@/lib/utils';
import ModalProvider from '@/Providers/ModalProvider';
import { ReactNode, useState } from 'react'

type Props = {
    children:ReactNode;
}

const Layout = (props: Props) => {
    const {children} = props;
    
    return (
        <>
            <main className="h-full bg-secondary overflow-y-auto">
                <Nav />
                <Aside />
                <div className={cn("mt-14 pb-10 py-5 h-full bg-background overflow-y-auto ease-in-out transition-all duration-300 pl-0 md:pl-64")}>                
                    {children}                
                </div>
            </main>
            <ModalProvider />
        </>
    )
}

export default Layout