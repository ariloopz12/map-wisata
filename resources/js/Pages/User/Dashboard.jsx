import React from "react";
import { Link, useForm } from "@inertiajs/react";

const UserDashboard = () => {
    const { post } = useForm();

    // Fungsi untuk menangani logout
    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">User Dashboard</h1>
                <div className="flex space-x-4">
                    {/* Tombol Kembali ke Home */}
                    <Link
                        href="/"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Home
                    </Link>
                    {/* Tombol Logout */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Location Management Section */}
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Location Management
                    </h2>
                    <p className="mb-4">Manage your tourist locations.</p>
                    <Link
                        href="/user/locations"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Manage Locations
                    </Link>
                </div>

                {/* Event Management Section */}
                <div className="bg-white shadow-md rounded p-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Event Management
                    </h2>
                    <p className="mb-4">Manage your events.</p>
                    <Link
                        href="/user/events"
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                    >
                        Manage Events
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
