import { ItemArrastrableProps } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

export function ItemArrastrable({ id, nombre, icono }: ItemArrastrableProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    return (
        <li 
        ref={setNodeRef} 
        style={{cursor: "grab"}}
        {...listeners} 
        {...attributes} 
        className={`p-3 rounded-2xl flex gap-2 bg-gray-700 hover:bg-gray-600 transition cursor-pointer border-2 border-[var(--azul-neon)] ${isDragging && "opacity-0" } active:cursor-cell`}
    >
            {icono}
            <span>{nombre}</span>
        </li>
    );
}
