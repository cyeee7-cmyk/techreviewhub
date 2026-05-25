import Link from 'next/link';
import { ArrowRight, Star, Zap, TrendingUp, Scale, BookOpen, Flame } from 'lucide-react';
import { getReviews, getComparisons, getBuyingGuides, categories, trendingItems, categoryNameMap, deals } from '@/lib/data';
import HeroSection from '@/components/sections/HeroSection';
import LeaderboardBanner from '@/components/sections/LeaderboardBanner';
import InlineAd from '@/components/sections/InlineAd';
import AdPlaceholder from '@/components/sections/AdPlaceholder';
import SearchBox from '@/components/sections/SearchBox';
import TrendingSidebar from '@/components/sections/TrendingSidebar';
import NewsletterWidget from '@/components/sections/NewsletterWidget';
import PopularComparisons from '@/components/sections/PopularComparisons';
import ArticleCard from '@/components/sections/ArticleCard';
import ComparisonCard from '@/components/sections/ComparisonCard';
import GuideCard from '@/components/sections/GuideCard';
import DealCard from '@/components/sections/DealCard';
import ImageWithFallback from '@/components/shared/ImageWithFallback';

export default async function Home() {
  const reviews = await getReviews();
  const comparisons = await getComparisons();
  const buyingGuides = await getBuyingGuides();
  const featuredReviews = reviews.filter((r) => r.featured).slice(0, 3);
  const latestReviews = reviews.slice(0, 6);
  const aiGadgets = reviews.filter((r) => r.category === 'ai-gadgets');
  const creatorGear = reviews.filter((r) => r.category === 'creator-tools');

  return (
    <div>
      <LeaderboardBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection featured={featuredReviews} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="h-6 w-6 text-blue-600" />
                  Latest Reviews
                </h2>
                <Link href="/categories" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestReviews.map((review) => (
                  <ArticleCard key={review.slug} review={review} />
                ))}
              </div>
            </section>

            <InlineAd variant="deal" />

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Flame className="h-6 w-6 text-orange-500" />
                  Today&apos;s Deals
                </h2>
                <Link href="/deals" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  All Deals <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.filter((d) => d.isHot).slice(0, 3).map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Best Picks
                </h2>
                <Link href="/categories" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  All Guides <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {buyingGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <Scale className="h-6 w-6 text-red-500" />
                  Comparison Hub
                </h2>
                <Link href="/categories" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  All Comparisons <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {comparisons.map((comparison) => (
                  <ComparisonCard key={comparison.slug} comparison={comparison} />
                ))}
              </div>
            </section>

            <InlineAd variant="guide" />

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                  AI Gadgets
                </h2>
                <Link href="/categories/ai-gadgets" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  More AI <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiGadgets.map((review) => (
                  <ArticleCard key={review.slug} review={review} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-green-500" />
                  Creator Gear
                </h2>
                <Link href="/categories/creator-tools" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  More Gear <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creatorGear.map((review) => (
                  <ArticleCard key={review.slug} review={review} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
                Browse by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-100 dark:bg-gray-700"
                  >
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                    <div className="absolute bottom-0 left-0 p-4 z-20">
                      <h3 className="text-lg font-bold text-white mb-0.5">{category.name}</h3>
                      <p className="text-sm text-gray-300">{category.articleCount} articles</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[120px] space-y-6">
              <SearchBox />
              <TrendingSidebar items={trendingItems} />
              <AdPlaceholder width="300" height="250" variant="product" />
              <PopularComparisons comparisons={comparisons} />
              <AdPlaceholder width="300" height="600" variant="deal" />
              <NewsletterWidget />
              <AdPlaceholder width="300" height="250" variant="newsletter" />
            </div>
          </aside>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Never Miss a Review
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 50,000+ tech enthusiasts who get our weekly roundup of the best reviews, comparisons, and deals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="w-full sm:w-auto px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Subscribe Free
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
