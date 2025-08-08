import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useDesignStore } from "../store/designStore";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader } from "../components/ui/Loader";
import { useBookingStore } from "../store/bookingStore";
import { useAuthStore } from "../store/authStore";

export default function BookingPage() {
    const [searchParams] = useSearchParams();
    const designId = searchParams.get("designId");
    const user = useAuthStore().user;


    const { currentDesign, getDesignById, fetchDesignById } = useDesignStore();
    const { addBooking } = useBookingStore();

    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        contact: "",
        address: "",
        location: "",
        hand: "both",
        personType: "guest",
        personCount: 1,
        bookingDate: "",
        bookingTime: "",
        notes: "",
    });


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const bookingData = {
                ...(designId ? { design: designId } : {}),
                user: user?._id,
                ...form,
            };

            if (!form.name || !form.email || !form.phone || !form.bookingDate || !form.bookingTime) {
                alert("Please fill all required fields before submitting.");
                return;
            }

            const result = await addBooking(bookingData);

            if (result) {
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    contact: "",
                    address: "",
                    location: "",
                    hand: "both",
                    personType: "guest",
                    personCount: 1,
                    bookingDate: "",
                    bookingTime: "",
                    notes: "",
                });
            } else {
                alert("Failed to submit booking");
            }
        } catch (err: any) {
            console.error("Booking error:", err);
            alert(err?.response?.data?.message || err?.message || "Something went wrong");
        }
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

    const design = designId ? getDesignById(designId) || currentDesign : null;

    if (loading) {
        return <Loader message="Loading..." />;
    }

    if (designId && (notFound || !design)) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Design not found
            </div>
        );
    }

    return (
        <div className="p-3 flex flex-col lg:flex-row items-start justify-center gap-8">
            {/* Show design card only if designId is provided */}
            {design ? (
                <div className="w-full lg:w-1/2">
                    <Card design={design} showDetails={true} />
                </div>
            ) : (
                <Designs showSelectMessage={true} />
            )}

            {/* Booking form */}
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-red-700 rounded-xl p-6 w-full shadow-lg text-white grid grid-cols-1 md:grid-cols-2 gap-2"
            >
                <h2 className="md:col-span-2 text-2xl font-bold text-red-500 mb-2 text-center">
                    Book Your Mehendi Slot
                </h2>

                {/* Name */}
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Email */}
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Contact */}
                <input
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Alternate Contact Number"
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Phone */}
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Primary Phone Number"
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Address */}
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Full Address"
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Location */}
                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Event Location"
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Hand */}
                <select
                    name="hand"
                    value={form.hand}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="both">Both</option>
                </select>

                {/* Person Type */}
                <select
                    name="personType"
                    value={form.personType}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                >
                    <option value="bride">Bride</option>
                    <option value="groom">Groom</option>
                    <option value="guest">Guest</option>
                    <option value="other">Other</option>
                </select>

                {/* Person Count */}
                <input
                    name="personCount"
                    type="number"
                    value={form.personCount}
                    onChange={handleChange}
                    placeholder="Number of Persons"
                    min={1}
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Booking Date */}
                <input
                    name="bookingDate"
                    type="date"
                    value={form.bookingDate}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Booking Time */}
                <input
                    name="bookingTime"
                    type="time"
                    value={form.bookingTime}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                {/* Notes */}
                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Additional Notes"
                    rows={3}
                    className="md:col-span-2 w-full p-2 rounded bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-red-600 outline-none"
                />

                <Button
                    type="submit"
                    className="md:col-span-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    Confirm Booking
                </Button>
            </form>

        </div>
    );
}

function Designs({ showSelectMessage = false }) {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            {showSelectMessage && (
                <div className="bg-gray-900 border border-red-700 text-center text-red-400 p-3 rounded-lg mb-4">
                    Please select a design to proceed with booking.
                </div>
            )}

            <div className="flex justify-center">
                <Button
                    onClick={() => navigate("/designs")}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Go to Designs
                </Button>
            </div>
        </div>
    );
}
