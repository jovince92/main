import { Sheet, SheetContent,  SheetDescription,  SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import Aside from '../Aside'
import { ReactNode } from 'react'
import { Code } from '@/types';

type Props = {
    children: ReactNode;
    selectedCode?: Code;
}

const MobileSiderbar = (props: Props) => {
    const {children,selectedCode} = props;
    return (
        <Sheet >
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <SheetHeader className='sr-only'>
                    <SheetTitle />
                    <SheetDescription />
                </SheetHeader>
                <Aside selectedCode={selectedCode} className='flex static h-screen w-full' />           
            </SheetContent>
        </Sheet>
    )
}

export default MobileSiderbar