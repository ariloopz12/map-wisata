Peta Wisata - Interactive Tourism Map

Aplikasi Peta Wisata adalah sistem informasi berbasis web yang menampilkan peta interaktif untuk membantu wisatawan menemukan lokasi wisata di Bandung. Dibangun menggunakan Laravel 10, Inertia.js, React.js, dan Leaflet.js.

✨ Fitur Utama

Peta Interaktif: Menampilkan lokasi wisata dengan marker kategori.

Autentikasi & Role-Based Access:

Role 1: CRUD pengguna & lokasi wisata, menyetujui/tolak lokasi.

Role 2: Menambahkan lokasi wisata (pending approval).

Review & Rating untuk lokasi wisata.

Pencarian & Filter lokasi wisata.

Manajemen Media: Upload gambar lokasi wisata.

Notifikasi: Pemberitahuan status lokasi wisata.

Statistik Admin: Melihat jumlah lokasi, pengguna, dan rating.

🚀 Instalasi

Clone repository:

git clone https://github.com/username/peta-wisata.git
cd peta-wisata

Install dependensi backend & frontend:

composer install
npm install

Buat file .env dan konfigurasi database:

cp .env.example .env
php artisan key:generate

Migrasi database & seeder data awal:

php artisan migrate --seed

Jalankan server backend:

php artisan serve

Jalankan server frontend:

npm run dev

📦 Dependensi yang Digunakan

Backend: Laravel 10, Inertia.js

Frontend: React.js, TailwindCSS

Peta: Leaflet.js

Database: MySQL

📌 API Endpoints (Contoh)

GET /api/locations → Ambil semua lokasi wisata.

POST /api/locations → Tambah lokasi wisata (Role 2, pending).

PUT /api/locations/{id} → Edit lokasi wisata (Role 1).

DELETE /api/locations/{id} → Hapus lokasi wisata (Role 1).

🔑 Akun Default

Admin: admin@example.com | password

User: user@example.com | password

🤝 Kontribusi

Pull request selalu diterima! Pastikan untuk membaca CONTRIBUTING.md.

📄 Lisensi

Aplikasi ini dirilis di bawah MIT License.
