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
  { type: "fundOrigin", className: "slideFundOrigin" },
  { type: "rebuildIdentities", className: "slideRebuildIdentities" },
  { type: "fundCoherence", className: "slideFundCoherence" },
  { type: "slide03", className: "slide03" },
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
  { type: "fundCapital", className: "slideFundCapital" },
  { type: "fundSpiral", className: "slideFundSpiral" },
  { type: "fundBecoming", className: "slideFundBecoming" },
  { type: "fundEvidence", className: "slideFundEvidence" },
  { type: "fundContinuum", className: "slideFundContinuum" },
  { type: "slide04", className: "slide04" },
  { type: "slide05", className: "slide05" },
  { type: "slide08", className: "slide08" },
  { type: "slide12", className: "slide12" },
  { type: "slide18", className: "slide18" },
  { type: "slide19", className: "slide19" },
  { type: "slide20", className: "slide20" },
  { type: "slide23", className: "slide23" },
  { type: "slide26", className: "slide26" },
  { type: "poem", className: "slidePoem" },
  { type: "operatingSystem", className: "slideOperatingSystem" }
];

// Mobile sections configuration (same for now, can be customized later)
const mobileSections: SlideConfig[] = [...desktopSections];

// Get sections array based on mobile/desktop
export const getSections = (isMobile: boolean): SlideConfig[] => {
  return isMobile ? mobileSections : desktopSections;
};

// Desktop subscroll sections - indices that pause main scroll
const DESKTOP_SUBSCROLL_SECTIONS: number[] = [6, 8, 27, 28, 29, 30, 37, 38, 39, 40]; // Slide 6 (Slide03), Slide 8 (SubscrollSlide1), Slide 27 (Slide04), Slide 28 (Slide05), Slide 29 (Slide08), Slide 30 (Slide12), Slide 37 (Slide19), Slide 38 (Slide20), Slide 39 (Slide23), and Slide 40 (Slide26) have subscroll

// Mobile subscroll sections
const MOBILE_SUBSCROLL_SECTIONS: number[] = [];

// Get subscroll sections based on mobile/desktop
export const getSubscrollSections = (isMobile: boolean): number[] => {
  return isMobile ? MOBILE_SUBSCROLL_SECTIONS : DESKTOP_SUBSCROLL_SECTIONS;
};

// Desktop subscroll steps
const DESKTOP_SUBSCROLL_STEPS: Record<number, number> = {
  6: 4, // Slide03 has 4 steps (initial + 3 card reveals)
  8: 3, // SubscrollSlide1 has 3 columns to reveal
  27: 4, // Slide04 has 4 steps (initial + 3 card reveals)
  28: 3, // Slide05 has 3 columns to reveal
  29: 3, // Slide08 has 3 columns to reveal
  30: 4, // Slide12 has 4 steps (initial + 3 card reveals)
  37: 3, // Slide19 has 3 columns to reveal
  38: 3, // Slide20 has 3 columns to reveal
  39: 3, // Slide23 has 3 columns to reveal
  40: 3, // Slide26 has 3 columns to reveal
};

// Mobile subscroll steps
const MOBILE_SUBSCROLL_STEPS: Record<number, number> = {};

// Get subscroll steps based on mobile/desktop
export const getSubscrollSteps = (isMobile: boolean): Record<number, number> => {
  return isMobile ? MOBILE_SUBSCROLL_STEPS : DESKTOP_SUBSCROLL_STEPS;
};

// Slide words for each section (displayed in header)
export const slideWords = [
  "LIBERATION",
  "CAPITAL",
  "WARNING",
  "ORIGIN",
  "REBUILD",
  "COHERENCE",
  "PILLARS",
  "TRIBES",
  "ENGINE",
  "EMOTION",
  "DISCIPLINE",
  "CRUCIBLE",
  "STILLNESS",
  "INTEGRITY",
  "WITHDRAWAL",
  "RITE",
  "REVEAL",
  "DESIGN",
  "ARCHITECT",
  "WITNESS",
  "DEPLOY",
  "EVOLVE",
  "TRANSFORM",
  "ASCEND",
  "MANIFEST",
  "INTEGRATE",
  "ACTIVATE",
  "EMBODY",
  "REALIZE",
  "ILLUMINATE",
  "TRANSCEND",
  "LIBERATE",
  "EMERGE",
  "BECOME",
  "IDENTITY",
  "PLAYERS",
  "PATRONS",
  "SUMMARY"
];

// Dummy texts for each section (displayed in header)
export const dummyTexts = [
  "Want a new life?",
  "Fund humans, not startups",
  "Ready to think?",
  "Where the game begins",
  "We fund becoming",
  "Identity is biometric",
  "Design. Discipline. Coherence.",
  "Players and Patrons",
  "Architect your identity",
  "Emotional operating system",
  "Daily coherence proof",
  "Monastic pressure test",
  "Clarity through silence",
  "Behavior without applause",
  "Identity vs impulses",
  "Ceremony over pitch",
  "Truth exposed",
  "Architecture begins",
  "Blueprint creation",
  "Evolution unveiled",
  "Capital ignited",
  "Continuous growth",
  "Metamorphosis",
  "Rising higher",
  "Dreams realized",
  "Systems aligned",
  "Power unleashed",
  "Living truth",
  "Vision actualized",
  "Light within",
  "Beyond limits",
  "Freedom achieved",
  "New beginning",
  "Complete transformation",
  "Identity capital",
  "For redesigning humans",
  "For investors done with hype",
  "Positioning summary"
];

// Export default for backward compatibility (desktop)
export const sections = desktopSections;
export const SUBSCROLL_SECTIONS = DESKTOP_SUBSCROLL_SECTIONS;
export const SUBSCROLL_STEPS = DESKTOP_SUBSCROLL_STEPS;
