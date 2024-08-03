

import { Code, PageProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronsLeftRight, MoreHorizontalIcon, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSourceCodeModal } from "@/Hooks/useSourceCodeModal";
import { useDeleteConfirmModal } from "@/Hooks/useDeleteConfirmModal";
import { usePage } from "@inertiajs/react";


export const CodeColumns: ColumnDef<Code>[] = [
    {
        accessorKey: "id",
        header: ({column})=><Button  className='w-full text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>ID<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,        
        cell: ({row})=><p className="font-semibold text-center">{row.original.id}</p>
    },
    {
        accessorKey: "parent_id",
        header: ({column})=><Button  className='w-full text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Parent ID<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="font-semibold text-center">{row.original.parent_id}</p>
    },
    {
        accessorKey: "head_id",
        header: ({column})=><Button  className='w-full text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Head ID<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="font-semibold text-center">{row.original.head_id}</p>
    },
    {
        accessorKey: "code_1",
        header: ({column})=><Button  className='w-full text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>CODE01<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="font-bold tracking-wide text-center font-mono">{row.original.code_1}</p>
    },
    {
        accessorKey: "code_2",
        header: ({column})=><Button  className='w-full text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>CODE02<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className={cn("font-bold tracking-wide text-center font-mono",!row.original.code_2 && 'text-muted-foreground')}>{row.original.code_2 || 'N/A'}</p>
    },    
    {
        accessorKey: "name",
        header: ({column})=><Button  className='w-full text-primary px-0'  variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Code Name<ChevronsLeftRight className="ml-2 h-4 w-4 rotate-90" /></Button>,
        cell: ({row})=><p className="font-bold tracking-wide text-center">{row.original.name}</p>
    },   
    {
        header:()=><div className="text-primary w-full text-end">Actions</div>,
        id:'Actions',
        cell:({row})=> {
            const { user } = usePage<PageProps>().props.auth;
            const isAuthenticated = !!user;
            const {onOpen} = useSourceCodeModal();
            const {onOpen:onDelete} = useDeleteConfirmModal();
            return(
                <div className="flex items-center justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost'  size='icon'>
                                <span className="sr-only">Open Menu</span>
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">    
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled={!isAuthenticated} className={cn(!isAuthenticated&&'cursor-not-allowed')} onClick={()=>onOpen(row.original)}>
                                <Pencil className="h-4 w-4 mr-2" />Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled={!isAuthenticated} className={cn(!isAuthenticated&&'cursor-not-allowed')} onClick={()=>onDelete(row.original)}>
                                <Trash2 className="h-4 w-4 mr-2" />Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        }
    },
]
