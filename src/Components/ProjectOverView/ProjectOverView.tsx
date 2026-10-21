import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { Project } from "../Carousel/Carousel";

type ProjectOverViewProps = {
  project: Project;
};

export default function ProjectOverView({ project }: ProjectOverViewProps) {
  return (
    <div className="mt-8 sm:mt-9">
      <article
        aria-live="polite"
        className="relative overflow-hidden rounded-[22px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8">
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

        <div className="relative z-10">
          <h3 className="font-[Bebas_Neue] text-2xl uppercase leading-none tracking-wide text-[#111111] dark:text-[#F5F5F5] sm:text-[28px]">
            {project.name}
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[#666] dark:text-neutral-400 font-normal sm:leading-7">
            {project.description ??
              "Explore this project and its responsive interface."}
          </p>

          {project.technologies?.length ? (
            <ul
              aria-label="Technologies used"
              className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1c1c1c] px-3.5 py-1.5 font-[Bebas_Neue] text-sm leading-none text-neutral-700 dark:text-neutral-300 sm:text-base">
                  {technology}
                </li>
              ))}
            </ul>
          ) : null}

          {project.details ? (
            <Link
              to={project.details}
              className="mt-5 inline-flex min-h-10 items-center gap-2 font-[Bebas_Neue] text-base tracking-wide text-[#111111] dark:text-[#F5F5F5] transition-colors hover:text-neutral-500 dark:hover:text-neutral-300 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] dark:focus-visible:outline-white sm:mt-6 sm:text-lg">
              View details
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          ) : null}
        </div>
      </article>

      <div className="mt-7 flex justify-center sm:mt-9">
        <Link
          to="/Projects"
          className="inline-flex py-3 px-6 items-center justify-center rounded-full bg-[#111111] dark:bg-white text-sm font-semibold text-white dark:text-[#111111] transition-transform duration-200 hover:scale-[1.03] dark:hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] dark:focus-visible:outline-white active:scale-[0.98] motion-reduce:transition-none sm:min-h-14 sm:px-8 sm:text-base">
          See More Projects
        </Link>
      </div>
    </div>
  );
}
