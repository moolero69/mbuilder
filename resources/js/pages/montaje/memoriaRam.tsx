import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import DialogoSaltarComponente from '@/components/DialogoSaltarComponente';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { TooltipIncopatibilidadComponente } from '@/components/TooltipIncopatibilidad';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { BreadcrumbItem, MemoriaRam } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, Box, Euro, Factory, Gauge, MemoryStick, Microchip, Minus, Move, Plus, Search, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajeMemoriaRam({ memoriasRam }: { memoriasRam: MemoriaRam[] }) {
    const {
        guardarMemoriaRam,
        guardarMemoriaRamSecundaria,
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
        },
        {
            titulo: 'Memoria RAM',
            href: '/montaje/memoriaRam',
            componente: memoriaRamGuardada,
            activo: true,
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

    const [memoriaSeleccionada, setMemoriaSeleccionada] = useState<MemoriaRam | null>(memoriaRamGuardada!);
    const [modoSeleccionarOtra, setModoSeleccionarOtra] = useState(false);
    const [numeroMemorias, setNumeroMemorias] = useState<number>(memoriaSeleccionada ? memoriaSeleccionada!.cantidad! : 0);
    const [primerPrecioMemoria, setPrimerPrecioMemoria] = useState<number | null>(
        memoriaSeleccionada ? (memoriasRam.find((memoria) => memoria.id === memoriaSeleccionada.id)?.precio ?? null) : null,
    );

    useEffect(() => {
        if (!numeroMemorias || primerPrecioMemoria === undefined) return;
        memoriaRamGuardada!.cantidad = numeroMemorias;
        memoriaRamGuardada!.precio = primerPrecioMemoria! * numeroMemorias;
    }, [numeroMemorias]);

    const [memoriaActiva, setMemoriaActiva] = useState<MemoriaRam | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [corsairDesplegado, setCorsairDesplegado] = useState(false);
    const [crucialDesplegado, setCrucialDesplegado] = useState(false);
    const [kingstonDesplegado, setKingstonDesplegado] = useState(false);
    const [adataDesplegado, setAdataDesplegado] = useState(false);
    const [gSkillDesplegado, setGSkillDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const [memoriasFiltradas, setMemoriasFiltradas] = useState<MemoriaRam[]>(memoriasRam);

    const memoriasCorsair = (() => {
        const m = memoriasFiltradas?.filter((m) => m.marca === 'Corsair' && m.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return m?.length ? m : null;
    })();

    const memoriasCrucial = (() => {
        const m = memoriasFiltradas?.filter((m) => m.marca === 'Crucial' && m.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return m?.length ? m : null;
    })();

    const memoriasKingston = (() => {
        const m = memoriasFiltradas?.filter((m) => m.marca === 'Kingston' && m.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return m?.length ? m : null;
    })();

    const memoriasAdata = (() => {
        const m = memoriasFiltradas?.filter((m) => m.marca === 'ADATA' && m.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return m?.length ? m : null;
    })();

    const memoriasGskill = (() => {
        const m = memoriasFiltradas?.filter((m) => m.marca === 'G.SKILL' && m.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return m?.length ? m : null;
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
                            <p className="font-['exo_2']">Arrastra tu memoria RAM</p>
                        </div>
                    </div>
                ),
                { duration: 2750 },
            );

        const filtrarMemorias = () => {
            const socketsDDR5 = ['AM5', 'LGA1700'];
            const socketsDDR4 = ['AM4', 'LGA1200'];

            const socket = procesadorGuardado?.socket;

            // Aqui no se compara el tipo de montaje por consumo ya que la diferencia entre ellas es infima

            const memoriasCompatibles = memoriasRam.filter((mem) => {
                const esDDR5 = socketsDDR5.includes(socket!) && mem.tipo === 'DDR5';
                const esDDR4 = socketsDDR4.includes(socket!) && mem.tipo === 'DDR4';
                return esDDR5 || esDDR4;
            });

            setMemoriasFiltradas(memoriasCompatibles);
        };

        !componenteSaltado && filtrarMemorias();
    }, []);

    function comprobarCompatibilidad() {
        if (!placaBaseGuardada || !memoriaSeleccionada) return;

        const zocalosPlaca = placaBaseGuardada.zocalos_ram;
        const zocalosOcupados: number = modoSeleccionarOtra ? memoriaRamGuardada!.pack + memoriaSeleccionada.pack : memoriaSeleccionada.pack * 2;

        zocalosPlaca < zocalosOcupados ? setEsCompatible(false) : setEsCompatible(true);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = memoriasRam.find((p) => p.id === active.id);
            if (item) {
                setMemoriaSeleccionada(item);
                setNumeroMemorias(item.pack);
                setPrimerPrecioMemoria(item.precio);
                guardarMemoriaRam!(item);
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
                                                        textoSecundario={`${memoriasCorsair[0].almacenamiento}GB`}
                                                        precio={memoriasCorsair[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCorsair[1].id}
                                                        nombre={memoriasCorsair[1].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasCorsair[1].almacenamiento}GB`}
                                                        precio={memoriasCorsair[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCorsair[2].id}
                                                        nombre={memoriasCorsair[2].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasCorsair[2].almacenamiento}GB`}
                                                        precio={memoriasCorsair[2].precio}
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
                                                    <ItemArrastrable
                                                        id={memoria.id}
                                                        nombre={memoria.nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoria.almacenamiento}GB`}
                                                        precio={memoria.precio}
                                                    />
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
                                                        textoSecundario={`${memoriasCrucial[0].almacenamiento}GB`}
                                                        precio={memoriasCrucial[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCrucial[1].id}
                                                        nombre={memoriasCrucial[1].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasCrucial[1].almacenamiento}GB`}
                                                        precio={memoriasCrucial[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasCrucial[2].id}
                                                        nombre={memoriasCrucial[2].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasCrucial[2].almacenamiento}GB`}
                                                        precio={memoriasCrucial[2].precio}
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
                                                    <ItemArrastrable
                                                        id={memoria.id}
                                                        nombre={memoria.nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoria.almacenamiento}GB`}
                                                        precio={memoria.precio}
                                                    />
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
                                                        textoSecundario={`${memoriasKingston[0].almacenamiento}GB`}
                                                        precio={memoriasKingston[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasKingston[1].id}
                                                        nombre={memoriasKingston[1].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasKingston[1].almacenamiento}GB`}
                                                        precio={memoriasKingston[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasKingston[2].id}
                                                        nombre={memoriasKingston[2].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasKingston[2].almacenamiento}GB`}
                                                        precio={memoriasKingston[2].precio}
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
                                                    <ItemArrastrable
                                                        id={memoria.id}
                                                        nombre={memoria.nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoria.almacenamiento}GB`}
                                                        precio={memoria.precio}
                                                    />
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
                                                        textoSecundario={`${memoriasGskill[0].almacenamiento}GB`}
                                                        precio={memoriasGskill[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasGskill[1].id}
                                                        nombre={memoriasGskill[1].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasGskill[1].almacenamiento}GB`}
                                                        precio={memoriasGskill[1].precio}
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
                                                    <ItemArrastrable
                                                        id={memoria.id}
                                                        nombre={memoria.nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoria.almacenamiento}GB`}
                                                        precio={memoria.precio}
                                                    />
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
                                                        textoSecundario={`${memoriasAdata[0].almacenamiento}GB`}
                                                        precio={memoriasAdata[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={memoriasAdata[1].id}
                                                        nombre={memoriasAdata[1].nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoriasAdata[1].almacenamiento}GB`}
                                                        precio={memoriasAdata[1].precio}
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
                                                    <ItemArrastrable
                                                        id={memoria.id}
                                                        nombre={memoria.nombre}
                                                        icono={<MemoryStick />}
                                                        textoSecundario={`${memoria.almacenamiento}GB`}
                                                        precio={memoria.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {!memoriasCorsair && !memoriasCrucial && !memoriasKingston && !memoriasAdata && !memoriasGskill && (
                                <div className="flex h-full w-full items-center justify-center">
                                    No se ha encontrado ninguna memoria que coincida con tu búsqueda.
                                </div>
                            )}
                        </div>
                    }
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/20 text-white">
                            {memoriaActiva ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
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
                                <AreaSoltarItem
                                    botonEliminar={() => {
                                        setMemoriaSeleccionada(null);
                                        guardarMemoriaRam!(null);
                                    }}
                                    mostrarBoton={Boolean(memoriaSeleccionada)}
                                >
                                    {!memoriaActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            <span className="text-[var(--fucsia-neon)]">
                                                {memoriaSeleccionada?.cantidad && `x${memoriaSeleccionada.cantidad} `}
                                            </span>
                                            {memoriaSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/*Boton saltar componente*/}
                            {!memoriaSeleccionada && (
                                <div className='absolute bottom-2 left-2 border-2 border-[var(--rojo-neon)]/60 p-2 font-["exo_2"]'>
                                    <Button
                                        variant={'link'}
                                        className="text-lg"
                                        onClick={() => {
                                            setMostrarDialogoSaltarComponente(true);
                                        }}
                                    >
                                        No quiero seleccionar memoria RAM
                                    </Button>
                                </div>
                            )}
                            {mostrarDialogoSaltarComponente && (
                                <DialogoSaltarComponente
                                    componente="memoria RAM"
                                    ruta="montaje.discoDuro"
                                    cerrarDialogo={() => setMostrarDialogoSaltarComponente(false)}
                                    onConfirmar={() => {
                                        guardarComponenteSaltado!(true);
                                        guardarMemoriaRam!(null);
                                    }}
                                />
                            )}

                            {/* Info del componente con borde neón */}
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
                                                <p className="text-lg text-gray-300">{memoriaSeleccionada.almacenamiento} GB</p>
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
                                            <Gauge size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Frecuencia
                                                </h2>
                                                <p className="text-lg text-gray-300">{memoriaSeleccionada.frecuencia} MHz</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Box size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Pack
                                                </h2>
                                                <p className="text-lg text-gray-300">
                                                    {memoriaSeleccionada.pack} x {memoriaSeleccionada.almacenamiento}GB
                                                </p>
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
                                    <div className="flex items-center gap-4">
                                        {/* BOTÓN AÑADIR MEMORIA EXTRA*/}
                                        {numeroMemorias < placaBaseGuardada!.zocalos_ram && (
                                            <Button
                                                variant={'outline'}
                                                className={`fade-in relative rounded-lg border-[var(--azul-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--azul-neon)] shadow-[0_0_10px_var(--azul-neon)] transition-all duration-500 hover:bg-[var(--azul-neon)] hover:text-black hover:shadow-[0_0_20px_var(--azul-neon)] ${memoriaActiva && 'hidden'}`}
                                                onClick={() => {
                                                    setNumeroMemorias((numero) => numero + memoriaSeleccionada.pack);
                                                }}
                                            >
                                                Añadir memoria extra
                                            </Button>
                                        )}
                                        {/* BOTÓN SIGUIENTE O INCOMPATIBLE */}
                                        {esCompatible ? (
                                            <Button
                                                variant={'outline'}
                                                className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${memoriaActiva && 'hidden'}`}
                                                onClick={() => {
                                                    guardarMemoriaRam!(memoriaSeleccionada);
                                                }}
                                                asChild
                                            >
                                                <Link href={route('montaje.discoDuro')}>Siguiente</Link>
                                            </Button>
                                        ) : (
                                            <>
                                                <div className="flex items-center justify-center gap-4">
                                                    <Button
                                                        variant={'outline'}
                                                        className={`fade-in rounded-lg border-[var(--rojo-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--rojo-neon)] shadow-[0_0_10px_var(--rojo-neon)] transition-all duration-500 hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_20px_var(--rojo-neon)] ${memoriaActiva && 'hidden'} disabled hover:cursor-no-drop`}
                                                        onClick={() => {
                                                            guardarMemoriaRam!(memoriaSeleccionada);
                                                        }}
                                                    >
                                                        <h1>Incompatible</h1>
                                                    </Button>
                                                    <TooltipIncopatibilidadComponente mensaje="El número de zócalos ocupados es mayor al que tiene la placa escogida." />
                                                </div>
                                            </>
                                        )}
                                    </div>
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
