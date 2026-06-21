import type { Metadata } from "next";
import BrandedFallback from "@/components/brand/BrandedFallback";

export const metadata: Metadata = {
  title: "Connection slow",
  robots: { index: false },
};

export default function TimeoutPage() {
  return (
    <BrandedFallback
      variant="error"
      message="The request is taking longer than usual. Please try again or come back later."
      action={{ label: "Try again", href: "/" }}
    />
  );
}
