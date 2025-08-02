import { useMemo } from "react";
import { useFeedbackStore } from "../../zustand/feedbackStore";

export const FeedbackList = ({ designId }: { designId: string }) => {
    const feedbackMap = useFeedbackStore((state) => state.feedbacks);
    const feedbacks = useMemo(() => feedbackMap[designId] || [], [feedbackMap, designId]);

    return (
        <div className="space-y-2">
            {feedbacks.map((f) => (
                <div
                    key={f.id}
                    className="bg-gray-800 p-3 rounded-md text-white flex items-start gap-3"
                >
                    <img
                        src={f.avatar}
                        alt={f.user}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className="font-semibold text-sm">{f.user}</span>
                            <span className="text-gray-400 text-xs">{f.date}</span>
                        </div>
                        <div className="text-xs mb-1">{f.text}</div>
                        <div className="text-yellow-400 text-xs">
                            {"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
