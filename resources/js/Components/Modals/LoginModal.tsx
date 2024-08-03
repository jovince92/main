import React, { FormEventHandler, ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useForm } from '@inertiajs/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2 } from 'lucide-react';


const LoginModal = () => {
    const {data,setData,processing,errors,reset,post}  = useForm({
        username: '',
        password: ''
    });

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('login'));
    }
    return (
        <Dialog onOpenChange={(e)=>!e&&reset()}>
            <DialogTrigger asChild>
                <Button>Log In</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Code Management</DialogTitle>
                    <DialogDescription>
                        Login To Contiue
                    </DialogDescription>
                </DialogHeader>
                              
                <form onSubmit={onSubmit} className="flex flex-col gap-y-3.5">
                    <div>
                        <Label htmlFor="username">
                            Username
                        </Label>
                        <div className="mt-1">
                            <Input
                                value={data.username}
                                onChange={(e)=>setData('username',e.target.value)}
                                autoFocus
                                id="username"
                                name="username"
                                autoComplete="off"
                                required
                                className="w-full"
                                disabled={processing}
                            />
                            {errors.username && <p className='text-sm text-destructive'>{errors.username}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="password" >
                            Password
                        </Label>
                        <div className="mt-1">
                            <Input
                                value={data.password}
                                onChange={(e)=>setData('password',e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                required
                                className="w-full"
                                disabled={processing}
                            />
                            {errors.password && <p className='text-sm text-destructive'>{errors.password}</p>}
                        </div>
                    </div>
                    <div>
                        <Button disabled={processing} type="submit" className="w-full">
                            {processing && <Loader2 className='w-5 h-5 animate-spin mr-2' />}
                            Sign in
                        </Button>
                    </div>
                </form>
                
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal