import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import MobileSiderbar from "./Modals/MobileSiderbar"
import UserButton from "./NavComponents/UserButton"
import { Code, PageProps } from "@/types"
import { usePage } from "@inertiajs/react"
import LoginModal from "./Modals/LoginModal"

type Props = {
    selectedCode?: Code;
}

const Nav = (props: Props) => {
    const {selectedCode} = props;
    const { user } = usePage<PageProps>().props.auth;
    const isAuthenticated = !!user;
    return (
        <nav className="px-4 fixed top-0 h-14 inset-x-0 bg-background z-20 flex items-center justify-between shadow shadow-primary">
            <div className=" font-bold text-lg md:text-2xl">
                <div className="flex items-center gap-x-2">
                    <MobileSiderbar selectedCode={selectedCode}>
                        <Button size='icon-sm' variant='ghost' className="rounded-full flex md:hidden">
                            <Menu />
                        </Button>
                    </MobileSiderbar>
                    <p>CODE MANAGEMENT</p>
                </div>
                <div className="h-[5px]  bg-gradient-to-r from-blue-500 via-red-400 to-primary-foreground w-full rounded-full" />
            </div>
            {isAuthenticated&&<UserButton />}
            {!isAuthenticated&& <LoginModal />}
        </nav>
    )
}

export default Nav