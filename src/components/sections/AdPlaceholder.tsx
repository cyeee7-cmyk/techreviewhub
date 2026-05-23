import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AdPlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
  variant?: 'product' | 'newsletter' | 'deal';
}

export default function AdPlaceholder({ width, height, label, className, variant = 'product' }: AdPlaceholderProps) {
  if (variant === 'newsletter') {
    return (
      <div
        className={cn('rounded-xl overflow-hidden bg-gradient-to-b from-blue-600 to-indigo-800', className)}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '250px' }}
      >
        <div className="h-full flex flex-col items-center justify-center p-5 text-center">
          <div className="text-3xl mb-2">📬</div>
          <p className="text-white font-bold text-base mb-1">Weekly Tech Digest</p>
          <p className="text-blue-200 text-xs mb-4">Top reviews & deals in your inbox</p>
          <Link
            href="#newsletter"
            className="px-4 py-2 bg-white text-blue-700 font-bold rounded-lg text-xs hover:bg-blue-50 transition-colors"
          >
            Subscribe Free
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'deal') {
    return (
      <Link
        href="/deals"
        className={cn('block rounded-xl overflow-hidden group', className)}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '600px' }}
      >
        <div className="h-full relative bg-gradient-to-b from-orange-500 to-red-600">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            <span className="bg-yellow-400 text-gray-900 text-xs font-extrabold px-3 py-1 rounded-full mb-4">UP TO 28% OFF</span>
            <p className="text-white font-extrabold text-xl mb-2">Flash Deals</p>
            <p className="text-orange-100 text-sm mb-6">Mini PCs · AI Gadgets · Creator Tools</p>
            <span className="px-5 py-2.5 bg-white text-red-600 font-bold rounded-lg text-sm hover:bg-red-50 transition-colors">
              Shop Deals →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/categories/mini-pcs"
      className={cn('block rounded-xl overflow-hidden group', className)}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '250px' }}
    >
      <div className="h-full relative bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&h=400&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
        <div className="relative h-full flex flex-col items-center justify-center p-5 text-center">
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded mb-3">SPONSORED</span>
          <p className="text-white font-bold text-base mb-1">Best Mini PCs 2026</p>
          <p className="text-gray-400 text-xs mb-3">Compact power for every budget</p>
          <span className="text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-colors">
            Learn More →
          </span>
        </div>
      </div>
    </Link>
  );
}
