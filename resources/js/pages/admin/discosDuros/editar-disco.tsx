import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/layout-admin';
import { DiscoDuro } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditarDiscoDuro({ discoDuro }: { discoDuro: DiscoDuro }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: discoDuro.nombre,
        marca: discoDuro.marca,
        tecnologia: discoDuro.tecnologia,
        almacenamiento: discoDuro.almacenamiento,
        conexion: discoDuro.conexion,
        pulgadas: discoDuro.pulgadas,
        velocidad: discoDuro.velocidad,
        consumo: discoDuro.consumo,
        precio: discoDuro.precio,
    });

    const editar: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.discosDuros.actualizar', discoDuro.id));
    };

    return (
        <>
            <Head title="Editar disco duro" />
            <AdminLayout titulo="Editar disco duro">
                <form onSubmit={editar} className="mx-auto grid max-w-5xl grid-cols-2 gap-6">
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
                        <Label htmlFor="tecnologia">Tecnología</Label>
                        <Input id="tecnologia" value={data.tecnologia} onChange={(e) => setData('tecnologia', e.target.value)} />
                        <InputError message={errors.tecnologia} />
                    </div>

                    <div>
                        <Label htmlFor="almacenamiento">Almacenamiento</Label>
                        <Input id="almacenamiento" value={data.almacenamiento} onChange={(e) => setData('almacenamiento', e.target.value)} />
                        <InputError message={errors.almacenamiento} />
                    </div>

                    <div>
                        <Label htmlFor="conexion">Conexión</Label>
                        <Input id="conexion" value={data.conexion} onChange={(e) => setData('conexion', e.target.value)} />
                        <InputError message={errors.conexion} />
                    </div>

                    <div>
                        <Label htmlFor="pulgadas">Pulgadas</Label>
                        <Input
                            type="number"
                            id="pulgadas"
                            value={data.pulgadas}
                            onChange={(e) => setData('pulgadas', parseFloat(e.target.value))}
                        />
                        <InputError message={errors.pulgadas} />
                    </div>

                    <div>
                        <Label htmlFor="velocidad">Velocidad (RPM)</Label>
                        <Input
                            type="number"
                            id="velocidad"
                            value={data.velocidad}
                            onChange={(e) => setData('velocidad', parseInt(e.target.value))}
                        />
                        <InputError message={errors.velocidad} />
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

                    <div className="col-span-2 flex justify-center mt-4 gap-4">
                        <Button onClick={(e) => { router.visit(route('admin.discosDuros')); e.preventDefault() }} variant='link'>Volver</Button>
                        <Button disabled={processing}>Editar disco duro</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
