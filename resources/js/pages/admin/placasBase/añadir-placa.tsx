import { FormEventHandler } from 'react';
import { useForm, Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin/admin-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

export default function CrearPlacaBase() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        marca: '',
        socket: '',
        factor_forma: '',
        zocalos_ram: 0,
        puertos_m2: 0,
        puertos_sata: 0,
        puertos_pcie: 0,
        consumo: 0,
        precio: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.placasBase.guardar'));
    };

    return (
        <>
            <Head title="Añadir placa base" />
            <AdminLayout titulo="Añadir placa base">
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
                        <Label htmlFor="socket">Socket</Label>
                        <Input id="socket" value={data.socket} onChange={(e) => setData('socket', e.target.value)} />
                        <InputError message={errors.socket} />
                    </div>

                    <div>
                        <Label htmlFor="factor_forma">Factor de forma</Label>
                        <Input id="factor_forma" value={data.factor_forma} onChange={(e) => setData('factor_forma', e.target.value)} maxLength={10} />
                        <InputError message={errors.factor_forma} />
                    </div>

                    <div>
                        <Label htmlFor="zocalos_ram">Zócalos RAM</Label>
                        <Input type="number" id="zocalos_ram" value={data.zocalos_ram} onChange={(e) => setData('zocalos_ram', parseInt(e.target.value))} />
                        <InputError message={errors.zocalos_ram} />
                    </div>

                    <div>
                        <Label htmlFor="puertos_m2">Puertos M.2</Label>
                        <Input type="number" id="puertos_m2" value={data.puertos_m2} onChange={(e) => setData('puertos_m2', parseInt(e.target.value))} />
                        <InputError message={errors.puertos_m2} />
                    </div>

                    <div>
                        <Label htmlFor="puertos_sata">Puertos SATA</Label>
                        <Input type="number" id="puertos_sata" value={data.puertos_sata} onChange={(e) => setData('puertos_sata', parseInt(e.target.value))} />
                        <InputError message={errors.puertos_sata} />
                    </div>

                    <div>
                        <Label htmlFor="puertos_pcie">Puertos PCIe</Label>
                        <Input type="number" id="puertos_pcie" value={data.puertos_pcie} onChange={(e) => setData('puertos_pcie', parseInt(e.target.value))} />
                        <InputError message={errors.puertos_pcie} />
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
                        <Button onClick={(e) => { router.visit(route('admin.placasbase')); e.preventDefault() }} variant='link'>Volver</Button>
                        <Button disabled={processing}>Guardar placa base</Button>
                    </div>
                </form>
            </AdminLayout>
        </>
    );
}
