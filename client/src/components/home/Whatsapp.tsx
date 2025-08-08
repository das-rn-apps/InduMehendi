// src/components/common/WhatsAppFloater.tsx
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppFloater = () => {
    const whatsappNumber = "9128753899"; // Replace with your actual number

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=Hi%20Indu!%20I%20want%20to%20book%20a%20mehendi%20appointment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300"
            title="Chat on WhatsApp"
        >
            <FaWhatsapp size={25} />
            <span className="font-medium inline">Chat on WhatsApp</span>
        </a>
    );
};

export default WhatsAppFloater;
