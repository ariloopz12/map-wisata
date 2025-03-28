<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminLocationController extends Controller
{
    // Display a listing of the locations
    public function index()
    {
        // Mengambil semua data lokasi wisata
        $locations = Location::all();
        return Inertia::render('Admin/Locations/Index', [
            'locations' => $locations
        ]);
    }

    // Show the form for creating a new location
    public function create()
    {
        return Inertia::render('Admin/Locations/Create');
    }

    // Store a newly created location in storage
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|numeric|between:-90,90', // Validasi latitude
            'longitude' => 'required|numeric|between:-180,180', // Validasi longitude
            'status' => 'required|in:pending,approved',
            'category' => 'required|string|max:255', // Validasi kategori
            'rating' => 'nullable|numeric|min:0|max:5', // Validasi rating opsional
            'reviews_count' => 'nullable|integer|min:0', // Validasi jumlah ulasan opsional
            'address' => 'nullable|string|max:255', // Validasi alamat opsional
            'image_url' => 'required|url', // URL gambar wajib
        ]);

        // Tambahkan user_id dari pengguna yang sedang login
        $data = $request->all();
        $data['user_id'] = auth()->id(); // ID pengguna yang sedang login
        $data['rating'] = $request->input('rating', 0); // Default rating 0 jika tidak diisi
        $data['reviews_count'] = $request->input('reviews_count', 0); // Default reviews_count 0 jika tidak diisi

        Location::create($data);

        return redirect()->route('admin.locations.index')
                        ->with('success', 'Location created successfully.');
    }

    // Show the form for editing the specified location
    public function edit($id)
    {
        // Ambil data lokasi berdasarkan ID
        $location = Location::findOrFail($id);

        // Kategori tersedia
        $categories = [
            "Nature", "Cultural Heritage", "Amusement Parks", "Beaches", 
            "Mountain & Hills", "Shopping", "Urban Landmarks", 
            "Historic Sites", "Religious Sites"
        ];

        return Inertia::render('Admin/Locations/Edit', [
            'location' => $location,
            'categories' => $categories // Pastikan kategori dikirim ke view
        ]);
    }

    // Update the specified location in storage
    public function update(Request $request, Location $location)
    {
        // Validasi input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'status' => 'required|in:pending,approved',
            'image_url' => 'nullable|url',
            'category' => 'nullable|string', // Validasi kategori opsional
            'address' => 'nullable|string', // Validasi alamat opsional
        ]);

        // Update data lokasi wisata
        $location->update($validatedData);

        return redirect()->route('admin.locations.index')->with('success', 'Location updated successfully.');
    }


    // Remove the specified location from storage
    public function destroy($id)
    {
        // Hapus lokasi
        $location = Location::findOrFail($id);
        $location->delete();

        return redirect()->route('admin.locations.index')
                         ->with('success', 'Location deleted successfully.');
    }
}
