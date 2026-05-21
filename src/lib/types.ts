export interface Review {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar?: string;
  date: string;
  image: string;
  rating: number;
  pros: string[];
  cons: string[];
  faq: { question: string; answer: string }[];
  relatedPosts: string[];
  affiliateLink?: string;
  readingTime?: number;
  featured?: boolean;
}

export interface Comparison {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  products: {
    name: string;
    image: string;
    rating: number;
    price: string;
    specs: Record<string, string>;
    pros: string[];
    cons: string[];
    affiliateLink: string;
  }[];
  date: string;
  image: string;
  readingTime?: number;
}

export interface BuyingGuide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  productCount: number;
  readingTime?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  articleCount?: number;
}

export interface TrendingItem {
  slug: string;
  title: string;
  category: string;
  views: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  originalPrice: string;
  dealPrice: string;
  discount: number;
  couponCode?: string;
  affiliateLink: string;
  store: string;
  storeLogo?: string;
  expiresAt: string;
  isFeatured: boolean;
  isHot: boolean;
  tags: string[];
}
