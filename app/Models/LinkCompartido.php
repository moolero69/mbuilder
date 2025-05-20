<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LinkCompartido extends Model
{
    protected $table = 'links_compartidos'; // Nombre de la tabla

    protected $fillable = ['hash', 'datos_montaje','montaje_id'];

    protected $casts = [
        'datos_montaje' => 'array',
    ];

    public function montaje()
    {
        return $this->belongsTo(Montaje::class);
    }
}
