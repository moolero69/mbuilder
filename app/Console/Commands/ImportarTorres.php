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
            // Diccionario de marcas y enlaces de imagen
            $imagenesMarcas = [
                'Aerocool' => 'https://aerocool.io/wp-content/uploads/2019/02/Tor-Product-Photo-Gallery-9-1042x589.png',
                'be quiet!' => 'https://www.bequiet.com/be-quiet.net/templates/gs/_/img/hero-shot.png',
                'Cooler Master' => 'https://media.lifeinformatica.com/cdn-cgi/image/sharpen=0.5,f=auto/contents/Life/COOLER_MASTER-MB520-KGNN-S00-RZOCOL027/imgs/MB520-KGNN-S00-01.png',
                'Corsair' => 'https://help.corsair.com/hc/article_attachments/29492507458701',
                'DeepCool' => 'https://cdn.deepcool.com/public/ProductGallery/DEEPCOOL/Cases/MATREXX_50_ADD-RGB_4F/Design/04_06.png',
                'Fractal Design' => 'https://www.scan.co.uk/images/infopages/fractal_case/torrent/black/design.png',
                'Lian Li' => 'https://lian-li.com/wp-content/uploads/2024/10/O11VP_000a.webp',
                'Mars Gaming' => 'https://es.marsgaming.eu/uploads/_thumnails/mcprow_960x960.png',
                'Nfortec' => 'https://www.nfortec.com/1537-large_default/surtur-black-reacondicionado.jpg',
                'Nox' => 'https://api.nox-xtreme.com/thumbnails/product_gallery_image/uploads/product/gallery/images/58y3gbsm8b-coolbay_sx_blue_main.png',
                'NZXT' => 'https://www.abctic.com/137839-large_default/nzxt-cm-h71ew-02-carcasa-de-ordenador-midi-tower-blanco.jpg',
                'Phanteks' => 'https://phanteks.com/wp-content/uploads/2024/04/01_XT-PRO-ULTRA_Black-600x600.webp',
                'Sharkoon' => 'https://cdn-reichelt.de/resize/600%2F-/web/xxl_ws/E910%2FSHARKOON_TG4_RGB_01.png',
                'Thermaltake' => 'https://es.thermaltake.com/pub/media/wysiwyg/key3/db/products/case/divider_300_tg/pic5_1.png',
            ];

            // Obtener la marca y la imagen correspondiente
            $marca = trim($fila['Marca']);
            $imagen = $imagenesMarcas[$marca] ?? 'https://png.pngtree.com/png-clipart/20230731/ourmid/pngtree-vibrant-pc-case-showcase-png-image_8874922.png'; // Enlace por defecto si no está la marca

            // Crear torre
            Torre::create([
                'nombre' => $fila['Nombre'],
                'marca' => $marca,
                'factor_forma' => $fila['Factor Forma'],
                'soporte_RGB' => $fila['Soporte RGB'],
                'longitud_maxima_gpu' => $fila['Longitud GPU'],
                'refrigeracion_liquida' => $fila['Refrigeracion Liquida'],
                'precio' => $fila['Precio'],
                'link_imagen' => $imagen,
            ]);
        }


        $this->info('Torres importadas con éxito.');
    }
}
