import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/layouts/admin/admin-layout';
import { TarjetaGrafica } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function EditarTarjetaGrafica({ tarjetaGrafica }: { tarjetaGrafica: TarjetaGrafica }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: tarjetaGrafica.nombre,
        marca: tarjetaGrafica.marca,
        tipo: tarjetaGrafica.tipo,
        serie: tarjetaGrafica.serie,
        tipo_memoria: tarjetaGrafica.tipo_memoria,
        memoria: tarjetaGrafica.memoria,
        longitud: tarjetaGrafica.longitud,
        passmark: tarjetaGrafica.passmark,
        consumo: tarjetaGrafica.consumo,
        precio: tarjetaGrafica.precio,
    });

    const editar: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.graficas.actualizar', tarjetaGrafica.id));
    };

    return (
        <>
            <Head title="Editar tarjeta gráfica" />
            <AdminLayout titulo="Editar tarjeta gráfica">
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
                        <Label htmlFor="tipo">Tipo</Label>
                        <Input id="tipo" value={data.tipo} onChange={(e) => setData('tipo', e.target.value)} />
                        <InputError message={errors.tipo} />
                    </div>

                    <div>
                        <Label htmlFor="serie">Serie</Label>
                        <Input id="serie" value={data.serie} onChange={(e) => setData('serie', e.target.value)} />
                        <InputError message={errors.serie} />
                    </div>

                    <div>
                        <Label htmlFor="tipo_memoria">Tipo de Memoria</Label>
                        <Input id="tipo_memoria" value={data.tipo_memoria} onChange={(e) => setData('tipo_memoria', e.target.value)} />
                        <InputError message={errors.tipo_memoria} />
                    </div>

                    <div>
                        <Label htmlFor="memoria">Memoria (GB)</Label>
                        <Input
                            type="number"
                            id="memoria"
                            value={data.memoria}
                            onChange={(e) => setData('memoria', parseInt(e.target.value))}
                        />
                        <InputError message={errors.memoria} />
                    </div>

                    <div>
                        <Label htmlFor="longitud">Longitud (mm)</Label>
                        <Input
                            type="number"
                            id="longitud"
                            value={data.longitud}
                            onChange={(e) => setData('longitud', parseInt(e.target.value))}
                        />
                        <InputError message={errors.longitud} />
                    </div>

                    <div>
                        <Label htmlFor="passmark">Passmark</Label>
                        <Input
                            type="number"
                            id="passmark"
                            value={data.passmark}
                            onChange={(e) => setData('passmark', parseInt(e.target.value))}
                        />
                        <InputError message={errors.passmark} />
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
                        <Button onClick={(e) => { router.visit(route('admin.graficas')); e.preventDefault() }} variant='link'>Volver</Button>
                        <Button disabled={processing}>Editar tarjeta gráfica</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
