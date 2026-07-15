export const constructMetadata = ({
  title,
  description,
  image,
  path = "",
}: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}) => {
  const baseTitle = "Tech Review Hub - Honest Reviews & Comparisons";
  const baseDescription = "Your trusted source for honest tech reviews, comparisons, and best-of guides.";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techreviewhub.com";

  return {
    title: title ? `${title} | Tech Review Hub` : baseTitle,
    description: description || baseDescription,
    verification: {
      other: {
        "impact-site-verification": "3f3b5bc5-5839-40f2-abec-a720cbc312a7",
        "partnerboostverifycode": "32dc01246faccb7f5b3cad5016dd5033",
      },
    },
    openGraph: {
      title: title ? `${title} | Tech Review Hub` : baseTitle,
      description: description || baseDescription,
      url: `${baseUrl}${path}`,
      siteName: "Tech Review Hub",
      images: image ? [{ url: image }] : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | Tech Review Hub` : baseTitle,
      description: description || baseDescription,
      images: image ? [image] : [],
    },
  };
};

export const generateJsonLd = (
  type: "Article" | "Product" | "WebSite",
  data: any
) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techreviewhub.com";

  if (type === "Article") {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.title,
      description: data.excerpt,
      image: data.image ? [data.image] : [],
      datePublished: data.date,
      author: {
        "@type": "Person",
        name: data.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Tech Review Hub",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
    };
  }

  if (type === "WebSite") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Tech Review Hub",
      url: baseUrl,
    };
  }

  return null;
};
