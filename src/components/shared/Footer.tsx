import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-300/80 bg-[#f3ede1] dark:bg-gray-950 dark:border-gray-800 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="wp-shell rounded-[28px] p-8 md:p-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <span className="wp-kicker mb-4">WordPress Style Footer</span>
              <h3 className="wp-title mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                <span className="text-amber-700 dark:text-amber-400">Tech</span>ReviewHub
              </h3>
              <p className="max-w-xl text-gray-600 dark:text-gray-400 mb-4 leading-7">
                Your trusted source for honest tech reviews, comparisons, and best-of guides.
                Built like a classic editorial homepage with clean archives, evergreen content,
                and a sidebar-first reading experience.
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500 dark:text-gray-500">
                Weekly notes · buyer&apos;s guides · practical comparisons
              </p>
            </div>

            <div>
              <h4 className="wp-section-title mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">Home</Link></li>
                <li><Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">Categories</Link></li>
                <li><Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">About</Link></li>
                <li><Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="wp-section-title mb-4">Categories</h4>
              <ul className="space-y-3">
                <li><Link href="/categories/ai-gadgets" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">AI Gadgets</Link></li>
                <li><Link href="/categories/creator-tools" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">Creator Tools</Link></li>
                <li><Link href="/categories/mini-pcs" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">Mini PCs</Link></li>
                <li><Link href="/categories/laser-engravers" className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-300">Laser Engravers</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-stone-300 pt-6 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
            <p>© {new Date().getFullYear()} TechReviewHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
