import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tenderville.net";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/classes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/news`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contacts`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  // Dynamic news article routes — Google can crawl new articles automatically
  try {
    await connectDB();
    const articles = await News.find({ isActive: true }).select("_id updatedAt").sort({ updatedAt: -1 }).limit(500).lean();
    const newsRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
      url: `${SITE_URL}/news/${String(a._id)}`,
      lastModified: a.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    }));
    return [...staticRoutes, ...newsRoutes];
  } catch {
    // If Mongo is unreachable at build time, just return static routes
    return staticRoutes;
  }
}
