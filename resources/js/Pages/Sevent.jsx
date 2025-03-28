import React from "react";
import { Link } from "@inertiajs/react";

const Sevent = ({ event }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="text-xl font-bold">Nama Aplikasi</div>
                    <div className="flex space-x-4">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Home
                        </Link>
                        <Link
                            href="/wisata"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Wisata
                        </Link>
                        <Link
                            href="/event"
                            className="text-gray-700 hover:text-blue-500"
                        >
                            Event
                        </Link>
                    </div>
                    <Link href="/login">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Login
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Konten Halaman */}
            <main className="container mx-auto px-4 py-8 flex-1">
                {/* Judul Halaman */}
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {event.name}
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Gambar Event */}
                    <div className="flex-shrink-0">
                        <img
                            src={event.image_url || "/placeholder.jpg"}
                            alt={event.name}
                            className="w-full max-w-md h-auto object-cover rounded shadow-md"
                        />
                    </div>

                    {/* Detail Event */}
                    <div className="flex-1 flex flex-col">
                        {/* Deskripsi */}
                        <h2 className="text-2xl font-semibold mb-4">
                            Deskripsi
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {event.description}
                        </p>

                        {/* Lokasi */}
                        <h2 className="text-2xl font-semibold mb-4">Lokasi</h2>
                        <p className="text-gray-700">
                            <strong>Nama Lokasi:</strong>{" "}
                            {event.location?.name || "Tidak tersedia"}
                        </p>
                        <p className="text-gray-700">
                            <strong>Alamat:</strong>{" "}
                            {event.location?.address || "Tidak tersedia"}
                        </p>

                        {/* Tanggal */}
                        <h2 className="text-2xl font-semibold mt-6 mb-4">
                            Tanggal
                        </h2>
                        <p className="text-gray-700">
                            <strong>Mulai:</strong>{" "}
                            {new Date(event.start_date).toLocaleDateString()}{" "}
                            <strong>Selesai:</strong>{" "}
                            {new Date(event.end_date).toLocaleDateString()}
                        </p>

                        {/* Tombol Aksi */}
                        <div className="mt-8">
                            <Link
                                href="/event"
                                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                            >
                                Kembali ke Daftar Event
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Sevent;
