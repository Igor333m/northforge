interface SectionProps {
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

export function Section({
  heading,
  subheading,
  children,
  className = "",
  muted = false,
}: SectionProps) {
  return (
    <section
      className={`py-14 sm:py-20 ${muted ? "bg-slate-50" : "bg-white"} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {(heading || subheading) && (
          <div className="mx-auto max-w-2xl text-center">
            {heading && (
              <>
                <h2 className="text-2xl font-bold tracking-tight text-(--color-navy) sm:text-4xl">
                  {heading}
                </h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-(--color-blue)" />
              </>
            )}
            {subheading && (
              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
