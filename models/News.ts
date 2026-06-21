/**
 * News / Event model.
 *
 * Fields:
 *   title, description, image, imagePublicId, type, isActive, createdBy  — base
 *   content        — sanitized HTML body for the post
 *   eventDate      — calendar date for events (optional)
 *   eventTime      — display string like "7:00 PM WAT" (optional)
 *   ctaLabel       — button text, e.g. "Register Now" (optional)
 *   ctaUrl         — link target (optional)
 *   publishAt      — when post becomes visible to public. Defaults to now.
 *
 * Public queries MUST filter on:
 *   isActive: true AND publishAt <= now()
 *
 * Admin queries see everything (including scheduled).
 */
import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";

export interface INews extends Document {
  title: string;
  description: string;
  image: string;
  imagePublicId: string;
  type: "news" | "event";
  content?: string;
  eventDate?: Date | null;
  eventTime?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  publishAt: Date;
  createdBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    type: { type: String, enum: ["news", "event"], required: true, index: true },
    content: { type: String, default: "" },
    eventDate: { type: Date, default: null },
    eventTime: { type: String, default: null, trim: true },
    ctaLabel: { type: String, default: null, trim: true },
    ctaUrl: { type: String, default: null, trim: true },
    publishAt: { type: Date, default: Date.now, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

// Compound index for the "show me visible posts, newest published first" query
newsSchema.index({ isActive: 1, publishAt: -1, type: 1 });

const News: Model<INews> = (mongoose.models.News as Model<INews>) || mongoose.model<INews>("News", newsSchema);

export default News;
