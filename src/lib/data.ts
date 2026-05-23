import { BuyingGuide, Category, Comparison, Deal, Review, TrendingItem } from "./types";
import { getPublishedPosts, NotionPost, getPageContent } from "./notion";

export const categories: Category[] = [
  { id: "ai-gadgets", name: "AI Gadgets", description: "Latest AI-powered gadgets and smart devices", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20AI%20gadget%20smart%20device%20white%20background&image_size=landscape_16_9", articleCount: 24 },
  { id: "creator-tools", name: "Creator Tools", description: "Tools for content creators and streamers", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=content%20creator%20streaming%20setup%20microphone%20camera&image_size=landscape_16_9", articleCount: 18 },
  { id: "mini-pcs", name: "Mini PCs", description: "Compact and powerful mini computers", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mini%20PC%20compact%20desktop%20computer%20modern&image_size=landscape_16_9", articleCount: 15 },
  { id: "laser-engravers", name: "Laser Engravers", description: "Laser cutters and engraving machines", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=laser%20engraver%20machine%20cutting%20wood&image_size=landscape_16_9", articleCount: 12 },
];

const fallbackReviews: Review[] = [
  {
    slug: "best-ai-gadget-2025",
    title: "The Best AI Gadget of 2025: A Comprehensive Review",
    excerpt: "Discover the top AI gadget that's changing everything. We test it, we review, and we tell you if it's worth your money.",
    content: "<p>AI gadgets are taking the world by storm. In this review, we take a deep dive into the best AI gadget of 2025.</p><p>After weeks of testing, we can confidently say this device redefines what a smart assistant can do. From voice recognition to predictive automation, it handles everything with ease.</p><p>The build quality is exceptional, featuring a sleek aluminum body that feels premium in hand. The display is bright and responsive, making interactions feel natural.</p>",
    category: "ai-gadgets",
    tags: ["AI", "Gadgets", "Smart Home"],
    author: "Alex Chen",
    date: "2025-05-10",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20AI%20smart%20speaker%20device%20modern%20living%20room&image_size=landscape_16_9",
    rating: 4.8,
    pros: ["Incredible AI capabilities", "Sleek design", "Easy to use"],
    cons: ["Expensive", "Limited battery life"],
    faq: [
      { question: "Is it worth the price?", answer: "Yes, if you value cutting-edge AI tech." },
      { question: "Does it work offline?", answer: "Most features require internet." },
    ],
    relatedPosts: ["best-creator-tools-2025", "mini-pc-review-2025"],
    affiliateLink: "https://example.com/buy-ai-gadget",
    readingTime: 8,
    featured: true,
  },
  {
    slug: "best-creator-tools-2025",
    title: "Best Creator Tools for 2025: Our Top Picks",
    excerpt: "Everything you need to create amazing content in 2025. From microphones to lighting, we've got you covered.",
    content: "<p>Creators need the right tools. Here's our list of must-have tools for content creators.</p>",
    category: "creator-tools",
    tags: ["Creators", "Tools", "Streaming"],
    author: "Sarah Kim",
    date: "2025-04-20",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=content%20creator%20desk%20setup%20microphone%20camera%20ring%20light&image_size=landscape_16_9",
    rating: 4.6,
    pros: ["Great value", "Excellent performance"],
    cons: ["Learning curve"],
    faq: [
      { question: "What's the best budget option?", answer: "Check out our comparison article!" },
    ],
    relatedPosts: ["best-ai-gadget-2025"],
    affiliateLink: "https://example.com/buy-creator-tools",
    readingTime: 6,
    featured: true,
  },
  {
    slug: "mini-pc-review-2025",
    title: "Mini PC Showdown: Which Compact Desktop Reigns Supreme?",
    excerpt: "We tested the top 5 mini PCs of 2025. Here's which one delivers the best performance per dollar.",
    content: "<p>Mini PCs have come a long way. We tested the top contenders head-to-head.</p>",
    category: "mini-pcs",
    tags: ["Mini PC", "Desktop", "Compact"],
    author: "Mike Torres",
    date: "2025-05-08",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mini%20PC%20desktop%20computer%20on%20desk%20modern%20office&image_size=landscape_16_9",
    rating: 4.5,
    pros: ["Compact design", "Surprisingly powerful", "Great connectivity"],
    cons: ["Limited upgrade options", "Can get hot under load"],
    faq: [
      { question: "Can it replace a full desktop?", answer: "For most users, absolutely." },
    ],
    relatedPosts: ["best-ai-gadget-2025"],
    affiliateLink: "https://example.com/buy-mini-pc",
    readingTime: 10,
    featured: true,
  },
  {
    slug: "laser-engraver-beginners-guide",
    title: "Best Laser Engravers for Beginners in 2025",
    excerpt: "Starting your laser engraving journey? These are the machines we recommend for newcomers.",
    content: "<p>Laser engraving is more accessible than ever. Here are the best options for beginners.</p>",
    category: "laser-engravers",
    tags: ["Laser", "Engraving", "DIY"],
    author: "Emma Wilson",
    date: "2025-05-05",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=laser%20engraver%20machine%20cutting%20wood%20craft&image_size=landscape_16_9",
    rating: 4.3,
    pros: ["Easy to learn", "Affordable entry point", "Great community"],
    cons: ["Limited power for thick materials"],
    faq: [],
    relatedPosts: ["best-ai-gadget-2025"],
    affiliateLink: "https://example.com/buy-laser-engraver",
    readingTime: 7,
  },
  {
    slug: "ai-smart-camera-review",
    title: "AI Smart Camera Review: The Future of Home Security",
    excerpt: "This AI-powered camera can distinguish between people, pets, and packages. Is it worth the upgrade?",
    content: "<p>Home security cameras are getting smarter thanks to AI.</p>",
    category: "ai-gadgets",
    tags: ["AI", "Camera", "Security"],
    author: "Alex Chen",
    date: "2025-05-01",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=smart%20home%20security%20camera%20modern%20interior&image_size=landscape_16_9",
    rating: 4.4,
    pros: ["Excellent AI detection", "Clear night vision", "Easy setup"],
    cons: ["Subscription required for full features"],
    faq: [],
    relatedPosts: ["best-ai-gadget-2025"],
    affiliateLink: "https://example.com/buy-smart-camera",
    readingTime: 5,
  },
  {
    slug: "streaming-mic-showdown",
    title: "Streaming Mic Showdown: $100 vs $300 vs $500",
    excerpt: "We compare three popular streaming microphones at different price points to find the best value.",
    content: "<p>Not all streaming mics are created equal. Let's find the sweet spot.</p>",
    category: "creator-tools",
    tags: ["Microphone", "Streaming", "Audio"],
    author: "Sarah Kim",
    date: "2025-04-28",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20streaming%20microphone%20on%20boom%20arm&image_size=landscape_16_9",
    rating: 4.7,
    pros: ["Detailed comparison", "Real-world tests"],
    cons: ["Subjective audio preferences"],
    faq: [],
    relatedPosts: ["best-creator-tools-2025"],
    affiliateLink: "https://example.com/buy-streaming-mic",
    readingTime: 9,
  },
];

const fallbackComparisons: Comparison[] = [
  {
    slug: "ai-gadget-vs-competitor",
    title: "Top AI Gadget 2025 vs Competitor: Which Should You Buy?",
    excerpt: "We compare the top two AI gadgets to help you decide.",
    category: "ai-gadgets",
    date: "2025-05-15",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=two%20smart%20devices%20side%20by%20side%20comparison&image_size=landscape_16_9",
    readingTime: 12,
    products: [
      { name: "Top AI Gadget", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=premium%20AI%20smart%20device&image_size=square_hd", rating: 4.8, price: "$999", specs: { Processor: "A15 Bionic", RAM: "8GB", Storage: "256GB" }, pros: ["Best AI", "Sleek design"], cons: ["Expensive"], affiliateLink: "https://example.com/buy-top" },
      { name: "Budget AI Gadget", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=budget%20AI%20smart%20device&image_size=square_hd", rating: 4.2, price: "$599", specs: { Processor: "Snapdragon 8 Gen 2", RAM: "6GB", Storage: "128GB" }, pros: ["Affordable"], cons: ["Less features"], affiliateLink: "https://example.com/buy-budget" },
    ],
  },
  {
    slug: "mini-pc-vs-mini-pc",
    title: "Mac Mini M4 vs Intel NUC 14: Ultimate Mini PC Battle",
    excerpt: "Two of the best mini PCs go head-to-head. Which one deserves your desk space?",
    category: "mini-pcs",
    date: "2025-05-12",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=two%20mini%20PCs%20side%20by%20side%20comparison&image_size=landscape_16_9",
    readingTime: 14,
    products: [
      { name: "Mac Mini M4", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20Mac%20Mini%20desktop&image_size=square_hd", rating: 4.9, price: "$799", specs: { Chip: "Apple M4", RAM: "16GB", Storage: "512GB SSD" }, pros: ["Best performance", "Silent operation"], cons: ["No GPU upgrade"], affiliateLink: "https://example.com/buy-mac-mini" },
      { name: "Intel NUC 14", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Intel%20NUC%20mini%20PC&image_size=square_hd", rating: 4.3, price: "$649", specs: { Processor: "Intel Core Ultra 7", RAM: "32GB", Storage: "1TB SSD" }, pros: ["More RAM", "Upgradable"], cons: ["Louder fan"], affiliateLink: "https://example.com/buy-intel-nuc" },
    ],
  },
];

const fallbackBuyingGuides: BuyingGuide[] = [
  { slug: "best-ai-gadgets-2025", title: "Best AI Gadgets 2025", excerpt: "Our curated list of the best AI gadgets you can buy right now.", category: "ai-gadgets", date: "2025-05-14", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collection%20of%20AI%20smart%20gadgets&image_size=landscape_16_9", productCount: 8, readingTime: 15 },
  { slug: "best-mini-pcs-2025", title: "Best Mini PCs 2025", excerpt: "Compact powerhouses for every budget and need.", category: "mini-pcs", date: "2025-05-10", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collection%20of%20mini%20PCs&image_size=landscape_16_9", productCount: 6, readingTime: 12 },
  { slug: "best-laser-engravers-2025", title: "Best Laser Engravers 2025", excerpt: "From beginner to pro, the best laser engravers for every skill level.", category: "laser-engravers", date: "2025-05-06", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collection%20of%20laser%20engravers&image_size=landscape_16_9", productCount: 5, readingTime: 10 },
  { slug: "best-creator-tools-2025", title: "Best Creator Tools 2025", excerpt: "Level up your content with the best creator tools available.", category: "creator-tools", date: "2025-05-02", image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=collection%20of%20creator%20tools%20gear&image_size=landscape_16_9", productCount: 10, readingTime: 14 },
];

const categorySlugMap: Record<string, string> = {
  "AI Gadgets": "ai-gadgets",
  "Creator Tools": "creator-tools",
  "Mini PCs": "mini-pcs",
  "Laser Engravers": "laser-engravers",
};

function notionPostToReview(post: NotionPost): Review {
  const catSlug = categorySlugMap[post.category] || post.category.toLowerCase().replace(/\s+/g, "-");
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content || `<p>${post.excerpt}</p>`,
    category: catSlug,
    tags: post.tags,
    author: post.author,
    date: post.date,
    image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(post.title)}&image_size=landscape_16_9`,
    rating: post.rating ? post.rating / 2 : 0,
    pros: post.pros,
    cons: post.cons,
    faq: post.faq,
    relatedPosts: [],
    affiliateLink: post.affiliateLink || undefined,
    readingTime: post.readingTime || undefined,
    featured: post.featured,
  };
}

function notionPostToComparison(post: NotionPost): Comparison {
  const catSlug = categorySlugMap[post.category] || post.category.toLowerCase().replace(/\s+/g, "-");
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: catSlug,
    date: post.date,
    image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(post.title)}&image_size=landscape_16_9`,
    readingTime: post.readingTime || undefined,
    products: [],
  };
}

function notionPostToBuyingGuide(post: NotionPost): BuyingGuide {
  const catSlug = categorySlugMap[post.category] || post.category.toLowerCase().replace(/\s+/g, "-");
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: catSlug,
    date: post.date,
    image: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(post.title)}&image_size=landscape_16_9`,
    productCount: 1,
    readingTime: post.readingTime || undefined,
  };
}

let cachedPosts: NotionPost[] | null = null;

async function getNotionPosts(): Promise<NotionPost[]> {
  if (cachedPosts) return cachedPosts;
  try {
    const posts = await getPublishedPosts();
    if (posts.length > 0) {
      cachedPosts = posts;
      return posts;
    }
  } catch (e) {
    console.error("Failed to fetch from Notion:", e);
  }
  return [];
}

export function clearCache() {
  cachedPosts = null;
}

export async function getReviews(): Promise<Review[]> {
  const posts = await getNotionPosts();
  if (posts.length > 0) {
    const reviewPosts = posts.filter((p) => p.type === "Review");
    if (reviewPosts.length > 0) {
      return reviewPosts.map(notionPostToReview);
    }
  }
  return fallbackReviews;
}

export async function getComparisons(): Promise<Comparison[]> {
  const posts = await getNotionPosts();
  if (posts.length > 0) {
    const comparisonPosts = posts.filter((p) => p.type === "Comparison");
    if (comparisonPosts.length > 0) {
      return comparisonPosts.map(notionPostToComparison);
    }
  }
  return fallbackComparisons;
}

export async function getBuyingGuides(): Promise<BuyingGuide[]> {
  const posts = await getNotionPosts();
  if (posts.length > 0) {
    const guidePosts = posts.filter((p) => p.type === "Buying Guide");
    if (guidePosts.length > 0) {
      return guidePosts.map(notionPostToBuyingGuide);
    }
  }
  return fallbackBuyingGuides;
}

export async function getReviewBySlug(slug: string): Promise<Review | undefined> {
  const reviews = await getReviews();
  return reviews.find((r) => r.slug === slug);
}

export async function getComparisonBySlug(slug: string): Promise<Comparison | undefined> {
  const comparisons = await getComparisons();
  return comparisons.find((c) => c.slug === slug);
}

export async function getBuyingGuideBySlug(slug: string): Promise<BuyingGuide | undefined> {
  const guides = await getBuyingGuides();
  return guides.find((g) => g.slug === slug);
}

export async function getPostContent(pageId: string): Promise<string> {
  return getPageContent(pageId);
}

export const trendingItems: TrendingItem[] = [
  { slug: "best-ai-gadget-2025", title: "The Best AI Gadget of 2025", category: "ai-gadgets", views: "24.5K" },
  { slug: "mini-pc-review-2025", title: "Mini PC Showdown", category: "mini-pcs", views: "18.2K" },
  { slug: "streaming-mic-showdown", title: "Streaming Mic Showdown", category: "creator-tools", views: "15.7K" },
  { slug: "ai-smart-camera-review", title: "AI Smart Camera Review", category: "ai-gadgets", views: "12.3K" },
  { slug: "laser-engraver-beginners-guide", title: "Best Laser Engravers for Beginners", category: "laser-engravers", views: "9.8K" },
];

export const categoryNameMap: Record<string, string> = {
  "ai-gadgets": "AI Gadgets",
  "creator-tools": "Creator Tools",
  "mini-pcs": "Mini PCs",
  "laser-engravers": "Laser Engravers",
};

export const deals: Deal[] = [
  {
    id: "deal-1",
    title: "Apple Mac Mini M4",
    description: "The most powerful Mac Mini ever with M4 chip, 16GB RAM, 512GB SSD. Perfect for creators and developers.",
    category: "mini-pcs",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Apple%20Mac%20Mini%20M4%20desktop%20computer%20white%20background&image_size=square_hd",
    originalPrice: "$799",
    dealPrice: "$649",
    discount: 19,
    couponCode: "MACMINI19",
    affiliateLink: "https://example.com/buy-mac-mini-deal",
    store: "Amazon",
    expiresAt: "2025-06-01",
    isFeatured: true,
    isHot: true,
    tags: ["Mac", "Mini PC", "Apple"],
  },
  {
    id: "deal-2",
    title: "Rode PodMic USB",
    description: "Professional-grade dynamic microphone with built-in USB interface. Perfect for podcasting and streaming.",
    category: "creator-tools",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rode%20PodMic%20USB%20microphone%20white%20background&image_size=square_hd",
    originalPrice: "$199",
    dealPrice: "$149",
    discount: 25,
    couponCode: "RODE25",
    affiliateLink: "https://example.com/buy-rode-deal",
    store: "B&H Photo",
    expiresAt: "2025-05-28",
    isFeatured: true,
    isHot: true,
    tags: ["Microphone", "Streaming", "Podcast"],
  },
  {
    id: "deal-3",
    title: "xTool S1 40W Laser Engraver",
    description: "40W diode laser engraver with enclosed design. Cuts 10mm wood and 5mm acrylic with ease.",
    category: "laser-engravers",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=xTool%20S1%20laser%20engraver%20machine%20white%20background&image_size=square_hd",
    originalPrice: "$1,199",
    dealPrice: "$899",
    discount: 25,
    affiliateLink: "https://example.com/buy-xtool-deal",
    store: "xTool Official",
    expiresAt: "2025-05-31",
    isFeatured: false,
    isHot: true,
    tags: ["Laser", "Engraver", "DIY"],
  },
  {
    id: "deal-4",
    title: "Amazon Echo Hub",
    description: "Smart home controller with 8-inch touchscreen. Control all your smart devices from one place.",
    category: "ai-gadgets",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Amazon%20Echo%20Hub%20smart%20home%20controller%20white%20background&image_size=square_hd",
    originalPrice: "$179",
    dealPrice: "$129",
    discount: 28,
    couponCode: "ECHO28",
    affiliateLink: "https://example.com/buy-echo-hub-deal",
    store: "Amazon",
    expiresAt: "2025-06-05",
    isFeatured: false,
    isHot: false,
    tags: ["Smart Home", "AI", "Amazon"],
  },
  {
    id: "deal-5",
    title: "Intel NUC 14 Pro",
    description: "Intel Core Ultra 7, 32GB RAM, 1TB SSD. The most powerful mini PC for professionals.",
    category: "mini-pcs",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Intel%20NUC%2014%20Pro%20mini%20PC%20white%20background&image_size=square_hd",
    originalPrice: "$849",
    dealPrice: "$699",
    discount: 18,
    affiliateLink: "https://example.com/buy-nuc-deal",
    store: "Newegg",
    expiresAt: "2025-06-03",
    isFeatured: false,
    isHot: false,
    tags: ["Mini PC", "Intel", "Desktop"],
  },
  {
    id: "deal-6",
    title: "Elgato Stream Deck MK.2",
    description: "15 customizable LCD keys for streamers. Take control of your streams, apps, and tools.",
    category: "creator-tools",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Elgato%20Stream%20Deck%20MK2%20controller%20white%20background&image_size=square_hd",
    originalPrice: "$149",
    dealPrice: "$109",
    discount: 27,
    couponCode: "STREAM27",
    affiliateLink: "https://example.com/buy-streamdeck-deal",
    store: "Amazon",
    expiresAt: "2025-05-30",
    isFeatured: true,
    isHot: false,
    tags: ["Streaming", "Controller", "Creator"],
  },
  {
    id: "deal-7",
    title: "Google Nest Hub Max",
    description: "10-inch smart display with Nest Cam built in. Video call, watch, and control your smart home.",
    category: "ai-gadgets",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Google%20Nest%20Hub%20Max%20smart%20display%20white%20background&image_size=square_hd",
    originalPrice: "$229",
    dealPrice: "$179",
    discount: 22,
    affiliateLink: "https://example.com/buy-nest-hub-deal",
    store: "Best Buy",
    expiresAt: "2025-06-07",
    isFeatured: false,
    isHot: false,
    tags: ["Smart Display", "Google", "AI"],
  },
  {
    id: "deal-8",
    title: "Creality Falcon2 40W Laser Engraver",
    description: "40W laser engraver with air assist. Engrave up to 400mm/s on wood, leather, and acrylic.",
    category: "laser-engravers",
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Creality%20Falcon2%20laser%20engraver%20white%20background&image_size=square_hd",
    originalPrice: "$599",
    dealPrice: "$459",
    discount: 23,
    couponCode: "FALCON23",
    affiliateLink: "https://example.com/buy-falcon-deal",
    store: "Creality Official",
    expiresAt: "2025-06-02",
    isFeatured: false,
    isHot: true,
    tags: ["Laser", "Engraver", "Creality"],
  },
];
