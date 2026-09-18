import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** NOINDEX=1 (Railway → Variables) keeps a demo/staging deploy out of search engines. Remove it at launch. */
const noindex = process.env.NOINDEX === "1";

export default function robots(): MetadataRoute.Robots {
  if (noindex) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: `${site.url}/sitemap.xml` };
}
