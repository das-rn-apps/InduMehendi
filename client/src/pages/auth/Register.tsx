// src/pages/RegisterPage.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const {
        register,
        isLoading,
        error,
        isAuthenticated,
        setError,
    } = useAuthStore();

    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const success = await register(form.name, form.email, form.password);
        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="flex items-center justify-center p-4 py-20">
            <div className="w-full max-w-md bg-gradient-to-br from-gray-950 to-gray-800 border border-red-900 rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Create Account
                </h2>

                {error && (
                    <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300 mb-1 block">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition duration-200 disabled:opacity-50"
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-sm text-gray-400 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
