import React from "react";
import { Link, usePage } from "@inertiajs/react";

const UserIndex = () => {
    const { users, flash } = usePage().props;

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Manage Users
            </h1>

            {flash?.success && (
                <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                    {flash.success}
                </div>
            )}

            <div className="mb-4">
                <Link
                    href="/admin/users/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add New User
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left px-6 py-4 border-b">
                                Name
                            </th>
                            <th className="text-left px-6 py-4 border-b">
                                Email
                            </th>
                            <th className="text-center px-6 py-4 border-b">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center">
                                        <Link
                                            href={`/admin/users/${user.id}/edit`}
                                            className="text-blue-600 hover:text-blue-800 mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            as="button"
                                            method="delete"
                                            href={`/admin/users/${user.id}`}
                                            className="text-red-600 hover:text-red-800"
                                            onClick={(e) =>
                                                confirm(
                                                    "Are you sure you want to delete this user?"
                                                ) || e.preventDefault()
                                            }
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="px-6 py-4 border-b text-center"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserIndex;
