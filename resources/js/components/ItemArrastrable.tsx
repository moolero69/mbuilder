import { ItemArrastrableProps } from '@/types';
import { useDraggable } from '@dnd-kit/core';

export function ItemArrastrable({ id, nombre, icono, iconoSecundario, textoSecundario, precio }: ItemArrastrableProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    return (
        <li
            ref={setNodeRef}
            {...listeners}
            {...transform}
            className={`${isDragging ? 'cursor-grabbing opacity-0' : 'cursor-grab'} flex w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[var(--azul-neon)] bg-gray-700 p-3 text-center font-['exo_2'] hover:bg-gray-600`}
        >
            {icono}
            <span>{nombre}</span>
            {iconoSecundario}
            {precio && (
                <div className="flex flex-col">
                    <span className="text-[var(--naranja-neon)] font-bold">{textoSecundario}</span>
                    <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-600 bg-clip-text font-['exo_2'] text-lg font-bold text-transparent">{`${precio}€`}</span>
                </div>
            )}
        </li>
    );
}
