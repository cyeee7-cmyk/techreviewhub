import Link from 'next/link';

export default function LeaderboardBanner() {
  return (
    <div className="w-full mb-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/deals"
          className="block relative overflow-hidden rounded-xl h-[90px] bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 group"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=200&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative h-full flex items-center justify-between px-6 md:px-10">
            <div className="flex items-center gap-4">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">HOT DEAL</span>
              <div>
                <p className="text-white font-bold text-sm md:text-base">Mac Mini M4 — Save $150 Today</p>
                <p className="text-gray-400 text-xs md:text-sm">Apple M4 Chip · 16GB RAM · Limited Time Offer</p>
              </div>
            </div>
            <span className="hidden md:inline-flex items-center gap-1 text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-colors">
              Shop Now →
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
