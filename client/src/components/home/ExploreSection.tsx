// src/components/home/ExploreSection.tsx
export const ExploreSection = () => {
    const categories = ["Bridal", "Festival", "Minimal", "Arabic", "Kids", "Traditional"];

    return (
        <div className="mt-4 px-2">
            <h2 className="text-2xl font-bold text-rose-700 mb-4">Explore by Category</h2>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition"
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
};
