<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Data contoh event
        $events = [
            [
                'name' => 'Festival Kuliner Nusantara',
                'description' => 'Nikmati berbagai makanan khas Indonesia di Festival Kuliner Nusantara.',
                'start_date' => '2024-12-20 10:00:00',
                'end_date' => '2024-12-20 18:00:00',
                'location_id' => 1,
                'image_url' => 'https://picsum.photos/200/300?random=3',
                'status' => 'approved',
                'user_id' => $userIds[0] ?? null, // Gunakan ID pengguna pertama atau null jika kosong
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Konser Musik Alam',
                'description' => 'Saksikan konser musik dengan latar pemandangan alam yang menakjubkan.',
                'start_date' => '2024-12-25 19:00:00',
                'end_date' => '2024-12-25 23:00:00',
                'location_id' => 2,
                'image_url' => 'https://picsum.photos/200/300?random=1',
                'status' => 'pending',
                'user_id' => $userIds[1] ?? null, // Gunakan ID pengguna kedua atau null jika kosong
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Pameran Seni Lokal',
                'description' => 'Jelajahi karya seni lokal dari seniman-seniman berbakat.',
                'start_date' => '2025-01-10 09:00:00',
                'end_date' => '2025-01-10 17:00:00',
                'location_id' => 3,
                'image_url' => 'https://picsum.photos/200/300?random=2',
                'status' => 'rejected',
                'user_id' => $userIds[0] ?? null, // Gunakan ID pengguna pertama atau null jika kosong
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];
        

        // Insert data ke tabel events
        DB::table('events')->insert($events);
    }
}
