import React, { useEffect, useMemo, useState } from "react";
import { useDesignStore } from "../../store/designStore";
import { Card } from "../ui/Card";

const ExploreSection: React.FC = () => {
    const { designs, fetchDesigns, loading, error } = useDesignStore();
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    useEffect(() => {
        fetchDesigns();
    }, [fetchDesigns]);

    // Build unique category list
    const categories = useMemo(() => {
        const allCats = designs.flatMap((d) => d.category || []);
        return ["All", ...Array.from(new Set(allCats))];
    }, [designs]);

    // Filter designs based on selected category
    const filteredDesigns = useMemo(() => {
        if (selectedCategory === "All") return designs;
        return designs.filter((d) => d.category?.includes(selectedCategory));
    }, [designs, selectedCategory]);

    if (loading) {
        return <p className="text-center text-gray-400">Loading designs...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-500">
                Failed to load designs. Please try again later.
            </p>
        );
    }

    return (
        <div className="p-1">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full transition ${selectedCategory === cat
                            ? "bg-rose-600 text-white"
                            : "bg-rose-100 text-rose-700 hover:bg-rose-200"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Designs Grid */}
            {filteredDesigns.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                    No designs found in this category.
                </p>
            ) : (
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {filteredDesigns.map((design) => (
                        <Card key={design._id} design={design} showDetails={false} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreSection;
