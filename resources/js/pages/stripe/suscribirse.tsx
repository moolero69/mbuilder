import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Crown, Headset, ShieldCheck, Star } from 'lucide-react';

export default function SuscripcionPro() {
    return (
        <>
            <AppLayout>
                <Head title="Suscripción PRO" />
                <Header />
                <main className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
                    <div className="flex min-h-[calc(dvh-120px)] items-center justify-center bg-[#0a0a0a] px-4 py-12">
                        <Card className="w-full max-w-md border-[var(--verde-neon)] bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1a1a1a] p-6 text-white shadow-[0_0_25px_var(--verde-neon)]">
                            <CardContent>
                                <div className="space-y-4 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="rotate-340 text-[var(--amarillo-neon)]">
                                            <Crown size={42} />
                                        </span>
                                        <h1 className="text-3xl font-bold text-[var(--verde-neon)]">Suscribirse a PRO</h1>
                                    </div>
                                    <p className="text-xl font-semibold text-white">20€ en un solo pago</p>

                                    <ul className="mt-6 space-y-3 text-left">
                                        <li className="flex items-center gap-3">
                                            <ShieldCheck className="text-[var(--verde-neon)]" />
                                            Guardado ilimitado de montajes
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Headset className="text-[var(--verde-neon)]" />
                                            Asistencia técnica disponible
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Star className="text-[var(--verde-neon)]" />
                                            Acceso anticipado a nuevas funcionalidades
                                        </li>
                                    </ul>

                                    <Button className="mt-6 w-full bg-[var(--verde-neon)] text-black transition-colors hover:bg-green-400" asChild>
                                        <a href={route('stripe.pago')}>Suscribirse ahora</a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </AppLayout>
        </>
    );
}
