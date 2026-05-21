import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-blue-600 dark:text-blue-400">Tech</span>ReviewHub
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your trusted source for honest tech reviews, comparisons, and best-of guides.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
              <li><Link href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Categories</Link></li>
              <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/categories/ai-gadgets" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">AI Gadgets</Link></li>
              <li><Link href="/categories/creator-tools" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Creator Tools</Link></li>
              <li><Link href="/categories/mini-pcs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Mini PCs</Link></li>
              <li><Link href="/categories/laser-engravers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Laser Engravers</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} TechReviewHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
