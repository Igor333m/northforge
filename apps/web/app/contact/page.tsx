import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { CONTACT, SITE } from "@/constants/content";
import type { Metadata } from "next";
import { ContactForm } from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: CONTACT.hero.heading,
};

export default function ContactPage() {
  return (
    <>
      <Hero
        heading={CONTACT.hero.heading}
        subheading={CONTACT.hero.subheading}
      />
      <Section muted>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-(--color-navy)">
              Get a Quote or Join the Team
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Share a few details and we will respond within one business day.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-(--color-navy)">
              Office Information
            </h2>
            <dl className="mt-5 space-y-4 text-sm text-slate-700">
              <div>
                <dt className="font-semibold text-(--color-navy)">Address</dt>
                <dd className="mt-1">{SITE.address}</dd>
              </div>
              <div>
                <dt className="font-semibold text-(--color-navy)">Phone</dt>
                <dd className="mt-1">{SITE.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-(--color-navy)">Email</dt>
                <dd className="mt-1">{SITE.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-(--color-navy)">Hours</dt>
                <dd className="mt-1">{SITE.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
