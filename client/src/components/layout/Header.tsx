// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignInAlt,
    faSignOutAlt,
    faUserCircle,
    faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../store/authStore';
import logo from "../../assets/logo.png";
import { useState } from 'react';

export const Header = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="bg-gray-950 text-red-600 font-semibold shadow-sm sticky top-0 z-50">
            <div className="mx-auto px-4 py-3 flex justify-between items-center">
                {/* Brand */}
                <Link to="/">
                    <img src={logo} alt="Indu Logo" className="h-12 w-15 object-contain" />
                </Link>

                {/* Navigation */}
                <nav className="flex gap-4 items-center text-lg relative">
                    <Link to="/design" className="hover:font-bold">Designs</Link>

                    {isAuthenticated ? (
                        <div className="relative">
                            {/* Avatar / Icon Button */}
                            <button
                                onClick={toggleMenu}
                                className="flex items-center gap-2 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-red-500" />
                                <span className="hidden sm:block text-red-500">
                                    {user?.name?.split(' ')[0] || 'User'}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-44 bg-red-300 rounded text-gray-800 z-50"
                                    onMouseLeave={closeMenu}
                                >
                                    <Link
                                        to="/bookings"
                                        onClick={closeMenu}
                                        className="px-4 py-2 hover:bg-red-100 hover:rounded flex items-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faCalendarCheck} />
                                        My Bookings
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            closeMenu();
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-red-100 hover:rounded flex items-center gap-2"
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-1 bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1 rounded"
                        >
                            <FontAwesomeIcon icon={faSignInAlt} />
                            <span className="hidden sm:inline">Login</span>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};
