import { cn } from "@/lib/cn";

/**
 * Unified page-width container. Use this on every page section to guarantee
 * consistent edge spacing across the site.
 *
 *   <Container>...</Container>          → max-w-7xl (default)
 *   <Container size="narrow">...</...>  → max-w-4xl (article bodies)
 *   <Container size="wide">...</...>    → max-w-screen-2xl (gallery, etc)
 *
 * The horizontal padding scales with breakpoint so the content has room to
 * breathe on every screen size — fixes "text too close to the edge" issues.
 */
interface ContainerProps {
  children: React.ReactNode;
  size?: "narrow" | "default" | "wide";
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

const SIZE_CLASSES = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
};

export default function Container({
  children,
  size = "default",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto px-4 sm:px-6 lg:px-8", SIZE_CLASSES[size], className)}>
      {children}
    </Tag>
  );
}
