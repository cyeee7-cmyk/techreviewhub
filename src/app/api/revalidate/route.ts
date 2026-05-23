import { NextRequest, NextResponse } from "next/server";
import { clearCache } from "@/lib/data";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const secret = body.secret;
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  clearCache();

  const pathsToRevalidate = ["/", "/categories", "/deals"];

  try {
    const { getReviews, getComparisons, getBuyingGuides } = await import(
      "@/lib/data"
    );

    const reviews = await getReviews();
    const comparisons = await getComparisons();
    const guides = await getBuyingGuides();

    for (const review of reviews) {
      pathsToRevalidate.push(`/reviews/${review.slug}`);
    }
    for (const comparison of comparisons) {
      pathsToRevalidate.push(`/comparisons/${comparison.slug}`);
    }
    for (const guide of guides) {
      pathsToRevalidate.push(`/best/${guide.slug}`);
    }

    const categories = ["ai-gadgets", "creator-tools", "mini-pcs", "laser-engravers"];
    for (const cat of categories) {
      pathsToRevalidate.push(`/categories/${cat}`);
    }

    for (const path of pathsToRevalidate) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
          { method: "GET" }
        );
      } catch {}
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate.length,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  clearCache();

  try {
    const { getReviews, getComparisons, getBuyingGuides } = await import(
      "@/lib/data"
    );

    const reviews = await getReviews();
    const comparisons = await getComparisons();
    const guides = await getBuyingGuides();

    const pathsToRevalidate = ["/", "/categories", "/deals"];

    for (const review of reviews) {
      pathsToRevalidate.push(`/reviews/${review.slug}`);
    }
    for (const comparison of comparisons) {
      pathsToRevalidate.push(`/comparisons/${comparison.slug}`);
    }
    for (const guide of guides) {
      pathsToRevalidate.push(`/best/${guide.slug}`);
    }

    const categories = ["ai-gadgets", "creator-tools", "mini-pcs", "laser-engravers"];
    for (const cat of categories) {
      pathsToRevalidate.push(`/categories/${cat}`);
    }

    for (const path of pathsToRevalidate) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
          { method: "GET" }
        );
      } catch {}
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate.length,
      reviews: reviews.length,
      comparisons: comparisons.length,
      guides: guides.length,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
