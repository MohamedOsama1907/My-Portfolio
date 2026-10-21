import { useEffect, useRef, useState } from "react";
import Carousel, { type Project } from "../Carousel/Carousel";
import ProjectOverView from "../ProjectOverView/ProjectOverView";
import ProjectModal from "../ProjectModal/ProjectModal";
import type { ProjectItem } from "../../data/projectsData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingWordsRef = useRef<HTMLHeadingElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Heading word reveal ---
      if (headingWordsRef.current) {
        const words =
          headingWordsRef.current.querySelectorAll(".fp-heading-word");
        gsap.fromTo(
          words,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingWordsRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // --- Carousel container reveal ---
      if (carouselWrapRef.current) {
        gsap.fromTo(
          carouselWrapRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselWrapRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-projects-title"
      className="w-full py-7"
    >
      <h2
        ref={headingWordsRef}
        id="featured-projects-title"
        className="font-[Bebas_Neue] text-[29px] uppercase leading-none text-[#111111] dark:text-[#F5F5F5] sm:text-[36px]"
      >
        <span className="inline-block overflow-hidden py-1">
          <span className="fp-heading-word inline-block">Featured</span>
        </span>{" "}
        <span className="inline-block overflow-hidden py-1">
          <span className="fp-heading-word inline-block">Projects</span>
        </span>
      </h2>
      <div ref={carouselWrapRef} className="mt-10 sm:mt-14">
        <Carousel
          onProjectChange={setSelectedProject}
          onViewDetails={(proj) => setModalProject(proj as unknown as ProjectItem)}
        />
      </div>
      {selectedProject ? (
        <ProjectOverView
          project={selectedProject}
          onViewDetails={(proj) => setModalProject(proj as unknown as ProjectItem)}
        />
      ) : null}

      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
}
