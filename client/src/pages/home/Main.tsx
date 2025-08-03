// src/pages/HomePage.tsx

import { BookingCTA } from "../../components/home/BookingCTA";
import { ExploreSection } from "../../components/home/ExploreSection";
import { HeroCarousel } from "../../components/home/HeroCarousel";
import { MostPicked } from "../../components/home/MostPicked";

export default function HomePage() {
    return (
        <div className="space-y-3">
            <HeroCarousel />
            <MostPicked />
            <ExploreSection />
            <BookingCTA designId={""} />
        </div>
    );
}
