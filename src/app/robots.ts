import type { MetadataRoute } from "next";

// The couple prefers the site stay out of search engines. This is not access control.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
