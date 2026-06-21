import { NextResponse } from "next/server";
import { z } from "zod";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import { requireAdmin } from "@/lib/session";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { sanitizeRichHtml, isSafeUrl } from "@/lib/sanitize";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

const updateSchema = z.object({
  title: z.string().trim().min(2).max(200),
  description: z.string().trim().min(2).max(500),
  type: z.enum(["news", "event"]),
  content: z.string().max(50_000).optional().default(""),
  eventDate: z.string().optional(),
  eventTime: z.string().trim().max(50).optional(),
  ctaLabel: z.string().trim().max(60).optional(),
  ctaUrl: z.string().trim().max(2000).optional(),
  publishAt: z.string().optional(),
  isActive: z.string().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const formData = await req.formData();
  const body: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string") body[k] = v;
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  await connectDB();
  const existing = await News.findById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Validate CTA pair
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

  // Dates
  let eventDate: Date | null = null;
  if (parsed.data.type === "event" && parsed.data.eventDate) {
    const d = new Date(parsed.data.eventDate);
    if (!isNaN(d.getTime())) eventDate = d;
  }

  let publishAt: Date = existing.publishAt;
  if (parsed.data.publishAt && parsed.data.publishAt !== "") {
    const d = new Date(parsed.data.publishAt);
    if (!isNaN(d.getTime())) publishAt = d;
  }

  // Sanitize content
  const safeContent = sanitizeRichHtml(parsed.data.content ?? "");

  // Optional new image
  const imageFile = formData.get("image");
  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Image must be under 4MB" }, { status: 400 });
    }
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadResult = await uploadImage(buffer, "tenderville/news");
    // Delete old
    if (existing.imagePublicId) {
      await deleteImage(existing.imagePublicId).catch(() => null);
    }
    existing.image = uploadResult.secure_url;
    existing.imagePublicId = uploadResult.public_id;
  }

  existing.title = parsed.data.title;
  existing.description = parsed.data.description;
  existing.type = parsed.data.type;
  existing.content = safeContent;
  existing.eventDate = eventDate;
  existing.eventTime = parsed.data.type === "event" ? (parsed.data.eventTime?.trim() || null) : null;
  existing.ctaLabel = ctaLabel;
  existing.ctaUrl = ctaUrl;
  existing.publishAt = publishAt;
  existing.isActive = parsed.data.isActive !== "false";

  await existing.save();

  return NextResponse.json({ id: String(existing._id) });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await connectDB();
  const doc = await News.findById(id);
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Delete the image from Cloudinary
  if (doc.imagePublicId) {
    await deleteImage(doc.imagePublicId).catch(() => null);
  }
  await doc.deleteOne();

  return NextResponse.json({ ok: true });
}
