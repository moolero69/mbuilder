import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Star, Crown, Headset } from 'lucide-react';
import Header from '@/components/header-principal';
import { Head } from '@inertiajs/react';

export default function SuscripcionPremium() {
    return (
        <>
            <Head title='Suscripción PRO' />
            <Header />
            <div
                className="flex items-center justify-center bg-[#0a0a0a] px-4 py-12 min-h-[calc(dvh-120px)]"
            >
                <Card className="w-full max-w-md border-[var(--verde-neon)] bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1a1a1a] p-6 text-white shadow-[0_0_25px_var(--verde-neon)]">
                    <CardContent>
                        <div className="text-center space-y-4">
                            <div className='flex gap-3 items-center justify-center'>
                                <span className='text-[var(--amarillo-neon)] rotate-340'><Crown size={42} /></span>
                                <h1 className="text-3xl font-bold text-[var(--verde-neon)]">Suscribirse a PRO</h1>
                            </div>
                            <p className="text-xl font-semibold text-white">20€ en un solo pago</p>

                            <ul className="space-y-3 text-left mt-6">
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

                            <Button className="mt-6 w-full bg-[var(--verde-neon)] text-black hover:bg-green-400 transition-colors" asChild>
                                <a href={route('stripe.pago')}>Suscribirse ahora</a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

