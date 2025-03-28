<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserLocationController extends Controller
{
    /**
     * Display a listing of locations created by the logged-in user.
     */
    public function index()
    {
        $locations = Location::where('user_id', auth()->id())->get();

        return Inertia::render('User/Locations/Index', [
            'locations' => $locations,
        ]);
    }

    /**
     * Show the form for creating a new location.
     */
    public function create()
    {
        $categories = [
            "Nature", "Cultural Heritage", "Amusement Parks", "Beaches", 
            "Mountain & Hills", "Shopping", "Urban Landmarks", 
            "Historic Sites", "Religious Sites"
        ];

        return Inertia::render('User/Locations/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created location in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'category' => 'required|string',
            'address' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        Location::create([
            'name' => $request->name,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'category' => $request->category,
            'address' => $request->address,
            'image_url' => $request->image_url,
            'status' => 'pending', // Default status for user submissions
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('user.locations.index')->with('success', 'Location added successfully and is pending approval.');
    }

    /**
     * Show the form for editing the specified location.
     */
    public function edit($id)
    {
        $location = Location::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $categories = [
            "Nature", "Cultural Heritage", "Amusement Parks", "Beaches", 
            "Mountain & Hills", "Shopping", "Urban Landmarks", 
            "Historic Sites", "Religious Sites"
        ];

        return Inertia::render('User/Locations/Edit', [
            'location' => $location,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified location in storage.
     */
    public function update(Request $request, $id)
    {
        $location = Location::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'category' => 'required|string',
            'address' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        $location->update($request->all());

        return redirect()->route('user.locations.index')->with('success', 'Location updated successfully.');
    }

    /**
     * Remove the specified location from storage.
     */
    public function destroy($id)
    {
        $location = Location::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $location->delete();

        return redirect()->route('user.locations.index')->with('success', 'Location deleted successfully.');
    }
}
