"use client";

import { CONTACT } from "@/constants/content";
import { useState } from "react";

interface FormState {
  name: string;
  company: string;
  phone: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus("success");
      setForm({ name: "", company: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
        {CONTACT.form.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Company (Optional)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{CONTACT.form.errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-(--color-blue) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--color-blue-hover) disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : CONTACT.form.submitLabel}
      </button>
    </form>
  );
}
