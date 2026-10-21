import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#0A0A0A] pb-[calc(max(1rem,env(safe-area-inset-bottom))+3.5rem)] md:pb-0">
      <div className="pl-[100px] mx-auto flex w-full min-w-0 max-w-[1180px] px-4 sm:px-6 flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4 ">
        <Link
          aria-label="Home"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          to="/"
          className="w-fit shrink-0 font-[Bebas_Neue] text-lg uppercase leading-none text-[#111111] dark:text-[#F5F5F5] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] dark:focus-visible:outline-white">
          Mohamed Osama
        </Link>

        <p className="w-full text-[11px] leading-none text-neutral-400 dark:text-neutral-500 sm:w-auto">
          © {new Date().getFullYear()} Mohamed Osama. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
