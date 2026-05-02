import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { ABOUT } from "@/constants/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: ABOUT.hero.heading,
};

export default function AboutPage() {
  return (
    <>
      <Hero heading={ABOUT.hero.heading} subheading={ABOUT.hero.subheading} />
      <Section muted>
        <p className="mx-auto max-w-3xl text-center text-base leading-8 text-slate-700 sm:text-lg">
          {ABOUT.body}
        </p>
      </Section>
      <Section heading="Our Values">
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {ABOUT.values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <dt className="text-base font-bold text-(--color-navy)">
                {value.title}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-700">
                {value.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
