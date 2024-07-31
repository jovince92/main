import UserButtonDropdown from './UserButtonDropdown'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

type Props = {}

const UserButton = (props: Props) => {
    const {user} = usePage<PageProps>().props.auth;
    return (
        <UserButtonDropdown>
            <Button className='rounded-full' size='icon'>
                <Avatar className="h-9 w-9">
                    {/* <AvatarImage src={user.photo} alt="Photo" /> */}
                    <AvatarImage src='https://github.com/shadcn.png' alt="Photo" />
                    <AvatarFallback>{`${user.name.charAt(0)}`}</AvatarFallback>
                </Avatar>
            </Button>
        </UserButtonDropdown>
    )
}

export default UserButton