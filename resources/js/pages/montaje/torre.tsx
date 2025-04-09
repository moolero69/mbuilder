import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { Torre } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, ArrowLeft, PcCase, CircuitBoard, Euro, Factory, Gauge, Microchip, Minus, Move, Plus, Search, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function MontajeTorre({ torres }: { torres: Torre[] }) {
    const { placaBaseGuardada, guardarTorre } = useProgresoMontaje((state) => state);

    const [torreSeleccionada, setTorreSeleccionada] = useState<Torre | null>(null);

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

    const [torresFiltradas, setTorresFiltradas] = useState<Torre[]>();

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

    useEffect(() => {
        toast.custom(
            (t) => (
                <div className="ml-20 flex w-[350px] items-center gap-3 rounded-xl bg-black/80 p-4 text-white shadow-lg">
                    <span>
                        <Wrench size={30} className="text-[var(--rojo-neon)]" />
                    </span>
                    <div className="flex w-full justify-center text-center text-xl">
                        <p className="font-['exo_2']">Arrastra tu torre</p>
                    </div>
                </div>
            ),
            { duration: 3500 },
        );

        const comprobarCompatibilidad = () => {
            const torresCompatibles = torres.filter((t) => t.factor_forma === placaBaseGuardada?.factor_forma);

            setTorresFiltradas(torresCompatibles);
        };

        comprobarCompatibilidad();
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over?.id === 'dropzone') {
            const item = torres.find((t) => t.id === active.id);
            if (item) {
                setTorreSeleccionada(item);
            }
        }
        setTorreActiva(null);
        setIsDragging(false);
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
    return (
        <>
            <Head title="montaje - torre" />
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
                                                    <ItemArrastrable id={torresCorsair[0].id} nombre={torresCorsair[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresCorsair.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresNox[0].id} nombre={torresNox[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresNox.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                            Cooler Master
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
                                                    <ItemArrastrable id={torresAeroCool[0].id} nombre={torresAeroCool[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresAeroCool.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresDeepCool[0].id} nombre={torresDeepCool[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresDeepCool.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresFractal[0].id} nombre={torresFractal[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresFractal.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresNfortec[0].id} nombre={torresNfortec[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresNfortec.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresLianLi[0].id} nombre={torresLianLi[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresLianLi.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresMars[0].id} nombre={torresMars[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresMars.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresNzxt[0].id} nombre={torresNzxt[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresNzxt.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresPhanteks[0].id} nombre={torresPhanteks[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresPhanteks.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresSharkoon[0].id} nombre={torresSharkoon[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresSharkoon.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                                    <ItemArrastrable id={torresThermalTake[0].id} nombre={torresThermalTake[0].nombre} icono={<PcCase />} />
                                                </div>
                                                <Separator className="border-[1px] border-gray-600" />
                                            </div>
                                        </>
                                    )}
                                    <CollapsibleContent className="space-y-3 rounded-xl bg-black/50 p-2">
                                        {torresThermalTake.map((torre) => (
                                            <div key={torre.id} className="w-full">
                                                <div className="flex flex-row justify-center gap-5 py-3 align-middle">
                                                    <ItemArrastrable id={torre.id} nombre={torre.nombre} icono={<PcCase />} />
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
                                <Link href={route('montaje.fuenteAlimentacion')}>
                                    <h1 className='font-["exo_2"] underline'>VOLVER A LA FUENTE</h1>
                                </Link>
                            </div>
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
                                <AreaSoltarItem>
                                    {!torreActiva && (
                                        <h1 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                            {torreSeleccionada?.nombre}
                                        </h1>
                                    )}
                                </AreaSoltarItem>
                            </div>

                            {/* Info del procesador con borde neón */}
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
                                            <CircuitBoard size={48} className="text-[var(--rojo-neon)]" />
                                            <div>
                                                <h2 className="mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text font-['orbitron'] text-2xl font-bold text-transparent">
                                                    Soporte RGB
                                                </h2>
                                                <p className="text-lg text-gray-300">{torreSeleccionada.soporte_rgb}</p>
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
                                    <Button
                                        variant={'outline'}
                                        className="fade-in border-[var(--morado-neon)] font-['exo_2']"
                                        onClick={() => {
                                            guardarTorre!(torreSeleccionada);
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
                    {torreActiva ? (
                        <ItemArrastrable id={torreActiva.id} nombre={torreActiva.nombre} icono={<PcCase />} iconoSecundario={<Move />} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
}
