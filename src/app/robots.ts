import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://raaptech.com/sitemap.xml",
    host: "https://raaptech.com",
  };
}
