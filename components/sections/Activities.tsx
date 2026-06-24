import { Images } from "lucide-react";
import Container from "@/components/layout/Container";
import Carousel from "@/components/ui/Carousel";
import { ACTIVITIES_CAROUSEL } from "@/lib/images";

/**
 * Activities — full-width activities photo carousel.
 *
 * Sits between NurtureLeaders and Results on the home page.
 * Showcases tend1.png → tend68.png from /public/assets/.
 */
export default function Activities() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50/60 to-white py-16 sm:py-24">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Images className="w-4 h-4" />
            Life at Tenderville
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
            Our Activities in{" "}
            <span className="text-orange-600">Pictures</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            From classroom discoveries to playground adventures — every photo captures the
            joy, curiosity, and community that make Tenderville a special place to grow.
          </p>
        </div>

        {/* Carousel frame */}
        <div className="max-w-5xl mx-auto">
          <div className="tv-glass-strong rounded-3xl p-3 sm:p-4 tv-shadow-floated">
            <Carousel
              images={ACTIVITIES_CAROUSEL}
              aspectRatio="16 / 9"
              autoplayMs={4000}
              rounded="2xl"
              showDots={false}
            />
          </div>


        </div>
      </Container>
    </section>
  );
}
