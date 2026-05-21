import { comparisons, reviews } from "@/lib/data";
import { notFound } from "next/navigation";
import { Star, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
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
  const comparison = comparisons.find((c) => c.slug === slug);
  return constructMetadata({
    title: comparison?.title,
    description: comparison?.excerpt,
    image: comparison?.image,
    path: `/comparisons/${slug}`,
  });
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  const relatedReviews = reviews.filter((r) => r.category === comparison.category);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href={`/categories/${comparison.category}`}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {comparison.category}
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {comparison.date}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              {comparison.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {comparison.excerpt}
            </p>
          </header>

          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={comparison.image}
              alt={comparison.title}
              className="w-full aspect-video object-cover"
            />
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Side-by-Side Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="text-left p-4 font-semibold text-gray-900 dark:text-white"></th>
                    {comparison.products.map((product, i) => (
                      <th key={i} className="text-left p-4 font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">Price</td>
                    {comparison.products.map((product, i) => (
                      <td key={i} className="p-4 text-gray-700 dark:text-gray-300">
                        {product.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium text-gray-900 dark:text-white">Rating</td>
                    {comparison.products.map((product, i) => (
                      <td key={i} className="p-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-5 w-5 ${j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                          <span className="ml-2 font-medium text-gray-900 dark:text-white">
                            {product.rating}
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  {Object.keys(comparison.products[0].specs).map((specKey, i) => (
                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium text-gray-900 dark:text-white">
                        {specKey}
                      </td>
                      {comparison.products.map((product, j) => (
                        <td key={j} className="p-4 text-gray-700 dark:text-gray-300">
                          {product.specs[specKey]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {comparison.products.map((product, i) => (
              <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                    {product.price}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5" />
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {product.pros.map((pro, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                        <XCircle className="h-5 w-5" />
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {product.cons.map((con, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                      Check Price <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {relatedReviews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Reviews
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedReviews.slice(0, 3).map((review) => (
                  <ReviewCard key={review.slug} review={review} />
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
