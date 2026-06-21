import { Newspaper, Calendar, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

// Admin pages must not be prerendered at build time:
//   1. They depend on auth (cookies) which only exist at request time
//   2. They query Mongo which may be unreachable during the Vercel build
export const dynamic = "force-dynamic";

async function getStats() {
  await connectDB();
  const [totalNews, totalEvents, activeCount, inactiveCount, recent] = await Promise.all([
    News.countDocuments({ type: "news" }),
    News.countDocuments({ type: "event" }),
    News.countDocuments({ isActive: true }),
    News.countDocuments({ isActive: false }),
    News.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);
  return {
    totalNews,
    totalEvents,
    activeCount,
    inactiveCount,
    recent: recent.map((r) => ({ ...r, _id: String(r._id), createdAt: r.createdAt.toISOString() })),
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "News Articles", value: stats.totalNews, icon: Newspaper, color: "text-orange-600 bg-orange-50" },
    { label: "Events", value: stats.totalEvents, icon: Calendar, color: "text-green-600 bg-green-50" },
    { label: "Active", value: stats.activeCount, icon: Eye, color: "text-blue-600 bg-blue-50" },
    { label: "Hidden", value: stats.inactiveCount, icon: EyeOff, color: "text-gray-600 bg-gray-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of your content</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No content yet. Create your first news article from the News page.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {stats.recent.map((item) => (
                <li key={item._id} className="py-3 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.type === "news" ? "News" : "Event"} ·{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <span className={item.isActive ? "ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700" : "ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700"}>
                    {item.isActive ? "Active" : "Hidden"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
