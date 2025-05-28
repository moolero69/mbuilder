import AppLogo from '@/components/app-logo';
import { AdminLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';
import { Box, CircuitBoard, Cpu, MemoryStick, Menu, PcCase, Power, User, Wind, Wrench, X } from 'lucide-react';
import { useState } from 'react';
import { Toaster } from 'sonner';
import AppLayout from '../app-layout';

const componentes = [
    { title: 'Procesadores', url: '/admin/procesadores', icon: Cpu },
    { title: 'Disipadores', url: '/admin/disipadores', icon: Wind },
    { title: 'Placas Base', url: '/admin/placasBase', icon: CircuitBoard },
    { title: 'Memorias RAM', url: '/admin/memoriasRam', icon: MemoryStick },
    { title: 'Discos Duros', url: '/admin/discosDuros', icon: Box },
    { title: 'Tarjetas Gráficas', url: '/admin/tarjetasGraficas', icon: MemoryStick },
    { title: 'Fuentes de Alimentación', url: '/admin/fuentesAlimentacion', icon: Power },
    { title: 'Torres', url: '/admin/torres', icon: PcCase },
];

export default function AdminLayout({ children, titulo }: AdminLayoutProps) {
    const rutaActual = window.location.pathname;
    const [sidebarAbierto, setSidebarAbierto] = useState(false);

    return (
        <AppLayout>
            <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
                <Toaster position="bottom-center" />

                {/* Botón para pantallas pequeñas */}
                <button className="absolute top-2 left-2 z-50 rounded p-2 text-white md:hidden" onClick={() => setSidebarAbierto(!sidebarAbierto)}>
                    {sidebarAbierto ? <X /> : <Menu />}
                </button>

                <div className="flex h-full w-full">
                    {/* SIDEBAR */}
                    <div
                        className={`fixed top-0 left-0 z-40 h-full w-[55%] bg-black text-white transition-transform duration-300 md:static md:w-[325px] ${sidebarAbierto ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
                    >
                        <div className="flex h-[75px] items-center justify-center border-b border-gray-700">
                            <Link href="/">
                                <AppLogo />
                            </Link>
                        </div>

                        <div className="p-4">
                            <h2 className="mb-2 font-bold">Inventario</h2>
                            {componentes.map((item) => (
                                <a
                                    key={item.title}
                                    href={item.url}
                                    className={`my-1 flex items-center gap-2 rounded px-2 py-2 font-['Orbitron'] hover:bg-gray-800 ${
                                        rutaActual.startsWith(item.url) ? 'border-l-4 border-green-400 bg-gray-800' : ''
                                    }`}
                                >
                                    <item.icon size={18} />
                                    {item.title}
                                </a>
                            ))}

                            <h2 className="mt-6 mb-2 font-bold">Usuarios</h2>
                            <a
                                href="/admin/usuarios"
                                className={`my-1 flex items-center gap-2 rounded px-2 py-2 font-['Orbitron'] hover:bg-gray-800 ${
                                    rutaActual.startsWith('/admin/usuarios') ? 'border-l-4 border-green-400 bg-gray-800' : ''
                                }`}
                            >
                                <User size={18} />
                                Usuarios
                            </a>
                            <a
                                href="/admin/montajes"
                                className={`my-1 flex items-center gap-2 rounded px-2 py-2 font-['Orbitron'] hover:bg-gray-800 ${
                                    rutaActual.startsWith('/admin/montajes') ? 'border-l-4 border-green-400 bg-gray-800' : ''
                                }`}
                            >
                                <Wrench size={18} />
                                Montajes
                            </a>
                        </div>
                    </div>

                    {/* CONTENIDO */}
                    <main className="flex-1 overflow-auto bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 p-4 text-white [&_input]:border-[var(--verde-neon)] [&_input]:focus:border-[#00ff9c]">
                        <h1 className="mb-4 text-center font-['Orbitron'] text-3xl font-bold text-green-400 drop-shadow-lg">{titulo}</h1>
                        <div className="min-h-fit min-w-fit">{children}</div>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}
