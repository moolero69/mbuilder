import { DiscoDuro, Disipador, FuenteAlimentacion, MemoriaRam, PlacaBase, Procesador, TarjetaGrafica, Torre } from '@/types';
import { pdf } from '@react-pdf/renderer';
import { useEffect } from 'react';
import PdfMontaje from './pdfMontaje';
import { router } from '@inertiajs/react'



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
                />,
            ).toBlob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'montaje.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            router.visit('/montaje/resumen')
        };

        generarPDF();
    }, []);

    return <div className="flex h-dvh w-full items-center justify-center bg-black text-lg">Generando y descargando PDF automáticamente...</div>;
}
