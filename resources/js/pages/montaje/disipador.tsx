import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import DialogoSaltarComponente from '@/components/DialogoSaltarComponente';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { BreadcrumbItem, Disipador } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Separator } from '@radix-ui/react-separator';
import { ArrowBigDown, Euro, Factory, MemoryStick, Minus, Move, Plus, Search, Waves, Wind, Wrench, Zap } from 'lucide-react';
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
];

export default function MontajeDisipador({ disipadores }: { disipadores: Disipador[] }) {
    const {
        procesadorGuardado,
        disipadorGuardado,
        guardarPlacaBase,
        editarMontaje,
        placaBaseGuardada,
        componenteSaltado,
        guardarComponenteSaltado,
        guardarDisipador,
    } = useProgresoMontaje((state) => state);
    const progresoMontaje = !editarMontaje
        ? ['procesador']
        : [
              'procesador',
              'placaBase',
              'memoriaRam',
              'memoriaRamSecundaria',
              'discoDuro',
              'discoDuroSecundario',
              'tarjetaGrafica',
              'fuenteAlimentacion',
              'torre',
              'disipador',
          ];

    const [disipadorSeleccionado, setDisipadorSeleccionado] = useState<Disipador | null>(disipadorGuardado!);
    const [disipadorActivo, setDisipadorActivo] = useState<Disipador | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [corsairDesplegado, setCorsairDesplegado] = useState(false);
    const [beQuietDesplegado, setBeQuietDesplegado] = useState(false);
    const [coolerMasterDesplegado, setCoolerMasterDesplegado] = useState(false);
    const [deepCoolDesplegado, setDeepCoolDesplegado] = useState(false);
    const [nzxtDesplegado, setNzxtDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const disipadoresCorsair = (() => {
        const p = disipadores.filter((d) => d.marca === 'Corsair' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p.length ? p : null;
    })();

    const disipadoresBeQuiet = (() => {
        const p = disipadores.filter((d) => d.marca === 'be quiet!' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p.length ? p : null;
    })();

    const disipadoresCoolerMaster = (() => {
        const p = disipadores.filter((d) => d.marca === 'Cooler Master' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p.length ? p : null;
    })();

    const disipadoresDeepCool = (() => {
        const p = disipadores.filter((d) => d.marca === 'Deepcool' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p.length ? p : null;
    })();

    const disipadoresNzxt = (() => {
        const p = disipadores.filter((d) => d.marca === 'NZXT' && d.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return p.length ? p : null;
    })();

    useEffect(() => {
        !editarMontaje &&
            toast.custom(
                () => (
                    <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl border-2 border-[var(--rosa-neon)] bg-black/80 p-4 text-white shadow-lg">
                        <span>
                            <Wrench size={30} className="text-[var(--rojo-neon)]" />
                            {}
                        </span>
                        <div className="flex w-full justify-center text-center text-xl">
                            <p className="font-['exo_2']">Arrastra tu disipador</p>
                        </div>
                    </div>
                ),
                { duration: 3500 },
            );
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = disipadores.find((p) => p.id === active.id);
            if (item) {
                setDisipadorSeleccionado(item);
                guardarDisipador!(item);
            }
        }
        setDisipadorActivo(null);
        setIsDragging(false);
    };

    const handleDragStart = (event: any) => {
        const item = disipadores.find((p) => p.id === event.active.id);
        setDisipadorActivo(item || null);
        setIsDragging(true);
    };

    const desplegar = () => {
        setCorsairDesplegado(true);
        setBeQuietDesplegado(true);
        setDeepCoolDesplegado(true);
        setCoolerMasterDesplegado(true);
        setNzxtDesplegado(true);
    };

    const replegar = () => {
        setCorsairDesplegado(false);
        setBeQuietDesplegado(false);
        setDeepCoolDesplegado(false);
        setCoolerMasterDesplegado(false);
        setNzxtDesplegado(false);
    };

    return (
        <>
            <Head title="montaje - disipador" />
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
                                    placeholder="Buscar disipador..."
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
                            {/* ⚠️ CORSAIR */}
                            {disipadoresCorsair && (
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
                                                        id={disipadoresCorsair[0].id}
                                                        nombre={disipadoresCorsair[0].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresCorsair[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresCorsair[1].id}
                                                        nombre={disipadoresCorsair[1].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresCorsair[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {disipadoresCorsair.map((disipador) => (
                                            <div key={disipador.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipador.id}
                                                        nombre={disipador.nombre}
                                                        icono={<Wind />}
                                                        precio={disipador.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {/* ⚠️ BE QUIET! */}
                            {disipadoresBeQuiet && (
                                <Collapsible open={beQuietDesplegado} onOpenChange={setBeQuietDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Be Quiet!
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {beQuietDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!beQuietDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresBeQuiet[0].id}
                                                        nombre={disipadoresBeQuiet[0].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresBeQuiet[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresBeQuiet[1].id}
                                                        nombre={disipadoresBeQuiet[1].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresBeQuiet[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {disipadoresBeQuiet.map((disipador) => (
                                            <div key={disipador.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipador.id}
                                                        nombre={disipador.nombre}
                                                        icono={<Wind />}
                                                        precio={disipador.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {/* ⚠️ Cooler Master */}
                            {disipadoresCoolerMaster && (
                                <Collapsible open={coolerMasterDesplegado} onOpenChange={setCoolerMasterDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Cooler Master
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {coolerMasterDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!coolerMasterDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresCoolerMaster[0].id}
                                                        nombre={disipadoresCoolerMaster[0].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresCoolerMaster[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresCoolerMaster[1].id}
                                                        nombre={disipadoresCoolerMaster[1].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresCoolerMaster[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {disipadoresCoolerMaster.map((disipador) => (
                                            <div key={disipador.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipador.id}
                                                        nombre={disipador.nombre}
                                                        icono={<Wind />}
                                                        precio={disipador.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {/* ⚠️ DeepCool */}
                            {disipadoresDeepCool && (
                                <Collapsible open={deepCoolDesplegado} onOpenChange={setDeepCoolDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Deepcool
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {deepCoolDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!deepCoolDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresDeepCool[0].id}
                                                        nombre={disipadoresDeepCool[0].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresDeepCool[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresDeepCool[1].id}
                                                        nombre={disipadoresDeepCool[1].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresDeepCool[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {disipadoresDeepCool.map((disipador) => (
                                            <div key={disipador.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipador.id}
                                                        nombre={disipador.nombre}
                                                        icono={<Wind />}
                                                        precio={disipador.precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {/* ⚠️ NZXT */}
                            {disipadoresNzxt && (
                                <Collapsible open={nzxtDesplegado} onOpenChange={setNzxtDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Corsair
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {nzxtDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!nzxtDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresNzxt[0].id}
                                                        nombre={disipadoresNzxt[0].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresNzxt[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipadoresNzxt[1].id}
                                                        nombre={disipadoresNzxt[1].nombre}
                                                        icono={<Wind />}
                                                        precio={disipadoresNzxt[1].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {disipadoresNzxt.map((disipador) => (
                                            <div key={disipador.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={disipador.id}
                                                        nombre={disipador.nombre}
                                                        icono={<Wind />}
                                                        precio={disipador.precio}
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
                        <div className="flex h-full flex-col items-center gap-3 bg-black/10 text-white">
                            {disipadorActivo ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu disipador aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Disipador
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${disipadorActivo && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem botonEliminar={() => setDisipadorSeleccionado(null)} mostrarBoton={Boolean(disipadorSeleccionado)}>
                                    {!disipadorActivo && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {disipadorSeleccionado?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/*Boton saltar componente*/}
                            {!disipadorSeleccionado && (
                                <div className='absolute bottom-2 left-2 border-2 border-[var(--rojo-neon)]/60 p-2 font-["exo_2"]'>
                                    <Button
                                        variant={'link'}
                                        className="text-lg"
                                        onClick={() => {
                                            setMostrarDialogoSaltarComponente(true);
                                        }}
                                    >
                                        No quiero seleccionar disipador
                                    </Button>
                                </div>
                            )}
                            {mostrarDialogoSaltarComponente && (
                                <DialogoSaltarComponente
                                    componente="disipador"
                                    ruta="montaje.placaBase"
                                    cerrarDialogo={() => setMostrarDialogoSaltarComponente(false)}
                                    onConfirmar={() => {
                                        guardarComponenteSaltado!(true);
                                        guardarDisipador!(null);
                                    }}
                                />
                            )}

                            {/* Info del disipador con borde neón */}
                            {disipadorSeleccionado && (
                                <>
                                    <div
                                        className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3"
                                        key={disipadorSeleccionado.id}
                                    >
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{disipadorSeleccionado.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <MemoryStick size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Sockets soportados
                                                </h2>
                                                <p className="text-sm text-gray-300">{disipadorSeleccionado.socket}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Waves size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Líquida
                                                </h2>
                                                <p className="text-lg text-gray-300">{disipadorSeleccionado.refrigeracion_liquida}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Zap size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Consumo
                                                </h2>
                                                <p className="text-lg text-gray-300">{disipadorSeleccionado.consumo}W</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{disipadorSeleccionado.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${disipadorActivo && 'hidden'}`}
                                        onClick={() => {
                                            guardarDisipador!(disipadorSeleccionado);
                                            guardarComponenteSaltado!(false);
                                        }}
                                        asChild
                                    >
                                        <Link href={route('montaje.placaBase')}>Siguiente</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {disipadorActivo ? (
                        <ItemArrastrable id={disipadorActivo.id} nombre={disipadorActivo.nombre} icono={<Wind />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
