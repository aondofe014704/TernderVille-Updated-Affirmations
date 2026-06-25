import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import Container from "@/components/layout/Container";
import { EVENTS } from "@/lib/events";

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) return { title: "Event not found" };

  return {
    title: `${event.title} | Tenderville School`,
    description: event.excerpt,
    alternates: { canonical: `/events/${event.id}` },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === id);
  if (!event) notFound();

  return (
    <PublicLayout>
      <article className="bg-gradient-to-br from-green-50/40 to-white py-8 sm:py-12 min-h-screen">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all events
            </Link>

            {/* Banner */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden tv-shadow-floated mb-8">
              <Image
                src={event.banner}
                alt={event.title}
                width={1200}
                height={675}
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="w-full h-auto object-contain bg-gray-50"
              />
            </div>

            {/* Event meta + title */}
            <div className="tv-glass-strong rounded-2xl sm:rounded-3xl px-6 py-7 sm:px-10 sm:py-10 tv-shadow-floated mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
                  Event
                </span>

              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {event.title}
              </h1>
            </div>

            {/* Full content */}
            <div
              className="prose prose-base sm:prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-gray-900
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-gray-900
                prose-ul:my-4 prose-ol:my-4 prose-li:my-1
                prose-a:text-orange-600 prose-a:font-medium hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />

            {/* Footer back link */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                View all events
              </Link>
            </div>
          </div>
        </Container>
      </article>
    </PublicLayout>
  );
}
