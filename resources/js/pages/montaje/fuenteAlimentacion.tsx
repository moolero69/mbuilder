import { AreaSoltarItem } from '@/components/AreaSoltarItem';
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

export default function MontajeFuenteAlimentacion({ fuentesAlimentacion }: { fuentesAlimentacion: FuenteAlimentacion[] }) {
    const { procesadorGuardado, placaBaseGuardada, memoriaRamGuardada, discoDuroGuardado, tarjetaGraficaGuardada, guardarFuenteAlimentacion } = useProgresoMontaje((state) => state);


    const [fuenteSeleccionada, setFuenteSeleccionada] = useState<FuenteAlimentacion | null>(null);

    const [fuenteActiva, setFuenteActiva] = useState<FuenteAlimentacion | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [corsairDesplegado, setCorsairDesplegado] = useState(false);
    const [evgaDesplegado, setEvgaDesplegado] = useState(false);
    const [thermaltakeDesplegado, setThermaltakeDesplegado] = useState(false);
    const [bequietDesplegado, setBequietDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [fuentesFiltradas, setFuentesFiltradas] = useState<FuenteAlimentacion[]>();

    const fuentesCorsair = fuentesFiltradas?.filter((f) => f.marca === 'Corsair' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const fuentesEvga = fuentesFiltradas?.filter((f) => f.marca === 'EVGA' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const fuentesThermaltake = fuentesFiltradas?.filter((f) => f.marca === 'Thermaltake' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const fuentesBequiet = fuentesFiltradas?.filter((f) => f.marca === 'Be Quiet!' && f.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));

    const [totalW, setTotalW] = useState<number>();



    useEffect(() => {
        toast.custom(
            (t) => (
                <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl bg-black/80 p-4 text-white shadow-lg">
                    <span>
                        <Wrench size={30} className="text-[var(--rojo-neon)]" />
                    </span>
                    <div className="flex w-full justify-center text-center text-xl">
                        <p className="font-['exo_2']">Arrastra tu fuente de alimentacion</p>
                    </div>
                </div>
            ),
            { duration: 3500 },
        );

        const comprobarCompatibilidad = () => {
            const sumaTotalConsumo = procesadorGuardado!.consumo + placaBaseGuardada!.consumo + memoriaRamGuardada!.consumo + discoDuroGuardado!.consumo + tarjetaGraficaGuardada!.consumo;

            const fuentesCompatibles = fuentesAlimentacion.filter(fuente => fuente.potencia > sumaTotalConsumo);

            setFuentesFiltradas(fuentesCompatibles);
            setTotalW(sumaTotalConsumo)
        };

        comprobarCompatibilidad();
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = fuentesAlimentacion.find((f) => f.id === active.id);
            if (item) {
                setFuenteSeleccionada(item);
            }
        }
        setFuenteActiva(null);
        setIsDragging(false);
    };

    const handleDragStart = (event: any) => {
        const item = fuentesAlimentacion.find((f) => f.id === event.active.id);
        setFuenteActiva(item || null);
        setIsDragging(true);
    };

    const desplegar = () => {

    };

    const replegar = () => {

    };
    return (
        <>
            <Head title="montaje - fuente alimentacion" />
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
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesCorsair[0].id}
                                                        nombre={fuentesCorsair[0].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[0].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesCorsair[1].id}
                                                        nombre={fuentesCorsair[1].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {fuentesCorsair.map((fuente) => (
                                            <div key={fuente.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={fuente.id} nombre={fuente.nombre} icono={<Power />} />
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
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesEvga[0].id}
                                                        nombre={fuentesEvga[0].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[0].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesEvga[1].id}
                                                        nombre={fuentesEvga[1].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {fuentesEvga.map((fuente) => (
                                            <div key={fuente.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={fuente.id} nombre={fuente.nombre} icono={<Power />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 BE QUIET!
                            {fuentesBequiet ? (
                                <Collapsible open={bequietDesplegado} onOpenChange={setBequietDesplegado} className="w-full space-y-2">
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
                                    {!bequietDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesBequiet[0].id}
                                                        nombre={fuentesBequiet[0].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[0].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesBequiet[1].id}
                                                        nombre={fuentesBequiet[1].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {fuentesBequiet.map((fuente) => (
                                            <div key={fuente.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={fuente.id} nombre={fuente.nombre} icono={<Power />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )
                                :
                                'No'
                            } */}

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
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesThermaltake[0].id}
                                                        nombre={fuentesThermaltake[0].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[0].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={fuentesThermaltake[1].id}
                                                        nombre={fuentesThermaltake[1].nombre}
                                                        icono={<Power />}
                                                    // discosCrucial[1].almacenamiento}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {fuentesThermaltake.map((fuente) => (
                                            <div key={fuente.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={fuente.id} nombre={fuente.nombre} icono={<Power />} />
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
                                <Link href={route('montaje.tarjetaGrafica')}>
                                    <h1 className='font-["exo_2"] underline'>VOLVER A LA GRÁFICA </h1>
                                </Link>
                            </div>
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
                                <AreaSoltarItem>
                                    {!fuenteActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {fuenteSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                                <h1>{`Total W: ${totalW}`}</h1>
                            </div>

                            {/* Info del procesador con borde neón */}
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
                                    <Button
                                        variant={'outline'}
                                        className="fade-in border-[var(--morado-neon)] font-['exo_2']"
                                        onClick={() => {
                                            guardarFuenteAlimentacion!(fuenteSeleccionada);
                                        }}
                                    >
                                        <Link href={route('montaje.resumen')}>Siguiente</Link>
                                    </Button>
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
