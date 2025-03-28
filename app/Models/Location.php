<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'latitude',
        'longitude',
        'status',
        'user_id',
        'category',
        'rating',
        'reviews_count',
        'address',
        'image_url',
        'average_rating',
    ];

    /**
     * Relasi ke tabel User.
     * Setiap lokasi wisata memiliki satu pemilik (user).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }


}
