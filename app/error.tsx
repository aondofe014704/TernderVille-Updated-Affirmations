"use client";

import { useEffect } from "react";
import BrandedFallback from "@/components/brand/BrandedFallback";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Send to your error monitoring (Sentry, etc.) when you add it
    console.error("Route error:", error);
  }, [error]);

  return (
    <BrandedFallback
      variant="error"
      message={process.env.NODE_ENV === "development" ? error.message : undefined}
      action={{ label: "Try again", onClick: reset }}
    />
  );
}
