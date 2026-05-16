"use client";

import { CONTACT } from "@/constants/content";
import { AlertSuccess } from "@/components/ui/alerts/AlertSuccess";
import { AlertError } from "@/components/ui/alerts/AlertError";
import {
  applicationFormSchema,
  type ApplicationFormValues,
} from "@/lib/schemas/quote.schema";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

// NOTE: NEXT_PUBLIC_FORMSPREE_ID is set in .env — this is the Formspree form endpoint.
const FORMSPREE_URL = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`;

export function ApplicationForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  // NOTE: incrementing captchaKey forces HCaptcha to remount, resetting the widget
  // without an imperative ref call — required for React Compiler compliance.
  const [captchaKey, setCaptchaKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
  });

  const onSubmit = useCallback(
    async (data: ApplicationFormValues) => {
      if (!captchaToken) return;
      setStatus("loading");
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...data, "h-captcha-response": captchaToken }),
        });
        if (!res.ok) throw new Error("Submission failed");
        setStatus("success");
        reset();
        setCaptchaKey((k) => k + 1);
        setCaptchaToken(null);
      } catch {
        setStatus("error");
        setCaptchaKey((k) => k + 1);
        setCaptchaToken(null);
      }
    },
    [captchaToken, reset],
  );

  if (status === "success") {
    return <AlertSuccess message={CONTACT.form.successMessage} />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-(--color-navy)"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
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
          type="tel"
          {...register("phone")}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
        )}
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
          type="email"
          {...register("email")}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
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
          type="number"
          min="0"
          {...register("yearsOfExperience", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
        {errors.yearsOfExperience && (
          <p className="mt-1 text-xs text-red-600">
            {errors.yearsOfExperience.message}
          </p>
        )}
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
          type="text"
          {...register("equipmentType")}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-(--color-blue) focus:outline-none focus:ring-2 focus:ring-(--color-blue)/20"
        />
        {errors.equipmentType && (
          <p className="mt-1 text-xs text-red-600">
            {errors.equipmentType.message}
          </p>
        )}
      </div>

      <HCaptcha
        key={captchaKey}
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
        onVerify={(token) => setCaptchaToken(token)}
        onExpire={() => setCaptchaToken(null)}
      />

      {status === "error" && (
        <AlertError message={CONTACT.form.errorMessage} />
      )}

      <button
        type="submit"
        disabled={status === "loading" || !captchaToken}
        className="w-full rounded-full bg-(--color-blue) px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-(--color-blue-hover) disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Submitting..." : "Apply Now"}
      </button>

      <input
        type="text"
        name="_gotcha"
        style={{ position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
      />
    </form>
  );
}
