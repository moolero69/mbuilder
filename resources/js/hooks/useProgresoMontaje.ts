import { EstadoMontaje } from "@/types";
import { create } from "zustand";

export const useProgresoMontaje = create<EstadoMontaje>((set) => ({
    procesadorGuardado: null,
    guardarProcesadorSeleccionado: (procesador) => set({ procesadorGuardado: procesador }),
    placaBaseGuardada: null,
    guardarPlacaBaseSeelccionada: (placaBase)=> set({ placaBaseGuardada: placaBase }),
}));
