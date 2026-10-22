import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  PROJECTS_DATA as PROJECTS,
  type Category,
  type ProjectItem,
} from "../../data/projectsData";
import ProjectModal from "../../Components/ProjectModal/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export type { Category, ProjectItem };

const CATEGORIES: { label: Category; count: number }[] = [
  { label: "All", count: PROJECTS.length },
  {
    label: "Web Applications",
    count: PROJECTS.filter((p) => p.category === "Web Applications").length,
  },
  {
    label: "Landing Pages",
    count: PROJECTS.filter((p) => p.category === "Landing Pages").length,
  },
  {
    label: "Education & Learning",
    count: PROJECTS.filter((p) => p.category === "Education & Learning").length,
  },
  {
    label: "Entertainment & Games",
    count: PROJECTS.filter((p) => p.category === "Entertainment & Games").length,
  },
  {
    label: "Portfolio",
    count: PROJECTS.filter((p) => p.category === "Portfolio").length,
  },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalProject, setActiveModalProject] =
    useState<ProjectItem | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldScrollToProjects = useRef(false);

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);
  const projectsPerPage = 9;
  const pageCount =
    selectedCategory === "All"
      ? Math.ceil(filteredProjects.length / projectsPerPage)
      : 1;
  const visibleProjects =
    selectedCategory === "All"
      ? filteredProjects.slice(
          (currentPage - 1) * projectsPerPage,
          currentPage * projectsPerPage,
        )
      : filteredProjects;

  const changePage = (page: number) => {
    shouldScrollToProjects.current = true;
    setCurrentPage(page);
  };

  // Initial page entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading word reveal
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".proj-heading-word");
        gsap.fromTo(
          words,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
          },
        );
      }

      // 2. Filters bar fade up
      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.15,
            ease: "power3.out",
          },
        );
      }

      // 3. Project cards staggered entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".project-card-item");
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.25,
            ease: "power3.out",
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filter change animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card-item");
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
        },
      );
    }
  }, [selectedCategory, currentPage]);

  // Scroll to the section heading after the newly selected page has rendered.
  useEffect(() => {
    if (!shouldScrollToProjects.current) return;
    shouldScrollToProjects.current = false;

    headingRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, [currentPage]);

  return (
    <div ref={containerRef} className="w-full py-4 pb-15 sm:py-6">
      {/* Header section matching reference design */}
      <header className="max-w-3xl">
        <h2
          ref={headingRef}
          className="scroll-mt-20 font-[Bebas_Neue] text-[29px] uppercase leading-none text-[#111111] dark:text-[#F5F5F5] sm:text-[48px]">
          <span className="inline-block overflow-hidden py-1">
            <span className="proj-heading-word inline-block">Projects</span>
          </span>
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-base">
          Selected frontend applications, client work, and interactive digital
          experiences built with modern technologies. Click any project for full
          details.
        </p>
      </header>

      {/* Category filter pills */}
      <nav
        ref={filtersRef}
        aria-label="Filter projects by category"
        className="mt-7 flex flex-wrap items-center gap-2 sm:mt-9 sm:gap-2.5">
        {CATEGORIES.map(({ label, count }) => {
          const isActive = selectedCategory === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => {
                setSelectedCategory(label);
                setCurrentPage(1);
              }}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white sm:text-sm ${
                isActive
                  ? "bg-[#111111] text-white shadow-sm dark:bg-white dark:text-[#111111]"
                  : "border border-neutral-200/90 bg-white text-neutral-600 hover:border-neutral-400 hover:text-[#111111] dark:border-neutral-800 dark:bg-[#161616] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white"
              }`}>
              <span>{label}</span>
              <span
                className={`grid size-5 place-items-center rounded-full font-geist-mono text-[11px] font-bold ${
                  isActive
                    ? "bg-white/20 text-white dark:bg-black/15 dark:text-[#111111]"
                    : "bg-neutral-100 text-neutral-500 dark:bg-[#222222] dark:text-neutral-400"
                }`}>
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Projects Grid */}
      <main
        ref={gridRef}
        aria-label="Projects list"
        className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-3 sm:gap-7">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="project-card-item group relative flex flex-col overflow-hidden rounded-[22px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] dark:hover:border-neutral-700 dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]">
            {/* About-style subtle grid overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Project Image Showcase with Badge */}
            <div
              onClick={() => setActiveModalProject(project)}
              className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden border-b border-neutral-100 bg-neutral-100 dark:border-neutral-800/80 dark:bg-[#181818]">
              <img
                src={project.image}
                alt={`${project.name} preview`}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />

              {/* Status / Category Badge on Top-Left */}
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-black/5 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#111111] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/80 dark:text-[#F5F5F5]">
                <Sparkles className="size-3 text-amber-500" aria-hidden="true" />
                <span>{project.badge}</span>
              </div>

              {/* Subtle hover gradient indicator */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Card Content Area */}
            <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
              {/* Category label */}
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                {project.category}
              </span>

              {/* Project title */}
              <h2
                onClick={() => setActiveModalProject(project)}
                className="mt-1 cursor-pointer font-[Bebas_Neue] text-2xl uppercase tracking-wide text-[#111111] transition-colors hover:text-neutral-600 dark:text-[#F5F5F5] dark:hover:text-neutral-300 sm:text-[26px]">
                {project.name}
              </h2>

              {/* Description */}
              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>

              {/* Technologies tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-200/90 bg-neutral-50 px-2.5 py-0.5 text-[11px] font-medium text-neutral-600 dark:border-neutral-800 dark:bg-[#1a1a1a] dark:text-neutral-300">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="rounded-full border border-transparent bg-neutral-100 px-2 py-0.5 font-geist-mono text-[10px] font-bold text-neutral-500 dark:bg-[#222222] dark:text-neutral-400">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Action row at bottom */}
              <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/80">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 font-[Bebas_Neue] text-base tracking-wide text-[#111111] transition-colors hover:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:text-[#F5F5F5] dark:hover:text-neutral-300 dark:focus-visible:outline-white sm:text-lg">
                  View details
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>

                {/* Direct quick action links */}
                <div className="flex items-center gap-1.5">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open live demo for ${project.name}`}
                      title="Live Demo"
                      className="grid size-8 place-items-center rounded-full border border-neutral-200/90 bg-white text-neutral-600 transition-colors hover:border-[#111111] hover:bg-[#111111] hover:text-white dark:border-neutral-800 dark:bg-[#181818] dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111]">
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View GitHub repository for ${project.name}`}
                      title="Source Code"
                      className="grid size-8 place-items-center rounded-full border border-neutral-200/90 bg-white text-neutral-600 transition-colors hover:border-[#111111] hover:bg-[#111111] hover:text-white dark:border-neutral-800 dark:bg-[#181818] dark:text-neutral-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111]">
                      <FaGithub className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      {selectedCategory === "All" && pageCount > 1 && (
        <nav
          aria-label="Project pages"
          className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Show previous projects"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-[#111111] disabled:pointer-events-none disabled:opacity-40 dark:border-neutral-800 dark:bg-[#161616] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white">
            <ChevronLeft aria-hidden="true" className="size-4" />
            Previous
          </button>
          <span
            aria-live="polite"
            className="min-w-16 text-center font-geist-mono text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            {currentPage} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === pageCount}
            aria-label="Show next projects"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-4 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:text-[#111111] disabled:pointer-events-none disabled:opacity-40 dark:border-neutral-800 dark:bg-[#161616] dark:text-neutral-300 dark:hover:border-neutral-600 dark:hover:text-white">
            Next
            <ChevronRight aria-hidden="true" className="size-4" />
          </button>
        </nav>
      )}

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}
