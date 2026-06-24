import type { Metadata } from "next";
import PublicLayout from "@/components/layout/PublicLayout";
import Hero from "@/components/sections/Hero";
import Foundation from "@/components/sections/Foundation";
import WhyTenderville from "@/components/sections/WhyTenderville";
import NurtureLeaders from "@/components/sections/NurtureLeaders";
import Activities from "@/components/sections/Activities";
import Results from "@/components/sections/Results";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

export const metadata: Metadata = {
  title: "Tenderville School — We leave no child behind",
  description:
    "Tenderville School in Lagos nurtures every child to become a confident, compassionate, and successful adult. Strong academic foundation, character development, and inclusive learning.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero — above the fold, no reveal animation (already visible) */}
      <Hero />

      <RevealOnScroll>
        <Foundation />
      </RevealOnScroll>

      <RevealOnScroll>
        <WhyTenderville />
      </RevealOnScroll>

      <RevealOnScroll>
        <NurtureLeaders />
      </RevealOnScroll>

      <RevealOnScroll>
        <Activities />
      </RevealOnScroll>

      <RevealOnScroll>
        <Results />
      </RevealOnScroll>
    </PublicLayout>
  );
}
