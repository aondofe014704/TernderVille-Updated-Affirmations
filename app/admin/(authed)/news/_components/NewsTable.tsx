"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Pencil, Trash2, Eye, EyeOff, Calendar, Clock as ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface NewsRow {
  _id: string;
  title: string;
  type: "news" | "event";
  image: string;
  isActive: boolean;
  publishAt: string;
  eventDate?: string | null;
  createdAt: string;
}

export default function NewsTable({ items }: { items: NewsRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/news/${deletingId}`, { method: "DELETE" });
      if (res.ok) {
        setDeletingId(null);
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const now = Date.now();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
        <p className="text-gray-500">No posts yet. Create your first one.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {items.map((item) => {
            const isScheduled = new Date(item.publishAt).getTime() > now + 60_000;
            return (
              <li key={item._id} className="p-4 sm:p-5 flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-gray-100 shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span
                      className={
                        item.type === "news"
                          ? "px-2 py-0.5 text-xs font-medium rounded-full bg-orange-100 text-orange-700"
                          : "px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700"
                      }
                    >
                      {item.type === "news" ? "News" : "Event"}
                    </span>
                    {!item.isActive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        <EyeOff className="w-3 h-3" /> Hidden
                      </span>
                    )}
                    {item.isActive && !isScheduled && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
                        <Eye className="w-3 h-3" /> Live
                      </span>
                    )}
                    {isScheduled && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                        <ClockIcon className="w-3 h-3" />
                        Scheduled {new Date(item.publishAt).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}
                      </span>
                    )}
                    {item.type === "event" && item.eventDate && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-amber-50 text-amber-700">
                        <Calendar className="w-3 h-3" />
                        Event {new Date(item.eventDate).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/news/${item._id}/edit`}>
                      <Pencil className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeletingId(item._id)}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {deletingId && (
        <Dialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}>
          <DialogContent>
            <DialogTitle>Delete this post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The post and its image will be permanently removed.
            </DialogDescription>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeletingId(null)} disabled={isDeleting}>
                Cancel
              </Button>
              <Button onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
