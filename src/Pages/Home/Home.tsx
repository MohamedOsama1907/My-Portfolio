import AboutSection from "../../Components/AboutSection/AboutSection";
import FeaturedProjectsSection from "../../Components/FeaturedProjectsSection/FeaturedProjectsSection";
import HeroSection from "../../Components/HeroSection/HeroSection";
import SkillsSection from "../../Components/SkillsSection/SkillsSection";
import EducationSection from "../../Components/EducationSection/EducationSection";
import WorkSection from "../../Components/WorkSection/WorkSection";

export default function Home() {
  return (
    <div className="w-full space-y-7 sm:space-y-15">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      {/* <ExperienceSection /> */}
      <FeaturedProjectsSection />
      <EducationSection />
      <WorkSection />
    </div>
  );
}
