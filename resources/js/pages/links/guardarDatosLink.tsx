import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function guardarDatosLink({ datosMontaje }: { datosMontaje: any }) {
    const {
        guardarProcesador,
        guardarDisipador,
        guardarPlacaBase,
        guardarMemoriaRam,
        guardarDiscoDuro,
        guardarDiscoDuroSecundario,
        guardarTarjetaGrafica,
        guardarFuenteAlimentacion,
        guardarTorre,
        guardarTipoMontaje,
    } = useProgresoMontaje((state) => state);

    const guardarDatos = async (datosFormateados: any) => {
        await guardarProcesador!(datosFormateados.procesador);
        await guardarDisipador!(datosFormateados.disipador);
        await guardarPlacaBase!(datosFormateados.placabase);
        await guardarMemoriaRam!(datosFormateados.memoria_ram);
        await guardarDiscoDuro!(datosFormateados.discoduro);
        await guardarDiscoDuroSecundario!(datosFormateados.discodurosecundario);
        await guardarTarjetaGrafica!(datosFormateados.tarjeta_grafica);
        await guardarFuenteAlimentacion!(datosFormateados.fuente_alimentacion);
        await guardarTorre!(datosFormateados.torre);
        await guardarTipoMontaje!(datosFormateados.otros.tipo_montaje);
    };

    useEffect(() => {
        const datosFormateados = JSON.parse(datosMontaje);
        console.log(datosFormateados);

        const guardarYRedirigir = async () => {
            await guardarDatos(datosFormateados);
            router.visit(route('montaje.procesador')); // Redirige después de guardar los datos
        };

        guardarYRedirigir();
    }, [datosMontaje]);

    return <div className="flex h-dvh w-full items-center justify-center bg-black text-lg">Cargando montaje...</div>;
}
