import { BookOpen } from "lucide-react";
import Container from "@/components/layout/Container";
import Carousel from "@/components/ui/Carousel";
import { NURTURE_CAROUSEL } from "@/lib/images";

export default function NurtureLeaders() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50/60 to-white py-16 sm:py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200/25 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-300/15 rounded-full blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-green-100/80 text-green-800 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <BookOpen className="w-4 h-4" />
            Empowering Future Leaders
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-5">
            Nurturing Tomorrow's Leaders
          </h2>
          <p className="text-lg text-gray-900 leading-relaxed">
            We empower students to become influential leaders in their communities and beyond. Our
            innovative curriculum incorporates leadership development into every aspect of education.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="tv-glass-strong rounded-3xl p-3 sm:p-4 tv-shadow-floated">
            <Carousel
              images={NURTURE_CAROUSEL}
              aspectRatio="16 / 9"
              autoplayMs={5000}
              rounded="2xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
