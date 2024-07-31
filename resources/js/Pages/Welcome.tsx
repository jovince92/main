import Hint from "@/Components/Hint";
import { Button } from "@/Components/ui/button";
import { useCodeModal } from "@/Hooks/useCodeModal";
import { useSelectedCode } from "@/Hooks/useSelectedCode";
import Layout from "@/Layouts/Layout";
import { cn } from "@/lib/utils";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { PencilLineIcon, PlusSquareIcon, Trash2Icon } from "lucide-react";

type Props = {}

const Welcome = (props: Props) => {
    const {selectedCode} = useSelectedCode();
    const {onOpen} = useCodeModal();
    const onAddChildren = () => onOpen(undefined,selectedCode);
    const onEdit = () => onOpen(selectedCode);
    return (
        <Layout>
            <div className="h-full flex flex-col py-2 px-3">
                <div className={cn("flex items-center justify-between group ",!!selectedCode?'opacity-100':'opacity-0')}>
                    <h4 className="text-lg font-semibold">{selectedCode?.name}</h4>
                    <div className="flex items-center gap-x-2 opacity-15 transition duration-300 group-hover:opacity-100">
                        <Hint label='Edit Item'>
                            <Button onClick={onEdit} size='icon'>
                                <PencilLineIcon className="h-6 w-6" />
                            </Button>
                        </Hint>
                        <Hint label='Delete Item'>
                            <Button size='icon'>
                                <Trash2Icon className="h-6 w-6" />
                            </Button>
                        </Hint>
                        <Hint label='Add Children'>
                            <Button size='icon'>
                                <PlusSquareIcon className="h-6 w-6" />
                            </Button>
                        </Hint>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Welcome