import ContactForm from "@/components/forms/ContactForm";
import { constructMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Contact Us",
  description: "Get in touch with TechReviewHub",
});

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          Contact Us
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Have a question or want to collaborate? We&apos;d love to hear from you!
        </p>

        <ContactForm />
      </div>
    </div>
  );
}
