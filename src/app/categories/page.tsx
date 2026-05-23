import { categories, getReviews } from "@/lib/data";
import ReviewCard from "@/components/sections/ReviewCard";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Categories",
  description: "Browse all tech review categories on TechReviewHub",
});

export default async function CategoriesPage() {
  const reviews = await getReviews();
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">
          All Categories
        </h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group relative overflow-hidden rounded-xl aspect-video"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-gray-200">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* All Reviews */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          All Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
