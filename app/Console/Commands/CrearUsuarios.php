<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Console\Command;

class CrearUsuarios extends Command
{
    protected $signature = 'crear:Usuarios';
    protected $description = 'Comando para crear un usuario admin y otro estándar';

    
    public function handle()
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@mbuilder.es',
            'email_verified_at' => '2023-07-18 14:37:25',
            'password' => Hash::make('adminlaravel'),
            'es_admin' => 'Si',
            'es_pro' => 'Si'
        ]);

        User::create([
            'name' => 'usuario',
            'email' => 'usuario@mbuilder.es',
            'email_verified_at' => '2023-07-18 14:37:25',
            'password' => Hash::make('usuariolaravel'),
        ]);

        $this->info('Usuarios creados con éxito.');
    }
}
