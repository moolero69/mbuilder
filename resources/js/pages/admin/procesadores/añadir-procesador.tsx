import { FormEventHandler } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CrearProcesador() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        socket: '',
        graficos_integrados: '',
        disipador_incluido: '',
        frecuencia_base: 0,
        frecuencia_turbo: 0,
        nucleos: 0,
        hilos: 0,
        cache: 0,
        passmark: 0,
        consumo: 0,
        precio: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.procesadores.guardar'));
    };

    return (
        <>
            <Head title="Añadir procesador" />
            <AdminLayout titulo='Añadir procesador'>
                <form onSubmit={submit} className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
                    <div>
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" value={data.nombre} onChange={(e) => setData('nombre', e.target.value)} />
                        <InputError message={errors.nombre} />
                    </div>

                    <div>
                        <Label htmlFor="marca">Marca</Label>
                        <Input id="marca" value={data.marca} onChange={(e) => setData('marca', e.target.value)} />
                        <InputError message={errors.marca} />
                    </div>

                    <div>
                        <Label htmlFor="socket">Socket</Label>
                        <Input id="socket" value={data.socket} onChange={(e) => setData('socket', e.target.value)} />
                        <InputError message={errors.socket} />
                    </div>

                    <div>
                        <Label htmlFor="graficos_integrados">Gráficos integrados</Label>
                        <Input id="graficos_integrados" value={data.graficos_integrados} onChange={(e) => setData('graficos_integrados', e.target.value)} />
                        <InputError message={errors.graficos_integrados} />
                    </div>

                    <div>
                        <Label htmlFor="disipador_incluido">Disipador incluido</Label>
                        <Input id="disipador_incluido" value={data.disipador_incluido} onChange={(e) => setData('disipador_incluido', e.target.value)} />
                        <InputError message={errors.disipador_incluido} />
                    </div>

                    <div>
                        <Label htmlFor="frecuencia_base">Frecuencia base (GHz)</Label>
                        <Input type="number" step="0.1" id="frecuencia_base" value={data.frecuencia_base} onChange={(e) => setData('frecuencia_base', parseFloat(e.target.value))} />
                        <InputError message={errors.frecuencia_base} />
                    </div>

                    <div>
                        <Label htmlFor="frecuencia_turbo">Frecuencia turbo (GHz)</Label>
                        <Input type="number" step="0.1" id="frecuencia_turbo" value={data.frecuencia_turbo} onChange={(e) => setData('frecuencia_turbo', parseFloat(e.target.value))} />
                        <InputError message={errors.frecuencia_turbo} />
                    </div>

                    <div>
                        <Label htmlFor="nucleos">Núcleos</Label>
                        <Input type="number" id="nucleos" value={data.nucleos} onChange={(e) => setData('nucleos', parseInt(e.target.value))} />
                        <InputError message={errors.nucleos} />
                    </div>

                    <div>
                        <Label htmlFor="hilos">Hilos</Label>
                        <Input type="number" id="hilos" value={data.hilos} onChange={(e) => setData('hilos', parseInt(e.target.value))} />
                        <InputError message={errors.hilos} />
                    </div>

                    <div>
                        <Label htmlFor="cache">Caché (MB)</Label>
                        <Input type="number" id="cache" value={data.cache} onChange={(e) => setData('cache', parseInt(e.target.value))} />
                        <InputError message={errors.cache} />
                    </div>

                    <div>
                        <Label htmlFor="passmark">Passmark</Label>
                        <Input type="number" id="passmark" value={data.passmark} onChange={(e) => setData('passmark', parseInt(e.target.value))} />
                        <InputError message={errors.passmark} />
                    </div>

                    <div>
                        <Label htmlFor="consumo">Consumo (W)</Label>
                        <Input type="number" id="consumo" value={data.consumo} onChange={(e) => setData('consumo', parseInt(e.target.value))} />
                        <InputError message={errors.consumo} />
                    </div>

                    <div>
                        <Label htmlFor="precio">Precio (€)</Label>
                        <Input type="number" step="0.01" id="precio" value={data.precio} onChange={(e) => setData('precio', parseFloat(e.target.value))} />
                        <InputError message={errors.precio} />
                    </div>

                    <div className="col-span-2 flex justify-end mt-4">
                        <Button disabled={processing} >Guardar procesador</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
