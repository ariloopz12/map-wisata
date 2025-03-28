import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

const Wisata = ({ auth }) => {
    const [locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        axios
            .get("/api/locations?status=approved")
            .then((response) => {
                setLocations(response.data);
            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
            });
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredLocations = locations.filter((location) => {
        const matchesSearch = location.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" ||
            location.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 py-5 flex justify-between items-center">
                    <div className="text-xl font-bold">Map Wisata</div>
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
                    </div>

                    {/* Jika user sudah login */}
                    {auth.user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-500 focus:outline-none"
                            >
                                <span>{auth.user.name}</span>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                                    <Link
                                        href="/dashboard"
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </nav>

            {/* Konten Halaman */}
            <main className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-6 text-center">Wisata</h1>

                {/* Filter dan Search */}
                <div className="flex justify-center w-full max-w-4xl mb-6">
                    <div className="flex flex-wrap gap-4 w-full bg-white p-4 shadow-md rounded-lg">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-1/3 min-w-[200px] p-2 border rounded-lg"
                        >
                            <option value="All">Semua Kategori</option>
                            <option value="Alam">Alam</option>
                            <option value="Rekreasi">Rekreasi</option>
                            <option value="Hiburan">Hiburan</option>
                            <option value="Air Terjun">Air Terjun</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Cari lokasi wisata..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="flex-1 p-2 border rounded-lg"
                        />
                    </div>
                </div>

                {/* Daftar Lokasi Wisata */}
                <div className="flex justify-center items-center w-full">
                    <div className="grid gap-6 max-w-4xl w-full">
                        {filteredLocations.map((location) => (
                            <div
                                key={location.id}
                                className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full"
                            >
                                <img
                                    src={
                                        location.image_url || "/placeholder.jpg"
                                    }
                                    alt={location.name}
                                    className="w-1/3 h-[250px] object-cover"
                                />

                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-gray-500 font-medium">
                                            Lokasi #{location.id}
                                        </div>
                                        <div className="text-gray-500 font-medium">
                                            {location.category ||
                                                "Tidak ada kategori"}
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-bold">
                                        {location.name}
                                    </h2>
                                    <p className="text-gray-700 mt-2">
                                        {location.description.slice(0, 100)}...
                                    </p>

                                    <p className="text-gray-500 mt-4">
                                        Alamat:{" "}
                                        {location.address || "Tidak ada alamat"}
                                    </p>

                                    <div className="mt-6 flex gap-4">
                                        <button>
                                            <Link
                                                href={`/wisata/${location.id}`}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                Lihat Detail
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {filteredLocations.length === 0 && (
                    <p className="text-gray-500 mt-6 text-center">
                        Tidak ada lokasi wisata yang ditemukan.
                    </p>
                )}
            </main>
        </div>
    );
};

export default Wisata;
