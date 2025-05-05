import { ActivitySquare, Flame, Leaf } from 'lucide-react';
import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function TooltipTipoMontaje({ tipo }: { tipo: string }) {
    let color: string = '';
    let icono: ReactNode = null;

    if (tipo === 'eco') {
        color = 'verde';
        icono = <Leaf />;
    } else if (tipo === 'equilibrado') {
        color = 'azul';
        icono = <ActivitySquare />;
    } else if (tipo === 'pro') {
        color = 'rojo';
        icono = <Flame />;
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`text-[var(--${color}-neon)] mb-2 before:hidden after:hidden`}>
                        {icono}
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    className={`border-2 border-[var(--${color}-neon)] bg-gradient-to-r from-[#0d0d0d] via-[#131313] to-[#0d0d0d] text-white`}
                    side="right"
                    align='center'
                >
                    <p className='font-["exo_2"]'>Montaje {tipo}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
