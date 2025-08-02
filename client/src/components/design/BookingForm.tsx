// src/components/design/BookingForm.tsx
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
            className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-200"
        >
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                aria-label="Your Name"
                className="p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-rose-500"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-rose-500"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                aria-label="Your Phone"
                className="p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-rose-500"
                value={formData.phone}
                onChange={handleChange}
            />

            <input
                type="date"
                name="date"
                aria-label="Booking Date"
                className="p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-rose-500"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <textarea
                name="note"
                placeholder="Additional Notes (optional)"
                aria-label="Additional Notes"
                className="md:col-span-2 p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-rose-500"
                value={formData.note}
                onChange={handleChange}
                rows={3}
            />

            <button
                type="submit"
                className="md:col-span-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
                Book Slot
            </button>
        </form>
    );
};
