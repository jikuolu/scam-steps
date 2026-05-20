import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /plan is interactive and depends on sessionStorage — no value to crawl.
        disallow: ["/plan"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
