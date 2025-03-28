<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed users first to ensure foreign key constraints are respected
        $this->call([
            UserSeeder::class,
            LocationSeeder::class,
            EventSeeder::class,
        ]);
        
        // Log atau pesan sukses jika diperlukan
        $this->command->info('Database seeding completed successfully!');
    }
}
