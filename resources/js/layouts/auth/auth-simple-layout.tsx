import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    titulo?: string;
    descripcion?: string;
}

export default function AuthSimpleLayout({ children, titulo, descripcion }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10 bg-[linear-gradient(135deg,#0a0a0a,#141414,#1f1f1f)]">
                <div className="w-full max-w-lg p-6 md:p-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={route('home')}
                                className="flex h-[120px] w-[120px] flex-col items-center gap-2 font-medium transition-transform duration-300"
                            >
                                <img src="img/logo-256px.png" alt="logo mbuilder" />
                            </Link>
                            <div className="space-y-2 text-center">
                                <h1 className="font-['Orbitron'] text-2xl font-bold text-[var(--azul-neon)] drop-shadow-[0_0_5px_var(--azul-neon)]">
                                    {titulo}
                                </h1>
                                <p className="text-base text-gray-300">{descripcion}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
