import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import Affirmations from "@/components/sections/Affirmations";

export const metadata: Metadata = {
  title: "Affirmations — 3rd Term 2025–2026",
  description:
    "Tenderville School's weekly affirmations for 3rd Term 2025–2026. Partner with us and speak these affirmations over your child every single day.",
  alternates: { canonical: "/affirmations" },
  openGraph: {
    title: "Affirmations — 3rd Term 2025–2026 | Tenderville School",
    description:
      "A child who knows who they are cannot easily be told otherwise. Speak these affirmations over your child every day.",
    url: "/affirmations",
  },
};

export default function AffirmationsPage() {
  return (
    <PublicLayout>
      <Affirmations />
    </PublicLayout>
  );
}
