import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import DialogoSaltarComponente from '@/components/DialogoSaltarComponente';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { TooltipIncopatibilidadComponente } from '@/components/TooltipIncopatibilidad';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/montaje/montaje-layout';
import { BreadcrumbItem, FuenteAlimentacion } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, Euro, Factory, Minus, Move, Plus, Power, Puzzle, ScrollText, Search, Wrench, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajeFuenteAlimentacion({ fuentesAlimentacion }: { fuentesAlimentacion: FuenteAlimentacion[] }) {
    const {
        guardarFuenteAlimentacion,
        editarMontaje,
        componenteSaltado,
        procesadorGuardado,
        placaBaseGuardada,
        disipadorGuardado,
        memoriaRamGuardada,
        memoriaRamSecundariaGuardada,
        discoDuroGuardado,
        discoDuroSecundarioGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
        guardarComponenteSaltado,
    } = useProgresoMontaje((state) => state);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            titulo: 'Procesador',
            href: '/montaje/procesador',
            componente: procesadorGuardado,
        },
        {
            titulo: 'Disipador',
            href: '/montaje/disipador',
            componente: disipadorGuardado,
        },
        {
            titulo: 'Placa base',
            href: '/montaje/placaBase',
            componente: placaBaseGuardada,
        },
        {
            titulo: 'Memoria RAM',
            href: '/montaje/memoriaRam',
            componente: memoriaRamGuardada,
        },
        {
            titulo: 'Disco Duro',
            href: '/montaje/discoDuro',
            componente: discoDuroGuardado,
        },
        {
            titulo: 'Tarjeta Gráfica',
            href: '/montaje/tarjetaGrafica',
            componente: tarjetaGraficaGuardada,
        },
        {
            titulo: 'Fuente de Alimentacion',
            href: '/montaje/fuenteAlimentacion',
            componente: fuenteAlimentacionGuardada,
            activo: true,
        },
        {
            titulo: 'Torre',
            href: '/montaje/torre',
            componente: torreGuardada,
        },
    ];

    const progresoMontaje = [
        'procesador',
        'disipador',
        'placaBase',
        'memoriaRam',
        'memoriaRamSecundaria',
        'discoDuro',
        'discoDuroSecundario',
        'tarjetaGrafica',
        'fuenteAlimentacion',
        'torre',
    ];

    const [fuenteSeleccionada, setFuenteSeleccionada] = useState<FuenteAlimentacion | null>(fuenteAlimentacionGuardada!);
    const [esCompatible, setEsCompatible] = useState<boolean | null>(true);

    const [fuenteActiva, setFuenteActiva] = useState<FuenteAlimentacion | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [corsairDesplegado, setCorsairDesplegado] = useState(false);
    const [evgaDesplegado, setEvgaDesplegado] = useState(false);
    const [thermaltakeDesplegado, setThermaltakeDesplegado] = useState(false);
    const [bequietDesplegado, setBequietDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const [fuentesFiltradas, setFuentesFiltradas] = useState<FuenteAlimentacion[]>(fuentesAlimentacion);

    const fuentesCorsair = (() => {
        const f = fuentesFiltradas?.filter((f) => f.marca === 'Corsair' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return f?.length ? f : null;
    })();

    const fuentesEvga = (() => {
        const f = fuentesFiltradas?.filter((f) => f.marca === 'EVGA' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return f?.length ? f : null;
    })();

    const fuentesThermaltake = (() => {
        const f = fuentesFiltradas?.filter((f) => f.marca === 'Thermaltake' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return f?.length ? f : null;
    })();

    const fuentesBequiet = (() => {
        const f = fuentesFiltradas?.filter((f) => f.marca === 'Be Quiet!' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return f?.length ? f : null;
    })();

    useEffect(() => {
        !editarMontaje &&
            toast.custom(
                (t) => (
                    <div className="ml-20 flex w-[450px] items-center gap-3 rounded-xl border-2 border-[var(--rosa-neon)] bg-black/80 p-4 text-white shadow-lg">
                        <span>
                            <Wrench size={30} className="text-[var(--rojo-neon)]" />
                        </span>
                        <div className="flex w-full justify-center text-center text-xl">
                            <p className="font-['exo_2']">Arrastra tu fuente de alimentacion</p>
                        </div>
                    </div>
                ),
                { duration: 2750 },
            );

        function filtrarFuentes() {
            const sumaTotalConsumo =
                (procesadorGuardado?.consumo ?? 0) +
                (disipadorGuardado?.consumo ?? 0) +
                (placaBaseGuardada?.consumo ?? 0) +
                (memoriaRamGuardada?.consumo ?? 0) +
                (memoriaRamSecundariaGuardada?.consumo ?? 0) +
                (discoDuroGuardado?.consumo ?? 0) +
                (discoDuroSecundarioGuardado?.consumo ?? 0) +
                (tarjetaGraficaGuardada?.consumo ?? 0);

            const fuentesCompatibles = fuentesAlimentacion.filter((fuente) => fuente.potencia > sumaTotalConsumo);

            setFuentesFiltradas(fuentesCompatibles);
        }

        !componenteSaltado && filtrarFuentes();
    }, []);

    function comprobarCompatibilidad() {
        if (!fuenteSeleccionada) return;

        const sumaTotalConsumo =
            (procesadorGuardado?.consumo ?? 0) +
            (disipadorGuardado?.consumo ?? 0) +
            (placaBaseGuardada?.consumo ?? 0) +
            (memoriaRamGuardada?.consumo ?? 0) +
            (memoriaRamSecundariaGuardada?.consumo ?? 0) +
            (discoDuroGuardado?.consumo ?? 0) +
            (discoDuroSecundarioGuardado?.consumo ?? 0) +
            (tarjetaGraficaGuardada?.consumo ?? 0);

        const fuenteIncompatible = fuenteSeleccionada.potencia > sumaTotalConsumo;

        setEsCompatible(fuenteIncompatible);
    }

    useEffect(() => {
        fuenteSeleccionada && comprobarCompatibilidad();
    }, [fuenteSeleccionada]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = fuentesAlimentacion.find((f) => f.id === active.id);
            if (item) {
                setFuenteSeleccionada(item);
                guardarFuenteAlimentacion!(item);
            }
        }
        setFuenteActiva(null);
        setIsDragging(false);
        setEsCompatible(true);
    };

    const handleDragStart = (event: any) => {
        const item = fuentesAlimentacion.find((f) => f.id === event.active.id);
        setFuenteActiva(item || null);
        setIsDragging(true);
    };

    const desplegar = () => { };

    const replegar = () => { };
    return (
        <>
            <Head title="montaje - fuente alimentacion" />
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                {/* Blur de fondo al arrastrar */}
                {(isDragging || mostrarDialogoSaltarComponente) && (
                    <div className={`fixed inset-0 bg-black/50 backdrop-blur-md ${isDragging ? 'z-10' : 'z-50'}`}></div>
                )}
                <MontajeLayout
                    breadcrums={breadcrumbs}
                    progresoMontaje={progresoMontaje}
                    sidebar={
                        <div className="w-full space-y-4">
                            {/* 🔍 Barra de búsqueda general */}
                            <div className="sticky top-0 mt-2 w-full">
                                <input
                                    type="text"
                                    placeholder="Buscar fuente de alimentacion..."
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

                            {/* 💀 CORSAIR */}
                            {fuentesCorsair && (
                                <Collapsible open={corsairDesplegado} onOpenChange={setCorsairDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Corsair
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {corsairDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!corsairDesplegado && (
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            {fuentesCorsair[0] && (
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesCorsair[0].id}
                                                        nombre={fuentesCorsair[0].nombre}
                                                        icono={<Power />}
                                                        precio={fuentesCorsair[0].precio}
                                                    />
                                                </div>
                                            )}
                                            {fuentesCorsair[1] && (
                                                <>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={fuentesCorsair[1].id}
                                                            nombre={fuentesCorsair[1].nombre}
                                                            icono={<Power />}
                                                            precio={fuentesCorsair[1].precio}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <CollapsibleContent>
                                        {fuentesCorsair.map((fuente) => (
                                            <div key={fuente.id} className="space-y-3 bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuente.id}
                                                        nombre={fuente.nombre}
                                                        icono={<Power />}
                                                        precio={fuente.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 EVGA */}
                            {fuentesEvga && (
                                <Collapsible open={evgaDesplegado} onOpenChange={setEvgaDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            EVGA
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {evgaDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!evgaDesplegado && (
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            {fuentesEvga[0] && (
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesEvga[0].id}
                                                        nombre={fuentesEvga[0].nombre}
                                                        icono={<Power />}
                                                        precio={fuentesEvga[0].precio}
                                                    />
                                                </div>
                                            )}
                                            {fuentesEvga[1] && (
                                                <>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={fuentesEvga[1].id}
                                                            nombre={fuentesEvga[1].nombre}
                                                            icono={<Power />}
                                                            precio={fuentesEvga[1].precio}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <CollapsibleContent>
                                        {fuentesEvga.map((fuente) => (
                                            <div key={fuente.id} className="space-y-3 bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuente.id}
                                                        nombre={fuente.nombre}
                                                        icono={<Power />}
                                                        precio={fuente.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 BE QUIET! */}
                            {fuentesBequiet && (
                                <Collapsible open={bequietDesplegado} onOpenChange={setBequietDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Be Quiet!
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {bequietDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!bequietDesplegado && (
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            {fuentesBequiet[0] && (
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesBequiet[0].id}
                                                        nombre={fuentesBequiet[0].nombre}
                                                        icono={<Power />}
                                                        precio={fuentesBequiet[0].precio}
                                                    />
                                                </div>
                                            )}
                                            {fuentesBequiet[1] && (
                                                <>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={fuentesBequiet[1].id}
                                                            nombre={fuentesBequiet[1].nombre}
                                                            icono={<Power />}
                                                            precio={fuentesBequiet[1].precio}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <CollapsibleContent>
                                        {fuentesBequiet.map((fuente) => (
                                            <div key={fuente.id} className="space-y-3 bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuente.id}
                                                        nombre={fuente.nombre}
                                                        icono={<Power />}
                                                        precio={fuente.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 Thermaltake */}
                            {fuentesThermaltake && (
                                <Collapsible open={thermaltakeDesplegado} onOpenChange={setThermaltakeDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Thermaltake
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {thermaltakeDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!thermaltakeDesplegado && (
                                        <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                            {fuentesThermaltake[0] && (
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesThermaltake[0].id}
                                                        nombre={fuentesThermaltake[0].nombre}
                                                        icono={<Power />}
                                                        precio={fuentesThermaltake[0].precio}
                                                    />
                                                </div>
                                            )}
                                            {fuentesThermaltake[1] && (
                                                <>
                                                    <Separator className="border-[1px] border-gray-600" />
                                                    <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                        <ItemArrastrable
                                                            id={fuentesThermaltake[1].id}
                                                            nombre={fuentesThermaltake[1].nombre}
                                                            icono={<Power />}
                                                            precio={fuentesThermaltake[1].precio}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}
                                    <CollapsibleContent>
                                        {fuentesThermaltake.map((fuente) => (
                                            <div key={fuente.id} className="space-y-3 bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={fuente.id} nombre={fuente.nombre} icono={<Power />} precio={fuente.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {!fuentesCorsair && !fuentesEvga && !fuentesThermaltake && !fuentesBequiet && (
                                <div className="flex h-full w-full items-center justify-center">
                                    No se ha encontrado ninguna fuente de alimentación que coincida con tu búsqueda.
                                </div>
                            )}
                        </div>
                    }
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/20 text-white">
                            {fuenteActiva ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu fuente aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Fuente de alimentación
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${fuenteActiva && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem
                                    botonEliminar={() => {
                                        setFuenteSeleccionada(null);
                                        guardarFuenteAlimentacion!(null);
                                    }}
                                    mostrarBoton={Boolean(fuenteSeleccionada)}
                                >
                                    {!fuenteActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {fuenteSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/*Boton saltar componente*/}
                            {!fuenteSeleccionada && (
                                <div className='absolute bottom-2 left-2 border-2 border-[var(--rojo-neon)]/60 p-2 font-["exo_2"]'>
                                    <Button
                                        variant={'link'}
                                        className="text-lg"
                                        onClick={() => {
                                            setMostrarDialogoSaltarComponente(true);
                                        }}
                                    >
                                        No quiero seleccionar fuente
                                    </Button>
                                </div>
                            )}
                            {mostrarDialogoSaltarComponente && (
                                <DialogoSaltarComponente
                                    componente="fuente de alimentación"
                                    ruta="montaje.torre"
                                    cerrarDialogo={() => setMostrarDialogoSaltarComponente(false)}
                                    onConfirmar={() => {
                                        guardarComponenteSaltado!(true);
                                        guardarFuenteAlimentacion!(null);
                                    }}
                                />
                            )}

                            {/* Info del componente con borde neón */}
                            {fuenteSeleccionada && (
                                <>
                                    <div className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3" key={fuenteSeleccionada.id}>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{fuenteSeleccionada.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <ScrollText size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Certificación
                                                </h2>
                                                <p className="text-lg text-gray-300">{fuenteSeleccionada.certificacion}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Zap size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Potencia
                                                </h2>
                                                <p className="text-lg text-gray-300">{fuenteSeleccionada.potencia} W</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Puzzle size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Modular
                                                </h2>
                                                <p className="text-lg text-gray-300">{fuenteSeleccionada.modular}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{fuenteSeleccionada.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    {esCompatible ? (
                                        <Button
                                            variant={'outline'}
                                            className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${fuenteActiva && 'hidden'}`}
                                            onClick={() => {
                                                guardarFuenteAlimentacion!(fuenteSeleccionada);
                                            }}
                                            asChild
                                        >
                                            <Link href={route('montaje.torre')}>Siguiente</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center gap-4">
                                                <Button
                                                    variant={'outline'}
                                                    className={`fade-in rounded-lg border-[var(--rojo-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--rojo-neon)] shadow-[0_0_10px_var(--rojo-neon)] transition-all duration-500 hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_20px_var(--rojo-neon)] ${fuenteActiva && 'hidden'} disabled hover:cursor-no-drop`}
                                                    onClick={() => {
                                                        guardarFuenteAlimentacion!(fuenteSeleccionada);
                                                    }}
                                                >
                                                    <h1>Incompatible</h1>
                                                </Button>
                                                <TooltipIncopatibilidadComponente mensaje="La potencia de la fuente es menor al consumo de los componentes" />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {fuenteActiva ? (
                        <ItemArrastrable id={fuenteActiva.id} nombre={fuenteActiva.nombre} icono={<Power />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
