import { useState } from "react";

interface Props {
    designId: string;
}

export const BookingForm = ({ designId }: Props) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        hand: "both",
        personType: "guest",
        bookingDate: "",
        bookingTime: "",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Booking submitted:", { designId, ...formData });
        // TODO: Send to API (auth will set user automatically)
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white"
        >
            {/* Name */}
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                aria-label="Your Name"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.name}
                onChange={handleChange}
                required
            />

            {/* Email */}
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.email}
                onChange={handleChange}
                required
            />

            {/* Phone */}
            <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                aria-label="Your Phone"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.phone}
                onChange={handleChange}
                required
            />

            {/* Address */}
            <input
                type="text"
                name="address"
                placeholder="Your Address"
                aria-label="Your Address"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.address}
                onChange={handleChange}
            />

            {/* Hand */}
            <select
                name="hand"
                aria-label="Which hand"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.hand}
                onChange={handleChange}
                required
            >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="both">Both</option>
            </select>

            {/* Person Type */}
            <select
                name="personType"
                aria-label="Person Type"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.personType}
                onChange={handleChange}
                required
            >
                <option value="bride">Bride</option>
                <option value="groom">Groom</option>
                <option value="guest">Guest</option>
                <option value="other">Other</option>
            </select>

            {/* Booking Date */}
            <input
                type="date"
                name="bookingDate"
                aria-label="Booking Date"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.bookingDate}
                onChange={handleChange}
                required
            />

            {/* Booking Time */}
            <input
                type="time"
                name="bookingTime"
                aria-label="Booking Time"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.bookingTime}
                onChange={handleChange}
                required
            />

            {/* Notes */}
            <textarea
                name="notes"
                placeholder="Additional Notes (optional)"
                aria-label="Additional Notes"
                className="md:col-span-2 w-full p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
            />

            {/* Submit */}
            <button
                type="submit"
                className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow-md hover:scale-105"
            >
                Book Slot
            </button>
        </form>
    );
};
