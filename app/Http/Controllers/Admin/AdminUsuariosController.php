<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class AdminUsuariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filas = $request->input('mostrar_filas', 15);
    
        return Inertia::render('admin/usuarios/tabla-usuarios', [
            'usuarios' => User::latest()->paginate($filas)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/usuarios/añadir-usuario');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validamos pero no usamos la variable $validar
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:usuarios,email'],
            'password' => ['required', 'string', 'min:8'],
            'es_admin' => ['nullable', 'in:Si'],
        ]);
    
        // Creamos el usuario a mano
        User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'es_admin' => $request->input('es_admin') ?? null,
        ]);
    
        return to_route('admin.usuarios')->with('success', 'Usuario creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        return inertia('admin/usuarios/editar-usuario', [
            'usuario' => User::findOrFail($id) // busca el usuario por su id o lanza 404,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:usuarios,email,' . $id],
            'password' => ['nullable', 'string', 'min:8'],
            'es_admin' => ['nullable', 'in:Si'],
        ]);
    
        $user = User::findOrFail($id);
    
        // Si la contraseña no está vacía, la actualizamos
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        
        if ($request->input('password')) {
            $user->password = Hash::make($request->input('password'));
        }
    
        $user->es_admin = $request->input('es_admin') ?? null;
    
        $user->save();
    
        return to_route('admin.usuarios')->with('success', 'Usuario actualizado correctamente.');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $disco = User::findOrFail($id);
        $disco->delete();

        return redirect()->route('admin.usuarios')->with('success', 'Usuario eliminado correctamente');
    }
}
