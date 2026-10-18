import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebook },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  {
    label: "WhatsApp",
    href: "https://www.whatsapp.com/",
    Icon: FaWhatsapp,
  },
  { label: "Telegram", href: "https://telegram.org/", Icon: FaTelegram },
  { label: "GitHub", href: "https://github.com/MohamedOsama1907", Icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: FaLinkedin,
  },
];

const socialLinkClass =
  "group grid size-[40px] shrink-0 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors duration-350 ease-out hover:border-[#111111] hover:bg-[#111111] hover:text-white focus-visible:border-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] motion-reduce:transition-none";

export default function SocialSidebar() {
  return (
    <aside
      aria-label="Social links"
      className="w-full shrink-0 py-6 lg:w-[100px] lg:py-0">
      <nav
        aria-label="Social media"
        className="mx-auto flex max-w-[240px] flex-wrap items-center justify-center gap-1 sm:max-w-none sm:flex-nowrap lg:flex-col lg:gap-2">
        <span
          aria-hidden="true"
          className="hidden h-[70px] w-px bg-neutral-200 lg:block"
        />
        {socialLinks.map(({ label, href, Icon }) => (
          <Link
            key={label}
            to={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className={socialLinkClass}>
            <Icon aria-hidden="true" className="size-5" strokeWidth={2} />
          </Link>
        ))}
        <span
          aria-hidden="true"
          className="hidden h-[70px] w-px bg-neutral-200 lg:block"
        />
      </nav>
    </aside>
  );
}
