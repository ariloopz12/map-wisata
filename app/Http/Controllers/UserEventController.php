<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserEventController extends Controller
{
    /**
     * Menampilkan daftar event yang dimiliki oleh pengguna.
     */
    public function index()
    {
        $events = Event::where('user_id', Auth::id())
            ->with('location')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('User/Event/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Menampilkan formulir untuk membuat event baru.
     */
    public function create()
    {
        $locations = Location::all();

        return Inertia::render('User/Event/Create', [
            'locations' => $locations,
        ]);
    }

    /**
     * Menyimpan event baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location_id' => 'required|exists:locations,id',
            'image_url' => 'nullable|url',
        ]);

        Event::create([
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'location_id' => $request->location_id,
            'user_id' => Auth::id(),
            'image_url' => $request->image_url,
            'status' => 'pending',
        ]);

        return redirect()->route('user.events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Menampilkan formulir untuk mengedit event.
     */
    public function edit(Event $event)
    {
        // $this->authorize('update', $event); // Pastikan pengguna hanya dapat mengedit event miliknya

        $locations = Location::all();

        return Inertia::render('User/Event/Edit', [
            'event' => $event,
            'locations' => $locations,
        ]);
    }

    /**
     * Memperbarui event di database.
     */
    public function update(Request $request, Event $event)
    {
        // $this->authorize('update', $event);

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location_id' => 'required|exists:locations,id',
            'image_url' => 'nullable|url',
        ]);

        $event->update($request->all());

        return redirect()->route('user.events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Menghapus event dari database.
     */
    public function destroy(Event $event)
    {
        // $this->authorize('delete', $event);

        $event->delete();

        return redirect()->route('user.events.index')->with('success', 'Event deleted successfully.');
    }
}
