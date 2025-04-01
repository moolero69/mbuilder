import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ConfiguradorLayout from '@/layouts/app/configurador-layout';
import { Procesador, TarjetaGrafica } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, Cpu, Euro, Factory, Gauge, Minus, Plus, Power, Search, Zap } from 'lucide-react';
import { toast } from "sonner";
import { useEffect, useState } from 'react';

export default function Configurador({ procesadores, graficas }: { procesadores: Procesador[]; graficas: TarjetaGrafica[] }) {
    const [procesadorSeleccionado, setProcesadorSeleccionado] = useState<Procesador | null>(null);
    const [procesadorActivo, setProcesadorActivo] = useState<Procesador | null>(null); // Guardamos el ítem activo
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(true);
    const [intelDesplegado, setIntelDesplegado] = useState(false);
    const [amdDesplegado, setAmdDesplegado] = useState(false);
    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const procesadoresAmd = procesadores.filter((p) => p.marca === 'AMD' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const procesadoresIntel = procesadores.filter((p) => p.marca === 'Intel' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));

    useEffect(() => {
        // Simula la carga de la página
        setTimeout(() => setLoading(false), 1000); // 2 segundos
    }, []);

    if (loading) {
        return <Loader />;
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

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

    const desplegar = () => {
        setIntelDesplegado(true);
        setAmdDesplegado(true);
    };

    return (
        <>
            <Head title="confgurador" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {/* Blur de fondo al arrastrar */}
                {isDragging && <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md"></div>}
                <ConfiguradorLayout
                    sidebar={
                        <div className="w-full space-y-4">
                            {/* 🔍 Barra de búsqueda general */}
                            <div className="relative mt-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar procesador..."
                                    value={busquedaGeneral}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        setBusquedaGeneral(valor);
                                        // Si la búsqueda está vacía, colapsamos los desplegables
                                        if (valor.trim() === '') {
                                            setIntelDesplegado(false);
                                            setAmdDesplegado(false);
                                        }
                                    }}
                                    onInput={desplegar}
                                    className="w-full rounded-lg border border-gray-600 bg-black/70 p-2 pl-10 text-gray-300 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                />
                                <Search className="absolute top-2 left-3 text-gray-400" size={18} />
                            </div>

                            {/* 🔵 INTEL */}
                            <Collapsible open={intelDesplegado} onOpenChange={setIntelDesplegado} className="w-full space-y-2">
                                <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                    <p className="font-['exo_2'] text-lg font-semibold text-[var(--azul-neon)]">Intel</p>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            {intelDesplegado ? <Minus /> : <Plus />}
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                {!intelDesplegado && (
                                    <>
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id="MP-0001" nombre="Intel Core i9-13900K" icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id="MP-0002" nombre="Intel Core i7-13700K" icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id="MP-0003" nombre="Intel Core i5-13600K" icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                        </div>
                                    </>
                                )}
                                <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                    {procesadoresIntel.map((procesador) => (
                                        <div key={procesador.id} className="w-full">
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id={procesador.id} nombre={procesador.nombre} icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                        </div>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>

                            {/* 🔴 AMD */}
                            <Collapsible open={amdDesplegado} onOpenChange={setAmdDesplegado} className="w-full space-y-2">
                                <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                    <p className="font-['exo_2'] text-lg font-semibold text-[var(--rojo-neon)]">AMD</p>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            {amdDesplegado ? <Minus /> : <Plus />}
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                {!amdDesplegado && (
                                    <>
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id="MP-0004" nombre="AMD Ryzen 9 7950X" icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id="MP-0005" nombre="AMD Ryzen 7 7700X" icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id="MP-0006" nombre="AMD Ryzen 5 7600X" icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                        </div>
                                    </>
                                )}

                                <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                    {procesadoresAmd.map((procesador) => (
                                        <div key={procesador.id} className="w-full">
                                            <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                <ItemArrastrable id={procesador.id} nombre={procesador.nombre} icono={<Cpu />} />
                                            </div>
                                            <Separator className="border-[1px] border-gray-600" />
                                        </div>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    }
                    main={
                        <div className="flex h-dvh flex-col items-center gap-3 bg-gray-900 text-white">
                            {procesadorActivo ? (
                                <div className="z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="relative z-20 text-center font-['orbitron'] text-6xl font-extrabold tracking-wide text-[var(--azul-neon)]">
                                        Arrastra tu procesador aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 text-center font-['orbitron'] text-6xl font-extrabold tracking-wide text-[var(--azul-neon)]">
                                    Procesador
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div className={`relative z-20 h-[64px] w-[50%] border-2 ${procesadorActivo && "border-dashed"} border-[var(--rojo-neon)] bg-black/40`}>
                                <AreaSoltarItem>
                                    {!procesadorActivo && (
                                        <h1 className="text-transparent] mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold">
                                            {procesadorSeleccionado?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                                poner toast de arrastrar
                                {!procesadorActivo &&
                                toast("Event has been created", {
                                    description: "Sunday, December 03, 2023 at 9:00 AM",
                                    action: {
                                        label: "Undo",
                                        onClick: () => console.log("Undo"),
                                    }
                                })
                            }
                            </div>

                            {/* Info del procesador con borde neón */}
                            {procesadorSeleccionado && (
                                <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3">
                                    <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                        <Factory size={48} className="text-[var(--rojo-neon)]" />
                                        <div>
                                            <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                Marca
                                            </h2>
                                            <p className="text-lg text-gray-300">{procesadorSeleccionado.marca}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                        <Cpu size={48} className="text-[var(--rojo-neon)]" />
                                        <div>
                                            <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                Socket
                                            </h2>
                                            <p className="text-lg text-gray-300">{procesadorSeleccionado.socket}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                        <Power size={48} className="text-[var(--rojo-neon)]" />
                                        <div>
                                            <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                Consumo
                                            </h2>
                                            <p className="text-lg text-gray-300">{procesadorSeleccionado.consumo}W</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                        <Gauge size={48} className="text-[var(--rojo-neon)]" />
                                        <div>
                                            <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                Frecuencia
                                            </h2>
                                            <p className="text-lg text-gray-300">
                                                {procesadorSeleccionado.frecuencia_base}Hz / {procesadorSeleccionado.frecuencia_turbo}Hz
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                        <Zap size={48} className="text-[var(--rojo-neon)]" />
                                        <div>
                                            <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                Núcleos
                                            </h2>
                                            <p className="text-lg text-gray-300">{procesadorSeleccionado.nucleos}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8">
                                        <Euro size={48} className="text-[var(--rojo-neon)]" />
                                        <div>
                                            <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                Precio
                                            </h2>
                                            <p className="text-lg text-green-300">{procesadorSeleccionado.precio}€</p>
                                        </div>
                                    </div>
                                </div>
                            )}
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
