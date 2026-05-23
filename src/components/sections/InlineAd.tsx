import Link from 'next/link';

interface InlineAdProps {
  variant?: 'deal' | 'guide' | 'subscribe';
}

export default function InlineAd({ variant = 'deal' }: InlineAdProps) {
  if (variant === 'guide') {
    return (
      <div className="w-full my-8">
        <Link
          href="/categories"
          className="block rounded-xl overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 transition-all group"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">📋</div>
              <div>
                <p className="text-white font-bold text-base">2026 Buying Guides Are Here</p>
                <p className="text-emerald-100 text-sm">Find the best products in every category</p>
              </div>
            </div>
            <span className="text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Browse Guides →
            </span>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === 'subscribe') {
    return (
      <div className="w-full my-8">
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">📧</div>
              <div>
                <p className="text-white font-bold text-base">Get Weekly Tech Picks</p>
                <p className="text-blue-100 text-sm">Join 50,000+ readers — free newsletter</p>
              </div>
            </div>
            <Link
              href="#newsletter"
              className="px-5 py-2 bg-white text-blue-700 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full my-8">
      <Link
        href="/deals"
        className="block rounded-xl overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 transition-all group"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">🔥</div>
            <div>
              <p className="text-white font-bold text-base">Today&apos;s Best Deals — Up to 28% Off</p>
              <p className="text-orange-100 text-sm">Handpicked deals on Mini PCs, AI Gadgets & more</p>
            </div>
          </div>
          <span className="text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
            See All Deals →
          </span>
        </div>
      </Link>
    </div>
  );
}
