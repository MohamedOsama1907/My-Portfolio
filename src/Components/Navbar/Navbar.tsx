import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Download, Folder, Globe2, Mail, Moon, Sun } from "lucide-react";
import { Link, NavLink } from "react-router";
import logo from "../../../public/mohamedDark.png";

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
    <span className="pointer-events-none absolute bottom-[120%] left-1/2 z-10 origin-bottom whitespace-nowrap rounded-lg border border-neutral-200 bg-white px-2 py-1.5 font-geist-mono text-xs font-medium text-[#111111] opacity-0 shadow-sm transition-opacity [transform:translateX(-50%)_scale(calc(1/var(--dock-scale,1)))] [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
      {children}
    </span>
  );
}

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<"EN" | "AR">("EN");
  const { dockRef, onPointerEnter, onPointerMove, onPointerLeave } =
    useDockMagnification();

  // Note: no CSS transition on `transform` here. The scale is driven by the
  // rAF loop above, and a CSS transition would fight it.
  const itemBaseClass =
    "group relative grid size-11 shrink-0 origin-bottom touch-manipulation select-none place-items-center rounded-xl border transition-colors duration-150 ease-out will-change-transform [-webkit-tap-highlight-color:transparent] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] motion-reduce:transition-none sm:size-12";
  const itemClass = `${itemBaseClass} border-neutral-200 bg-white text-[#111111] shadow-[0_2px_4px_rgba(0,0,0,0.1)] [@media(hover:hover)]:hover:bg-neutral-50 active:bg-neutral-100`;
  const activeItemClass = `${itemBaseClass} border-[#111111] bg-[#111111] text-[#FAFAFA] shadow-[0_2px_4px_rgba(0,0,0,0.14)] [@media(hover:hover)]:hover:bg-[#111111] active:bg-[#111111]`;

  return (
    <header className="w-full px-4 pt-3 sm:px-6">
      {/* Preserve the existing text navigation on desktop. */}
      <nav
        aria-label="Main navigation"
        className="mx-auto hidden w-fit items-center gap-1.5 rounded-full text-[#111111] md:flex">
        <NavLink
          to="/"
          aria-label="Mohamed Osama home"
          className="grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-[#111111] p-1 font-[Bebas_Neue] text-lg text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]">
          <img src={logo} alt="logo image" className="img-fluid" />
        </NavLink>

        <div className="flex items-center justify-center gap-1 rounded-full border border-[#111111] bg-[#111111] p-[2px]">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              className="group relative flex items-center justify-center whitespace-nowrap rounded-full bg-white px-5 py-2.5 font-geist-mono text-sm font-bold uppercase leading-none tracking-wide text-[#111111]  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] lg:text-lg">
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/cv.pdf"
            download
            className="ml-0.5 flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-white px-4 py-2.5 font-geist-mono text-sm font-bold uppercase leading-none tracking-wide transition-colors  focus-visible:outline-2 focus-visible:outline-offset-2  lg:text-lg">
            CV <span aria-hidden="true">↓</span>
          </Link>
        </div>

        <button
          type="button"
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          aria-pressed={isDark}
          onClick={() => setIsDark((value) => !value)}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#111111] text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]">
          {isDark ? (
            <Sun aria-hidden="true" className="size-5" />
          ) : (
            <Moon aria-hidden="true" className="size-5" />
          )}
        </button>
        <button
          type="button"
          aria-label={`Change language to ${language === "EN" ? "Arabic" : "English"}`}
          onClick={() => setLanguage((value) => (value === "EN" ? "AR" : "EN"))}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-[#111111] text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]">
          <Globe2 aria-hidden="true" className="size-5" />
        </button>
      </nav>

      {/* Compact dock navigation for touch-first and narrow screens. */}
      <nav
        ref={dockRef}
        aria-label="Main navigation"
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="fixed bottom-4 left-1/2 z-50 flex w-fit max-w-[calc(100vw-1rem)] -translate-x-1/2 items-center gap-2 rounded-[22px] border border-neutral-200/90 bg-[#FAFAFA]/95 p-2 shadow-[0_12px_36px_rgba(0,0,0,0.12)] backdrop-blur-sm md:hidden sm:gap-2 sm:p-3">
        <NavLink
          to="/"
          aria-label="Home"
          data-dock-item
          className={({ isActive }) =>
            `${itemBaseClass} font-geist-mono text-sm font-bold ${
              isActive
                ? "border-[#111111] bg-[#111111] text-[#FAFAFA] shadow-[0_2px_4px_rgba(0,0,0,0.14)] [@media(hover:hover)]:hover:bg-[#111111] active:bg-[#111111]"
                : "border-neutral-200 bg-white text-[#111111] shadow-[0_2px_4px_rgba(0,0,0,0.1)] [@media(hover:hover)]:hover:bg-neutral-50 active:bg-neutral-100"
            }`
          }>
          <>
            MO
            <TooltipLabel>Home</TooltipLabel>
          </>
        </NavLink>
        {dockItems.map(({ label, href, Icon, download }) => {
          const content = (
            <>
              <Icon
                aria-hidden="true"
                className="size-5 sm:size-6"
                strokeWidth={2}
              />
              <TooltipLabel>{label}</TooltipLabel>
            </>
          );

          return download ? (
            <Link
              key={label}
              to={href}
              download
              aria-label={label}
              data-dock-item
              className={itemClass}>
              {content}
            </Link>
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
          onClick={() => setIsDark((value) => !value)}
          data-dock-item
          className={itemClass}>
          {isDark ? (
            <Sun aria-hidden="true" className="size-5 sm:size-6" />
          ) : (
            <Moon aria-hidden="true" className="size-5 sm:size-6" />
          )}
          <TooltipLabel>{isDark ? "Light mode" : "Dark mode"}</TooltipLabel>
        </button>
        <button
          type="button"
          aria-label={`Change language to ${language === "EN" ? "Arabic" : "English"}`}
          onClick={() => setLanguage((value) => (value === "EN" ? "AR" : "EN"))}
          data-dock-item
          className={`${itemClass} px-1`}>
          <Globe2
            aria-hidden="true"
            className="size-5 sm:size-6"
            strokeWidth={2}
          />
          <TooltipLabel>Language: {language}</TooltipLabel>
        </button>
      </nav>
    </header>
  );
}
