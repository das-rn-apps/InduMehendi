// src/components/design/DesignMeta.tsx
import { FaStar } from "react-icons/fa";

interface Props {
    title: string;
    description: string;
    category: string;
    tags: string[];
    rating: number;
    reviewsCount?: number; // optional
}

export const DesignMeta = ({
    title,
    description,
    category,
    tags,
    rating,
    reviewsCount = 0,
}: Props) => {
    return (
        <div className="space-y-3">
            {/* Title */}
            <h1 className="text-2xl font-bold text-rose-800">{title}</h1>

            {/* ⭐ Rating Section */}
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                        key={i}
                        size={18}
                        className={i <= rating ? "text-yellow-400" : "text-gray-300"}
                    />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                    ({reviewsCount} review{reviewsCount !== 1 ? "s" : ""})
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{description}</p>

            {/* Category */}
            <p className="text-sm italic text-gray-500">
                Category: <span className="text-gray-700">{category}</span>
            </p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
                {tags.map((tag, i) => (
                    <span
                        key={i}
                        className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};
