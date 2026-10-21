import { useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { Phone, X } from "lucide-react";
import { Link } from "react-router";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/mohamed.osama.8952",
    Icon: FaFacebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mohammmmed98789",
    Icon: FaInstagram,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/201113203572",
    Icon: FaWhatsapp,
  },
  { label: "Telegram", href: "https://t.me/Mohammed19071", Icon: FaTelegram },
  {
    label: "GitHub",
    href: "https://github.com/MohamedOsama1907",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: FaLinkedin,
  },
];

const socialLinkClass =
  "group relative grid size-[40px] shrink-0 place-items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] text-neutral-600 dark:text-neutral-400 transition-colors duration-350 ease-out hover:border-[#111111] hover:bg-[#111111] hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111] focus-visible:border-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none";

export default function SocialSidebar() {
  return (
    <aside
      aria-label="Social links"
      className="w-full hidden lg:block shrink-0 py-6 lg:w-[100px] lg:py-0">
      <nav
        aria-label="Social media"
        className="mx-auto flex max-w-[240px] flex-wrap items-center justify-center gap-1 sm:max-w-none sm:flex-nowrap lg:flex-col lg:gap-2">
        <span
          aria-hidden="true"
          className="hidden h-[70px] w-[2px] bg-neutral-200 dark:bg-neutral-800 lg:block"
        />
        {socialLinks.map(({ label, href, Icon }) => (
          <Link
            key={label}
            to={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className={socialLinkClass}>
            <Icon aria-hidden="true" className="size-4.5" strokeWidth={2} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] px-3 py-1.5 font-geist-mono text-xs font-medium text-[#111111] dark:text-[#F5F5F5] opacity-0 shadow-[0_6px_18px_rgba(0,0,0,0.12)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.4)] transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
              {label}
            </span>
          </Link>
        ))}
        <span
          aria-hidden="true"
          className="hidden h-[70px] w-[2px] bg-neutral-200 dark:bg-neutral-800 lg:block"
        />
      </nav>
    </aside>
  );
}

export function MobileSocialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  // Clear any previously persisted position from storage
  useEffect(() => {
    try {
      localStorage.removeItem("mobile_social_icon_position");
    } catch {}
  }, []);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wasDraggedRef = useRef(false);
  const dragState = useRef<{
    startX: number;
    startY: number;
    initialElemX: number;
    initialElemY: number;
    isDragging: boolean;
    pointerId: number;
  } | null>(null);

  // Keep icon within viewport on screen resize or orientation change
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        const btnSize = 54;
        const padding = 8;
        const maxX = Math.max(padding, window.innerWidth - btnSize - padding);
        const maxY = Math.max(padding, window.innerHeight - btnSize - padding);
        const clampedX = Math.min(Math.max(padding, prev.x), maxX);
        const clampedY = Math.min(Math.max(padding, prev.y), maxY);
        if (clampedX !== prev.x || clampedY !== prev.y) {
          return { x: clampedX, y: clampedY };
        }
        return prev;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on Escape or outside click
  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.button !== 0) return;
    const button = buttonRef.current;
    const menu = menuRef.current;
    if (!button || !menu) return;

    button.setPointerCapture(e.pointerId);
    const rect = menu.getBoundingClientRect();
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialElemX: rect.left,
      initialElemY: rect.top,
      isDragging: false,
      pointerId: e.pointerId,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== e.pointerId) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    if (!state.isDragging) {
      if (Math.hypot(dx, dy) > 6) {
        state.isDragging = true;
        setIsDragging(true);
        setIsOpen(false);
      } else {
        return;
      }
    }

    const btnSize = 54;
    const padding = 8;
    const maxX = Math.max(padding, window.innerWidth - btnSize - padding);
    const maxY = Math.max(padding, window.innerHeight - btnSize - padding);

    const nextX = Math.min(Math.max(padding, state.initialElemX + dx), maxX);
    const nextY = Math.min(Math.max(padding, state.initialElemY + dy), maxY);

    setPosition({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== e.pointerId) return;

    const button = buttonRef.current;
    if (button && button.hasPointerCapture(e.pointerId)) {
      button.releasePointerCapture(e.pointerId);
    }

    if (state.isDragging) {
      wasDraggedRef.current = true;
      setTimeout(() => {
        wasDraggedRef.current = false;
        setIsDragging(false);
      }, 60);
    }

    dragState.current = null;
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== e.pointerId) return;

    const button = buttonRef.current;
    if (button && button.hasPointerCapture(e.pointerId)) {
      button.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
    dragState.current = null;
  };

  const handleClick = () => {
    if (wasDraggedRef.current) return;
    setIsOpen((open) => !open);
  };

  const opensDownward = position ? position.y < 340 : false;
  const opensToRight = position ? position.x < 70 : false;

  return (
    <div
      ref={menuRef}
      style={
        position
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
            }
          : undefined
      }
      className={
        position
          ? "fixed z-[60] lg:hidden"
          : "fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4rem)] md:bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60] lg:hidden"
      }>
      <nav
        id="mobile-social-menu"
        aria-label="Social media"
        aria-hidden={!isOpen}
        className={`absolute ${opensDownward ? "top-full mt-3" : "bottom-full mb-3"} ${
          opensToRight ? "left-0" : "right-0"
        } flex flex-col gap-2.5 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}>
        {socialLinks.map(({ label, href, Icon }, index) => {
          const reversedIndex = socialLinks.length - 1 - index;
          const delay = isOpen ? `${reversedIndex * 40}ms` : `${index * 35}ms`;
          const duration = isOpen ? "400ms" : "340ms";
          const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              style={{
                transition: `translate ${duration} ${easing} ${delay}, scale ${duration} ${easing} ${delay}, opacity ${duration} ${easing} ${delay}, transform ${duration} ${easing} ${delay}, background-color 200ms ease 0ms, border-color 200ms ease 0ms, color 200ms ease 0ms, box-shadow 200ms ease 0ms`,
              }}
              className={`grid size-12 place-items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] text-neutral-600 dark:text-neutral-300 shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:border-[#111111] hover:bg-[#111111] hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none ${
                isOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : opensDownward
                    ? "-translate-y-6 scale-[0.82] opacity-0 pointer-events-none"
                    : "translate-y-6 scale-[0.82] opacity-0 pointer-events-none"
              }`}>
              <Icon aria-hidden="true" className="size-[18px]" />
            </a>
          );
        })}
      </nav>

      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? "Close social links" : "Open social links"}
        aria-expanded={isOpen}
        aria-controls="mobile-social-menu"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onDragStart={(e) => e.preventDefault()}
        className={`relative grid size-[54px] place-items-center rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-[0_8px_20px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none touch-none select-none ${
          isDragging
            ? "cursor-grabbing scale-105 shadow-[0_14px_32px_rgba(0,0,0,0.3)] dark:shadow-[0_14px_32px_rgba(255,255,255,0.25)] transition-none"
            : "cursor-grab hover:scale-105 active:scale-95 transition-transform duration-200"
        }`}>
        <span
          className={`relative grid size-4 place-items-center transition-transform duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}>
          <Phone
            aria-hidden="true"
            className={`absolute size-4 transition-[opacity,transform] duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              isOpen
                ? "scale-75 opacity-0 pointer-events-none"
                : "scale-100 opacity-100"
            }`}
          />
          <X
            aria-hidden="true"
            className={`absolute size-4 transition-[opacity,transform] duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              isOpen
                ? "scale-100 opacity-100"
                : "scale-75 opacity-0 pointer-events-none"
            }`}
          />
        </span>
      </button>
    </div>
  );
}
