import React from "react";
import { FaCheckCircle, FaHeart, FaPaintBrush, FaClock, FaHandsHelping } from "react-icons/fa";
import logo from "../../assets/logo.png";

const StorySection: React.FC = () => {
    return (
        <section className="relative p-6 bg-gradient-to-r from-gray-800 to-gray-950 overflow-hidden">
            <div className="mx-auto">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-red-800 drop-shadow-sm">
                        Our Mehendi Story
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        From timeless traditions to modern artistry, we bring dreams to life through the delicate beauty of mehendi.
                    </p>
                </div>

                {/* Story & Image */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Story Text */}
                    <div>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            For years, we have perfected the art of mehendi, blending heritage patterns with fresh, contemporary designs.
                            Our mission is simple — to create designs that are not only beautiful but also tell your unique story.
                            Whether it’s your wedding day, a festive celebration, or just a day to feel special, our henna will make it unforgettable.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaCheckCircle className="text-red-700 mt-1" />
                                <span className="text-gray-200"><strong>100% Natural Henna:</strong> Safe for all skin types, chemical-free, and deep staining.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaHeart className="text-red-700 mt-1" />
                                <span className="text-gray-200"><strong>Personalized Designs:</strong> From minimal elegance to intricate bridal patterns.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaPaintBrush className="text-red-700 mt-1" />
                                <span className="text-gray-200"><strong>Artistry with Passion:</strong> Every design is crafted with love and precision.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <img
                            src={logo}
                            alt="Mehendi Art"
                            className="w-full"
                        />
                        <div className="absolute -bottom-5 -right-5 bg-gray-900 border border-red-800 p-4 rounded-xl shadow-md">
                            <p className="text-red-500 font-bold text-lg">Serving since 2010</p>
                        </div>
                    </div>
                </div>

                {/* Service Types */}
                <div className="mt-10">
                    <h3 className="text-3xl font-semibold text-center text-red-800 mb-12">Our Services</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center">
                        <div className="bg-gray-900 border border-red-900 rounded-xl shadow-md p-6 hover:shadow-red-900 transition">
                            <FaHeart className="text-red-600 text-4xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2 text-gray-100">Bridal Mehendi</h4>
                            <p className="text-gray-400 text-sm">Intricate full-hand and foot designs tailored for your big day.</p>
                        </div>
                        <div className="bg-gray-900 border border-red-900 rounded-xl shadow-md p-6 hover:shadow-red-900 transition">
                            <FaPaintBrush className="text-red-600 text-4xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2 text-gray-100">Festival Designs</h4>
                            <p className="text-gray-400 text-sm">Celebrate Diwali, Eid, Karva Chauth & more with stunning patterns.</p>
                        </div>
                        <div className="bg-gray-900 border border-red-900 rounded-xl shadow-md p-6 hover:shadow-red-900 transition">
                            <FaClock className="text-red-600 text-4xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2 text-gray-100">Quick Mehendi</h4>
                            <p className="text-gray-400 text-sm">Minimal yet elegant designs for casual occasions.</p>
                        </div>
                        <div className="bg-gray-900 border border-red-900 rounded-xl shadow-md p-6 hover:shadow-red-900 transition">
                            <FaHandsHelping className="text-red-600 text-4xl mx-auto mb-4" />
                            <h4 className="font-semibold text-lg mb-2 text-gray-100">Custom Events</h4>
                            <p className="text-gray-400 text-sm">Corporate gatherings, baby showers, engagements & more.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StorySection;
