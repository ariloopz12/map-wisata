import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";

const EditEventUser = ({ event, locations }) => {
    const { data, setData, put, errors, reset } = useForm({
        name: event.name || "",
        description: event.description || "",
        start_date: event.start_date || "",
        end_date: event.end_date || "",
        location_id: event.location_id || "",
        image_url: event.image_url || "",
    });

    useEffect(() => {
        return () => reset();
    }, []);

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setData(key, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/user/events/${event.id}`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8"
            >
                {/* Nama Event */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                    >
                        Nama Event
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Deskripsi */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="description"
                    >
                        Deskripsi
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Tanggal Mulai */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="start_date"
                    >
                        Tanggal Mulai
                    </label>
                    <input
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        value={data.start_date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.start_date && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.start_date}
                        </p>
                    )}
                </div>

                {/* Tanggal Selesai */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="end_date"
                    >
                        Tanggal Selesai
                    </label>
                    <input
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        value={data.end_date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.end_date && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.end_date}
                        </p>
                    )}
                </div>

                {/* Lokasi */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="location_id"
                    >
                        Lokasi
                    </label>
                    <select
                        id="location_id"
                        name="location_id"
                        value={data.location_id}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Pilih Lokasi</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                    {errors.location_id && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.location_id}
                        </p>
                    )}
                </div>

                {/* URL Gambar */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="image_url"
                    >
                        URL Gambar Event
                    </label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={data.image_url}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.image_url && (
                        <p className="text-red-500 text-xs mt-2">
                            {errors.image_url}
                        </p>
                    )}
                </div>

                {/* Tombol Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEventUser;
