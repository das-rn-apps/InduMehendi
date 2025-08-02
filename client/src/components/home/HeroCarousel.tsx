import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import bridalImg from "../../assets/images/man.png";
import festivalImg from "../../assets/images/lion.png";
import modernImg from "../../assets/images/bucket.png";
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";

const slides = [
    { image: bridalImg, label: "Bridal Designs", alt: "Bridal Mehendi" },
    { image: logo2, label: "Festival Specials", alt: "Festival Mehendi" },
    { image: modernImg, label: "Modern Mehendi", alt: "Modern Art" },
    { image: logo, label: "Modern Logo", alt: "Modern Logo" },
    { image: festivalImg, label: "Festival Animal", alt: "Festival Animal" },
];

export const HeroCarousel = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            interval={3000}
            stopOnHover={true}
            swipeable={true}
            emulateTouch={true}
            className="overflow-hidden h-[46vh] self-center"
        >
            {slides.map((slide, index) => (
                <div key={index}>
                    <img src={slide.image} alt={slide.alt} className="object-cover w-full h-[46vh]" />
                    <p className="legend">{slide.label}</p>
                </div>
            ))}
        </Carousel>
    );
};
