import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import MobileSiderbar from "./Modals/MobileSiderbar"
import UserButton from "./NavComponents/UserButton"

type Props = {}

const Nav = (props: Props) => {
    return (
        <nav className="px-4 fixed top-0 h-14 inset-x-0 bg-background z-20 flex items-center justify-between shadow shadow-primary">
            <div className=" font-bold text-lg md:text-2xl">
                <div className="flex items-center gap-x-2">
                    <MobileSiderbar>
                        <Button size='icon' variant='ghost' className="rounded-full flex md:hidden">
                            <Menu />
                        </Button>
                    </MobileSiderbar>
                    <p>CODE MANAGEMENT</p>
                </div>
                <div className="h-1.5 bg bg-gradient-to-r from-blue-500 via-red-400 to-primary-foreground w-full rounded-full" />
            </div>
            <UserButton />
        </nav>
    )
}

export default Nav