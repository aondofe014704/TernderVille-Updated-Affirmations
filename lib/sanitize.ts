import sanitizeHtml from "sanitize-html";

/**
 * Sanitize HTML coming from the rich text editor.
 *
 * Allowed tags map 1:1 to TipTap's StarterKit + Link + Underline output.
 * Anything else gets stripped. Links always get target="_blank" rel="noopener".
 *
 * Server-side ONLY. Never call from client code.
 */
export function sanitizeRichHtml(dirty: string): string {
  if (!dirty || typeof dirty !== "string") return "";

  return sanitizeHtml(dirty, {
    allowedTags: [
      "p", "br",
      "strong", "em", "u", "s",
      "h2", "h3",
      "ul", "ol", "li",
      "a",
      "blockquote",
      "code",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      // Force every link to open in new tab with safe rel
      a: (tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },
    // Disallow attributes containing JS
    disallowedTagsMode: "discard",
  });
}

/**
 * Validate a URL is safe to use as a CTA destination.
 * Must be http://, https://, mailto:, or tel:
 */
export function isSafeUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.length > 2000) return false;
  return /^(https?:\/\/|mailto:|tel:)/i.test(trimmed);
}
