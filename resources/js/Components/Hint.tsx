import React, { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

type Props = {
    label: string|ReactNode;
    children: ReactNode;
    side?: 'left' | 'right'| 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    alignOffset?: number;
    className?: string;
}

const Hint = (props: Props) => {
    const {label,children,side='bottom',align='center',sideOffset=0,alignOffset=0,className} = props;
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={cn('z-[500000]',className)}  side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset}>
                    <div>
                        {label}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Hint