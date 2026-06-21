import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import mongoose from "mongoose";
import NewsForm from "../../_components/NewsForm";

export const dynamic = "force-dynamic";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  await connectDB();
  const item = await News.findById(id).lean();
  if (!item) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Edit Article</h2>
        <p className="text-sm text-gray-500 mt-1">Update the article details below.</p>
      </div>
      <NewsForm
        initial={{
          id: String(item._id),
          title: item.title,
          description: item.description,
          type: item.type,
          image: item.image,
          isActive: item.isActive,
        }}
      />
    </div>
  );
}
