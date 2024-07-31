import { cn } from '@/lib/utils'
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronRight,ChevronDown, PlusCircle } from 'lucide-react';
import TreeItem from './TreeItem';
import { Input } from './ui/input';
import { useState } from 'react';
import { Button } from './ui/button';
import Hint from './Hint';
import { useCodeModal } from '@/Hooks/useCodeModal';

type Props = {
    className?: string;
}

const Aside = ({className}:Props) => {    
    const { codes } = usePage<PageProps>().props;
    const [filter, setFilter] = useState('');
    const filtered = codes.filter((code) => code.name.toLowerCase().includes(filter.toLowerCase()));
    const {onOpen} = useCodeModal();
    return (
        <aside className={cn("fixed left-0 inset-y-0  bg-background pt-14 z-10 ease-in-out transition-all duration-300 hidden md:flex flex-col gap-y-2 w-64 ",className)}>
            <div className='h-full overflow-y-auto py-3 flex flex-col gap-y-1'>
                <div className='flex items-center gap-x-1'>
                    <Input value={filter} onChange={e=>setFilter(e.target.value)} placeholder='Input name to search...' className='flex-1 placeholder:italic focus:!ring-offset-0 focus:!ring-0'/>
                    <Hint label='Add Top Level Item'>
                        <Button onClick={()=>onOpen()} size='icon'  variant='outline'>
                            <PlusCircle className='h-5 w-5' />
                        </Button>
                    </Hint>
                </div>
                <div className='flex-1 overflow-auto px-4'>
                    {filtered.map((code) => (
                        <TreeItem key={code.id} code={code} />
                    ))}
                    {codes.length === 0 && (
                        <div className='pt-10 space-y-1.5'>
                            <div className='text-center text-secondary-foreground '>No items found</div>
                            <div className='text-center text-muted-foreground text-sm '>Please add new Items</div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default Aside