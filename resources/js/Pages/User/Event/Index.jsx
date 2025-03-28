import React from "react";
import { Link, usePage } from "@inertiajs/react";

const Index = () => {
    const { events } = usePage().props;

    return (
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold mb-4">My Events</h1>

            {/* Tombol untuk tambah event */}
            <Link
                href="/user/events/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6 inline-block"
            >
                Create New Event
            </Link>

            {/* Daftar Event */}
            <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Event Name</th>
                        <th className="py-3 px-6 text-left">Location</th>
                        <th className="py-3 px-6 text-center">Start Date</th>
                        <th className="py-3 px-6 text-center">End Date</th>
                        <th className="py-3 px-6 text-center">Status</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id} className="border-b">
                            <td className="py-3 px-6">{event.name}</td>
                            <td className="py-3 px-6">
                                {event.location?.name || "Unknown"}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {event.start_date}
                            </td>
                            <td className="py-3 px-6 text-center">
                                {event.end_date}
                            </td>
                            <td className="py-3 px-6 text-center capitalize">
                                {event.status}
                            </td>
                            <td className="py-3 px-6 text-center">
                                <Link
                                    href={`/user/events/${event.id}/edit`}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                                >
                                    Edit
                                </Link>
                                <Link
                                    as="button"
                                    href={`/user/events/${event.id}`}
                                    method="delete"
                                    className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
