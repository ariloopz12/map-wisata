<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;

class HalamanEventController extends Controller
{
    /**
     * Display a listing of approved events.
     */
    public function index()
    {
        $events = Event::where('status', 'approved')->get();

        return Inertia::render('Event', [
            'events' => $events,
        ]);
        
    }

    /**
     * Display the details of a specific event.
     */
    public function show($id)
    {
        $event = Event::with('location')->findOrFail($id);

        return inertia::render('Sevent', [
            'event' => $event,
        ]);
    }
}
