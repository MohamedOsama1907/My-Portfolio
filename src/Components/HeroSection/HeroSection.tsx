import { useEffect, useRef, useState, useCallback } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { ArrowDown, Download, Mail } from "lucide-react";
import { Link } from "react-router";
import gsap from "gsap";
import heroImage from "./../../assets/heroImage.jpg";

const contactLinks = [
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&to=mohamedosama0110054@gmail.com",
    Icon: Mail,
    internal: false,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/201113203572",
    Icon: FaWhatsapp,
  },
  {
    label: "GitHub",
    href: "https://github.com/MohamedOsama1907",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mohamed.osama.8952",
    Icon: FaFacebookF,
  },
];

const contactLinkClass =
  "inline-flex items-center gap-2.5 rounded-2xl border border-neutral-200 bg-white px-3 py-[10px] text-[13px] leading-none text-[#111111] transition-colors duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] motion-reduce:transition-none dark:border-neutral-800 dark:bg-[#161616] dark:text-[#F5F5F5] dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111] dark:focus-visible:outline-white";

const TITLES = ["Frontend Developer", "Software Engineer"];
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

function useTypewriter(titles: string[]) {
  const [text, setText] = useState(titles[0]);
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const indexRef = useRef(0);
  const charRef = useRef(titles[0].length);
  const isDeletingRef = useRef(false);

  const start = useCallback(() => setActive(true), []);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Text is already showing the full first title from the reveal.
    // Start the cycle: pause → delete → pause → type next → repeat.
    isDeletingRef.current = true;
    timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);

    function tick() {
      const currentTitle = titles[indexRef.current];

      if (isDeletingRef.current) {
        if (charRef.current > 0) {
          charRef.current--;
          setText(currentTitle.slice(0, charRef.current));
          timeoutRef.current = setTimeout(tick, DELETE_SPEED);
        } else {
          isDeletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % titles.length;
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        }
      } else {
        const targetTitle = titles[indexRef.current];
        if (charRef.current < targetTitle.length) {
          charRef.current++;
          setText(targetTitle.slice(0, charRef.current));
          timeoutRef.current = setTimeout(tick, TYPE_SPEED);
        } else {
          isDeletingRef.current = true;
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);
        }
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [titles, active]);

  return { text, start };
}

export default function HeroSection() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2RevealRef = useRef<HTMLSpanElement>(null);
  const [revealDone, setRevealDone] = useState(false);
  const { text: subtitleText, start: startTypewriter } = useTypewriter(TITLES);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      if (h1Ref.current) {
        gsap.set(h1Ref.current.querySelectorAll(".hero-word"), {
          yPercent: 0,
          opacity: 1,
        });
      }
      if (h2RevealRef.current) {
        gsap.set(h2RevealRef.current.querySelectorAll(".hero-word"), {
          yPercent: 0,
          opacity: 1,
        });
      }
      // Skip reveal, go straight to typewriter
      setRevealDone(true);
      startTypewriter();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        // Handoff: swap from GSAP reveal layer to typewriter layer
        setRevealDone(true);
        startTypewriter();
      },
    });

    // Phase 1a: h1 words slide up
    if (h1Ref.current) {
      const h1Words = h1Ref.current.querySelectorAll(".hero-word");
      tl.fromTo(
        h1Words,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12 },
        0.2,
      );
    }

    // Phase 1b: h2 words slide up (staggered after h1)
    if (h2RevealRef.current) {
      const h2Words = h2RevealRef.current.querySelectorAll(".hero-word");
      tl.fromTo(
        h2Words,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
        0.55,
      );
    }

    return () => {
      tl.kill();
    };
  }, [startTypewriter]);

  // Longest title for reserving width to prevent layout shift
  const longestTitle = TITLES.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <section
      aria-labelledby="hero-title"
      className="w-full max-w-[1190px] py-4 pb-15 sm:py-6 ">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,min(45%,28rem))] md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,min(42%,29.625rem))] lg:gap-10">
        <div className="order-2 min-w-0 text-center md:order-1 md:text-left">
          <div className="mx-auto mt-4 flex w-fit min-h-[34px] items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs text-neutral-500 sm:min-h-[38px] sm:gap-2.5 sm:px-5 sm:text-sm md:mx-0 md:mt-0 dark:border-neutral-800 dark:bg-[#161616] dark:text-neutral-400">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-[#21c66b]"
            />
            Available for work &amp; freelance
          </div>

          <h1
            ref={h1Ref}
            id="hero-title"
            className="font-[Bebas_Neue] text-[35px] uppercase leading-[0.95] text-[#111111] dark:text-[#F5F5F5] sm:text-[clamp(2.75rem,5vw,4.25rem)] mt-6">
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word inline-block">Mohamed</span>
            </span>{" "}
            <span className="inline-block overflow-hidden py-1">
              <span className="hero-word inline-block">Osama</span>
            </span>
          </h1>

          <h2
            className="relative mt-4 font-[Bebas_Neue] text-[25px] uppercase leading-none text-neutral-500 dark:text-neutral-400 sm:text-[clamp(1.8rem,3vw,2.75rem)] lg:mt-4"
            aria-label={subtitleText || TITLES[0]}>
            {/* Invisible spacer — reserves height/width of longest title */}
            <span className="invisible" aria-hidden="true">
              {longestTitle}
            </span>

            {/* Layer 1: GSAP reveal (visible until handoff) */}
            <span
              ref={h2RevealRef}
              className={`absolute inset-0${revealDone ? " hidden" : ""}`}
              aria-hidden="true">
              <span className="inline-block overflow-hidden py-1">
                <span className="hero-word inline-block">Frontend</span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <span className="hero-word inline-block">Developer</span>
              </span>
            </span>

            {/* Layer 2: Typewriter (visible after handoff) */}
            <span className={`absolute inset-0${revealDone ? "" : " hidden"}`}>
              {subtitleText}
              <span
                aria-hidden="true"
                className="ml-[2px] inline-block w-[2px] align-middle motion-reduce:hidden sm:w-[3px]"
                style={{
                  height: "0.8em",
                  backgroundColor: "currentColor",
                  animation: "hero-cursor-blink 0.75s steps(2, start) infinite",
                }}
              />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[34rem] text-base leading-6 text-neutral-500 dark:text-neutral-400 sm:text-lg sm:leading-7 md:mx-0 md:mt-8">
            I love coding, learning, building real things that work, exploring
            new tech.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:mt-8 sm:gap-3.5 md:justify-start">
            <Link
              to="/Projects"
              className="inline-flex items-center justify-center rounded-full bg-[#111111] dark:bg-white px-6 py-3 text-[15px] font-semibold text-white dark:text-[#111111] transition-colors duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none">
              View Projects
            </Link>
            <Link
              to="/Contact"
              className="inline-flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] px-6 py-3 text-[15px] font-semibold text-[#111111] dark:text-[#F5F5F5] transition-colors duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none">
              Hire Me
            </Link>
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] px-6 py-3 text-[15px] font-semibold text-[#111111] dark:text-[#F5F5F5] transition-colors duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none">
              <ArrowDown aria-hidden="true" className="size-4" />
              Download CV
            </a>
          </div>

          <nav
            aria-label="Contact and social links"
            className="mx-auto flex max-w-[540px] flex-wrap justify-center gap-2 md:mx-0 mt-8 md:justify-start">
            {contactLinks.map(({ label, href, Icon, internal }) => {
              const content = (
                <>
                  <Icon aria-hidden="true" className="size-[18px] shrink-0" />
                  <span>{label}</span>
                </>
              );

              return internal ? (
                <Link key={label} to={href} className={contactLinkClass}>
                  {content}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={contactLinkClass}>
                  {content}
                </a>
              );
            })}
            <a href="/cv.pdf" download className={contactLinkClass}>
              <Download aria-hidden="true" className="size-[18px] shrink-0" />
              <span>CV</span>
            </a>
          </nav>
        </div>

        <img
          src={heroImage}
          alt="Mohamed osama image"
          width={475}
          height={475}
          fetchPriority="high"
          className="order-1 mx-auto aspect-square w-[270px] rounded-[36px] object-cover shadow-md sm:w-[310px] sm:rounded-[42px] md:order-2 md:w-full md:rounded-[38px] lg:rounded-[40px]"
        />
      </div>
    </section>
  );
}
