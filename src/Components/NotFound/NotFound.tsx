import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate flex min-h-[min(62svh,36rem)] w-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:px-6 sm:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(76vw,29rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200/80 dark:border-neutral-800/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(58vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200/60 dark:border-neutral-800/60"
      />

      <p className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] px-4 py-2 font-[Bebas_Neue] text-sm uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400 shadow-sm">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-[#111111] dark:bg-white" />
        Error 404 · Page not found
      </p>

      <h1
        id="not-found-title"
        className="mt-5 bg-gradient-to-b from-[#111111] via-[#111111] to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-600 bg-clip-text font-[Bebas_Neue] text-[clamp(7rem,22vw,15rem)] leading-[0.78] tracking-[-0.045em] text-transparent">
        404
      </h1>

      <h2 className="mt-7 max-w-[18ch] font-[Bebas_Neue] text-[clamp(1.65rem,4vw,2.75rem)] uppercase leading-[0.98] text-[#111111] dark:text-[#F5F5F5]">
        Oops! This page got lost in space.
      </h2>
      <p className="mt-3 max-w-[34rem] text-[13px] leading-6 text-neutral-500 dark:text-neutral-400 sm:text-base sm:leading-7">
        The page you’re looking for may have moved, been removed, or never
        existed. Let’s get you back to something familiar.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#111111] dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-[#111111] shadow-[0_8px_24px_rgba(17,17,17,0.14)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:shadow-[0_12px_30px_rgba(17,17,17,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] dark:focus-visible:outline-white active:translate-y-0 motion-reduce:transition-none sm:mt-7 sm:min-h-12 sm:gap-2.5 sm:px-6 sm:py-3 sm:text-[15px]">
        <Home aria-hidden="true" className="size-4 sm:size-[18px]" />
        Back to Home
        <ArrowLeft aria-hidden="true" className="size-4 rotate-180" />
      </Link>
    </section>
  );
}
