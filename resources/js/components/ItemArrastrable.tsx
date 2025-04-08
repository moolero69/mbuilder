import { ItemArrastrableProps } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";

export function ItemArrastrable({ id, nombre, icono, iconoSecundario, textoSecundario }: ItemArrastrableProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

    return (
        <li
            ref={setNodeRef}
            // style={{cursor: "grab", width: '75%', justifyContent: 'center', display: 'flex'}}
            {...listeners}
            {...transform}
            className={`${isDragging ? "opacity-0 cursor-grabbing" : "cursor-grab"} font-['exo_2'] justify-center p-3 w-fit text-center items-center rounded-2xl flex gap-3 bg-gray-700 hover:bg-gray-600 border-2 border-[var(--azul-neon)]`}
        >
            {icono}
            <span>{nombre}</span>
            <span className="text-green-300 underline">{textoSecundario}</span>
            {iconoSecundario}

        </li>
    );
}
