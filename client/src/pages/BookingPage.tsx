import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useDesignStore } from "../zustand/designStore";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../components/ui/Loader";

export default function BookingPage() {
    const [searchParams] = useSearchParams();
    const designId = searchParams.get("designId");

    const {
        currentDesign,
        getDesignById,
        fetchDesignById,
    } = useDesignStore();

    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
        location: "",
        date: "",
        note: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ designId, ...form });
        alert("Booking submitted!");
        // TODO: Send to backend
    };

    useEffect(() => {
        const loadDesign = async () => {
            if (!designId) return;
            const cached = getDesignById(designId);
            if (!cached) {
                setLoading(true);
                const fetched = await fetchDesignById(designId);
                setNotFound(!fetched);
                setLoading(false);
            }
        };

        loadDesign();
    }, [designId, getDesignById, fetchDesignById]);

    const design = getDesignById(designId!) || currentDesign;

    if (!designId) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                No design ID provided.
            </div>
        );
    }

    if (loading) {
        return (
            <Loader message="Loading..." />
        );
    }

    if (notFound || !design) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Design not found
            </div>
        );
    }

    return (
        <div className=" p-3 flex flex-col lg:flex-row items-start justify-center gap-8">
            <div className="w-full">
                <Card design={design} showDetails={true} />
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-red-700 rounded-xl p-6 w-full  shadow-lg text-white"
            >
                <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Book Your Mehendi Slot</h2>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    type="email"
                    required
                    className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    required
                    className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Your Location"
                    required
                    className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Additional Notes"
                    rows={3}
                    className="w-full mb-4 p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition">
                    Confirm Booking
                </Button>
            </form>
        </div>
    );
}
