import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";

const CreateUser = () => {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/users");
    };

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Create New User
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter user name"
                    />
                    {errors.name && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.name}
                        </div>
                    )}
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter user email"
                    />
                    {errors.email && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.email}
                        </div>
                    )}
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter password"
                    />
                    {errors.password && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.password}
                        </div>
                    )}
                </div>

                {/* Password Confirmation Input */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Confirm password"
                    />
                    {errors.password_confirmation && (
                        <div className="text-red-500 mt-1 text-sm">
                            {errors.password_confirmation}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
                    disabled={processing}
                >
                    {processing ? "Submitting..." : "Create User"}
                </button>
            </form>

            {/* Back to Index */}
            <div className="mt-6">
                <Link
                    href="/admin/users"
                    className="text-blue-600 hover:underline"
                >
                    Back to User List
                </Link>
            </div>
        </div>
    );
};

export default CreateUser;
