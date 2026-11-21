import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string;
  ogType?: "website" | "profile" | "article";
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

const BASE_URL = "https://mohamed-osama-1907.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/mohamedDark.png`;

export default function SEO({
  title,
  description,
  canonicalPath = "/",
  keywords,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  noindex = false,
  jsonLd,
}: SEOProps) {
  const { i18n } = useTranslation();
  const isArabic = i18n.resolvedLanguage === "ar";

  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // 2. Meta description
    if (description) {
      updateMeta("description", description, "name");
    }

    // 3. Keywords
    if (keywords) {
      updateMeta("keywords", keywords, "name");
    }

    // 4. Robots
    updateMeta(
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      "name",
    );

    // 5. Canonical link
    const normalizedPath = canonicalPath.startsWith("/")
      ? canonicalPath
      : `/${canonicalPath}`;
    const canonicalUrl = `${BASE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;
    updateLink("canonical", canonicalUrl);

    // 6. Open Graph
    updateMeta("og:title", title || document.title, "property");
    if (description) {
      updateMeta("og:description", description, "property");
    }
    updateMeta("og:url", canonicalUrl, "property");
    updateMeta("og:type", ogType, "property");
    updateMeta("og:image", ogImage, "property");
    updateMeta("og:site_name", "Mohamed Osama | Portfolio", "property");
    updateMeta("og:locale", isArabic ? "ar_EG" : "en_US", "property");

    // 7. Twitter Card
    updateMeta("twitter:card", "summary_large_image", "name");
    updateMeta("twitter:title", title || document.title, "name");
    if (description) {
      updateMeta("twitter:description", description, "name");
    }
    updateMeta("twitter:image", ogImage, "name");

    // 8. JSON-LD Structured Data
    if (jsonLd) {
      let script = document.getElementById("page-jsonld") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = "page-jsonld";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(jsonLd);
    }
  }, [
    title,
    description,
    canonicalPath,
    keywords,
    ogType,
    ogImage,
    noindex,
    jsonLd,
    isArabic,
  ]);

  return null;
}

function updateMeta(
  identifier: string,
  content: string,
  attribute: "name" | "property",
) {
  let el = document.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${identifier}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, identifier);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function updateLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
