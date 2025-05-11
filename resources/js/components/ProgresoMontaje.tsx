import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Link } from '@inertiajs/react';

export default function ProgresoMontaje({ componentes }: { componentes: string[] }) {
    const {
        procesadorGuardado,
        placaBaseGuardada,
        memoriaRamGuardada,
        memoriaRamSecundariaGuardada,
        discoDuroGuardado,
        discoDuroSecundarioGuardado,
        tarjetaGraficaGuardada,
        fuenteAlimentacionGuardada,
        torreGuardada,
        disipadorGuardado,
    } = useProgresoMontaje((state) => state);

    //Hacer suma total de precio
    let total: number = 0;

    if (componentes.includes('procesador')) total += Number(procesadorGuardado?.precio) || 0;
    if (componentes.includes('placaBase')) total += Number(placaBaseGuardada?.precio) || 0;
    if (componentes.includes('memoriaRam')) total += Number(memoriaRamGuardada?.precio) || 0;
    if (componentes.includes('memoriaSecundaria')) total += Number(memoriaRamGuardada?.precio) || 0;
    if (componentes.includes('discoDuro')) total += Number(discoDuroGuardado?.precio) || 0;
    if (componentes.includes('discoDuroSecundario')) total += Number(discoDuroSecundarioGuardado?.precio) || 0;
    if (componentes.includes('tarjetaGrafica')) total += Number(tarjetaGraficaGuardada?.precio) || 0;
    if (componentes.includes('fuenteAlimentacion')) total += Number(fuenteAlimentacionGuardada?.precio) || 0;
    if (componentes.includes('torre')) total += Number(torreGuardada?.precio) || 0;
    if (componentes.includes('disipador')) total += Number(disipadorGuardado?.precio) || 0;

    // Hacer suma de consumo total
    let consumoTotal: number = 0;

    if (componentes.includes('procesador')) consumoTotal += Number(procesadorGuardado?.consumo) || 0;
    if (componentes.includes('placaBase')) consumoTotal += Number(placaBaseGuardada?.consumo) || 0;
    if (componentes.includes('memoriaRam')) consumoTotal += Number(memoriaRamGuardada?.consumo) || 0;
    if (componentes.includes('memoriaSecundaria')) consumoTotal += Number(memoriaRamGuardada?.consumo) || 0;
    if (componentes.includes('discoDuro')) consumoTotal += Number(discoDuroGuardado?.consumo) || 0;
    if (componentes.includes('discoDuroSecundario')) consumoTotal += Number(discoDuroSecundarioGuardado?.consumo) || 0;
    if (componentes.includes('tarjetaGrafica')) consumoTotal += Number(tarjetaGraficaGuardada?.consumo) || 0;
    if (componentes.includes('disipador')) consumoTotal += Number(disipadorGuardado?.consumo) || 0;

    return (
        <div className="mt-auto w-full border-t border-gray-700 bg-black/80 p-4 font-['Exo_2'] text-white">
            <h3 className="mb-4 text-center font-['Orbitron'] text-lg font-bold text-[var(--naranja-neon)]">Progreso del montaje</h3>
            <div className="flex flex-col gap-7">
                {componentes.includes('procesador') && procesadorGuardado && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.procesador')} className="truncate">
                            {procesadorGuardado.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${procesadorGuardado.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('disipador') && disipadorGuardado && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.disipador')} className="truncate">
                            {disipadorGuardado.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${disipadorGuardado.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('placaBase') && placaBaseGuardada && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.placaBase')} className="truncate">
                            {placaBaseGuardada.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${placaBaseGuardada.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('memoriaRam') && memoriaRamGuardada && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.memoriaRam')} className="truncate">
                            <span className="text-[var(--fucsia-neon)]">{memoriaRamGuardada.cantidad && `x${memoriaRamGuardada?.cantidad} `}</span>
                            {memoriaRamGuardada.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${memoriaRamGuardada.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('memoriaRamSecundaria') && memoriaRamSecundariaGuardada && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.memoriaRam')} className="truncate">
                            {memoriaRamSecundariaGuardada.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${memoriaRamSecundariaGuardada.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('discoDuro') && discoDuroGuardado && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.discoDuro')} className="truncate">
                            {discoDuroGuardado.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${discoDuroGuardado.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('discoDuroSecundario') && discoDuroSecundarioGuardado && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.discoDuro')} className="truncate">
                            {discoDuroSecundarioGuardado.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${discoDuroSecundarioGuardado.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('tarjetaGrafica') && tarjetaGraficaGuardada && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.tarjetaGrafica')} className="truncate">
                            {tarjetaGraficaGuardada.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${tarjetaGraficaGuardada.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('fuenteAlimentacion') && fuenteAlimentacionGuardada && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.fuenteAlimentacion')} className="truncate">
                            {fuenteAlimentacionGuardada.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${fuenteAlimentacionGuardada.precio}€`}</span>
                    </div>
                )}
                {componentes.includes('torre') && torreGuardada && (
                    <div className="flex min-w-0 items-center justify-between from-red-500 via-orange-500 to-yellow-500 bg-clip-text duration-200 hover:bg-gradient-to-r hover:text-transparent">
                        <Link href={route('montaje.torre')} className="truncate">
                            {torreGuardada.nombre}
                        </Link>
                        <span className="ml-2 text-[var(--verde-neon)]">{`${torreGuardada.precio}€`}</span>
                    </div>
                )}
            </div>
            <hr className="my-4 border-gray-600" />

            <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[var(--verde-neon)]">{total.toFixed(2)}€</span>
            </div>
            <div className="mt-4 flex justify-between text-lg font-bold">
                <span>Consumo</span>
                <span className="text-[var(--morado-neon)]">{consumoTotal} W</span>
            </div>
        </div>
    );
}
