import { ReactNode } from 'react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    titulo: string;
    href: string;
    activo?: boolean;
    componente?: any;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: ReactNode | null;
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

export interface Procesador {
    id: string;
    nombre: string;
    marca: string;
    socket: string;
    graficos_integrados: string;
    disipador_incluido: string;
    frecuencia_base: number;
    frecuencia_turbo: number;
    nucleos: number;
    hilos: number;
    cache: number;
    disipador_incluido: string;
    passmark: number;
    consumo: number;
    precio: number;
    created_at: Date;
    updated_at: Date;
}

export interface Disipador {
    id: string;
    nombre: string;
    marca: string;
    socket: Array;
    refrigeracion_liquida: string;
    consumo: number;
    precio: number;
    created_at: Date;
    updated_at: Date;
}

export interface PlacaBase {
    id: string;
    nombre: string;
    marca: string;
    socket: string;
    factor_forma: string;
    zocalos_ram: number;
    puertos_m2: number;
    puertos_sata: number;
    puertos_pcie: number;
    consumo: number;
    precio: number;
    created_at: Date;
    updated_at: Date;
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
    created_at: Date;
    updated_at: Date;
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
    created_at: Date;
    updated_at: Date;
}

export interface TarjetaGrafica {
    id: string;
    nombre: string;
    marca: string;
    tipo: string;
    serie: string;
    tipo_memoria: string;
    memoria: number;
    longitud: number;
    passmark: number;
    consumo: number;
    precio: number;
    created_at: Date;
    updated_at: Date;
}

export interface FuenteAlimentacion {
    id: string;
    nombre: string;
    marca: string;
    certificacion: string;
    potencia: number;
    modular: string;
    precio: number;
    created_at: Date;
    updated_at: Date;
}

export interface Torre {
    id: string;
    nombre: string;
    marca: string;
    factor_forma: string;
    soporte_RGB: string;
    longitud_maxima_gpu: number;
    refrigeracion_liquida: string;
    precio: number;
    created_at: Date;
    updated_at: Date;
}

export interface ItemArrastrableProps {
    id: string;
    nombre: string;
    icono: ReactNode;
    iconoSecundario?: ReactNode;
    textoSecundario?: string;
    precio?: number;
}

export interface MontajeLayoutProps {
    sidebar: ReactNode;
    main: ReactNode;
    breadcrums?: BreadcrumbItem[];
    progresoMontaje?: Array;
}

export interface Montaje {
    id: number;
    nombre: string;
    datos: string;
    created_at: Date;
    updated_at: Date;
}

export interface ComponentesMontaje {
    procesador: Procesador;
    placa_base: PlacaBase;
    memoria_ram: MemoriaRam;
    memoria_ram_secundaria: MemoriaRam;
    disco_duro: DiscoDuro;
    disco_duro_secundario: DiscoDuro;
    tarjeta_grafica: TarjetaGrafica;
    fuente_alimentacion: FuenteAlimentacion;
    disipador: Disipador;
    torre: Torre;
    otros?: { precio: number; potencia: number; nombre: string, tipo_montaje: string };
}

export interface EstadoMontaje {
    procesadorGuardado?: Procesador | null;
    guardarProcesador?: (procesador: Procesador | null) => void;
    placaBaseGuardada?: PlacaBase | null;
    guardarPlacaBase?: (placaBase: PlacaBase | null) => void;
    memoriaRamGuardada?: MemoriaRam | null;
    guardarMemoriaRam?: (memoriaRam: MemoriaRam | null) => void;
    memoriaRamSecundariaGuardada?: MemoriaRam | null;
    guardarMemoriaRamSecundaria?: (memoriaRam: MemoriaRam | null) => void;
    discoDuroGuardado?: DiscoDuro | null;
    guardarDiscoDuro?: (discoDuro: DiscoDuro | null) => void;
    discoDuroSecundarioGuardado?: DiscoDuro | null;
    guardarDiscoDuroSecundario?: (discoDuro: DiscoDuro | null) => void;
    tarjetaGraficaGuardada?: TarjetaGrafica | null;
    guardarTarjetaGrafica?: (tarjetaGrafica: TarjetaGrafica | null) => void;
    fuenteAlimentacionGuardada?: FuenteAlimentacion | null;
    guardarFuenteAlimentacion?: (fuenteAlimentacion: FuenteAlimentacion | null) => void;
    torreGuardada?: Torre | null;
    guardarTorre?: (torre: Torre | null) => void;
    disipadorGuardado?: Disipador | null;
    guardarDisipador?: (disipador: Disipador | null) => void;
    editarMontaje?: boolean | null;
    guardarEditarMontaje?: (editarMontaje: boolean | null) => void;
    montajeAnterior?: ComponentesMontaje | null;
    guardarMontajeAnterior?: (montajeAnterior: ComponentesMontaje | null) => void;
    componenteSaltado?: boolean | null;
    guardarComponenteSaltado?: (componenteSaltado: boolean | null) => void;
    tipoMontaje?: string | null;
    guardarTipoMontaje?: (tipoMontaje: string | null) => void;
}
