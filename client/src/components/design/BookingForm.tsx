import { useState } from "react";

interface Props {
    designId: string;
}

export const BookingForm = ({ designId }: Props) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        note: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Booking submitted:", { designId, ...formData });
        // TODO: Send to API
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white"
        >
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                aria-label="Your Name"
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                aria-label="Your Phone"
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.phone}
                onChange={handleChange}
            />

            <input
                type="date"
                name="date"
                aria-label="Booking Date"
                className="w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <textarea
                name="note"
                placeholder="Additional Notes (optional)"
                aria-label="Additional Notes"
                className="md:col-span-2 w-full p-2 bg-gray-900 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                value={formData.note}
                onChange={handleChange}
                rows={3}
            />

            <button
                type="submit"
                className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow-md hover:scale-105"
            >
                Book Slot
            </button>
        </form>
    );
};
