<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Componente extends Model
{
    protected $fillable = [
        'tipo',
        'numero_pieza',
        'marca',
        'modelo',
        'rango',
        'benchmark',
        'muestras',
        'url',
        'precio'
    ];
}
