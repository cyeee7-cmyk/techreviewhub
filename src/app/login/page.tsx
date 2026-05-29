import type { Metadata } from "next";

import EmailLoginForm from "@/components/auth/EmailLoginForm";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Email Login",
  description: "Sign in to TechReviewHub with a one-time verification code sent to your email.",
});

export default function LoginPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <EmailLoginForm />
      </div>
    </div>
  );
}
