import { FormEventHandler } from 'react';
import { useForm, Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CrearTarjetaGrafica() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        tipo: '',
        serie: '',
        tipo_memoria: '',
        memoria: 0,
        longitud: 0,
        passmark: 0,
        consumo: 0,
        precio: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.graficas.guardar'));
    };

    return (
        <>
            <Head title="Añadir tarjeta gráfica" />
            <AdminLayout titulo="Añadir tarjeta gráfica">
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
                        <Label htmlFor="tipo_memoria">Tipo de memoria</Label>
                        <Input id="tipo_memoria" value={data.tipo_memoria} onChange={(e) => setData('tipo_memoria', e.target.value)} />
                        <InputError message={errors.tipo_memoria} />
                    </div>

                    <div>
                        <Label htmlFor="memoria">Memoria (GB)</Label>
                        <Input type="number" id="memoria" value={data.memoria} onChange={(e) => setData('memoria', parseInt(e.target.value))} />
                        <InputError message={errors.memoria} />
                    </div>

                    <div>
                        <Label htmlFor="longitud">Longitud (mm)</Label>
                        <Input type="number" id="longitud" value={data.longitud} onChange={(e) => setData('longitud', parseInt(e.target.value))} />
                        <InputError message={errors.longitud} />
                    </div>

                    <div>
                        <Label htmlFor="passmark">PassMark</Label>
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

                    <div className="col-span-2 flex justify-center mt-4 gap-4">
                        <Button onClick={(e) => { router.visit(route('admin.graficas')); e.preventDefault() }} variant='link'>Volver</Button>
                        <Button disabled={processing}>Guardar tarjeta gráfica</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
