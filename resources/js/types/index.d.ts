import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface DatosCompartidos {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface DiscoDuro {
    id: string;
    nombre: string;
    marca: string;
    tecnologia: string;
    almacenamiento: string;
    conexion: string;
    pulgadas: number;
    velocidad: number;
    consumo: number;
    precio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface TarjetaGrafica {
    id: string;
    nombre: string;
    marca: string;
    tipo: string;
    serie: string;
    tipo_memoria:string;
    memoria: number;
    passmark: number;
    consumo: number;
    precio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface Procesador {
    id: string;
    nombre: string;
    marca: string;
    socket: string;
    frecuencia_base: number;
    frecuencia_turbo: number;
    nucleos: number;
    hilos: number;
    cache: number;
    passmark: number;
    consumo: number;
    precio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface FuenteAlimentacion {
    id: string;
    nombre: string;
    marca: string;
    certificacion: string;
    potencia: number;
    modular: string;
    precio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface PlacaBase {
    id: string;
    nombre: string;
    marca: string;
    socket: string;
    factor_forma: string;
    consumo: number;
    precio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    compatible?: boolean;
}

export interface Torre {
    id: string;
    nombre: string;
    marca: string;
    factor_forma: string;
    soporte_RGB: string;
    precio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface MemoriaRam {
    id: string;
    nombre: string;
    marca: string;
    almacenamiento: number;
    tipo: string;
    pack: number;
    frecuencia: number;
    consumo: number;
    precio: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
}

export interface ConfiguradorLayoutProps {
    sidebar: ReactNode;
    main: ReactNode;
}

export interface ItemArrastrableProps {
    id: string;
    nombre: string;
    icono: ReactNode;
    iconoSecundario?: ReactNode;
    textoSecundario?: string;
}

export interface EstadoMontaje {
    procesadorGuardado?: Procesador | null;
    guardarProcesador?: (procesador: Procesador | null) => void;
    placaBaseGuardada?: PlacaBase | null;
    guardarPlacaBase?: (placaBase: PlacaBase | null) => void;
    memoriaRamGuardada?: MemoriaRam | null;
    guardarMemoriaRam?: (memoriaRam: MemoriaRam | null) => void;
    discoDuroGuardado?: DiscoDuro | null;
    guardarDiscoDuro?: (discoDuro: DiscoDuro | null) => void;
    tarjetaGraficaGuardada?: TarjetaGrafica | null;
    guardarTarjetaGrafica?: (tarjetaGrafica: TarjetaGrafica | null) => void;
    fuenteAlimentacionGuardada?: FuenteAlimentacion | null;
    guardarFuenteAlimentacion?: (fuenteAlimentacion: FuenteAlimentacion | null) => void;
    torreGuardada?: Torre | null;
    guardarTorre?: (fuenteAlimentacion: Torre | null) => void;
}
