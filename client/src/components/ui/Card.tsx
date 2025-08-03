// src/components/ui/Card.tsx
import type { Design } from "../../types";

export const Card = ({ design, showDetails }: { design: Design; showDetails: boolean }) => {
    const firstImage = design.images?.[1];

    return (
        <div className="bg-gray-900 rounded-xs shadow hover:shadow-lg overflow-hidden">
            {firstImage && (
                <img
                    src={firstImage.url}
                    alt={firstImage.altText || design.title}
                    className="w-full aspect-square object-cover"
                />

            )}
            <div className="px-3 py-2">
                <h3 className="text-sm font-semibold text-red-500">
                    {design.title}{" "}
                    <span className="text-yellow-400">
                        {"★".repeat(design.rating)}{"☆".repeat(5 - design.rating)}
                    </span>
                </h3>
                {
                    showDetails &&
                    <>
                        <p className="text-xs text-gray-500">
                            {design.description.length > 38
                                ? design.description.slice(0, 35) + "..."
                                : design.description}
                        </p>

                    </>
                }
                <p className="text-xs text-gray-400 italic">Category: {design.category}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {design.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-gray-700 text-white px-1 py-0.5 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};
