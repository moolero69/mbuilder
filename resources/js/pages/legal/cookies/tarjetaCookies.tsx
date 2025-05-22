import { Link } from "@inertiajs/react";
import { Cookie } from "lucide-react";

interface TarjetaCookiesProps {
    onAceptar: (tipo: string) => void;
}

export default function TarjetaCookies({ onAceptar }: TarjetaCookiesProps) {

    return (
        <>
            <section className="fixed bottom-6 left-6 right-6 z-50 max-w-md rounded-xl border border-[var(--azul-neon)] bg-black/70 p-5 shadow-[0_0_20px_var(--azul-neon)] backdrop-blur-md">
                <div className="flex items-center gap-4 text-white">
                    <Cookie size={50} className="text-[var(--azul-neon)] animate-pulse" />
                    <span className="inline text-sm leading-relaxed text-gray-300 md:text-base font-['exo_2']">
                        Usamos cookies para mejorar tu experiencia, analizar tráfico y personalizar contenido. ¿Qué prefieres?
                        <Link href={route('cookies')} className="ml-2 underline text-[var(--azul-neon)] hover:opacity-80">Política de cookies</Link>
                    </span>
                </div>


                <div className="mt-4 flex flex-wrap justify-center gap-3">
                    <button
                        className="rounded-md border border-gray-500 bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-gray-700 hover:shadow-[0_0_10px_#888]"
                        onClick={() => onAceptar('esenciales')}
                    >
                        Aceptar esenciales
                    </button>
                    <button
                        className="rounded-md border border-[var(--verde-neon)] bg-[var(--verde-neon)]/10 px-4 py-2 text-sm font-semibold text-[var(--verde-neon)] transition hover:scale-105 hover:bg-[var(--verde-neon)]/20 hover:shadow-[0_0_10px_var(--verde-neon)]"
                        onClick={() => onAceptar('todas')}
                    >
                        Aceptar todas
                    </button>
                    <button
                        className="rounded-md border border-red-500 bg-red-900/20 px-4 py-2 text-sm font-semibold text-red-400 transition hover:scale-105 hover:bg-red-900/40 hover:shadow-[0_0_10px_red]"
                        onClick={() => {
                            onAceptar('rechazadas');
                            window.location.replace('https://www.google.com');
                        }}
                    >
                        Rechazar
                    </button>
                </div>
            </section>
        </>
    );
}
