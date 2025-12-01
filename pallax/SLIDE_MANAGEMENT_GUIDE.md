# Slide Management Guide for Pallax Route

This guide explains how to create new slides and reposition existing slides in the `/pallax` route.

## Table of Contents

1. [Overview](#overview)
2. [Creating a New Slide](#creating-a-new-slide)
3. [Positioning a New Slide](#positioning-a-new-slide)
4. [Repositioning an Existing Slide](#repositioning-an-existing-slide)
5. [Understanding Section Indices](#understanding-section-indices)
6. [Files That Need Updates](#files-that-need-updates)
7. [Common Pitfalls](#common-pitfalls)
8. [Quick Reference Checklist](#quick-reference-checklist)

---

## Overview

The pallax route uses a **section-based slide system** where:
- Each slide is a **section** with a unique index (0-based)
- Sections are defined in `constants.js` (separate arrays for desktop and mobile)
- Each section has a `type` (determines which component renders) and a `className` (for CSS styling)
- Some sections have **subscroll functionality** (internal scrolling before allowing progression)

### Key Concepts

- **Section Index**: The position of a slide in the array (0 = first slide)
- **Subscroll Sections**: Sections that pause main scroll and handle their own internal scrolling
- **Component Section Checks**: Components check `currentSection === X` to know when they're active

---

## Creating a New Slide

### Step 1: Create the Component File

Create a new component file in `components/` directory:

```javascript
// components/SlideXNew.js
"use client";
import React, { useState, useEffect } from 'react';
import styles from '../Pallax.module.css';

const SlideXNew = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Layout
  if (isMobile) {
    return (
      <div className={styles.heroLayoutMobile}>
        <div className={styles.heroContentMobile}>
          <div className={styles.heroTextMobile}>
            {/* Your mobile content here */}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={styles.heroLayout}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          {/* Your desktop content here */}
        </div>
      </div>
    </div>
  );
};

export default SlideXNew;
```

### Step 2: Export the Component

Add to `components/index.js`:

```javascript
export { default as SlideXNew } from './SlideXNew';
```

### Step 3: Add to Sections Array

In `constants.js`, add your slide to both `desktopSections` and `mobileSections` arrays at your desired position:

```javascript
const desktopSections = [
  // ... existing slides ...
  {
    type: "newSlide",  // Unique identifier
    className: "second"  // CSS class name
  },
  // ... rest of slides ...
];
```

### Step 4: Add Render Case

In `page.js`, add a case in the `renderSectionContent` switch statement:

```javascript
case "newSlide":
  return <SlideXNew />;
```

### Step 5: Import the Component

In `page.js`, add to the imports:

```javascript
import { SlideXNew, ... } from './components';
```

---

## Positioning a New Slide

When you add a slide at a specific index, **all subsequent slides shift down by 1**. You must update:

### 1. Subscroll Sections Array

In `constants.js`, update `DESKTOP_SUBSCROLL_SECTIONS` and `MOBILE_SUBSCROLL_SECTIONS`:

**Rule**: If you add a slide at index `N`, all subscroll indices `>= N` must be incremented by 1.

**Example**: Adding a slide at index 1
- Before: `[2, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14, 17]`
- After: `[3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 15, 18]`

### 2. Subscroll Steps Object

In `constants.js`, update `DESKTOP_SUBSCROLL_STEPS` and `MOBILE_SUBSCROLL_STEPS`:

**Rule**: All keys `>= N` must be incremented by 1, and add a new entry if your slide is a subscroll section.

**Example**: Adding a slide at index 1
```javascript
// Before
const DESKTOP_SUBSCROLL_STEPS = {
  2: 1,   // demo
  3: 3,   // features
  // ...
};

// After
const DESKTOP_SUBSCROLL_STEPS = {
  3: 1,   // demo (was 2)
  4: 3,   // features (was 3)
  // ...
};
```

### 3. Component Section Checks

Update all components that check `currentSection === X` where `X >= N`:

**Files to check**:
- `components/ScrollReveal/Slide3.js` through `Slide10.js`
- `components/Carousel/Slide12DesignModes.js`
- `components/Carousel/Slide13DesignModes.js`
- `components/Carousel/GameEcosystem.js`
- `components/Carousel/Slide15GameModes.js`
- `components/Slide16DDIntroduction.js`
- `components/Carousel/Slide18Overlapping.js`
- `page.js` (any hardcoded section checks)

**Search pattern**: Look for `currentSection === X` or `currentSection !== X` where `X >= N`

**Example**: If adding at index 1, update:
- `currentSection === 2` → `currentSection === 3`
- `currentSection === 3` → `currentSection === 4`
- etc.

### 4. SubscrollComplete Event Dispatches

Update all `subscrollComplete` event dispatches in components:

**Search pattern**: Look for `detail: { section: X, step:`

**Example**: If adding at index 1:
- `section: 2` → `section: 3`
- `section: 3` → `section: 4`
- etc.

---

## Repositioning an Existing Slide

When moving a slide from index `A` to index `B`, you need to:

### Step 1: Remove from Old Position

In `constants.js`, remove the slide from its current position in both `desktopSections` and `mobileSections`.

### Step 2: Insert at New Position

Add the slide at the new index in both arrays.

### Step 3: Update All Affected Indices

**Calculate the shift**:
- If moving from higher index to lower (e.g., 18 → 2):
  - Slides between new and old position (2-17) shift **down by 1**
  - Update all indices in range `[newIndex, oldIndex)` by **+1**
  
- If moving from lower index to higher (e.g., 2 → 18):
  - Slides between old and new position (3-18) shift **up by 1**
  - Update all indices in range `(oldIndex, newIndex]` by **-1**

### Step 4: Update Subscroll Sections

**Example**: Moving slide from index 18 to index 2

**Before**: `[3, 4, 5, 6, 8, 9, 10, 12, 13, 14, 15, 18]`

**After**: `[2, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16]`

**Logic**:
- Add the new index (2) if it's a subscroll section
- Remove the old index (18)
- Increment all indices in range `[2, 18)` by 1

### Step 5: Update Subscroll Steps

**Example**: Moving slide from index 18 to index 2

```javascript
// Before
const DESKTOP_SUBSCROLL_STEPS = {
  3: 1,   // demo
  4: 3,   // features
  // ...
  18: 3,  // gameGang2 (being moved)
};

// After
const DESKTOP_SUBSCROLL_STEPS = {
  2: 3,   // gameGang2 (moved here)
  4: 1,   // demo (was 3)
  5: 3,   // features (was 4)
  // ...
  // Remove 18 entry
};
```

### Step 6: Update Component Checks

Update all components that reference the moved slide or affected slides:

1. **The moved slide's component**: Change from old index to new index
2. **All affected slides**: Increment/decrement their checks based on shift direction

**Example**: Moving from 18 to 2
- gameGang2 component: `18` → `2`
- demo (was 3): `3` → `4`
- features (was 4): `4` → `5`
- etc.

### Step 7: Update Event Dispatches

Update `subscrollComplete` event dispatches:
- The moved slide: Update section number
- All affected slides: Increment/decrement section numbers

---

## Understanding Section Indices

### Current Section Layout (Desktop)

```
Index  Type              Component
-----  ----------------  --------------------
0      reviews           Slide1Reviews
1      newSlide          Slide1New
2      gameGang2         Slide18OverlappingCarousel
3      hero              Slide2Hero
4      demo              ScrollRevealSectionSlide3
5      features           ScrollRevealSectionSlide4
6      cta               ScrollRevealSectionSlide5
7      cta2              ScrollRevealSectionSlide6
8      heroFlipped       Slide6HeroFlipped
9      powers            ScrollRevealSectionSlide8
10     gains             ScrollRevealSectionSlide9
11     gameFlow          ScrollRevealSectionSlide10
12     heroFinal         Slide11HeroFinal
13     designModes       Slide12DesignModesCarousel
14     designModesFlipped Slide13DesignModesCarousel
15     gameEcosystem     GameEcosystemCarousel
16     gameModes         Slide15GameModesCarousel
17     ddIntroduction    Slide16DDIntroduction
18     gameGang          Slide17OverlappingCarousel
19     faq               Slide19FAQ
20     gamePass          Slide20GamePass
21     contact           Slide21Contact
```

### Subscroll Sections

These sections pause main scroll and handle internal scrolling:

**Desktop**: `[2, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16]`

- Index 2: gameGang2 (3 steps)
- Index 4: demo (1 step)
- Index 5: features (3 steps)
- Index 6: cta (3 steps)
- Index 7: cta2 (3 steps)
- Index 9: powers (6 steps)
- Index 10: gains (6 steps)
- Index 11: gameFlow (4 steps)
- Index 13: designModes (3 steps per group)
- Index 14: designModesFlipped (3 steps per group)
- Index 15: gameEcosystem (4 steps)
- Index 16: gameModes (5 steps)

---

## Files That Need Updates

When creating or repositioning slides, update these files:

### Always Update

1. **`constants.js`**
   - Add/remove from `desktopSections` array
   - Add/remove from `mobileSections` array
   - Update `DESKTOP_SUBSCROLL_SECTIONS` if needed
   - Update `MOBILE_SUBSCROLL_SECTIONS` if needed
   - Update `DESKTOP_SUBSCROLL_STEPS` if needed
   - Update `MOBILE_SUBSCROLL_STEPS` if needed

2. **`components/index.js`**
   - Add export for new component

3. **`page.js`**
   - Add import for new component
   - Add case in `renderSectionContent` switch
   - Update any hardcoded section index checks

### Conditionally Update (If Affected Indices Change)

4. **`components/ScrollReveal/Slide3.js` through `Slide10.js`**
   - Update `currentSection === X` checks
   - Update `subscrollComplete` event section numbers

5. **`components/Carousel/Slide12DesignModes.js`**
   - Update `currentSection === X` checks
   - Update `subscrollComplete` event section numbers

6. **`components/Carousel/Slide13DesignModes.js`**
   - Update `currentSection === X` checks
   - Update `subscrollComplete` event section numbers

7. **`components/Carousel/GameEcosystem.js`**
   - Update `currentSection === X` checks

8. **`components/Carousel/Slide15GameModes.js`**
   - Update `currentSection === X` checks

9. **`components/Slide16DDIntroduction.js`**
   - Update `currentSection === X` checks

10. **`components/Carousel/Slide18Overlapping.js`**
    - Update `currentSection === X` checks

---

## Common Pitfalls

### ❌ Forgetting to Update Subscroll Sections

**Problem**: Slide works but subscroll doesn't pause/resume correctly.

**Solution**: Always update `DESKTOP_SUBSCROLL_SECTIONS` and `MOBILE_SUBSCROLL_SECTIONS` when indices change.

### ❌ Forgetting to Update Component Checks

**Problem**: Component doesn't activate/reset when entering the slide.

**Solution**: Search for all `currentSection === X` where `X` is affected by your changes.

### ❌ Forgetting to Update Event Dispatches

**Problem**: Progress indicators or other features that listen to `subscrollComplete` events don't work.

**Solution**: Update all `detail: { section: X, step:` references.

### ❌ Incorrect Index Calculation

**Problem**: Off-by-one errors when shifting indices.

**Solution**: 
- When adding at index `N`: Increment all indices `>= N` by 1
- When removing from index `N`: Decrement all indices `> N` by 1
- When moving from `A` to `B`:
  - If `A > B`: Increment indices in `[B, A)` by 1
  - If `A < B`: Decrement indices in `(A, B]` by 1

### ❌ Not Updating Both Desktop and Mobile

**Problem**: Slide works on one platform but not the other.

**Solution**: Always update both `desktopSections` and `mobileSections` arrays.

### ❌ Forgetting to Update className

**Problem**: CSS styling doesn't apply correctly.

**Solution**: Ensure `className` values are unique and match your CSS classes.

---

## Quick Reference Checklist

### Creating a New Slide

- [ ] Create component file in `components/`
- [ ] Export component in `components/index.js`
- [ ] Add to `desktopSections` in `constants.js`
- [ ] Add to `mobileSections` in `constants.js`
- [ ] Add import in `page.js`
- [ ] Add case in `renderSectionContent` switch
- [ ] If subscroll section: Add to subscroll arrays and steps
- [ ] Update all affected component section checks
- [ ] Update all affected event dispatches
- [ ] Test on both desktop and mobile

### Repositioning an Existing Slide

- [ ] Remove from old position in `desktopSections`
- [ ] Remove from old position in `mobileSections`
- [ ] Add to new position in `desktopSections`
- [ ] Add to new position in `mobileSections`
- [ ] Update `DESKTOP_SUBSCROLL_SECTIONS` array
- [ ] Update `MOBILE_SUBSCROLL_SECTIONS` array
- [ ] Update `DESKTOP_SUBSCROLL_STEPS` object
- [ ] Update `MOBILE_SUBSCROLL_STEPS` object
- [ ] Update moved slide's component section check
- [ ] Update all affected components' section checks
- [ ] Update moved slide's event dispatches
- [ ] Update all affected event dispatches
- [ ] Test on both desktop and mobile

### Finding What Needs Updates

Use these grep patterns to find all references:

```bash
# Find component section checks
grep -r "currentSection === [0-9]" components/
grep -r "currentSection !== [0-9]" components/

# Find event dispatches
grep -r "section: [0-9]" components/

# Find subscroll references
grep -r "SUBSCROLL" constants.js
```

---

## Example: Adding a Slide at Index 1

### Before
```javascript
// constants.js
const desktopSections = [
  { type: "reviews", className: "first" },
  { type: "hero", className: "second" },      // Index 1
  { type: "demo", className: "third" },        // Index 2
  // ...
];

const DESKTOP_SUBSCROLL_SECTIONS = [2, 3, 4, ...];
```

### After
```javascript
// constants.js
const desktopSections = [
  { type: "reviews", className: "first" },
  { type: "newSlide", className: "second" },    // Index 1 (NEW)
  { type: "hero", className: "third" },       // Index 2 (was 1)
  { type: "demo", className: "fourth" },       // Index 3 (was 2)
  // ...
];

const DESKTOP_SUBSCROLL_SECTIONS = [3, 4, 5, ...]; // All incremented by 1
```

### Component Updates Required

```javascript
// Slide3.js (demo component)
// Before: if (currentSection === 2)
// After:  if (currentSection === 3)

// Slide4.js (features component)
// Before: if (currentSection === 3)
// After:  if (currentSection === 4)
```

---

## Example: Moving a Slide from Index 18 to Index 2

### Before
```javascript
const desktopSections = [
  { type: "reviews", className: "first" },     // Index 0
  { type: "newSlide", className: "second" },   // Index 1
  { type: "hero", className: "third" },        // Index 2
  // ...
  { type: "gameGang2", className: "twentieth" }, // Index 18
  // ...
];
```

### After
```javascript
const desktopSections = [
  { type: "reviews", className: "first" },     // Index 0
  { type: "newSlide", className: "second" },   // Index 1
  { type: "gameGang2", className: "third" },   // Index 2 (MOVED HERE)
  { type: "hero", className: "fourth" },       // Index 3 (was 2)
  // ...
  // gameGang2 removed from index 18
  // ...
];
```

### Updates Required

1. **Subscroll sections**: `[2, 4, 5, 6, 7, 9, 10, 11, 13, 14, 15, 16]`
   - Added 2 (gameGang2)
   - Removed 18
   - Incremented 2-17 by 1

2. **Component checks**:
   - gameGang2: `18` → `2`
   - hero: `2` → `3`
   - demo: `3` → `4`
   - etc.

---

## Testing Checklist

After making changes, test:

- [ ] Slide appears at correct position
- [ ] Can navigate to/from the slide
- [ ] Subscroll works (if applicable)
- [ ] Progress indicators update correctly
- [ ] Works on desktop viewport
- [ ] Works on mobile viewport
- [ ] No console errors
- [ ] All animations/transitions work
- [ ] No linter errors

---

## Need Help?

If you're unsure about index calculations:

1. **Draw a diagram** of the section array before and after
2. **List all affected indices** explicitly
3. **Update systematically** - one file at a time
4. **Test incrementally** - don't update everything at once
5. **Use grep** to find all references before making changes

Remember: **When in doubt, search the codebase for the section index you're changing!**

