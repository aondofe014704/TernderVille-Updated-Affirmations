import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import { requireAdmin } from "@/lib/session";
import { uploadImage } from "@/lib/cloudinary";
import { sanitizeRichHtml, isSafeUrl } from "@/lib/sanitize";

export const runtime = "nodejs"; // Cloudinary SDK needs Node

const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4MB

const createSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().min(2).max(500),
  type: z.enum(["news", "event"]),
  content: z.string().max(50_000).optional().default(""),
  eventDate: z.string().optional(),     // ISO date string from form
  eventTime: z.string().trim().max(50).optional(),
  ctaLabel: z.string().trim().max(60).optional(),
  ctaUrl: z.string().trim().max(2000).optional(),
  publishAt: z.string().optional(),     // ISO date string; "" or absent = now
  isActive: z.string().optional(),      // "true" / "false" from FormData
});

export async function POST(req: Request) {
  const user = await requireAdmin();

  const formData = await req.formData();
  const body: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string") body[k] = v;
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const imageFile = formData.get("image");
  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }
  if (imageFile.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "Image must be under 4MB" }, { status: 400 });
  }

  // Validate optional CTA pair: if URL given, label given; if label given, URL given
  const ctaUrl = parsed.data.ctaUrl?.trim() || null;
  const ctaLabel = parsed.data.ctaLabel?.trim() || null;
  if ((ctaUrl && !ctaLabel) || (!ctaUrl && ctaLabel)) {
    return NextResponse.json(
      { error: "CTA needs both a label and a URL, or neither" },
      { status: 400 },
    );
  }
  if (ctaUrl && !isSafeUrl(ctaUrl)) {
    return NextResponse.json(
      { error: "CTA URL must start with http://, https://, mailto:, or tel:" },
      { status: 400 },
    );
  }

  // Parse dates
  let eventDate: Date | null = null;
  if (parsed.data.type === "event" && parsed.data.eventDate) {
    const d = new Date(parsed.data.eventDate);
    if (!isNaN(d.getTime())) eventDate = d;
  }

  let publishAt: Date = new Date(); // default: now
  if (parsed.data.publishAt && parsed.data.publishAt !== "") {
    const d = new Date(parsed.data.publishAt);
    if (!isNaN(d.getTime())) publishAt = d;
  }

  // Sanitize HTML content
  const safeContent = sanitizeRichHtml(parsed.data.content ?? "");

  // Upload image
  await connectDB();
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const uploadResult = await uploadImage(buffer, "tenderville/news");

  const doc = await News.create({
    title: parsed.data.title,
    description: parsed.data.description,
    type: parsed.data.type,
    content: safeContent,
    eventDate,
    eventTime: parsed.data.type === "event" ? (parsed.data.eventTime?.trim() || null) : null,
    ctaLabel,
    ctaUrl,
    publishAt,
    image: uploadResult.secure_url,
    imagePublicId: uploadResult.public_id,
    isActive: parsed.data.isActive !== "false",
    createdBy: user.sub,
  });

  return NextResponse.json({ id: String(doc._id) }, { status: 201 });
}
