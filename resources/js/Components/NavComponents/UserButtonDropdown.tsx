import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import React, { ReactNode } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { LogOut, MoonStarIcon } from 'lucide-react';
import { useTheme } from '@/Providers/ThemeProvider';
import { Switch } from '../ui/switch';

type Props = {
    children:ReactNode;
}

const UserButtonDropdown = (props: Props) => {
    const {children} = props;
    const {user} = usePage<PageProps>().props.auth;
    const {setTheme,theme} = useTheme();

    const isDark = theme === 'dark';
    const toggle = () => setTheme(isDark?'light':'dark');
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-72' side='bottom'>
                <DropdownMenuLabel className='flex items-center justify-between'>
                    <div className='flex flex-col gap-y-1 text-sm'>
                        <p>{`${user.name}`}</p>
                        <p>{`${user.username}`}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-2'>
                            <MoonStarIcon className="h-4 w-4" />
                            <span>Toggle Dark Mode</span>
                        </div>
                        <Switch checked={isDark} onCheckedChange={toggle} />
                    </DropdownMenuItem>
                </DropdownMenuGroup>             
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>router.post(route('logout'))}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserButtonDropdown