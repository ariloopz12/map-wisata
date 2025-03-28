import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

const EditLocation = () => {
    const { location, categories } = usePage().props; // Ambil data lokasi dan kategori
    const { data, setData, put, processing, errors } = useForm({
        name: location.name || "",
        description: location.description || "",
        latitude: location.latitude || "",
        longitude: location.longitude || "",
        category: location.category || "",
        address: location.address || "",
        image_url: location.image_url || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/user/locations/${location.id}`);
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Edit Location
            </h1>

            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                        } rounded`}
                        required
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">
                            {errors.name}
                        </span>
                    )}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.description
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded`}
                        rows="4"
                        required
                    ></textarea>
                    {errors.description && (
                        <span className="text-red-500 text-sm">
                            {errors.description}
                        </span>
                    )}
                </div>

                {/* Latitude */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="latitude"
                    >
                        Latitude
                    </label>
                    <input
                        type="number"
                        step="0.0000001"
                        id="latitude"
                        value={data.latitude}
                        onChange={(e) => setData("latitude", e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.latitude
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded`}
                        required
                    />
                    {errors.latitude && (
                        <span className="text-red-500 text-sm">
                            {errors.latitude}
                        </span>
                    )}
                </div>

                {/* Longitude */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="longitude"
                    >
                        Longitude
                    </label>
                    <input
                        type="number"
                        step="0.0000001"
                        id="longitude"
                        value={data.longitude}
                        onChange={(e) => setData("longitude", e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.longitude
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded`}
                        required
                    />
                    {errors.longitude && (
                        <span className="text-red-500 text-sm">
                            {errors.longitude}
                        </span>
                    )}
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.category
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded`}
                        required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <span className="text-red-500 text-sm">
                            {errors.category}
                        </span>
                    )}
                </div>

                {/* Address */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="address"
                    >
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.address
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded`}
                    />
                    {errors.address && (
                        <span className="text-red-500 text-sm">
                            {errors.address}
                        </span>
                    )}
                </div>

                {/* Image URL */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="image_url"
                    >
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="image_url"
                        value={data.image_url}
                        onChange={(e) => setData("image_url", e.target.value)}
                        className={`w-full px-3 py-2 border ${
                            errors.image_url
                                ? "border-red-500"
                                : "border-gray-300"
                        } rounded`}
                    />
                    {errors.image_url && (
                        <span className="text-red-500 text-sm">
                            {errors.image_url}
                        </span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditLocation;
