import { getReviews } from "@/lib/data";
import { notFound } from "next/navigation";
import { Star, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ReviewCard from "@/components/sections/ReviewCard";
import { constructMetadata, generateJsonLd } from "@/lib/seo";
import ImageWithFallback from "@/components/shared/ImageWithFallback";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const reviews = await getReviews();
  const review = reviews.find((r) => r.slug === slug);
  return constructMetadata({
    title: review?.title,
    description: review?.excerpt,
    image: review?.image,
    path: `/reviews/${slug}`,
  });
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const reviews = await getReviews();
  const review = reviews.find((r) => r.slug === slug);

  if (!review) {
    notFound();
  }

  const relatedReviews = reviews.filter((r) => review.relatedPosts.includes(r.slug));
  const jsonLd = generateJsonLd("Article", review);

  return (
    <div className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href={`/categories/${review.category}`}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {review.category}
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {review.date}
              </span>
              {review.readingTime && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {review.readingTime} min read
                  </span>
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              {review.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {review.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${i < Math.floor(review.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {review.rating}/5
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                by {review.author}
              </span>
            </div>
          </header>

          <div className="mb-12 rounded-2xl overflow-hidden relative bg-gray-100 dark:bg-gray-700">
            <ImageWithFallback
              src={review.image}
              alt={review.title}
              className="object-cover"
              fill
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: review.content }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                  <h3 className="text-xl font-bold text-green-600 dark:text-green-400 flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                    Pros
                  </h3>
                  <ul className="space-y-3">
                    {review.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2 mb-4">
                    <XCircle className="h-6 w-6" />
                    Cons
                  </h3>
                  <ul className="space-y-3">
                    {review.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {review.affiliateLink && (
                <div className="my-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white text-center">
                  <h3 className="text-2xl font-extrabold mb-3">
                    Ready to Buy?
                  </h3>
                  <p className="text-blue-100 mb-6">
                    Get the best deal directly from the official store
                  </p>
                  <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg font-bold px-8">
                    <a href={review.affiliateLink} target="_blank" rel="noopener noreferrer">
                      Check Latest Price →
                    </a>
                  </Button>
                  <p className="text-sm text-blue-200 mt-4">
                    We may earn a commission if you make a purchase through our link.
                  </p>
                </div>
              )}

              {review.faq.length > 0 && (
                <div className="my-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {review.faq.map((faq, i) => (
                      <div key={i} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-8">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Quick Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Category</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {review.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Author</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {review.author}
                    </span>
                  </div>
                  {review.affiliateLink && (
                    <Button asChild className="w-full mt-4">
                      <a href={review.affiliateLink} target="_blank" rel="noopener noreferrer">
                        Check Price
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {relatedReviews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedReviews.map((review) => (
                  <ReviewCard key={review.slug} review={review} />
                ))}
              </div>
            </div>
          )}

          {review.affiliateLink && (
            <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl text-white text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Get Yours Today
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                Don&apos;t miss out — check the latest price and exclusive deals from the official store.
              </p>
              <Button asChild size="lg" className="bg-white text-green-700 hover:bg-green-50 text-xl font-bold px-10 py-6">
                <a href={review.affiliateLink} target="_blank" rel="noopener noreferrer">
                  Shop Now →
                </a>
              </Button>
              <p className="text-sm text-green-200 mt-4">
                We may earn a commission if you make a purchase through our link.
              </p>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
