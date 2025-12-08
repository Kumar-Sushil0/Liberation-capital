"use client";

import { useState } from "react";

interface FAQ {
  category: string;
  title: string;
  question: string;
  answer: string;
}

const faqCategories = [
  "Membership & Access",
  "Protocols & Behavior",
  "Staying & Arrival",
  "Dining & Wellness",
  "Explorations & Events",
  "Policies & Legal",
  "Technology & Media",
  "Safety & Security",
];

const faqs: FAQ[] = [
  {
    category: "Membership & Access",
    title: "MEMBERSHIP & ACCESS",
    question: "Who can stay at EPiCENTRE?",
    answer:
      "EPiCENTRE is a sanctuary for players of LiFEiDESiGN and a few selectively invited creators, leaders, and aligned individuals. Over time, access becomes players-only — a closed, sovereign community.",
  },
  {
    category: "Membership & Access",
    title: "MEMBERSHIP & ACCESS",
    question: "Can I stay without being a LiFEiDESiGN player?",
    answer:
      "Currently yes, through select invitation or successful membership application. Eventually: LiFEiDESiGN Gang Members only.",
  },
  {
    category: "Membership & Access",
    title: "MEMBERSHIP & ACCESS",
    question: "Why is membership required?",
    answer:
      "To protect the sanctity of the space — its silence, its ethos, its anonymity, and its psychological depth.",
  },
  {
    category: "Protocols & Behavior",
    title: "SILENCE & BEHAVIOR PROTOCOLS",
    question: "Is EPiCENTRE a silent retreat?",
    answer: "Not fully — but silence is the dominant atmosphere.",
  },
  {
    category: "Protocols & Behavior",
    title: "SILENCE & BEHAVIOR PROTOCOLS",
    question: "Where can I speak?",
    answer:
      "10–11 PM (Mon–Thu): daily social window\n\nWeekends: mindful, low-volume speech only\n\nEvents: normal communication allowed\n\nWith staff: essential communication only\n\nDesignated communication zones: for calls or external contact",
  },
  {
    category: "Protocols & Behavior",
    title: "SILENCE & BEHAVIOR PROTOCOLS",
    question: "Where is silence mandatory?",
    answer:
      "Everywhere else.\n\nBecause silence is not absence — it is amplification of the self.",
  },
  {
    category: "Technology & Media",
    title: "PHONES, DEVICES & DIGITAL DETOX",
    question: "Are phones allowed?",
    answer: "Yes — but only in designated communication zones.",
  },
  {
    category: "Technology & Media",
    title: "PHONES, DEVICES & DIGITAL DETOX",
    question: "What happens at check-in?",
    answer:
      "Guests self-deposit their devices by default.\n\nThey can collect them only when needed.",
  },
  {
    category: "Technology & Media",
    title: "PHONES, DEVICES & DIGITAL DETOX",
    question: "Is WiFi available?",
    answer:
      "Available only in specific zones\n\nShut down daily from 8 PM to 8 AM",
  },
  {
    category: "Technology & Media",
    title: "PHOTOGRAPHY & RECORDING",
    question: "Can I take photos?",
    answer: "No.\n\nEPiCENTRE is a no-photo, no-vlog, no-reel sanctuary.",
  },
  {
    category: "Technology & Media",
    title: "PHOTOGRAPHY & RECORDING",
    question: "Are exceptions allowed?",
    answer: "Only in designated event spaces with explicit permission.",
  },
  {
    category: "Technology & Media",
    title: "PHOTOGRAPHY & RECORDING",
    question: "Wearable cameras / livestreaming?",
    answer: "Not allowed anywhere on the property.",
  },
  {
    category: "Staying & Arrival",
    title: "STAYING AT EPiCENTRE",
    question: "Check-in & Check-out",
    answer: "Standard luxury timing:\n\nCheck-in: 2 PM\n\nCheck-out: 11 AM",
  },
  {
    category: "Staying & Arrival",
    title: "STAYING AT EPiCENTRE",
    question: "Housekeeping & Privacy",
    answer:
      "Cleaning only on request\n\nOnly when the guest is not inside\n\nStaff remain silent unless spoken to\n\nLinen changed only on request",
  },
  {
    category: "Staying & Arrival",
    title: "STAYING AT EPiCENTRE",
    question: "Dormitory Rules",
    answer: "Lights out at 11 PM.\n\nBlackout masks recommended.",
  },
  {
    category: "Dining & Wellness",
    title: "DINING & FOOD GUIDELINES",
    question: "Meal structure",
    answer:
      "Two daily meals at fixed timings\n\nSelf-service\n\nGuests wash their own dishes unless assistance is requested\n\nClean-up is communal ethos\n\nDomestic help available",
  },
  {
    category: "Dining & Wellness",
    title: "DINING & FOOD GUIDELINES",
    question: "Fasting support",
    answer: "Available with 1-week prior notice.",
  },
  {
    category: "Dining & Wellness",
    title: "DINING & FOOD GUIDELINES",
    question: "Alcohol policy",
    answer: "Zero alcohol on the property.",
  },
  {
    category: "Dining & Wellness",
    title: "DINING & FOOD GUIDELINES",
    question: "Smoking",
    answer: "Allowed only in designated smoking zones.",
  },
  {
    category: "Dining & Wellness",
    title: "INITIATIONS & ADVANCED RITUALS",
    question: "Do some Initiations require screening?",
    answer:
      "Yes — including:\n\nMask Over Money\n\nDarkness Retreat\n\nThe Burial of Self",
  },
  {
    category: "Dining & Wellness",
    title: "INITIATIONS & ADVANCED RITUALS",
    question: "How does screening work?",
    answer:
      "A short onboarding form\n\nA conversation with a facilitator\n\nEPiCENTRE may decline participation if safety or readiness is uncertain",
  },
  {
    category: "Dining & Wellness",
    title: "INITIATIONS & ADVANCED RITUALS",
    question: "Why this filtering?",
    answer:
      "These are deep psychological rites.\n\nWe protect the player — and the ritual.",
  },
  {
    category: "Dining & Wellness",
    title: "WELLNESS & NIGHT PROTOCOLS",
    question: "Can I use wellness zones at night?",
    answer: "No. Wellness zones close at night.",
  },
  {
    category: "Dining & Wellness",
    title: "WELLNESS & NIGHT PROTOCOLS",
    question: "Is movement allowed after 11 PM?",
    answer:
      "Yes — silently.\n\nGuests may move through the property using dim, personal light (torch/book light).",
  },
  {
    category: "Dining & Wellness",
    title: "WELLNESS & NIGHT PROTOCOLS",
    question: "Lights-out",
    answer: "All common-area lights turn off at 11 PM.",
  },
  {
    category: "Dining & Wellness",
    title: "WELLNESS & NIGHT PROTOCOLS",
    question: "Outdoor movement",
    answer: "Allowed with intimation, not permission.",
  },
  {
    category: "Explorations & Events",
    title: "EXPLORATIONS & SAFETY",
    question: "Are explorations solo-only?",
    answer: "Yes.\n\nExplorations are strictly sovereign practices.",
  },
  {
    category: "Explorations & Events",
    title: "EXPLORATIONS & SAFETY",
    question: "Water safety requirements",
    answer:
      "Life jackets mandatory\n\nKayaks allowed solo\n\nBoating requires EPiCENTRE boat rider",
  },
  {
    category: "Explorations & Events",
    title: "EXPLORATIONS & SAFETY",
    question: "Emergency readiness",
    answer:
      "Emergency response vehicle & rescue boat\n\n30-minute access to nearest hospital\n\nSOS points across property\n\nStaff trained in basic first aid",
  },
  {
    category: "Policies & Legal",
    title: "AGE, FAMILY & CHILDREN",
    question: "Minimum age",
    answer: "16+",
  },
  {
    category: "Policies & Legal",
    title: "AGE, FAMILY & CHILDREN",
    question: "Guests aged 16–18",
    answer:
      "Allowed to stay\n\nRequire written guardian consent\n\nGuardian presence not required\n\nThey must follow adult protocol.",
  },
  {
    category: "Policies & Legal",
    title: "AGE, FAMILY & CHILDREN",
    question: "Are families allowed?",
    answer: "For events only, not for stays.",
  },
];

export const FAQSlide = () => {
  const [activeCategory, setActiveCategory] = useState("Membership & Access");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFaqs = filteredFaqs.slice(startIndex, endIndex);

  // Reset to page 1 when category or search changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setOpenFaqIndex(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setOpenFaqIndex(null);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-start overflow-y-auto mx-auto w-full max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 lg:gap-8 w-full shrink-0 mt-20">
        {/* Left: Category Filters */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold uppercase tracking-wider text-foreground/80 mb-4 text-left">
            Categories
          </h3>
          {faqCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-3 py-1.5 rounded-lg transition-all text-sm ${
                activeCategory === category
                  ? "text-[#00e87b] font-medium border-2 border-[#00e87b] bg-foreground/5"
                  : "text-foreground bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Right: Search Bar + FAQ Items */}
        <div className="flex flex-col max-h-[calc(100vh-8rem)]">
          {/* Search Bar */}
          <div className="mb-4 shrink-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-lg focus:outline-none focus:border-[#00e87b] transition-colors text-foreground placeholder:text-foreground/40 text-sm"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3 flex-1">
          {currentFaqs.length > 0 ? (
            currentFaqs.map((faq, index) => {
              const globalIndex = startIndex + index;
              return (
              <article
                key={globalIndex}
                className="border border-foreground/20 rounded-lg overflow-hidden hover:border-foreground/40 transition-colors"
              >
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === globalIndex ? null : globalIndex)
                  }
                  className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#00e87b]/10 text-[#00e87b] rounded mb-1.5">
                      {faq.category}
                    </span>
                    <h3 className="text-base font-semibold text-foreground">
                      {faq.question}
                    </h3>
                  </div>
                  <svg
                    className={`w-5 h-5 text-foreground/60 transition-transform shrink-0 mt-1 ${
                      openFaqIndex === globalIndex ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaqIndex === globalIndex && (
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </article>
              );
            })
          ) : (
            <div className="text-center py-12 text-foreground/60">
              <p className="text-sm">No questions found matching your search.</p>
            </div>
          )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6 shrink-0">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setOpenFaqIndex(null);
                  }}
                  className={`w-8 h-8 rounded-lg transition-all text-sm font-medium ${
                    currentPage === page
                      ? "text-[#00e87b] border-2 border-[#00e87b] bg-foreground/5"
                      : "bg-foreground/5 hover:bg-foreground/10 text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Section - Minimal Height */}
      <footer className="w-full max-w-7xl mt-4 border-t border-foreground/20 text-foreground/80 shrink-0">
        {/* Top section: 4 columns x 3 rows */}
        <div className="w-full">
          <div className="flex justify-between gap-y-3 py-6 text-base" style={{ fontFamily: "'Full Moon BT W01 Falling Leav', serif" }}>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                About EPiCENTRE
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Membership
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Contact Us
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Experiences
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Dining
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Wellness
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Explorations
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Events
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Rooms &amp; Suites
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Book Now
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                Location
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/20" />

        {/* Bottom section: Social icons, copyright, and policies */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 py-3 text-xs">
          {/* Left: Social icons */}
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="#"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
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
            </a>
            {/* X (Twitter) */}
            <a
              href="#"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="X"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="#"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="YouTube"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Discord */}
            <a
              href="#"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Discord"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>

          {/* Center: Copyright */}
          <div className="text-center lg:flex-1">
            <p className="text-foreground/80">
              © 2025 EPiCENTRE. All rights reserved.
            </p>
          </div>

          {/* Right: Policy links */}
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
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Cancellation Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
