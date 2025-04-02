import { DatosCompartidos } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { Toaster } from 'sonner';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Header: React.FC = () => {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;
    return (
        <>
            <Toaster position="bottom-center" />
            <header className="sticky top-0 z-100 flex w-full h-[120px] items-center justify-between border-b-3 border-[var(--verde-neon)] bg-black px-6 py-4 text-white">
                <div className="flex flex-row justify-center gap-3 px-5 align-middle">
                    <img src="/img/logo-64px.png" alt="logo mbuilder" className="bg-white" />
                    <Link href={route('home')} className="inline">
                        <h1 className="mx-4 font-['Orbitron'] text-5xl font-bold text-white drop-shadow-[5px_5px_6px_var(--azul-neon)]">MBUILDER</h1>
                    </Link>
                </div>
                <div>
                    <Button variant={'outline'} className="border-[var(--rosa-neon)]">
                        <Link href={route('pruebas')}>Pruebas</Link>
                    </Button>
                </div>
                <nav>
                    <ul className="flex space-x-10">
                        {auth.user ? (
                            <div className='flex justify-center align-middle items-center gap-7 p-3'>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <Avatar>
                                        <AvatarImage src='/img/avatar.png' className='h-[32px] w-[32px]' />
                                        <AvatarFallback>MB</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-green-300">{auth.user.name}</h2>
                                </div>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--rojo-neon)] px-4 py-2 h-[40px] text-sm hover:cursor-pointer hover:bg-red-500/10 font-['exo_2']"
                                >
                                    Cerrar Sesión
                                </Link>
                            </div>

                        ) : (
                            <>
                                <Button variant={'outline'} className="border-[var(--verde-neon)] font-['exo_2']">
                                    <Link href={route('login')}>Iniciar Sesion</Link>
                                </Button>

                                <Button variant={'outline'} className="border-[var(--azul-neon)] font-['exo_2']">
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
