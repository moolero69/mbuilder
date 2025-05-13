import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function CrearTorre() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        factor_forma: '',
        soporte_RGB: '',
        longitud_maxima_gpu: 0,
        refrigeracion_liquida: '',
        precio: 0,
        link_imagen: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.torres.guardar'));
    };

    return (
        <>
            <Head title="Añadir torre" />
            <AdminLayout titulo="Añadir torre">
                <form onSubmit={submit} className="mx-auto grid max-w-5xl grid-cols-2 gap-6 mt-10">
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
                        <Label htmlFor="factor_forma">Factor de forma</Label>
                        <Input id="factor_forma" value={data.factor_forma} onChange={(e) => setData('factor_forma', e.target.value)} maxLength={10} />
                        <InputError message={errors.factor_forma} />
                    </div>

                    <div>
                        <Label htmlFor="soporte_RGB">Soporte RGB</Label>
                        <Input id="soporte_RGB" value={data.soporte_RGB} onChange={(e) => setData('soporte_RGB', e.target.value)} />
                        <InputError message={errors.soporte_RGB} />
                    </div>

                    <div>
                        <Label htmlFor="longitud_maxima_gpu">Longitud máxima GPU (mm)</Label>
                        <Input
                            type="number"
                            id="longitud_maxima_gpu"
                            value={data.longitud_maxima_gpu}
                            onChange={(e) => setData('longitud_maxima_gpu', parseInt(e.target.value))}
                        />
                        <InputError message={errors.longitud_maxima_gpu} />
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
                        <Label htmlFor="refrigeracion_liquida">Link imagen</Label>
                        <Input
                            id="link_imagen"
                            value={data.link_imagen}
                            onChange={(e) => setData('link_imagen', e.target.value)}
                        />
                        <InputError message={errors.link_imagen} />
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
                        <Button disabled={processing}>Guardar torre</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
