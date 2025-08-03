// src/pages/RegisterPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add registration logic
        console.log(form);
    };

    return (
        <div className=" flex items-center justify-center  p-4 py-20">
            <div className="w-full max-w-md bg-gradient-to-br from-gray-950 to-gray-800 border border-red-900 rounded-xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                    Create Account
                </h2>

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
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition duration-200"
                    >
                        Register
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
