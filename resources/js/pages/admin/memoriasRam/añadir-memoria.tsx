import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CrearMemoriaRam() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        almacenamiento: 0,
        tipo: '',
        pack: 1,
        frecuencia: 0,
        consumo: 0,
        precio: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.memoriasRam.guardar'));
    };

    return (
        <>
            <Head title="Añadir memoria RAM" />
            <AdminLayout titulo="Añadir memoria RAM">
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
                        <Label htmlFor="pack">Pack (nº módulos)</Label>
                        <Input type="number" id="pack" value={data.pack} onChange={(e) => setData('pack', parseInt(e.target.value))} />
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
                        <Input type="number" id="consumo" value={data.consumo} onChange={(e) => setData('consumo', parseInt(e.target.value))} />
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

                    <div className="col-span-2 mt-4 flex justify-center gap-4">
                        <Button
                            onClick={(e) => {
                                router.visit(route('admin.memoriasRam'));
                                e.preventDefault();
                            }}
                            variant="link"
                        >
                            Volver
                        </Button>
                        <Button disabled={processing}>Guardar RAM</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
