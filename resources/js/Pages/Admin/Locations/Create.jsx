import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const LocationCreate = () => {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        status: "pending",
        category: "", // Kategori ditambahkan
        address: "",
        image_url: "",
    });

    // Kategori predefined
    const categories = [
        "Nature",
        "Cultural Heritage",
        "Amusement Parks",
        "Beaches",
        "Mountain & Hills",
        "Shopping",
        "Urban Landmarks",
        "Historic Sites",
        "Religious Sites",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/locations");
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Add New Location
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter location name"
                    />
                    {errors.name && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Description
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter location description"
                    />
                    {errors.description && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.description}
                        </div>
                    )}
                </div>

                {/* Latitude and Longitude */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Latitude
                        </label>
                        <input
                            type="number"
                            step="any"
                            value={data.latitude}
                            onChange={(e) =>
                                setData("latitude", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter latitude"
                        />
                        {errors.latitude && (
                            <div className="text-red-500 mt-1 text-sm">
                                {errors.latitude}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Longitude
                        </label>
                        <input
                            type="number"
                            step="any"
                            value={data.longitude}
                            onChange={(e) =>
                                setData("longitude", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            placeholder="Enter longitude"
                        />
                        {errors.longitude && (
                            <div className="text-red-500 mt-1 text-sm">
                                {errors.longitude}
                            </div>
                        )}
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Category
                    </label>
                    <select
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.category}
                        </div>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Address
                    </label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter address"
                    />
                    {errors.address && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.address}
                        </div>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Status
                    </label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                    </select>
                    {errors.status && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.status}
                        </div>
                    )}
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Image URL
                    </label>
                    <input
                        type="text"
                        value={data.image_url}
                        onChange={(e) => setData("image_url", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter image URL"
                    />
                    {errors.image_url && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.image_url}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
                    disabled={processing}
                >
                    {processing ? "Submitting..." : "Create Location"}
                </button>
            </form>
        </div>
    );
};

export default LocationCreate;
