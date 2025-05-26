import Footer from '@/components/footer-principal';
import { limpiarComponentes } from '@/components/funciones/funciones';
import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DatosCompartidos } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Check, Headset } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TarjetaCookies from './legal/cookies/tarjetaCookies';
import { router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Principal() {
    const page = usePage<DatosCompartidos>();
    const { auth } = page.props;
    const { props }: any = usePage();
    const exito = props.flash?.success;

    useEffect(() => {
        exito &&
            toast.custom(
                (t) => (
                    <div className="mr-15 flex w-[500px] gap-3 rounded-xl bg-white/90 p-4 text-black shadow-lg">
                        <span>
                            <Check size={30} className="text-[var(--rojo-neon)]" />
                        </span>
                        <div className="flex w-full justify-center text-center text-xl">
                            <p className="font-['exo_2']">{exito}</p>
                        </div>
                    </div>
                ),
                { duration: 4000 },
            );
    }, [exito]);

    const [dialogoAsistencia, setDialogoAsistencia] = useState<boolean>(false);

    return (
        <>
            <AppLayout>
                <Head title="mbuilder" />
                <Header />
                {dialogoAsistencia && <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"></div>}
                <div className="relative min-h-dvh w-full text-white">
                    {/* Vídeo de fondo */}
                    <video autoPlay muted loop playsInline className="absolute inset-0 z-0 h-full w-full object-cover opacity-20">
                        <source src="vid/video-principal.mp4" type="video/mp4" />
                    </video>

                    {/* Contenido principal */}
                    <section className="relative z-20 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
                        <div className="grid w-full grid-cols-1 md:grid-cols-2">
                            {/* CONFIGURADOR */}
                            <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[var(--azul-neon)] text-center px-6 py-10">
                                <img src="img/logo-montaje-256px.png" alt="logo mbuilder" className="mb-6 h-50 w-50" />
                                <h2 className="mb-4 text-5xl font-extrabold text-[var(--verde-neon)] drop-shadow-xl">
                                    Construye tu PC ideal
                                </h2>
                                <p className="max-w-2xl text-lg text-white">
                                    Descubre la mejor combinación de componentes para optimizar rendimiento, compatibilidad y eficiencia.
                                </p>
                                <Button
                                    className="mt-6 rounded-3xl bg-[var(--verde-neon)] px-8 py-3 font-bold text-black"
                                    onClick={() => limpiarComponentes()}
                                    asChild
                                >
                                    <Link href={route('montaje.tipo')}>Construir</Link>
                                </Button>
                            </div>

                            {/* MEDIDOR */}
                            <div className="flex flex-col items-center justify-center text-center px-6 py-10">
                                <img src="img/logo-medidor-256px.png" alt="logo mbuilder" className="mb-6 h-50 w-50" />
                                <h2 className="mb-4 text-5xl font-extrabold text-[var(--rojo-neon)] drop-shadow-xl">
                                    Medidor de Cuello de Botella
                                </h2>
                                <p className="max-w-2xl text-white">
                                    Analiza si tu procesador limita a tu tarjeta gráfica o si tu gráfica va sobrada respecto al procesador. Asegúrate de
                                    tener el mejor equilibrio entre potencia y rendimiento.
                                </p>
                                <Button className="mt-6 rounded-3xl bg-[var(--rojo-neon)] px-8 py-3 font-bold text-black" asChild>
                                    <Link href={route('medidor.index')}>Analizar</Link>
                                </Button>
                            </div>
                        </div>

                        <section className="grid grid-cols-1 gap-6 px-6 py-12 text-center md:grid-cols-3">
                            <div className="rounded-lg border border-[var(--verde-neon)] p-6 shadow-lg">
                                <h3 className="text-[var(--verde-neon)] text-xl font-semibold">Compatibilidad</h3>
                                <p className="mt-2 text-white">Verifica que todos los componentes funcionen en armonía.</p>
                            </div>
                            <div className="rounded-lg border border-cyan-400 p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-cyan-400">Rendimiento</h3>
                                <p className="mt-2 text-white">Obtén la mejor potencia según tu presupuesto.</p>
                            </div>
                            <div className="rounded-lg border border-[var(--rojo-neon)] p-6 shadow-lg">
                                <h3 className="text-xl font-semibold text-[var(--rojo-neon)]">Optimización</h3>
                                <p className="mt-2 text-white">Mejor equilibrio entre eficiencia y consumo energético.</p>
                            </div>
                        </section>
                    </section>
                </div>

                {auth.user && auth.user?.es_pro === 'Si' && (
                    <div className="fixed right-6 bottom-6 z-50">
                        <Dialog onOpenChange={setDialogoAsistencia}>
                            <DialogTrigger asChild>
                                <button
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#1a1a1a] via-[#2e2e2e] to-[#353535] text-white shadow-lg transition hover:scale-110 hover:cursor-pointer hover:shadow-[0_0_20px_var(--azul-neon)]"
                                    title="Soporte técnico"
                                >
                                    <Headset className="h-6 w-6" />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="colores-borde-glow z-60 border-1 bg-neutral-900 text-white">
                                <DialogHeader>
                                    <div className="flex items-center justify-center gap-3">
                                        <Headset />
                                        <DialogTitle className="text-[var(--azul-neon)]">¿Necesitas soporte técnico?</DialogTitle>
                                        <Headset />
                                    </div>
                                </DialogHeader>
                                <p className="mt-2 text-base text-gray-300">Nuestro equipo de asistencia PRO está listo para ayudarte.</p>
                                <p className="mt-2 text-base text-gray-300">¿Quieres iniciar una solicitud?</p>
                                <DialogFooter className="mt-4 flex justify-end gap-4">
                                    <Button variant="ghost">Cancelar</Button>
                                    <Button className="bg-[var(--verde-neon)] text-black hover:cursor-pointer hover:bg-[var(--verde-neon)]/80" asChild>
                                        <Link href={route('usuario.asistencia')}>Confirmar</Link>
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
                <Footer />
            </AppLayout>
        </>
    );
}
