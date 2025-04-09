import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { DiscoDuro, MemoriaRam, TarjetaGrafica } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, ArrowLeft, MemoryStick, CircuitBoard, Euro, Factory, Gamepad2, Gauge, Microchip, Minus, Move, Plus, Search, Wrench, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajeTarjetaGrafica({ tarjetasGraficas }: { tarjetasGraficas: TarjetaGrafica[] }) {
    const { procesadorGuardado, guardarTarjetaGrafica } = useProgresoMontaje((state) => state);


    const [graficaSeleccionada, setGraficaSeleccionada] = useState<TarjetaGrafica | null>(null);

    const [graficaActiva, setGraficaActiva] = useState<TarjetaGrafica | null>(null);


    const [isDragging, setIsDragging] = useState(false);

    const [nvidiaDesplegado, setNvidiaDesplegado] = useState(false);
    const [intelDesplegado, setIntelDesplegado] = useState(false);
    const [amdDesplegado, setAmdDesplegado] = useState(false);


    const [busquedaGeneral, setBusquedaGeneral] = useState('');


    const [graficasFiltradas, setGraficasFiltradas] = useState<TarjetaGrafica[]>();

    const graficasNvidia = (() => {
        const g = graficasFiltradas?.filter(g => g.marca === 'NVIDIA' && g.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return g?.length ? g : null;
    })();
    
    const graficasIntel = (() => {
        const g = graficasFiltradas?.filter(g => g.marca === 'Intel' && g.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return g?.length ? g : null;
    })();
    
    const graficasAmd = (() => {
        const g = graficasFiltradas?.filter(g => g.marca === 'AMD' && g.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return g?.length ? g : null;
    })();




    useEffect(() => {
        toast.custom(
            (t) => (
                <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl bg-black/80 p-4 text-white shadow-lg">
                    <span>
                        <Wrench size={30} className="text-[var(--rojo-neon)]" />
                    </span>
                    <div className="flex w-full justify-center text-center text-xl">
                        <p className="font-['exo_2']">Arrastra tu tarjeta gráfica</p>
                    </div>
                </div>
            ),
            { duration: 3500 },
        );

        const comprobarCompatibilidad = () => {
            const conexionesPorSocket: Record<string, (tarjeta: TarjetaGrafica) => boolean> = {
                // Para AM5 y LGA1700, no hay filtro de precio (se muestran todas las tarjetas gráficas)
                AM5: () => true,
                LGA1700: () => true,

                // Para AM4 y LGA1200, filtramos las tarjetas gráficas cuyo precio sea menor a 600
                AM4: (tarjeta) => tarjeta.precio < 600,
                LGA1200: (tarjeta) => tarjeta.precio < 600,
            };

            const socket = procesadorGuardado?.socket;
            const validaciones = conexionesPorSocket[socket!];

            const graficasCompatibles = tarjetasGraficas.filter(validaciones);

            setGraficasFiltradas(graficasCompatibles);
        };

        comprobarCompatibilidad();
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = tarjetasGraficas.find((g) => g.id === active.id);
            if (item) {
                setGraficaSeleccionada(item);
            }
        }
        setGraficaActiva(null);
        setIsDragging(false);
    };

    const handleDragStart = (event: any) => {
        const item = tarjetasGraficas.find((g) => g.id === event.active.id);
        setGraficaActiva(item || null);
        setIsDragging(true);
    };

    const desplegar = () => {
        setNvidiaDesplegado(true);
        setIntelDesplegado(true);
        setAmdDesplegado(true);
    };

    const replegar = () => {
        setNvidiaDesplegado(false);
        setIntelDesplegado(false);
        setAmdDesplegado(false);
    };
    return (
        <>
            <Head title="montaje - tarjeta grafica" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {/* Blur de fondo al arrastrar */}
                {isDragging && <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md"></div>}
                <MontajeLayout
                    sidebar={
                        <div className="w-full space-y-4">
                            {/* 🔍 Barra de búsqueda general */}
                            <div className="sticky top-0 mt-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar tarjeta gráfica..."
                                    value={busquedaGeneral}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        setBusquedaGeneral(valor);
                                        // Si la búsqueda está vacía, colapsamos los desplegables
                                        valor.trim() === '' && replegar();
                                    }}
                                    onInput={desplegar}
                                    className="w-full rounded-lg border border-gray-600 bg-black p-2 pl-10 text-gray-300 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                />
                                <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                            </div>

                            {/* 💀 NVIDIA */}
                            {graficasNvidia && (
                                <Collapsible open={nvidiaDesplegado} onOpenChange={setNvidiaDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Nvidia
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {nvidiaDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!nvidiaDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasNvidia[0].id}
                                                        nombre={graficasNvidia[0].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[0].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasNvidia[1].id}
                                                        nombre={graficasNvidia[1].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasNvidia[2].id}
                                                        nombre={graficasNvidia[2].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {graficasNvidia.map((grafica) => (
                                            <div key={grafica.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={grafica.id} nombre={grafica.nombre} icono={<MemoryStick />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 AMD */}
                            {graficasAmd && (
                                <Collapsible open={amdDesplegado} onOpenChange={setAmdDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            AMD
                                        </p>
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
                                                    <ItemArrastrable
                                                        id={graficasAmd[0].id}
                                                        nombre={graficasAmd[0].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[0].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasAmd[1].id}
                                                        nombre={graficasAmd[1].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasAmd[2].id}
                                                        nombre={graficasAmd[2].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {graficasAmd.map((grafica) => (
                                            <div key={grafica.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={grafica.id} nombre={grafica.nombre} icono={<MemoryStick />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 INTEL */}
                            {graficasIntel && (
                                <Collapsible open={intelDesplegado} onOpenChange={setIntelDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Intel
                                        </p>
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
                                                    <ItemArrastrable
                                                        id={graficasIntel[0].id}
                                                        nombre={graficasIntel[0].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[0].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasIntel[1].id}
                                                        nombre={graficasIntel[1].nombre}
                                                        icono={<MemoryStick />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {graficasIntel.map((grafica) => (
                                            <div key={grafica.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={grafica.id} nombre={grafica.nombre} icono={<MemoryStick />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                        </div>
                    }
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/20 text-white">
                            <div className="absolute left-[18%] flex items-center text-2xl">
                                <ArrowLeft size={30} />
                                <Link href={route('montaje.discoDuro')}>
                                    <h1 className='font-["exo_2"] underline'>VOLVER AL DISCO DURO</h1>
                                </Link>
                            </div>
                            {graficaActiva ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu tarjeta gráfica aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Tarjeta gráfica
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${graficaActiva && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem>
                                    {!graficaActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {graficaSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/* Info del procesador con borde neón */}
                            {graficaSeleccionada && (
                                <>
                                    <div className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3" key={graficaSeleccionada.id}>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{graficaSeleccionada.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Microchip size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Memoria
                                                </h2>
                                                <p className="text-lg text-gray-300">{graficaSeleccionada.memoria} GB</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <CircuitBoard size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Tipo de memoria
                                                </h2>
                                                <p className="text-lg text-gray-300">{graficaSeleccionada.tipo_memoria}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Gamepad2 size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Serie
                                                </h2>
                                                <p className="text-lg text-gray-300">{graficaSeleccionada.serie}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Zap size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Consumo
                                                </h2>
                                                <p className="text-lg text-gray-300">{graficaSeleccionada.consumo} W</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{graficaSeleccionada.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant={'outline'}
                                        className="fade-in border-[var(--morado-neon)] font-['exo_2']"
                                        onClick={() => {
                                            guardarTarjetaGrafica!(graficaSeleccionada);
                                        }}
                                    >
                                        <Link href={route('montaje.fuenteAlimentacion')}>Siguiente</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {graficaActiva ? (
                        <ItemArrastrable id={graficaActiva.id} nombre={graficaActiva.nombre} icono={<MemoryStick />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
