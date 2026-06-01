import type { Metadata } from "next";

import EmailLoginForm from "@/components/auth/EmailLoginForm";
import BlogPageSidebar from "@/components/shared/BlogPageSidebar";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Email Login",
  description: "Sign in to TechReviewHub with a one-time verification code sent to your email.",
});

export default function LoginPage() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_340px]">
          <section className="wp-shell rounded-[32px] px-6 py-8 sm:px-8 lg:px-10">
            <div className="max-w-3xl border-b border-stone-300 pb-6 dark:border-gray-700">
              <span className="wp-kicker">Reader Account</span>
              <h1 className="wp-title mt-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                Sign in like a classic reader portal.
              </h1>
              <p className="mt-4 text-base leading-8 text-stone-600 dark:text-gray-400">
                This page now follows a magazine-style article layout with a clear content column,
                a helpful sidebar, and a lightweight sign-in flow powered by email verification.
              </p>
            </div>

            <div className="mt-8">
              <EmailLoginForm />
            </div>
          </section>

          <aside>
            <BlogPageSidebar
              eyebrow="Sign-In Notes"
              title="No passwords, no clutter."
              description="Readers can request a 6-digit code, verify the email, and continue browsing with a simple session-based sign-in flow."
              actionHref="/contact"
              actionLabel="Need help? Contact us"
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
