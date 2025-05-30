<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PlacaBase;
use League\Csv\Reader; // Uso de la librería League CSV

class ImportarPlacasBase extends Command
{
    protected $signature = 'importar:PlacasBase {archivo}'; // Comando y argumento
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
            PlacaBase::create([
                'nombre' => $fila['Nombre'],
                'marca' => $fila['Marca'],
                'socket' => $fila['Socket'],
                'factor_forma' => $fila['Factor de Forma'],
                'zocalos_ram' => $fila['Zocalos RAM'],
                'puertos_m2' => $fila['Puertos M2'],
                'puertos_sata' => $fila['Puertos SATA'],
                'puertos_pcie' => $fila['Puertos PCIe'],
                'consumo' => $fila['Consumo'],
                'precio' => $fila['Precio'],
            ]);
        }

        $this->info('Placas base importadas con éxito.');
    }
}
