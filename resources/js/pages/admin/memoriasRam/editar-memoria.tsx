import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout-admin';
import { MemoriaRam } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditarMemoriaRam({ memoriaRam }: { memoriaRam: MemoriaRam }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: memoriaRam.nombre,
        marca: memoriaRam.marca,
        almacenamiento: memoriaRam.almacenamiento,
        tipo: memoriaRam.tipo,
        pack: memoriaRam.pack,
        frecuencia: memoriaRam.frecuencia,
        consumo: memoriaRam.consumo,
        precio: memoriaRam.precio,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.memoriasRam.actualizar', memoriaRam.id));
    };

    return (
        <>
            <Head title="Editar memoria RAM" />
            <AdminLayout titulo="Editar memoria RAM">
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
                        <Label htmlFor="almacenamiento">Almacenamiento (GB)</Label>
                        <Input
                            type="number"
                            id="almacenamiento"
                            value={data.almacenamiento}
                            onChange={(e) => setData('almacenamiento', parseInt(e.target.value))}
                        />
                        <InputError message={errors.almacenamiento} />
                    </div>

                    <div>
                        <Label htmlFor="tipo">Tipo</Label>
                        <Input id="tipo" value={data.tipo} onChange={(e) => setData('tipo', e.target.value)} />
                        <InputError message={errors.tipo} />
                    </div>

                    <div>
                        <Label htmlFor="pack">Pack</Label>
                        <Input
                            type="number"
                            id="pack"
                            value={data.pack}
                            onChange={(e) => setData('pack', parseInt(e.target.value))}
                        />
                        <InputError message={errors.pack} />
                    </div>

                    <div>
                        <Label htmlFor="frecuencia">Frecuencia (MHz)</Label>
                        <Input
                            type="number"
                            id="frecuencia"
                            value={data.frecuencia}
                            onChange={(e) => setData('frecuencia', parseInt(e.target.value))}
                        />
                        <InputError message={errors.frecuencia} />
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
                        <Button disabled={processing}>Editar memoria RAM</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
