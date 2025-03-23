import Footer from '@/components/footer-principal';
import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { type DatosCompartidos } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <Header />

            <div className="min-h-screen bg-black font-sans text-white">
                {/* Hero Section */}
                <section className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
                    <h2 className="mb-4 text-5xl font-extrabold text-[var(--verde-neon)] drop-shadow-xl">Construye tu PC ideal</h2>
                    <p className="max-w-2xl text-lg text-gray-400">
                        Descubre la mejor combinación de componentes para optimizar rendimiento, compatibilidad y eficiencia.
                    </p>
                    <Button className='mt-6 rounded-3xl bg-[var(--verde-neon)] p-8 py-3 font-bold text-black'>
                        <Link href="configurador">Vamos</Link>
                    </Button>
                    <section className="grid grid-cols-1 gap-6 px-6 py-12 text-center md:grid-cols-3">
                        <div className="border-neon-green rounded-lg border p-6 shadow-lg">
                            <h3 className="text-neon-green text-xl font-semibold">Compatibilidad</h3>
                            <p className="mt-2 text-gray-400">Verifica que todos los componentes funcionen en armonía.</p>
                        </div>
                        <div className="rounded-lg border border-cyan-400 p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-cyan-400">Rendimiento</h3>
                            <p className="mt-2 text-gray-400">Obtén la mejor potencia según tu presupuesto.</p>
                        </div>
                        <div className="rounded-lg border border-red-500 p-6 shadow-lg">
                            <h3 className="text-xl font-semibold text-red-500">Optimización</h3>
                            <p className="mt-2 text-gray-400">Mejor equilibrio entre eficiencia y consumo energético.</p>
                        </div>
                    </section>
                </section>
            </div>
            <Footer />
        </>
    );
}
