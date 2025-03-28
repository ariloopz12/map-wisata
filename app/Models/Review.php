<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'location_id',
        'comment',
        'rating',
    ];

    // Relasi ke User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Lokasi Wisata
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public static function boot()
    {
        parent::boot();

        static::created(function ($review) {
            self::updateLocationRating($review->location);
        });

        static::deleted(function ($review) {
            self::updateLocationRating($review->location);
        });
    }

    private static function updateLocationRating($location)
    {
        $average = $location->reviews()->avg('rating') ?? 0;
        $location->update(['average_rating' => $average]);
    }

}
