import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import DialogoSaltarComponente from '@/components/DialogoSaltarComponente';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { BreadcrumbItem, TarjetaGrafica } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import {
    ArrowBigDown,
    CircuitBoard,
    Euro,
    Factory,
    Gamepad2,
    MemoryStick,
    Microchip,
    Minus,
    Move,
    Plus,
    Search,
    ShieldAlert,
    Wrench,
    Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        titulo: 'Procesador',
        href: '/montaje/procesador',
    },
    {
        titulo: 'Placa base',
        href: '/montaje/placaBase',
    },
    {
        titulo: 'Memoria Ram',
        href: '/montaje/memoriaRam',
    },
    {
        titulo: 'Disco Duro',
        href: '/montaje/discoDuro',
    },
    {
        titulo: 'Tarjeta Gráfica',
        href: '/montaje/tarjetaGrafica',
    },
];

export default function MontajeTarjetaGrafica({ tarjetasGraficas }: { tarjetasGraficas: TarjetaGrafica[] }) {
    const { procesadorGuardado, guardarTarjetaGrafica, editarMontaje, tarjetaGraficaGuardada, componenteSaltado, guardarComponenteSaltado } =
        useProgresoMontaje((state) => state);
    const progresoMontaje = !editarMontaje
        ? ['procesador', 'placaBase', 'memoriaRam', 'discoDuro']
        : ['procesador', 'placaBase', 'memoriaRam', 'discoDuro', 'tarjetaGrafica', 'fuenteAlimentacion', 'torre'];
    const [esCompatible, setEsCompatible] = useState<boolean | null>(null);

    const [graficaSeleccionada, setGraficaSeleccionada] = useState<TarjetaGrafica | null>(editarMontaje ? tarjetaGraficaGuardada! : null);

    const [graficaActiva, setGraficaActiva] = useState<TarjetaGrafica | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [nvidiaDesplegado, setNvidiaDesplegado] = useState(false);
    const [intelDesplegado, setIntelDesplegado] = useState(false);
    const [amdDesplegado, setAmdDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const [graficasFiltradas, setGraficasFiltradas] = useState<TarjetaGrafica[]>(tarjetasGraficas);

    const graficasNvidia = (() => {
        const g = graficasFiltradas?.filter((g) => g.marca === 'NVIDIA' && g.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return g?.length ? g : null;
    })();

    const graficasIntel = (() => {
        const g = graficasFiltradas?.filter((g) => g.marca === 'Intel' && g.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return g?.length ? g : null;
    })();

    const graficasAmd = (() => {
        const g = graficasFiltradas?.filter((g) => g.marca === 'AMD' && g.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return g?.length ? g : null;
    })();

    useEffect(() => {
        !editarMontaje &&
            toast.custom(
                (t) => (
                    <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl border-2 border-[var(--rosa-neon)] bg-black/80 p-4 text-white shadow-lg">
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

        const comprobarCompatibilidad = (grafica: TarjetaGrafica) => {
            const conexionesPorSocket: Record<string, (tarjeta: TarjetaGrafica) => boolean> = {
                // Para AM5 y LGA1700, no hay filtro de precio (se muestran todas las tarjetas gráficas)
                AM5: () => true,
                LGA1700: () => true,

                // Para AM4 y LGA1200, filtramos las tarjetas gráficas cuyo precio sea menor a 600
                AM4: (tarjeta) => tarjeta.precio < 600,
                LGA1200: (tarjeta) => tarjeta.precio < 600,
            };

            const validaciones = conexionesPorSocket[procesadorGuardado!.socket];
            const graficasCompatibles = tarjetasGraficas.filter(validaciones);

            // Calcular cuello de botella
            const passmarkCPU = procesadorGuardado?.passmark || 0;
            const passmarkGPU = grafica?.passmark || 0;

            let cuelloDeBotella = 0;

            if (passmarkGPU > 0) {
                const ratio = (passmarkCPU / passmarkGPU) * 100;
                cuelloDeBotella = Math.max(0, 100 - ratio);
            }

            setEsCompatible(cuelloDeBotella <= 10);
            setGraficasFiltradas(graficasCompatibles);
        };

        !componenteSaltado && comprobarCompatibilidad(tarjetaGraficaGuardada!);
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
        setEsCompatible(true);
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
                {(isDragging || mostrarDialogoSaltarComponente) && (<div className={`fixed inset-0 bg-black/50 backdrop-blur-md ${isDragging ? 'z-10' : 'z-50'}`}></div>)}
                <MontajeLayout
                    breadcrums={breadcrumbs}
                    progresoMontaje={progresoMontaje}
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
                                                        precio={graficasNvidia[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasNvidia[1].id}
                                                        nombre={graficasNvidia[1].nombre}
                                                        icono={<MemoryStick />}
                                                        precio={graficasNvidia[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasNvidia[2].id}
                                                        nombre={graficasNvidia[2].nombre}
                                                        icono={<MemoryStick />}
                                                        precio={graficasNvidia[2].precio}
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
                                                        precio={graficasAmd[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasAmd[1].id}
                                                        nombre={graficasAmd[1].nombre}
                                                        icono={<MemoryStick />}
                                                        precio={graficasAmd[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasAmd[2].id}
                                                        nombre={graficasAmd[2].nombre}
                                                        icono={<MemoryStick />}
                                                        precio={graficasAmd[2].precio}
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
                                                        precio={graficasIntel[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={graficasIntel[1].id}
                                                        nombre={graficasIntel[1].nombre}
                                                        icono={<MemoryStick />}
                                                        precio={graficasIntel[1].precio}
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
                        </div>
                    }
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/20 text-white">
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
                                <AreaSoltarItem botonEliminar={() => setGraficaSeleccionada(null)} mostrarBoton={Boolean(graficaSeleccionada)}>
                                    {!graficaActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {graficaSeleccionada && `${graficaSeleccionada?.marca} ${graficaSeleccionada?.nombre}`}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/*Boton saltar componente*/}
                            {!graficaSeleccionada && (
                                <div className='absolute bottom-2 left-2 border-2 border-[var(--rojo-neon)]/60 p-2 font-["exo_2"]'>
                                    <Button
                                        variant={'link'}
                                        className="text-lg"
                                        onClick={() => {
                                            setMostrarDialogoSaltarComponente(true);
                                        }}
                                    >
                                        No quiero seleccionar gráfica
                                    </Button>
                                </div>
                            )}
                            {mostrarDialogoSaltarComponente && (
                                <DialogoSaltarComponente
                                    componente="tarjeta gráfica"
                                    ruta="montaje.fuenteAlimentacion"
                                    cerrarDialogo={() => setMostrarDialogoSaltarComponente(false)}
                                    onConfirmar={() => {
                                        guardarComponenteSaltado!(true);
                                        guardarTarjetaGrafica!(null);
                                    }}
                                />
                            )}

                            {/* Info del componente con borde neón */}
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
                                    {!esCompatible && (
                                        <div className="mb-3 flex gap-2 border-2 border-[var(--amarillo-neon)] p-3">
                                            <ShieldAlert color="red" />
                                            <p className='font-["exo_2"] font-bold'>Cuello de botella detectado</p>
                                        </div>
                                    )}
                                    <Button
                                        variant={'outline'}
                                        className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${graficaActiva && 'hidden'}`}
                                        onClick={() => {
                                            guardarTarjetaGrafica!(graficaSeleccionada);
                                        }}
                                        asChild
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
