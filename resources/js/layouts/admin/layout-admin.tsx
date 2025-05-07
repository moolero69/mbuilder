import { Box, CircuitBoard, Cpu, MemoryStick, PcCase, Power, Wind } from 'lucide-react';

import AppLogo from '@/components/app-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from '@/components/ui/sidebar';
import UsuarioHeader from '@/components/usuario-header';
import { AdminLayoutProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';

const items = [
    {
        title: 'Procesadores',
        url: '/admin/procesadores',
        icon: Cpu,
    },
    {
        title: 'Disipadores',
        url: '/admin/disipadores',
        icon: Wind,
    },
    {
        title: 'Placas Base',
        url: '/admin/placasBase',
        icon: CircuitBoard,
    },
    {
        title: 'Memorias RAM',
        url: '/admin/memoriasRam',
        icon: MemoryStick,
    },
    {
        title: 'Discos Duros',
        url: '/admin/discosDuros',
        icon: Box,
    },
    {
        title: 'Tarjetas Gráficas',
        url: '/admin/tarjetasGraficas',
        icon: MemoryStick,
    },
    {
        title: 'Fuentes de Alimentación',
        url: '/admin/fuentesAlimentacion',
        icon: Power,
    },
    {
        title: 'Torres',
        url: '/admin/torres',
        icon: PcCase,
    },
];

export default function AdminLayout({ children, titulo }: AdminLayoutProps) {
    return (
        <div className="flex h-dvh">
            <Toaster position="bottom-center" />
            <SidebarProvider>
                <Sidebar className="colores-borde h-full border-r">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="h-[75px]" asChild>
                                    <Link href="/">
                                        <AppLogo />
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>

                    <SidebarContent className="flex-1 overflow-y-auto">
                        <SidebarGroup>
                            <SidebarGroupLabel>Componentes</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url} className="flex items-center gap-2">
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <UsuarioHeader />
                    </SidebarFooter>
                </Sidebar>
            </SidebarProvider>

            <main className="absolute ml-[257px] h-full w-[calc(100dvw-257px)] flex flex-col p-2">
                <span className="flex justify-center font-['Orbitron'] text-3xl font-extrabold text-white drop-shadow-[5px_5px_6px_var(--verde-neon)] h-[60px]">
                    {titulo}
                </span>
                <div className="flex-1 overflow-auto max-h-[calc(100dvh-60px)]">
                    {children}
                </div>
            </main>


        </div>
    );
}
