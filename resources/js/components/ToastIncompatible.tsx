import { toast } from 'sonner';

export default function ToastIncompatible({ mensaje }: { mensaje: string }) {

    return(
        toast.custom(() => (
            <div className="w-full max-w-sm rounded-lg border border-[var(--rojo-neon)] bg-red-950/30 p-4 shadow-[0_0_12px_var(--rojo-neon)] text-[var(--amarillo-neon)]">
                <p className="font-bold text-lg">⚠️ Componentes incompatibles</p>
                <p className="text-sm text-[var(--gris-neon)]">{mensaje}</p>
            </div>
        ), {
            duration: 3500
        })
    )
}
