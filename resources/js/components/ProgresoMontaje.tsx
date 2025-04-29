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
    } = useProgresoMontaje((state) => state);

    let total: number = 0;

    //Hacer suma total
    if (componentes.includes('procesador')) total += Number(procesadorGuardado?.precio) || 0;
    if (componentes.includes('placaBase')) total += Number(placaBaseGuardada?.precio) || 0;
    if (componentes.includes('memoriaRam')) total += Number(memoriaRamGuardada?.precio) || 0;
    if (componentes.includes('memoriaSecundaria')) total += Number(memoriaRamGuardada?.precio) || 0;
    if (componentes.includes('discoDuro')) total += Number(discoDuroGuardado?.precio) || 0;
    if (componentes.includes('discoDuroSecundario')) total += Number(discoDuroSecundarioGuardado?.precio) || 0;
    if (componentes.includes('tarjetaGrafica')) total += Number(tarjetaGraficaGuardada?.precio) || 0;
    if (componentes.includes('fuenteAlimentacion')) total += Number(fuenteAlimentacionGuardada?.precio) || 0;
    if (componentes.includes('torre')) total += Number(torreGuardada?.precio) || 0;

    return (
        <div className="mt-auto w-full border-t border-gray-700 bg-black/80 p-6 font-['Exo_2'] text-white">
            <h3 className="mb-4 text-center font-['Orbitron'] text-lg font-bold text-[var(--verde-neon)]">Progreso del montaje</h3>

            <div className="flex flex-col gap-8">
                {componentes.includes('procesador') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.procesador')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {procesadorGuardado ? procesadorGuardado.nombre : 'Procesador'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {procesadorGuardado ? `${procesadorGuardado.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('placaBase') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.placaBase')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {placaBaseGuardada ? placaBaseGuardada.nombre : 'Placa Base'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {placaBaseGuardada ? `${placaBaseGuardada.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('memoriaRam') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.memoriaRam')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {memoriaRamGuardada ? memoriaRamGuardada.nombre : 'Memoria RAM Principal'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {memoriaRamGuardada ? `${memoriaRamGuardada.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('memoriaRamSecundaria') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.memoriaRam')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {memoriaRamSecundariaGuardada ? memoriaRamSecundariaGuardada.nombre : 'Memoria RAM Secundaria'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {memoriaRamSecundariaGuardada ? `${memoriaRamSecundariaGuardada.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('discoDuro') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.discoDuro')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {discoDuroGuardado ? discoDuroGuardado.nombre : 'Disco Duro Principal'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {discoDuroGuardado ? `${discoDuroGuardado.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('discoDuroSecundario') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.discoDuro')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {discoDuroSecundarioGuardado ? discoDuroSecundarioGuardado.nombre : 'Disco Duro Secundario'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {discoDuroSecundarioGuardado ? `${discoDuroSecundarioGuardado.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('tarjetaGrafica') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.tarjetaGrafica')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {tarjetaGraficaGuardada ? tarjetaGraficaGuardada.nombre : 'Tarjeta Gráfica'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {tarjetaGraficaGuardada ? `${tarjetaGraficaGuardada.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('fuenteAlimentacion') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.fuenteAlimentacion')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {fuenteAlimentacionGuardada ? fuenteAlimentacionGuardada.nombre : 'Fuente de Alimentación'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {fuenteAlimentacionGuardada ? `${fuenteAlimentacionGuardada.precio}€` : '-'}
                        </span>
                    </div>
                )}
                {componentes.includes('torre') && (
                    <div className="flex justify-between items-center">
                        <Link href={route('montaje.torre')} className="border-[var(--azul-neon)] hover:border-b-2">
                            {torreGuardada ? torreGuardada.nombre : 'Torre'}
                        </Link>
                        <span className="text-[var(--verde-neon)]">
                            {torreGuardada ? `${torreGuardada.precio}€` : '-'}
                        </span>
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
