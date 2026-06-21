"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Wraps any element and fades+slides it in when scrolled into view.
 *
 * Uses IntersectionObserver — single-fire (won't re-trigger when scrolled past).
 * Respects prefers-reduced-motion: shows content immediately if user has
 * reduced motion enabled.
 *
 * Usage:
 *   <RevealOnScroll>
 *     <h1>This fades in on scroll</h1>
 *   </RevealOnScroll>
 *
 *   <RevealOnScroll delay={100}>...stagger by 100ms...</RevealOnScroll>
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  className,
  threshold = 0.15,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;             // ms
  className?: string;
  threshold?: number;         // 0-1, how much of element must be visible
  as?: "div" | "section" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(m.matches);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger via delay
            if (delay > 0) {
              setTimeout(() => setVisible(true), delay);
            } else {
              setVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold, prefersReduced]);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      className={cn(
        "transition-all duration-700 ease-out will-change-[transform,opacity]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
