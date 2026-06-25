import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import Container from "@/components/layout/Container";
import { EVENTS } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events | Tenderville School",
  description:
    "Stay up to date with the latest events, celebrations, and milestones happening at Tenderville School.",
  alternates: { canonical: "/events" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EventsPage() {
  // Most recent events first
  const sorted = [...EVENTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-green-50/60 to-white min-h-screen">
        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-orange-200/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 py-12 sm:py-16">
          <Container>
            {/* Page header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-green-100/80 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
                <Calendar className="w-4 h-4" />
                School Events
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Events at{" "}
                <span className="text-orange-600">Tenderville</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Celebrations, competitions, milestones, and everything in between — this is
                where school life comes alive.
              </p>
            </div>

            {/* Event cards */}
            {sorted.length === 0 ? (
              <div className="tv-glass-strong rounded-3xl p-16 text-center max-w-lg mx-auto">
                <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No events yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sorted.map((event) => (
                  <article
                    key={event.id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Banner thumbnail */}
                    <div className="relative h-52 overflow-hidden shrink-0">
                      <Image
                        src={event.banner}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                          Event
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                        {event.title}
                      </h2>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                        {event.excerpt}
                      </p>
                      <div className="pt-5 mt-auto border-t border-gray-100">
                        <Link
                          href={`/events/${event.id}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-all group-hover:gap-2.5"
                        >
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </div>
      </div>
    </PublicLayout>
  );
}
