import Footer from "@/components/footer-principal";
import Header from "@/components/header-principal";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

export default function FIltrosMontaje() {
    return (
        <>
            <AppLayout>
                <Header />
                <Head title="Filtros en el montaje" />
                <main className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
                    <div className="max-w-5xl mx-auto p-6 text-white font-['exo_2']">
                        <h1 className="text-3xl font-bold text-[var(--azul-neon)] mb-6">Filtros utilizados para la compatibilidad y eficiencia energética</h1>

                        <section className="mb-10">
                            <h2 className="text-2xl font-semibold text-[var(--verde-neon)] mb-4">Tipos de montaje según consumo energético</h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-semibold">Procesadores</h3>
                                    <ul className="list-disc list-inside text-gray-300">
                                        <li>Eco: ≤ 65W</li>
                                        <li>Equilibrado: ≤ 105W</li>
                                        <li>Pro: Sin límite</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Disipadores</h3>
                                    <ul className="list-disc list-inside text-gray-300">
                                        <li>Eco: hasta 180W</li>
                                        <li>Equilibrado: hasta 250W</li>
                                        <li>Pro: sin límite</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Placas base</h3>
                                    <ul className="list-disc list-inside text-gray-300">
                                        <li>Eco: hasta 22W</li>
                                        <li>Equilibrado: hasta 26W</li>
                                        <li>Pro: sin límite</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">Tarjetas gráficas</h3>
                                    <ul className="list-disc list-inside text-gray-300">
                                        <li>Eco: hasta 125W</li>
                                        <li>Equilibrado: hasta 225W</li>
                                        <li>Pro: sin límite</li>
                                    </ul>
                                </div>
                                <p className="text-sm text-gray-400">* Las memorias RAM y discos duros no se filtran por consumo debido a su bajo impacto energético.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-[var(--verde-neon)] mb-4">Filtros de compatibilidad entre componentes</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-3">
                                <li><strong>Procesador y placa base:</strong> deben tener el mismo socket.</li>
                                <li><strong>Disipador:</strong> debe ser compatible con el socket del procesador.</li>
                                <li><strong>Memoria RAM:</strong> el número total de módulos no debe superar los zócalos disponibles en la placa.</li>
                                <li><strong>Discos duros:</strong> se valida que no se excedan los puertos SATA y M.2 disponibles.</li>
                                <li><strong>Tarjeta gráfica:</strong> se comprueba cuello de botella con la CPU (≤15% ideal) y mínimo un puerto PCIe en la placa.</li>
                                <li><strong>Fuente de alimentación:</strong> debe cubrir el consumo total estimado del sistema.</li>
                                <li><strong>Torre:</strong> debe permitir la longitud de la GPU y admitir refrigeración líquida si se usa.</li>
                            </ul>
                            <p className="mt-4 text-sm text-gray-400">* Todos los componentes van filtrados por marcas.</p>
                        </section>
                    </div>
                    <Footer />
                </main>
            </AppLayout>
        </>
    );
}
