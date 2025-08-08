// src/pages/MyBookings.tsx
import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { useDesignStore } from "../../store/designStore";
import { useBookingStore } from "../../store/bookingStore";

const MyBookings: React.FC = () => {
    const { bookings, fetchBookings } = useBookingStore();
    const { categories, fetchCategories } = useDesignStore();

    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    useEffect(() => {
        fetchBookings();
        fetchCategories();
    }, [fetchBookings, fetchCategories]);

    const filteredBookings =
        selectedCategory === "All"
            ? bookings
            : bookings.filter((b) => b.design?.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button
                        onClick={() => setSelectedCategory("All")}
                        className={`px-4 py-2 rounded-lg border ${selectedCategory === "All"
                            ? "bg-red-600 border-red-600"
                            : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-lg border ${selectedCategory === cat
                                ? "bg-red-600 border-red-600"
                                : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Bookings List */}
                {filteredBookings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-800 hover:border-red-600 transition"
                            >
                                {/* Design Image */}
                                {booking.design?.images && (
                                    <img
                                        src={booking.design.images[0].toString()}
                                        alt={booking.design?.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}

                                {/* Title */}
                                <h2 className="text-xl font-semibold mb-2">
                                    {booking.design?.title || "Unknown Design"}
                                </h2>

                                {/* Category */}
                                {booking.design?.category && (
                                    <p className="flex items-center text-gray-400 text-sm mb-2">
                                        <FaTag className="mr-2 text-red-500" />
                                        {booking.design.category}
                                    </p>
                                )}

                                {/* Date */}
                                {booking.date && (
                                    <p className="flex items-center text-gray-400 text-sm mb-4">
                                        <FaCalendarAlt className="mr-2 text-red-500" />
                                        {new Date(booking.date).toLocaleDateString()}
                                    </p>
                                )}

                                {/* Status */}
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${booking.status === "Confirmed"
                                        ? "bg-green-600"
                                        : booking.status === "Pending"
                                            ? "bg-yellow-600"
                                            : "bg-red-600"
                                        }`}
                                >
                                    {booking.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 mt-20">
                        You don’t have any bookings yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
