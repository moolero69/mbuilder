import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/encabezado-pequeño';
import { type BreadcrumbItem } from '@/types';

import OpcionesApariencia from '@/components/appearance-tabs';
import AjustesLayout from '@/layouts/settings/ajustes-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        titulo: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <>
            <Head title="Ajustes de apariencia" />

            <AjustesLayout>
                <div className="space-y-6">
                    <HeadingSmall titulo="Ajustes de apariencia" descripcion="Actualiza los ajustes de apariencia de tu cuenta" />
                    <OpcionesApariencia />
                </div>
            </AjustesLayout>
        </>
    );
}
