import { IDashboardPagesMap, IPagesMap } from "types";

export const PAGE_LINKS: IPagesMap[] = [
  {
    href: "/",
    text: {
      en: "About",
      sr: "O meni",
    },
  },
  {
    href: "/projects",
    text: {
      en: "Projects",
      sr: "Projekti",
    },
  },
  {
    href: "/photography",
    text: {
      en: "Photography",
      sr: "Fotografija",
    },
  },
];

export const DASHBOARD_LINKS: IDashboardPagesMap[] = [
  {
    href: "/dashboard",
    text: "Dashboard",
  },
  {
    href: "/dashboard/projects",
    text: "Project Manager",
  },
  {
    href: "/dashboard/uploads",
    text: "Image Uploads",
  },
  {
    href: "/dashboard/categories",
    text: "Categories",
  },
];
