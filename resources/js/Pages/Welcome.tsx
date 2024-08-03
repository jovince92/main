import { CodeColumns } from "@/Components/CodeDataTable/Columns";
import { DataTable } from "@/Components/CodeDataTable/DataTable";
import Hint from "@/Components/Hint";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useCodeModal } from "@/Hooks/useCodeModal";
import { useDeleteConfirmModal } from "@/Hooks/useDeleteConfirmModal";
import { useSourceCodeModal } from "@/Hooks/useSourceCodeModal";
import Layout from "@/Layouts/Layout";
import { cn } from "@/lib/utils";
import { Code, PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { PencilLineIcon, PlusSquareIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import CodeBreadCrumbs from "./WelcomeComponents/CodeBreadCrumbs";


export type BreadCrumb = {
    id:number;
    name:string;
    parent_id?:number;
}

type Props = {
    selectedCode?: Code;
    breadcrumb:BreadCrumb[];
}

const Welcome = (props: Props) => {
    const {selectedCode,breadcrumb} = props;
    const {onOpen} = useCodeModal();
    const onAddChildren = () => onOpen(undefined,selectedCode);
    const [filter,setFilter] = useState('');
    const onEdit = () => onOpen(selectedCode);
    const {onOpen:onDelete} = useDeleteConfirmModal();
    const {onOpen:onNewSourceCode} = useSourceCodeModal();
    const sourceCodes = (selectedCode?.items||[]).filter(c => {
        const filterLower = filter.toLowerCase();
        return !!c.code_1 && (
            c.code_1.toLowerCase().includes(filterLower) ||
            c.code_2?.toLowerCase().includes(filterLower) ||
            c.name.toLowerCase().includes(filterLower)
        );
    }) || [];

    const { user } = usePage<PageProps>().props.auth;
    const isAuthenticated = !!user;

    return (
        <>
            <Head title="Welcome" />
            <Layout selectedCode={selectedCode}>
                <div className="h-full flex flex-col  px-3">
                    <div className={cn("flex items-center justify-between group ",!!selectedCode?'opacity-100':'opacity-0')}>
                        <h4 className="text-lg md:text-2xl font-semibold">{selectedCode?.name}</h4>
                        {isAuthenticated&&(<div className="flex items-center gap-x-2 opacity-100 md:opacity-5 transition duration-300 group-hover:opacity-100">
                            <Hint label='Rename Item'>
                                <Button variant='ghost' onClick={onEdit} size='icon-sm'>
                                    <PencilLineIcon className="h-6 w-6" />
                                </Button>
                            </Hint>
                            <Hint label='Delete Item'>
                                <Button onClick={()=>onDelete(selectedCode!)} variant='ghost' size='icon-sm'>
                                    <Trash2Icon className="h-6 w-6" />
                                </Button>
                            </Hint>
                            <Hint label='Add Children'>
                                <Button variant='ghost' onClick={onAddChildren} size='icon-sm'>
                                    <PlusSquareIcon className="h-6 w-6" />
                                </Button>
                            </Hint>
                        </div>)}
                    </div>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-y-5">
                        {!!selectedCode&&(
                            <>                                
                                <div className="flex items-center">
                                    <div className="flex items-center gap-x-3">                            
                                        <Input value={filter} onChange={e=>setFilter(e.target.value)} className="h-9 focus:!ring-0 focus:!ring-offset-0 placeholder:italic" placeholder="Filter Codes..." />
                                        {isAuthenticated&&<Button onClick={()=>onNewSourceCode()} size='sm'>Add New Source Code</Button>}
                                    </div>
                                </div>
                                <CodeBreadCrumbs breadcrumb={breadcrumb} selectedCode={selectedCode} />
                                <DataTable columns={CodeColumns} data={sourceCodes}/>
                            </>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Welcome