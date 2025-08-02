// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSignInAlt,
    faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../zustand/authStore';
import logo from "../../assets/logo.png";

export const Header = () => {
    const { isAuthenticated, user, logout } = useAuthStore();


    return (
        <header className="bg-gray-950 text-red-600 font-semibold shadow-sm sticky top-0 z-50">
            <div className="mx-auto px-4 py-3 flex justify-between items-center">
                {/* Brand */}
                <Link to="/">
                    <img
                        src={logo}
                        alt="Indu Logo"
                        className="h-12 w-12 object-contain"
                    />
                </Link>

                {/* Navigation */}
                <nav className="flex gap-4 items-center text-lg">
                    <Link to="/design" className="hover:font-bold">Designs</Link>
                    <Link to="/cart" className="hover:font-bold">Cart</Link>
                    {isAuthenticated && <Link to="/chat" className="hover:font-bold">Chat</Link>}

                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <span className="text-red-700 hidden sm:block">
                                Hi, {user?.name?.split(' ')[0] || 'User'}
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center gap-1 bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1 rounded"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
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
