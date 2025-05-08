import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Disipador } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditarDisipador({ disipador }: { disipador: Disipador }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: disipador.nombre,
        marca: disipador.marca,
        socket: disipador.socket,
        refrigeracion_liquida: disipador.refrigeracion_liquida,
        consumo: disipador.consumo,
        precio: disipador.precio,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.disipadores.actualizar', disipador.id));
    };

    return (
        <>
            <Head title="Editar disipador" />
            <AdminLayout titulo="Editar disipador">
                <form onSubmit={submit} className="mx-auto grid max-w-5xl grid-cols-2 gap-6">
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
                        <Label htmlFor="socket">Sockets</Label>
                        <Input
                            id="socket"
                            value={data.socket}
                            onChange={(e) => setData('socket', e.target.value)}
                        />
                        <InputError message={errors.socket} />
                    </div>

                    <div>
                        <Label htmlFor="refrigeracion_liquida">Refrigeración líquida</Label>
                        <Input
                            id="refrigeracion_liquida"
                            value={data.refrigeracion_liquida}
                            onChange={(e) => setData('refrigeracion_liquida', e.target.value)}
                        />
                        <InputError message={errors.refrigeracion_liquida} />
                    </div>

                    <div>
                        <Label htmlFor="consumo">Consumo (W)</Label>
                        <Input
                            type="number"
                            id="consumo"
                            value={data.consumo}
                            onChange={(e) => setData('consumo', parseInt(e.target.value))}
                        />
                        <InputError message={errors.consumo} />
                    </div>

                    <div>
                        <Label htmlFor="precio">Precio (€)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            id="precio"
                            value={data.precio}
                            onChange={(e) => setData('precio', parseFloat(e.target.value))}
                        />
                        <InputError message={errors.precio} />
                    </div>

                    <div className="col-span-2 mt-4 flex justify-center">
                        <Button disabled={processing}>Editar disipador</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
