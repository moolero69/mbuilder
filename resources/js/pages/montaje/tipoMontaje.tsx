import Header from '@/components/header-principal';
import { Button } from '@/components/ui/button';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import { Head, Link } from '@inertiajs/react';
import { ActivitySquare, Flame, Leaf } from 'lucide-react';

export default function TipoMontaje() {
    const { guardarTipoMontaje } = useProgresoMontaje((state) => state);
    return (
        <>
            <Head title="Tipo de montaje" />
            <Header />
            <div className="flex h-[calc(100dvh-120px)] items-center justify-center bg-zinc-950 px-6 py-12 text-white">
                <div>
                    <h1 className="mb-16 text-center font-['Orbitron'] text-5xl font-bold text-[var(--azul-neon)] drop-shadow-[0_0_12px_var(--azul-neon)]">
                        ⚡ Elige tu tipo de montaje ⚡
                    </h1>

                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3">
                        {/* Modo Eco */}
                        <div className="rounded-2xl border-[2px] border-[var(--verde-neon)] bg-zinc-900 p-8 shadow-[0_0_15px_var(--verde-neon)] transition hover:scale-[1.02]">
                            <div className="flex flex-col items-center space-y-6">
                                <Leaf size={48} className="text-[var(--verde-neon)]" />
                                <h2 className="font-['exo_2'] text-2xl font-semibold text-[var(--verde-neon)]">Modo Eco</h2>
                                <p className="text-center text-sm text-zinc-300">Máxima eficiencia energética para tareas cotidianas.</p>
                                <Button
                                    className="mt-4 w-full bg-[var(--verde-neon)] font-bold text-black hover:bg-lime-400"
                                    onClick={() => guardarTipoMontaje!('eco')}
                                    asChild
                                >
                                    <Link href={route('montaje.procesador')}>Seleccionar</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Modo Equilibrado */}
                        <div className="rounded-2xl border-[2px] border-[var(--azul-neon)] bg-zinc-900 p-8 shadow-[0_0_15px_var(--azul-neon)] transition hover:scale-[1.02]">
                            <div className="flex flex-col items-center space-y-6">
                                <ActivitySquare size={48} className="text-[var(--azul-neon)]" />
                                <h2 className="font-['Exo_2'] text-2xl font-semibold text-[var(--azul-neon)]">Modo Equilibrado</h2>
                                <p className="text-center text-sm text-zinc-300">Balance perfecto entre rendimiento y eficiencia.</p>
                                <Button
                                    className="mt-8 w-full bg-[var(--azul-neon)] font-bold text-black hover:bg-sky-400"
                                    asChild
                                    onClick={() => guardarTipoMontaje!('equilibrado')}
                                >
                                    <Link href={route('montaje.procesador')}>Seleccionar</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Modo Pro */}
                        <div className="rounded-2xl border-[2px] border-[var(--rojo-neon)] bg-zinc-900 p-8 shadow-[0_0_15px_var(--rojo-neon)] transition hover:scale-[1.02]">
                            <div className="flex flex-col items-center space-y-6">
                                <Flame size={48} className="text-[var(--rojo-neon)]" />
                                <h2 className="font-['Exo_2'] text-2xl font-semibold text-[var(--rojo-neon)]">Modo Pro</h2>
                                <p className="text-center text-sm text-zinc-300">Rendimiento extremo para gaming y edición de alto nivel.</p>
                                <Button
                                    className="mt-4 w-full bg-[var(--rojo-neon)] font-bold text-black hover:bg-red-400"
                                    onClick={() => guardarTipoMontaje!('pro')}
                                    asChild
                                >
                                    <Link href={route('montaje.procesador')}>Seleccionar</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
