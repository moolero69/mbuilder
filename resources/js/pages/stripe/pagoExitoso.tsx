import { router } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function PagoExitoso() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.visit(route('home'));
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-12 text-white">
            <div className="max-w-md rounded-xl border border-[var(--verde-neon)] bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1a1a1a] p-8 text-center shadow-[0_0_25px_var(--verde-neon)]">
                <CheckCircle size={48} className="mx-auto mb-4 text-[var(--verde-neon)]" />
                <h1 className="mb-2 text-2xl font-bold">¡Pago exitoso!</h1>
                <p className="mb-4">Tu cuenta PRO está activa. Ya puedes disfrutar de todas las ventajas.</p>
                <p className="text-sm text-gray-400">Redirigiendo a la pantalla de inicio...</p>
            </div>
        </div>
    );
}
