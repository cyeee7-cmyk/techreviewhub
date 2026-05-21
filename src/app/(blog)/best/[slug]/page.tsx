import { reviews, categories } from "@/lib/data";
import { notFound } from "next/navigation";
import { Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReviewCard from "@/components/sections/ReviewCard";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  const title = category ? `Best ${category.name} 2025` : "Best Products";
  const description = category
    ? `Our picks for the best ${category.name} in 2025.`
    : "Our top product recommendations.";
  return constructMetadata({
    title,
    description,
    path: `/best/${slug}`,
  });
}

export default async function BestOfPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.id === slug);
  const categoryReviews = reviews.filter((r) => r.category === slug).sort((a, b) => b.rating - a.rating);

  if (!category) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href={`/categories/${category.id}`}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {category.name}
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Updated {new Date().toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Best {category.name} in 2025
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {category.description}
            </p>
          </header>

          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={category.image}
              alt={`Best ${category.name}`}
              className="w-full aspect-video object-cover"
            />
          </div>

          {categoryReviews.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Our Top Pick
              </h2>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <img
                      src={categoryReviews[0].image}
                      alt={categoryReviews[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                        Top Pick
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {categoryReviews[0].rating}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {categoryReviews[0].title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {categoryReviews[0].excerpt}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild size="lg">
                        <Link href={`/reviews/${categoryReviews[0].slug}`}>
                          Read Full Review
                        </Link>
                      </Button>
                      {categoryReviews[0].affiliateLink && (
                        <Button asChild size="lg" variant="secondary">
                          <a href={categoryReviews[0].affiliateLink} target="_blank" rel="noopener noreferrer">
                            Check Price
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {categoryReviews.length > 1 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Also Great
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryReviews.slice(1).map((review) => (
                  <ReviewCard key={review.slug} review={review} />
                ))}
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              How to Choose the Right {category.name.slice(0, -1)} for You
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When looking for the best {category.name.toLowerCase()}, here are a few things to consider:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Your budget and what features you really need</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">The quality of materials and build</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Reviews and feedback from other users</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">Warranty and customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
