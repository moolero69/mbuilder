import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { TooltipIncopatibilidadComponente } from '@/components/TooltipIncopatibilidad';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { BreadcrumbItem, Torre } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { Label } from '@radix-ui/react-label';
import { ArrowBigDown, Euro, Factory, Microchip, Minus, Move, PcCase, Plus, Search, Sun, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajeTorre({ torres }: { torres: Torre[] }) {
    const {
        guardarTorre,
        editarMontaje,
        componenteSaltado,
        guardarComponenteSaltado,
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
            activo: true,
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

    const [dialogoEditarAbierto, setDialogoEditarAbierto] = useState(false);
    const nombreMontajeEditar: any = sessionStorage.getItem('nombreMontajeEditar');
    const [nuevoNombre, setNuevoNombre] = useState<string>(nombreMontajeEditar);
    const [nombreAntiguo, setNombreAntiguo] = useState(nombreMontajeEditar);

    const [torreSeleccionada, setTorreSeleccionada] = useState<Torre | null>(torreGuardada!);

    const [torreActiva, setTorreActiva] = useState<Torre | null>(null);

    const [isDragging, setIsDragging] = useState(false);

    const [aeroCoolDesplegado, setAeroCoolDesplegado] = useState(false);
    const [coolerMasterDesplegado, setCoolerMasterDesplegado] = useState(false);
    const [corsairDesplegado, setCorsairDesplegado] = useState(false);
    const [deepCoolDesplegado, setDeepCoolDesplegado] = useState(false);
    const [fractalDesplegado, setFractalDesplegado] = useState(false);
    const [lianLiDesplegado, setLianLiDesplegado] = useState(false);
    const [marsDesplegado, setMarsDesplegado] = useState(false);
    const [nfortecDesplegado, setNfortecDesplegado] = useState(false);
    const [noxDesplegado, setNoxDesplegado] = useState(false);
    const [nzxtDesplegado, setNzxtDesplegado] = useState(false);
    const [phanteksDesplegado, setPhanteksDesplegado] = useState(false);
    const [sharkoonDesplegado, setSharkoonDesplegado] = useState(false);
    const [thermaltakeDesplegado, setThermalTakeDesplegado] = useState(false);

    const [busquedaGeneral, setBusquedaGeneral] = useState('');

    const [mostrarDialogoSaltarComponente, setMostrarDialogoSaltarComponente] = useState(false);

    const [torresFiltradas, setTorresFiltradas] = useState<Torre[]>(torres);

    useEffect(() => {
        !editarMontaje &&
            toast.custom(
                (t) => (
                    <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl border-2 border-[var(--rosa-neon)] bg-black/80 p-4 text-white shadow-lg">
                        <span>
                            <Wrench size={30} className="text-[var(--rojo-neon)]" />
                        </span>
                        <div className="flex w-full justify-center text-center text-xl">
                            <p className="font-['exo_2']">Arrastra tu torre</p>
                        </div>
                    </div>
                ),
                { duration: 2750 },
            );

        function filtrarTorres() {
            let torresCompatibles: Torre[];

            torresCompatibles = torres.filter(
                (torre) =>
                    torre.longitud_maxima_gpu >= tarjetaGraficaGuardada!.longitud &&
                    torre.refrigeracion_liquida === disipadorGuardado!.refrigeracion_liquida,
            );

            setTorresFiltradas(torresCompatibles);
        }

        !componenteSaltado && filtrarTorres();
    }, []);

    function comprobarCompatibilidad() {
        if (!disipadorGuardado || !tarjetaGraficaGuardada || !torreSeleccionada) return;

        const graficaIncompatible = torreSeleccionada?.longitud_maxima_gpu < tarjetaGraficaGuardada.longitud;
        const refrigeracionIncompatible = torreSeleccionada.refrigeracion_liquida === 'No' && disipadorGuardado.refrigeracion_liquida === 'Si';

        graficaIncompatible || refrigeracionIncompatible ? setEsCompatible(false) : setEsCompatible(true);
    }

    useEffect(() => {
        torreSeleccionada && comprobarCompatibilidad();
    }, [torreSeleccionada]);

    const torresAeroCool = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Aerocool' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresCoolerMaster = (() => {
        const filtrados = torresFiltradas?.filter(
            (t) => t.marca === 'Cooler Master' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()),
        );
        return filtrados?.length ? filtrados : null;
    })();

    const torresCorsair = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Corsair' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresDeepCool = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'DeepCool' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresFractal = (() => {
        const filtrados = torresFiltradas?.filter(
            (t) => t.marca === 'Fractal Design' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()),
        );
        return filtrados?.length ? filtrados : null;
    })();

    const torresLianLi = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Lian Li' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresMars = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Mars Gaming' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresNfortec = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Nfortec' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresNox = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Nox' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresNzxt = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'NZXT' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresPhanteks = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Phanteks' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresSharkoon = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Sharkoon' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const torresThermalTake = (() => {
        const filtrados = torresFiltradas?.filter((t) => t.marca === 'Thermaltake' && t.nombre.toLowerCase().includes(busquedaGeneral.toLowerCase()));
        return filtrados?.length ? filtrados : null;
    })();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = torres.find((t) => t.id === active.id);
            if (item) {
                setTorreSeleccionada(item);
                guardarTorre!(item);
            }
        }
        setTorreActiva(null);
        setIsDragging(false);
        setEsCompatible(true);
    };

    const handleDragStart = (event: any) => {
        const item = torres.find((t) => t.id === event.active.id);
        setTorreActiva(item || null);
        setIsDragging(true);
    };

    const desplegar = () => {
        setCoolerMasterDesplegado(true);
        setAeroCoolDesplegado(true);
        setCorsairDesplegado(true);
        setDeepCoolDesplegado(true);
        setFractalDesplegado(true);
        setLianLiDesplegado(true);
        setMarsDesplegado(true);
        setNfortecDesplegado(true);
        setNoxDesplegado(true);
        setNzxtDesplegado(true);
        setPhanteksDesplegado(true);
        setSharkoonDesplegado(true);
        setThermalTakeDesplegado(true);
    };

    const replegar = () => {
        setCoolerMasterDesplegado(false);
        setAeroCoolDesplegado(false);
        setCorsairDesplegado(false);
        setDeepCoolDesplegado(false);
        setFractalDesplegado(false);
        setLianLiDesplegado(false);
        setMarsDesplegado(false);
        setNfortecDesplegado(false);
        setNoxDesplegado(false);
        setNzxtDesplegado(false);
        setPhanteksDesplegado(false);
        setSharkoonDesplegado(false);
        setThermalTakeDesplegado(false);
    };

    useEffect(() => {
        nuevoNombre && sessionStorage.setItem('nuevoNombreEditar', nuevoNombre);
    }, [nuevoNombre]);
    return (
        <>
            <Head title="montaje - torre" />
            {dialogoEditarAbierto && <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs"></div>}
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
                                    placeholder="Buscar torre..."
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
                            {torresCorsair && (
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
                                                        id={torresCorsair[0].id}
                                                        nombre={torresCorsair[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresCorsair[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresCorsair.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 NOX */}
                            {torresNox && (
                                <Collapsible open={noxDesplegado} onOpenChange={setNoxDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            NOX
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {noxDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!noxDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresNox[0].id}
                                                        nombre={torresNox[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresNox[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresNox.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 COOLER MASTER */}
                            {torresCoolerMaster && (
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
                                                        id={torresCoolerMaster[0].id}
                                                        nombre={torresCoolerMaster[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresCoolerMaster[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresCoolerMaster.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 Aerocool */}
                            {torresAeroCool && (
                                <Collapsible open={aeroCoolDesplegado} onOpenChange={setAeroCoolDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Aerocool
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {aeroCoolDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!aeroCoolDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresAeroCool[0].id}
                                                        nombre={torresAeroCool[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresAeroCool[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresAeroCool.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 DEEP COOL */}
                            {torresDeepCool && (
                                <Collapsible open={deepCoolDesplegado} onOpenChange={setDeepCoolDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Cooler Master
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
                                                        id={torresDeepCool[0].id}
                                                        nombre={torresDeepCool[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresDeepCool[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresDeepCool.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 FRACTAL DESIGN */}
                            {torresFractal && (
                                <Collapsible open={fractalDesplegado} onOpenChange={setFractalDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Fractal Design
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {fractalDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!fractalDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresFractal[0].id}
                                                        nombre={torresFractal[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresFractal[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresFractal.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 NFORTEC */}
                            {torresNfortec && (
                                <Collapsible open={nfortecDesplegado} onOpenChange={setNfortecDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Nfortec
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {nfortecDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!nfortecDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresNfortec[0].id}
                                                        nombre={torresNfortec[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresNfortec[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresNfortec.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 Lian Li */}
                            {torresLianLi && (
                                <Collapsible open={lianLiDesplegado} onOpenChange={setLianLiDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Lian Li
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {lianLiDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!lianLiDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresLianLi[0].id}
                                                        nombre={torresLianLi[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresLianLi[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresLianLi.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 MARS GAMING */}
                            {torresMars && (
                                <Collapsible open={marsDesplegado} onOpenChange={setMarsDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Mars Gaming
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {marsDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!marsDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresMars[0].id}
                                                        nombre={torresMars[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresMars[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresMars.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 NZXT*/}
                            {torresNzxt && (
                                <Collapsible open={nzxtDesplegado} onOpenChange={setNzxtDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            NZXT
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
                                                        id={torresNzxt[0].id}
                                                        nombre={torresNzxt[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresNzxt[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresNzxt.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 Phanteks */}
                            {torresPhanteks && (
                                <Collapsible open={phanteksDesplegado} onOpenChange={setPhanteksDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Phanteks
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {phanteksDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!phanteksDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresPhanteks[0].id}
                                                        nombre={torresPhanteks[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresPhanteks[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresPhanteks.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 SHARKOON */}
                            {torresSharkoon && (
                                <Collapsible open={sharkoonDesplegado} onOpenChange={setSharkoonDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            Sharkoon
                                        </p>
                                        <CollapsibleTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                {sharkoonDesplegado ? <Minus /> : <Plus />}
                                            </Button>
                                        </CollapsibleTrigger>
                                    </div>
                                    {!sharkoonDesplegado && (
                                        <>
                                            <div className="space-y-3 rounded-xl bg-black/50 p-2">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable
                                                        id={torresSharkoon[0].id}
                                                        nombre={torresSharkoon[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresSharkoon[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresSharkoon.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}

                            {/* 💀 THERMALTAKE */}
                            {torresThermalTake && (
                                <Collapsible open={thermaltakeDesplegado} onOpenChange={setThermalTakeDesplegado} className="w-full space-y-2">
                                    <div className="flex h-12 items-center justify-between rounded-lg bg-black/50 px-4">
                                        <p className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text font-['exo_2'] text-xl font-semibold text-transparent">
                                            ThermalTake
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
                                                        id={torresThermalTake[0].id}
                                                        nombre={torresThermalTake[0].nombre}
                                                        icono={<PcCase />}
                                                        precio={torresThermalTake[0].precio}
                                                    />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresThermalTake.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} precio={torre.precio} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                            {!torresAeroCool &&
                                !torresCoolerMaster &&
                                !torresCorsair &&
                                !torresDeepCool &&
                                !torresFractal &&
                                !torresLianLi &&
                                !torresMars &&
                                !torresNfortec &&
                                !torresNox &&
                                !torresNzxt &&
                                !torresPhanteks &&
                                !torresSharkoon &&
                                !torresThermalTake && (
                                    <div className="flex h-full w-full items-center justify-center">
                                        No se ha encontrado ninguna torre que coincida con tu búsqueda.
                                    </div>
                                )}
                        </div>
                    }
                    main={
                        <div className="flex h-full flex-col items-center gap-3 bg-black/20 text-white">
                            {torreActiva ? (
                                <div className="fade-down z-10 flex flex-col items-center gap-2 text-white">
                                    <h1 className="rerelative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                        Arrastra tu torre aquí
                                    </h1>
                                    <ArrowBigDown className="h-32 w-32 text-[var(--morado-neon)]" />
                                </div>
                            ) : (
                                <h1 className="relative z-20 bg-gray-900 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text p-4 text-center font-['orbitron'] text-6xl font-extrabold tracking-wider text-transparent">
                                    Torre
                                </h1>
                            )}

                            {/* Zona de drop con efecto cyberpunk */}
                            <div
                                className={`relative z-20 h-[80px] w-[50%] border-2 ${torreActiva && 'border-dashed'} border-[var(--rojo-neon)] bg-black/40`}
                            >
                                <AreaSoltarItem
                                    botonEliminar={() => {
                                        setTorreSeleccionada(null);
                                        guardarTorre!(null);
                                    }}
                                    mostrarBoton={Boolean(torreSeleccionada)}
                                >
                                    {!torreActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {torreSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/* Info del componente con borde neón */}
                            {torreSeleccionada && (
                                <>
                                    <div className="fade-left grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-3" key={torreSeleccionada.id}>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Factory size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Marca
                                                </h2>
                                                <p className="text-lg text-gray-300">{torreSeleccionada.marca}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Microchip size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Factor Forma
                                                </h2>
                                                <p className="text-lg text-gray-300">{torreSeleccionada.factor_forma}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Sun size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Soporte RGB
                                                </h2>
                                                <p className="text-lg text-gray-300">{torreSeleccionada.soporte_RGB}</p>
                                            </div>
                                        </div>
                                        <div className="flex transform items-center gap-6 rounded-xl border-4 border-[var(--azul-neon)] bg-black/80 p-8 transition-all duration-1500 ease-in-out hover:border-[var(--morado-neon)]">
                                            <Euro size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Precio
                                                </h2>
                                                <p className="text-lg text-green-300">{torreSeleccionada.precio}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    {esCompatible ? (
                                        <Button
                                            variant={'outline'}
                                            className={`fade-in rounded-lg border-[var(--naranja-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)] shadow-[0_0_10px_var(--naranja-neon)] transition-all duration-500 hover:cursor-pointer hover:bg-[var(--naranja-neon)] hover:text-black hover:shadow-[0_0_20px_var(--naranja-neon)] ${torreActiva && 'hidden'}`}
                                            onClick={() => {
                                                guardarTorre!(torreSeleccionada);
                                            }}
                                            asChild
                                        >
                                            {editarMontaje ? (
                                                <h1 onClick={() => setDialogoEditarAbierto(true)}>Editar</h1>
                                            ) : (
                                                <Link href={route('montaje.resumen')}>Resumen</Link>
                                            )}
                                        </Button>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-center gap-4">
                                                <Button
                                                    variant={'outline'}
                                                    className={`fade-in rounded-lg border-[var(--rojo-neon)] px-8 py-4 font-['Orbitron'] text-lg font-bold text-[var(--rojo-neon)] shadow-[0_0_10px_var(--rojo-neon)] transition-all duration-500 hover:bg-[var(--rojo-neon)] hover:text-black hover:shadow-[0_0_20px_var(--rojo-neon)] ${torreActiva && 'hidden'} disabled hover:cursor-no-drop`}
                                                    onClick={() => {
                                                        guardarTorre!(torreSeleccionada);
                                                    }}
                                                >
                                                    <h1>Incompatible</h1>
                                                </Button>
                                                <TooltipIncopatibilidadComponente mensaje="La gráfica no entra en la torre o la torre no es compatible con tu tipo de refrigeración." />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    }
                />
                <DragOverlay>
                    {torreActiva ? (
                        <ItemArrastrable id={torreActiva.id} nombre={torreActiva.nombre} icono={<PcCase />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>

            <Dialog open={dialogoEditarAbierto} onOpenChange={setDialogoEditarAbierto}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cambiar nombre (opcional) </DialogTitle>
                        <DialogDescription>Cambia el nombre de tu montaje antes de guardarlo.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nombre" className="text-right">
                                Nombre
                            </Label>
                            <Input
                                id="nombre"
                                onChange={(e) => setNuevoNombre(e.target.value)}
                                onInput={(e) => setNombreAntiguo(e.currentTarget.value)}
                                className="col-span-3"
                                value={nombreAntiguo}
                                maxLength={12}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                setDialogoEditarAbierto(false);
                            }}
                            asChild
                        >
                            <Link href={route('montaje.editar.confirmar')}>Editar</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
