import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import AvisoComponente from '@/components/avisoComponente';
import DialogoSaltarComponente from '@/components/DialogoSaltarComponente';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { TooltipIncopatibilidadComponente } from '@/components/TooltipIncopatibilidad';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/montaje/montaje-layout';
import { BreadcrumbItem, Procesador } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, Cpu, Euro, Factory, Gauge, MemoryStick, Minus, Move, Plus, Search, Wrench, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajeProcesador({ procesadores }: { procesadores: Procesador[] }) {
    const {
        guardarProcesador,
        editarMontaje,
        guardarComponenteSaltado,
        tipoMontaje,
        componenteSaltado,
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
            activo: true,
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

    const [procesadorSeleccionado, setProcesadorSeleccionado] = useState<Procesador | null>(procesadorGuardado!);
    const [procesadorActivo, setProcesadorActivo] = useState<Procesador | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [intelDesplegado, setIntelDesplegado] = useState(false);
    const [amdDesplegado, setAmdDesplegado] = useState(false);
    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [procesadoresFiltrados, setProcesadoresFiltrados] = useState<Procesador[]>(procesadores);

    useEffect(() => {
        !editarMontaje &&
            toast.custom(
                (t) => (
                    <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl border-2 border-[var(--rosa-neon)] bg-black/80 p-4 text-white shadow-lg">
                        <span>
                            <Wrench size={30} className="text-[var(--rojo-neon)]" />
                            {}
                        </span>
                        <div className="flex w-full justify-center text-center text-xl">
                            <p className="font-['exo_2']">Arrastra tu procesador</p>
                        </div>
                    </div>
                ),
                { duration: 2750 },
            );

        function filtrarProcesadores() {
            let filtrados: Procesador[] = [];

            if (tipoMontaje === 'eco') {
                filtrados = procesadores.filter((p) => p.consumo <= 65);
            } else if (tipoMontaje === 'equilibrado') {
                filtrados = procesadores.filter((p) => p.consumo <= 105);
            } else if (tipoMontaje === 'pro') {
                filtrados = procesadores;
            }

            setProcesadoresFiltrados(filtrados);
        }

        !componenteSaltado && filtrarProcesadores();
    }, []);

    function comprobarCompatibilidad() {
        if (!placaBaseGuardada) return;

        placaBaseGuardada.socket != procesadorSeleccionado?.socket ? setEsCompatible(false) : setEsCompatible(true);
    }

    useEffect(() => {
        procesadorSeleccionado && comprobarCompatibilidad();
    }, [procesadorSeleccionado]);

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const procesadoresAmd = (() => {
        const p = procesadoresFiltrados.filter((p) => p.marca === 'AMD' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p.length ? p : null;
    })();

    const procesadoresIntel = (() => {
        const p = procesadoresFiltrados.filter((p) => p.marca === 'Intel' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p.length ? p : null;
    })();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = procesadores.find((p) => p.id === active.id);
            if (item) {
                setProcesadorSeleccionado(item);
                guardarProcesador!(item);
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

    const replegar = () => {
        setIntelDesplegado(false);
        setAmdDesplegado(false);
    };

    return (
        <>
            <Head title="montaje - procesador" />
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
                                    placeholder="Buscar procesador..."
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

                            {/* 🔵 INTEL */}
                            {procesadoresIntel && (
                                <Collapsible open={intelDesplegado} onOpenChange={setIntelDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
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
                                    <CollapsibleContent className="w-full">
                                        {procesadoresIntel.map((procesador) => (
                                            <div key={procesador.id} className="space-y-3 bg-black/50 p-2">
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
                                <Collapsible open={amdDesplegado} onOpenChange={setAmdDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
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

                                    <CollapsibleContent>
                                        {procesadoresAmd.map((procesador) => (
                                            <div key={procesador.id} className="space-y-3 bg-black/50 p-2">
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
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/10 text-white">
                            {procesadorActivo ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu procesador aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Procesador
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${procesadorActivo && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem
                                    botonEliminar={() => {
                                        setProcesadorSeleccionado(null);
                                        guardarProcesador!(null);
                                    }}
                                    mostrarBoton={Boolean(procesadorSeleccionado)}
                                >
                                    {!procesadorActivo && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {procesadorSeleccionado?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/*Boton saltar componente*/}
                            {!procesadorSeleccionado && (
                                <div className='absolute bottom-2 left-2 border-2 border-[var(--rojo-neon)]/60 p-2 font-["exo_2"]'>
                                    <Button
                                        variant={'link'}
                                        className="text-lg"
                                        onClick={() => {
                                            setMostrarDialogoSaltarComponente(true);
                                        }}
                                    >
                                        No quiero seleccionar procesador
                                    </Button>
                                </div>
                            )}
                            {mostrarDialogoSaltarComponente && (
                                <DialogoSaltarComponente
                                    componente="procesador"
                                    ruta="montaje.disipador"
                                    cerrarDialogo={() => setMostrarDialogoSaltarComponente(false)}
                                    onConfirmar={() => {
                                        guardarComponenteSaltado!(true);
                                        guardarProcesador!(null);
                                    }}
                                />
                            )}

                            {/* Info del procesador con borde neón */}
                            {procesadorSeleccionado && (
                                <>
                                    <div
                                        className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3"
                                        key={procesadorSeleccionado.id}
                                    >
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{procesadorSeleccionado.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <MemoryStick size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Socket
                                                </h2>
                                                <p className="text-lg text-gray-300">{procesadorSeleccionado.socket}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Zap size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Consumo
                                                </h2>
                                                <p className="text-lg text-gray-300">{procesadorSeleccionado.consumo}W</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Gauge size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Frecuencia
                                                </h2>
                                                <p className="text-lg text-gray-300">
                                                    {procesadorSeleccionado.frecuencia_base}GHz / {procesadorSeleccionado.frecuencia_turbo}GHz
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Cpu size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Núcleos / Hilos
                                                </h2>
                                                <p className="text-lg text-gray-300">
                                                    {procesadorSeleccionado.nucleos} / {procesadorSeleccionado.hilos}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{procesadorSeleccionado.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex gap-6 ${isDragging && 'hidden'}`}>
                                        {procesadorSeleccionado.disipador_incluido === 'No' && (
                                            <AvisoComponente mensaje="Procesador SIN disipador incluido" />
                                        )}
                                        {procesadorSeleccionado.graficos_integrados === 'No' && (
                                            <AvisoComponente mensaje="Procesador SIN gráficos integrados, tarjeta gráfica obligatoria." />
                                        )}
                                    </div>
                                    {esCompatible ? (
                                        <Button
                                            variant={'outline'}
                                            className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${procesadorActivo && 'hidden'}`}
                                            onClick={() => {
                                                guardarProcesador!(procesadorSeleccionado);
                                            }}
                                            asChild
                                        >
                                            <Link href={route('montaje.disipador')}>Siguiente</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center gap-4">
                                                <Button
                                                    variant={'outline'}
                                                    className={`fade-in rounded-lg border-[var(--rojo-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--rojo-neon)] shadow-[0_0_10px_var(--rojo-neon)] transition-all duration-500 hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_20px_var(--rojo-neon)] ${procesadorActivo && 'hidden'} disabled hover:cursor-no-drop`}
                                                    onClick={() => {
                                                        guardarProcesador!(procesadorSeleccionado);
                                                    }}
                                                >
                                                    <h1>Incompatible</h1>
                                                </Button>
                                                <TooltipIncopatibilidadComponente mensaje="El socket del procesador no coincide con el de la placa escogida." />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {procesadorActivo ? (
                        <ItemArrastrable id={procesadorActivo.id} nombre={procesadorActivo.nombre} icono={<Cpu />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
