// src/components/home/MostPicked.tsx
import { useDesignStore } from "../../store/designStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Card";

export const MostPicked = () => {
    const { designs, fetchDesigns } = useDesignStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (designs.length === 0) fetchDesigns();
    }, []);

    const topRated = designs
        .filter(d => d.rating >= 3)
        .slice(0, 6);

    return (
        <div className="px-1">
            <h2 className="text-2xl font-bold mb-1 text-rose-700">Most Picked Designs</h2>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {topRated.map((design) => (
                    <div
                        key={design._id}
                        onClick={() => navigate(`/design/${design._id}`)}
                        className="cursor-pointer"
                    >
                        <Card design={design} showDetails={false} />
                    </div>
                ))}
            </div>
        </div>
    );
};
