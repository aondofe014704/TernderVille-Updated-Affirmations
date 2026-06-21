"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselImage } from "@/lib/images";
import { cn } from "@/lib/cn";

interface CarouselProps {
  images: CarouselImage[];
  autoplayMs?: number;          // 0 to disable autoplay
  aspectRatio?: string;         // e.g. "16 / 9", "4 / 3"
  className?: string;
  imageClassName?: string;
  priority?: boolean;           // priority load on first image (for above-fold hero)
  showArrows?: boolean;
  showDots?: boolean;
  rounded?: "none" | "lg" | "xl" | "2xl" | "3xl";
}

const ROUNDED = {
  none: "",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

export default function Carousel({
  images,
  autoplayMs = 5000,
  aspectRatio = "16 / 9",
  className,
  imageClassName,
  priority = false,
  showArrows = true,
  showDots = true,
  rounded = "2xl",
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Respect prefers-reduced-motion: no autoplay
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(m.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  // Track current index for dot indicators
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Autoplay — pauses on hover, respects reduced-motion preference
  useEffect(() => {
    if (!emblaApi || autoplayMs <= 0 || prefersReducedMotion) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    let paused = false;

    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        if (!paused) emblaApi.scrollNext();
      }, autoplayMs);
    };
    const stop = () => {
      if (timer) { clearInterval(timer); timer = null; }
    };

    const rootNode = emblaApi.rootNode();
    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    rootNode.addEventListener("mouseenter", onEnter);
    rootNode.addEventListener("mouseleave", onLeave);

    start();
    return () => {
      stop();
      rootNode.removeEventListener("mouseenter", onEnter);
      rootNode.removeEventListener("mouseleave", onLeave);
    };
  }, [emblaApi, autoplayMs, prefersReducedMotion]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (idx: number) => emblaApi?.scrollTo(idx),
    [emblaApi],
  );

  if (!images || images.length === 0) return null;

  return (
    <div className={cn("relative group", className)}>
      <div
        ref={emblaRef}
        className={cn("overflow-hidden", ROUNDED[rounded])}
        style={{ aspectRatio }}
      >
        <div className="flex h-full">
          {images.map((img, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={priority && i === 0}
                loading={priority && i === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
                className={cn("object-cover", imageClassName)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows — desktop only, hover-revealed */}
      {showArrows && images.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous image"
            className="hidden md:flex absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-gray-900 items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next image"
            className="hidden md:flex absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm text-gray-900 items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === selected ? "w-8 bg-white" : "w-2 bg-white/60 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
