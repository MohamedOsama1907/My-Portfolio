import { useEffect, useRef } from "react";
import {
  Code2,
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headingWordsRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Heading word reveal ---
      if (headingWordsRef.current) {
        const words = headingWordsRef.current.querySelectorAll(
          ".about-heading-word",
        );
        gsap.fromTo(
          words,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headingWordsRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      // --- Card content stagger ---
      if (cardRef.current) {
        const items = cardRef.current.querySelectorAll(".about-reveal");
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

      // --- Detail chips / badges ---
      if (cardRef.current) {
        const chips = cardRef.current.querySelectorAll(".about-chip");
        gsap.fromTo(
          chips,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
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
      aria-labelledby="about-title"
      className="w-full py-4 sm:py-6"
    >
      {/* Section Header: Label + Animated Heading */}
      <h2
        ref={headingWordsRef}
        id="about-title"
        className="font-[Bebas_Neue] text-[29px] uppercase leading-none text-[#111111] dark:text-[#F5F5F5] sm:text-[36px]"
      >
        <span className="inline-block overflow-hidden py-1">
          <span className="about-heading-word inline-block">About Me</span>
        </span>
      </h2>

      {/* About Main Card */}
      <div
        ref={cardRef}
        className="relative mt-8 overflow-hidden rounded-[22px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] sm:mt-10"
      >
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

        <div className="relative flex flex-col gap-8 px-6 py-7 sm:gap-10 sm:px-9 sm:py-9 lg:flex-row lg:items-start lg:gap-12 lg:px-10 lg:py-10">
          {/* Left Column: Core Narrative (Paragraph 1 & 2) */}
          <div className="min-w-0 flex-1 space-y-6">
            {/* Header intro badge */}
            <div className="about-reveal flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#1a1a1a] text-[#111111] dark:text-[#F5F5F5] sm:size-14 sm:rounded-[18px]">
                <Code2
                  aria-hidden="true"
                  className="size-6 sm:size-7"
                  strokeWidth={1.6}
                />
              </span>
              <div>
                <p className="font-[Bebas_Neue] text-[20px] uppercase leading-none tracking-wide text-[#111111] dark:text-[#F5F5F5] sm:text-[24px]">
                  Frontend Engineering & UX Design
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 sm:text-sm">
                  Responsive Web Applications · User-Centered Design
                </p>
              </div>
            </div>

            {/* Paragraph 1 */}
            <p className="about-reveal text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[16px] sm:leading-loose">
              I&apos;m a{" "}
              <span className="font-semibold text-[#111111] dark:text-[#F5F5F5]">
                Frontend Developer
              </span>{" "}
              focused on creating modern, responsive, and user-friendly web
              experiences. I pay close attention to visual design, thoughtful
              color choices, and building interfaces that work smoothly across
              different screen sizes.
            </p>

            {/* Paragraph 2 */}
            <p className="about-reveal text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[16px] sm:leading-loose">
              I care about more than just how a website looks. I also focus on{" "}
              <span className="font-semibold text-[#111111] dark:text-[#F5F5F5]">code quality</span>
              ,{" "}
              <span className="font-semibold text-[#111111] dark:text-[#F5F5F5]">performance</span>,
              and solving real user problems through technology.
            </p>

            {/* Core Values highlight row */}
            <div className="about-reveal grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#181818] p-3 text-center sm:p-3.5">
                <Sparkles
                  className="mx-auto size-4 text-[#111111] dark:text-[#F5F5F5]"
                  strokeWidth={1.8}
                />
                <span className="mt-1.5 block font-[Bebas_Neue] text-[13px] uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] sm:text-sm">
                  Attention to Detail
                </span>
              </div>
              <div className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#181818] p-3 text-center sm:p-3.5">
                <Layers
                  className="mx-auto size-4 text-[#111111] dark:text-[#F5F5F5]"
                  strokeWidth={1.8}
                />
                <span className="mt-1.5 block font-[Bebas_Neue] text-[13px] uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] sm:text-sm">
                  Clean Architecture
                </span>
              </div>
              <div className="col-span-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#181818] p-3 text-center sm:col-span-1 sm:p-3.5">
                <Compass
                  className="mx-auto size-4 text-[#111111] dark:text-[#F5F5F5]"
                  strokeWidth={1.8}
                />
                <span className="mt-1.5 block font-[Bebas_Neue] text-[13px] uppercase tracking-wider text-[#111111] dark:text-[#F5F5F5] sm:text-sm">
                  User First
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Projects & Broadened Scope (Paragraph 3 & 4) */}
          <div className="flex flex-col gap-6 lg:w-[420px] lg:shrink-0">
            {/* Box 1: Experience & Integration (Paragraph 3) */}
            <div className="about-reveal rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#181818] p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <Terminal className="size-4 text-neutral-400" strokeWidth={2} />
                <h3 className="font-[Bebas_Neue] text-lg uppercase tracking-wide text-[#111111] dark:text-[#F5F5F5]">
                  Hands-on Experience
                </h3>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[15px]">
                Through personal projects like{" "}
                <span className="font-semibold text-[#111111] dark:text-[#F5F5F5]">FreshCart</span>,
                a feature-rich e-commerce platform, and a social app with a
                variety of features, I&apos;ve worked on building frontend
                experiences and integrating them with APIs and backend services.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="about-chip rounded-full border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-[#222222] px-3 py-1 font-[Bebas_Neue] text-[12px] uppercase tracking-wide text-neutral-600 dark:text-neutral-300 sm:text-[13px]">
                  FreshCart E-Commerce
                </span>
                <span className="about-chip rounded-full border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-[#222222] px-3 py-1 font-[Bebas_Neue] text-[12px] uppercase tracking-wide text-neutral-600 dark:text-neutral-300 sm:text-[13px]">
                  Social Platform
                </span>
                <span className="about-chip rounded-full border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-[#222222] px-3 py-1 font-[Bebas_Neue] text-[12px] uppercase tracking-wide text-neutral-600 dark:text-neutral-300 sm:text-[13px]">
                  REST APIs
                </span>
              </div>
            </div>

            {/* Box 2: Continuous Growth (Paragraph 4) */}
            <div className="about-reveal rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#181818] p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <ShieldCheck
                  className="size-4 text-neutral-400"
                  strokeWidth={2}
                />
                <h3 className="font-[Bebas_Neue] text-lg uppercase tracking-wide text-[#111111] dark:text-[#F5F5F5]">
                  Continuous Learning
                </h3>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[15px]">
                I&apos;m continuously improving my skills and exploring backend
                development, software engineering, and cybersecurity to broaden
                my understanding of how complete digital products are designed
                and built.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="about-chip rounded-full border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-[#222222] px-3 py-1 font-[Bebas_Neue] text-[12px] uppercase tracking-wide text-neutral-600 dark:text-neutral-300 sm:text-[13px]">
                  Backend Development
                </span>
                <span className="about-chip rounded-full border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-[#222222] px-3 py-1 font-[Bebas_Neue] text-[12px] uppercase tracking-wide text-neutral-600 dark:text-neutral-300 sm:text-[13px]">
                  Software Engineering
                </span>
                <span className="about-chip rounded-full border border-neutral-200 dark:border-neutral-700/60 bg-white dark:bg-[#222222] px-3 py-1 font-[Bebas_Neue] text-[12px] uppercase tracking-wide text-neutral-600 dark:text-neutral-300 sm:text-[13px]">
                  Cybersecurity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
