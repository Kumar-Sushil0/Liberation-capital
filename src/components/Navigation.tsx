"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "For Investors", href: "/investor" },
    { label: "For Applicants", href: "/applicants" },
    { label: "Philosophy", href: "#philosophy" },
    { label: "About", href: "#about" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-4 max-w-[92vw] overflow-x-auto whitespace-nowrap">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm whitespace-nowrap overflow-hidden group ${
                isActive ? "bg-white text-black" : "bg-black/30 text-white"
              }`}
            >
              <span className="absolute inset-0 -right-1 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-lg"></span>
              <span className={`relative z-10 transition-colors duration-500 ${isActive ? "" : "group-hover:text-black"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
