export function Loader() {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-black">
            <div className="relative flex flex-col items-center">
                {/* Anillo giratorio */}
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-[var(--azul-neon)] border-t-transparent"></div>

                {/* Texto con efecto de parpadeo */}
                <p className="mt-4 text-[var(--verde-neon)] text-lg font-bold animate-pulse">Cargando...</p>
            </div>
        </div>
    );
}
