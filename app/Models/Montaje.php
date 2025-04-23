<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use HasFactory;

class Montaje extends Model
{

    protected $fillable = [
        'user_id',
        'nombre',
        'datos',
    ];

    protected $casts = [
        'datos' => 'array', // para que Laravel convierta el JSON a array automáticamente
    ];

    public function user()
    {
        return $this->belongsTo(User::class); // Indica que un montaje pertenece a un usuario
    }
}
