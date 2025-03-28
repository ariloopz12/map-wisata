import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

const EditUser = () => {
    const { user } = usePage().props; // Mengambil data pengguna yang sudah ada dari server
    const { data, setData, put, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
    });

    // Fungsi untuk menangani submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`); // Menggunakan PUT untuk mengupdate user
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Edit User</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.name}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.email}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                    >
                        Password (Leave empty if you don't want to change it)
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.password}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password_confirmation"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password_confirmation && (
                        <div className="text-red-500 text-sm mt-2">
                            {errors.password_confirmation}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update User
                </button>
            </form>
        </div>
    );
};

export default EditUser;
