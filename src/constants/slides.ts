// Slide configuration for homepage

export interface SlideConfig {
  type: string;
  className: string;
}

// Desktop sections configuration (24 slides total)
const desktopSections: SlideConfig[] = [
  { type: "hero", className: "slide00" },
  { type: "content1", className: "slide01" },
  { type: "warning", className: "slideWarning" },
  { type: "video", className: "slideVideo" },
  { type: "slide03", className: "slide03" },
  { type: "fundOrigin", className: "slideFundOrigin" },
  { type: "rebuildIdentities", className: "slideRebuildIdentities" },
  { type: "fundCoherence", className: "slideFundCoherence" },
  { type: "lifeiDesignAccelerator", className: "slideLifeiDesignAccelerator" },
  { type: "subscroll1", className: "slide02" },
  { type: "coreiDesign", className: "slideCoreiDesign" },
  { type: "playiDesign", className: "slidePlayiDesign" },
  { type: "epicentre", className: "slideEpicentre" },
  { type: "silenceTest", className: "slideSilenceTest" },
  { type: "disciplineTest", className: "slideDisciplineTest" },
  { type: "distractionTest", className: "slideDistractionTest" },
  { type: "liberationDay", className: "slideLiberationDay" },
  { type: "fundCrucible", className: "slideFundCrucible" },
  { type: "fundBlueprint", className: "slideFundBlueprint" },
  { type: "fundAsk", className: "slideFundAsk" },
  { type: "fundActivation", className: "slideFundActivation" },
  { type: "fundSupport", className: "slideFundSupport" },
  { type: "fundEnvironment", className: "slideFundEnvironment" },
  { type: "fundCapital", className: "slideFundCapital" }
];

// Mobile sections configuration (same for now, can be customized later)
const mobileSections: SlideConfig[] = [...desktopSections];

// Get sections array based on mobile/desktop
export const getSections = (isMobile: boolean): SlideConfig[] => {
  return isMobile ? mobileSections : desktopSections;
};

// Desktop subscroll sections - indices that pause main scroll
const DESKTOP_SUBSCROLL_SECTIONS: number[] = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]; // Slide 4 (Slide03), Slide 5 (FundOrigin), Slide 6 (RebuildIdentities), Slide 7 (FundCoherence), Slide 8 (LifeiDesignAccelerator), Slide 9 (SubscrollSlide1), Slide 10 (CoreiDesign), Slide 11 (PlayiDesign), Slide 12 (Epicentre), Slide 13 (SilenceTest), Slide 14 (DisciplineTest), Slide 15 (DistractionTest), Slide 16 (LiberationDay), Slide 17 (FundCrucible), Slide 18 (FundBlueprint), Slide 19 (FundAsk), Slide 20 (FundActivation), Slide 21 (FundSupport), Slide 22 (FundEnvironment), Slide 23 (FundCapital) have subscroll

// Mobile subscroll sections
const MOBILE_SUBSCROLL_SECTIONS: number[] = [];

// Get subscroll sections based on mobile/desktop
export const getSubscrollSections = (isMobile: boolean): number[] => {
  return isMobile ? MOBILE_SUBSCROLL_SECTIONS : DESKTOP_SUBSCROLL_SECTIONS;
};

// Desktop subscroll steps
const DESKTOP_SUBSCROLL_STEPS: Record<number, number> = {
  4: 4, // Slide03 has 4 steps (initial + 3 card reveals)
  5: 3, // FundOrigin has 3 columns to reveal
  6: 3, // RebuildIdentities has 3 columns to reveal
  7: 3, // FundCoherence has 3 columns to reveal
  8: 4, // LifeiDesignAccelerator has 4 steps (initial + 3 card reveals)
  9: 3, // SubscrollSlide1 has 3 columns to reveal
  10: 3, // CoreiDesign has 3 columns to reveal
  11: 3, // PlayiDesign has 3 columns to reveal
  12: 4, // Epicentre has 4 steps (initial + 3 card reveals)
  13: 3, // SilenceTest has 3 columns to reveal
  14: 3, // DisciplineTest has 3 columns to reveal
  15: 3, // DistractionTest has 3 columns to reveal
  16: 3, // LiberationDay has 3 steps (initial + 2 sections with cards)
  17: 3, // FundCrucible has 3 columns to reveal
  18: 3, // FundBlueprint has 3 columns to reveal
  19: 3, // FundAsk has 3 columns to reveal
  20: 3, // FundActivation has 3 steps (initial + 2 sections with cards)
  21: 3, // FundSupport has 3 columns to reveal
  22: 3, // FundEnvironment has 3 columns to reveal
  23: 3, // FundCapital has 3 columns to reveal
};

// Mobile subscroll steps
const MOBILE_SUBSCROLL_STEPS: Record<number, number> = {};

// Get subscroll steps based on mobile/desktop
export const getSubscrollSteps = (isMobile: boolean): Record<number, number> => {
  return isMobile ? MOBILE_SUBSCROLL_STEPS : DESKTOP_SUBSCROLL_STEPS;
};

// Slide words for each section (displayed in header)
export const slideWords = [
  "FUND OFFER         ",  // 0: hero
  "FUND SYSTEM        ",  // 1: content1
  "FUND GATE          ",  // 2: warning
  "FUND ETHOS         ",  // 3: video
  "FUND TRIBES        ",  // 4: slide03
  "FUND ORIGIN        ",  // 5: fundOrigin
  "FUND INTENT        ",  // 6: rebuildIdentities
  "FUND COHERENCE     ",  // 7: fundCoherence
  "FUND ENGINE        ",  // 8: lifeiDesignAccelerator
  "FUND REVELATION    ",  // 9: subscroll1
  "FUND ARCHITECTURE  ",  // 10: coreiDesign
  "FUND DISCIPLINE    ",  // 11: playiDesign
  "FUND DATA          ",  // 12: epicentre
  "FUND TEST          ",  // 13: silenceTest
  "FUND TRUTH         ",  // 14: disciplineTest
  "FUND ELIGIBILITY   ",  // 15: distractionTest
  "FUND RECEIPTS      ",  // 16: liberationDay
  "FUND RITE          ",  // 17: fundCrucible
  "FUND BLUEPRINT     ",  // 18: fundBlueprint
  "FUND ASK           ",  // 19: fundAsk
  "FUND SUPPORT       ",  // 20: fundActivation
  "FUND CAPITAL       ",  // 21: fundSupport
  "FUND LOSS          ",  // 22: fundEnvironment
  "FUND CONTINUUM     "   // 23: fundCapital
];

// Dummy texts for each section (displayed in header)
export const dummyTexts = [
  "Why You're Here",                     // 0: hero
  "How This World Works",                // 1: content1
  "Why You Must Slow Down",              // 2: warning
  "What We Believe",                     // 3: video
  "Players & Patrons",                   // 4: slide03
  "World Funds Products, We Fund Players",  // 5: fundOrigin
  "Reason For Becoming",                    // 6: rebuildIdentities
  "Coherence Over Traction",                // 7: fundCoherence
  "Acceleration & Incubation",           // 8: lifeiDesignAccelerator
  "Know Your GAMEiDESIGN",               // 9: subscroll1
  "Build Your COREiDESIGN",              // 10: coreiDesign
  "Prove Your PLAYiDESIGN",              // 11: playiDesign
  "what patterns expose",                // 12: epicentre
  "what pressure reveals",               // 13: silenceTest
  "what breaks teaches",                 // 14: disciplineTest
  "who actually gets through",           // 15: distractionTest
  "Behavioral Proof",                    // 16: liberationDay
  "The Unveiling",                       // 17: fundCrucible
  "Identity Architecture",               // 18: fundBlueprint
  "The Liberation Number",               // 19: fundAsk
  "Systems That Sustain Becoming",       // 20: fundActivation
  "Deployment of Up to $100k",           // 21: fundSupport
  "The Cost of Becoming",                // 22: fundEnvironment
  "The Identity Economy Loop"            // 23: fundCapital
];

// Export default for backward compatibility (desktop)
export const sections = desktopSections;
export const SUBSCROLL_SECTIONS = DESKTOP_SUBSCROLL_SECTIONS;
export const SUBSCROLL_STEPS = DESKTOP_SUBSCROLL_STEPS;
