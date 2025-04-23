import { Breadcrumbs } from '@/components/breadcrumbs';
import Header from '@/components/header-principal';
import ProgresoMontaje from '@/components/ProgresoMontaje';
import { MontajeLayoutProps } from '@/types';

export default function MontajeLayout({ sidebar, main, breadcrums, progresoMontaje }: MontajeLayoutProps) {
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
                    <div className="flex h-full w-full justify-center">
                        <div className="flex-1">{main}</div> {/* Este se ajusta al centro */}
                        {progresoMontaje && (
                            <div className="relative right-0 z-20 h-auto w-[300px] overflow-y-auto border-l-4 colores-borde border-[var(--verde-neon)] bg-black/80 p-4 text-white shadow-lg">
                                <ProgresoMontaje componentes={progresoMontaje} />
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
