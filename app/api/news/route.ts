import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export const runtime = "nodejs";

/**
 * Public news/events feed. Filters out:
 *   - inactive posts (isActive=false)
 *   - scheduled future posts (publishAt > now)
 *
 * Sorted by publishAt DESC so the newest published post is first.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const type = url.searchParams.get("type");
  const limit = Math.min(50, parseInt(url.searchParams.get("limit") || "20", 10) || 20);

  await connectDB();

  const filter: Record<string, unknown> = {
    isActive: true,
    publishAt: { $lte: new Date() },
  };
  if (type === "news" || type === "event") {
    filter.type = type;
  }

  const items = await News.find(filter)
    .sort({ publishAt: -1 })
    .limit(limit)
    .lean();

  return NextResponse.json({
    items: items.map((i) => ({
      ...i,
      _id: String(i._id),
      createdAt: i.createdAt.toISOString(),
      publishAt: i.publishAt.toISOString(),
      eventDate: i.eventDate ? i.eventDate.toISOString() : null,
    })),
  });
}
