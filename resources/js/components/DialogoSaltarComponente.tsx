import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from './ui/button';
import { Link } from '@inertiajs/react';
export default function DialogoSaltarComponente({componente, cerrarDialogo, onConfirmar, ruta}: {componente: string; cerrarDialogo: () => void; onConfirmar: () => void; ruta:string}) {
    return (
        <Dialog open={true} onOpenChange={cerrarDialogo}>
            <DialogContent className="border-[var(--naranja-neon)] bg-[#0d0d0d] text-white shadow-[0_0_15px_var(--naranja-neon)]">
                <DialogHeader>
                    <DialogTitle className="text-[var(--naranja-neon)] drop-shadow-[0_0_8px_var(--naranja-neon)]">
                        ¿Saltar {componente}?
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 mt-3">
                        Si decides omitir el componente <span className="font-bold text-white">{componente}</span>, no se podrá verificar la
                        compatibilidad ni optimizar correctamente el montaje con los demás componentes seleccionados.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={cerrarDialogo}
                        className="border border-gray-600 text-white hover:cursor-pointer hover:bg-gray-800"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={onConfirmar}
                        className="bg-[var(--naranja-neon)] text-black hover:cursor-pointer hover:bg-orange-500"
                        asChild
                    >
                        <Link href={route(ruta)}>Omitir</Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
