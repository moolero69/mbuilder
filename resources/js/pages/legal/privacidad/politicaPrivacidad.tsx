import Footer from '@/components/footer-principal';
import Header from '@/components/header-principal';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function PoliticaPrivacidad() {
    return (
        <>
            <Head title="Política de Privacidad" />
            <AppLayout>
                <Header />
                <main className='w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700'>
                    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
                        <h1 className="text-4xl font-bold mb-6">Política de Privacidad y Tratamiento de Datos</h1>

                        <p className="mb-4">
                            En <strong>mbuilder</strong>, valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, almacenamos y tratamos tus datos personales al usar nuestros servicios.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Responsable del tratamiento</h2>
                        <p className="mb-4">
                            El responsable del tratamiento de los datos es <strong>mbuilder</strong>. Puedes contactar con nosotros en cualquier momento a través del correo electrónico: <strong>contacto@mbuilder.com</strong>
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Datos que recopilamos</h2>
                        <ul className="list-disc list-inside mb-4 space-y-2">
                            <li>Nombre y apellidos</li>
                            <li>Correo electrónico</li>
                            <li>Datos de acceso (usuario y contraseña)</li>
                            <li>Preferencias y configuraciones de montaje</li>
                            <li>Dirección IP y datos técnicos del dispositivo</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Finalidad del tratamiento</h2>
                        <p className="mb-4">
                            Utilizamos tus datos para los siguientes fines:
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-2">
                            <li>Gestionar tu cuenta de usuario</li>
                            <li>Ofrecerte una experiencia personalizada en la plataforma</li>
                            <li>Mejorar nuestros servicios mediante estadísticas y analíticas</li>
                            <li>Garantizar la seguridad de tu cuenta y del sistema</li>
                        </ul>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Seguridad de tus datos</h2>
                        <p className="mb-4">
                            Aplicamos medidas de seguridad técnicas y organizativas para proteger tus datos. En particular, <strong>las contraseñas se almacenan siempre encriptadas utilizando algoritmos de cifrado robustos</strong>. Nunca guardamos contraseñas en texto plano ni compartimos tus credenciales con terceros.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Base legal del tratamiento</h2>
                        <p className="mb-4">
                            El tratamiento de tus datos se basa en tu consentimiento explícito, en el cumplimiento de obligaciones legales y en la ejecución del contrato entre tú y mbuilder para proporcionarte nuestros servicios.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Derechos del usuario</h2>
                        <p className="mb-4">
                            Tienes derecho a acceder, rectificar o suprimir tus datos personales, así como a limitar u oponerte a su tratamiento. Puedes ejercer estos derechos escribiéndonos a <strong>contacto@mbuilder.com</strong>
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Conservación de los datos</h2>
                        <p className="mb-4">
                            Conservamos tus datos durante el tiempo necesario para cumplir con las finalidades indicadas y con las exigencias legales aplicables. Si eliminas tu cuenta, los datos asociados serán eliminados o anonimizados de forma segura.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-2">Modificaciones de esta política</h2>
                        <p className="mb-4">
                            Podemos modificar esta política para adaptarla a futuras normativas o cambios en el servicio. Te notificaremos si hay cambios relevantes que afecten a tus derechos.
                        </p>

                        <p className="mt-8 italic text-sm">
                            Última actualización: 21 de mayo de 2025
                        </p>
                    </div>
                </main>
                <Footer />
            </AppLayout>
        </>
    );
}
