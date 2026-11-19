import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-6 sm:mt-8 border-t border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#0A0A0A]  md:pb-0">
      <div className="mx-auto flex w-full min-w-0 max-w-[1180px] items-center justify-between gap-x-4 gap-y-1.5 px-4 py-3 sm:px-6 sm:py-4 lg:ps-[100px] flex-wrap sm:flex-nowrap">
        <Link
          aria-label={t("footer.home")}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          to="/"
          className="w-fit shrink-0 font-[Bebas_Neue] text-base sm:text-lg uppercase leading-none text-[#111111] dark:text-[#F5F5F5] transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] dark:focus-visible:outline-white">
          {t("hero.name")}
        </Link>

        <p className="text-[11px] sm:text-xs leading-tight text-neutral-400 dark:text-neutral-500">
          © {new Date().getFullYear()} {t("hero.name")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
