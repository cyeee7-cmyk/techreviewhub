import { Review } from '@/lib/types';
import FeaturedCard from '@/components/sections/FeaturedCard';

interface HeroSectionProps {
  featured: Review[];
}

export default function HeroSection({ featured }: HeroSectionProps) {
  const [main, ...side] = featured;

  return (
    <section className="w-full mb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 lg:row-span-2">
          <FeaturedCard review={main} size="large" />
        </div>
        {side.map((review) => (
          <div key={review.slug}>
            <FeaturedCard review={review} size="small" />
          </div>
        ))}
      </div>
    </section>
  );
}
