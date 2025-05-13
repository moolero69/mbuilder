<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkCompartido extends Model
{
    protected $table = 'links_compartidos'; // Nombre de la tabla

    protected $fillable = ['hash', 'datos_montaje'];

    protected $casts = [
        'datos_montaje' => 'array',
    ];
}

