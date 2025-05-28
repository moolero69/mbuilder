import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    // Buscar el índice del breadcrumb activo
    const indexResaltado = breadcrumbs.findIndex((item) => item.activo === true);

    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb className="breadcrumb-gaming font-['Exo_2'] text-base">
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isResaltado = index === indexResaltado;
                            const estaDeshabilitado = !item.componente;

                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem className="text-xl">
                                        {isResaltado ? (
                                            <BreadcrumbPage className="current-page underline">{item.titulo}</BreadcrumbPage>
                                        ) : estaDeshabilitado ? (
                                            <span className="cursor-default text-gray-500 opacity-60">{item.titulo}</span>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href} className="hover:underline">
                                                    {item.titulo}
                                                </Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbs.length - 1 && (
                                        <BreadcrumbSeparator className="separator">
                                            <ChevronRight />
                                        </BreadcrumbSeparator>
                                    )}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}
        </>
    );
}
