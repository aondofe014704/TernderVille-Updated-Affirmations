import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import NewsTable from "./_components/NewsTable";

export const dynamic = "force-dynamic";

async function getAllPosts() {
  await connectDB();
  // Admin view: NO filter on isActive or publishAt — show everything
  const items = await News.find().sort({ publishAt: -1, createdAt: -1 }).lean();
  return items.map((i) => {
    // Defensive: legacy posts may not have publishAt — fall back to createdAt
    const publishAt = i.publishAt ?? i.createdAt ?? new Date();
    return {
      _id: String(i._id),
      title: i.title ?? "(untitled)",
      type: i.type ?? "news",
      image: i.image ?? "",
      isActive: i.isActive ?? true,
      publishAt: publishAt instanceof Date ? publishAt.toISOString() : new Date(publishAt).toISOString(),
      eventDate: i.eventDate
        ? (i.eventDate instanceof Date ? i.eventDate.toISOString() : new Date(i.eventDate).toISOString())
        : null,
      createdAt: i.createdAt
        ? (i.createdAt instanceof Date ? i.createdAt.toISOString() : new Date(i.createdAt).toISOString())
        : new Date().toISOString(),
    };
  });
}

export default async function AdminNewsPage() {
  const items = await getAllPosts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">News & Events</h2>
          <p className="text-sm text-gray-500 mt-1">{items.length} total posts</p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new">
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </Button>
      </div>

      <NewsTable items={items} />
    </div>
  );
}
