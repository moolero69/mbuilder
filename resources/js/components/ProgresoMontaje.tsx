import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';

export default function ProgresoMontaje({ componentes }: { componentes: string[] }) {
    const {
        procesadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        discoDuroGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
    } = useProgresoMontaje((state) => state);

    let total: number = 0;

    //Hacer suma total
    if (componentes.includes('procesador')) total += Number(procesadorGuardado?.precio) || 0;
    if (componentes.includes('placaBase')) total += Number(placaBaseGuardada?.precio) || 0;
    if (componentes.includes('memoriaRam')) total += Number(memoriaRamGuardada?.precio) || 0;
    if (componentes.includes('discoDuro')) total += Number(discoDuroGuardado?.precio) || 0;
    if (componentes.includes('tarjetaGrafica')) total += Number(tarjetaGraficaGuardada?.precio) || 0;
    if (componentes.includes('fuenteAlimentacion')) total += Number(fuenteAlimentacionGuardada?.precio) || 0;
    if (componentes.includes('torre')) total += Number(torreGuardada?.precio) || 0;

    return (
        <div className="mt-auto w-full border-t border-gray-700 bg-black/80 p-6 font-['Exo_2'] text-white">
            <h3 className="mb-4 text-center text-lg font-bold text-[var(--verde-neon)] font-['Orbitron']">Progreso del montaje</h3>

            <div className="flex flex-col gap-8">
                {componentes.includes('procesador') && procesadorGuardado && (
                    <div className="flex justify-between">
                        <span>{procesadorGuardado.nombre}</span>
                        <span className="text-[var(--verde-neon)]">{procesadorGuardado.precio}€</span>
                    </div>
                )}
                {componentes.includes('placaBase') && placaBaseGuardada && (
                    <div className="flex justify-between">
                        <span>{placaBaseGuardada.nombre}</span>
                        <span className="text-[var(--verde-neon)]">{placaBaseGuardada.precio}€</span>
                    </div>
                )}
                {componentes.includes('memoriaRam') && memoriaRamGuardada && (
                    <div className="flex justify-between">
                        <span>{memoriaRamGuardada.nombre}</span>
                        <span className="text-[var(--verde-neon)]">{memoriaRamGuardada.precio}€</span>
                    </div>
                )}
                {componentes.includes('discoDuro') && discoDuroGuardado && (
                    <div className="flex justify-between">
                        <span>{discoDuroGuardado.nombre}</span>
                        <span className="text-[var(--verde-neon)]">{discoDuroGuardado.precio}€</span>
                    </div>
                )}
                {componentes.includes('tarjetaGrafica') && tarjetaGraficaGuardada && (
                    <div className="flex justify-between">
                        <span>{tarjetaGraficaGuardada.nombre}</span>
                        <span className="text-[var(--verde-neon)]">{tarjetaGraficaGuardada.precio}€</span>
                    </div>
                )}
                {componentes.includes('fuenteAlimentacion') && fuenteAlimentacionGuardada && (
                    <div className="flex justify-between">
                        <span>{fuenteAlimentacionGuardada.nombre}</span>
                        <span className="text-[var(--verde-neon)]">{fuenteAlimentacionGuardada.precio}€</span>
                    </div>
                )}
                {componentes.includes('torre') && torreGuardada && (
                    <div className="flex justify-between">
                        <span>{torreGuardada.nombre}</span>
                        <span className="text-[var(--verde-neon)]">{torreGuardada.precio}€</span>
                    </div>
                )}
            </div>

            <hr className="my-4 border-gray-600" />

            <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[var(--verde-neon)]">{total.toFixed(2)}€</span>
            </div>
        </div>
    );
}
