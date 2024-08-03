import { cn } from '@/lib/utils';
import { Code, PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight, MoreHorizontal, Pencil, PlusSquare, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Button } from './ui/button';
import Hint from './Hint';
import { useCodeModal } from '@/Hooks/useCodeModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useDeleteConfirmModal } from '@/Hooks/useDeleteConfirmModal';

type Props = {
    code: Code;
    selectedCode?: Code;
}

const TreeItem = (props: Props) => {
    const { code,selectedCode } = props;
    const {id} = code;
    const isCurrent = selectedCode?.id === id;
    const {onOpen} = useCodeModal();
    const {onOpen:onDelete} = useDeleteConfirmModal();

    // Initialize isOpen state from local storage
    const [isOpen, setIsOpen] = useState<boolean>(() => localStorage.getItem(`treeItem-${id}`)==='false' ? false : true );

    // Update local storage whenever isOpen changes
    useEffect(() =>  localStorage.setItem(`treeItem-${id}`, isOpen.toString()), [isOpen, id]);

    const toggle = () => setIsOpen(v => !v);
    const Icon = isOpen ? ChevronDown : ChevronRight;

    const handleClick = () => {
        if (isCurrent) return toggle();
        router.get(route('welcome',{id}));
    };

    const handleMenuClick = (e:React.MouseEvent,type:'Delete'|'Rename'|'Add') => {
        e.stopPropagation();
        e.preventDefault();
        switch (type) {
            case 'Delete':
                onDelete(code);
                break;
            case 'Rename':
                onOpen(code);
                break;
            case 'Add':
                onOpen(undefined,code);
                break;
            default:
                break;
        }
    }

    const { user } = usePage<PageProps>().props.auth;
    const isAuthenticated = !!user;

    return (
        <div className="relative">
            <div className={cn("flex items-center gap-x-2 text-muted-foreground hover:text-primary transition duration-300 group",isCurrent && 'font-semibold text-primary bg-secondary -ml-64 pl-64')} >
                <button onClick={toggle}>
                    <Icon className="h-5 w-5" />
                </button>
                <div role='button' onClick={handleClick} className='truncate flex-1 text-left flex items-center justify-between '>
                    {code.name}
                    {isAuthenticated&&(<div className={cn(' transition duration-300 opacity-0 group-hover:opacity-100 gap-x-1',isCurrent && 'opacity-100 md:opacity-0')}>
                        
                        <DropdownMenu>
                            <Hint label='Open Actions'>
                                <DropdownMenuTrigger asChild>                                    
                                    <Button onClick={e=>e.stopPropagation()} variant='ghost' size='icon-xs' className='rounded-lg' >
                                        <MoreHorizontal className='h-4 w-4' />
                                    </Button>                                    
                                </DropdownMenuTrigger>
                            </Hint>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={e=>handleMenuClick(e,'Delete')}>
                                    <Trash2 className='h-4 w-4 mr-2' />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={e=>handleMenuClick(e,'Rename')}>
                                    <Pencil className='h-4 w-4 mr-2' />
                                    <span>Rename</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={e=>handleMenuClick(e,'Add')}>
                                    <PlusSquare className='h-4 w-4 mr-2' />
                                    <span>Add Child</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>)}
                </div>
            </div>
            {isOpen && (
                <div className={cn("ml-2.5 border-l pl-2",isCurrent?'border-muted-foreground':'border-muted')}>
                    {code.children.length > 0 ? code.children.map(child => <TreeItem selectedCode={selectedCode} key={child.id} code={child} />) : (
                        <div className="ml-3.5 inline-block border transition duration-300 border-transparent hover:border-border border-dashed text-muted-foreground text-sm px-2.5 py-0.5  mt-1 ">
                            <p className='text-nowrap w-full'>No Children</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default TreeItem;