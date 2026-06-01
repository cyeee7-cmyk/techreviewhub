"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your message.");
      }

      setSuccess(data.message || "Your message has been sent.");
      setForm(initialState);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to send your message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 dark:text-gray-300"
          >
            Name
          </label>
          <Input
            id="name"
            placeholder="Your name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 dark:text-gray-300"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 dark:text-gray-300"
        >
          Subject
        </label>
        <Input
          id="subject"
          placeholder="How can we help?"
          value={form.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-stone-600 dark:text-gray-300"
        >
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Your message here..."
          className="min-h-[150px]"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          disabled={isSubmitting}
          required
        />
      </div>

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

      <div className="rounded-[28px] border border-stone-200 bg-stone-50 p-5 dark:border-gray-700 dark:bg-gray-900/70">
        <p className="text-sm leading-7 text-stone-600 dark:text-gray-400">
          We typically respond to editorial inquiries, partnership requests, and product tips
          within 1-2 business days.
        </p>
      </div>

      <Button
        size="lg"
        className="w-full rounded-full bg-amber-700 hover:bg-amber-800 md:w-auto"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
