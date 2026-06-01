import ContactForm from "@/components/forms/ContactForm";
import BlogPageSidebar from "@/components/shared/BlogPageSidebar";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description: "Get in touch with TechReviewHub",
});

export default function ContactPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_340px]">
          <section className="wp-shell rounded-[32px] px-6 py-8 sm:px-8 lg:px-10">
            <div className="max-w-3xl border-b border-stone-300 pb-6 dark:border-gray-700">
              <span className="wp-kicker">Editorial Contact Desk</span>
              <h1 className="wp-title mt-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                Contact us like a traditional blog editorial team.
              </h1>
              <p className="mt-4 text-base leading-8 text-stone-600 dark:text-gray-400">
                Have a question, partnership idea, or product tip? Send a note through the form
                below and it will land in the inbox configured for this site.
              </p>
            </div>

            <div className="mt-8">
              <ContactForm />
            </div>
          </section>

          <aside>
            <BlogPageSidebar
              eyebrow="Contact Notes"
              title="A sidebar built for editorial pages."
              description="WordPress themes often pair forms with archive widgets, featured reading, and lightweight site context so the page still feels like part of the publication."
              actionHref="/login"
              actionLabel="Open reader login"
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
