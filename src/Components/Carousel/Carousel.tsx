import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import { ChevronLeft, ChevronRight, ExternalLink, Eye } from "lucide-react";
import mavic from "../../assets/1-MavicPro.png";
import uxReview from "../../assets/2-UXReview.svg";
import mudaber from "../../assets/3-mudaber.png";
import clarity from "../../assets/4-Clarity.png";
import gameArena from "../../assets/5-GameArena.png";
import contactHub from "../../assets/6-ContactHub.svg";
import portfolio from "../../assets/7-portfolio.jpg";
import cosmos from "../../assets/8-COSMOS.png.jpg";
import quizApp from "../../assets/9-QuizApp.png";
import cineVerse from "../../assets/10-CineVerse.png";
import socialApp from "../../assets/11-SocialApp.svg";
import audioGuard from "../../assets/12-AudioGuard.svg";

import { PROJECTS_DATA, type ProjectItem } from "../../data/projectsData";

export type Project = ProjectItem & {
  details?: string;
};

// Any link left out renders as a dimmed, non-clickable action.
const projectImages = [
  { name: "Mavic Pro", image: mavic },
  { name: "UX Review", image: uxReview },
  { name: "Mudaber", image: mudaber },
  { name: "Clarity", image: clarity },
  { name: "Game Arena", image: gameArena },
  { name: "ContactHub", image: contactHub },
  { name: "Portfolio", image: portfolio },
  { name: "COSMOS", image: cosmos },
  { name: "Quiz App", image: quizApp },
  { name: "CineVerse", image: cineVerse },
  { name: "Social App", image: socialApp },
  { name: "AudioGuard", image: audioGuard },
];

const projects: Project[] = projectImages.map((item) => {
  const match = PROJECTS_DATA.find(
    (p) => p.name.toLowerCase() === item.name.toLowerCase(),
  );
  if (match) {
    return {
      ...match,
      details: `/projects/${match.id}`,
    };
  }
  return {
    id: item.name.toLowerCase().replace(/\s+/g, "-"),
    name: item.name,
    category: "Web Applications",
    badge: "Project",
    image: item.image,
    description: "",
    longDescription: "",
    technologies: [],
    highlights: [],
    details: `/projects/${item.name.toLowerCase().replace(/\s+/g, "-")}`,
  };
});

const TWEEN_FACTOR_BASE = 1; // adjacent snap => fully "side" state
const MIN_SCALE = 0.78;
const MAX_SCALE = 1;
const MAX_DIM = 0.6; // max opacity of the dark overlay on side cards

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type TweenItem = {
  slide: HTMLElement;
  card: HTMLElement;
  overlay: HTMLElement;
  caption: HTMLElement;
};

/* ---------- Project hover overlay ---------- */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const HOVER_REVEAL =
  "group-hover/media:opacity-100 group-focus-within/media:opacity-100";
const HOVER_POINTER =
  "group-hover/media:pointer-events-auto group-focus-within/media:pointer-events-auto";
const HOVER_REVEAL_ITEM =
  "group-hover/media:opacity-100 group-hover/media:translate-y-0 group-hover/media:scale-100 group-focus-within/media:opacity-100 group-focus-within/media:translate-y-0 group-focus-within/media:scale-100";
// Stagger order: [details, demo, github] — the primary action lands first.
const HOVER_DELAY = [
  "group-hover/media:delay-[100ms] group-focus-within/media:delay-[100ms]",
  "group-hover/media:delay-[40ms] group-focus-within/media:delay-[40ms]",
  "group-hover/media:delay-[160ms] group-focus-within/media:delay-[160ms]",
];
const TOUCH_DELAY = ["delay-[120ms]", "delay-[60ms]", "delay-[180ms]"];

function GithubMark({ className }: { className?: string }) {
  // Inline mark: newer lucide-react releases dropped brand icons.
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="currentColor"
      className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function useCanHover() {
  const [canHover, setCanHover] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(hover: hover)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return canHover;
}

type OverlayActionProps = {
  label: string;
  icon: ReactNode;
  /** "always": label shown; "sm": label from sm up (icon-only on phones); "none": icon-only */
  labelMode: "always" | "sm" | "none";
  href?: string;
  onClick?: () => void;
  external?: boolean;
  disabled?: boolean;
  tabIndex?: number;
};

function OverlayAction({
  label,
  icon,
  labelMode,
  href,
  onClick,
  external,
  disabled,
  tabIndex,
}: OverlayActionProps) {
  const size =
    labelMode === "none"
      ? "w-9 sm:w-11"
      : labelMode === "sm"
        ? "w-9 sm:w-auto sm:px-4"
        : "px-4 sm:px-5";

  const look = disabled
    ? "cursor-not-allowed border-white/15 bg-white/5 text-white/40"
    : "border-white/30 bg-white/10 text-white hover:scale-105 hover:border-white hover:bg-white hover:text-[#111111] active:scale-95";

  const className = `inline-flex h-9 items-center justify-center gap-2 rounded-full border outline-none transition-all duration-300 ${EASE} focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:h-11 motion-reduce:transition-none ${size} ${look}`;

  const content = (
    <>
      {icon}
      <span
        className={
          labelMode === "none"
            ? "sr-only"
            : `font-[Bebas_Neue] text-base uppercase leading-none tracking-wider sm:text-lg ${
                labelMode === "sm" ? "hidden sm:inline" : ""
              }`
        }>
        {label}
      </span>
    </>
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    (event.currentTarget as HTMLElement)?.blur();
    if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }
    onClick?.();
  };

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        tabIndex={tabIndex}
        title={`${label} (not available yet)`}
        className={className}>
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        tabIndex={tabIndex}
        title={label}
        draggable={false}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      tabIndex={tabIndex}
      title={label}
      className={className}>
      {content}
    </button>
  );
}

function ProjectOverlay({
  project,
  isActive,
  canHover,
  isTouchRevealed = false,
  onDismiss,
  onViewDetails,
}: {
  project: Project;
  isActive: boolean;
  canHover: boolean;
  isTouchRevealed?: boolean;
  onDismiss?: () => void;
  onViewDetails?: (project: Project) => void;
}) {
  // Only the focused (center) card is interactive; side cards stay inert.
  // On desktop: revealed on hover via group-hover/media classes.
  // On touch: revealed only when user taps the active card.
  const revealed = isActive && !canHover && isTouchRevealed;
  const hoverable = isActive && canHover;
  const tabIndex = isActive && (canHover || isTouchRevealed) ? undefined : -1;

  const container = revealed
    ? "opacity-100 pointer-events-auto items-center bg-gradient-to-t from-black/85 via-black/55 to-black/40"
    : `opacity-0 pointer-events-none items-center bg-gradient-to-t from-black/80 via-black/45 to-black/30 ${
        hoverable ? `${HOVER_REVEAL} ${HOVER_POINTER}` : ""
      }`;

  const item = (index: number) =>
    revealed
      ? `opacity-100 translate-y-0 scale-100 ${TOUCH_DELAY[index]}`
      : `opacity-0 translate-y-3 scale-95 ${
          hoverable ? `${HOVER_REVEAL_ITEM} ${HOVER_DELAY[index]}` : ""
        }`;

  const itemBase = `transition-all duration-500 ${EASE} motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:scale-100`;

  return (
    <div
      aria-hidden={isActive && (canHover || isTouchRevealed) ? undefined : true}
      className={`absolute inset-0 flex justify-center gap-2 ring-1 ring-inset ring-white/10 transition-opacity duration-500 ${EASE} motion-reduce:transition-none sm:gap-3 ${container}`}>
      <div className={`${itemBase} ${item(0)}`}>
        <OverlayAction
          label="View Details"
          labelMode="sm"
          icon={<Eye aria-hidden="true" className="size-4 sm:size-[18px]" />}
          tabIndex={tabIndex}
          onClick={onDismiss}
          {...(onViewDetails
            ? {
                onClick: () => {
                  onDismiss?.();
                  onViewDetails(project);
                },
              }
            : project.details
              ? {
                  href: project.details,
                  onClick: onDismiss,
                }
              : { disabled: true })}
        />
      </div>

      <div className={`${itemBase} ${item(1)}`}>
        <OverlayAction
          label="Live Demo"
          labelMode="always"
          icon={
            <ExternalLink
              aria-hidden="true"
              className="size-4 sm:size-[18px]"
            />
          }
          href={project.demo}
          external
          disabled={!project.demo}
          tabIndex={tabIndex}
          onClick={onDismiss}
        />
      </div>

      <div className={`${itemBase} ${item(2)}`}>
        <OverlayAction
          label="GitHub"
          labelMode="none"
          icon={<GithubMark className="size-4 sm:size-[18px]" />}
          href={project.github}
          external
          disabled={!project.github}
          tabIndex={tabIndex}
          onClick={onDismiss}
        />
      </div>
    </div>
  );
}

export default function Carousel({
  onViewDetails,
  onProjectChange,
}: {
  onViewDetails?: (project: Project) => void;
  onProjectChange?: (project: Project) => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [touchRevealed, setTouchRevealed] = useState<string | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const canHover = useCanHover();
  const tweenNodes = useRef<(TweenItem | null)[]>([]);
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: true,
    slidesToScroll: 1,
    duration: 32, // slightly longer, softer glide (default 25)
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCardClick = useCallback(
    (
      projectName: string,
      isActive: boolean,
      index: number,
      e: React.MouseEvent,
    ) => {
      // If user dragged/swiped the carousel, don't trigger tap action
      if (pointerStartRef.current) {
        const dx = e.clientX - pointerStartRef.current.x;
        const dy = e.clientY - pointerStartRef.current.y;
        if (Math.hypot(dx, dy) > 8) {
          return;
        }
      }

      if (!isActive) {
        emblaApi?.scrollTo(index, prefersReducedMotion());
        setTouchRevealed(null);
        return;
      }

      if (canHover) return;

      // On mobile / touch, tap toggles the action overlay on the active card
      setTouchRevealed((current) =>
        current === projectName ? null : projectName,
      );
    },
    [canHover, emblaApi],
  );

  const updateSelectedIndex = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setTouchRevealed(null);
  }, []);

  // Close overlay on touch when tapping outside the carousel cards
  useEffect(() => {
    if (canHover || !touchRevealed) return;
    const handleOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-carousel-card]")) {
        setTouchRevealed(null);
      }
    };
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [canHover, touchRevealed]);

  useEffect(() => {
    onProjectChange?.(projects[selectedIndex]);
  }, [onProjectChange, selectedIndex]);

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    // Keep one entry per slide (null if missing) so indexes stay aligned.
    tweenNodes.current = api.slideNodes().map((slide) => {
      const card = slide.querySelector<HTMLElement>("[data-carousel-card]");
      const overlay = slide.querySelector<HTMLElement>("[data-carousel-dim]");
      const caption = slide.querySelector<HTMLElement>(
        "[data-carousel-caption]",
      );
      return card && overlay && caption
        ? { slide, card, overlay, caption }
        : null;
    });
  }, []);

  const tweenScale = useCallback(
    (api: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();
      const slidesInView = api.slidesInView();
      const isScrollEvent = eventName === "scroll";
      const tweenFactor = TWEEN_FACTOR_BASE * api.scrollSnapList().length;
      const items = tweenNodes.current;

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        const slidesInSnap = engine.slideRegistry[snapIndex] ?? [];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          let diffToTarget = scrollSnap - scrollProgress;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex !== loopItem.index || target === 0) return;

              if (target < 0) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              } else {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            });
          }

          const tweenValue = clamp(
            1 - Math.abs(diffToTarget * tweenFactor),
            0,
            1,
          );
          const scale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) * tweenValue;
          const item = items[slideIndex];

          if (!item) return;
          // Overlap is applied here (not via negative slide margins, which
          // Embla mis-measures on the first slide). Neighbours slide inward
          // behind the center card, easing back to 0 as they become active.
          const shift = clamp(diffToTarget * tweenFactor, -1, 1);
          item.card.style.transform = `translateX(calc(var(--overlap) * ${(-shift).toFixed(3)})) scale(${scale.toFixed(3)})`;
          // Dark overlay fades out as the card approaches the center.
          item.overlay.style.opacity = ((1 - tweenValue) * MAX_DIM).toFixed(3);
          item.caption.style.opacity = (0.4 + 0.6 * tweenValue).toFixed(3);
          // CHANGED: z-index lives on the slide, not the figure. Embla's loop
          // applies a transform to slides, which creates a stacking context
          // that would trap a z-index set on the inner card.
          item.slide.style.zIndex = String(Math.round(tweenValue * 100));
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const syncCarousel = (api: EmblaCarouselType) => {
      setTweenNodes(api);
      updateSelectedIndex(api);
      tweenScale(api);
    };

    syncCarousel(emblaApi);
    emblaApi
      .on("select", updateSelectedIndex)
      .on("reInit", syncCarousel)
      .on("scroll", tweenScale);

    return () => {
      emblaApi
        .off("select", updateSelectedIndex)
        .off("reInit", syncCarousel)
        .off("scroll", tweenScale);
    };
  }, [emblaApi, setTweenNodes, tweenScale, updateSelectedIndex]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index, prefersReducedMotion());
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      className="relative">
      <div
        ref={viewportRef}
        className="relative overflow-hidden px-1 py-10 sm:px-2 sm:py-12">
        <div className="flex touch-pan-y touch-pinch-zoom items-center">
          {projects.map((project, index) => (
            <div
              key={project.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
              /* CHANGED: wider slides + negative left margin so neighbours
                 overlap and only a strip of each side card peeks out.
                 `relative` lets the slide carry the z-index. */
              className="relative min-w-0 flex-[0_0_70%] sm:flex-[0_0_58%]">
              <figure
                data-carousel-card
                className="group relative mx-auto w-full origin-center will-change-transform [--overlap:51.43%] sm:[--overlap:27.59%]">
                {/* CHANGED: wrapper owns radius + shadow so the overlay is clipped to the rounded corners */}
                <div
                  onPointerDown={handlePointerDown}
                  onClick={(e) =>
                    handleCardClick(
                      project.name,
                      selectedIndex === index,
                      index,
                      e,
                    )
                  }
                  className="group/media relative overflow-hidden rounded-2xl border border-[#cacaca] dark:border-neutral-800 shadow-[0_16px_36px_rgba(17,17,17,0.12)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.4)] transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_22px_48px_rgba(17,17,17,0.18)] dark:group-hover:shadow-[0_22px_48px_rgba(0,0,0,0.6)] sm:rounded-[20px]">
                  <img
                    src={project.image}
                    alt={`${project.name} project showcase`}
                    width={3840}
                    height={2160}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="block aspect-[16/11] sm:aspect-video w-full object-cover object-top sm:object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    data-carousel-dim
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-black opacity-60"
                  />
                  <ProjectOverlay
                    project={project}
                    isActive={selectedIndex === index}
                    canHover={canHover}
                    isTouchRevealed={touchRevealed === project.name}
                    onDismiss={() => setTouchRevealed(null)}
                    onViewDetails={onViewDetails}
                  />
                </div>
                <figcaption
                  data-carousel-caption
                  className="mt-4 text-center font-[Bebas_Neue] text-lg uppercase leading-none tracking-wide text-[#111111] dark:text-[#F5F5F5] sm:mt-5 sm:text-xl">
                  {project.name}
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-10 left-0 z-[150] w-3 rounded-r-full bg-gradient-to-r from-[#fafafa]/50 dark:from-[#0A0A0A]/60 via-[#fafafa]/35 dark:via-[#0A0A0A]/30 to-transparent sm:inset-y-12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-10 right-0 z-[150] w-3 rounded-l-full bg-gradient-to-l from-[#fafafa]/50 dark:from-[#0A0A0A]/60 via-[#fafafa]/35 dark:via-[#0A0A0A]/30 to-transparent sm:inset-y-12"
        />
      </div>

      <button
        type="button"
        aria-label="Show previous project"
        onClick={() => emblaApi?.scrollPrev(prefersReducedMotion())}
        className="absolute left-2 top-[45%] z-[200] grid size-10 -translate-y-1/2 place-items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#181818]/95 text-[#111111] dark:text-[#F5F5F5] shadow-md transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white sm:left-4 sm:size-12 motion-reduce:transition-none">
        <ChevronLeft aria-hidden="true" className="size-5 sm:size-6" />
      </button>
      <button
        type="button"
        aria-label="Show next project"
        onClick={() => emblaApi?.scrollNext(prefersReducedMotion())}
        className="absolute right-2 top-[45%] z-[200] grid size-10 -translate-y-1/2 place-items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-[#181818]/95 text-[#111111] dark:text-[#F5F5F5] shadow-md transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-lg active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white sm:right-4 sm:size-12 motion-reduce:transition-none">
        <ChevronRight aria-hidden="true" className="size-5 sm:size-6" />
      </button>

      <div
        role="group"
        aria-label="Choose project"
        className="mt-1 flex justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.name}
            type="button"
            aria-label={`Go to ${project.name}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none ${
              selectedIndex === index
                ? "w-7 bg-[#111111] dark:bg-white"
                : "w-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-600"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Drag or swipe to browse projects
      </p>
    </section>
  );
}
/* 

remove very narrow, curved gradient fade to the carousel’s outer edges in Carousel.tsx. It blends into the existing #fafafa background without changing the layout or taking up space.
*/
