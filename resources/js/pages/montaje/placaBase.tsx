import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { PlacaBase } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, CircuitBoard, Euro, Factory, Flame, Gauge, Minus, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Configurador({ placasBase }: { placasBase: PlacaBase[] }) {
    const { procesadorGuardado, guardarPlacaBaseSeelccionada } = useProgresoMontaje((state) => state);

    const [placaBaseSeleccionada, setPlacaBaseSeleccionada] = useState<PlacaBase | null>(null);
    const [placaBaseActiva, setPlacaBaseActiva] = useState<PlacaBase | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [asRockDesplegado, setAsrockDesplegado] = useState(false);
    const [asusDesplegado, setAsusDesplegado] = useState(false);
    const [msiDesplegado, setMsiDesplegado] = useState(false);
    const [gigabyteDesplegado, setGigabyteDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [placasFiltradas, setPlacasFiltradas] = useState<PlacaBase[]>();

    const placasBaseAsrock = placasFiltradas?.filter((p) => p.marca === 'ASRock' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const placasBaseAsus = placasFiltradas?.filter((p) => p.marca === 'ASUS' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const placasBaseMsi = placasFiltradas?.filter((p) => p.marca === 'MSI' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const placasBaseGigabyte = placasFiltradas?.filter(
        (p) => p.marca === 'Gigabyte' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()),
    );

    useEffect(() => {
        toast.custom(
            (t) => (
                <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl bg-black/80 p-4 text-white shadow-lg">
                    <span>
                        <Flame className="text-[var(--rojo-neon)]" />
                    </span>
                    <div className="flex w-full justify-center text-center text-xl">
                        <p className="font-['exo_2']">Arrastra tu placa base</p>
                    </div>
                </div>
            ),
            { duration: 3500 },
        );

        const comprobarCompatibilidad = () => {
            const placasCompatibles = placasBase.filter((placa) => procesadorGuardado?.socket === placa.socket);

            setPlacasFiltradas(placasCompatibles);
        };

        comprobarCompatibilidad();
    }, []);
    
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = placasBase.find((p) => p.id === active.id);
            if (item) {
                setPlacaBaseSeleccionada(item);
            }
        }
        setPlacaBaseActiva(null);
        setIsDragging(false);
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
                {isDragging && <div className="fixed inset-0 z-10 bg-black/50 backdrop-blur-md"></div>}
                <MontajeLayout
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
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseAsrock[1].id}
                                                        nombre={placasBaseAsrock[1].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseAsrock[2].id}
                                                        nombre={placasBaseAsrock[2].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseAsrock.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={placa.id} nombre={placa.nombre} icono={<CircuitBoard />} />
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
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseAsus[0].id}
                                                        nombre={placasBaseAsus[0].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseAsus[1].id}
                                                        nombre={placasBaseAsus[1].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseAsus[2].id}
                                                        nombre={placasBaseAsus[2].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}

                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseAsus.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={placa.id} nombre={placa.nombre} icono={<CircuitBoard />} />
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
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseMsi[0].id}
                                                        nombre={placasBaseMsi[0].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseMsi[1].id}
                                                        nombre={placasBaseMsi[1].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseMsi[2].id}
                                                        nombre={placasBaseMsi[2].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}

                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseMsi.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={placa.id} nombre={placa.nombre} icono={<CircuitBoard />} />
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
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseGigabyte[0].id}
                                                        nombre={placasBaseGigabyte[0].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseGigabyte[1].id}
                                                        nombre={placasBaseGigabyte[1].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={placasBaseGigabyte[2].id}
                                                        nombre={placasBaseGigabyte[2].nombre}
                                                        icono={<CircuitBoard />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}

                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {placasBaseGigabyte.map((placa) => (
                                            <div key={placa.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={placa.id} nombre={placa.nombre} icono={<CircuitBoard />} />
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
                            {placaBaseActiva ? (
                                <div className="z-10 flex flex-col items-center gap-2 text-white">
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
                                className={`relative z-20 h-[64px] w-[50%] border-2 ${placaBaseActiva && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem>
                                    {!placaBaseActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {placaBaseSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                                {/* <div>
                                    <h2 className="mb-4 text-xl font-bold">{`Placas Base Compatibles para el socket ${procesadorGuardado?.socket}`}</h2>
                                    <ul>
                                        {placasFiltradas?.map((placa, index) => (
                                            <li key={index} className={`rounded-md p-4 ${placa.compatible ? 'bg-green-600' : 'bg-red-600'}`}>
                                                {placa.nombre} - Socket: {placa.socket} -{placa.compatible ? ' ✅ Compatible' : ' ❌ No Compatible'}
                                            </li>
                                        ))}
                                    </ul>
                                </div> */}
                            </div>

                            {/* Info del procesador con borde neón */}
                            {placaBaseSeleccionada && (
                                <>
                                    <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3">
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
                                            <CircuitBoard size={48} className="text-[var(--rojo-neon)]" />
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
                                            <Gauge size={48} className="text-[var(--rojo-neon)]" />
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
                                    <Button
                                        variant={'outline'}
                                        className="border-[var(--morado-neon)] font-['exo_2']"
                                        onClick={() => {
                                            guardarPlacaBaseSeelccionada!(placaBaseSeleccionada);
                                        }}
                                    >
                                        <Link href={route('pruebas')}>Siguiente</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {placaBaseActiva ? <ItemArrastrable id={placaBaseActiva.id} nombre={placaBaseActiva.nombre} icono={<CircuitBoard />} /> : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
