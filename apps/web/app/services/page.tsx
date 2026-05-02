import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { SERVICES } from "@/constants/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: SERVICES.hero.heading,
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        heading={SERVICES.hero.heading}
        subheading={SERVICES.hero.subheading}
      />
      <Section muted>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SERVICES.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 border-t-4 border-t-(--color-blue) bg-white p-6 shadow-md"
            >
              <dt className="flex items-center gap-3 text-base font-bold text-(--color-navy)">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-blue-tint) text-xs font-bold text-(--color-blue)">
                  {item.icon}
                </span>
                {item.title}
              </dt>
              <dd className="mt-3 text-sm leading-6 text-slate-700">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-2xl bg-(--color-navy) p-6 text-center sm:p-8">
          <p className="text-base text-slate-100 sm:text-lg">
            Need a dependable freight partner?
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-(--color-blue) px-6 py-3 text-sm font-semibold text-white hover:bg-(--color-blue-hover)"
          >
            Request a Quote
          </Link>
        </div>
      </Section>
    </>
  );
}
