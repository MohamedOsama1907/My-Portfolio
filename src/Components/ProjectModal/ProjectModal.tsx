import { useEffect, useId } from "react";
import { ExternalLink, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { ProjectItem } from "../../data/projectsData";

export type ProjectModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalTitleId = useId();
  const modalDescriptionId = useId();

  // Escape key & body scroll lock handling
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      aria-describedby={modalDescriptionId}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-sm transition-opacity duration-200">
      <div className="custom-scrollbar overscroll-contain relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-[#121212]">
        {/* Subtle grid pattern overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Modal Header Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100 dark:bg-[#181818]">
          <img
            src={project.image}
            alt={project.name}
            className="size-full object-cover object-top"
          />
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-black/10 bg-white/90 text-[#111111] shadow-md backdrop-blur-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:border-white/10 dark:bg-black/90 dark:text-[#F5F5F5] dark:focus-visible:outline-white">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Content - Structured to match reference design */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Category / Label */}
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 sm:text-sm">
            {project.category}
          </p>

          {/* Project Title */}
          <h3
            id={modalTitleId}
            className="mt-1 font-[Bebas_Neue] text-3xl uppercase tracking-wide text-[#111111] dark:text-[#F5F5F5] sm:text-4xl md:text-[42px] leading-tight">
            {project.name}
          </h3>

          {/* Introductory Description */}
          <p
            id={modalDescriptionId}
            className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-[15px]">
            {project.longDescription || project.description}
          </p>

          {/* Tech Stack Section */}
          <div className="mt-7">
            <h4 className="font-[Bebas_Neue] text-lg uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] sm:text-xl">
              Tech Stack
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-200/90 bg-neutral-100/80 px-3.5 py-1 text-xs font-medium text-neutral-700 dark:border-neutral-800 dark:bg-[#1a1a1a] dark:text-neutral-300 sm:text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Overview / Highlights Section */}
          {project.highlights?.length ? (
            <div className="mt-7">
              <h4 className="font-[Bebas_Neue] text-lg uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] sm:text-xl">
                Overview
              </h4>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-[15px]">
                {project.highlights.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Action Links: Live Demo & GitHub */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:bg-white dark:text-[#111111] dark:focus-visible:outline-white">
                <span>Open Live Demo</span>
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200/90 bg-white px-6 py-3 text-sm font-semibold text-[#111111] transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:border-neutral-800 dark:bg-[#181818] dark:text-[#F5F5F5] dark:focus-visible:outline-white">
                <FaGithub className="size-4" aria-hidden="true" />
                <span>View GitHub Repo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
