import Header from '@/components/header-principal';
import AppLayout from '../app-layout';
import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MedidorLayoutProps } from '@/types';

export default function Medidorlayout({ sidebarIzquierdo, sidebarDerecho, main }: MedidorLayoutProps) {
    const [dialogoAyuda, setDialogoAyuda] = useState(false);

    return (
        <>
            <AppLayout>
                <Header />
                <main className="flex h-[calc(100dvh-120px)]">
                    <section className="w-[18%] flex-col overflow-x-hidden overflow-y-auto bg-gray-700 text-center font-['Exo_2'] border-r border-black">
                        {sidebarIzquierdo}
                    </section>

                    <section className="relative flex h-full w-[64%] flex-col bg-gray-900">
                        {main}

                        {/* Icono interrogación abajo izquierda */}
                        <section
                            className={`absolute bottom-2 ml-4 w-fit rounded-4xl border border-[var(--azul-neon)] bg-black/70 py-2 px-4 backdrop-blur-md hover:cursor-pointer`}
                            onClick={() => setDialogoAyuda(true)}
                            title="Ver vídeo de ayuda"
                        >
                            ?
                        </section>
                    </section>

                    <section className="w-[18%] flex-col overflow-x-hidden overflow-y-auto bg-gray-700 text-center font-['Exo_2'] border-l border-black">
                        {sidebarDerecho}
                    </section>
                </main>

                <Dialog open={dialogoAyuda} onOpenChange={setDialogoAyuda}>
                    <DialogContent className="bg-black p-0 h-[500px] w-[950px]">
                        <video
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover rounded-lg"
                        >
                            <source src="/vid/ayuda-medidor.mp4" type="video/mp4" />
                            Tu navegador no admite vídeos HTML5.
                        </video>
                    </DialogContent>
                </Dialog>
            </AppLayout>
        </>
    );
}
