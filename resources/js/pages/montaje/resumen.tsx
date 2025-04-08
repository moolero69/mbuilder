import { AreaSoltarItem } from '@/components/AreaSoltarItem';
import { ItemArrastrable } from '@/components/ItemArrastrable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useProgresoMontaje } from '@/hooks/useProgresoMontaje';
import MontajeLayout from '@/layouts/app/montaje-layout';
import { DiscoDuro, FuenteAlimentacion, MemoriaRam, TarjetaGrafica } from '@/types';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { Head, Link } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ArrowBigDown, ArrowLeft, Power, CircuitBoard, Euro, Factory, Gamepad2, Gauge, Microchip, Minus, Move, Plus, Search, Wrench, Zap, ScrollText, Puzzle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ResumenMontaje() {
    return (
        <MontajeLayout
            sidebar={
                <h1>Sidebar</h1>
            } main={
                <h1>Resumen</h1>
            }
        />
    )
}
