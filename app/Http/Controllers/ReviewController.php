<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Models\Location;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Ambil semua review berdasarkan lokasi wisata
     */
    public function index($locationId)
    {
        $reviews = Review::where('location_id', $locationId)
            ->with('user:id,name')
            ->latest()
            ->get();

        $averageRating = Review::where('location_id', $locationId)->avg('rating');
        $reviewsCount = Review::where('location_id', $locationId)->count();

        return response()->json([
            'reviews' => $reviews,
            'averageRating' => round($averageRating, 1), // Dibulatkan ke 1 desimal
            'reviewsCount' => $reviewsCount
        ]);
    }

    /**
     * Simpan review baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'location_id' => 'required|exists:locations,id',
            'comment' => 'required|string|max:500',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $review = Review::create([
            'user_id' => Auth::id(),
            'location_id' => $request->location_id,
            'comment' => $request->comment,
            'rating' => $request->rating,
        ]);

        return response()->json(['message' => 'Review berhasil ditambahkan!', 'review' => $review]);
    }

    public function destroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json(['message' => 'Review tidak ditemukan.'], 404);
        }

        // Hanya pemilik ulasan atau admin yang bisa menghapusnya
        if (Auth::id() !== $review->user_id && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Anda tidak memiliki izin untuk menghapus review ini.'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review berhasil dihapus.']);
    }

}
