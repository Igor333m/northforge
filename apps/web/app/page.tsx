import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { HOME } from "@/constants/content";

export default function HomePage() {
  return (
    <>
      <Hero
        heading={HOME.hero.heading}
        subheading={HOME.hero.subheading}
        cta={HOME.hero.cta}
        secondaryCta={HOME.hero.secondaryCta}
      />
      <Section heading={HOME.features.heading} muted>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOME.features.items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 border-l-4 border-l-(--color-blue) bg-white p-6 shadow-sm"
            >
              <dt className="text-base font-bold text-(--color-navy)">
                {item.title}
              </dt>
              <dd className="mt-2 text-sm leading-6 text-slate-700">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
