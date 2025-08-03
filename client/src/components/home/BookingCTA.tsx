import { useNavigate } from "react-router-dom";

interface Props {
    designId: string;
}

export const BookingCTA = ({ designId }: Props) => {
    const navigate = useNavigate();

    const handleBookingClick = () => {
        navigate(`/booking?designId=${designId}`);

    };

    return (
        <div className="p-8 rounded-lg bg-gradient-to-r from-gray-950 via-gray-900 to-gray-800 border border-red-800 shadow-lg text-center relative overflow-hidden">
            <h2 className="text-2xl font-extrabold text-white mb-2 drop-shadow">
                Ready to Book?
            </h2>

            <p className="text-gray-300 mb-6 text-sm sm:text-base max-w-xl mx-auto">
                Reserve your slot with your favorite <span className="text-red-500 font-medium">Mehendi design</span> and make your occasion unforgettable.
            </p>

            <button
                onClick={handleBookingClick}
                className="inline-block px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-200"
            >
                Book Now
            </button>
        </div>
    );
};
