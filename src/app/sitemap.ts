import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/services",
  "/results",
  "/contact",
  "/tools",
  "/tools/ductulator",
  "/tools/offset-calculator",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route, index) => ({
    url: `https://raaptech.com${route}`,
    lastModified,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : route.startsWith("/tools/") ? 0.8 : 0.7,
  }));
}
