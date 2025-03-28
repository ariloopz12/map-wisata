<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Mengambil data lokasi wisata.
     */
    public function index()
    {
        // Mengambil semua lokasi yang sudah disetujui beserta rating rata-rata
        $locations = Location::select('id', 'name', 'description', 'latitude', 'longitude', 'image_url', 'average_rating')
                            ->where('status', 'approved')
                            ->get();

        return response()->json($locations);
    }
}
