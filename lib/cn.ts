/**
 * Tailwind class merge. Used by every shadcn component to merge conditional
 * classes without conflicts (e.g. "p-4" + "p-2" → "p-2", not "p-4 p-2").
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
