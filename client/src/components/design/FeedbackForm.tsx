import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useFeedbackStore } from "../../store/feedbackStore";
import { Loader } from "../ui/Loader";

interface FeedbackFormProps {
    designId: string;
}

export const FeedbackForm = ({ designId }: FeedbackFormProps) => {
    const { addFeedback, loading, error } = useFeedbackStore();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        rating: 5,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRating = (rating: number) => {
        setFormData((prev) => ({ ...prev, rating }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addFeedback(designId, {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                rating: formData.rating,
            });
            setFormData({ name: "", email: "", message: "", rating: 5 });
        } catch (err) {
            console.error("Failed to submit feedback", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white"
        >
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-red-600 outline-none"
                required
            />

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-red-600 outline-none"
                required
            />

            {/* Star Rating */}
            <div className="flex items-center gap-1 md:col-span-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                        className="focus:outline-none"
                    >
                        <FaStar
                            size={22}
                            className={
                                star <= formData.rating ? "text-yellow-400" : "text-gray-500"
                            }
                        />
                    </button>
                ))}
            </div>

            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Feedback"
                rows={4}
                className="md:col-span-2 w-full p-2 bg-gray-900 border border-gray-700 text-white rounded focus:ring-2 focus:ring-red-600 outline-none"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition duration-200 shadow-md hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? <Loader message="Loading designs..." /> : "Submit Feedback"}
            </button>

            {error && (
                <div className="md:col-span-2 text-red-400 text-xs text-center mt-1">
                    {error}
                </div>
            )}
        </form>
    );
};
