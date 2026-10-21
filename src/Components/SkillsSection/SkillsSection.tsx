import { useEffect, useRef } from "react";
import MarqueeImport from "react-fast-marquee";
import type { IconType } from "react-icons";
import {
  SiAxios,
  SiBootstrap,
  SiCss,
  SiFontawesome,
  SiFormik,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLucide,
  SiMui,
  SiNextdotjs,
  SiPostman,
  SiReact,
  SiRedux,
  SiSass,
  SiShadcnui,
  SiTanstack,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Marquee = ((
  MarqueeImport as unknown as { default?: typeof MarqueeImport }
).default ?? MarqueeImport) as typeof MarqueeImport;

const skills: { name: string; Icon: IconType }[] = [
  { name: "Git", Icon: SiGit },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Bootstrap", Icon: SiBootstrap },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "Redux", Icon: SiRedux },
  { name: "Axios", Icon: SiAxios },
  { name: "TanStack Query", Icon: SiTanstack },
  { name: "Zod", Icon: SiZod },
  { name: "shadcn/ui", Icon: SiShadcnui },
  { name: "Postman", Icon: SiPostman },
  { name: "Lucide", Icon: SiLucide },
  { name: "Sass", Icon: SiSass },
  { name: "Formik", Icon: SiFormik },
  { name: "MUI", Icon: SiMui },
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "Font Awesome", Icon: SiFontawesome },
];

export default function SkillsSection() {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const headingWordsRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Heading word reveal ---
      if (headingWordsRef.current) {
        const words =
          headingWordsRef.current.querySelectorAll(".skills-heading-word");
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

      // --- Marquee container reveal ---
      if (marqueeRef.current) {
        gsap.fromTo(
          marqueeRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: marqueeRef.current,
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
      aria-labelledby="skills-title"
      className="w-full py-4 sm:py-6"
    >
      <h2
        ref={headingWordsRef}
        id="skills-title"
        className="font-[Bebas_Neue] text-[29px] uppercase leading-none text-[#111111] dark:text-[#F5F5F5] sm:text-[36px]"
      >
        <span className="inline-block overflow-hidden py-1">
          <span className="skills-heading-word inline-block">Skills</span>
        </span>
      </h2>

      <div ref={marqueeRef} className="relative mt-8 sm:mt-10">
        <Marquee
          aria-label="Technical skills"
          pauseOnHover
          speed={55}
          gradient
          gradientColor={isDark ? "#0A0A0A" : "#fafafa"}
          gradientWidth={56}
          className=""
        >
          {skills.map(({ name, Icon }) => (
            <div
              key={name}
              className="mx-1.5 flex w-max items-center gap-3 rounded-[12px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] py-3 px-4 lg:px-5 text-[15px] font-semibold leading-none text-[#111111] dark:text-[#F5F5F5] transition-colors duration-200 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-[#202020] sm:px-6"
            >
              <Icon
                aria-hidden="true"
                className=" size-[15px] lg:size-[19px] shrink-0"
              />
              <span className="whitespace-nowrap">{name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
