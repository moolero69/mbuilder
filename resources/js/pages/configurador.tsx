import { Separator } from '@/components/ui/separator';
import ConfiguradorLayout from '@/layouts/app/configurador-layout';
import { Procesador, TarjetaGrafica } from '@/types';
import { Cpu } from 'lucide-react';

export default function Configurador({ procesadores, graficas }: { procesadores: Procesador[]; graficas: TarjetaGrafica[] }) {
    return (
        <ConfiguradorLayout>
            <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&display=swap" rel="stylesheet" />

            {procesadores.map((procesador) => {
                return (
                    <div className="flex min-h-20 min-w-[100%] flex-col items-center justify-center" key={procesador.id}>
                        <div className='flex flex-row justify-center align-middle py-5 gap-5'>
                            <Cpu/>
                            <h1 className="text-center font-['Exo_2']">{procesador.nombre}</h1>
                        </div>
                        <Separator className="border-1 border-white" />
                    </div>
                );
            })}
        </ConfiguradorLayout>
    );
}
