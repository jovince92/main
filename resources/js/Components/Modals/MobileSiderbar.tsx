import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import Aside from '../Aside'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
}

const MobileSiderbar = (props: Props) => {
    const {children} = props;
    return (
        <Sheet >
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side='left' className='p-0'>
                <SheetHeader className='sr-only'>
                    <SheetTitle>Welcome to Code Management</SheetTitle>
                </SheetHeader>
                <Aside className='flex static h-screen w-full' />           
            </SheetContent>
        </Sheet>
    )
}

export default MobileSiderbar