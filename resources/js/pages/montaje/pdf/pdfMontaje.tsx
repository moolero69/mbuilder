import { DiscoDuro, Disipador, FuenteAlimentacion, MemoriaRam, PlacaBase, Procesador, TarjetaGrafica, Torre } from '@/types';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export default function PdfMontaje({
    procesador,
    disipador,
    placaBase,
    memoriaRam,
    discoDuro,
    discoDuroSecundario,
    tarjetaGrafica,
    fuenteAlimentacion,
    torre,
    precioTotal,
    consumoTotal,
    numeroMemorias,
}: {
    procesador: Procesador;
    disipador: Disipador;
    placaBase: PlacaBase;
    memoriaRam: MemoriaRam;
    discoDuro: DiscoDuro;
    discoDuroSecundario: DiscoDuro;
    tarjetaGrafica: TarjetaGrafica;
    fuenteAlimentacion: FuenteAlimentacion;
    torre: Torre;
    precioTotal: number;
    consumoTotal: number;
    numeroMemorias: number;
}) {
    Font.register({ family: 'Orbitron', src: '/Orbitron.ttf' });

    const styles = StyleSheet.create({
        page: {
            padding: 20,
            fontSize: 12,
            fontFamily: 'Helvetica',
            backgroundColor: '#ccc',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        header: {
            fontSize: 22,
            marginBottom: 20,
            textAlign: 'center',
            fontFamily: 'Orbitron',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '350px',
            marginLeft: '20%',
        },
        titulo_principal: { fontFamily: 'Orbitron', fontSize: 30, marginBottom: 10, textAlign: 'center', fontWeight: '2000' },
        logo: { width: '75%', height: '75%', marginBottom: 10 },
        titulo: { fontFamily: 'Orbitron', fontSize: 16, marginBottom: 10, textAlign: 'center' },
        section: { marginBottom: 20 },
        zebra1: { backgroundColor: '#f0f0f0', padding: 6 },
        zebra2: { backgroundColor: '#ffffff', padding: 6 },
        label: { fontWeight: 'bold' },
        totales: {
            fontSize: 22,
            marginTop: 20,
            textAlign: 'center',
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: '25px',
        },
    });

    const renderZebraRows = (data: [string, string | number][]) =>
        data.map(([label, value], i) => (
            <View key={label} style={i % 2 === 0 ? styles.zebra1 : styles.zebra2}>
                <Text>
                    <Text style={styles.label}>{label}: </Text>
                    {value}
                </Text>
            </View>
        ));

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    {/* <Text style={styles.titulo_principal}>MBUILDER</Text> */}
                    <Image src="/img/mbuilder-gris.png" />
                    <Text>Resumen del Montaje</Text>
                </View>
                <View style={styles.page}>
                    {procesador && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Procesador</Text>
                            {renderZebraRows([
                                ['Nombre', procesador.nombre],
                                ['Marca', procesador.marca],
                                ['Socket', procesador.socket],
                                ['Gráficos Integrados', procesador.graficos_integrados],
                                ['Disipador Incluido', procesador.disipador_incluido],
                                ['Frecuencia Base', `${procesador.frecuencia_base} GHz`],
                                ['Frecuencia Turbo', `${procesador.frecuencia_turbo} GHz`],
                                ['Núcleos', procesador.nucleos],
                                ['Hilos', procesador.hilos],
                                ['Caché', `${procesador.cache} MB`],
                                ['Passmark', procesador.passmark],
                                ['Consumo', `${procesador.consumo} W`],
                                ['Precio', `${procesador.precio} €`],
                            ])}
                        </View>
                    )}

                    {disipador && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Disipador</Text>
                            {renderZebraRows([
                                ['Nombre', disipador.nombre],
                                ['Marca', disipador.marca],
                                ['Sockets', disipador.socket],
                                ['Refrigeración Líquida', disipador.refrigeracion_liquida],
                                ['Consumo', `${disipador.consumo} W`],
                                ['Precio', `${disipador.precio} €`],
                            ])}
                        </View>
                    )}

                    {placaBase && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Placa Base</Text>
                            {renderZebraRows([
                                ['Nombre', placaBase.nombre],
                                ['Marca', placaBase.marca],
                                ['Socket', placaBase.socket],
                                ['Factor Forma', placaBase.factor_forma],
                                ['Zócalos RAM', placaBase.zocalos_ram],
                                ['Puertos M.2', placaBase.puertos_m2],
                                ['Puertos SATA', placaBase.puertos_sata],
                                ['Puertos PCIe', placaBase.puertos_pcie],
                                ['Consumo', `${placaBase.consumo} W`],
                                ['Precio', `${placaBase.precio} €`],
                            ])}
                        </View>
                    )}

                    {memoriaRam && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Memoria RAM</Text>
                            {renderZebraRows([
                                ['Nombre', memoriaRam.nombre],
                                ['Marca', memoriaRam.marca],
                                [
                                    'Almacenamiento',
                                    !numeroMemorias
                                        ? `${memoriaRam.almacenamiento} GB`
                                        : `${memoriaRam.almacenamiento} GB x ${numeroMemorias} = ${memoriaRam.almacenamiento * numeroMemorias} GB`,
                                ],
                                ['Tipo', memoriaRam.tipo],
                                ['Pack', `${memoriaRam.pack} módulos`],
                                ['Frecuencia', `${memoriaRam.frecuencia} MHz`],
                                [
                                    'Consumo',
                                    !numeroMemorias
                                        ? `${memoriaRam.consumo} W`
                                        : `${memoriaRam.consumo} W x ${numeroMemorias} = ${memoriaRam.consumo * numeroMemorias} W`,
                                ],
                                [
                                    'Precio',
                                    !numeroMemorias
                                        ? `${memoriaRam.precio} €`
                                        : `${memoriaRam.precio} € x ${numeroMemorias} = ${memoriaRam.precio * numeroMemorias} €`,
                                ],
                            ])}
                        </View>
                    )}

                    {discoDuro && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Disco Duro Principal</Text>
                            {renderZebraRows([
                                ['Nombre', discoDuro.nombre],
                                ['Marca', discoDuro.marca],
                                ['Tecnología', discoDuro.tecnologia],
                                ['Almacenamiento', discoDuro.almacenamiento],
                                ['Conexión', discoDuro.conexion],
                                ['Pulgadas', discoDuro.pulgadas],
                                ['Velocidad', `${discoDuro.velocidad} RPM`],
                                ['Consumo', `${discoDuro.consumo} W`],
                                ['Precio', `${discoDuro.precio} €`],
                            ])}
                        </View>
                    )}

                    {discoDuroSecundario && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Disco Duro Secundario</Text>
                            {renderZebraRows([
                                ['Nombre', discoDuroSecundario.nombre],
                                ['Marca', discoDuroSecundario.marca],
                                ['Tecnología', discoDuroSecundario.tecnologia],
                                ['Almacenamiento', discoDuroSecundario.almacenamiento],
                                ['Conexión', discoDuroSecundario.conexion],
                                ['Pulgadas', discoDuroSecundario.pulgadas],
                                ['Velocidad', `${discoDuroSecundario.velocidad} RPM`],
                                ['Consumo', `${discoDuroSecundario.consumo} W`],
                                ['Precio', `${discoDuroSecundario.precio} €`],
                            ])}
                        </View>
                    )}

                    {tarjetaGrafica && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Tarjeta Gráfica</Text>
                            {renderZebraRows([
                                ['Nombre', tarjetaGrafica.nombre],
                                ['Marca', tarjetaGrafica.marca],
                                ['Tipo', tarjetaGrafica.tipo],
                                ['Serie', tarjetaGrafica.serie],
                                ['Tipo Memoria', tarjetaGrafica.tipo_memoria],
                                ['Memoria', `${tarjetaGrafica.memoria} GB`],
                                ['Longitud', `${tarjetaGrafica.longitud} mm`],
                                ['Passmark', tarjetaGrafica.passmark],
                                ['Consumo', `${tarjetaGrafica.consumo} W`],
                                ['Precio', `${tarjetaGrafica.precio} €`],
                            ])}
                        </View>
                    )}

                    {fuenteAlimentacion && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Fuente de Alimentación</Text>
                            {renderZebraRows([
                                ['Nombre', fuenteAlimentacion.nombre],
                                ['Marca', fuenteAlimentacion.marca],
                                ['Certificación', fuenteAlimentacion.certificacion],
                                ['Potencia', `${fuenteAlimentacion.potencia} W`],
                                ['Modular', fuenteAlimentacion.modular],
                                ['Precio', `${fuenteAlimentacion.precio} €`],
                            ])}
                        </View>
                    )}

                    {torre && (
                        <View style={styles.section}>
                            <Text style={styles.titulo}>Torre</Text>
                            {renderZebraRows([
                                ['Nombre', torre.nombre],
                                ['Marca', torre.marca],
                                ['Factor Forma', torre.factor_forma],
                                ['Soporte RGB', torre.soporte_RGB],
                                ['Longitud máxima GPU', `${torre.longitud_maxima_gpu} mm`],
                                ['Refrigeración Líquida', torre.refrigeracion_liquida],
                                ['Precio', `${torre.precio} €`],
                            ])}
                        </View>
                    )}
                </View>

                <View style={styles.totales}>
                    <Text style={{ color: '#17c70e' }}>Precio = {precioTotal}€</Text>
                    <Text style={{ color: '#a80ec7' }}>Consumo = {consumoTotal} W</Text>
                </View>
            </Page>
        </Document>
    );
}
