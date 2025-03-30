import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Loader } from '@/components/Loader';
import { Separator } from '@/components/ui/separator';
import ConfiguradorLayout from '@/layouts/app/configurador-layout';
import { Procesador, TarjetaGrafica } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head } from '@inertiajs/react';
import { ArrowBigDown, Cpu, Factory, Power } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Configurador({ procesadores, graficas }: { procesadores: Procesador[]; graficas: TarjetaGrafica[] }) {
    const [procesadorSeleccionado, setProcesadorSeleccionado] = useState<Procesador | null>(null);
    const [procesadorActivo, setProcesadorActivo] = useState<Procesador | null>(null); // Guardamos el ítem activo
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula la carga de la página
        setTimeout(() => setLoading(false), 2000); // 2 segundos
    }, []);

    if (loading) {
        return <Loader />;
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        console.log(event);

        if (over?.id === 'dropzone') {
            const item = procesadores.find((p) => p.id === active.id);
            if (item) {
                setProcesadorSeleccionado(item);
            }
        }
        setProcesadorActivo(null);
        setIsDragging(false);
    };

    const handleDragStart = (event: any) => {
        const item = procesadores.find((p) => p.id === event.active.id);
        setProcesadorActivo(item || null);
        setIsDragging(true);
    };

    return (
        <>
            <Head title="confgurador" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {/* Blur de fondo al arrastrar */}
                {isDragging && <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md"></div>}
                <ConfiguradorLayout
                    sidebar={
                        <div className="justify-center] flex min-h-20 min-w-[100%] flex-col items-center bg-black">
                            {procesadores.map((procesador) => (
                                <div key={procesador.id} className="w-full">
                                    <div className="flex flex-row justify-center gap-5 py-5 align-middle">
                                        <ItemArrastrable id={procesador.id} nombre={procesador.nombre} icono={<Cpu />} />
                                    </div>
                                    <Separator className="border-gray-400 border-[1px]" />
                                </div>
                            ))}
                        </div>
                    }
                    main={
                        <div className="flex h-dvh flex-col items-center gap-3 bg-gray-900 text-white">
                            {procesadorActivo ? (
                                <div className="z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="font-['orbitron'] relative z-20 text-center text-6xl font-extrabold tracking-wide text-[var(--azul-neon)]">
                                        Arrastra tu procesador aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="font-['orbitron'] relative z-20 text-center text-6xl font-extrabold tracking-wide text-[var(--azul-neon)]">
                                    Procesador
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div className="relative z-20 h-[64px] w-[50%] border-2 border-dashed border-[var(--rojo-neon)] bg-black/40">
                                <AreaSoltarItem>
                                    {!procesadorActivo && <h1 className="font-['orbitron'] mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-bold text-transparent]">{procesadorSeleccionado?.nombre}</h1>}
                                </AreaSoltarItem>
                            </div>

                            {/* Info del procesador con borde neón */}
                            <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3">
                                <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                    <Factory size={48} className="text-[var(--rojo-neon)]" />
                                    <div>
                                        <h2 className="font-['orbitron'] mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-bold text-transparent">
                                            Marca
                                        </h2>
                                        <p className="text-lg text-gray-300">{procesadorSeleccionado?.marca}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                    <Cpu size={48} className="text-[var(--rojo-neon)]" />
                                    <div>
                                        <h2 className="font-['orbitron'] mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-bold text-transparent">
                                            Socket
                                        </h2>
                                        <p className="text-lg text-gray-300">{procesadorSeleccionado?.socket}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                    <Power size={48} className="text-[var(--rojo-neon)]" />
                                    <div>
                                        <h2 className="font-['orbitron'] mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-bold text-transparent">
                                            Consumo
                                        </h2>
                                        <p className="text-lg text-gray-300">{procesadorSeleccionado?.consumo}W</p>
                                    </div>
                                </div>

                                
                                <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                    <Power size={48} className="text-[var(--rojo-neon)]" />
                                    <div>
                                        <h2 className="font-['orbitron'] mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-bold text-transparent">
                                            Frecuencia
                                        </h2>
                                        <p className="text-lg text-gray-300">{procesadorSeleccionado?.frecuencia_base}hz / {procesadorSeleccionado?.frecuencia_turbo}hz</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                    <Power size={48} className="text-[var(--rojo-neon)]" />
                                    <div>
                                        <h2 className="font-['orbitron'] mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-bold text-transparent">
                                            Nucleos
                                        </h2>
                                        <p className="text-lg text-gray-300">{procesadorSeleccionado?.nucleos}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                    <Power size={48} className="text-[var(--rojo-neon)]" />
                                    <div>
                                        <h2 className="font-['orbitron'] mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text text-2xl font-bold text-transparent">
                                            Precio
                                        </h2>
                                        <p className="text-lg text-green-300">{procesadorSeleccionado?.precio}€</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                />

                <DragOverlay>
                    {procesadorActivo ? <ItemArrastrable id={procesadorActivo.id} nombre={procesadorActivo.nombre} icono={<Cpu />} /> : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
