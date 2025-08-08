import AboutHero from "../components/about/AboutHero";
import AwardsSection from "../components/about/AwardsSection";
import CultureSection from "../components/about/CultureSection";
import ExperienceSection from "../components/about/ExperienceSection";
import ServicesSection from "../components/about/ServicesSection";
import StorySection from "../components/about/StorySection";

const About = () => {
    return (
        <div className="bg-gray-950 text-gray-100">
            <AboutHero />
            <StorySection />
            <div className="grid grid-cols-1 md:grid-cols-2">
                <ServicesSection />
                <ExperienceSection />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <AwardsSection />
                <CultureSection />
            </div>
        </div>
    );
};

export default About;
