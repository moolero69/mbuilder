import Medidorlayout from "@/layouts/medidor/medidor-layout";
import { Procesador, TarjetaGrafica } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ArrowBigDown, Cpu, MemoryStick, Minus, Move, Plus, Search, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Button } from "@/components/ui/button";
import { ItemArrastrable } from "@/components/ItemArrastrable";
import { Separator } from "@radix-ui/react-separator";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { AreaSoltarItem } from "@/components/AreaSoltarItem";



export default function MedidorCuelloBotella({ procesadores, graficas }: { procesadores: Procesador[], graficas: TarjetaGrafica[] }) {

    const [isDragging, setIsDragging] = useState(false);

    const [busquedaProcesadores, setBusquedaProcesadores] = useState('');
    const [busquedaGraficas, setBusquedaGraficas] = useState('');

    const [procesadorSeleccionado, setProcesadorSeleccionado] = useState<Procesador | null>(null);
    const [graficaSeleccionada, setGraficaSeleccionada] = useState<TarjetaGrafica | null>(null);

    const [procesadorAgarrado, setProcesadorAgarrado] = useState<boolean>(false);
    const [graficaAgarrada, setGraficaAgarrada] = useState<boolean>(false);


    const [procesadorActivo, setProcesadorActivo] = useState<Procesador | null>(null);
    const [graficaActiva, setGraficaActiva] = useState<TarjetaGrafica | null>(null);

    const [componenteActivo, setComponenteActivo] = useState<TarjetaGrafica | Procesador | null>(null);




    const [pIntelDesplegado, setPIntelDesplegado] = useState(false);
    const [pAmdDesplegado, setPAmdDesplegado] = useState(false);

    const [gNvidiaDesplegado, setGNvidiaDesplegado] = useState(false);
    const [gIntelDesplegado, setGIntelDesplegado] = useState(false);
    const [gAmdDesplegado, setGAmdDesplegado] = useState(false);


    const procesadoresAmd = (() => {
        const p = procesadores.filter((p) => p.marca === 'AMD' && p.nombre.toLowerCase().includes(busquedaProcesadores.toLowerCase()));
        return p.length ? p : null;
    })();

    const procesadoresIntel = (() => {
        const p = procesadores.filter((p) => p.marca === 'Intel' && p.nombre.toLowerCase().includes(busquedaProcesadores.toLowerCase()));
        return p.length ? p : null;
    })();

    const graficasNvidia = (() => {
        const g = graficas?.filter((g) => g.marca === 'NVIDIA' && g.nombre.toLowerCase().includes(busquedaGraficas.toLowerCase()));
        return g?.length ? g : null;
    })();

    const graficasIntel = (() => {
        const g = graficas?.filter((g) => g.marca === 'Intel' && g.nombre.toLowerCase().includes(busquedaGraficas.toLowerCase()));
        return g?.length ? g : null;
    })();

    const graficasAmd = (() => {
        const g = graficas?.filter((g) => g.marca === 'AMD' && g.nombre.toLowerCase().includes(busquedaGraficas.toLowerCase()));
        return g?.length ? g : null;
    })();


    const desplegarProc = () => {
        setPIntelDesplegado(true);
        setPAmdDesplegado(true);
    };

    const replegarProc = () => {
        setPIntelDesplegado(false);
        setPAmdDesplegado(false);
    };

    const desplegarGraf = () => {
        setGNvidiaDesplegado(true);
        setGIntelDesplegado(true);
        setGAmdDesplegado(true);
    };

    const replegarGraf = () => {
        setGNvidiaDesplegado(false);
        setGIntelDesplegado(false);
        setGAmdDesplegado(false);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        let item = null;

        const esProcesador = Boolean(procesadores.find((p) => p.id === active.id));
        const esGrafica = Boolean(graficas.find((g) => g.id === active.id));

        if (over?.id === 'dropzone') {
            if (esProcesador) {
                item = procesadores.find((p) => p.id === active.id);
                item && setProcesadorSeleccionado(item)
            } else if (esGrafica) {
                item = graficas.find((g) => g.id === active.id);
                item && setGraficaSeleccionada(item);
            }
        }
        setComponenteActivo(null);
        setIsDragging(false);
        setProcesadorAgarrado(false);
        setGraficaAgarrada(false);
    };

    const handleDragStart = (event: DragStartEvent) => {
        let item = null;
        const { active } = event;

        const esProcesador = Boolean(procesadores.find((p) => p.id === active.id));
        const esGrafica = Boolean(graficas.find((g) => g.id === active.id));

        if (esProcesador) {
            item = procesadores.find((p) => p.id === active.id)
            setComponenteActivo(item!);
            setProcesadorAgarrado(true);
        } else if (esGrafica) {
            item = graficas.find((g) => g.id === active.id)
            setComponenteActivo(item!);
            setGraficaAgarrada(true);
        }

        setIsDragging(true);
    };

    useEffect(() => {
        componenteActivo && console.log('Componente activo: ', componenteActivo)
    }, [componenteActivo])


    return (
        <>
            <Head title="Medidor de Cuello de Botella" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {/* Blur de fondo al arrastrar */}
                {(isDragging) && (
                    <div className={`fixed inset-0 bg-black/50 backdrop-blur-md ${isDragging ? 'z-10' : 'z-50'}`}></div>
                )}
                <Medidorlayout
                    sidebarIzquierdo={
                        <div className="w-full space-y-4">
                            {/* 🔍 Barra de búsqueda general */}
                            <div className="sticky top-0 w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar procesador..."
                                    value={busquedaProcesadores}
                                    onInput={desplegarProc}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        setBusquedaProcesadores(valor);
                                        // Si la búsqueda está vacía, colapsamos los desplegables
                                        valor.trim() === '' && replegarProc();
                                    }}
                                    className="w-full rounded-lg border border-gray-600 bg-black p-2 pl-10 text-gray-300 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                />
                                <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                            </div>

                            {/* 🔵 INTEL */}
                            {procesadoresIntel && (
                                <Collapsible open={pIntelDesplegado} onOpenChange={setPIntelDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Intel
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {pIntelDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!pIntelDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesadoresIntel[0].id}
                                                        nombre={procesadoresIntel[0].nombre}
                                                        icono={<Cpu />}
                                                        precio={procesadoresIntel[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesadoresIntel[1].id}
                                                        nombre={procesadoresIntel[1].nombre}
                                                        icono={<Cpu />}
                                                        precio={procesadoresIntel[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesadoresIntel[2].id}
                                                        nombre={procesadoresIntel[2].nombre}
                                                        icono={<Cpu />}
                                                        precio={procesadoresIntel[2].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {procesadoresIntel.map((procesador) => (
                                            <div key={procesador.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesador.id}
                                                        nombre={procesador.nombre}
                                                        icono={<Cpu />}
                                                        precio={procesador.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 🔴 AMD */}
                            {procesadoresAmd && (
                                <Collapsible open={pAmdDesplegado} onOpenChange={setPAmdDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            AMD
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {pAmdDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!pAmdDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesadoresAmd[0].id}
                                                        nombre={procesadoresAmd[0].nombre}
                                                        icono={<Cpu />}
                                                        precio={procesadoresAmd[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesadoresAmd[1].id}
                                                        nombre={procesadoresAmd[1].nombre}
                                                        icono={<Cpu />}
                                                        precio={procesadoresAmd[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesadoresAmd[2].id}
                                                        nombre={procesadoresAmd[2].nombre}
                                                        icono={<Cpu />}
                                                        precio={procesadoresAmd[2].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}

                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {procesadoresAmd.map((procesador) => (
                                            <div key={procesador.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={procesador.id}
                                                        nombre={procesador.nombre}
                                                        icono={<Cpu />}
                                                        precio={procesador.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {!procesadoresIntel && !procesadoresAmd && (
                                <>
                                    <div className="flex h-full w-full items-center justify-center">
                                        No se ha encontrado ningún procesador que coincida con tu búsqueda.
                                    </div>
                                </>
                            )}

                        </div>
                    }
                    sidebarDerecho={
                        <div className="w-full space-y-4">
                            {/* 🔍 Barra de búsqueda general */}
                            <div className="sticky top-0 w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar gráfica..."
                                    value={busquedaGraficas}
                                    onInput={desplegarGraf}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        setBusquedaGraficas(valor);
                                        // Si la búsqueda está vacía, colapsamos los desplegables
                                        valor.trim() === '' && replegarGraf();
                                    }}
                                    className="w-full rounded-lg border border-gray-600 bg-black p-2 pl-10 text-gray-300 placeholder-gray-500 focus:ring-0 focus:outline-none"
                                />
                                <Search className="absolute top-3 left-3 text-gray-400" size={18} />
                            </div>

                            {/* 💀 NVIDIA */}
                            {graficasNvidia && (
                                <Collapsible open={gNvidiaDesplegado} onOpenChange={setGNvidiaDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            NVIDIA
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {gNvidiaDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!gNvidiaDesplegado && (
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            {graficasNvidia[0] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasNvidia[0].id}
                                                            nombre={graficasNvidia[0].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasNvidia[0].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                            {graficasNvidia[1] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasNvidia[1].id}
                                                            nombre={graficasNvidia[1].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasNvidia[1].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                            {graficasNvidia[2] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasNvidia[2].id}
                                                            nombre={graficasNvidia[2].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasNvidia[2].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {graficasNvidia.map((grafica) => (
                                            <div key={grafica.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={grafica.id}
                                                        nombre={grafica.nombre}
                                                        icono={<MemoryStick />}
                                                        precio={grafica.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 AMD */}
                            {graficasAmd && (
                                <Collapsible open={gAmdDesplegado} onOpenChange={setGAmdDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            AMD
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {gAmdDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!gAmdDesplegado && (
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            {graficasAmd[0] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasAmd[0].id}
                                                            nombre={graficasAmd[0].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasAmd[0].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                            {graficasAmd[1] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasAmd[1].id}
                                                            nombre={graficasAmd[1].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasAmd[1].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                            {graficasAmd[2] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasAmd[2].id}
                                                            nombre={graficasAmd[2].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasAmd[2].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {graficasAmd.map((grafica) => (
                                            <div key={grafica.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={grafica.id}
                                                        nombre={grafica.nombre}
                                                        icono={<MemoryStick />}
                                                        precio={grafica.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 INTEL */}
                            {graficasIntel && (
                                <Collapsible open={gIntelDesplegado} onOpenChange={setGIntelDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Intel
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {gIntelDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!gIntelDesplegado && (
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            {graficasIntel[0] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasIntel[0].id}
                                                            nombre={graficasIntel[0].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasIntel[0].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                            {graficasIntel[1] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasIntel[1].id}
                                                            nombre={graficasIntel[1].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasIntel[1].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                            {graficasIntel[2] && (
                                                <>
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={graficasIntel[2].id}
                                                            nombre={graficasIntel[2].nombre}
                                                            icono={<MemoryStick />}
                                                            precio={graficasIntel[2].precio}
                                                        />
                                                    </div>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {graficasIntel.map((grafica) => (
                                            <div key={grafica.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={grafica.id}
                                                        nombre={grafica.nombre}
                                                        icono={<MemoryStick />}
                                                        precio={grafica.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {!graficasNvidia && !graficasIntel && !graficasAmd && (
                                <div className="flex h-full w-full items-center justify-center">
                                    No se ha encontrado ninguna gráfica que coincida con tu búsqueda.
                                </div>
                            )}
                        </div>
                    }
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/10 text-white">
                            {componenteActivo && (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu {procesadorAgarrado ? 'procesador' : 'gráfica'} aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            {componenteActivo &&
                                <div
                                    className={`relative z-20 h-[80px] w-[50%] border-2 ${componenteActivo && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}>
                                    <AreaSoltarItem
                                        botonEliminar={() => {
                                            setProcesadorSeleccionado(null);
                                        }}
                                    >
                                        {!componenteActivo && (
                                            <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                {procesadorSeleccionado?.nombre}
                                            </h1>
                                        )}
                                    </AreaSoltarItem>
                                </div>
                            }

                            {/* TARJETAS COMPONENTES */}
                            <div className="h-full w-full flex justify-center items-center">
                                <div className="flex h-[75%] w-full bg-gray-100/10">
                                    {/* Procesador */}
                                    <div className="relative flex flex-col h-full w-[50%] justify-center items-center border-r colores-borde">
                                        <h1 className="bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-4xl font-extrabold tracking-wider text-transparent">Procesador</h1>
                                        <h1 className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-2xl font-semibold text-transparent">
                                            {procesadorSeleccionado?.nombre || 'No seleccionado'}
                                        </h1>
                                        {procesadorSeleccionado &&
                                            <Trash2
                                                size={32}
                                                className="absolute bottom-2 right-2 opacity-70 text-[var(--rojo-neon)] cursor-pointer"
                                                onClick={() => setProcesadorSeleccionado(null)}
                                            />
                                        }
                                    </div>

                                    {/* Gráfica */}
                                    <div className="relative flex flex-col h-full w-[50%] justify-center items-center">
                                        <h1 className="bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-4xl font-extrabold tracking-wider text-transparent">Gráfica</h1>
                                        <h1 className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-2xl font-semibold text-transparent">
                                            {graficaSeleccionada?.nombre || 'No seleccionada'}
                                        </h1>
                                        {graficaSeleccionada &&
                                            <Trash2
                                                size={32}
                                                className="absolute bottom-2 right-2 opacity-70 text-[var(--rojo-neon)] cursor-pointer"
                                                onClick={() => setGraficaSeleccionada(null)}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant={'outline'}
                                className={`mb-15 fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${componenteActivo && 'hidden'}`}
                                onClick={() => {
                                    // guardarProcesador!(procesadorSeleccionado);
                                }}
                                asChild
                            >
                                <Link href={route('home')}>Siguiente</Link>
                            </Button>

                        </div>
                    }
                />
                <DragOverlay>
                    {componenteActivo ? (
                        <ItemArrastrable
                            id={componenteActivo.id}
                            nombre={componenteActivo.nombre}
                            icono={<Cpu />}
                            iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    )
}
