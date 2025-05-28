import Header from '@/components/header-principal';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MedidorLayoutProps } from '@/types';
import { useState } from 'react';
import AppLayout from '../app-layout';

export default function Medidorlayout({ sidebarIzquierdo, sidebarDerecho, main }: MedidorLayoutProps) {
    const [dialogoAyuda, setDialogoAyuda] = useState(false);

    return (
        <>
            <AppLayout>
                <Header />
                <main className="flex h-[calc(100dvh-120px)]">
                    <section className="w-[18%] flex-col overflow-x-hidden overflow-y-auto border-r border-black bg-gray-700 text-center font-['Exo_2']">
                        {sidebarIzquierdo}
                    </section>

                    <section className="relative flex h-full w-[64%] flex-col bg-gray-900">
                        {main}

                        {/* Icono interrogación abajo izquierda */}
                        <section
                            className={`absolute bottom-2 ml-4 w-fit rounded-4xl border border-[var(--azul-neon)] bg-black/70 px-4 py-2 backdrop-blur-md hover:cursor-pointer`}
                            onClick={() => setDialogoAyuda(true)}
                            title="Ver vídeo de ayuda"
                        >
                            ?
                        </section>
                    </section>

                    <section className="w-[18%] flex-col overflow-x-hidden overflow-y-auto border-l border-black bg-gray-700 text-center font-['Exo_2']">
                        {sidebarDerecho}
                    </section>
                </main>

                <Dialog open={dialogoAyuda} onOpenChange={setDialogoAyuda}>
                    <DialogContent className="h-[500px] w-[950px] bg-black p-0">
                        <video autoPlay muted loop className="h-full w-full rounded-lg object-cover">
                            <source src="/vid/ayuda-medidor.mp4" type="video/mp4" />
                            Tu navegador no admite vídeos HTML5.
                        </video>
                    </DialogContent>
                </Dialog>
            </AppLayout>
        </>
    );
}
