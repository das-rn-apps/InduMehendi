import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface Props {
    designId: string;
}

export const FeedbackForm = ({ designId }: Props) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        rating: 5,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleStarClick = (rating: number) => {
        setFormData((prev) => ({ ...prev, rating }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Feedback submitted:", { designId, ...formData });
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

            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        type="button"
                        key={star}
                        onClick={() => handleStarClick(star)}
                        className="focus:outline-none"
                    >
                        <FaStar
                            size={22}
                            className={
                                star <= formData.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }
                        />
                    </button>
                ))}
            </div>

            <textarea
                name="message"
                placeholder="Your Feedback"
                aria-label="Your Feedback"
                className="md:col-span-2 p-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-rose-500"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
            />

            <button
                type="submit"
                className="md:col-span-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
                Submit Feedback
            </button>
        </form>
    );
};
