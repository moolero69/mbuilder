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

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { url } = usePage();

    return (
        <div className="flex h-dvh">
            {/* <Header /> */}
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

            <main className="absolute ml-[257px] h-full w-[calc(100dvw-257px)]">{children}</main>
        </div>
    );
}
