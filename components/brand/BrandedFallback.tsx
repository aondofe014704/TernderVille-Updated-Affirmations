import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Variant = "loading" | "error" | "404" | "offline";

interface BrandedFallbackProps {
  variant: Variant;
  message?: string;
  action?: { label: string; href?: string; onClick?: () => void };
}

const COPY: Record<Variant, { title: string; sub: string }> = {
  loading: { title: "Loading", sub: "Just a moment…" },
  error:   { title: "Something went wrong", sub: "We are looking into it. Please try again." },
  "404":   { title: "Page not found", sub: "The page you are looking for does not exist." },
  offline: { title: "You are offline", sub: "Check your connection. We will resume when you are back." },
};

export default function BrandedFallback({ variant, message, action }: BrandedFallbackProps) {
  const copy = COPY[variant];
  const pulse = variant === "loading" || variant === "offline";

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-orange-50 via-white to-white"
      role={variant === "loading" ? "status" : undefined}
      aria-live={variant === "loading" ? "polite" : undefined}
    >
      <div className="text-center max-w-md">
        <div className={cn("inline-flex flex-col items-center gap-3", pulse && "tv-pulse")}>
          {/* Real Tenderville logo. Local file so it works offline. next/image auto-converts to WebP/AVIF for online users. */}
          <Image
            src="/logo.png"
            alt="Tenderville School"
            width={88}
            height={88}
            priority
            unoptimized={variant === "offline"}
            className="rounded-2xl shadow-sm object-contain"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tenderville</h1>
            <p className="text-sm font-medium text-orange-500">We leave no child behind</p>
          </div>
        </div>

        <div className="mt-10 space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">{copy.title}</h2>
          <p className="text-sm text-gray-600">{message ?? copy.sub}</p>
        </div>

        {action && (
          <div className="mt-6">
            {action.href ? (
              <Link
                href={action.href}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
              >
                {action.label}
              </Link>
            ) : (
              <button
                onClick={action.onClick}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
              >
                {action.label}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
