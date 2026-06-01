"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmailLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send verification code.");
      }

      setStep("verify");
      setSuccess(data.message || "Verification code sent.");
      setCode("");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to send verification code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to verify your code.");
      }

      setSuccess("Signed in successfully.");
      router.refresh();
      router.push("/");
    } catch (verifyError) {
      setError(
        verifyError instanceof Error ? verifyError.message : "Unable to verify your code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="wp-card rounded-[28px] p-6 sm:p-8">
      <div className="mb-6 space-y-3 border-b border-stone-200 pb-6 dark:border-gray-700">
        <span className="wp-section-title">
          {step === "request" ? "Email Verification" : "Confirm Access"}
        </span>
        <h2 className="wp-title text-3xl font-bold text-gray-900 dark:text-white">
          Sign in with email
        </h2>
        <p className="text-sm leading-7 text-stone-600 dark:text-gray-400">
          Enter your email and we&apos;ll send you a 6-digit verification code.
        </p>
      </div>

      <form className="space-y-5" onSubmit={step === "request" ? requestCode : verifyCode}>
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 dark:text-gray-300"
          >
            Email
          </label>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting || step === "verify"}
            required
          />
        </div>

        {step === "verify" ? (
          <div>
            <label
              htmlFor="login-code"
              className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 dark:text-gray-300"
            >
              Verification code
            </label>
            <Input
              id="login-code"
              inputMode="numeric"
              placeholder="123456"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className="mt-3 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200"
              onClick={() => {
                setStep("request");
                setCode("");
                setError("");
                setSuccess("");
              }}
            >
              Use a different email
            </button>
          </div>
        ) : null}

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300">
            {success}
          </p>
        ) : null}

        <Button className="w-full rounded-full bg-amber-700 hover:bg-amber-800" size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Please wait..."
            : step === "request"
              ? "Send verification code"
              : "Verify and sign in"}
        </Button>

        {step === "verify" ? (
          <Button
            className="w-full rounded-full border-stone-300 hover:bg-stone-100 dark:border-gray-700 dark:hover:bg-gray-800"
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={async () => {
              setIsSubmitting(true);
              setError("");
              setSuccess("");

              try {
                const response = await fetch("/api/auth/request-code", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ email }),
                });

                const data = (await response.json()) as { error?: string; message?: string };

                if (!response.ok) {
                  throw new Error(data.error || "Unable to resend verification code.");
                }

                setSuccess(data.message || "Verification code sent.");
              } catch (resendError) {
                setError(
                  resendError instanceof Error
                    ? resendError.message
                    : "Unable to resend verification code.",
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            Resend code
          </Button>
        ) : null}
      </form>

      <p className="mt-6 text-sm text-stone-500 dark:text-gray-400">
        Need to send a message instead?{" "}
        <Link href="/contact" className="font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200">
          Go to contact form
        </Link>
      </p>
    </div>
  );
}
