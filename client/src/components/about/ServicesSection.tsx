const ServicesSection = () => {
    return (
        <section className="p-6 bg-gray-900">
            <div className="mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-red-700">
                    Services Offered
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                    <li className="bg-gray-800 p-3 rounded-lg border border-red-900 hover:shadow-red-900 transition">
                        🌿 Bridal Mehendi Packages
                    </li>
                    <li className="bg-gray-800 p-3 rounded-lg border border-red-900 hover:shadow-red-900 transition">
                        🌼 Engagement / Roka Ceremonies
                    </li>
                    <li className="bg-gray-800 p-3 rounded-lg border border-red-900 hover:shadow-red-900 transition">
                        🎨 Baby Showers & Godh Bharai
                    </li>
                    <li className="bg-gray-800 p-3 rounded-lg border border-red-900 hover:shadow-red-900 transition">
                        ✨ Karva Chauth & Teej Specials
                    </li>
                    <li className="bg-gray-800 p-3 rounded-lg border border-red-900 hover:shadow-red-900 transition">
                        💃 Party & Festival Designs
                    </li>
                    <li className="bg-gray-800 p-3 rounded-lg border border-red-900 hover:shadow-red-900 transition">
                        🪔 Diwali / Eid / Raksha Bandhan Themed Mehendi
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default ServicesSection;
