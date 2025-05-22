import { Toaster } from '@/components/ui/sonner';
import { DatosCompartidos } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { limpiarComponentes } from './funciones/funciones';
import { Button } from './ui/button';
import UsuarioHeader from './usuario-header';
import { Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;

    return (
        <>
            <Toaster position="bottom-center" />
            <header className="colores-borde sticky top-0 z-50 flex h-[120px] w-full items-center justify-between border-b-3 bg-gradient-to-r from-[#0d0d0d] via-[#131313] to-[#0d0d0d] px-6 py-4">
                {/* Logo + MBUILDER */}
                <div className="relative z-10 flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-4">
                    <Link
                        href={route('home')}
                        onClick={() => limpiarComponentes()}
                        className="relative flex items-center"
                    >
                        <img src="/img/logo-64px.png" alt="logo mbuilder" />
                        {/* Texto grande solo en escritorio */}
                        <span className="hidden md:flex font-['Orbitron'] text-5xl font-extrabold tracking-widest text-white drop-shadow-[5px_5px_6px_var(--azul-neon)] transition duration-500 hover:drop-shadow-[5px_5px_6px_var(--rojo-neon)] ml-4">
                            MBUILDER
                        </span>
                    </Link>

                    {/* Texto pequeño debajo del icono, solo en móvil */}
                    <span
                        className="font-['Orbitron'] text-base font-extrabold tracking-widest text-white drop-shadow-[5px_5px_6px_var(--azul-neon)] md:hidden"
                    >
                        MBUILDER
                    </span>
                </div>



                {/* Navegación escritorio */}
                <nav className="relative z-10 hidden md:flex items-center space-x-6">
                    {auth.user ? (
                        <>
                            {auth.user.es_admin === 'Si' && (
                                <Button
                                    variant={'link'}
                                    className="text-[var(--azul-neon)] hover:text-white text-lg font-['Exo_2']"
                                    onClick={() => limpiarComponentes()}
                                    asChild
                                >
                                    <Link href={route('admin.procesadores')}>Admin</Link>
                                </Button>
                            )}

                            <Button
                                variant={'link'}
                                className="text-[var(--verde-neon)] hover:text-white text-lg font-['Exo_2']"
                                onClick={() => limpiarComponentes()}
                                asChild
                            >
                                <Link href={route('usuario.montajes')}>Mis montajes</Link>
                            </Button>

                            <UsuarioHeader />
                        </>
                    ) : (
                        <>
                            <Button
                                variant={'outline'}
                                className="border-[var(--verde-neon)] font-['exo_2'] text-[var(--verde-neon)] transition hover:bg-[var(--verde-neon)]/10"
                                asChild
                            >
                                <Link href={route('login')}>Iniciar Sesión</Link>
                            </Button>
                            <Button
                                variant={'outline'}
                                className="border-[var(--azul-neon)] font-['exo_2'] text-[var(--azul-neon)] transition hover:bg-[var(--azul-neon)]/10"
                                asChild
                            >
                                <Link href={route('register')}>Regístrate</Link>
                            </Button>
                        </>
                    )}
                </nav>

                {/* Movil: login/registro a la izquierda, menú a la derecha */}
                <div className="relative z-10 flex items-center gap-2 md:hidden">
                    {/* Login / Registro (izquierda) */}
                    {!auth.user && (
                        <>
                            <Button
                                variant={'outline'}
                                className="border-[var(--verde-neon)] text-xs font-['exo_2'] text-[var(--verde-neon)] transition hover:bg-[var(--verde-neon)]/10 px-2 py-1"
                                asChild
                            >
                                <Link href={route('login')}>Login</Link>
                            </Button>
                            <Button
                                variant={'outline'}
                                className="border-[var(--azul-neon)] text-xs font-['exo_2'] text-[var(--azul-neon)] transition hover:bg-[var(--azul-neon)]/10 px-2 py-1"
                                asChild
                            >
                                <Link href={route('register')}>Registro</Link>
                            </Button>
                        </>
                    )}

                    {/* Menú desplegable (derecha) */}
                    {auth.user && (
                        <>
                            <UsuarioHeader />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="ml-2 h-12 w-12">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-white hover:bg-white/10 h-12 w-12"
                                    >
                                        <Menu className="h-8 w-8" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="relative right-0 mt-4 min-w-[200px] md:min-w-[240px] border-[var(--azul-neon)] bg-[#0d0d0d]"
                                >
                                    {auth.user.es_admin === 'Si' && (
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route('admin.procesadores')}
                                                onClick={() => limpiarComponentes()}
                                                className="text-[var(--azul-neon)] hover:text-white font-['Exo_2']"
                                            >
                                                Admin
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route('usuario.montajes')}
                                            onClick={() => limpiarComponentes()}
                                            className="text-[var(--verde-neon)] hover:text-white font-['Exo_2']"
                                        >
                                            Mis montajes
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
