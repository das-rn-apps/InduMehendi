import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Images
import Deepak from "../../assets/images/man.png";
import modernImg from "../../assets/images/bucket.png";
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";
import mehendi1 from "../../assets/images/1.png";
import mehendi2 from "../../assets/images/2.png";
import mehendi3 from "../../assets/images/3.png";
import mehendi4 from "../../assets/images/4.png";
import mehendi5 from "../../assets/images/5.png";
import mehendi6 from "../../assets/images/6.png";
import mehendi7 from "../../assets/images/7.png";
import mehendi8 from "../../assets/images/8.png";

// Slide data
const slides = [
    mehendi1,
    mehendi2,
    mehendi3,
    mehendi4,
    mehendi5,
    mehendi6,
    mehendi7,
    mehendi8,
    logo2,
    modernImg,
    logo,
    Deepak,
].map((img, i) => ({
    image: img,
    label: `Slide ${i + 1}`,
    alt: `Slide ${i + 1}`,
}));

export const HeroCarousel = () => (
    <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={3000}
        stopOnHover
        swipeable
        emulateTouch
        className="overflow-hidden h-[46vh] self-center"
    >
        {slides.map(({ image, alt, label }, i) => (
            <div key={i}>
                <img src={image} alt={alt} className="object-cover w-full h-[46vh]" />
                <p className="legend">{label}</p>
            </div>
        ))}
    </Carousel>
);
