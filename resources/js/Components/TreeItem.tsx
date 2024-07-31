import { useSelectedCode } from '@/Hooks/useSelectedCode';
import { cn } from '@/lib/utils';
import { Code } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'

type Props = {
    code: Code;
}

const TreeItem = (props: Props) => {
    const { code } = props;
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setSelectedCode(code);
        setIsOpen(v => !v)
    };
    const {selectedCode,setSelectedCode} = useSelectedCode();
    const isCurrent = selectedCode?.id === code.id;
    return (
        <div className="relative">
            <div className={cn("flex items-center cursor-pointer",isCurrent && 'bg-secondary -ml-64 pl-64')} onClick={toggle}>
                <span className="mr-2">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
                <span>{code.name}</span>
            </div>
            {isOpen && (
                <div className={cn("ml-2 border-l pl-3",isCurrent?'border-muted-foreground':'border-muted')}>
                    {code.children.length > 0 ? (
                        code.children.map((child) => (
                            <TreeItem key={child.id} code={child} />
                        ))
                    ) : (
                        <div className="ml-4 border border-dashed text-muted-foreground text-sm px-2.5 py-1 inline-block">
                            <p className='text-nowrap'>No Items</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default TreeItem;