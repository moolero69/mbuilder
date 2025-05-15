import { Breadcrumbs } from '@/components/breadcrumbs';
import { hayComponentes } from '@/components/funciones/funciones';
import Header from '@/components/header-principal';
import ProgresoMontaje from '@/components/ProgresoMontaje';
import { MedidorLayoutProps, MontajeLayoutProps } from '@/types';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Medidorlayout({ sidebarIzquierdo, sidebarDerecho, main }: MedidorLayoutProps) {
    // useEffect(() => {
    //     const sinComponentes = hayComponentes();
    //     if (sinComponentes) {
    //         window.location.href = '/'
    //     }
    // }, []);

    return (
        <>
            <Header />
            <main className="flex h-[calc(100dvh-120px)]">
                <section className="w-[18%] flex-col overflow-x-hidden overflow-y-auto bg-gray-700 text-center font-['Exo_2'] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[var(--rojo-neon)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-black">
                    {sidebarIzquierdo}
                </section>
                <section className="relative flex h-full w-[64%] flex-col bg-gray-900">
                    {main}
                </section>
                <section className="w-[18%] flex-col overflow-x-hidden overflow-y-auto bg-gray-700 text-center font-['Exo_2'] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-[var(--rojo-neon)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-black">
                    {sidebarDerecho}
                </section>
            </main>
        </>
    );
}
