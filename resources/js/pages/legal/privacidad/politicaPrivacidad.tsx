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
                <main className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
                    <div className="mx-auto max-w-4xl px-6 py-12 text-white">
                        <h1 className="mb-6 text-4xl font-bold">Política de Privacidad y Tratamiento de Datos</h1>

                        <p className="mb-4">
                            En <strong>mbuilder</strong>, valoramos y respetamos tu privacidad. Esta política explica cómo recopilamos, almacenamos y
                            tratamos tus datos personales al usar nuestros servicios.
                        </p>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Responsable del tratamiento</h2>
                        <p className="mb-4">
                            El responsable del tratamiento de los datos es <strong>mbuilder</strong>. Puedes contactar con nosotros en cualquier
                            momento a través del correo electrónico: <strong>contacto@mbuilder.com</strong>
                        </p>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Datos que recopilamos</h2>
                        <ul className="mb-4 list-inside list-disc space-y-2">
                            <li>Nombre y apellidos</li>
                            <li>Correo electrónico</li>
                            <li>Datos de acceso (usuario y contraseña)</li>
                            <li>Preferencias y configuraciones de montaje</li>
                            <li>Dirección IP y datos técnicos del dispositivo</li>
                        </ul>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Finalidad del tratamiento</h2>
                        <p className="mb-4">Utilizamos tus datos para los siguientes fines:</p>
                        <ul className="mb-4 list-inside list-disc space-y-2">
                            <li>Gestionar tu cuenta de usuario</li>
                            <li>Ofrecerte una experiencia personalizada en la plataforma</li>
                            <li>Mejorar nuestros servicios mediante estadísticas y analíticas</li>
                            <li>Garantizar la seguridad de tu cuenta y del sistema</li>
                        </ul>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Seguridad de tus datos</h2>
                        <p className="mb-4">
                            Aplicamos medidas de seguridad técnicas y organizativas para proteger tus datos. En particular,{' '}
                            <strong>las contraseñas se almacenan siempre encriptadas utilizando algoritmos de cifrado robustos</strong>. Nunca
                            guardamos contraseñas en texto plano ni compartimos tus credenciales con terceros.
                        </p>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Base legal del tratamiento</h2>
                        <p className="mb-4">
                            El tratamiento de tus datos se basa en tu consentimiento explícito, en el cumplimiento de obligaciones legales y en la
                            ejecución del contrato entre tú y mbuilder para proporcionarte nuestros servicios.
                        </p>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Derechos del usuario</h2>
                        <p className="mb-4">
                            Tienes derecho a acceder, rectificar o suprimir tus datos personales, así como a limitar u oponerte a su tratamiento.
                            Puedes ejercer estos derechos escribiéndonos a <strong>contacto@mbuilder.com</strong>
                        </p>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Conservación de los datos</h2>
                        <p className="mb-4">
                            Conservamos tus datos durante el tiempo necesario para cumplir con las finalidades indicadas y con las exigencias legales
                            aplicables. Si eliminas tu cuenta, los datos asociados serán eliminados o anonimizados de forma segura.
                        </p>

                        <h2 className="mt-8 mb-2 text-2xl font-semibold">Modificaciones de esta política</h2>
                        <p className="mb-4">
                            Podemos modificar esta política para adaptarla a futuras normativas o cambios en el servicio. Te notificaremos si hay
                            cambios relevantes que afecten a tus derechos.
                        </p>

                        <p className="mt-8 text-sm italic">Última actualización: 21 de mayo de 2025</p>
                    </div>
                </main>
                <Footer />
            </AppLayout>
        </>
    );
}
