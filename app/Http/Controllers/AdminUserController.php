<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    // Display a listing of the users
    public function index()
    {
        // Mengambil semua data pengguna
        $users = User::all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    // Show the form for creating a new user
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    // Store a newly created user in storage
    public function store(Request $request)
    {
        // Validasi input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Buat pengguna baru
        User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return redirect()->route('admin.users.index')
                         ->with('success', 'User added successfully.');
    }

    // Show the form for editing the specified user
    public function edit($id)
    {
        // Mendapatkan pengguna berdasarkan ID
        $user = User::findOrFail($id);
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    // Update the specified user in storage
    public function update(Request $request, $id)
    {
        // Validasi input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($id),
            ],
            'password' => 'nullable|string|min:8|confirmed', // Password opsional
        ]);

        // Temukan pengguna berdasarkan ID
        $user = User::findOrFail($id);

        // Update data pengguna
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];

        // Jika ada password baru, maka update password
        if ($request->filled('password')) {
            $user->password = Hash::make($validatedData['password']);
        }

        $user->save();

        return redirect()->route('admin.users.index')
                         ->with('success', 'User updated successfully.');
    }

    // Remove the specified user from storage
    public function destroy($id)
    {
        // Hapus pengguna berdasarkan ID
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.users.index')
                         ->with('success', 'User deleted successfully.');
    }
}
