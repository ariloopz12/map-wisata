<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->unsignedBigInteger('user_id')->nullable(); // Kolom user_id sebagai Foreign Key (nullable jika tidak wajib)
            $table->string('name'); // Nama Event
            $table->text('description'); // Deskripsi Event
            $table->datetime('start_date'); // Tanggal Mulai
            $table->datetime('end_date'); // Tanggal Selesai
            $table->unsignedBigInteger('location_id')->nullable(); // Foreign Key ke Tabel Locations (nullable jika tidak wajib)
            $table->string('image_url')->nullable(); // URL Gambar Event (nullable untuk fleksibilitas)
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending'); // Status Event dengan default 'pending'
            $table->timestamps(); // Kolom created_at & updated_at
        
            // Definisi Foreign Key dengan Cascading
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null'); // Jika user dihapus, set user_id ke null
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('set null'); // Jika lokasi dihapus, set location_id ke null
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['user_id']); // Hapus Foreign Key user_id
            $table->dropForeign(['location_id']); // Hapus Foreign Key location_id
        });

        Schema::dropIfExists('events');
    }
}
