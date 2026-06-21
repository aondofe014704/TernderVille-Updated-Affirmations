import NewsForm from "../_components/NewsForm";

export default function NewNewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">New Article</h2>
        <p className="text-sm text-gray-500 mt-1">Create a news article or event announcement.</p>
      </div>
      <NewsForm />
    </div>
  );
}
