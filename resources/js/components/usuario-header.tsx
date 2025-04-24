import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { usePage } from "@inertiajs/react";
import { DatosCompartidos } from "@/types";


export default function UsuarioHeader() {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex flex-col items-center justify-center gap-2 cursor-pointer rounded-2xl px-4 py-2 transition duration-300 hover:shadow-[0_0_10px_var(--verde-neon)] hover:bg-[var(--verde-neon)]/10">
                    <Avatar>
                        <AvatarImage src="/img/avatar.png" className="h-[40px] w-[40px]" />
                        <AvatarFallback className="text-[var(--verde-neon)]">MB</AvatarFallback>
                    </Avatar>
                    <h2 className="text-sm font-['Orbitron'] text-[var(--verde-neon)]"> {auth.user.name} </h2>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 bg-[#0d0d0d] text-white border border-[var(--verde-neon)] shadow-[0_0_10px_var(--verde-neon)]">
                <DropdownMenuLabel className="text-[var(--verde-neon)] font-['Orbitron']">Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Perfil <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuItem>Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuItem>Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuItem>Keyboard shortcuts <DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[var(--rojo-neon)]">Cerrar sesión <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}