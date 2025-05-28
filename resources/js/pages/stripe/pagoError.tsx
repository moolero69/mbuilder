import { router } from '@inertiajs/react';
import { XCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function PagoError() {
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.visit(route('home'));
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-12 text-white">
            <div className="max-w-md rounded-xl border border-red-600 bg-gradient-to-br from-[#0d0d0d] via-[#1a0000] to-[#1a1a1a] p-8 text-center shadow-[0_0_25px_red]">
                <XCircle size={48} className="mx-auto mb-4 text-red-500" />
                <h1 className="mb-2 text-2xl font-bold">Error en el pago</h1>
                <p className="mb-4">No se pudo procesar tu compra. Intenta nuevamente más tarde.</p>
                <p className="text-sm text-gray-400">Redirigiendo a la pantalla de inicio...</p>
            </div>
        </div>
    );
}
