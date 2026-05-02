import Link from "next/link";

interface HeroProps {
  heading: string;
  subheading: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({ heading, subheading, cta, secondaryCta }: HeroProps) {
  return (
    <section className="bg-(--color-navy) text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            {subheading}
          </p>
          {(cta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              {cta && (
                <Link
                  href={cta.href}
                  className="rounded-full bg-(--color-blue) px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-(--color-blue-hover)"
                >
                  {cta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="rounded-full border border-white/50 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
