"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Filter, Grid, List } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";
import { cn } from "@/lib/cn";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: "School Campus", category: "Campus", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538932/_DSC4862_vt7ucz.jpg", description: "Side view of the campus with a clean white backdrop." },
  { id: 2, title: "Playground Fun", category: "Events", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539013/_DSC4914_rayeft.jpg", description: "Joyful school children enjoying playtime on the campus playground." },
  { id: 3, title: "Academics", category: "Academics", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538974/_DSC5119_ixip4e.jpg", description: "Students engaged in classroom learning." },
  { id: 4, title: "Arts & Crafts", category: "Arts", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538988/_DSC4847_is55d2.jpg", description: "Student artwork beautifully displayed." },
  { id: 5, title: "School Facilities", category: "Facilities", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539016/_DSC4940_ozoyu2.jpg", description: "Modern campus facilities." },
  { id: 6, title: "Early Learning", category: "Events", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538971/_DSC5090_w1r957.jpg", description: "Young children engaged in guided learning with their homeroom teacher." },
  { id: 7, title: "Reception Area", category: "Campus", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538941/_DSC4819_qx4vql.jpg", description: "Welcoming school reception space." },
  { id: 8, title: "Hallway Moments", category: "Campus", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753538932/_DSC4908_gooit2.jpg", description: "Students walking through the school hallway." },
  { id: 9, title: "Independent Study", category: "Academics", image: "https://res.cloudinary.com/dgvjxhqjd/image/upload/v1753539009/_DSC5124_yyqwdo.jpg", description: "A student immersed in solo study." },
];

const categories = ["All", "Campus", "Academics", "Events", "Facilities", "Arts"];

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = galleryItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-green-50 to-orange-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-2">School Gallery</h1>
              <p className="text-base text-green-600 max-w-2xl mx-auto">
                Explore the vibrant life at our school through photos of our campus, events, and student activities.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search gallery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Filter className="h-5 w-5 text-gray-400 shrink-0" />
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                        selectedCategory === category ? "bg-green-500 text-white" : "bg-white text-gray-600 border border-gray-300 hover:bg-orange-50 hover:text-green-600",
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={cn("p-3 rounded-lg transition-colors", viewMode === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600")}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={cn("p-3 rounded-lg transition-colors", viewMode === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600")}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No images found matching your criteria.</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {filtered.map((item) => (
                <article key={item.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden">
                  <div className={viewMode === "list" ? "flex gap-4" : ""}>
                    <div className={cn("relative overflow-hidden", viewMode === "list" ? "w-40 h-32 sm:w-64 sm:h-48 shrink-0" : "aspect-[4/3]")}>
                      <Image src={item.image} alt={item.title} fill className="object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute top-3 right-3">
                        <span className="tv-glass px-2 py-1 text-xs font-medium text-gray-800 rounded">{item.category}</span>
                      </div>
                    </div>
                    <div className={cn("p-4", viewMode === "list" && "flex-1")}>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}
