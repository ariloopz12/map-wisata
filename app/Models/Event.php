<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /**
     * Kolom-kolom yang dapat diisi.
     */
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'location_id',
        'user_id',
        'image_url',
        'status',
    ];

    /**
     * Relasi ke model User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke model Location.
     */
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
