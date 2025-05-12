import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Head } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

export default function Pruebas() {
    const [intelDesplegado, setIntelDesplegado] = useState(false);
    const {
        procesadorGuardado,
        editarMontaje,
        placaBaseGuardada,
        memoriaRamGuardada,
        torreGuardada,
        montajeAnterior,
        componenteSaltado,
        memoriaRamSecundariaGuardada,
        discoDuroGuardado,
        discoDuroSecundarioGuardado,
        tipoMontaje,
    } = useProgresoMontaje((state) => state);

    return (
        <>
            <Head title="pruebas"></Head>
            <Header />
            <div className="flex h-dvh w-full flex-col items-center gap-3 bg-[#ccc] p-5">
                <h1>Pruebas</h1>
                <Collapsible open={intelDesplegado} onOpenChange={setIntelDesplegado} className="w-[350px] space-y-2">
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <h4 className="text-sm font-semibold">Intel</h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <ChevronsUpDown className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 0</div>
                    <CollapsibleContent className="space-y-2">
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 1</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 2</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 3</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 4</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 5</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 6</div>
                        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">Procesador 7</div>
                    </CollapsibleContent>
                </Collapsible>
                {/* <h1>{procesadorGuardado!.nombre}</h1> */}
                {/* <h1>{placaBaseGuardada!.nombre}</h1> */}
                {/* <h1>{torreGuardada?.nombre}</h1> */}
                {/* <h1>{montajeAnterior?.otros.precio}</h1> */}
                {/* <h1>{editarMontaje!.toString()}</h1> */}
                {/* <h1>{componenteSaltado!.toString()}</h1> */}
                <h1>{discoDuroGuardado?.nombre || 'Sin disco principal'}</h1>
                <h1>{discoDuroSecundarioGuardado?.nombre || 'Sin disco secundario'}</h1>
                <h1>Tipo: {tipoMontaje || 'Sin tipo montaje'}</h1>
                <h1> {procesadorGuardado?.nombre || 'Sin procesador'}</h1>

                <h1 className="font-['Orbitron'] text-5xl font-extrabold tracking-widest text-black drop-shadow-[5px_5px_6px_black] transition duration-500 hover:drop-shadow-[5px_5px_6px_black]">
                    MBUILDER
                </h1>
            </div>
        </>
    );
}
