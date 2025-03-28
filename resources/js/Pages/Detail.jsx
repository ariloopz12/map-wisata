import React, { useEffect, useRef, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import axios from "axios";

const Detail = ({ location }) => {
    const { auth } = usePage().props;
    const mapRef = useRef(null);
    const routingControlRef = useRef(null);

    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Koordinat default: Kampus STMIK Mardira Indonesia
    const defaultLat = -6.94639;
    const defaultLng = 107.59361;

    // Fetch reviews saat halaman dibuka
    useEffect(() => {
        axios.get(`/api/reviews/${location.id}`).then((response) => {
            setReviews(response.data.reviews);
            setAverageRating(response.data.averageRating);
        });
    }, [location.id]);

    /**
     * Fungsi untuk menambahkan rute perjalanan dari titik awal ke lokasi wisata
     */
    const addRoute = (map, startLat, startLng, endLat, endLng) => {
        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

        const control = L.Routing.control({
            waypoints: [L.latLng(startLat, startLng), L.latLng(endLat, endLng)],
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 5 }],
            },
        });

        control.addTo(map);
        routingControlRef.current = control;

        // Tunggu hingga tabel rute muncul, lalu atur styling
        setTimeout(() => {
            const routingContainer = document.querySelector(
                ".leaflet-routing-container"
            );
            if (routingContainer) {
                routingContainer.style.maxHeight = "60vh"; // Maksimal 60% dari viewport agar sesuai peta
                routingContainer.style.overflowY = "auto"; // Scroll jika konten terlalu panjang
                routingContainer.style.background = "rgba(255, 255, 255, 0.9)"; // Background semi-transparan
                routingContainer.style.padding = "10px";
                routingContainer.style.borderRadius = "5px";
            }
        }, 500); // Delay untuk memastikan elemen tersedia
    };

    /**
     * Fungsi untuk menambahkan rute perjalanan dari titik awal ke lokasi wisata
     */
    // const addRoute = (map, startLat, startLng, endLat, endLng) => {
    //     if (routingControlRef.current) {
    //         map.removeControl(routingControlRef.current);
    //     }

    //     const control = L.Routing.control({
    //         waypoints: [L.latLng(startLat, startLng), L.latLng(endLat, endLng)],
    //         routeWhileDragging: true,
    //         lineOptions: {
    //             styles: [{ color: "#6FA1EC", weight: 5 }],
    //         },
    //     });

    //     control.addTo(map);
    //     routingControlRef.current = control;
    // };

    /**
     * Menangani klik tombol "Tambah Rute"
     */
    const handleRoute = () => {
        const mapInstance = mapRef.current;
        if (mapInstance) {
            addRoute(
                mapInstance,
                defaultLat,
                defaultLng,
                location.latitude,
                location.longitude
            );
        } else {
            console.error("Peta belum terinisialisasi.");
        }
    };

    /**
     * Menangani submit review
     */
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/reviews", {
                location_id: location.id,
                comment: reviewText,
                rating: rating,
            });

            // Tambahkan review baru ke daftar tanpa reload
            setReviews([response.data.review, ...reviews]);
            setReviewText("");
            setRating(5);
        } catch (error) {
            console.error("Gagal menambahkan review:", error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!auth.user) return;
        const confirmDelete = confirm(
            "Apakah Anda yakin ingin menghapus review ini?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/reviews/${reviewId}`);
            setReviews((prev) =>
                prev.filter((review) => review.id !== reviewId)
            );
        } catch (error) {
            console.error("Gagal menghapus review:", error.response?.data);
        }
    };

    /**
     * Komponen untuk menyimpan instance peta di dalam ref
     */
    const SetMapInstance = () => {
        const map = useMap();
        useEffect(() => {
            mapRef.current = map;
        }, [map]);

        return null;
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4 py-5 flex justify-between items-center">
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
                        {/* <Link href="/events" className="text-gray-700 hover:text-blue-500">
                        Event
                    </Link> */}
                    </div>

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

            {/* Konten Detail Wisata */}
            <main className="container mx-auto px-4 py-8 flex-1">
                {/* Tombol Kembali */}
                <div className="mb-6">
                    <Link
                        href="/wisata"
                        className="text-blue-500 hover:underline flex items-center"
                    >
                        ← Kembali ke daftar wisata
                    </Link>
                </div>

                {/* Informasi Wisata */}
                <div className="bg-white shadow-md rounded overflow-hidden">
                    <img
                        src={location.image_url || "/placeholder.jpg"}
                        alt={location.name}
                        className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">
                            {location.name}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {location.description}
                        </p>
                        <p className="text-gray-500">
                            <strong>Alamat:</strong>{" "}
                            {location.address || "Tidak ada alamat"}
                        </p>
                        <p className="text-gray-500">
                            <strong>Kategori:</strong>{" "}
                            {location.category || "Tidak ada kategori"}
                        </p>
                        <p className="text-gray-500">
                            <strong>Rata-rata Rating:</strong> ⭐{" "}
                            {averageRating} / 5
                        </p>
                    </div>
                </div>

                {/* Peta Lokasi */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Peta Lokasi</h3>
                    <MapContainer
                        center={[location.latitude, location.longitude]}
                        zoom={13}
                        className="h-64 w-full rounded"
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                            position={[location.latitude, location.longitude]}
                        >
                            <Popup>{location.name}</Popup>
                        </Marker>
                        <SetMapInstance />
                    </MapContainer>
                </div>

                {/* Tombol Tambah Rute */}
                <div className="mt-6">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleRoute}
                    >
                        Tambah Rute ke Lokasi
                    </button>
                </div>

                {/* Form Tambah Review */}
                {auth.user && (
                    <div className="mt-6 bg-white p-6 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-4">
                            Tambah Review
                        </h3>
                        <form onSubmit={handleSubmitReview}>
                            <textarea
                                className="w-full border p-2 rounded mb-2"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Tulis review..."
                                required
                            />
                            <select
                                className="w-full border p-2 rounded mb-2"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                {[5, 4, 3, 2, 1].map((num) => (
                                    <option key={num} value={num}>
                                        {num} ⭐
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                disabled={loading}
                            >
                                {loading ? "Mengirim..." : "Kirim Review"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Daftar Review */}
                <div className="mt-6 bg-white p-6 rounded shadow-md">
                    <h3 className="text-xl font-bold mb-4">Ulasan Pengguna</h3>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border-b pb-2 mb-2 flex justify-between items-center"
                            >
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Oleh:{" "}
                                        <strong>
                                            {review.user?.name || "Pengguna"}
                                        </strong>{" "}
                                        -{" "}
                                        <span>
                                            {new Date(
                                                review.created_at
                                            ).toLocaleString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>⭐ {review.rating}</strong>
                                    </p>
                                    <p className="text-gray-800">
                                        {review.comment}
                                    </p>
                                </div>
                                {auth.user &&
                                    (auth.user.id === review.user_id ||
                                        auth.user.role === "admin") && (
                                        <button
                                            onClick={() =>
                                                handleDeleteReview(review.id)
                                            }
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Hapus
                                        </button>
                                    )}
                            </div>
                        ))
                    ) : (
                        <p>Belum ada ulasan.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Detail;
