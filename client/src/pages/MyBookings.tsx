// src/pages/MyBookings.tsx
import React, { useEffect } from "react";
import { FaCalendarAlt, FaHandPaper, FaUser } from "react-icons/fa";
import { useBookingStore } from "../store/bookingStore";
import { Link } from "react-router-dom";

const MyBookings: React.FC = () => {
    const { bookings, fetchBookings } = useBookingStore();

    useEffect(() => {
        if (bookings.length === 0) {
            fetchBookings();
        }
    }, [fetchBookings]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="bg-gray-950 text-white px-6 py-10">
            <div className=" mx-auto">
                {/* Bookings List */}
                {bookings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-600 transition transform hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={
                                            booking.design?.images?.[0]?.url ||
                                            "/images/placeholder-design.jpg"
                                        }
                                        alt={booking.design?.title || "Design"}
                                        className="w-full object-cover"
                                    />
                                    {booking.design?.category && (
                                        <span className="absolute top-3 left-3 bg-red-600 text-xs px-3 py-1 rounded-full">
                                            {booking.design.category}
                                        </span>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="p-5 flex flex-col gap-2">
                                    {/* Title */}
                                    <h2 className="text-xl font-semibold">
                                        {booking.design?.title || "Unknown Design"}
                                    </h2>

                                    {/* Booking Date & Time */}
                                    {booking.bookingDate && (
                                        <p className="flex items-center text-gray-400 text-sm">
                                            <FaCalendarAlt className="mr-2 text-red-500" />
                                            {formatDate(booking.bookingDate)} at{" "}
                                            {booking.bookingTime}
                                        </p>
                                    )}

                                    {/* Hand */}
                                    {booking.hand && (
                                        <p className="flex items-center text-gray-400 text-sm capitalize">
                                            <FaHandPaper className="mr-2 text-red-500" />
                                            {booking.hand} hand
                                        </p>
                                    )}

                                    {/* Person Type */}
                                    {booking.personType && (
                                        <p className="flex items-center text-gray-400 text-sm capitalize">
                                            <FaUser className="mr-2 text-red-500" />
                                            {booking.personType}
                                        </p>
                                    )}

                                    {/* Notes */}
                                    {booking.notes && (
                                        <p className="text-gray-300 text-sm italic border-l-2 border-red-500 pl-3">
                                            “{booking.notes}”
                                        </p>
                                    )}

                                    {/* Status */}
                                    <div className="mt-3">
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
                                                ${booking.status === "confirmed"
                                                    ? "bg-green-600"
                                                    : booking.status === "pending"
                                                        ? "bg-yellow-600"
                                                        : booking.status === "completed"
                                                            ? "bg-blue-600"
                                                            : "bg-red-600"
                                                }`}
                                        >
                                            {booking.status.charAt(0).toUpperCase() +
                                                booking.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 text-center">
                        <h2 className="text-xl font-semibold mb-2">
                            No bookings yet
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Browse our designs and book your favorite style today!
                        </p>
                        <Link
                            to="/designs"
                            className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            Browse Designs
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
