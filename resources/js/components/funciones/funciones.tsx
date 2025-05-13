import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';

export function limpiarComponentes() {
    const {
        guardarProcesador,
        guardarPlacaBase,
        guardarMemoriaRam,
        guardarMemoriaRamSecundaria,
        guardarDiscoDuro,
        guardarDiscoDuroSecundario,
        guardarTarjetaGrafica,
        guardarFuenteAlimentacion,
        guardarTorre,
        guardarTipoMontaje,
        guardarEditarMontaje,
        procesadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        discoDuroGuardado,
        discoDuroSecundarioGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
        tipoMontaje,
    } = useProgresoMontaje((state) => state);

    guardarProcesador!(null);
    guardarPlacaBase!(null);
    guardarMemoriaRam!(null);
    guardarMemoriaRamSecundaria!(null);
    guardarDiscoDuro!(null);
    guardarDiscoDuroSecundario!(null);
    guardarTarjetaGrafica!(null);
    guardarFuenteAlimentacion!(null);
    guardarTorre!(null);
    guardarTipoMontaje!(null);
    guardarEditarMontaje!(false);
    sessionStorage.clear();
}

export function hayComponentes() {
    const {
        procesadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        discoDuroGuardado,
        discoDuroSecundarioGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
        tipoMontaje,
    } = useProgresoMontaje.getState(); // usamos getState porque estamos fuera de un componente React

    return (
        !procesadorGuardado &&
        !placaBaseGuardada &&
        !memoriaRamGuardada &&
        !discoDuroGuardado &&
        !discoDuroSecundarioGuardado &&
        !tarjetaGraficaGuardada &&
        !fuenteAlimentacionGuardada &&
        !torreGuardada &&
        !tipoMontaje
    );
}
