import type { MetadataRoute } from "next";

const BASE = "https://raaptech.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/projects", "/contact"] as const;
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
