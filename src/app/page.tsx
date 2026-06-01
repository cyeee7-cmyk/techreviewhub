import Link from 'next/link';
import { ArrowRight, Star, Zap, TrendingUp, Scale, BookOpen, Flame, PenSquare, Newspaper } from 'lucide-react';
import { getReviews, getComparisons, getBuyingGuides, categories, trendingItems, deals } from '@/lib/data';
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
  const leadStory = featuredReviews[0];
  const editorChoice = buyingGuides[0];
  const featuredComparison = comparisons[0];

  return (
    <div className="pb-12">
      <LeaderboardBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="wp-shell overflow-hidden rounded-[32px] px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_330px]">
            <div>
              <div className="mb-6 flex flex-col gap-4 border-b border-stone-300 pb-6 dark:border-gray-700 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="wp-kicker mb-3">
                    <Newspaper className="h-3.5 w-3.5" />
                    Front Page Journal
                  </span>
                  <h1 className="wp-title text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
                    A classic editorial homepage for reviews, comparisons, and evergreen guides.
                  </h1>
                </div>
                <div className="max-w-sm space-y-3 text-sm leading-7 text-stone-600 dark:text-gray-400">
                  <p>
                    Styled like a polished WordPress magazine theme with layered content blocks,
                    compact widgets, and a steady archive-first reading rhythm.
                  </p>
                  <p className="font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
                    Updated weekly with buyer-focused notes
                  </p>
                </div>
              </div>
              <HeroSection featured={featuredReviews} />
            </div>

            <aside className="space-y-5">
              <div className="wp-widget rounded-[28px] p-6">
                <span className="wp-section-title">From The Editor</span>
                <h2 className="wp-title mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                  Static blog mood, modern product coverage.
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-gray-400">
                  This layout leans into classic blog cues: soft paper background, boxed widgets,
                  bold masthead typography, and clean story stacks that feel at home in WordPress.
                </p>
                <div className="mt-5 border-t border-stone-200 pt-5 dark:border-gray-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
                    Lead Story
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {leadStory?.title}
                  </p>
                  <p className="mt-2 text-sm text-stone-600 dark:text-gray-400">
                    {leadStory?.excerpt}
                  </p>
                </div>
              </div>

              <div className="wp-widget rounded-[28px] p-6">
                <span className="wp-section-title">Popular Topics</span>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {categories.slice(0, 4).map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.id}`}
                      className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-sm font-semibold text-gray-800 hover:border-amber-700 hover:text-amber-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-amber-400 dark:hover:text-amber-300"
                    >
                      <span className="block">{category.name}</span>
                      <span className="mt-1 block text-xs font-medium uppercase tracking-[0.16em] text-stone-500 dark:text-gray-500">
                        {category.articleCount} posts
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="wp-widget rounded-[28px] p-6">
                <span className="wp-section-title">Reader Favorites</span>
                <ul className="mt-4 space-y-4">
                  {trendingItems.slice(0, 4).map((item, index) => (
                    <li key={item.slug} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <Link
                          href={`/reviews/${item.slug}`}
                          className="font-semibold text-gray-900 hover:text-amber-700 dark:text-white dark:hover:text-amber-300"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-stone-500 dark:text-gray-500">
                          {item.views} views
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <section className="wp-shell mb-10 rounded-[30px] px-6 py-8 sm:px-8">
              <div className="mb-8 flex items-center justify-between border-b border-stone-300 pb-5 dark:border-gray-700">
                <div>
                  <span className="wp-section-title">Latest Reviews</span>
                  <h2 className="wp-title wp-divider mt-2 text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="h-6 w-6 text-blue-600" />
                  Latest Reviews
                  </h2>
                </div>
                <Link href="/categories" className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1">
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

            <section className="wp-shell mb-10 rounded-[30px] px-6 py-8 sm:px-8">
              <div className="mb-8 flex items-center justify-between border-b border-stone-300 pb-5 dark:border-gray-700">
                <div>
                  <span className="wp-section-title">This Week On Sale</span>
                  <h2 className="wp-title wp-divider mt-2 text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Flame className="h-6 w-6 text-orange-500" />
                  Today&apos;s Deals
                  </h2>
                </div>
                <Link href="/deals" className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1">
                  All Deals <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.filter((d) => d.isHot).slice(0, 3).map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </section>

            <section className="wp-shell mb-10 rounded-[30px] px-6 py-8 sm:px-8">
              <div className="mb-8 flex items-center justify-between border-b border-stone-300 pb-5 dark:border-gray-700">
                <div>
                  <span className="wp-section-title">Evergreen Guides</span>
                  <h2 className="wp-title wp-divider mt-2 text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Best Picks
                  </h2>
                </div>
                <Link href="/categories" className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1">
                  All Guides <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {buyingGuides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </section>

            <section className="wp-shell mb-10 rounded-[30px] px-6 py-8 sm:px-8">
              <div className="mb-8 flex items-center justify-between border-b border-stone-300 pb-5 dark:border-gray-700">
                <div>
                  <span className="wp-section-title">Comparison Desk</span>
                  <h2 className="wp-title wp-divider mt-2 text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Scale className="h-6 w-6 text-red-500" />
                  Comparison Hub
                  </h2>
                </div>
                <Link href="/categories" className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1">
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

            <section className="wp-shell mb-10 rounded-[30px] px-6 py-8 sm:px-8">
              <div className="mb-8 flex items-center justify-between border-b border-stone-300 pb-5 dark:border-gray-700">
                <div>
                  <span className="wp-section-title">Category Watch</span>
                  <h2 className="wp-title wp-divider mt-2 text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                  AI Gadgets
                  </h2>
                </div>
                <Link href="/categories/ai-gadgets" className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1">
                  More AI <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiGadgets.map((review) => (
                  <ArticleCard key={review.slug} review={review} />
                ))}
              </div>
            </section>

            <section className="wp-shell mb-10 rounded-[30px] px-6 py-8 sm:px-8">
              <div className="mb-8 flex items-center justify-between border-b border-stone-300 pb-5 dark:border-gray-700">
                <div>
                  <span className="wp-section-title">Studio Desk</span>
                  <h2 className="wp-title wp-divider mt-2 text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-green-500" />
                  Creator Gear
                  </h2>
                </div>
                <Link href="/categories/creator-tools" className="text-sm font-medium text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1">
                  More Gear <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creatorGear.map((review) => (
                  <ArticleCard key={review.slug} review={review} />
                ))}
              </div>
            </section>

            <section className="wp-shell mb-12 rounded-[30px] px-6 py-8 sm:px-8">
              <div className="mb-8 border-b border-stone-300 pb-5 dark:border-gray-700">
                <span className="wp-section-title">Archive Navigation</span>
                <h2 className="wp-title wp-divider mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  Browse by Category
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group relative overflow-hidden rounded-[22px] aspect-[4/3] bg-gray-100 dark:bg-gray-700 border border-stone-200 dark:border-gray-700"
                  >
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="transition-transform duration-500 group-hover:scale-110"
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
              <div className="wp-widget rounded-[26px] p-6">
                <span className="wp-section-title">Editor&apos;s Notebook</span>
                <h3 className="wp-title mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                  The archive is the homepage.
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-gray-400">
                  A classic WordPress-style blog works because it lets readers dip into reviews,
                  then discover guides and comparisons through familiar sidebar modules.
                </p>
              </div>
              <SearchBox />
              <TrendingSidebar items={trendingItems} />
              <div className="wp-widget rounded-[26px] p-6">
                <span className="wp-section-title">Featured Guide</span>
                <p className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {editorChoice?.title}
                </p>
                <p className="mt-2 text-sm text-stone-600 dark:text-gray-400">
                  {editorChoice?.excerpt}
                </p>
                <Link
                  href={editorChoice ? `/categories/${editorChoice.category}` : '/categories'}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200"
                >
                  Browse guide archive <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <AdPlaceholder width="300" height="250" variant="product" />
              <PopularComparisons comparisons={comparisons} />
              <div className="wp-widget rounded-[26px] p-6">
                <span className="wp-section-title">Comparison Of The Week</span>
                <p className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {featuredComparison?.title}
                </p>
                <p className="mt-2 text-sm text-stone-600 dark:text-gray-400">
                  {featuredComparison?.excerpt}
                </p>
                <Link
                  href={featuredComparison ? `/comparisons/${featuredComparison.slug}` : '/categories'}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200"
                >
                  Read full comparison <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <AdPlaceholder width="300" height="600" variant="deal" />
              <NewsletterWidget />
              <AdPlaceholder width="300" height="250" variant="newsletter" />
            </div>
          </aside>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="wp-shell rounded-[32px] p-8 md:p-12 text-center">
          <span className="wp-kicker justify-center">
            <PenSquare className="h-3.5 w-3.5" />
            Reader Newsletter
          </span>
          <h2 className="wp-title text-3xl md:text-4xl font-extrabold mb-4 mt-4 text-gray-900 dark:text-white">
            Never Miss a Review
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-stone-600 dark:text-gray-400">
            Join 50,000+ tech enthusiasts who get our weekly roundup of the best reviews, comparisons, and deals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 rounded-full border border-stone-300 bg-white px-5 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
            <button className="w-full sm:w-auto rounded-full bg-amber-700 px-6 py-3 font-bold text-white hover:bg-amber-800 transition-colors">
              Subscribe Free
            </button>
          </div>
          <p className="mt-4 text-sm text-stone-500 dark:text-gray-500">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
