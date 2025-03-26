import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Separator } from '@/components/ui/separator';
import ConfiguradorLayout from '@/layouts/app/configurador-layout';
import { Procesador, TarjetaGrafica } from '@/types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Cpu } from 'lucide-react';
import { useState } from 'react';

export default function Configurador({ procesadores, graficas }: { procesadores: Procesador[]; graficas: TarjetaGrafica[] }) {
    const [droppedItems, setDroppedItems] = useState<Procesador>();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active } = event;
        const item = String(active.id); // Asegúrate de tratar 'id' como un string o el tipo correcto

        const procesadorSeleccionado = procesadores.find((proc) => proc.id === item);

        setDroppedItems(procesadorSeleccionado!);
    };

    return (
        <ConfiguradorLayout
            sidebar={
                <DndContext>
                        {procesadores.map((procesador) => {
                            return (
                                <div className="flex min-h-20 min-w-[100%] flex-col items-center justify-center" key={procesador.id}>
                                    <div className="flex flex-row justify-center gap-5 py-5 align-middle">
                                        <ItemArrastrable key={procesador.id} id={procesador.id} nombre={procesador.nombre} icono={<Cpu />} />
                                    </div>
                                    <Separator className="border-1 border-white" />
                                </div>
                            );
                        })}
                </DndContext>
            }
            main={
                <DndContext onDragEnd={handleDragEnd}>
                    <div>
                        <AreaSoltarItem>
                            <h1 className="text-6xl text-blue-400">Zona Principal</h1>
                            {/* Aquí van los ítems que se han soltado */}
                            <div key={droppedItems?.id} className="py-2 text-black">
                                {droppedItems?.nombre} {/* Aquí puedes renderizar información sobre el ítem */}
                                {droppedItems?.consumo}
                            </div>
                        </AreaSoltarItem>
                    </div>
                </DndContext>
            }
        />
    );
}
