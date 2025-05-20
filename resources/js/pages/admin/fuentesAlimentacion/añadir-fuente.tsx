import { FormEventHandler } from 'react';
import { useForm, Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/layout-admin';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CrearFuenteAlimentacion() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        certificacion: '',
        potencia: 0,
        modular: '',
        precio: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.fuentes.guardar'));
    };

    return (
        <>
            <Head title="Añadir fuente de alimentación" />
            <AdminLayout titulo="Añadir fuente de alimentación">
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
                        <Label htmlFor="certificacion">Certificación</Label>
                        <Input id="certificacion" value={data.certificacion} onChange={(e) => setData('certificacion', e.target.value)} />
                        <InputError message={errors.certificacion} />
                    </div>

                    <div>
                        <Label htmlFor="potencia">Potencia (W)</Label>
                        <Input type="number" id="potencia" value={data.potencia} onChange={(e) => setData('potencia', parseInt(e.target.value))} />
                        <InputError message={errors.potencia} />
                    </div>

                    <div>
                        <Label htmlFor="modular">Modular</Label>
                        <Input id="modular" value={data.modular} onChange={(e) => setData('modular', e.target.value)} />
                        <InputError message={errors.modular} />
                    </div>

                    <div>
                        <Label htmlFor="precio">Precio (€)</Label>
                        <Input type="number" step="0.01" id="precio" value={data.precio} onChange={(e) => setData('precio', parseFloat(e.target.value))} />
                        <InputError message={errors.precio} />
                    </div>

                    <div className="col-span-2 flex justify-center mt-4 gap-4">
                        <Button onClick={(e) => { router.visit(route('admin.fuentes')); e.preventDefault() }} variant='link'>Volver</Button>
                        <Button disabled={processing}>Guardar fuente</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
