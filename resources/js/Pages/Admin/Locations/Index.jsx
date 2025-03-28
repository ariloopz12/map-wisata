import React from "react";
import { Link, usePage } from "@inertiajs/react";

const LocationIndex = () => {
    const { locations, flash } = usePage().props;

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Locations Management
            </h1>

            {/* Flash Message */}
            {flash?.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
                    {flash.success}
                </div>
            )}

            {/* Add New Location Button */}
            <div className="mb-4 flex justify-end">
                <Link
                    href="/admin/locations/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                    Add New Location
                </Link>
            </div>

            {/* Locations Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">
                                ID
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Name
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Category
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Address
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Status
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.length > 0 ? (
                            locations.map((location) => (
                                <tr
                                    key={location.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {location.id}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {location.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {location.category || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {location.address || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span
                                            className={`px-2 py-1 text-xs rounded ${
                                                location.status === "approved"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {location.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                                        <Link
                                            href={`/admin/locations/${location.id}/edit`}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            method="delete"
                                            href={`/admin/locations/${location.id}`}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            as="button"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center border border-gray-300 px-4 py-2"
                                >
                                    No locations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LocationIndex;
