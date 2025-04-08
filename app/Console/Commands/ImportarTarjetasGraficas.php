<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\TarjetaGrafica;
use League\Csv\Reader; // Uso de la librería League CSV

class ImportarTarjetasGraficas extends Command
{
    protected $signature = 'importar:TarjetasGraficas {archivo}'; // Comando y argumento
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
            TarjetaGrafica::create([
                'nombre' => $fila['Nombre'],
                'marca' => $fila['Marca'],
                'tipo' => $fila['Tipo'],
                'serie' => $fila['Serie'],
                'tipo_memoria' => $fila['Tipo de Memoria'],
                'memoria' => $fila['Memoria'],
                'passmark' => $fila['Passmark'],
                'consumo' => $fila['Consumo'],
                'precio' => $fila['Precio'],
            ]);
        }

        $this->info('Importación completada con éxito.');
    }
}