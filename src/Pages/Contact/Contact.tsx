import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Mail, Phone, Send } from "lucide-react";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
const contactCards = [
  {
    label: "Email",
    value: "mohamedosama0110054@gmail.com",
    href: "mailto:mohamedosama0110054@gmail.com",
    Icon: Mail,
    isLucide: true,
  },
  {
    label: "WhatsApp",
    value: "+20 111 320 3572",
    href: "https://wa.me/201113203572",
    Icon: FaWhatsapp,
    isLucide: false,
  },
  {
    label: "Telegram",
    value: "@Mohammed19071",
    href: "https://t.me/Mohammed19071",
    Icon: FaTelegram,
    isLucide: false,
  },
  {
    label: "Call me",
    value: "+20 111 320 3572",
    href: "tel:+201113203572",
    Icon: Phone,
    isLucide: true,
  },
] as const;

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/mohamed.osama.8952",
    Icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mohammmmed98789",
    Icon: FaInstagram,
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
];
export default function Contact() {
  const signupSchema = z.object({
    name: z.string().min(1, { error: "Please enter your name." }),
    email: z
      .email({ error: "Please enter a valid email." })
      .min(1, { error: " Please enter your email." }),
    subject: z.string().min(1, { error: "Please enter a subject." }),
    message: z.string().min(1, { error: "Tell me a bit about your project." }),
  });
  type ContactFormData = z.infer<typeof signupSchema>;

  const { register, handleSubmit, formState } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const servicesid = "service_qa7pvae";
  const templaetid = "template_60xrrbl";
  const publicKey = "oU-qrTB5YIUzEVMPT";
  const validateFunction: SubmitHandler<ContactFormData> = async (formData) => {
    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(servicesid, templaetid, templateParams, {
        publicKey,
      });
      toast.success(
        "Your message was sent successfully. I'll get back to you soon.",
      );
    } catch {
      toast.error("Your message could not be sent. Please try again.");
    }
  };
  return (
    <section
      aria-labelledby="contact-title"
      className="w-full py-4 pb-15 sm:py-6">
      {/* Section heading */}
      <h2
        id="contact-title"
        className="font-[Bebas_Neue] text-[29px] uppercase leading-none text-[#111111] dark:text-[#F5F5F5] sm:text-[48px]">
        Get in touch
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400 sm:mt-5 sm:text-base sm:leading-7">
        Have a project in mind? Reach me directly or send a message and I'll
        reply fast.
      </p>

      {/* Two-column layout */}
      <div className="mt-8 grid gap-6 sm:mt-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8 xl:gap-10">
        {/* Left column — contact info */}
        <div className="flex flex-col gap-3">
          {/* Contact cards */}
          {contactCards.map(({ label, value, href, Icon, isLucide }) => (
            <a
              key={label}
              href={href}
              target={
                label === "Email" || label === "Call me" ? undefined : "_blank"
              }
              rel={
                label === "Email" || label === "Call me"
                  ? undefined
                  : "noreferrer"
              }
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] px-4 py-4 transition-all duration-300 ease-out hover:translate-x-1.5 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-[#181818] hover:shadow-[0_4px_14px_rgba(17,17,17,0.06)] dark:hover:shadow-[0_4px_14px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none sm:px-5">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#1c1c1c] text-neutral-600 dark:text-neutral-400 transition-colors duration-200 group-hover:text-[#111111] dark:group-hover:text-[#F5F5F5] motion-reduce:transition-none">
                {isLucide ? (
                  <Icon className="size-5" strokeWidth={1.8} />
                ) : (
                  <Icon className="size-5" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#111111] dark:text-[#F5F5F5]">
                  {label}
                </p>
                <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {value}
                </p>
              </div>
            </a>
          ))}

          {/* Availability badge — inserted after first card per design */}
          {/* Re-rendered in correct order below via reordering */}

          {/* Find me online */}
          <div className="mt-3">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Find me online
            </p>
            <nav
              aria-label="Social media links"
              className="mt-3 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-neutral-600 dark:text-neutral-400 transition-colors duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none">
                  <Icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Right column — contact form */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-5 shadow-[0_2px_12px_rgba(17,17,17,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] sm:p-8">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(validateFunction)}>
            <div>
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-semibold text-[#111111] dark:text-[#F5F5F5]">
                Your name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#1c1c1c] px-4 py-3 text-sm text-[#111111] dark:text-[#F5F5F5] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]/20 dark:focus-visible:ring-white/20 motion-reduce:transition-none"
              />
              {formState.errors.name ? (
                <p className=" text-[13px] text-[#dc2626] bg-transparent mt-1">
                  *{formState.errors.name.message}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-semibold text-[#111111] dark:text-[#F5F5F5]">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#1c1c1c] px-4 py-3 text-sm text-[#111111] dark:text-[#F5F5F5] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]/20 dark:focus-visible:ring-white/20 motion-reduce:transition-none"
              />
              {formState.errors.email ? (
                <p className=" text-[13px] text-[#dc2626] bg-transparent mt-1">
                  *{formState.errors.email.message}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-semibold text-[#111111] dark:text-[#F5F5F5]">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                placeholder="Project inquiry"
                {...register("subject")}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#1c1c1c] px-4 py-3 text-sm text-[#111111] dark:text-[#F5F5F5] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]/20 dark:focus-visible:ring-white/20 motion-reduce:transition-none"
              />
              {formState.errors.subject ? (
                <p className=" text-[13px] text-[#dc2626] bg-transparent mt-1">
                  *{formState.errors.subject.message}
                </p>
              ) : (
                ""
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold text-[#111111] dark:text-[#F5F5F5]">
                Message
              </label>
              <textarea
                id="contact-message"
                placeholder="Tell me about your project..."
                {...register("message")}
                rows={5}
                className="w-full resize-y rounded-xl border border-neutral-200 dark:border-neutral-800 bg-[#fafafa] dark:bg-[#1c1c1c] px-4 py-3 text-sm text-[#111111] dark:text-[#F5F5F5] placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-colors duration-200 focus:border-neutral-400 dark:focus:border-neutral-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]/20 dark:focus-visible:ring-white/20 motion-reduce:transition-none"
              />
              {formState.errors.message ? (
                <p className=" text-[13px] text-[#dc2626] bg-transparent mt-1">
                  *{formState.errors.message.message}
                </p>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111111] dark:bg-white py-3.5 text-[15px] font-semibold text-white dark:text-[#111111] transition-[background-color,box-shadow] duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:shadow-[0_4px_14px_rgba(17,17,17,0.16)] dark:hover:shadow-[0_4px_14px_rgba(255,255,255,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] dark:focus-visible:outline-white motion-reduce:transition-none">
              {formState.isSubmitting ? "Sending..." : "Send message"}
              <Send aria-hidden="true" className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
