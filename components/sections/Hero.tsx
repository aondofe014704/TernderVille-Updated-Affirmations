import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import Carousel from "@/components/ui/Carousel";
import { HERO_CAROUSEL } from "@/lib/images";

/**
 * Hero — full-width carousel directly under navbar.
 *
 * Mobile (< sm): card stacked over carousel, badge top-right
 * Tablet+ (sm+): card overlays carousel on left, badge bottom-right
 */
export default function Hero() {
  return (
    <section className="relative">
      <div className="relative">
        <Carousel
          images={HERO_CAROUSEL}
          aspectRatio="4 / 5"
          autoplayMs={6000}
          priority
          rounded="none"
          className="sm:!aspect-[16/10] md:!aspect-[16/9] md:rounded-b-3xl overflow-hidden"
        />

        {/* Dark gradient overlay — stronger on mobile for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-br from-black/70 sm:from-black/55 via-black/30 sm:via-black/25 to-black/10 sm:to-transparent pointer-events-none md:rounded-b-3xl"></div>

        {/* Glass overlay card */}
        <div className="absolute inset-0 flex items-end sm:items-center pointer-events-none">
          <Container className="pb-4 sm:pb-0">
            <div className="max-w-full sm:max-w-2xl pointer-events-auto">
              <div className="tv-glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-10 shadow-xl">
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
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
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

        {/* 100% badge — top-right on mobile, bottom-right on desktop */}
        <div className="absolute top-4 right-4 sm:top-auto sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 pointer-events-none">
          <div className="tv-glass-dark text-white px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg">
            <p className="font-bold text-xl sm:text-2xl lg:text-3xl leading-none">100%</p>
            <p className="text-[10px] sm:text-xs lg:text-sm mt-0.5 sm:mt-1 opacity-90">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
