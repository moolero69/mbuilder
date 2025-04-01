import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export function AreaSoltarItem({ children }: { children?: ReactNode }) {
    const { setNodeRef,isOver } = useDroppable({
        id: 'dropzone', // ID único para la zona donde soltar
    });

    return (
        <div ref={setNodeRef} className={`h-full w-full p-4 text-center text-transparent ${isOver && "z-10 border-2 drop-shadow-[1px_1px_4px_var(--rojo-neon)]"}`} id="dropzone">
            {children}
        </div>
    );
}