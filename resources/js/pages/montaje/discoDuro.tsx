import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import DialogoSaltarComponente from '@/components/DialogoSaltarComponente';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { BreadcrumbItem, DiscoDuro } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, Box, CircuitBoard, Euro, Factory, Gauge, Microchip, Minus, Move, Plus, Search, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        titulo: 'Procesador',
        href: '/montaje/procesador',
    },
    {
        titulo: 'Disipador',
        href: '/montaje/disipador',
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
];

export default function MontajeDiscoDuro({ discosDuros }: { discosDuros: DiscoDuro[] }) {
    const { procesadorGuardado, guardarDiscoDuro, guardarDiscoDuroSecundario, editarMontaje, discoDuroGuardado, componenteSaltado, guardarComponenteSaltado } =
        useProgresoMontaje((state) => state);
    const progresoMontaje = !editarMontaje
        ? ['procesador', 'disipador', 'placaBase', 'memoriaRam', 'memoriaRamSecundaria']
        : ['procesador', 'disipador', 'placaBase', 'memoriaRam', 'memoriaRamSecundaria', 'discoDuro', 'discoDuroSecundario', 'tarjetaGrafica', 'fuenteAlimentacion', 'torre'];

    const [esCompatible, setEsCompatible] = useState<boolean | null>(null);

    const [discoSeleccionado, setDiscoSeleccionado] = useState<DiscoDuro | null>(discoDuroGuardado!);
    const [modoSeleccionarIgual, setModoSeleccionarIgual] = useState<boolean>(false);
    const [modoSeleccionarOtro, setModoSeleccionarOtra] = useState(false);

    const [discoActivo, setDiscoActivo] = useState<DiscoDuro | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [crucialDesplegado, setCrucialDesplegado] = useState(false);
    const [kingstonDesplegado, setKingstonDesplegado] = useState(false);
    const [samsungDesplegado, setSamsungDesplegado] = useState(false);
    const [seagateDesplegado, setSeagateDesplegado] = useState(false);
    const [toshibaDesplegado, setToshibaDesplegado] = useState(false);
    const [wdDesplegado, setWdDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const [discosFiltrados, setDiscosFiltrados] = useState<DiscoDuro[]>(discosDuros);

    const discosKingston = (() => {
        const filtrados = discosFiltrados?.filter((d) => d.marca === 'Kingston' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const discosCrucial = (() => {
        const d = discosFiltrados?.filter((d) => d.marca === 'Crucial' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return d?.length ? d : null;
    })();

    const discosSamsung = (() => {
        const d = discosFiltrados?.filter((d) => d.marca === 'Samsung' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return d?.length ? d : null;
    })();

    const discosSeagate = (() => {
        const d = discosFiltrados?.filter((d) => d.marca === 'Seagate' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return d?.length ? d : null;
    })();

    const discosToshiba = (() => {
        const d = discosFiltrados?.filter((d) => d.marca === 'Toshiba' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return d?.length ? d : null;
    })();

    const discosWd = (() => {
        const d = discosFiltrados?.filter((d) => d.marca === 'WD' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return d?.length ? d : null;
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
                            <p className="font-['exo_2']">Arrastra tu disco duro</p>
                        </div>
                    </div>
                ),
                { duration: 3500 },
            );

        const comprobarCompatibilidad = (disco: DiscoDuro) => {
            const conexionesPorSocket: Record<string, string[]> = {
                AM5: ['M.2', 'SATA'],
                LGA1700: ['M.2', 'SATA'],
                AM4: ['SATA'],
                LGA1200: ['SATA'],
            };

            const socket = procesadorGuardado?.socket || '';
            const conexionesValidas = conexionesPorSocket[socket] || [];

            const discosCompatibles = discosDuros.filter((disco) => conexionesValidas.includes(disco.conexion));
            const compatible = conexionesValidas.includes(disco?.conexion);

            setEsCompatible(compatible);
            setDiscosFiltrados(discosCompatibles);
        };

        !componenteSaltado && comprobarCompatibilidad(discoDuroGuardado!);
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = discosDuros.find((p) => p.id === active.id);
            if (item) {
                setDiscoSeleccionado(item);
                // guardarDiscoDuro!(item);
            }
        }
        setDiscoActivo(null);
        setIsDragging(false);
        setEsCompatible(true);
    };

    const handleDragStart = (event: any) => {
        const item = discosDuros.find((p) => p.id === event.active.id);
        setDiscoActivo(item || null);
        setIsDragging(true);
    };

    const desplegar = () => {
        setKingstonDesplegado(true);
        setCrucialDesplegado(true);
        setSamsungDesplegado(true);
        setSeagateDesplegado(true);
        setToshibaDesplegado(true);
        setWdDesplegado(true);
    };

    const replegar = () => {
        setKingstonDesplegado(false);
        setCrucialDesplegado(false);
        setSamsungDesplegado(false);
        setSeagateDesplegado(false);
        setToshibaDesplegado(false);
        setWdDesplegado(false);
    };
    return (
        <>
            <Head title="montaje - disco duro" />
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
                                    placeholder="Buscar disco duro..."
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

                            {/* 💀 CRUCIAL */}
                            {discosCrucial && (
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
                                                        id={discosCrucial[0].id}
                                                        nombre={discosCrucial[0].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosCrucial[0].almacenamiento}
                                                        precio={discosCrucial[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosCrucial[1].id}
                                                        nombre={discosCrucial[1].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosCrucial[1].almacenamiento}
                                                        precio={discosCrucial[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {discosCrucial.map((disco) => (
                                            <div key={disco.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disco.id}
                                                        nombre={disco.nombre}
                                                        icono={<Box />}
                                                        textoSecundario={disco.almacenamiento}
                                                        precio={disco.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 KINGSTON */}
                            {discosKingston && (
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
                                                        id={discosKingston[0].id}
                                                        nombre={discosKingston[0].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosKingston[0].almacenamiento}
                                                        precio={discosKingston[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosKingston[1].id}
                                                        nombre={discosKingston[1].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosKingston[1].almacenamiento}
                                                        precio={discosKingston[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {discosKingston.map((disco) => (
                                            <div key={disco.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disco.id}
                                                        nombre={disco.nombre}
                                                        icono={<Box />}
                                                        textoSecundario={disco.almacenamiento}
                                                        precio={disco.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 SAMSUNG */}
                            {discosSamsung && (
                                <Collapsible open={samsungDesplegado} onOpenChange={setSamsungDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Samsung
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {samsungDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!samsungDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosSamsung[0].id}
                                                        nombre={discosSamsung[0].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosSamsung[0].almacenamiento}
                                                        precio={discosSamsung[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosSamsung[1].id}
                                                        nombre={discosSamsung[1].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosSamsung[1].almacenamiento}
                                                        precio={discosSamsung[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {discosSamsung.map((disco) => (
                                            <div key={disco.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disco.id}
                                                        nombre={disco.nombre}
                                                        icono={<Box />}
                                                        textoSecundario={disco.almacenamiento}
                                                        precio={disco.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 SEAGATE */}
                            {discosSeagate && (
                                <Collapsible open={seagateDesplegado} onOpenChange={setSeagateDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Seagate
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {seagateDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!seagateDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosSeagate[0].id}
                                                        nombre={discosSeagate[0].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosSeagate[0].almacenamiento}
                                                        precio={discosSeagate[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosSeagate[1].id}
                                                        nombre={discosSeagate[1].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosSeagate[1].almacenamiento}
                                                        precio={discosSeagate[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {discosSeagate.map((disco) => (
                                            <div key={disco.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disco.id}
                                                        nombre={disco.nombre}
                                                        icono={<Box />}
                                                        textoSecundario={disco.almacenamiento}
                                                        precio={disco.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 WD */}
                            {discosWd && (
                                <Collapsible open={wdDesplegado} onOpenChange={setWdDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Western Digital
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {wdDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!wdDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosWd[0].id}
                                                        nombre={discosWd[0].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosWd[0].almacenamiento}
                                                        precio={discosWd[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosWd[1].id}
                                                        nombre={discosWd[1].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosWd[1].almacenamiento}
                                                        precio={discosWd[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {discosWd.map((disco) => (
                                            <div key={disco.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disco.id}
                                                        nombre={disco.nombre}
                                                        icono={<Box />}
                                                        textoSecundario={disco.almacenamiento}
                                                        precio={disco.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 TOSHIBA */}
                            {discosToshiba && (
                                <Collapsible open={toshibaDesplegado} onOpenChange={setToshibaDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Toshiba
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {toshibaDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!toshibaDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosToshiba[0].id}
                                                        nombre={discosToshiba[0].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosToshiba[0].almacenamiento}
                                                        precio={discosToshiba[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={discosToshiba[1].id}
                                                        nombre={discosToshiba[1].nombre}
                                                        icono={<Box />}
                                                        textoSecundario={discosToshiba[1].almacenamiento}
                                                        precio={discosToshiba[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {discosToshiba.map((disco) => (
                                            <div key={disco.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disco.id}
                                                        nombre={disco.nombre}
                                                        icono={<Box />}
                                                        textoSecundario={disco.almacenamiento}
                                                        precio={disco.precio}
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
                            {discoActivo ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu disco duro aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Disco duro
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${discoActivo && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem botonEliminar={() => setDiscoSeleccionado(null)} mostrarBoton={Boolean(discoSeleccionado)}>
                                    {!discoActivo && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {discoSeleccionado?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/*Boton saltar componente*/}
                            {!discoSeleccionado && (
                                <div className='absolute bottom-2 left-2 border-2 border-[var(--rojo-neon)]/60 p-2 font-["exo_2"]'>
                                    <Button
                                        variant={'link'}
                                        className="text-lg"
                                        onClick={() => {
                                            setMostrarDialogoSaltarComponente(true);
                                        }}
                                    >
                                        No quiero seleccionar disco duro
                                    </Button>
                                </div>
                            )}
                            {mostrarDialogoSaltarComponente && (
                                <DialogoSaltarComponente
                                    componente="disco duro"
                                    ruta="montaje.tarjetaGrafica"
                                    cerrarDialogo={() => setMostrarDialogoSaltarComponente(false)}
                                    onConfirmar={() => {
                                        guardarComponenteSaltado!(true);
                                        guardarDiscoDuro!(null);
                                    }}
                                />
                            )}

                            {/* Info del componente con borde neón */}
                            {discoSeleccionado && (
                                <>
                                    <div className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3" key={discoSeleccionado.id}>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{discoSeleccionado.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Microchip size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Tamaño
                                                </h2>
                                                <p className="text-lg text-gray-300">{discoSeleccionado.almacenamiento}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <CircuitBoard size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Tecnología
                                                </h2>
                                                <p className="text-lg text-gray-300">{discoSeleccionado.tecnologia}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Box size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Conexión
                                                </h2>
                                                <p className="text-lg text-gray-300">{discoSeleccionado.conexion}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Gauge size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Velocidad
                                                </h2>
                                                <p className="text-lg text-gray-300">{discoSeleccionado.velocidad} MB/s</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{discoSeleccionado.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {/* BOTÓN AÑADIR MEMORIA */}
                                        {!modoSeleccionarIgual && !modoSeleccionarOtro && (
                                            <DropdownMenu.Root>
                                                <DropdownMenu.Trigger asChild>
                                                    <Button
                                                        variant={'outline'}
                                                        className="fade-in relative rounded-lg border-[var(--azul-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--azul-neon)] shadow-[0_0_10px_var(--azul-neon)] transition-all duration-500 hover:bg-[var(--azul-neon)] hover:text-black hover:shadow-[0_0_20px_var(--azul-neon)]"
                                                    >
                                                        Añadir disco extra
                                                    </Button>
                                                </DropdownMenu.Trigger>

                                                <DropdownMenu.Portal>
                                                    <DropdownMenu.Content
                                                        side="bottom"
                                                        align="center"
                                                        className="z-50 mt-1 rounded-md border border-[var(--azul-neon)] bg-[#111] p-2 shadow-lg"
                                                    >
                                                        <DropdownMenu.Item
                                                            className="cursor-pointer rounded-md px-4 py-2 text-sm text-white hover:bg-[var(--azul-neon)] hover:text-black"
                                                            onClick={() => {
                                                                setModoSeleccionarIgual(true);
                                                                guardarDiscoDuroSecundario!(discoSeleccionado);
                                                            }}
                                                        >
                                                            Disco igual
                                                        </DropdownMenu.Item>
                                                        <DropdownMenu.Item
                                                            className="cursor-pointer rounded-md px-4 py-2 text-sm text-white hover:bg-[var(--azul-neon)] hover:text-black"
                                                            onClick={() => {
                                                                setModoSeleccionarOtra(true);
                                                                guardarDiscoDuro!(discoSeleccionado);
                                                                setDiscoSeleccionado(null);
                                                            }}
                                                        >
                                                            Seleccionar otro
                                                        </DropdownMenu.Item>
                                                    </DropdownMenu.Content>
                                                </DropdownMenu.Portal>
                                            </DropdownMenu.Root>
                                        )}
                                        {/* BOTÓN SIGUIENTE O INCOMPATIBLE */}
                                        {esCompatible ? (
                                            <Button
                                                variant={'outline'}
                                                className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${discoActivo && 'hidden'}`}
                                                onClick={() => {
                                                    !modoSeleccionarIgual && !modoSeleccionarOtro && guardarDiscoDuro!(discoSeleccionado);

                                                    if (modoSeleccionarIgual) {
                                                        guardarDiscoDuro!(discoSeleccionado);
                                                        guardarDiscoDuroSecundario!(discoSeleccionado);
                                                    }

                                                    modoSeleccionarOtro && guardarDiscoDuroSecundario!(discoSeleccionado);
                                                }}
                                                asChild
                                            >
                                                <Link href={route('montaje.tarjetaGrafica')}>Siguiente</Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                variant={'outline'}
                                                className={`fade-in rounded-lg border-[var(--rojo-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--rojo-neon)] shadow-[0_0_10px_var(--rojo-neon)] transition-all duration-500 hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_20px_var(--rojo-neon)] ${discoActivo && 'hidden'} disabled hover:cursor-no-drop`}
                                                onClick={() => {
                                                    guardarDiscoDuro!(discoSeleccionado);
                                                }}
                                            >
                                                <h1>Incompatible</h1>
                                            </Button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {discoActivo ? (
                        <ItemArrastrable id={discoActivo.id} nombre={discoActivo.nombre} icono={<Box />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
