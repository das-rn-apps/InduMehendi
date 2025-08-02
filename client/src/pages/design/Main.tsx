import { useNavigate } from "react-router-dom";
import { useDesignStore } from "../../zustand/designStore";
import { useEffect } from "react";
import { Card } from "../../components/ui/Card";

export default function DesignGalleryPage() {
    const { designs, fetchDesigns, loading, error } = useDesignStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (designs.length === 0) fetchDesigns();
    }, []);

    return (
        <div >
            {loading && <p className="text-center text-gray-500">Loading designs...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {designs.map((design) => (
                    <div
                        key={design._id}
                        onClick={() => navigate(`/design/${design._id}`)}
                        className="cursor-pointer"
                    >
                        <Card design={design} showDetails={true} />
                    </div>
                ))}
            </div>
        </div>
    );
}
