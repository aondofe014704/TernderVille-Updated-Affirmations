import type { Metadata } from "next";
import BrandedFallback from "@/components/brand/BrandedFallback";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <BrandedFallback
      variant="404"
      action={{ label: "Back to home", href: "/" }}
    />
  );
}
