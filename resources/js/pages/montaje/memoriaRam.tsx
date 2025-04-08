import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { MemoriaRam, PlacaBase } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, ArrowLeft, MemoryStick, Cpu, Euro, Factory, Gauge, Minus, Move, Plus, Search, Wrench, Microchip, Box, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajeMemoriaRam({ memoriasRam }: { memoriasRam: MemoriaRam[] }) {
    const { procesadorGuardado, guardarMemoriaRam } = useProgresoMontaje((state) => state);

    const [memoriaSeleccionada, setMemoriaSeleccionada] = useState<MemoriaRam | null>(null);

    const [memoriaActiva, setMemoriaActiva] = useState<MemoriaRam | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [corsairDesplegado, setCorsairDesplegado] = useState(false);
    const [crucialDesplegado, setCrucialDesplegado] = useState(false);
    const [kingstonDesplegado, setKingstonDesplegado] = useState(false);
    const [adataDesplegado, setAdataDesplegado] = useState(false);
    const [gSkillDesplegado, setGSkillDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [memoriasFiltradas, setMemoriasFiltradas] = useState<MemoriaRam[]>();

    const memoriasCorsair = memoriasFiltradas?.filter((p) => p.marca === 'Corsair' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const memoriasCrucial = memoriasFiltradas?.filter((p) => p.marca === 'Crucial' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const memoriasKingston = memoriasFiltradas?.filter(
        (p) => p.marca === 'Kingston' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()),
    );
    const memoriasAdata = memoriasFiltradas?.filter((p) => p.marca === 'ADATA' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
    const memoriasGskill = memoriasFiltradas?.filter((p) => p.marca === 'G.SKILL' && p.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));

    useEffect(() => {
        toast.custom(
            (t) => (
                <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl bg-black/80 p-4 text-white shadow-lg">
                    <span>
                        <Wrench size={30} className="text-[var(--rojo-neon)]" />
                    </span>
                    <div className="flex w-full justify-center text-center text-xl">
                        <p className="font-['exo_2']">Arrastra tu memoria RAM</p>
                    </div>
                </div>
            ),
            { duration: 3500 },
        );

        const comprobarCompatibilidad = () => {
            const memoriasCompatibles = memoriasRam.filter((memoria) => {
                const socket = procesadorGuardado?.socket;
                const tipoMemoria = memoria.tipo;

                const socketsDDR5 = ['AM5', 'LGA1700'];
                const socketsDDR4 = ['AM4', 'LGA1200'];

                return (socketsDDR5.includes(socket!) && tipoMemoria === 'DDR5') || (socketsDDR4.includes(socket!) && tipoMemoria === 'DDR4');
            });

            setMemoriasFiltradas(memoriasCompatibles);
        };

        comprobarCompatibilidad();
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = memoriasRam.find((p) => p.id === active.id);
            if (item) {
                setMemoriaSeleccionada(item);
            }
        }
        setMemoriaActiva(null);
        setIsDragging(false);
    };

    const handleDragStart = (event: any) => {
        const item = memoriasRam.find((p) => p.id === event.active.id);
        setMemoriaActiva(item || null);
        setIsDragging(true);
    };

    const desplegar = () => {
        setAdataDesplegado(true);
        setKingstonDesplegado(true);
        setCorsairDesplegado(true);
        setCrucialDesplegado(true);
        setGSkillDesplegado(true);
    };

    const replegar = () => {
        setAdataDesplegado(false);
        setKingstonDesplegado(false);
        setCorsairDesplegado(false);
        setCrucialDesplegado(false);
        setGSkillDesplegado(false);
    };

    return (
        <>
            <Head title="montaje - memoria RAM" />
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
                                    placeholder="Buscar memoria RAM..."
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
                            {memoriasCorsair && (
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
                                                        id={memoriasCorsair[0].id}
                                                        nombre={memoriasCorsair[0].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCorsair[1].id}
                                                        nombre={memoriasCorsair[1].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCorsair[2].id}
                                                        nombre={memoriasCorsair[2].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {memoriasCorsair.map((memoria) => (
                                            <div key={memoria.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={memoria.id} nombre={memoria.nombre} icono={<MemoryStick />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 CRUCIAL */}
                            {memoriasCrucial && (
                                <Collapsible open={crucialDesplegado} onOpenChange={setCrucialDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Crucial
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {crucialDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!crucialDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCrucial[0].id}
                                                        nombre={memoriasCrucial[0].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCrucial[1].id}
                                                        nombre={memoriasCrucial[1].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCrucial[2].id}
                                                        nombre={memoriasCrucial[2].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {memoriasCrucial.map((memoria) => (
                                            <div key={memoria.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={memoria.id} nombre={memoria.nombre} icono={<MemoryStick />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 KINGSTON */}
                            {memoriasKingston && (
                                <Collapsible open={kingstonDesplegado} onOpenChange={setKingstonDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Kingston
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {kingstonDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!kingstonDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasKingston[0].id}
                                                        nombre={memoriasKingston[0].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasKingston[1].id}
                                                        nombre={memoriasKingston[1].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasKingston[2].id}
                                                        nombre={memoriasKingston[2].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {memoriasKingston.map((memoria) => (
                                            <div key={memoria.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={memoria.id} nombre={memoria.nombre} icono={<MemoryStick />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 G SKILL */}
                            {memoriasGskill && (
                                <Collapsible open={gSkillDesplegado} onOpenChange={setGSkillDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            G SKILL
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {gSkillDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!gSkillDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasGskill[0].id}
                                                        nombre={memoriasGskill[0].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasGskill[1].id}
                                                        nombre={memoriasGskill[1].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {memoriasGskill.map((memoria) => (
                                            <div key={memoria.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={memoria.id} nombre={memoria.nombre} icono={<MemoryStick />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 ADATA */}
                            {memoriasAdata && (
                                <Collapsible open={adataDesplegado} onOpenChange={setAdataDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            ADATA
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {adataDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!adataDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasAdata[0].id}
                                                        nombre={memoriasAdata[0].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasAdata[1].id}
                                                        nombre={memoriasAdata[1].nombre}
                                                        icono={<MemoryStick />}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {memoriasAdata.map((memoria) => (
                                            <div key={memoria.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={memoria.id} nombre={memoria.nombre} icono={<MemoryStick />} />
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
                                <Link href={route('montaje.placaBase')}>
                                    <h1 className='font-["exo_2"] underline'>VOLVER A LA PLACA BASE</h1>
                                </Link>
                            </div>
                            {memoriaActiva ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu memoria RAM aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Memoria RAM
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${memoriaActiva && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem>
                                    {!memoriaActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {memoriaSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/* Info del procesador con borde neón */}
                            {memoriaSeleccionada && (
                                <>
                                    <div className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3" key={memoriaSeleccionada.id}>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{memoriaSeleccionada.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Microchip size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Tamaño
                                                </h2>
                                                <p className="text-lg text-gray-300">{memoriaSeleccionada.almacenamiento}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <MemoryStick size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Zócalo
                                                </h2>
                                                <p className="text-lg text-gray-300">{memoriaSeleccionada.tipo}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Zap size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Consumo
                                                </h2>
                                                <p className="text-lg text-gray-300">{memoriaSeleccionada.consumo}W</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Box size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Pack
                                                </h2>
                                                <p className="text-lg text-gray-300">{memoriaSeleccionada.pack} ud/s</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{memoriaSeleccionada.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant={'outline'}
                                        className="fade-in border-[var(--morado-neon)] font-['exo_2']"
                                        onClick={() => {
                                            guardarMemoriaRam!(memoriaSeleccionada);
                                        }}
                                    >
                                        <Link href={route('montaje.discoDuro')}>Siguiente</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {memoriaActiva ? (
                        <ItemArrastrable id={memoriaActiva.id} nombre={memoriaActiva.nombre} icono={<MemoryStick />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
