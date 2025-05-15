import { Breadcrumbs } from '@/components/breadcrumbs';
import { hayComponentes } from '@/components/funciones/funciones';
import Header from '@/components/header-principal';
import ProgresoMontaje from '@/components/ProgresoMontaje';
import { MontajeLayoutProps } from '@/types';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function MontajeLayout({ sidebar, main, breadcrums, progresoMontaje}: MontajeLayoutProps) {
    const [montajeEditado, setMontajeEditado] = useState((sessionStorage.getItem("nombreMontajeEditar") || null))

    useEffect(() => {
        const sinComponentes = hayComponentes();
        if (sinComponentes) {
            window.location.href = '/'
        }
    }, []);
    
    return (
        <>
            <Header />
            <main className="flex h-[calc(100dvh-120px)]">
                <section className="w-[18%] flex-col overflow-x-hidden overflow-y-auto bg-gray-700 text-center font-['Exo_2'] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[var(--rojo-neon)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-black">
                    {sidebar}
                </section>
                <section className="relative flex h-full w-[82%] flex-col bg-gray-900">
                    {breadcrums && (
                        <div className="bg-black/10 p-3">
                            <Breadcrumbs breadcrumbs={breadcrums} />
                        </div>
                    )}
                    {
                        montajeEditado && (
                            <div className="absolute right-1 top-1 flex w-[250px] items-center justify-center gap-2 rounded-lg border border-[var(--azul-neon)] p-3 shadow-[0_0_20px_var(--azul-neon)] backdrop-blur-sm">
                                <Pencil />
                                <p className='font-["Orbitron"] text-xl font-bold'>
                                    {montajeEditado}
                                </p>
                            </div>
                        )
                    }

                    <div className="flex h-full w-full justify-center">
                        <div className="flex-1">{main}</div>
                        {progresoMontaje && (
                            <div className={`relative right-0 z-20 h-auto w-[300px] overflow-y-auto border-l-4 colores-borde border-[var(--verde-neon)] bg-black/80 p-4 text-white shadow-lg ${montajeEditado && 'mt-4'}`}>
                                <ProgresoMontaje componentes={progresoMontaje} />
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
