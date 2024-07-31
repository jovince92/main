import { useCodeModal } from "@/Hooks/useCodeModal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FormEventHandler, useEffect } from "react";
import { Button } from "../ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelectedCode } from "@/Hooks/useSelectedCode";


const CodeModal = () => {
    const {isOpen,onClose,currentCode:code,parentCode} = useCodeModal();
    const {setSelectedCode} = useSelectedCode();
    const isCreatingTopLevel = !code && !parentCode;
    const titleLabel = !!code ? `Edit ${code.name}` : !!parentCode ? `Add an Item to ${parentCode.name}` : 'Create a new Top Level Item';
    const {data,setData,patch,put,errors,processing} =useForm({
        name:code?.name || '',
        parent_id:parentCode?.id || null,
        id:code?.id || null
    });
    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{        
        e.preventDefault();
        if(isCreatingTopLevel){
            put(route('store'),{
                onError:e=>{
                    toast.error('Something went wrong. Please try again');
                    console.error(e);
                    console.error(errors)
                },
                onSuccess:()=>{
                    toast.success('Top Level Item created successfully');
                    onClose();
                }
            });
        }
        if(!!code){
            const {id} = code;
            patch(route('update',{id}),{ 
                preserveState:false,               
                onError:e=>{
                    toast.error('Something went wrong. Please try again');
                    console.error(e);
                    console.error(errors)
                },
                onSuccess:()=>{
                    toast.success('Item updated successfully');
                    onClose();
                    setSelectedCode(code);
                },
            });
        }
        if(!!parentCode){
            put(route('store'),{
                onError:e=>{
                    toast.error('Something went wrong. Please try again');
                    console.error(e);
                    console.error(errors)
                },
                onSuccess:()=>{
                    toast.success('Item added successfully');
                    onClose();
                }
            });
        }
    }

    useEffect(()=>{
        if(!!code) setData('name',code.name);
        if(!!parentCode) setData('parent_id',parentCode.id);
    },[code,parentCode]);


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{titleLabel}</DialogTitle>
                    <DialogDescription>
                        Click Save to save the changes
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
                    <div className="space-y-1">
                        <Label>Name:</Label>
                        <Input required disabled={processing} autoComplete="off" value={data.name} onChange={e=>setData('name',e.target.value)} />
                    </div>
                    <Button disabled={processing} className="ml-auto">
                        {processing  && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CodeModal