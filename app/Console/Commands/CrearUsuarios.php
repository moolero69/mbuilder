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
            'email' => 'admin@mbuilder.com',
            'password' => Hash::make('adminlaravel'),
            'es_admin' => 'Si',
        ]);

        User::create([
            'name' => 'usuario',
            'email' => 'usuario@mbuilder.com',
            'password' => Hash::make('usuariolaravel'),
        ]);

        $this->info('Usuarios creados con éxito.');
    }
}
