"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "For Investors", href: "/investor" },
  { label: "For Applicants", href: "/applicants" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "About", href: "#about" },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xs px-4 md:hidden">
      <div className="flex justify-center">
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/60 p-3 text-white backdrop-blur-sm shadow-xl"
        >
          <span className="sr-only">Toggle navigation menu</span>
          <div className="flex flex-col gap-1">
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-current transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-white/20 bg-black/75 p-4 text-white backdrop-blur-md shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full rounded-xl px-4 py-3 text-center text-base font-medium transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-white/5 text-white hover:bg-white/15"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
