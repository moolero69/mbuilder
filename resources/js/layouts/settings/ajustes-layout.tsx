import Heading from '@/components/encabezado';
import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DatosCompartidos, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Crown, KeyRound, SunMoon, UserRoundPen } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Perfil',
        href: '/ajustes/perfil',
        icon: <UserRoundPen />,
    },
    {
        title: 'Contraseña',
        href: '/ajustes/contrasena',
        icon: <KeyRound />,
    },
    {
        title: 'Apariencia',
        href: '#',
        icon: <SunMoon />,
    },
];

export default function AjustesLayout({ children }: PropsWithChildren) {
    const rutaActual = window.location.pathname;

    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;

    return (
        <>
            <Header />
            <div className="flex min-h-screen items-start justify-center bg-gradient-to-b from-black to-[#0d0d0d] px-4 py-10">
                <div className="w-full max-w-6xl rounded-xl border border-[var(--morado-neon)] bg-[#0d0d0d]/70 p-10 shadow-[0_0_15px_var(--morado-neon)]">
                    <div className="flex w-full items-center justify-between">
                        <Heading titulo="⚙️ Ajustes de Cuenta" descripcion="Configura tu perfil, preferencias y opciones avanzadas" />
                        {auth.user.es_pro && (
                            <span className='flex gap-3 font-["Orbitron"] text-xl font-extrabold text-[var(--amarillo-neon)]'>
                                <Crown /> USUARIO PRO <Crown />{' '}
                            </span>
                        )}
                    </div>
                    <div className="mt-10 flex flex-col gap-12 lg:flex-row">
                        <aside className="w-full max-w-xs rounded-lg border border-[var(--gris-neon)] bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#1a1a1a] p-6 shadow-[0_0_10px_var(--gris-neon)/30]">
                            <nav className="flex flex-col gap-3">
                                {sidebarNavItems.map((item) => (
                                    <Button
                                        key={item.href}
                                        size="lg"
                                        variant="ghost"
                                        asChild
                                        className={cn(
                                            `flex w-full items-center justify-start gap-3 rounded-md border border-transparent px-4 py-3 text-left font-['Orbitron'] text-base text-[var(--gris-neon)] transition-all duration-200 hover:border-[var(--gris-neon)] hover:bg-[var(--gris-neon)]/10`,
                                            {
                                                'border-[var(--gris-neon)] bg-[var(--gris-neon)]/10 shadow-[0_0_8px_var(--gris-neon)/20]':
                                                    rutaActual.replace('ñ', 'n') === item.href.replace('ñ', 'n'),
                                            },
                                        )}
                                    >
                                        <Link href={item.href} prefetch className="flex items-center gap-3">
                                            <span className="text-[var(--gris-neon)]">{item.icon}</span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </Button>
                                ))}
                            </nav>
                        </aside>
                        <Separator className="my-6 bg-[var(--naranja-neon)] lg:hidden" />
                        <div className="max-w-3xl flex-1">
                            <section className="space-y-12">{children}</section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
