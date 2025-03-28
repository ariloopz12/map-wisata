<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminEventController extends Controller
{
    /**
     * Display a listing of the events.
     */
    public function index()
    {
        $events = Event::with('location')->get(); // Ambil event beserta lokasi terkait
        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create()
    {
        $locations = Location::all(); // Ambil semua lokasi untuk dropdown
        return Inertia::render('Admin/Events/Create', [
            'locations' => $locations,
        ]);
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before:end_date',
            'end_date' => 'required|date|after:start_date',
            'location_id' => 'required|exists:locations,id',
            'image_url' => 'nullable|url',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        Event::create($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event successfully created.');
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(Event $event)
    {
        $locations = Location::all(); // Ambil semua lokasi untuk dropdown
        return Inertia::render('Admin/Events/Edit', [
            'event' => $event,
            'locations' => $locations,
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date|before:end_date',
            'end_date' => 'required|date|after:start_date',
            'location_id' => 'required|exists:locations,id',
            'image_url' => 'nullable|url',
            'status' => 'required|in:pending,approved,rejected',
        ]);

        $event->update($validated);

        return redirect()->route('admin.events.index')
            ->with('success', 'Event successfully updated.');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()->route('admin.events.index')
            ->with('success', 'Event successfully deleted.');
    }
}
