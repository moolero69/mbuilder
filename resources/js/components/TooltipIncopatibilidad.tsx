import { TriangleAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function TooltipIncopatibilidadMontaje({ mensaje }: { mensaje?: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <TriangleAlert className="text-[var(--amarillo-neon)]" />
                </TooltipTrigger>
                <TooltipContent
                    className="border-2 border-[var(--amarillo-neon)] bg-gradient-to-r from-[#0d0d0d] via-[#131313] to-[#0d0d0d] text-white"
                    side="left"
                >
                    <p className='font-["exo_2"]'>{mensaje}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function TooltipIncopatibilidadComponente({ mensaje }: { mensaje: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <TriangleAlert className="text-[var(--rojo-neon)]" />
                </TooltipTrigger>
                <TooltipContent
                    className="border-2 border-[var(--rojo-neon)] bg-gradient-to-r from-[#0d0d0d] via-[#131313] to-[#0d0d0d] text-white"
                    side="right"
                >
                    <p className='font-["exo_2"]'>{mensaje}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
