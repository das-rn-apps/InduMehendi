import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDesignStore } from "../../store/designStore";
import { useFeedbackStore } from "../../store/feedbackStore";
import { ImageCarousel } from "../../components/design/ImageCarousel";
import { DesignMeta } from "../../components/design/DesignMeta";
import { FeedbackForm } from "../../components/design/FeedbackForm";
import { FeedbackList } from "../../components/design/FeedbackList";
import { BookingCTA } from "../../components/home/BookingCTA";
import type { Feedback } from "../../types";
import { Loader } from "../../components/ui/Loader";

export default function DesignDetailPage() {
    const { id } = useParams<{ id: string }>();
    const {
        currentDesign,
        getDesignById,
        fetchDesignById,
    } = useDesignStore();

    const { getFeedbacksByDesignId, loading: feedbackLoading, error: feedbackError } = useFeedbackStore();
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [feedbackLoaded, setFeedbackLoaded] = useState(false);

    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const loadDesign = async () => {
            if (!id) return;

            const cached = getDesignById(id);
            if (!cached) {
                setLoading(true);
                const fetched = await fetchDesignById(id);
                setNotFound(!fetched);
                setLoading(false);
            }
        };

        const loadFeedbacks = async () => {
            if (!id || feedbackLoaded) return;
            const fetched = await getFeedbacksByDesignId(id);
            setFeedbacks(fetched);
            setFeedbackLoaded(true);
        };

        loadDesign();
        loadFeedbacks();
    }, [id, getDesignById, fetchDesignById, getFeedbacksByDesignId, feedbackLoaded]);

    const design = currentDesign || getDesignById(id!);

    if (loading) {
        return <Loader message="Loading..." />;
    }

    if (notFound || !design) {
        return <div className="p-6 text-center text-gray-500">Design not found</div>;
    }

    return (
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-2 mx-auto">
            <div className="lg:col-span-2">
                <ImageCarousel images={design.images} />
            </div>

            <div className="lg:col-span-1">
                <DesignMeta
                    title={design.title}
                    description={design.description}
                    category={design.category}
                    tags={design.tags}
                    feedbacks={feedbacks} // 💡 pass down
                />
                <div className="py-4">
                    <BookingCTA designId={design._id} />
                </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-t">
                    <h2 className="text-xl font-semibold text-rose-700 mb-2">Leave a Feedback</h2>
                    <FeedbackForm designId={design._id} />
                </div>
                <div className="border-t">
                    <h2 className="text-xl font-semibold text-rose-700 mb-2">What others are saying</h2>
                    <FeedbackList
                        feedbacks={feedbacks} // 💡 pass down
                        loading={feedbackLoading}
                        error={feedbackError}
                    />
                </div>
            </div>
        </div>
    );
}
