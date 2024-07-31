import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { useForm } from '@inertiajs/react'
import { Loader2 } from 'lucide-react'
import React, { FormEventHandler } from 'react'

type Props = {}

const Login = (props: Props) => {
    const {data,setData,processing,errors,reset,post}  = useForm({
        username: '',
        password: ''
    });

    const onSubmit:FormEventHandler<HTMLFormElement> = e =>{
        e.preventDefault();
        post(route('login'));
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary">
            <div className="w-full max-w-md p-8 space-y-6 bg-background rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form onSubmit={onSubmit} className="space-y-6">
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
            </div>
        </div>
    )
}

export default Login