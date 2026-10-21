import { useEffect, useRef } from "react";
import { ArrowDown, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&to=mohamedosama0110054@gmail.com",
    Icon: Mail,
  },
  { label: "WhatsApp", href: "https://wa.me/201113203572", Icon: FaWhatsapp },
  {
    label: "GitHub",
    href: "https://github.com/MohamedOsama1907",
    Icon: FaGithub,
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: FaLinkedinIn },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mohamed.osama.8952",
    Icon: FaFacebookF,
  },
];

const contactLinkClass =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2.5 text-xs leading-none text-[#111111] transition-colors duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] motion-reduce:transition-none sm:gap-2.5 sm:px-4 sm:py-3 sm:text-[15px] dark:border-neutral-800 dark:bg-[#161616] dark:text-[#F5F5F5] dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111] dark:focus-visible:outline-white";

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingWordsRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // --- Heading word reveal ---
      if (headingWordsRef.current) {
        const words =
          headingWordsRef.current.querySelectorAll(".work-heading-word");
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

      // --- Content items reveal ---
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll(".work-reveal");
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
              trigger: contentRef.current,
              start: "top 82%",
              once: true,
            },
          },
        );

        // --- Social buttons bounce-in ---
        const buttons = contentRef.current.querySelectorAll(".work-chip");
        gsap.fromTo(
          buttons,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 78%",
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
      aria-labelledby="work-section-title"
      className="w-full py-7 text-center">
      <h2
        ref={headingWordsRef}
        id="work-section-title"
        className="font-[Bebas_Neue] text-[29px] uppercase leading-none text-[#111111] dark:text-[#F5F5F5] sm:text-[36px]">
        <span className="inline-block overflow-hidden py-1">
          <span className="work-heading-word inline-block">Let&apos;s</span>
        </span>{" "}
        <span className="inline-block overflow-hidden py-1">
          <span className="work-heading-word inline-block">work</span>
        </span>{" "}
        <span className="inline-block overflow-hidden py-1">
          <span className="work-heading-word inline-block">together</span>
        </span>
      </h2>

      <div ref={contentRef}>
        <p className="work-reveal mt-6 text-[14px] text-neutral-500 dark:text-neutral-400 sm:mt-9 sm:text-lg">
          Available for freelance projects and collaborations
        </p>

        <nav
          aria-label="Contact and social links"
          className="mx-auto mt-5 grid w-fit grid-cols-3 justify-center gap-2 sm:mt-6 sm:flex sm:w-auto sm:flex-wrap sm:gap-2.5">
          {contactLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={`work-chip ${contactLinkClass}`}>
              <Icon aria-hidden="true" className="size-[18px] shrink-0" />
              <span>{label}</span>
            </a>
          ))}
          <a
            href="/cv.pdf"
            download="Mohamed_Osama_CV.pdf"
            className={`work-chip ${contactLinkClass}`}>
            <ArrowDown aria-hidden="true" className="size-[18px] shrink-0" />
            <span>CV</span>
          </a>
        </nav>

        <div className="work-reveal">
          <Link
            to="/Contact"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#111111] dark:bg-white px-6 py-3 text-[15px] font-semibold text-white dark:text-[#111111] transition-colors duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none sm:mt-8">
            Send a message
          </Link>
        </div>
      </div>
    </section>
  );
}
