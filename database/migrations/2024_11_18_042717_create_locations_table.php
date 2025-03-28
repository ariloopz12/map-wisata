<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            $table->enum('status', ['pending', 'approved'])->default('pending');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('category')->nullable(); // Tambahkan kolom kategori
            $table->decimal('rating', 3, 2)->default(0); // Tambahkan kolom rating (skala 1-5)
            $table->integer('reviews_count')->default(0); // Tambahkan jumlah ulasan
            $table->string('address')->nullable(); // Tambahkan alamat lokasi wisata
            $table->string('image_url')->nullable(); // Tambahkan URL gambar lokasi wisata
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
