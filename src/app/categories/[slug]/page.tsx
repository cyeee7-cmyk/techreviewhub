import { categories, getReviews } from "@/lib/data";
import ReviewCard from "@/components/sections/ReviewCard";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import ImageWithFallback from "@/components/shared/ImageWithFallback";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  return constructMetadata({
    title: category?.name,
    description: category?.description,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  const reviews = await getReviews();
  const categoryReviews = reviews.filter((r) => r.category === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] mb-6 bg-gray-100 dark:bg-gray-700">
            <ImageWithFallback
              src={category.image}
              alt={category.name}
              className="object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {category.name}
              </h1>
              <p className="text-xl text-gray-200">{category.description}</p>
            </div>
          </div>
        </div>

        {categoryReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryReviews.map((review) => (
              <ReviewCard key={review.slug} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No reviews found for this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
