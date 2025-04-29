import { useProgresoMontaje } from "@/hooks/useProgresoMontaje";

export function limpiarComponentes(){
    const {guardarProcesador, guardarPlacaBase, guardarMemoriaRam, guardarMemoriaRamSecundaria, guardarDiscoDuro, guardarDiscoDuroSecundario, guardarTarjetaGrafica, guardarFuenteAlimentacion, guardarTorre} = useProgresoMontaje((state) => state);

    guardarProcesador!(null);
    guardarPlacaBase!(null);
    guardarMemoriaRam!(null);
    guardarMemoriaRamSecundaria!(null);
    guardarDiscoDuro!(null);
    guardarDiscoDuroSecundario!(null);
    guardarTarjetaGrafica!(null);
    guardarFuenteAlimentacion!(null);
    guardarTorre!(null);
}