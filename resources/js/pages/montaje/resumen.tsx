import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import Header from '@/components/header-principal';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { DiscoDuro, FuenteAlimentacion, MemoriaRam, TarjetaGrafica } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, ArrowLeft, Power, CircuitBoard, Euro, Factory, Gamepad2, Gauge, Microchip, Minus, Move, Plus, Search, Wrench, Zap, ScrollText, Puzzle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ResumenMontaje() {
    const { procesadorGuardado, placaBaseGuardada, memoriaRamGuardada, discoDuroGuardado, tarjetaGraficaGuardada, fuenteAlimentacionGuardada } = useProgresoMontaje((state) => state);

    const Componente = ({ nombre, componente, color }: { nombre: string; componente: any; color: string }) => {
        if (!componente) return null;

        return (
            <div className={`bg-[#1f1f1f] p-4 rounded-md border-l-4 border-[var(--${color})] shadow-[0_0_5px_var(--${color})]`}>
                <h3 className={`text-[var(--${color})] text-xl font-semibold mb-1`}>{nombre}</h3>
                <p className="text-white text-sm">{componente.nombre}</p>
                <p className="text-gray-400 text-xs">{componente.marca}</p>
            </div>
        );
    };

    return (
        <>
            <Head title='Resumen del Montaje' />
            <Header />
            {/* <div className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border-4 border-[var(--azul-neon)] rounded-xl p-8 shadow-[0_0_20px_var(--azul-neon)] font-['Orbitron'] text-white space-y-6 max-w-4xl mx-auto">
            <Header />
             <h2 className="text-4xl text-[var(--rosa-neon)] drop-shadow-[0_0_10px_var(--rosa-neon)] animate-[glitch_1s_infinite]">
                 Resumen del Montaje
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">

                 <Componente nombre="Procesador" componente={procesadorGuardado} color="verde-neon" />
                 <Componente nombre="Placa Base" componente={placaBaseGuardada} color="azul-neon" />
                 <Componente nombre="Memoria RAM" componente={memoriaRamGuardada} color="violeta-neon" />
                 <Componente nombre="Disco Duro" componente={discoDuroGuardado} color="rojo-neon" />
                 <Componente nombre="Tarjeta Gráfica" componente={tarjetaGraficaGuardada} color="amarillo-neon" />
                 <Componente nombre="Fuente" componente={fuenteAlimentacionGuardada} color="naranja-neon" />
             </div>

             <hr className="border-[var(--azul-neon)] opacity-40" />

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
                 <div className="p-4 rounded-lg border border-[var(--verde-neon)] shadow-[0_0_10px_var(--verde-neon)]">
                     <h3 className="text-[var(--verde-neon)] text-lg font-bold">Consumo Total</h3>
                     <p className="text-white text-xl">1000W</p>
                 </div>

                 <div className="p-4 rounded-lg border border-[var(--rosa-neon)] shadow-[0_0_10px_var(--rosa-neon)]">
                     <h3 className="text-[var(--rosa-neon)] text-lg font-bold">Precio Total</h3>
                     <p className="text-white text-xl">1300€</p>
                 </div>
             </div>
         </div> */}

            <div className="bg-black p-6 rounded-xl border-2 border-[var(--azul-neon)] shadow-lg animate-[pulseNeon_2s_infinite] mt-5">
                <h2 className="text-6xl font-bold text-[var(--rosa-neon)] drop-shadow-[0_0_10px_var(--rosa-neon)] animate-[glitch_1s_infinite] font-['Orbitron'] mb-6 text-center">
                    RESUMEN DEL MONTAJE
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white font-['Exo_2']">
                    {procesadorGuardado && (
                        <div className="bg-gradient-to-br from-black via-[var(--azul-neon)]/10 to-black p-4 rounded border border-[var(--azul-neon)]">
                            <h3 className="text-xl text-[var(--azul-neon)] font-bold animate-[flicker_3s_infinite]">Procesador</h3>
                            <p>{procesadorGuardado.nombre}</p>
                            <p>Consumo: {procesadorGuardado.consumo}W</p>
                        </div>
                    )}
                    {placaBaseGuardada && (
                        <div className="bg-gradient-to-br from-black via-[var(--verde-neon)]/10 to-black p-4 rounded border border-[var(--verde-neon)]">
                            <h3 className="text-xl text-[var(--verde-neon)] font-bold animate-[flicker_3s_infinite]">Placa Base</h3>
                            <p>{placaBaseGuardada.nombre}</p>
                            <p>Consumo: {placaBaseGuardada.consumo}W</p>
                        </div>
                    )}
                    {memoriaRamGuardada && (
                        <div className="bg-gradient-to-br from-black via-[var(--violeta-neon)]/10 to-black p-4 rounded border border-[var(--violeta-neon)]">
                            <h3 className="text-xl text-[var(--violeta-neon)] font-bold animate-[flicker_3s_infinite]">Memoria RAM</h3>
                            <p>{memoriaRamGuardada.nombre}</p>
                            <p>Consumo: {memoriaRamGuardada.consumo}W</p>
                        </div>
                    )}
                    {discoDuroGuardado && (
                        <div className="bg-gradient-to-br from-black via-[var(--amarillo-neon)]/10 to-black p-4 rounded border border-[var(--amarillo-neon)]">
                            <h3 className="text-xl text-[var(--amarillo-neon)] font-bold animate-[flicker_3s_infinite]">Disco Duro</h3>
                            <p>{discoDuroGuardado.nombre}</p>
                            <p>Consumo: {discoDuroGuardado.consumo}W</p>
                        </div>
                    )}
                    {tarjetaGraficaGuardada && (
                        <div className="bg-gradient-to-br from-black via-[var(--rojo-neon)]/10 to-black p-4 rounded border border-[var(--rojo-neon)]">
                            <h3 className="text-xl text-[var(--rojo-neon)] font-bold animate-[flicker_3s_infinite]">Tarjeta Gráfica</h3>
                            <p>{tarjetaGraficaGuardada.nombre}</p>
                            <p>Consumo: {tarjetaGraficaGuardada.consumo}W</p>
                        </div>
                    )}
                    {fuenteAlimentacionGuardada && (
                        <div className="bg-gradient-to-br from-black via-[var(--cian-neon)]/10 to-black p-4 rounded border border-[var(--cian-neon)]">
                            <h3 className="text-xl text-[var(--cian-neon)] font-bold animate-[flicker_3s_infinite]">Fuente de Alimentación</h3>
                            <p>{fuenteAlimentacionGuardada.nombre}</p>
                            <p>Potencia: {fuenteAlimentacionGuardada.potencia}W</p>
                        </div>
                    )}
                </div>
                <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
                    <button
                        className="bg-black border border-[var(--verde-neon)] text-[var(--verde-neon)] px-6 py-3 rounded-lg font-bold font-['Orbitron'] hover:bg-[var(--verde-neon)] hover:text-black transition-colors duration-1000 animate-[pulseNeon_10s_infinite]"
                        // onClick={handleGuardarMontaje}
                    >
                        Guardar montaje en mi perfil
                    </button>

                    <button
                        className="bg-black border border-[var(--azul-neon)] text-[var(--azul-neon)] px-6 py-3 rounded-lg font-bold font-['Orbitron'] hover:bg-[var(--azul-neon)] hover:text-black transition-colors duration-1000 animate-[pulseNeon_10s_infinite]"
                        // onClick={handleCompartirMontaje}
                    >
                        Compartir montaje
                    </button>

                    <button
                        className="bg-black border border-[var(--rosa-neon)] text-[var(--rosa-neon)] px-6 py-3 rounded-lg font-bold font-['Orbitron'] hover:bg-[var(--rosa-neon)] hover:text-black transition-colors duration-1000 animate-[pulseNeon_10s_infinite]"
                        // onClick={handleExportarPDF}
                    >
                        Exportar a PDF
                    </button>

                    <Button
                        className="bg-black border border-[var(--rojo-neon)] text-[var(--rojo-neon)] px-6 py-3 rounded-lg font-bold font-['Orbitron'] hover:bg-[var(--rojo-neon)] hover:text-black transition-colors duration-1000"
                        // onClick={handleExportarPDF}
                        asChild
                    >
                        <Link href={route('home')}>Salir</Link>
                    </Button>
                </div>

            </div>
        </>
    )
}
