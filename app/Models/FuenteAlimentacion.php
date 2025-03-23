<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FuenteAlimentacion extends Model
{
    protected $table = 'fuentes_alimentacion'; // Nombre de la tabla
    public $incrementing = false; // Desactivar auto-incremento
    protected $keyType = 'string'; // Clave primaria como string
    protected $primaryKey = 'id'; // Especificamos la clave primaria
    protected $fillable = [
        "id",
        "nombre",
        "marca",
        "certificacion",
        "potencia",
        "modular",
        "precio"
    ];

    protected static function boot()
    {
        // Heredamos el método boot del padre (sería el inicio de la creacion)
        parent::boot();

        // Este es el evento que se ejecuta antes de insertar un nuevo registro
        static::creating(function ($producto) {
            $prefijo = 'FA'; // Prefijo del ID de cada componente

            // Buscar el último ID generado con este prefijo
            $ultimo = DB::table('fuentes_alimentacion')
                ->where('id', 'like', "$prefijo-%")
                ->orderByDesc('id')
                ->first();

            // Comprobar si es el primer elemento de la tabla 
            if ($ultimo) {
                $ultimoNumero = (int) substr($ultimo->id, 3); // Extraer el número cortando desde el 3er caracter
                $nuevoNumero = str_pad($ultimoNumero + 1, 4, '0', STR_PAD_LEFT); // Rellenar espacios con 0
            } else {
                $nuevoNumero = '0001';
            }

            $producto->id = "$prefijo-$nuevoNumero"; // Crear id "personalizado" cada vez que se añade un componente
        });
    }
}
