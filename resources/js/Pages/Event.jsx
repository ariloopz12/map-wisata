import React, { useState } from "react";
import { Link } from "@inertiajs/react";

const Event = ({ events }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter event berdasarkan pencarian
    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <h1 className="text-3xl font-bold mt-6 mb-6 text-center">
                    Event Mendatang
                </h1>

                {/* Search */}
                <div className="mb-6 max-w-3xl mx-auto">
                    <input
                        type="text"
                        placeholder="Cari Event..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border rounded w-full"
                    />
                </div>

                {/* Daftar Event */}
                <div className="grid gap-6 max-w-3xl mx-auto">
                    {filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white shadow-md rounded overflow-hidden flex"
                        >
                            {/* Gambar Event */}
                            <img
                                src={event.image_url || "/placeholder.jpg"}
                                alt={event.name}
                                className="w-56 h-[250px] object-cover"
                            />

                            {/* Detail Event */}
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">
                                        {event.name}
                                    </h2>
                                    <p className="text-gray-700 mt-2">
                                        {event.description.slice(0, 100)}...
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        <strong>Lokasi:</strong>{" "}
                                        {event.location?.name ||
                                            "Tidak tersedia"}
                                    </p>
                                    <p className="text-gray-500">
                                        <strong>Tanggal:</strong>{" "}
                                        {new Date(
                                            event.start_date
                                        ).toLocaleDateString()}{" "}
                                        -{" "}
                                        {new Date(
                                            event.end_date
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <Link
                                    href={`/event/${event.id}`}
                                    className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pesan jika tidak ada event */}
                {filteredEvents.length === 0 && (
                    <p className="text-gray-500 text-center mt-6">
                        Tidak ada event yang ditemukan.
                    </p>
                )}
            </main>
        </div>
    );
};

export default Event;
