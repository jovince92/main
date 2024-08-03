import { useSourceCodeModal } from '@/Hooks/useSourceCodeModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { FormEventHandler, useEffect } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useForm, usePage } from '@inertiajs/react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Code } from '@/types';

type Props = {
    selectedCode?: Code;
}

const SourceCodeModal = (props: Props) => {
    const {selectedCode} = props;
    const {isOpen,onClose,sourceCode:code} = useSourceCodeModal();
    const {reset,put,patch,processing,data,setData,errors} = useForm({
        name:"",
        code_1:"",
        code_2:"",
        parent_id:0,
    });
    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        if(!!code){
            const {id} = code;
            patch(route('update',{id}),{
                onError:e=>{
                    toast.error('Something went wrong. Please try again');
                    console.error(e);
                    console.error(errors)
                },
                onSuccess:()=>{
                    toast.success('Source Code updated successfully');
                    onClose();
                },
            });
        }
        if(!code){            
            put(route('store'),{
                onError:e=>{
                    toast.error('Something went wrong. Please try again');
                    console.error(e);
                    console.error(errors)
                },
                onSuccess:()=>{
                    toast.success('Source Code added successfully');
                    onClose();
                }
            });
        }
    }
    useEffect(() => {
        if (!isOpen) {
            reset();
        }

        if (!!selectedCode) {
            setData(val => ({
                ...val,
                parent_id: selectedCode.id
            }));
        }

        if (!!code) {
            setData(val => ({
                ...val,
                name: code.name,
                code_1: code.code_1 || "",
                code_2: code.code_2 || "",
            }));
        }
    }, [isOpen, selectedCode, code]);
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{`Add a Source Code for ${selectedCode?.name}`}</DialogTitle>
                    <DialogDescription>
                        Click Save to save the changes
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className='flex flex-col gap-y-3'>
                    <div className='space-y-1'>
                        <Label>Code Name</Label>
                        <Input disabled={processing} placeholder='Enter Code Name' required value={data.name} onChange={e=>setData('name',e.target.value)} autoFocus autoComplete='off' />
                    </div>
                    <div className='space-y-1'>
                        <Label>Code 1 (required)</Label>
                        <Input disabled={processing} placeholder='Enter Code 1' required value={data.code_1} onChange={e=>setData('code_1',e.target.value)} autoComplete='off' />
                    </div>
                    <div className='space-y-1'>
                        <Label>Code 2 (optional)</Label>
                        <Input disabled={processing} placeholder='Enter Code 2' value={data.code_2} onChange={e=>setData('code_2',e.target.value)} autoComplete='off' />
                    </div>
                    <Button disabled={processing} className='ml-auto'>
                        {processing && <Loader2 className='h-5 w-5 mr-2 animate-spin' />}
                        Save
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default SourceCodeModal