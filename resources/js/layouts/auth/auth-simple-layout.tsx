import AppLogoIcon from '@/components/app-logo-icon';
import Header from '@/components/header-principal';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10 bg-[linear-gradient(135deg,#0a0a0a,#141414,#1f1f1f)]">
                <div className="w-full max-w-md  p-6 md:p-8">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link
                                href={route('home')}
                                className="flex h-[64px] w-[64px] flex-col items-center gap-2 font-medium transition-transform duration-300"
                            >
                                <AppLogoIcon className="text-[var(--azul-neon)] drop-shadow-[0_0_6px_var(--azul-neon)]" />
                                <span className="sr-only">{title}</span>
                            </Link>
                            <div className="space-y-2 text-center">
                                <h1 className="font-['Orbitron'] text-xl font-bold text-[var(--azul-neon)] drop-shadow-[0_0_5px_var(--azul-neon)]">
                                    {title}
                                </h1>
                                <p className="text-sm text-gray-300">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
