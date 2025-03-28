<?php
namespace App\Http\Controllers;

use App\Models\Location;
use Inertia\Inertia;

class HalamanWisataController extends Controller
{
    public function index()
    {
        $locations = Location::select('id', 'name', 'description', 'latitude', 'longitude', 'image_url', 'category', 'address', 'rating')
            ->where('status', 'approved')
            ->get();

        return Inertia::render('Wisata', [
            'locations' => $locations,
        ]);
    }

    public function show($id)
    {
        $location = Location::findOrFail($id);

        return Inertia::render('Detail', [
            'location' => $location,
        ]);
    }
}
