import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Head } from '@inertiajs/react';

const GeneradorQR: React.FC = () => {
    const [url, setUrl] = useState('');
    const [mostrarQR, setMostrarQR] = useState(false);

    const generarQR = () => {
        if (url.trim() !== '') {
            setMostrarQR(true);
        } else {
            setMostrarQR(false);
        }
    };

    return (
        <>
            <Head title='Generar codigo QR' />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
                <h1 className="text-3xl font-bold mb-6">Generador de Código QR</h1>
                <input
                    type="text"
                    placeholder="Introduce la URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full max-w-md p-3 mb-4 rounded border border-gray-700 bg-gray-800 text-white"
                />
                <button
                    onClick={generarQR}
                    className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
                >
                    Generar QR
                </button>

                {mostrarQR && (
                    <div className="p-4 bg-white rounded shadow-md">
                        <QRCodeCanvas value={url} size={200} />
                    </div>
                )}
            </div>
        </>
    );
};

export default GeneradorQR;
