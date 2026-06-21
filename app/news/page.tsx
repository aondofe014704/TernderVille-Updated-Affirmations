import type { Metadata } from "next";
import { Suspense } from "react";
import NewsList from "./_components/NewsList";
import PublicLayout from "@/components/layout/PublicLayout";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Stay updated with the latest news, events, and stories from Tenderville School.",
  alternates: { canonical: "/news" },
};

// Always fetch fresh news — do not cache the listing page at the edge
export const dynamic = "force-dynamic";

export default function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; page?: string }>;
}) {
  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-gray-50 to-orange-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">News &amp; Events</h1>
            <p className="text-gray-600">Stay updated with the latest from Tenderville School</p>
          </div>
          <Suspense fallback={<NewsListSkeleton />}>
            <NewsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </PublicLayout>
  );
}

function NewsListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
          <div className="h-40 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-5 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
