"use client";

import { NAV_LINKS, SITE } from "@/constants/content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--color-navy-border) bg-(--color-navy)">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="max-w-[70%] text-base font-bold tracking-wide text-white sm:text-lg"
        >
          {SITE.name}
        </Link>

        <button
          type="button"
          className="rounded-md border border-(--color-hamburger-border) p-2 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-5 bg-white" />
          <span className="mt-1.5 block h-0.5 w-5 bg-white" />
          <span className="mt-1.5 block h-0.5 w-5 bg-white" />
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${pathname === link.href ? "text-(--color-blue-light)" : "text-white hover:text-(--color-blue-light)"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-(--color-blue) px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-(--color-blue-hover)"
          >
            Request a Quote
          </Link>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-(--color-navy-border) bg-(--color-navy) px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-2 py-2 text-sm font-semibold ${pathname === link.href ? "bg-(--color-navy-active) text-(--color-blue-light)" : "text-white hover:bg-(--color-navy-hover)"}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-1 rounded-full bg-(--color-blue) px-5 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
