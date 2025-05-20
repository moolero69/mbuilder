import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout-admin';
import { FuenteAlimentacion } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditarFuenteAlimentacion({ fuenteAlimentacion }: { fuenteAlimentacion: FuenteAlimentacion }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: fuenteAlimentacion.nombre,
        marca: fuenteAlimentacion.marca,
        certificacion: fuenteAlimentacion.certificacion,
        potencia: fuenteAlimentacion.potencia,
        modular: fuenteAlimentacion.modular,
        precio: fuenteAlimentacion.precio,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.fuentes.actualizar', fuenteAlimentacion.id));
    };

    return (
        <>
            <Head title="Editar fuente de alimentación" />
            <AdminLayout titulo="Editar fuente de alimentación">
                <form onSubmit={submit} className="mx-auto grid max-w-4xl grid-cols-2 gap-6">
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
                        <Label htmlFor="certificacion">Certificación</Label>
                        <Input
                            id="certificacion"
                            value={data.certificacion}
                            onChange={(e) => setData('certificacion', e.target.value)}
                        />
                        <InputError message={errors.certificacion} />
                    </div>

                    <div>
                        <Label htmlFor="potencia">Potencia (W)</Label>
                        <Input
                            type="number"
                            id="potencia"
                            value={data.potencia}
                            onChange={(e) => setData('potencia', parseInt(e.target.value))}
                        />
                        <InputError message={errors.potencia} />
                    </div>

                    <div>
                        <Label htmlFor="modular">Modular</Label>
                        <Input id="modular" value={data.modular} onChange={(e) => setData('modular', e.target.value)} />
                        <InputError message={errors.modular} />
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

                    <div className="col-span-2 flex justify-center mt-4 gap-4">
                        <Button onClick={(e) => { router.visit(route('admin.fuentes')); e.preventDefault() }} variant='link'>Volver</Button>
                        <Button disabled={processing}>Editar fuente de alimentación</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
