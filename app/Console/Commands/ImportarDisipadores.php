<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Disipador;
use League\Csv\Reader; // Uso de la librería League CSV

class ImportarDisipadores extends Command
{
    protected $signature = 'importar:Disipadores {archivo}'; // Comando y argumento
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
            Disipador::create([
                'nombre' => $fila['Nombre'],
                'marca' => $fila['Marca'],
                'socket' => $fila['Socket'],
                'refrigeracion_liquida' => $fila['Refrigeracion_liquida'],
                'consumo' => $fila['Consumo'],
                'precio' => $fila['Precio'],
            ]);
        }

        $this->info('Disipadores importados con éxito.');
    }
}

