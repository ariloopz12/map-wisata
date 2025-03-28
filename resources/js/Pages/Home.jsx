import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { usePage } from "@inertiajs/react";

const Sidebar = ({ map, selectedLocation, setSelectedLocation }) => {
    const [locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ambil data lokasi wisata yang sudah di-approve dari API
        axios
            .get("/api/locations?status=approved")
            .then((response) => {
                setLocations(response.data);
            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
            });
    }, []);

    // Fungsi untuk menangani pencarian
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter lokasi berdasarkan pencarian
    const filteredLocations = locations.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fungsi untuk menangani klik lokasi wisata dari daftar
    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        // Geser peta ke lokasi yang dipilih
        if (map && location.latitude && location.longitude) {
            map.setView([location.latitude, location.longitude], 15);
        }
    };

    // Fungsi untuk kembali ke tampilan default
    const handleBack = () => {
        setSelectedLocation(null);
    };

    // Pastikan fetchLocations dideklarasikan sebelum dipanggil
    const fetchLocations = async () => {
        try {
            const response = await axios.get("/api/locations");
            setLocations(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Gagal mengambil data lokasi:", error);
            setLoading(false);
        }
    };

    // Panggil fetchLocations saat pertama kali komponen dimuat
    useEffect(() => {
        fetchLocations();
    }, []);

    return (
        <div className="w-100 h-full bg-white shadow-md overflow-y-auto">
            {/* Pencarian */}
            <div className="p-4 border-b">
                <input
                    type="text"
                    placeholder="Cari lokasi wisata..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full p-2 border rounded"
                />
            </div>

            {!selectedLocation && (
                <div>
                    <div className="p-4">
                        <h2 className="text-xl font-bold">
                            Daftar Lokasi Wisata
                        </h2>
                    </div>
                    <ul>
                        {filteredLocations.map((location) => (
                            <li
                                key={location.id}
                                className="p-4 border-b cursor-pointer hover:bg-gray-100 flex"
                                onClick={() => handleLocationClick(location)}
                            >
                                {/* Gambar lokasi */}
                                <img
                                    src={
                                        location.image_url ||
                                        "/default-image.jpg"
                                    }
                                    alt={location.name}
                                    className="w-20 h-20 object-cover rounded-md mr-4"
                                />

                                {/* Informasi lokasi */}
                                <div className="flex flex-col justify-between">
                                    <h3 className="text-lg font-bold">
                                        {location.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Rating:{" "}
                                        <span className="text-yellow-500">
                                            {location.average_rating || "N/A"}
                                        </span>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tampilan Detail Lokasi Wisata */}
            {selectedLocation && (
                <div className="p-4 w-full max-w-lg mx-auto bg-white rounded-lg shadow-md">
                    <button
                        onClick={handleBack}
                        className="text-blue-500 hover:text-blue-700 mb-4"
                    >
                        &larr; Kembali
                    </button>
                    <div className="flex flex-col">
                        {/* Gambar dengan ukuran tetap */}
                        <img
                            src={selectedLocation.image_url}
                            alt={selectedLocation.name}
                            className="w-full h-60 object-cover rounded-md mb-4"
                        />

                        {/* Informasi lokasi */}
                        <h2 className="text-2xl font-bold">
                            {selectedLocation.name}
                        </h2>

                        {/* Deskripsi dengan batasan panjang */}
                        <p className="text-gray-700 mt-2 break-words">
                            {selectedLocation.description}
                        </p>

                        <div className="w-full mt-4  space-y-2">
                            <p className="text-gray-500">
                                <strong>Kategori:</strong>{" "}
                                {selectedLocation.category ||
                                    "Tidak ada kategori"}
                            </p>
                            <p className="text-gray-500">
                                <strong>Alamat:</strong>{" "}
                                {selectedLocation.address || "Tidak ada alamat"}
                            </p>
                            <p className="text-yellow-500">
                                <strong>Rating:</strong>{" "}
                                {selectedLocation.average_rating || "N/A"} (
                                {selectedLocation.reviews_count || "0"} ulasan)
                            </p>
                        </div>

                        {/* Tombol aksi */}
                        <div className="flex space-x-4 mt-4 w-full">
                            <Link
                                href={`/wisata/${selectedLocation.id}`}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Detail Lokasi
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Home = () => {
    const { auth } = usePage().props; // Ambil data autentikasi
    const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk dropdown
    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const categoryLayers = {}; // Untuk menyimpan layer per kategori

    useEffect(() => {
        const initialMap = L.map("map").setView([-6.914744, 107.60981], 12);
        setMap(initialMap);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(initialMap);

        axios
            .get("/api/locations")
            .then((response) => {
                const locationData = response.data;
                setLocations(locationData);
                addMarkersWithLayers(initialMap, locationData);
            })
            .catch((error) => {
                console.error("Error fetching locations:", error);
            });

        return () => {
            initialMap.remove();
        };
    }, []);

    const addMarkersWithLayers = (map, locationData) => {
        const layersControl = L.control.layers().addTo(map);

        locationData.forEach((location) => {
            const category = location.category;
            const markerColorHex = getCategoryColorHex(category);

            const icon = L.icon({
                iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${markerColorHex}.png`,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl:
                    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                shadowSize: [41, 41],
                shadowAnchor: [12, 41],
            });

            const marker = L.marker([location.latitude, location.longitude], {
                icon,
            }).bindPopup(`<b>${location.name}</b><br>${location.description}`);

            marker.on("click", () => {
                setSelectedLocation(location);
            });

            if (!categoryLayers[category]) {
                categoryLayers[category] = L.layerGroup();
                layersControl.addOverlay(categoryLayers[category], category);
            }
            categoryLayers[category].addLayer(marker);
        });

        Object.values(categoryLayers).forEach((layer) => layer.addTo(map));
    };

    const getCategoryColorHex = (category) => {
        switch (category) {
            case "Alam":
                return "green";
            case "Rekreasi":
                return "blue";
            case "Hiburan":
                return "violet";
            case "Air Terjun":
                return "red";
            default:
                return "grey";
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar
                map={map}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />
            <div className="flex-1">
                <nav className="bg-white shadow-md">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
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

                        {/* Bagian Login/User */}
                        <div className="relative">
                            {auth.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setDropdownOpen(!dropdownOpen)
                                        }
                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 flex items-center"
                                    >
                                        {auth.user.name} ▼
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
                    </div>
                </nav>
                <div
                    id="map"
                    className="z-0"
                    style={{ height: "calc(100vh - 64px)" }}
                ></div>
            </div>
        </div>
    );
};

export default Home;
