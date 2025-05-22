import Footer from "@/components/footer-principal";
import Header from "@/components/header-principal";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import React from "react";

const FiltrosMedidor: React.FC = () => {
    return (
        <AppLayout>
            <Header />
            <Head title="Filtros en el medidor"/>
            <main className="w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
                <div className="max-w-4xl mx-auto p-6 font-['Exo_2'] text-white">
                    <h1 className="text-3xl font-bold mb-4 text-[var(--azul-neon)]">¿Cómo funciona el medidor de cuello de botella?</h1>

                    <p className="mb-4 text-gray-300">
                        El <strong>medidor de cuello de botella</strong> es una herramienta que analiza la eficiencia conjunta entre el <strong>procesador (CPU)</strong> y la <strong>tarjeta gráfica (GPU)</strong> seleccionados. Su objetivo es detectar desequilibrios que puedan provocar una pérdida de rendimiento en el equipo.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">¿Qué es un cuello de botella?</h2>
                    <p className="mb-4 text-gray-300">
                        Se produce un cuello de botella cuando uno de los componentes limita el rendimiento del otro. Por ejemplo, si la CPU no puede mantener el ritmo de la GPU, esta última no podrá funcionar a su máxima capacidad, lo que se traduce en un rendimiento desaprovechado y posibles caídas de fps o lentitud general.
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">¿Cómo se calcula?</h2>
                    <p className="mb-4 text-gray-300">
                        Utilizamos la puntuación <strong>PassMark</strong> tanto del procesador como de la gráfica. Se calcula un ratio entre ambos y se obtiene una diferencia porcentual respecto a un equilibrio ideal. Si esta diferencia supera un margen aceptable, el sistema alerta sobre un posible cuello de botella.
                    </p>

                    <div className="bg-gray-900 p-4 rounded-xl border border-[var(--azul-neon)] mb-4">
                        <p className="text-sm text-gray-300 font-mono">
                            const ratio = (passmarkCPU / passmarkGPU) * 100;<br />
                            const cuelloDeBotella = ratio - 100;<br />
                            setCuelloBotella(cuelloDeBotella &lt;= 15);
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">¿Qué valores se consideran óptimos?</h2>
                    <ul className="list-disc list-inside text-gray-300 mb-4">
                        <li><strong>Menor o igual al 15%:</strong> Relación equilibrada. El equipo funcionará correctamente sin problemas de rendimiento.</li>
                        <li><strong>Entre 15% y 30%:</strong> Puede haber ligeros desequilibrios, pero el sistema será utilizable.</li>
                        <li><strong>Mayor al 30%:</strong> Cuello de botella significativo. Se recomienda reevaluar la combinación de CPU y GPU.</li>
                    </ul>

                    <h2 className="text-xl font-semibold text-white mt-6 mb-2">¿Por qué es importante?</h2>
                    <p className="mb-4 text-gray-300">
                        Garantizar una buena compatibilidad entre CPU y GPU no solo mejora el rendimiento general, sino que también optimiza la eficiencia energética, la temperatura del sistema y la experiencia del usuario, especialmente en tareas exigentes como videojuegos o edición de vídeo.
                    </p>

                    <p className="text-sm text-gray-400 mt-6 italic">
                        * Este sistema es una estimación basada en datos de rendimiento sintético. Siempre es recomendable consultar benchmarks específicos de los componentes para un análisis más preciso.
                    </p>
                </div>
            </main>
            <Footer />
        </AppLayout>
    );
};

export default FiltrosMedidor;
