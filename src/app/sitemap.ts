import { getReviews, getComparisons, categories, getBuyingGuides } from '@/lib/data';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techreviewhub.com';

  const reviews = await getReviews();
  const comparisons = await getComparisons();
  const buyingGuides = await getBuyingGuides();

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/deals`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const reviewPages = reviews.map((review) => ({
    url: `${baseUrl}/reviews/${review.slug}`,
    lastModified: new Date(review.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const comparisonPages = comparisons.map((comp) => ({
    url: `${baseUrl}/comparisons/${comp.slug}`,
    lastModified: new Date(comp.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const guidePages = buyingGuides.map((guide) => ({
    url: `${baseUrl}/best/${guide.category}`,
    lastModified: new Date(guide.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...reviewPages, ...comparisonPages, ...guidePages];
}
