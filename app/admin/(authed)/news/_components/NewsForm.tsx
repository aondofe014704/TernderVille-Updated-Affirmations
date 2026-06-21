"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload, Calendar, Clock, Link2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import RichEditor from "@/components/admin/RichEditor";

interface NewsFormProps {
  initial?: {
    id: string;
    title: string;
    description: string;
    type: "news" | "event";
    image: string;
    isActive: boolean;
    content?: string;
    eventDate?: string | null;       // ISO date string
    eventTime?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
    publishAt?: string | null;       // ISO date string
  };
}

// Convert ISO date string to "YYYY-MM-DD" for <input type="date">
function isoToDateInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

// Convert ISO datetime to "YYYY-MM-DDTHH:mm" for <input type="datetime-local">
function isoToDateTimeInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function NewsForm({ initial }: NewsFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [type, setType] = useState<"news" | "event">(initial?.type ?? "news");
  const [content, setContent] = useState(initial?.content ?? "");
  const [eventDate, setEventDate] = useState(isoToDateInput(initial?.eventDate));
  const [eventTime, setEventTime] = useState(initial?.eventTime ?? "");
  const [ctaLabel, setCtaLabel] = useState(initial?.ctaLabel ?? "");
  const [ctaUrl, setCtaUrl] = useState(initial?.ctaUrl ?? "");
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  // Publishing: "now" vs "scheduled"
  const initialPublishAt = initial?.publishAt ? new Date(initial.publishAt) : null;
  const initialIsScheduled = !!(initialPublishAt && initialPublishAt.getTime() > Date.now() + 60_000);
  const [publishMode, setPublishMode] = useState<"now" | "scheduled">(initialIsScheduled ? "scheduled" : "now");
  const [scheduledAt, setScheduledAt] = useState(initialIsScheduled ? isoToDateTimeInput(initial?.publishAt) : "");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.image ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initial;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setError("Image must be under 4MB");
      return;
    }
    setError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }
    if (!isEdit && !imageFile) {
      setError("Please upload an image");
      return;
    }
    if ((ctaLabel && !ctaUrl) || (!ctaLabel && ctaUrl)) {
      setError("CTA needs both a label and a URL (or leave both empty)");
      return;
    }
    if (ctaUrl && !/^(https?:\/\/|mailto:|tel:)/i.test(ctaUrl.trim())) {
      setError("CTA URL must start with http://, https://, mailto:, or tel:");
      return;
    }
    if (publishMode === "scheduled" && !scheduledAt) {
      setError("Pick a date and time for scheduled publish");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("content", content);
      formData.append("isActive", isActive ? "true" : "false");
      if (type === "event") {
        if (eventDate) formData.append("eventDate", eventDate);
        if (eventTime.trim()) formData.append("eventTime", eventTime.trim());
      }
      if (ctaLabel.trim() && ctaUrl.trim()) {
        formData.append("ctaLabel", ctaLabel.trim());
        formData.append("ctaUrl", ctaUrl.trim());
      }
      if (publishMode === "scheduled" && scheduledAt) {
        // Convert local datetime to ISO
        const iso = new Date(scheduledAt).toISOString();
        formData.append("publishAt", iso);
      } else {
        // Publish now — leave field empty, backend defaults to Date.now()
        formData.append("publishAt", "");
      }
      if (imageFile) formData.append("image", imageFile);

      const url = isEdit ? `/api/admin/news/${initial.id}` : "/api/admin/news";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed");
        setIsSubmitting(false);
        return;
      }
      router.push("/admin/news");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {/* Basics */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900">Basics</h3>

          <div className="space-y-1.5">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={200}
              placeholder="e.g. The Parent Edge — Free Webinar with Praise Fowowe"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Short description (card teaser) *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={500}
              rows={3}
              placeholder="One or two sentences that appear on the news/events list card"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500">{description.length} / 500</p>
          </div>

          <div className="space-y-1.5">
            <Label>Type *</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setType("news")}
                disabled={isSubmitting}
                className={
                  type === "news"
                    ? "px-4 py-2 rounded-md border-2 border-orange-500 bg-orange-50 text-orange-700 font-medium text-sm"
                    : "px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                }
              >
                News
              </button>
              <button
                type="button"
                onClick={() => setType("event")}
                disabled={isSubmitting}
                className={
                  type === "event"
                    ? "px-4 py-2 rounded-md border-2 border-orange-500 bg-orange-50 text-orange-700 font-medium text-sm"
                    : "px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
                }
              >
                Event
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900">Cover image</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={isSubmitting}
          />
          {imagePreview ? (
            <div className="space-y-2">
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
              >
                <Upload className="w-4 h-4" />
                Change image
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="w-full max-w-md aspect-video rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50/50 flex flex-col items-center justify-center text-gray-500 text-sm transition-colors"
            >
              <Upload className="w-8 h-8 mb-2" />
              Click to upload (max 4MB)
            </button>
          )}
        </CardContent>
      </Card>

      {/* Event details (event only) */}
      {type === "event" && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Event details
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="eventDate">Event date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eventTime">Event time (display)</Label>
                <Input
                  id="eventTime"
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  maxLength={50}
                  placeholder="e.g. 7:00 PM WAT"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500">Type exactly how you want it shown</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full content (rich editor) */}
      <Card>
        <CardContent className="p-6 space-y-3">
          <h3 className="text-base font-semibold text-gray-900">Full post content</h3>
          <p className="text-xs text-gray-500">
            This is the rich body shown on the article page. Use the toolbar to format text, add links, and create lists.
          </p>
          <RichEditor
            value={content}
            onChange={setContent}
            placeholder="Write the full post here..."
            disabled={isSubmitting}
          />
        </CardContent>
      </Card>

      {/* CTA (optional) */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Link2 className="w-4 h-4" /> Call-to-action button (optional)
          </h3>
          <p className="text-xs text-gray-500">
            If both fields are filled, a prominent button appears at the bottom of the post.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ctaLabel">Button label</Label>
              <Input
                id="ctaLabel"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                maxLength={60}
                placeholder="e.g. Register Now"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ctaUrl">Button URL</Label>
              <Input
                id="ctaUrl"
                type="url"
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                maxLength={2000}
                placeholder="https://forms.gle/..."
                disabled={isSubmitting}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Publishing
          </h3>

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                checked={publishMode === "now"}
                onChange={() => setPublishMode("now")}
                disabled={isSubmitting}
                className="mt-1"
              />
              <div>
                <div className="text-sm font-medium text-gray-900">Publish now</div>
                <div className="text-xs text-gray-500">Post becomes visible to the public immediately</div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                checked={publishMode === "scheduled"}
                onChange={() => setPublishMode("scheduled")}
                disabled={isSubmitting}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">Schedule for later</div>
                <div className="text-xs text-gray-500 mb-2">Stays hidden until the date and time you pick</div>
                {publishMode === "scheduled" && (
                  <Input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    disabled={isSubmitting}
                    min={new Date().toISOString().slice(0, 16)}
                    className="max-w-xs"
                  />
                )}
              </div>
            </label>
          </div>

          <div className="border-t pt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                disabled={isSubmitting}
                className="w-4 h-4"
              />
              <span className="flex items-center gap-2 text-sm text-gray-900">
                {isActive ? <Eye className="w-4 h-4 text-green-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                Visible to public {isActive ? "(active)" : "(hidden)"}
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-7">
              Uncheck to take this post offline without deleting it. Independent of the scheduled publish date.
            </p>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : isEdit ? "Save Changes" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.push("/admin/news")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
