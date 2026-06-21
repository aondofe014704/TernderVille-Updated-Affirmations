import type { Metadata } from "next";
import BrandedFallback from "@/components/brand/BrandedFallback";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false },
};

export default function OfflinePage() {
  return <BrandedFallback variant="offline" />;
}
