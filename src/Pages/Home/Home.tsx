import AboutSection from "../../Components/AboutSection/AboutSection";
import FeaturedProjectsSection from "../../Components/FeaturedProjectsSection/FeaturedProjectsSection";
import HeroSection from "../../Components/HeroSection/HeroSection";
import SkillsSection from "../../Components/SkillsSection/SkillsSection";
import EducationSection from "../../Components/EducationSection/EducationSection";
import WorkSection from "../../Components/WorkSection/WorkSection";
import SEO from "../../Components/SEO/SEO";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="w-full space-y-7 sm:space-y-15">
      <SEO
        title={t("seo.homeTitle")}
        description={t("seo.homeDescription")}
        keywords={t("seo.homeKeywords")}
        canonicalPath="/"
        ogType="profile"
      />
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
