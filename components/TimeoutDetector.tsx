"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, RefreshCw } from "lucide-react";

/**
 * Detects when a Suspense boundary or async render is taking longer than expected.
 * Shows a "Taking longer than expected" branded screen with retry button.
 *
 * Mounts a 15-second timer when the component first renders. If the user is
 * still on the same render after that, we replace the children with a friendly
 * timeout message. The user can retry, which reloads the route.
 *
 * Used on routes that hit the database (e.g. /news), which may be slow on
 * Vercel cold starts or with a slow Atlas region.
 */
export default function TimeoutDetector({
  children,
  ms = 15000,
}: {
  children: React.ReactNode;
  ms?: number;
}) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), ms);
    return () => clearTimeout(t);
  }, [ms]);

  if (!timedOut) return <>{children}</>;

  return (
    <div className="flex flex-col items-center text-center py-16 px-4">
      <div className="tv-glass-strong rounded-3xl p-8 sm:p-12 max-w-md w-full">
        <Image
          src="/logo.png"
          alt="Tenderville"
          width={64}
          height={64}
          className="rounded-2xl mx-auto mb-5 tv-pulse"
        />
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-4">
          <Clock className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Taking longer than expected</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          The connection seems slow right now. You can keep waiting, or try reloading the page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md tv-btn-gradient text-white text-sm font-medium shadow-md"
          >
            <RefreshCw className="w-4 h-4" /> Reload
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
