<?php

use Inertia\Inertia;
use App\Models\Location;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\AdminEventController;
use App\Http\Controllers\HalamanEventController;
use App\Http\Controllers\UserLocationController;
use App\Http\Controllers\AdminLocationController;
use App\Http\Controllers\HalamanWisataController;


// Route untuk mendapatkan data lokasi wisata (API endpoint)
Route::get('/api/locations', function () {
    $approvedLocations = Location::where('status', 'approved')->get();
    return response()->json($approvedLocations);
});

// Halaman Home
Route::get('/', function () {
    return Inertia::render('Home');
});

// Route untuk Halaman Wisata
Route::get('/wisata', [HalamanWisataController::class, 'index'])->name('wisata.index');
Route::get('/wisata/{id}', [HalamanWisataController::class, 'show'])->name('wisata.show');

// Route untuk Halaman Event
Route::get('/event', [HalamanEventController::class, 'index'])->name('events.index');
Route::get('/event/{id}', [HalamanEventController::class, 'show'])->name('events.show');

// Route untuk Logout
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

// Route untuk Admin dengan Middleware Auth dan Admin
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Route untuk CRUD Users
    Route::resource('users', AdminUserController::class);

    // Route untuk CRUD Locations
    Route::resource('locations', AdminLocationController::class);

    // Route untuk CRUD Events
    Route::resource('events', AdminEventController::class)->except(['show']);
});

// Route untuk User dengan Middleware Auth
Route::middleware(['auth'])->prefix('user')->name('user.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('User/Dashboard');
    })->name('dashboard');

    // Route untuk CRUD Locations (User only)
    Route::resource('locations', UserLocationController::class);

    // Route untuk CRUD Events
    Route::resource('events', UserEventController::class);
});

// Route Dashboard Umum (akan redirect ke dashboard yang sesuai berdasarkan role)
Route::get('/dashboard', function () {
    if (auth()->user()->is_admin) {
        return redirect()->route('admin.dashboard');
    } else {
        return redirect()->route('user.dashboard');
    }
})->middleware(['auth', 'verified'])->name('dashboard');

// Route untuk Profile
// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// Route untuk Otentikasi (Laravel Breeze)
require __DIR__.'/auth.php';
