import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandSparkles,
    faPhoneAlt,
    faEnvelope,
    faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faInstagram,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-950 text-gray-300 pt-12 pb-6 border-t border-gray-900 relative">
            {/* Decorative gradient line on top */}
            {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 via-red-900 to-red-950"></div> */}

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 gap-2">
                {/* Brand & About */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex items-center gap-2 text-2xl font-bold mb-4 text-white">
                        <FontAwesomeIcon icon={faHandSparkles} className="text-red-800" />
                        <span>MehendiArt</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
                        Premium Mehendi design services for weddings, festivals, and special occasions.
                        Every design is crafted with love and tradition.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="font-semibold text-red-800 mb-4 text-lg tracking-wide">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        {[
                            { label: 'Designs', to: '/designs' },
                            { label: 'Bookings', to: '/my-bookings' },
                            { label: 'Feedback', to: '/feedback' },
                            { label: 'Contact', to: '/contact' },
                            { label: 'Chat', to: '/chat' },
                        ].map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className="hover:text-red-800 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-center sm:items-start">
                    <h3 className="font-semibold text-red-800 mb-4 text-lg tracking-wide">
                        Contact Us
                    </h3>
                    <div className="space-y-3 text-gray-400 text-sm">
                        <p className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faPhoneAlt} className="text-red-900" />
                            +91 98765 43210
                        </p>
                        <p className="flex items-center gap-3 break-all">
                            <FontAwesomeIcon icon={faEnvelope} className="text-red-900" />
                            support@mehendiart.com
                        </p>
                        <p className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-900" />
                            Delhi, India
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-5 mt-5">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 hover:bg-red-900 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 hover:bg-red-900 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a
                            href="https://wa.me/9128753899?text=Hi%20Indu!%20I%20want%20to%20book%20a%20mehendi%20appointment."
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat on WhatsApp"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-900 hover:bg-red-900 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-900 mt-10 pt-4 text-center text-xs sm:text-sm text-gray-500">
                &copy; {year} MehendiArt. All rights reserved.
            </div>
        </footer>
    );
}
