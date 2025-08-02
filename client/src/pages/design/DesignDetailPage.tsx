import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDesignStore } from "../../zustand/designStore";
import { ImageCarousel } from "../../components/design/ImageCarousel";
import { DesignMeta } from "../../components/design/DesignMeta";
import { BookingForm } from "../../components/design/BookingForm";
import { FeedbackForm } from "../../components/design/FeedbackForm";
import { FeedbackList } from "../../components/design/FeedbackList";

export default function DesignDetailPage() {
    const { id } = useParams<{ id: string }>();
    const {
        currentDesign,
        getDesignById,
        fetchDesignById,
    } = useDesignStore();

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

        loadDesign();
    }, [id, getDesignById, fetchDesignById]);

    const design = currentDesign || getDesignById(id!);

    if (loading) {
        return <div className="p-6 text-center text-gray-400">Loading...</div>;
    }

    if (notFound || !design) {
        return <div className="p-6 text-center text-gray-500">Design not found</div>;
    }

    return (
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto">
            <div className="lg:col-span-2">
                <ImageCarousel images={design.images} />
            </div>

            <div className="lg:col-span-1">
                <DesignMeta
                    title={design.title}
                    description={design.description}
                    category={design.category}
                    tags={design.tags}
                    rating={design.rating}
                />
                <div className="py-4">
                    <h2 className="text-xl font-semibold text-rose-700 mb-2">Book This Design</h2>
                    <BookingForm designId={design._id} />
                </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-t pt-4">
                    <h2 className="text-xl font-semibold text-rose-700 mb-2">Leave a Feedback</h2>
                    <FeedbackForm designId={design._id} />
                </div>
                <div className="border-t pt-4">
                    <h2 className="text-xl font-semibold text-rose-700 mb-2">What others are saying</h2>
                    <FeedbackList designId={design._id} />
                </div>
            </div>
        </div>
    );
}
