import type { TFunction } from "i18next";
import type { ProjectItem } from "../data/projectsData";

const categoryKeys: Record<string, string> = {
  "E-commerce Projects": "category.ecommerceProjects",
  "Web Applications": "category.web",
  "Landing Pages": "category.landing",
  "Education & Learning": "category.education",
  "Entertainment & Games": "category.entertainment",
  Portfolio: "category.portfolio",
};

export type LocalizedProject = Omit<ProjectItem, "category"> & { category: string };

export function localizeProject<T extends LocalizedProject>(
  project: T,
  t: TFunction,
): Omit<T, "category"> & { category: string } {
  const key = `projects.${project.id}`;
  return {
    ...project,
    name: t(`${key}.name`, { defaultValue: project.name }),
    category: t(categoryKeys[project.category] ?? "", {
      defaultValue: project.category,
    }),
    badge: t(`${key}.badge`, { defaultValue: project.badge }),
    description: t(`${key}.description`, { defaultValue: project.description }),
    longDescription: t(`${key}.longDescription`, {
      defaultValue: project.longDescription,
    }),
    highlights: project.highlights.map((item, index) =>
      t(`${key}.highlights.${index}`, { defaultValue: item }),
    ),
  };
}
