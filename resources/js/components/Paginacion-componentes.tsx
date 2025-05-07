import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { LinksPaginacionProps } from '@/types';

export default function PaginacionComponentes({ links }: LinksPaginacionProps) {
    if (links.length <= 3) return null;

    return (
        <Pagination className='mt-3'>
            <PaginationContent>
                {/* Botón Anterior */}
                <PaginationItem>
                    <PaginationPrevious href={links[0].url || '#'} />
                </PaginationItem>

                {/* Botones de páginas intermedias */}
                {links.slice(1, -1).map((link, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink href={link.url || '#'} isActive={link.active} dangerouslySetInnerHTML={{ __html: link.label }} />
                    </PaginationItem>
                ))}

                {/* Botón Siguiente */}
                <PaginationItem>
                    <PaginationNext href={links[links.length - 1].url || '#'} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
