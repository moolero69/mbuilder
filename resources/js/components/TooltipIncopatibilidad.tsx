import { TriangleAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function TooltipIncopatibilidad({ mensaje }: { mensaje?: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <TriangleAlert className="text-[var(--amarillo-neon)]" />
                </TooltipTrigger>
                <TooltipContent className="border-2 border-[var(--amarillo-neon)] bg-gradient-to-r from-[#0d0d0d] via-[#131313] to-[#0d0d0d] text-white" side='left'>
                    <p className='font-["exo_2"]'>{mensaje}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
