import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import Carousel from "@/components/ui/Carousel";
import { HERO_CAROUSEL } from "@/lib/images";

/**
 * Hero — full-width carousel directly under navbar,
 * with the intro card placed below the carousel (not overlaid on top).
 */
export default function Hero() {
  return (
    <section>
      {/* ── Carousel (full width, no overlay) ── */}
      <div className="relative">
        <Carousel
          images={HERO_CAROUSEL}
          aspectRatio="4 / 5"
          autoplayMs={6000}
          priority
          rounded="none"
          className="sm:!aspect-[16/10] md:!aspect-[16/9] overflow-hidden"
        />

        {/* 100% badge — sits inside carousel, top-right */}
        <div className="absolute top-4 right-4 pointer-events-none">
          <div className="tv-glass-dark text-white px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg">
            <p className="font-bold text-xl sm:text-2xl lg:text-3xl leading-none">100%</p>
            <p className="text-[10px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1 opacity-90">Success Rate</p>
          </div>
        </div>
      </div>

      {/* ── Intro card — below carousel, above Foundation ── */}
      <div className="bg-white py-8 sm:py-10">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="tv-glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 shadow-xl text-center">
              <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2 sm:mb-3">
                Tenderville School
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-[1.1] sm:leading-[1.05]">
                We leave no <span className="text-orange-600">child</span> behind.
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Nurturing every child's potential through strong academics, character
                development, and an inclusive community where every learner thrives.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                <Button asChild size="lg" className="tv-btn-gradient text-white shadow-md w-full sm:w-auto">
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/90 backdrop-blur-sm w-full sm:w-auto">
                  <Link href="/contacts">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
