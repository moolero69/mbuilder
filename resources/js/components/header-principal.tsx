import { Toaster } from '@/components/ui/sonner';
import { DatosCompartidos } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import React from 'react';
import { Button } from './ui/button';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';

const Header: React.FC = () => {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;
    const { editarMontaje, guardarEditarMontaje } = useProgresoMontaje((state) => state);
    return (
        <>
            <Toaster position="bottom-center" />
            <header className="colores-borde sticky top-0 z-50 flex h-[120px] w-full items-center justify-between overflow-hidden border-b-3 bg-black px-6 py-4 text-white">
                {/* <video autoPlay muted loop playsInline className="absolute top-0 left-0 z-0 h-[120px] w-full object-fill opacity-30">
                <source src="vid/video-header.mp4" type="video/mp4" />
                </video> */}

                <div className="relative z-10 flex flex-row justify-center gap-3 px-5 align-middle">
                    <img src="/img/logo-64px.png" alt="logo mbuilder" className="bg-white" />
                    <Link href={route('home')} className="inline" onClick={() => {guardarEditarMontaje!(false); sessionStorage.clear()}}>
                        <h1 className="mx-4 font-['Orbitron'] text-5xl font-bold text-white drop-shadow-[5px_5px_6px_var(--azul-neon)]">MBUILDER</h1>
                    </Link>
                </div>

                <div className="relative z-10">
                    <Button variant={'outline'} className="border-[var(--rosa-neon)]" asChild>
                        <Link href={route('pruebas')}>Pruebas</Link>
                    </Button>
                </div>

                <nav className="relative z-10">
                    <ul className="flex space-x-10">
                        {auth.user ? (
                            <div className="flex items-center justify-center gap-7 p-3 align-middle">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Avatar>
                                        <AvatarImage src="/img/avatar.png" className="h-[32px] w-[32px]" />
                                        <AvatarFallback>MB</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-green-300">{auth.user.name}</h2>
                                </div>
                                <Button variant={'link'} asChild>
                                    <Link href={route('usuario.montajes')}>Mis montajes</Link>
                                </Button>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    className="inline-flex h-[40px] items-center justify-center gap-2 rounded-md border border-[var(--rojo-neon)] px-4 py-2 font-['exo_2'] text-sm hover:cursor-pointer hover:bg-red-500/10"
                                >
                                    Cerrar Sesión
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Button variant={'outline'} className="border-[var(--verde-neon)] font-['exo_2']" asChild>
                                    <Link href={route('login')}>Iniciar Sesion</Link>
                                </Button>
                                <Button variant={'outline'} className="border-[var(--azul-neon)] font-['exo_2']" asChild>
                                    <Link href={route('register')}>Registrate</Link>
                                </Button>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
