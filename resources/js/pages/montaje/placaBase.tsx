import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import DialogoSaltarComponente from '@/components/DialogoSaltarComponente';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { TooltipIncopatibilidadComponente } from '@/components/TooltipIncopatibilidad';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { BreadcrumbItem, PlacaBase } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, CircuitBoard, Cpu, Euro, Factory, Minus, Move, Plus, Search, Wrench, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajePlacaBase({ placasBase }: { placasBase: PlacaBase[] }) {
    const {
        guardarPlacaBase,
        editarMontaje,
        componenteSaltado,
        guardarComponenteSaltado,
        tipoMontaje,
        procesadorGuardado,
        placaBaseGuardada,
        disipadorGuardado,
        memoriaRamGuardada,
        discoDuroGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
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
            activo: true,
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

    const [esCompatible, setEsCompatible] = useState<boolean | null>(true);

    const [placaBaseSeleccionada, setPlacaBaseSeleccionada] = useState<PlacaBase | null>(placaBaseGuardada!);
    const [placaBaseActiva, setPlacaBaseActiva] = useState<PlacaBase | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [asRockDesplegado, setAsrockDesplegado] = useState(false);
    const [asusDesplegado, setAsusDesplegado] = useState(false);
    const [msiDesplegado, setMsiDesplegado] = useState(false);
    const [gigabyteDesplegado, setGigabyteDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const [placasFiltradas, setPlacasFiltradas] = useState<PlacaBase[]>(placasBase);

    const placasBaseAsrock = (() => {
        const p = placasFiltradas?.filter((p) => p.marca === 'ASRock' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p?.length ? p : null;
    })();

    const placasBaseAsus = (() => {
        const p = placasFiltradas?.filter((p) => p.marca === 'ASUS' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p?.length ? p : null;
    })();

    const placasBaseMsi = (() => {
        const p = placasFiltradas?.filter((p) => p.marca === 'MSI' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p?.length ? p : null;
    })();

    const placasBaseGigabyte = (() => {
        const p = placasFiltradas?.filter((p) => p.marca === 'Gigabyte' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p?.length ? p : null;
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
                            <p className="font-['exo_2']">Arrastra tu placa base</p>
                        </div>
                    </div>
                ),
                { duration: 2750 },
            );

        function filtrarPlacas() {
            if (!procesadorGuardado) return;

            let consumoMaximo = 0;

            if (tipoMontaje === 'eco') {
                consumoMaximo = 22;
            } else if (tipoMontaje === 'equilibrado') {
                consumoMaximo = 26;
            } else if (tipoMontaje === 'pro') {
                consumoMaximo = 32;
            }

            const filtradas = placasBase.filter((placa) => placa.socket === procesadorGuardado.socket && placa.consumo <= consumoMaximo);

            setPlacasFiltradas(filtradas);
        }

        !componenteSaltado && filtrarPlacas();
    }, []);

    function comprobarCompatibilidad() {
        if (!procesadorGuardado) return;

        procesadorGuardado.socket != placaBaseSeleccionada?.socket && setEsCompatible(false);
    }

    useEffect(() => {
        placaBaseSeleccionada && comprobarCompatibilidad();
    }, [placaBaseSeleccionada]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = placasBase.find((p) => p.id === active.id);
            if (item) {
                setPlacaBaseSeleccionada(item);
                guardarPlacaBase!(item);
            }
        }
        setPlacaBaseActiva(null);
        setIsDragging(false);
        // setEsCompatible(true);
    };

    const handleDragStart = (event: any) => {
        const item = placasBase.find((p) => p.id === event.active.id);
        setPlacaBaseActiva(item || null);
        setIsDragging(true);
    };

    const desplegar = () => {
        setAsrockDesplegado(true);
        setAsusDesplegado(true);
        setMsiDesplegado(true);
        setGigabyteDesplegado(true);
    };

    const replegar = () => {
        setAsrockDesplegado(false);
        setAsusDesplegado(false);
        setMsiDesplegado(false);
        setGigabyteDesplegado(false);
    };

    return (
        <>
            <Head title="montaje - placa base" />
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
                                    placeholder="Buscar placa base..."
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

                            {/* 💀 ASROCK */}
                            {placasBaseAsrock && (
                                <Collapsible open={asRockDesplegado} onOpenChange={setAsrockDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            ASRock
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {asRockDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!asRockDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseAsrock[0].id}
                                                        nombre={placasBaseAsrock[0].nombre}
                                                        icono={<CircuitBoard />}
                                                        precio={placasBaseAsrock[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                {placasBaseAsrock[1] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseAsrock[1].id}
                                                                nombre={placasBaseAsrock[1].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseAsrock[1].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                                {placasBaseAsrock[2] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseAsrock[2].id}
                                                                nombre={placasBaseAsrock[2].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseAsrock[2].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseAsrock.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placa.id}
                                                        nombre={placa.nombre}
                                                        icono={<CircuitBoard />}
                                                        precio={placa.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 ASUS */}
                            {placasBaseAsus && (
                                <Collapsible open={asusDesplegado} onOpenChange={setAsusDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Asus
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {asusDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!asusDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                {placasBaseAsus[0] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseAsus[0].id}
                                                                nombre={placasBaseAsus[0].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseAsus[0].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                                {placasBaseAsus[1] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseAsus[1].id}
                                                                nombre={placasBaseAsus[1].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseAsus[1].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                                {placasBaseAsus[2] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseAsus[2].id}
                                                                nombre={placasBaseAsus[2].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseAsus[2].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseAsus.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placa.id}
                                                        nombre={placa.nombre}
                                                        icono={<CircuitBoard />}
                                                        precio={placa.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 MSI */}
                            {placasBaseMsi && (
                                <Collapsible open={msiDesplegado} onOpenChange={setMsiDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            MSI
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {msiDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!msiDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                {placasBaseMsi[0] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseMsi[0].id}
                                                                nombre={placasBaseMsi[0].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseMsi[0].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                                {placasBaseMsi[1] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseMsi[1].id}
                                                                nombre={placasBaseMsi[1].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseMsi[1].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                                {placasBaseMsi[2] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseMsi[2].id}
                                                                nombre={placasBaseMsi[2].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseMsi[2].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseMsi.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placa.id}
                                                        nombre={placa.nombre}
                                                        icono={<CircuitBoard />}
                                                        precio={placa.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 Gigabyte */}
                            {placasBaseGigabyte && (
                                <Collapsible open={gigabyteDesplegado} onOpenChange={setGigabyteDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Gigabyte
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {gigabyteDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!gigabyteDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                {placasBaseGigabyte[0] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseGigabyte[0].id}
                                                                nombre={placasBaseGigabyte[0].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseGigabyte[0].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                                {placasBaseGigabyte[1] && (
                                                    <>
                                                        <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                            <ItemArrastrable
                                                                id={placasBaseGigabyte[1].id}
                                                                nombre={placasBaseGigabyte[1].nombre}
                                                                icono={<CircuitBoard />}
                                                                precio={placasBaseGigabyte[1].precio}
                                                            />
                                                        </div>
                                                        <Separator className="border-[1px] border-gray-600" />
                                                    </>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseGigabyte.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placa.id}
                                                        nombre={placa.nombre}
                                                        icono={<CircuitBoard />}
                                                        precio={placa.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {!placasBaseAsrock && !placasBaseAsus && !placasBaseMsi && !placasBaseGigabyte && (
                                <div className="flex h-full w-full items-center justify-center">
                                    No se ha encontrado ninguna placa base que coincida con tu búsqueda.
                                </div>
                            )}
                        </div>
                    }
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/20 text-white">
                            {placaBaseActiva ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu placa base aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Placa base
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${placaBaseActiva && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem
                                    botonEliminar={() => {
                                        setPlacaBaseSeleccionada(null);
                                        guardarPlacaBase!(null);
                                    }}
                                    mostrarBoton={Boolean(placaBaseSeleccionada)}
                                >
                                    {!placaBaseActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {placaBaseSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/*Boton saltar componente*/}
                            {!placaBaseSeleccionada && (
                                <div className='absolute bottom-2 left-2 border-2 border-[var(--rojo-neon)]/60 p-2 font-["exo_2"]'>
                                    <Button
                                        variant={'link'}
                                        className="text-lg"
                                        onClick={() => {
                                            setMostrarDialogoSaltarComponente(true);
                                        }}
                                    >
                                        No quiero seleccionar placa base
                                    </Button>
                                </div>
                            )}
                            {mostrarDialogoSaltarComponente && (
                                <DialogoSaltarComponente
                                    componente="placa base"
                                    ruta="montaje.memoriaRam"
                                    cerrarDialogo={() => setMostrarDialogoSaltarComponente(false)}
                                    onConfirmar={() => {
                                        guardarComponenteSaltado!(true);
                                        guardarPlacaBase!(null);
                                    }}
                                />
                            )}

                            {/* Info del componente con borde neón */}
                            {placaBaseSeleccionada && (
                                <>
                                    <div
                                        className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3"
                                        key={placaBaseSeleccionada.id}
                                    >
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{placaBaseSeleccionada.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Cpu size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Socket
                                                </h2>
                                                <p className="text-lg text-gray-300">{placaBaseSeleccionada.socket}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <CircuitBoard size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Factor forma
                                                </h2>
                                                <p className="text-lg text-gray-300">{placaBaseSeleccionada.factor_forma}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Zap size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    consumo
                                                </h2>
                                                <p className="text-lg text-gray-300">{placaBaseSeleccionada.consumo}W</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{placaBaseSeleccionada.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    {esCompatible ? (
                                        <Button
                                            variant={'outline'}
                                            className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${placaBaseActiva && 'hidden'}`}
                                            onClick={() => {
                                                guardarPlacaBase!(placaBaseSeleccionada);
                                            }}
                                            asChild
                                        >
                                            <Link href={route('montaje.memoriaRam')}>Siguiente</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center gap-4">
                                                <Button
                                                    variant={'outline'}
                                                    className={`fade-in rounded-lg border-[var(--rojo-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--rojo-neon)] shadow-[0_0_10px_var(--rojo-neon)] transition-all duration-500 hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_20px_var(--rojo-neon)] ${placaBaseActiva && 'hidden'} disabled hover:cursor-no-drop`}
                                                    onClick={() => {
                                                        guardarPlacaBase!(placaBaseSeleccionada);
                                                    }}
                                                >
                                                    <h1>Incompatible</h1>
                                                </Button>
                                                <TooltipIncopatibilidadComponente mensaje="El socket de la placa escogida no es compatible con el del procesador escogido." />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {placaBaseActiva ? (
                        <ItemArrastrable
                            id={placaBaseActiva.id}
                            nombre={placaBaseActiva.nombre}
                            icono={<CircuitBoard />}
                            iconoSecundario={<Move />}
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
