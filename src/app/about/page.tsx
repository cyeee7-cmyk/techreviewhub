import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "About Us",
  description: "Learn more about TechReviewHub and our mission to provide honest tech reviews",
});

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          About TechReviewHub
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your trusted source for honest, unbiased tech reviews and comparisons.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We believe that buying tech should be easy. That's why we spend hours testing products,
            researching specifications, and comparing options to help you make the best decision.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
            What We Do
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
            <li>Comprehensive product reviews</li>
            <li>Side-by-side comparisons</li>
            <li>Best-of guides curated by experts</li>
            <li>Up-to-date tech news and tips</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
            Our Promise
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We're committed to transparency and honesty. Our reviews are never influenced by
            manufacturers or affiliate links - we just want you to get the best product for your needs.
          </p>
        </div>
      </div>
    </div>
  );
}
