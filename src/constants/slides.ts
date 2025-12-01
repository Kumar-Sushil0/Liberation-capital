// Slide configuration for homepage

export interface SlideConfig {
  type: string;
  className: string;
}

// Desktop sections configuration
const desktopSections: SlideConfig[] = [
  {
    type: "hero",
    className: "first"
  },
  {
    type: "content1",
    className: "second"
  },
  {
    type: "subscroll1",
    className: "third"
  },
  {
    type: "content2",
    className: "fourth"
  },
  {
    type: "content3",
    className: "fifth"
  },
  {
    type: "final",
    className: "sixth"
  }
];

// Mobile sections configuration (same for now, can be customized later)
const mobileSections: SlideConfig[] = [...desktopSections];

// Get sections array based on mobile/desktop
export const getSections = (isMobile: boolean): SlideConfig[] => {
  return isMobile ? mobileSections : desktopSections;
};

// Desktop subscroll sections - indices that pause main scroll
const DESKTOP_SUBSCROLL_SECTIONS = [2]; // Slide 3 (index 2) has subscroll

// Mobile subscroll sections
const MOBILE_SUBSCROLL_SECTIONS = [2];

// Get subscroll sections based on mobile/desktop
export const getSubscrollSections = (isMobile: boolean): number[] => {
  return isMobile ? MOBILE_SUBSCROLL_SECTIONS : DESKTOP_SUBSCROLL_SECTIONS;
};

// Desktop subscroll steps
const DESKTOP_SUBSCROLL_STEPS: Record<number, number> = {
  2: 3, // subscroll1: 3 steps (3 columns to reveal)
};

// Mobile subscroll steps
const MOBILE_SUBSCROLL_STEPS: Record<number, number> = {
  2: 3,
};

// Get subscroll steps based on mobile/desktop
export const getSubscrollSteps = (isMobile: boolean): Record<number, number> => {
  return isMobile ? MOBILE_SUBSCROLL_STEPS : DESKTOP_SUBSCROLL_STEPS;
};

// Export default for backward compatibility (desktop)
export const sections = desktopSections;
export const SUBSCROLL_SECTIONS = DESKTOP_SUBSCROLL_SECTIONS;
export const SUBSCROLL_STEPS = DESKTOP_SUBSCROLL_STEPS;
