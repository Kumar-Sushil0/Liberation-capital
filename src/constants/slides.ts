// Slide configuration for homepage

export interface SlideConfig {
  type: string;
  className: string;
}

// Desktop sections configuration (24 slides total)
const desktopSections: SlideConfig[] = [
  { type: "hero", className: "slide00" },
  { type: "content1", className: "slide01" },
  { type: "subscroll1", className: "slide02" },
  { type: "slide03", className: "slide03" },
  { type: "slide04", className: "slide04" },
  { type: "slide05", className: "slide05" },
  { type: "slide06", className: "slide06" },
  { type: "slide07", className: "slide07" },
  { type: "slide08", className: "slide08" },
  { type: "slide09", className: "slide09" },
  { type: "slide10", className: "slide10" },
  { type: "slide11", className: "slide11" },
  { type: "slide12", className: "slide12" },
  { type: "slide13", className: "slide13" },
  { type: "slide14", className: "slide14" },
  { type: "slide15", className: "slide15" },
  { type: "slide16", className: "slide16" },
  { type: "slide17", className: "slide17" },
  { type: "slide18", className: "slide18" },
  { type: "slide19", className: "slide19" },
  { type: "slide20", className: "slide20" },
  { type: "slide21", className: "slide21" },
  { type: "slide22", className: "slide22" },
  { type: "slide23", className: "slide23" },
  { type: "slide24", className: "slide24" },
  { type: "slide25", className: "slide25" },
  { type: "slide26", className: "slide26" },
  { type: "slide27", className: "slide27" }
];

// Mobile sections configuration (same for now, can be customized later)
const mobileSections: SlideConfig[] = [...desktopSections];

// Get sections array based on mobile/desktop
export const getSections = (isMobile: boolean): SlideConfig[] => {
  return isMobile ? mobileSections : desktopSections;
};

// Desktop subscroll sections - indices that pause main scroll
const DESKTOP_SUBSCROLL_SECTIONS: number[] = []; // No subscroll sections

// Mobile subscroll sections
const MOBILE_SUBSCROLL_SECTIONS: number[] = [];

// Get subscroll sections based on mobile/desktop
export const getSubscrollSections = (isMobile: boolean): number[] => {
  return isMobile ? MOBILE_SUBSCROLL_SECTIONS : DESKTOP_SUBSCROLL_SECTIONS;
};

// Desktop subscroll steps
const DESKTOP_SUBSCROLL_STEPS: Record<number, number> = {};

// Mobile subscroll steps
const MOBILE_SUBSCROLL_STEPS: Record<number, number> = {};

// Get subscroll steps based on mobile/desktop
export const getSubscrollSteps = (isMobile: boolean): Record<number, number> => {
  return isMobile ? MOBILE_SUBSCROLL_STEPS : DESKTOP_SUBSCROLL_STEPS;
};

// Slide words for each section (displayed in header) - 24 slides
export const slideWords = [
  "LIBERATION",
  "CAPITAL",
  "PILLARS",
  "TRIBES",
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

// Dummy texts for each section (displayed in header) - 24 slides
export const dummyTexts = [
  "Want a new life?",
  "Fund humans, not startups",
  "Design. Discipline. Coherence.",
  "Players and Patrons",
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
