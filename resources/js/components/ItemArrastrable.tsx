import { ItemArrastrableProps } from "@/types";
import { useDraggable } from "@dnd-kit/core";

export function ItemArrastrable({ id, nombre, icono }: ItemArrastrableProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const estilo = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : { backgroundColor: 'green'};

    return (
        <li ref={setNodeRef} style={estilo} {...listeners} {...attributes} className="p-3 rounded-2xl flex gap-2 cursor-pointer active:cursor-grabbing bg-gray-700 hover:bg-gray-600" >
            {icono}
            <span>{nombre}</span>
        </li>
    );
}
