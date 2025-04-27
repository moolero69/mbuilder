import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DatosCompartidos } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function UsuarioHeader() {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl px-4 py-2 transition duration-300 hover:bg-[var(--azul-neon)]/10 hover:shadow-[0_0_10px_var(--azul-neon)]">
                    <Avatar>
                        <AvatarImage src="/img/avatar.png" className="h-[40px] w-[40px]" />
                        <AvatarFallback className="text-[var(--verde-neon)]">MB</AvatarFallback>
                    </Avatar>
                    <h2 className="font-['Orbitron'] text-sm text-[var(--naranja-neon)]"> {auth.user.name} </h2>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border border-[var(--verde-neon)] bg-[#0d0d0d] colores-borde-glow">
                <DropdownMenuLabel className="font-['Orbitron'] text-[var(--verde-neon)]">Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className='hover:cursor-pointer' asChild>
                        <Link href={route('perfil.editar')}>Ajustes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[var(--rojo-neon)]">
                    {' '}
                    <Link
                        href={route('logout')}
                        method="post"
                        className="text-[var(--rojo-neon)] font-['exo_2'] text-sm hover:cursor-pointer"
                    >
                        Cerrar Sesión
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
