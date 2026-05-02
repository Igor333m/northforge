import { NAV_LINKS, SITE } from "@/constants/content";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-(--color-navy-border) bg-(--color-navy) text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-base font-bold">{SITE.name}</p>
            <p className="mt-2 text-sm text-slate-300">{SITE.tagline}</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Navigation
            </p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white transition-colors hover:text-(--color-blue-light)"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>{SITE.phone}</li>
              <li>{SITE.email}</li>
              <li>{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-(--color-navy-border) pt-5 text-xs text-slate-300">
          <p className="text-center">
            Northforge Freight LLC | DOT #: {SITE.dot} | MC #: {SITE.mc}
          </p>
          <p className="mt-2 text-center">
            &copy; 2026 Northforge Freight. All Rights Reserved. Chicago, IL -
            The Hub of American Freight.
          </p>
        </div>
      </div>
    </footer>
  );
}
