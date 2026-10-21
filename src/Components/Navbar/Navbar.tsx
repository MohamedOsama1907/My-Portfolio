import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { Download, Folder, Globe2, Mail, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router";
import logoDark from "../../../public/mohamedDark.png";
import logoLight from "../../../public/mohamed.png";
import { useTheme } from "../../context/ThemeContext";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/Projects" },
  { label: "Contact", href: "/Contact" },
];

const dockItems = [
  { label: "Projects", href: "/Projects", Icon: Folder },
  { label: "Contact", href: "/Contact", Icon: Mail },
  { label: "Download CV", href: "/cv.pdf", Icon: Download, download: true },
];

const MAX_SCALE = 1.25;
const SPREAD = 56;
const STIFFNESS = 16;

type DockItem = {
  el: HTMLElement;
  center: number;
  width: number;
  scale: number;
  target: number;
};

const canMagnify = () =>
  window.matchMedia(
    "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  ).matches;

function useDockMagnification() {
  const dockRef = useRef<HTMLElement>(null);
  const items = useRef<DockItem[]>([]);
  const raf = useRef(0);
  const lastTime = useRef(0);

  const measure = () => {
    const dock = dockRef.current;
    if (!dock) return;
    // offsetLeft/offsetWidth ignore transforms, so measuring is jitter-free
    // even while icons are magnified.
    const origin = dock.getBoundingClientRect().left + dock.clientLeft;
    const els = Array.from(
      dock.querySelectorAll<HTMLElement>("[data-dock-item]"),
    );

    // Icons can differ in height (Home is smaller than the rest on mobile), so
    // anchor every icon's scale origin to one shared baseline. This keeps all
    // icons growing upward from the same line, including Home.
    const baseline = Math.max(
      ...els.map((el) => el.offsetTop + el.offsetHeight),
    );

    items.current = els.map((el) => {
      el.style.transformOrigin = `50% ${baseline - el.offsetTop}px`;
      return {
        el,
        center: origin + el.offsetLeft + el.offsetWidth / 2,
        width: el.offsetWidth,
        scale: 1,
        target: 1,
      };
    });
  };

  const apply = () => {
    const list = items.current;
    // Extra width each icon takes when scaled; used to push neighbours aside.
    const extras = list.map((item) => item.width * (item.scale - 1));
    const totalExtra = extras.reduce((sum, value) => sum + value, 0);

    let before = 0;
    list.forEach((item, index) => {
      const shift = -totalExtra / 2 + before + extras[index] / 2;
      before += extras[index];
      item.el.style.transform = `translate3d(${shift.toFixed(2)}px,0,0) scale(${item.scale.toFixed(4)})`;
      item.el.style.setProperty("--dock-scale", item.scale.toFixed(4));
    });
  };

  const tick = (now: number) => {
    const dt = Math.min((now - lastTime.current) / 1000, 0.05);
    lastTime.current = now;
    const ease = 1 - Math.exp(-STIFFNESS * dt);

    let settled = true;
    items.current.forEach((item) => {
      const diff = item.target - item.scale;
      if (Math.abs(diff) < 0.001) {
        item.scale = item.target;
      } else {
        item.scale += diff * ease;
        settled = false;
      }
    });

    apply();
    raf.current = settled ? 0 : requestAnimationFrame(tick);
  };

  const start = () => {
    if (raf.current) return;
    lastTime.current = performance.now();
    raf.current = requestAnimationFrame(tick);
  };

  const onPointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || !canMagnify()) return;
    measure();
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    // Touch has no hover, so skip it entirely.
    if (event.pointerType === "touch" || !canMagnify()) return;
    if (!items.current.length) measure();

    items.current.forEach((item) => {
      const distance = event.clientX - item.center;
      item.target =
        1 +
        (MAX_SCALE - 1) *
          Math.exp(-(distance * distance) / (2 * SPREAD * SPREAD));
    });
    start();
  };

  const onPointerLeave = () => {
    items.current.forEach((item) => (item.target = 1));
    start();
  };

  // Clean up the animation loop on unmount.
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return { dockRef, onPointerEnter, onPointerMove, onPointerLeave };
}

function TooltipLabel({ children }: { children: ReactNode }) {
  // The label sits inside a scaled icon, so it counter-scales by 1/scale to
  // keep its text at a constant size while following the icon upward.
  return (
    <span className="pointer-events-none absolute bottom-[120%] left-1/2 z-10 origin-bottom whitespace-nowrap rounded-lg border border-neutral-200 bg-white px-2 py-1.5 font-geist-mono text-xs font-medium text-[#111111] opacity-0 shadow-sm transition-opacity [transform:translateX(-50%)_scale(calc(1/var(--dock-scale,1)))] [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none dark:border-neutral-800 dark:bg-[#181818] dark:text-[#F5F5F5]">
      {children}
    </span>
  );
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [language, setLanguage] = useState<"EN" | "AR">("EN");
  const desktopNavRef = useRef<HTMLElement>(null);
  const { dockRef, onPointerEnter, onPointerMove, onPointerLeave } =
    useDockMagnification();

  // GSAP circle-unfolding entrance animation on page refresh
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const navs = [desktopNavRef.current, dockRef.current].filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!navs.length) return;

    const ctx = gsap.context(() => {
      navs.forEach((nav) => {
        const innerItems = Array.from(nav.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        );

        const tl = gsap.timeline({
          defaults: { ease: "power4.out" },
        });

        // Start anchored at exact center of its final position as a tiny circle
        tl.set(nav, {
          opacity: 0,
          scale: 0.15,
          clipPath: "circle(0% at 50% 50%)",
          transformOrigin: "50% 50%",
        });

        if (innerItems.length) {
          tl.set(innerItems, {
            opacity: 0,
            scale: 0.85,
            transformOrigin: "50% 50%",
          });
        }

        // Phase 1: Appear as a small centered circle
        tl.to(nav, {
          opacity: 1,
          scale: 0.45,
          clipPath: "circle(26px at 50% 50%)",
          duration: 0.25,
          ease: "power2.out",
        });

        // Phase 2: Smoothly expand and unfold outward into the complete Navbar shape
        tl.to(
          nav,
          {
            scale: 1,
            clipPath: "circle(160% at 50% 50%)",
            duration: 0.68,
            ease: "expo.out",
          },
          "-=0.05",
        );

        // Phase 3: Reveal inner elements in sync with the expanding shape
        if (innerItems.length) {
          tl.to(
            innerItems,
            {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              stagger: 0.035,
              ease: "power2.out",
            },
            "-=0.48",
          );
        }

        // Clean up inline styles so all tooltips, hovers, and magnification work natively
        tl.set(nav, {
          clearProps: "clipPath,transform,opacity",
        });
        if (innerItems.length) {
          tl.set(innerItems, {
            clearProps: "all",
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Note: no CSS transition on `transform` here. The scale is driven by the
  // rAF loop above, and a CSS transition would fight it.
  const itemBaseClass =
    "group relative grid size-10 shrink-0 origin-center touch-manipulation select-none place-items-center rounded-[14px] border transition-all duration-150 ease-out will-change-transform [-webkit-tap-highlight-color:transparent] active:scale-95 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none sm:size-11";
  const itemClass = `${itemBaseClass} border-neutral-200/90 bg-white text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.04)] [@media(hover:hover)]:hover:bg-neutral-50 active:bg-neutral-100 dark:border-neutral-800 dark:bg-[#181818] dark:text-[#F5F5F5] dark:shadow-none [@media(hover:hover)]:dark:hover:bg-[#222222] active:dark:bg-[#262626]`;
  const activeItemClass = `${itemBaseClass} border-[#111111] bg-[#111111] text-white shadow-sm [@media(hover:hover)]:hover:bg-[#111111] active:bg-[#111111] dark:border-white dark:bg-white dark:text-[#111111] dark:shadow-[0_2px_6px_rgba(255,255,255,0.14)] [@media(hover:hover)]:dark:hover:bg-neutral-200 active:dark:bg-neutral-200`;

  return (
    <>
      {/* Desktop text navigation */}
      <header className="sticky top-0 z-50 hidden w-full px-4 pt-3 sm:px-6 md:block">
        <nav
          ref={desktopNavRef}
          aria-label="Main navigation"
          className="mx-auto flex w-fit items-center gap-1.5 rounded-full text-[#111111] dark:text-[#F5F5F5]">
          <NavLink
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            to="/"
            aria-label="Mohamed Osama home"
            className="grid size-11 bg-[#fafafa] dark:bg-[#141414] shrink-0 place-items-center rounded-full border-[3px] border-[#111111] dark:border-neutral-200 p-1 font-[Bebas_Neue] text-lg text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white">
            <img
              src={isDark ? logoLight : logoDark}
              alt="logo image"
              className="img-fluid"
            />
          </NavLink>

          <div className="flex overflow-hidden items-center justify-center gap-1 rounded-full border border-[#111111] bg-[#111111] dark:border-neutral-800 dark:bg-[#161616] p-[2px]">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => {
                  if (link.label === "Home") {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }}
                className={({ isActive }) =>
                  `group relative isolate flex items-center justify-center whitespace-nowrap rounded-full bg-white dark:bg-[#1e1e1e] px-5 py-2.5 font-geist-mono text-sm font-bold uppercase leading-none tracking-wide transition-colors duration-200 ease-out [@media(hover:hover)]:hover:text-[#FAFAFA] dark:[@media(hover:hover)]:hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white lg:text-lg ${
                    isActive
                      ? "active text-[#FAFAFA] dark:text-[#111111]"
                      : "text-[#111111] dark:text-[#F5F5F5]"
                  }`
                }>
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 z-0 rounded-full bg-[#111111] dark:bg-[#F5F5F5] transition-[height] duration-300 ease-out group-hover:h-full motion-reduce:transition-none ${isActive ? "h-full" : "h-0"}`}
                    />
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            <a
              href="/cv.pdf"
              download="Mohamed_Osama_CV.pdf"
              className="ml-0.5 flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-white dark:bg-[#1e1e1e] text-[#111111] dark:text-[#F5F5F5] hover:bg-neutral-100 dark:hover:bg-[#252525] px-4 py-2.5 font-geist-mono text-sm font-bold uppercase leading-none tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 dark:focus-visible:outline-white lg:text-lg">
              CV <span aria-hidden="true">↓</span>
            </a>
          </div>

          <button
            type="button"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            aria-pressed={isDark}
            onClick={toggleTheme}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[#111111] dark:bg-[#1e1e1e] border border-transparent dark:border-neutral-800 text-white dark:text-[#F5F5F5] transition-colors hover:bg-neutral-800 dark:hover:bg-[#2a2a2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white">
            {isDark ? (
              <Sun aria-hidden="true" className="size-5 text-amber-400" />
            ) : (
              <Moon aria-hidden="true" className="size-5" />
            )}
          </button>
          <button
            type="button"
            aria-label={`Change language to ${language === "EN" ? "Arabic" : "English"}`}
            onClick={() => setLanguage((value) => (value === "EN" ? "AR" : "EN"))}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[#111111] dark:bg-[#1e1e1e] border border-transparent dark:border-neutral-800 text-white dark:text-[#F5F5F5] transition-colors hover:bg-neutral-800 dark:hover:bg-[#2a2a2a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white">
            <Globe2 aria-hidden="true" className="size-5" />
          </button>
        </nav>
      </header>

      {/* Compact dock navigation for touch-first and narrow screens (bottom docked) */}
      <nav
        ref={dockRef}
        aria-label="Mobile navigation"
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{
          bottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
        className="fixed bottom-4 inset-x-0 z-50 mx-auto flex w-fit items-center justify-center gap-1.5 sm:gap-2 rounded-[22px] border border-neutral-200/90 bg-white/95 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md md:hidden dark:border-neutral-800/90 dark:bg-[#121212]/95 dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        <NavLink
          to="/"
          aria-label="Home"
          data-dock-item
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="group relative grid size-10 shrink-0 origin-center select-none place-items-center rounded-[14px] bg-[#111111] dark:bg-[#1c1c1c] border border-transparent dark:border-neutral-800 text-white shadow-sm transition-transform duration-150 active:scale-95 sm:size-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white">
          <img
            src={logoLight}
            alt="Mohamed Osama"
            className="size-6 object-contain"
          />
          <TooltipLabel>Home</TooltipLabel>
        </NavLink>
        {dockItems.map(({ label, href, Icon, download }) => {
          const content = (
            <>
              <Icon
                aria-hidden="true"
                className="size-4.5 sm:size-5"
                strokeWidth={1.8}
              />
              <TooltipLabel>{label}</TooltipLabel>
            </>
          );

          return download ? (
            <a
              key={label}
              href={href}
              download="Mohamed_Osama_CV.pdf"
              aria-label={label}
              data-dock-item
              className={itemClass}>
              {content}
            </a>
          ) : (
            <NavLink
              key={label}
              to={href}
              aria-label={label}
              data-dock-item
              className={({ isActive }) =>
                isActive ? activeItemClass : itemClass
              }>
              {content}
            </NavLink>
          );
        })}
        <button
          type="button"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          aria-pressed={isDark}
          onClick={toggleTheme}
          data-dock-item
          className={itemClass}>
          {isDark ? (
            <Sun aria-hidden="true" className="size-4.5 sm:size-5 text-amber-400" strokeWidth={1.8} />
          ) : (
            <Moon aria-hidden="true" className="size-4.5 sm:size-5" strokeWidth={1.8} />
          )}
          <TooltipLabel>{isDark ? "Light mode" : "Dark mode"}</TooltipLabel>
        </button>
        <button
          type="button"
          aria-label={`Change language to ${language === "EN" ? "Arabic" : "English"}`}
          onClick={() => setLanguage((value) => (value === "EN" ? "AR" : "EN"))}
          data-dock-item
          className="group relative flex h-10 shrink-0 origin-center touch-manipulation select-none items-center justify-center gap-1 rounded-[14px] border border-neutral-200/90 bg-white px-2.5 text-[#111111] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 ease-out will-change-transform [-webkit-tap-highlight-color:transparent] active:scale-95 [@media(hover:hover)]:hover:bg-neutral-50 active:bg-neutral-100 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] motion-reduce:transition-none sm:h-11 sm:px-3 dark:border-neutral-800 dark:bg-[#181818] dark:text-[#F5F5F5] dark:shadow-none [@media(hover:hover)]:dark:hover:bg-[#222222] dark:focus-visible:outline-white">
          <Globe2
            aria-hidden="true"
            className="size-4 sm:size-4.5 shrink-0"
            strokeWidth={1.8}
          />
          <span className="font-geist-mono text-xs font-bold uppercase leading-none tracking-tight">
            {language === "EN" ? "AR" : "EN"}
          </span>
          <TooltipLabel>Language: {language}</TooltipLabel>
        </button>
      </nav>
    </>
  );
}
