"use client";

import { useState } from "react";

interface ApplicationState {
  name: string;
  phone: string;
  email: string;
  yearsOfExperience: string;
  equipmentType: string;
}

export function ApplicationForm() {
  const [form, setForm] = useState<ApplicationState>({
    name: "",
    phone: "",
    email: "",
    yearsOfExperience: "",
    equipmentType: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        yearsOfExperience: "",
        equipmentType: "",
      });
    } catch {
      setStatus("error");
    }
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
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
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
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      <div>
        <label
          htmlFor="yearsOfExperience"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Years of Experience
        </label>
        <input
          id="yearsOfExperience"
          name="yearsOfExperience"
          type="number"
          min="0"
          required
          value={form.yearsOfExperience}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      <div>
        <label
          htmlFor="equipmentType"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Equipment Type
        </label>
        <input
          id="equipmentType"
          name="equipmentType"
          type="text"
          required
          value={form.equipmentType}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
      </div>

      {status === "success" && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Thanks for applying. We will contact you soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-(--color-blue) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--color-blue-hover) disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Submitting..." : "Apply Now"}
      </button>
    </form>
  );
}
