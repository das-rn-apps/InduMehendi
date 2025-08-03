import { useEffect, useState } from "react";
import { useFeedbackStore } from "../../zustand/feedbackStore";
import type { Feedback } from "../../types";

export const FeedbackList = ({ designId }: { designId: string }) => {
    const {
        getFeedbacksByDesignId,
        loading,
        error,
    } = useFeedbackStore();

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadFeedbacks = async () => {
            const fetched = await getFeedbacksByDesignId(designId);
            setFeedbacks(fetched);
            setLoaded(true);
        };

        if (!loaded) loadFeedbacks();
    }, [loaded, getFeedbacksByDesignId, designId]);

    if (loading) {
        return <p className="text-gray-400 text-sm text-center">Loading feedbacks...</p>;
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
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-semibold uppercase text-lg">
                        {f.name.charAt(0)}
                    </div>

                    {/* Feedback content */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1 gap-2 flex-wrap sm:flex-nowrap">
                            {/* Name + Stars Grouped */}
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-white">{f.name}</span>
                                <span className="text-yellow-400 text-xs whitespace-nowrap">
                                    {"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}
                                </span>
                            </div>

                            {/* Date */}
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
