import { ItemArrastrableProps } from "@/types";
import { useDraggable } from "@dnd-kit/core";

export function ItemArrastrable({ id, nombre, icono }: ItemArrastrableProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    const estilo = transform && isDragging
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : {backgroundColor: 'blue'};

    return (
        <li 
        ref={setNodeRef} 
        // style={estilo} 
        {...listeners} 
        {...attributes} 
        className={`p-3 rounded-2xl flex gap-2 bg-gray-700 hover:bg-gray-600 transition cursor-pointer border-2 border-[var(--azul-neon)] 
                ${isDragging && "opacity-0" }`}
    >
            {icono}
            <span>{nombre}</span>
        </li>
    );
}
