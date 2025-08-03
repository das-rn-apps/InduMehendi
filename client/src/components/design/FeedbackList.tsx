import type { Feedback } from "../../types";
import { Loader } from "../ui/Loader";

export const FeedbackList = ({
    feedbacks,
    loading,
    error,
}: {
    feedbacks: Feedback[];
    loading: boolean;
    error: string | null;
}) => {
    if (loading) {
        return <Loader message="Loading feedbacks..." />;
    }

    if (error) {
        return <p className="text-red-500 text-sm text-center">{error}</p>;
    }

    if (!feedbacks.length) {
        return <p className="text-gray-400 text-sm text-center">No feedback yet.</p>;
    }

    return (
        <div className="space-y-2">
            {feedbacks.map((f) => (
                <div
                    key={f._id}
                    className="bg-gray-900 p-2 px-3 rounded-sm text-white flex items-start gap-3"
                >
                    <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-semibold uppercase text-lg">
                        {f.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1 gap-2 flex-wrap sm:flex-nowrap">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-white">{f.name}</span>
                                <span className="text-yellow-400 text-xs whitespace-nowrap">
                                    {"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}
                                </span>
                            </div>
                            <div className="text-gray-400 text-xs whitespace-nowrap">
                                {new Date(f.createdAt || "").toLocaleDateString()}
                            </div>
                        </div>
                        <div className="text-xs mb-1 text-gray-300">{f.message}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
