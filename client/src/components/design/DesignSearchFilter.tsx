import { useEffect, useState } from "react";
import { useDesignStore } from "../../zustand/designStore";
import type { Design } from "../../types";
import { FaSearch, FaFilter } from "react-icons/fa";

interface Props {
    onFilter: (designs: Design[]) => void;
}

export const DesignSearchFilter = ({ onFilter }: Props) => {
    const { designs, fetchDesigns } = useDesignStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchDesigns();
    }, [fetchDesigns]);

    useEffect(() => {
        let filtered = designs;

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (d) =>
                    d.title.toLowerCase().includes(term) ||
                    d.description?.toLowerCase().includes(term)
            );
        }

        if (category) {
            filtered = filtered.filter((d) => d.category === category);
        }

        onFilter(filtered);
    }, [searchTerm, category, designs, onFilter]);

    const uniqueCategories = Array.from(
        new Set(designs.map((d) => d.category))
    ).filter(Boolean);

    return (
        <>
            {/* Search + Filter Button */}
            <div className="flex items-center mb-4 gap-3">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search designs..."
                        className="w-full pl-10 pr-4 py-2 h-11 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button
                    onClick={() => setModalOpen(true)}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-red-600 transition border border-gray-700 text-white"
                    title="Filter by category"
                >
                    <FaFilter />
                </button>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
                    <div className="bg-gray-900 border border-red-700 p-6 rounded-xl w-full max-w-xs text-white relative shadow-xl animate-fade-in">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
                        >
                            ✕
                        </button>

                        <h3 className="text-lg font-semibold mb-4 text-center text-red-500">
                            Filter by Category
                        </h3>

                        <select
                            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-600 outline-none"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setModalOpen(false); // close modal after selection
                            }}
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </>
    );
};
