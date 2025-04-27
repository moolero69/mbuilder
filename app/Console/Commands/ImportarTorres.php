<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Torre;
use League\Csv\Reader; // Uso de la librería League CSV

class ImportarTorres extends Command
{
    protected $signature = 'importar:Torres {archivo}'; // Comando y argumento
    protected $description = 'Importa componentes desde un archivo CSV'; // Descripcion del comando

    public function handle()
    {
        $archivo = $this->argument('archivo'); // Coger el archivo pasado por parámetro en el comando

        // Comprobar si existe el archivo CSV
        if (!file_exists($archivo)) {
            $this->error("El archivo no existe: $archivo");
            return;
        }

        $csv = Reader::createFromPath($archivo, 'r'); // leer el archivo con permiso de lectura
        $csv->setHeaderOffset(0); // Excluir la primera fila ya que es la cabecera

        // Crear el componente en la BBDD con cada campo de la fila
        foreach ($csv as $fila) {
            Torre::create([
                'nombre' => $fila['Nombre'],
                'marca' => $fila['Marca'],
                'factor_forma' => $fila['Factor Forma'],
                'soporte_RGB' => $fila['Soporte RGB'],
                'longitud_maxima_gpu' => $fila['Longitud GPU'],
                'precio' => $fila['Precio'],
            ]);
        }

        $this->info('Importación completada con éxito.');
    }
}
