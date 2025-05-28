import { Breadcrumbs } from '@/components/breadcrumbs';
import { hayComponentes } from '@/components/funciones/funciones';
import Header from '@/components/header-principal';
import ProgresoMontaje from '@/components/ProgresoMontaje';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { MontajeLayoutProps } from '@/types';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLayout from '../app-layout';

export default function MontajeLayout({ sidebar, main, breadcrums, progresoMontaje }: MontajeLayoutProps) {
    const { tipoMontaje } = useProgresoMontaje((state) => state);
    const [montajeEditado, setMontajeEditado] = useState(sessionStorage.getItem('nombreMontajeEditar') || null);
    const [color, setColor] = useState('--verde-neon');
    const [dialogoAyuda, setDialogoAyuda] = useState(false);

    useEffect(() => {
        const sinComponentes = hayComponentes();
        if (sinComponentes) {
            window.location.href = '/';
        }
    }, []);

    useEffect(() => {
        function colorBorde() {
            if (tipoMontaje === 'eco') {
                setColor('--verde-neon');
            } else if (tipoMontaje === 'equilibrado') {
                setColor('--azul-neon');
            } else {
                setColor('--rojo-neon');
            }
        }

        colorBorde();
    }, [tipoMontaje]);

    return (
        <>
            <AppLayout>
                <Header />
                <main className="flex h-[calc(100dvh-120px)]">
                    <section
                        className={`w-[18%] flex-col overflow-x-hidden overflow-y-auto border-r border-black bg-gray-700 text-center font-['Exo_2'] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--gris-neon)] dark:[&::-webkit-scrollbar-thumb]:bg-[var(--gris-neon})] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-black`}
                    >
                        {sidebar}
                    </section>
                    <section className="relative flex h-full w-[82%] flex-col bg-gray-900">
                        {breadcrums && (
                            <div className="bg-black/10 p-3">
                                <Breadcrumbs breadcrumbs={breadcrums} />
                            </div>
                        )}
                        {montajeEditado && (
                            <div className="absolute top-1 right-1 flex w-[250px] items-center justify-center gap-2 rounded-lg border border-[var(--azul-neon)] p-3 shadow-[0_0_20px_var(--azul-neon)] backdrop-blur-sm">
                                <Pencil />
                                <p className='font-["Orbitron"] text-xl font-bold'>{montajeEditado}</p>
                            </div>
                        )}

                        <div className="flex h-full w-full justify-center">
                            <div className="flex-1">
                                {/* Icono de interrogación */}
                                <section
                                    className={`absolute mt-2 ml-4 w-fit rounded-4xl border border-[var(${color})] bg-black/70 px-4 py-2 backdrop-blur-md hover:cursor-pointer`}
                                    onClick={() => setDialogoAyuda(true)}
                                >
                                    <span className="text-xl">?</span>
                                </section>

                                {main}
                            </div>
                            {progresoMontaje && (
                                <div
                                    className={`relative right-0 z-20 h-auto w-[300px] overflow-y-auto border-l-4 border-[var(${color})] bg-black/80 p-4 text-white shadow-lg ${montajeEditado && 'mt-4'}`}
                                >
                                    <ProgresoMontaje componentes={progresoMontaje} />
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                <Dialog open={dialogoAyuda} onOpenChange={setDialogoAyuda}>
                    <DialogContent className="h-[500px] w-[950px] bg-black p-0">
                        <video autoPlay muted loop className="z-100 h-full w-full rounded-lg object-cover">
                            <source src="/vid/ayuda-montaje.mp4" type="video/mp4" />
                            Tu navegador no admite vídeos HTML5.
                        </video>
                    </DialogContent>
                </Dialog>
            </AppLayout>
        </>
    );
}
