"use client";

import { ReactNode } from "react";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import { FixedHeader } from "./fixedheader/FixedHeader";

interface PageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <FixedHeader />
      {/* Banner with fixed background image */}
      <section className="relative min-h-screen pb-12">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')" }}
          aria-hidden="true"
        />
        {/* Transparent banner content */}
        <div className="relative flex min-h-screen items-center justify-center pb-12">
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="rounded-3xl border border-white/20 bg-black/30 p-10 backdrop-blur-sm">
              <h1
                className="text-center text-5xl font-normal tracking-tight sm:text-7xl"
                style={{ fontFamily: '"built", "Satoshi", sans-serif' }}
              >
                {title}
              </h1>
              <p className="mt-4 text-center text-lg text-white/85">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area with rounded top borders */}
      <section className="relative bg-background rounded-t-[3rem] -mt-12 z-10">
        {children}

        {/* Footer */}
        <footer className="mx-auto w-full max-w-6xl px-6 pt-12 pb-20 text-foreground/80">
          <div className="border-t border-foreground/20" />

          {/* Top section: 4 columns of links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 py-10 text-sm">
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:text-foreground transition-colors">
                Contact us
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Blog
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                FAQ
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/investor" className="hover:text-foreground transition-colors">
                For Investors
              </a>
              <a href="/applicants" className="hover:text-foreground transition-colors">
                For Applicants
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Philosophy
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                EPiCENTRE
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                LIFEiDESIGN
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:text-foreground transition-colors">
                Resources
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="border-t border-foreground/20" />

          {/* Bottom section: Social icons, copyright, and policies */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 py-6 text-xs">
            {/* Left: Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
                Instagram
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Center: Copyright and email */}
            <div className="text-center lg:flex-1">
              <p className="text-foreground/80">
                © 2025 Liberation Capital. All rights reserved.
              </p>
              <p className="mt-1 text-foreground/60">
                Email: info@liberationcapital.com
              </p>
            </div>

            {/* Right: Policy links */}
            <div className="flex flex-col items-start lg:items-end gap-1.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Terms &amp; Conditions
                </a>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Disclaimer
                </a>
              </div>
              <a
                href="#"
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                Investment Policy
              </a>
            </div>
          </div>
        </footer>
      </section>

      {/* Bottom center navigation */}
      {/* <Navigation /> */}
      <MobileNavigation />
    </main>
  );
}
