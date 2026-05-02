import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { OWNER_OPERATORS } from "@/constants/content";
import type { Metadata } from "next";
import { ApplicationForm } from "./_components/ApplicationForm";

export const metadata: Metadata = {
  title: "Owner Operators",
  description: OWNER_OPERATORS.hero.heading,
};

export default function OwnerOperatorsPage() {
  return (
    <>
      <Hero
        heading={OWNER_OPERATORS.hero.heading}
        subheading={OWNER_OPERATORS.hero.subheading}
      />
      <Section muted>
        <p className="mx-auto max-w-3xl text-center text-base leading-8 text-slate-700 sm:text-lg">
          {OWNER_OPERATORS.intro}
        </p>
      </Section>

      <Section heading="What We Offer">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OWNER_OPERATORS.benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-slate-200 border-l-4 border-l-(--color-blue) bg-white p-6 shadow-sm"
            >
              <dt className="text-base font-bold text-(--color-navy)">
                {benefit.title}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-700">
                {benefit.body}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-(--color-navy)">Requirements</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 sm:text-base">
              {OWNER_OPERATORS.requirements.map((requirement) => (
                <li key={requirement} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-blue-tint) text-xs font-bold text-(--color-blue)">
                    OK
                  </span>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-(--color-navy)">
              Quick Application
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Complete this short form and our team will contact you quickly.
            </p>
            <div className="mt-5">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
