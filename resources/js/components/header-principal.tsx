import { Toaster } from '@/components/ui/sonner';
import { DatosCompartidos } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { limpiarComponentes } from './funciones/funciones';
import { Button } from './ui/button';
import UsuarioHeader from './usuario-header';
import { Crown } from 'lucide-react';

const Header: React.FC = () => {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;
    return (
        <>
            <Toaster position="bottom-center" />
            <header className="colores-borde sticky top-0 z-50 flex h-[120px] w-full items-center justify-between border-b-3 bg-gradient-to-r from-[#0d0d0d] via-[#131313] to-[#0d0d0d] px-6 py-4">
                <div className="relative z-10 flex items-center gap-4 px-5">
                    <img src="/img/logo-64px.png" alt="logo mbuilder" className="rounded-sm bg-white shadow-md" />
                    <Link
                        href={route('home')}
                        onClick={() => {
                            sessionStorage.clear();
                            limpiarComponentes();
                        }}
                        className="relative flex items-center"
                    >
                        <span className="font-['Orbitron'] text-5xl font-extrabold tracking-widest text-white drop-shadow-[5px_5px_6px_var(--azul-neon)] transition duration-500 hover:drop-shadow-[5px_5px_6px_var(--rojo-neon)]">
                            MBUILDER
                        </span>
                        {(auth.user && auth.user.es_pro) && (
                            <span className="absolute -top-2 -right-12 rainbow-text font-['Orbitron'] text-lg font-bold rotate-24">
                                PRO
                            </span>
                        )}
                    </Link>
                </div>

                {(auth.user && auth.user.es_admin) === 'Si' &&
                    <div className="relative z-10">
                        <Button variant={'outline'} className="border-[var(--rosa-neon)] transition hover:bg-[var(--rosa-neon)]/10" asChild>
                            <Link href={route('pruebas')}>Pruebas</Link>
                        </Button>
                    </div>
                }

                <nav className="relative z-10">
                    <ul className="flex items-center space-x-6">
                        {auth.user ? (
                            <>
                                <div className="flex items-center gap-5 px-2 py-1">
                                    {auth.user.es_admin === 'Si' && (
                                        <Button
                                            variant={'link'}
                                            className="text-[var(--azul-neon)] hover:text-white"
                                            onClick={() => {
                                                limpiarComponentes();
                                            }}
                                            asChild
                                        >
                                            <Link href={route('admin.procesadores')}>Admin</Link>
                                        </Button>
                                    )}

                                    <Button
                                        variant={'link'}
                                        className="text-[var(--verde-neon)] hover:text-white"
                                        onClick={() => {
                                            limpiarComponentes();
                                        }}
                                        asChild
                                    >
                                        <Link href={route('usuario.montajes')}>Mis montajes</Link>
                                    </Button>

                                    <UsuarioHeader />
                                </div>
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
                    </ul>
                </nav>

            </header>
        </>
    );
};

export default Header;
