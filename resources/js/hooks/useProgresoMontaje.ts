import { EstadoMontaje } from '@/types';
import { create } from 'zustand';

export const useProgresoMontaje = create<EstadoMontaje>((set) => ({
    procesadorGuardado: null,
    guardarProcesador: (procesador) => set({ procesadorGuardado: procesador }),
    placaBaseGuardada: null,
    guardarPlacaBase: (placaBase) => set({ placaBaseGuardada: placaBase }),
    memoriaRamGuardada: null,
    guardarMemoriaRam: (memoriaRam) => set({ memoriaRamGuardada: memoriaRam }),
    memoriaRamSecundariaGuardada: null,
    guardarMemoriaRamSecundaria: (memoriaRamS) => set({ memoriaRamSecundariaGuardada: memoriaRamS }),
    discoDuroGuardado: null,
    guardarDiscoDuro: (discoDuro) => set({ discoDuroGuardado:discoDuro  }),
    tarjetaGraficaGuardada:null,
    guardarTarjetaGrafica: (tarjetaGrafica) => set({ tarjetaGraficaGuardada: tarjetaGrafica }),
    fuenteAlimentacionGuardada: null,
    guardarFuenteAlimentacion: (fuenteAlimentacion) => set({ fuenteAlimentacionGuardada: fuenteAlimentacion }),
    torreGuardada:null,
    guardarTorre: (torre) => set({ torreGuardada: torre }),
    editarMontaje: null,
    guardarEditarMontaje: (editar) => set({ editarMontaje: editar }),
    montajeAnterior: null,
    guardarMontajeAnterior: (montaje) => set({montajeAnterior: montaje}),
    componenteSaltado:false,
    guardarComponenteSaltado: (saltado) => set({componenteSaltado: saltado})
}));
