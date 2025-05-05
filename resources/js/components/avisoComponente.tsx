import { ShieldAlert } from 'lucide-react';

export default function AvisoComponente({ mensaje }: { mensaje: string }) {
    return (
        <>
            <div className="mb-3 flex gap-2 border-2 border-[var(--amarillo-neon)] p-3">
                <ShieldAlert color="red" className="animate-[flicker_3s_infinite]" />
                <p className='font-["exo_2"] font-bold'>{mensaje}</p>
            </div>
        </>
    );
}
