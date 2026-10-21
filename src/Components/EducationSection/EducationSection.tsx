import { useEffect, useRef } from "react";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION = {
  degree: "Bachelor of Engineering",
  specialization: "Systems & Computer Engineering",
  institution: "Al-Azhar University",
  faculty: "Faculty of Engineering",
  location: "Cairo, Egypt",
  startDate: "October 2023",
  endDate: "Present",
};

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<HTMLHeadingElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Heading word reveal ---
      if (headingWordsRef.current) {
        const words =
          headingWordsRef.current.querySelectorAll(".edu-heading-word");
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

      // --- Accent line grows ---
      if (accentLineRef.current) {
        gsap.fromTo(
          accentLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      // --- Card content stagger ---
      if (cardRef.current) {
        const items = cardRef.current.querySelectorAll(".edu-reveal");
        gsap.fromTo(
          items,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );
      }

      // --- Floating detail chips ---
      if (cardRef.current) {
        const chips = cardRef.current.querySelectorAll(".edu-chip");
        gsap.fromTo(
          chips,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 75%",
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
      aria-labelledby="education-title"
      className="w-full py-4 sm:py-6"
    >
      {/* Section heading */}
      <h2
        ref={headingWordsRef}
        id="education-title"
        className="font-[Bebas_Neue] text-[29px] uppercase leading-none text-[#111111] dark:text-[#F5F5F5] sm:text-[36px]"
      >
        <span className="inline-block overflow-hidden py-1">
          <span className="edu-heading-word inline-block">Education</span>
        </span>
      </h2>

      {/* Education card */}
      <div
        ref={cardRef}
        className="relative mt-8 overflow-hidden rounded-[22px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] sm:mt-10"
      >
        {/* Accent bar — left side */}
        <div
          ref={accentLineRef}
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-[4px] origin-top bg-[#111111] dark:bg-white sm:w-[5px]"
        />

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

        <div className="relative flex flex-col gap-6 px-6 py-7 sm:gap-7 sm:px-9 sm:py-9 md:flex-row md:items-start md:gap-10 lg:px-10 lg:py-10">
          {/* Left: Icon + Degree */}
          <div className="min-w-0 flex-1">
            {/* Degree icon badge */}
            <div className="edu-reveal flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#181818] text-[#111111] dark:text-[#F5F5F5] sm:size-14 sm:rounded-[18px]">
                <GraduationCap
                  aria-hidden="true"
                  className="size-6 sm:size-7"
                  strokeWidth={1.6}
                />
              </span>
              <div className="min-w-0">
                <p className="font-[Bebas_Neue] text-[22px] uppercase leading-none tracking-wide text-[#111111] dark:text-[#F5F5F5] sm:text-[26px]">
                  {EDUCATION.degree}
                </p>
                <p className="mt-1 text-sm leading-snug text-neutral-500 dark:text-neutral-400 sm:text-[15px]">
                  {EDUCATION.specialization}
                </p>
              </div>
            </div>

            {/* Detail rows */}
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:gap-3.5">
              {/* Institution */}
              <div className="edu-reveal flex items-center gap-3">
                <BookOpen
                  aria-hidden="true"
                  className="size-[18px] shrink-0 text-neutral-400 dark:text-neutral-500"
                  strokeWidth={1.8}
                />
                <p className="text-sm text-[#111111] dark:text-[#F5F5F5] sm:text-[15px]">
                  <span className="font-semibold">{EDUCATION.institution}</span>
                  <span className="mx-1.5 text-neutral-300 dark:text-neutral-600">·</span>
                  <span className="text-neutral-500 dark:text-neutral-400">{EDUCATION.faculty}</span>
                </p>
              </div>

              {/* Location */}
              <div className="edu-reveal flex items-center gap-3">
                <MapPin
                  aria-hidden="true"
                  className="size-[18px] shrink-0 text-neutral-400 dark:text-neutral-500"
                  strokeWidth={1.8}
                />
                <p className="text-sm text-neutral-500 dark:text-neutral-400 sm:text-[15px]">
                  {EDUCATION.location}
                </p>
              </div>

              {/* Duration */}
              <div className="edu-reveal flex items-center gap-3">
                <Calendar
                  aria-hidden="true"
                  className="size-[18px] shrink-0 text-neutral-400 dark:text-neutral-500"
                  strokeWidth={1.8}
                />
                <p className="text-sm text-neutral-500 dark:text-neutral-400 sm:text-[15px]">
                  {EDUCATION.startDate}
                  <span className="mx-1.5 text-neutral-300 dark:text-neutral-600">—</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#111111] dark:text-[#F5F5F5]">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full bg-[#21c66b] motion-reduce:animate-none"
                      style={{
                        animation: "edu-pulse 2s ease-in-out infinite",
                      }}
                    />
                    {EDUCATION.endDate}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Decorative tech chips */}
          <div className="flex flex-wrap gap-2 md:mt-1 md:max-w-[240px] md:justify-end lg:max-w-[280px]">
            {[
              "Java",
              "Data Structures",
              "Algorithms",
              "OOP",
              "Computer Architecture",
              "Networking",
              "Databases",
              "Operating Systems",
            ].map((subject) => (
              <span
                key={subject}
                className="edu-chip rounded-full border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#181818] px-3 py-1.5 font-[Bebas_Neue] text-[13px] uppercase leading-none tracking-wide text-neutral-500 dark:text-neutral-400 transition-colors duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:text-[#111111] dark:hover:text-[#F5F5F5] sm:text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
