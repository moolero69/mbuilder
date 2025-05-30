import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CrearDisipador() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        socket: '',
        refrigeracion_liquida: '',
        consumo: 0,
        precio: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.disipadores.guardar'));
    };

    return (
        <>
            <Head title="Añadir disipador" />
            <AdminLayout titulo="Añadir disipador">
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
                        <Label htmlFor="socket">Socket</Label>
                        <Input id="marca" value={data.marca} onChange={(e) => setData('socket', e.target.value)} />
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
                                router.visit(route('admin.disipadores'));
                                e.preventDefault();
                            }}
                            variant="link"
                        >
                            Volver
                        </Button>
                        <Button disabled={processing}>Guardar disipador</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
