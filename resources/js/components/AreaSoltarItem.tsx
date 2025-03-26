import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

export function AreaSoltarItem({ children }: { children: ReactNode }) {
    const { setNodeRef } = useDroppable({
        id: 'main-area', // ID único para la zona donde soltar
    });

    return (
        <div ref={setNodeRef} className="h-dvh p-4 bg-blue-100">
            {children}
        </div>
    );
}