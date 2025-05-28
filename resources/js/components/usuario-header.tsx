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
import { Crown } from 'lucide-react';

export default function UsuarioHeader() {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl px-4 py-2 transition duration-300 hover:bg-[var(--azul-neon)]/10 hover:shadow-[0_0_10px_var(--azul-neon)]">
                    <Avatar>
                        <AvatarImage src={auth.user.url_avatar ? `${auth.user.url_avatar}` : "/img/avatar.png"} />
                        <AvatarFallback className="text-[var(--verde-neon)]">MB</AvatarFallback>
                    </Avatar>
                    <div className="relative flex items-center justify-center">
                        <span className="font-['Orbitron'] text-sm text-[var(--naranja-neon)]">{auth.user.name}</span>
                        {auth.user.es_pro && (
                            <Crown
                                className="absolute -top-2 right-[-14px] h-4 w-4 text-[var(--amarillo-neon)] rotate-35"
                                strokeWidth={2}
                            />
                        )}
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border border-[var(--verde-neon)] bg-[#0d0d0d] colores-borde-glow">
                <DropdownMenuLabel className="font-['Orbitron'] text-[var(--verde-neon)]">Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!auth.user.es_pro && (
                    <>
                        <DropdownMenuItem className='hover:cursor-pointer text-[var(--amarillo-neon)]' asChild>
                            <Link href={route('usuario.suscribirse')}>Hazte PRO</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuGroup>
                    <DropdownMenuItem className='hover:cursor-pointer' asChild>
                        <Link href={route('perfil.editar')}>Ajustes</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[var(--rojo-neon)] w-full" asChild>
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
