import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";

export default function Results() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <Image
              src="https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539001/_DSC4845_e8efz6.jpg"
              alt="Tenderville students celebrating results"
              width={800}
              height={600}
              className="w-full h-64 sm:h-80 lg:h-[26rem] object-cover rounded-3xl tv-shadow-floated"
              loading="lazy"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Outstanding Results, Year After Year
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our students consistently achieve excellence in academics, character, and leadership.
              From early years to graduation, we celebrate every milestone on their journey.
            </p>
            <Button asChild size="lg" className="tv-btn-gradient text-white shadow-md">
              <Link href="/about">Read Their Stories</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
