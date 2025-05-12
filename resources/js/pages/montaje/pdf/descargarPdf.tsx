import { DiscoDuro, Disipador, FuenteAlimentacion, MemoriaRam, PlacaBase, Procesador, TarjetaGrafica, Torre } from '@/types';
import { router } from '@inertiajs/react';
import { pdf } from '@react-pdf/renderer';
import { useEffect } from 'react';
import PdfMontaje from './pdfMontaje';

export default function DescargarPDF({
    procesador,
    disipador,
    placaBase,
    memoriaRam,
    discoDuro,
    discoDuroSecundario,
    tarjetaGrafica,
    fuenteAlimentacion,
    torre,
    resumen,
    nombre,
    precioTotal,
    consumoTotal,
    numeroMemorias
}: {
    procesador: Procesador;
    disipador: Disipador;
    placaBase: PlacaBase;
    memoriaRam: MemoriaRam;
    discoDuro: DiscoDuro;
    discoDuroSecundario: DiscoDuro;
    tarjetaGrafica: TarjetaGrafica;
    fuenteAlimentacion: FuenteAlimentacion;
    torre: Torre;
    resumen: string;
    nombre?: string;
    precioTotal: number;
    consumoTotal: number;
    numeroMemorias: number;
}) {
    useEffect(() => {
        const generarPDF = async () => {
            const blob = await pdf(
                <PdfMontaje
                    procesador={procesador}
                    disipador={disipador}
                    placaBase={placaBase}
                    memoriaRam={memoriaRam}
                    discoDuro={discoDuro}
                    discoDuroSecundario={discoDuroSecundario}
                    tarjetaGrafica={tarjetaGrafica}
                    fuenteAlimentacion={fuenteAlimentacion}
                    torre={torre}
                    precioTotal={precioTotal}
                    consumoTotal={consumoTotal}
                    numeroMemorias={numeroMemorias}
                />,
            ).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = nombre ? `montaje-${nombre.replace(' ', '-')}` : 'montaje.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            resumen === 'Si' ? router.visit('/montaje/resumen') : router.visit('/usuario/montajes');
        };

        generarPDF();
    }, []);

    return <div className="flex h-dvh w-full items-center justify-center bg-black text-lg">Generando y descargando PDF automáticamente...</div>;
}
