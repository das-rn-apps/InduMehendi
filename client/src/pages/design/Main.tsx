import { useNavigate } from "react-router-dom";
import { useDesignStore } from "../../zustand/designStore";
import { useEffect, useState } from "react";
import { Card } from "../../components/ui/Card";
import { Loader } from "../../components/ui/Loader";
import type { Design } from "../../types";
import { DesignSearchFilter } from "../../components/design/DesignSearchFilter";

export default function DesignGalleryPage() {
    const { designs, fetchDesigns, loading, error } = useDesignStore();
    const navigate = useNavigate();

    const [filteredDesigns, setFilteredDesigns] = useState<Design[]>([]);

    useEffect(() => {
        if (designs.length === 0) {
            fetchDesigns();
        } else {
            setFilteredDesigns(designs);
        }
    }, [designs, fetchDesigns]);

    return (
        <div className="p-4 mx-auto">
            <DesignSearchFilter onFilter={setFilteredDesigns} />
            {loading && <Loader message="Loading designs..." />}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {filteredDesigns.map((design) => (
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
