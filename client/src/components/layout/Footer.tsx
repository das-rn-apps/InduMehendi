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
        <footer className="bg-gray-950 text-white pt-10 pb-6 border-t border-gray-800">
            <div className="max-w  px-4 grid grid-cols-3 gap-10 text-sm sm:text-base">
                {/* Brand & About */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-2 text-xl font-bold mb-3">
                        <FontAwesomeIcon icon={faHandSparkles} className="text-red-500" />
                        <span>MehendiArt</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-xs">
                        Premium Mehendi design services for weddings, festivals, and special occasions.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-semibold text-red-500 mb-3 text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300 text-xs">
                        {[
                            { label: 'Designs', to: '/design-gallery' },
                            { label: 'Book Slot', to: '/booking' },
                            { label: 'Feedback', to: '/feedback' },
                            { label: 'Contact', to: '/contact' },
                            { label: 'Chat', to: '/chat' },
                        ].map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className="hover:text-red-500 transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="font-semibold text-red-500 mb-3 text-lg">Contact Us</h3>
                    <div className="space-y-2 text-gray-300 text-xs">
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faPhoneAlt} /> +91 98765 43210
                        </p>
                        <p className="flex items-center gap-2 break-all">
                            <FontAwesomeIcon icon={faEnvelope} /> support@mehendiart.com
                        </p>
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Delhi, India
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-500 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-500 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-500 transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs sm:text-sm text-gray-500">
                &copy; {year} MehendiArt. All rights reserved.
            </div>
        </footer>
    );
}
