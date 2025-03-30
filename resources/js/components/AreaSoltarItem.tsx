import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export function AreaSoltarItem({ children }: { children?: ReactNode }) {
    const { setNodeRef,isOver } = useDroppable({
        id: 'dropzone', // ID único para la zona donde soltar
    });

    return (
        <div ref={setNodeRef} className={`h-full w-full p-4 text-center text-transparent ${isOver && "border-2 border-[var(--rojo-neon)]"}`} id="dropzone">
            {children}
        </div>
    );
}