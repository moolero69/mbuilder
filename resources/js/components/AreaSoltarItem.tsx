import { useDroppable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

export function AreaSoltarItem({
    children,
    botonEliminar,
    mostrarBoton,
}: {
    children?: ReactNode;
    botonEliminar: () => void;
    mostrarBoton?: boolean;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: 'dropzone', // ID único para la zona donde soltar
    });

    return (
        <div
            ref={setNodeRef}
            className={`flex h-full w-full items-center justify-center text-center text-transparent ${isOver && 'z-10 border-2 drop-shadow-[1px_1px_4px_var(--rojo-neon)] transition-all duration-200 ease-in-out'}`}
            id="dropzone"
        >
            {children}
            {mostrarBoton && (
                <div onClick={botonEliminar} className='hover:cursor-pointer'>
                    <Trash2 size={35} className="absolute right-3 bottom-5 text-[var(--rojo-neon)]" />
                </div>
            )}
        </div>
    );
}
