# Pallax Scroll System Analysis

## Overview

The pallax directory implements a sophisticated slide-based scrolling system with two key features:
1. **Main Scroll**: GSAP-powered transitions between full-screen slides
2. **Subscroll**: Internal scrolling within specific slides that pauses main navigation

---

## Architecture Components

### 1. Main Page Component (`pallax/page.js`)

**Key Responsibilities:**
- Manages all refs for sections, wrappers, images, and state
- Renders slides based on configuration
- Integrates the scroll manager hook
- Handles mobile/desktop detection
- Provides navigation functions to child components

**Important Refs:**
```javascript
sectionsRef        // Array of section DOM elements
outerWrappersRef   // Outer animation wrappers
innerWrappersRef   // Inner animation wrappers
imagesRef          // Background/content containers
currentIndexRef    // Current slide index
animatingRef       // Animation in progress flag
isScrollPausedRef  // Subscroll active flag
gotoSectionRef     // Navigation function reference
```

---

### 2. Configuration (`pallax/constants.js`)

**Sections Array:**
```javascript
const desktopSections = [
  {
    type: "hero",        // Component identifier
    className: "first"   // CSS class for styling
  },
  // ... more slides
];
```

**Subscroll Configuration:**
```javascript
// Which slides have subscroll
const DESKTOP_SUBSCROLL_SECTIONS = [2, 3, 4, 5, ...];

// How many steps each subscroll slide has
const DESKTOP_SUBSCROLL_STEPS = {
  2: 3,   // hero: 3 steps
  4: 1,   // demo: 1 step
  5: 3,   // features: 3 steps
  // ...
};
```

**Key Features:**
- Separate configurations for desktop and mobile
- Mobile can have different slide order and subscroll behavior
- Helper functions: `getSections()`, `getSubscrollSections()`, `getSubscrollSteps()`

---

### 3. Scroll Manager Hook (`pallax/hooks/useScrollManager.js`)

**Core Functionality:**

#### A. Initialization
```javascript
// Set all sections hidden initially
gsap.set(sections, { autoAlpha: 0 });

// Position wrappers for slide-in animation
gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

// Show first section
gsap.set(sections[0], { autoAlpha: 1, zIndex: 1 });
gsap.set([outerWrappers[0], innerWrappers[0]], { yPercent: 0 });
```

#### B. Main Navigation (`gotoSection` function)
```javascript
const gotoSection = (index, direction) => {
  // Prevent invalid navigation
  if (index < 0 || index >= sections.length) return;
  
  // Set animating flag
  animating = true;
  
  // Determine direction factor
  const dFactor = direction === -1 ? -1 : 1;
  
  // Create GSAP timeline
  const tl = gsap.timeline({
    defaults: { duration: 0.8, ease: "power2.inOut" },
    onComplete: () => { animating = false; }
  });
  
  // Animate out current section
  tl.to(images[currentIndex], { yPercent: -15 * dFactor })
    .set(sections[currentIndex], { autoAlpha: 0 });
  
  // Animate in new section
  tl.fromTo([outerWrappers[index], innerWrappers[index]], {
    yPercent: i => i ? -100 * dFactor : 100 * dFactor
  }, {
    yPercent: 0
  }, 0)
  .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
  
  // Check if entering subscroll section
  if (SUBSCROLL_SECTIONS.includes(index) && direction === 1) {
    isScrollPausedRef.current = true;  // Pause main scroll
  } else {
    isScrollPausedRef.current = false; // Enable main scroll
  }
  
  setCurrentSection(index);
};
```

#### C. Wheel Event Handling
```javascript
let wheelDelta = 0;
let wheelTimer = null;

const handleWheel = (e) => {
  // If subscroll is active, allow native scrolling
  if (isScrollPausedRef.current) return;
  
  e.preventDefault();
  
  if (animating) return;
  
  // Accumulate wheel delta
  wheelDelta += e.deltaY;
  
  // Clear existing timer
  if (wheelTimer) clearTimeout(wheelTimer);
  
  // Wait for wheel events to settle
  wheelTimer = setTimeout(() => {
    if (Math.abs(wheelDelta) > 50) { // Threshold
      if (wheelDelta > 0) {
        gotoSection(currentIndex + 1, 1);  // Next
      } else {
        gotoSection(currentIndex - 1, -1); // Previous
      }
    }
    wheelDelta = 0;
  }, 10);
};
```

#### D. Touch Event Handling
```javascript
let touchStartY = 0;
let touchEndY = 0;

const handleTouchStart = (e) => {
  // Ignore interactive elements
  const isInteractive = e.target.closest('button, video, input, ...');
  if (isInteractive) {
    touchStartY = null;
    return;
  }
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e) => {
  if (touchStartY === null) return;
  if (isScrollPausedRef.current) return; // Allow native scroll
  
  const deltaY = touchStartY - touchEndY;
  
  // Minimum swipe distance: 50px
  if (Math.abs(deltaY) > 50) {
    if (deltaY > 0) {
      gotoSection(currentIndex + 1, 1);  // Swipe up = next
    } else {
      gotoSection(currentIndex - 1, -1); // Swipe down = previous
    }
  }
};
```

#### E. Global Functions
```javascript
// Exposed for subscroll components to call
window.gotoNextSlide = () => {
  if (!animating && SUBSCROLL_SECTIONS.includes(currentIndex)) {
    if (currentIndex < sections.length - 1) {
      gotoSection(currentIndex + 1, 1);
    }
  }
};

window.gotoPrevSlide = () => {
  if (!animating && SUBSCROLL_SECTIONS.includes(currentIndex)) {
    if (currentIndex > 0) {
      gotoSection(currentIndex - 1, -1);
    }
  }
};
```

---

### 4. Subscroll Components (e.g., `ScrollRevealSectionSlide4.js`)

**Key Concepts:**

#### A. Container Structure
```javascript
<div ref={containerRef} className={styles.scrollRevealContainer}
     style={{ height: '100vh', overflowY: 'auto' }}>
  <div style={{ height: '200vh' }}> {/* Scroll area */}
    <div className={styles.scrollRevealMasterContainer}
         style={{ position: 'sticky', top: 0 }}> {/* Sticky content */}
      {/* Content that reveals progressively */}
    </div>
  </div>
</div>
```

**How it works:**
- Outer container: `100vh` height with `overflow-y: auto`
- Inner container: `200vh` height (creates scrollable area)
- Content container: `position: sticky, top: 0` (stays in view while scrolling)
- Content reveals based on scroll position

#### B. State Management
```javascript
const [visibleColumns, setVisibleColumns] = useState(0);
const [skipTransitions, setSkipTransitions] = useState(true);
const [isInitialized, setIsInitialized] = useState(false);
```

#### C. Wheel Event Handling (Internal)
```javascript
let wheelDelta = 0;
let wheelTimer = null;
let currentStep = 0;

const handleWheel = (e) => {
  e.preventDefault();
  
  wheelDelta += e.deltaY;
  
  if (wheelTimer) clearTimeout(wheelTimer);
  
  wheelTimer = setTimeout(() => {
    if (Math.abs(wheelDelta) > 40) {
      if (wheelDelta > 0) {
        // Scroll down - next step
        const nextStep = Math.min(currentStep + 1, maxSteps);
        smoothScrollToStep(nextStep);
      } else {
        // Scroll up
        if (currentStep === 0) {
          // At beginning - go to previous slide
          window.gotoPrevSlide();
        } else {
          // Go to previous step
          const prevStep = Math.max(currentStep - 1, 0);
          smoothScrollToStep(prevStep);
        }
      }
    }
    wheelDelta = 0;
  }, 10);
};
```

#### D. Smooth Scroll Animation
```javascript
const smoothScrollToStep = (step) => {
  const scrollHeight = container.scrollHeight;
  const containerHeight = container.clientHeight;
  const maxScroll = scrollHeight - containerHeight;
  
  // Define scroll positions for each step
  const scrollPositions = [
    0,
    maxScroll * 0.2,
    maxScroll * 0.45,
    maxScroll * 0.7,
    maxScroll
  ];
  
  const targetScroll = scrollPositions[step];
  
  // Animate scroll position
  const startScroll = container.scrollTop;
  const distance = targetScroll - startScroll;
  const duration = 500;
  
  // Custom easing animation
  const animateScroll = (currentTime) => {
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = /* cubic easing */;
    container.scrollTop = startScroll + (distance * easeProgress);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      // Update visible columns
      setVisibleColumns(step);
      currentStep = step;
      
      // Dispatch event for progress tracking
      window.dispatchEvent(new CustomEvent('subscrollComplete', { 
        detail: { section: 5, step: step } 
      }));
      
      // If at last step, re-enable main scroll
      if (step === maxSteps) {
        onAllColumnsVisible(); // Calls isScrollPausedRef.current = false
      }
      
      // If scrolled past last step, go to next slide
      if (step > maxSteps) {
        window.gotoNextSlide();
      }
    }
  };
  
  requestAnimationFrame(animateScroll);
};
```

#### E. Content Reveal
```javascript
<div
  className={styles.gridColumn}
  style={{
    opacity: visibleColumns >= 1 ? 1 : 0,
    transform: visibleColumns >= 1 ? 'translateX(0)' : 'translateX(100px)',
    transition: skipTransitions ? 'none' : 'all 0.4s ease'
  }}
>
  {/* Column content */}
</div>
```

#### F. Reset on Section Enter
```javascript
useEffect(() => {
  if (currentSection === 5 && prevSection !== 5) {
    // Reset to initial state
    setVisibleColumns(0);
    container.scrollTop = 0;
  }
}, [currentSection]);
```

---

## Key Patterns & Best Practices

### 1. Scroll Pause Mechanism
```javascript
// In useScrollManager:
if (SUBSCROLL_SECTIONS.includes(index) && direction === 1) {
  isScrollPausedRef.current = true;  // Pause main scroll
}

// In handleWheel:
if (isScrollPausedRef.current) {
  return; // Let browser handle native scroll
}
```

### 2. Callback Pattern
```javascript
// Subscroll component calls this when done:
onAllColumnsVisible={() => {
  setTimeout(() => {
    isScrollPausedRef.current = false; // Re-enable main scroll
  }, 500);
}}
```

### 3. Event Communication
```javascript
// Subscroll components dispatch events:
window.dispatchEvent(new CustomEvent('subscrollComplete', { 
  detail: { section: 5, step: 2 } 
}));

// Progress indicators listen:
useEffect(() => {
  const handleSubscrollComplete = (e) => {
    // Update progress UI
  };
  window.addEventListener('subscrollComplete', handleSubscrollComplete);
  return () => window.removeEventListener('subscrollComplete', handleSubscrollComplete);
}, []);
```

### 4. Mobile Considerations
```javascript
// Separate configurations
const sections = getSections(isMobile);
const SUBSCROLL_SECTIONS = getSubscrollSections(isMobile);

// Mobile often uses simpler layouts
if (isMobile) {
  return <SimpleMobileLayout />;
}
return <ComplexDesktopLayout />;
```

### 5. Transition Skip Pattern
```javascript
// Prevent flash on mount
const [skipTransitions, setSkipTransitions] = useState(true);

useEffect(() => {
  setSkipTransitions(true);
  // ... state changes ...
  setTimeout(() => {
    setSkipTransitions(false);
  }, 50);
}, [dependency]);

// In styles:
style={{
  transition: skipTransitions ? 'none' : 'all 0.4s ease'
}}
```

---

## Implementation Checklist for Homepage

### Phase 1: Setup
- [ ] Install GSAP: `npm install gsap`
- [ ] Create `src/constants/slides.js` for configuration
- [ ] Create `src/hooks/useScrollManager.js` hook
- [ ] Create `src/styles/slides.module.css` for styling

### Phase 2: Basic Slides
- [ ] Create 6 dummy slide components
- [ ] Configure sections array in constants
- [ ] Implement main page component with refs
- [ ] Integrate useScrollManager hook
- [ ] Test basic navigation (wheel + touch)

### Phase 3: Subscroll
- [ ] Mark slide 3 as subscroll in constants
- [ ] Create ScrollReveal component for slide 3
- [ ] Implement internal wheel handling
- [ ] Test subscroll pause/resume
- [ ] Add progress indicators

### Phase 4: Polish
- [ ] Add FloatingArrow component
- [ ] Add ProgressIndicator component
- [ ] Test mobile responsiveness
- [ ] Add loading state
- [ ] Test all transitions

---

## Common Pitfalls to Avoid

1. **Forgetting to update subscroll indices** when adding/removing slides
2. **Not preventing default** on wheel events (causes page scroll)
3. **Not checking `isScrollPausedRef`** before handling wheel events
4. **Forgetting to reset state** when entering a slide
5. **Not handling mobile separately** (different touch behavior)
6. **Hardcoding section indices** in components (use currentSection prop)
7. **Not cleaning up event listeners** in useEffect returns
8. **Forgetting `passive: false`** on wheel events that call preventDefault

---

## Performance Tips

1. Use `autoAlpha` instead of `opacity` (GSAP optimization)
2. Use `yPercent` instead of `y` (percentage-based, responsive)
3. Debounce wheel events with delta accumulation
4. Use `requestAnimationFrame` for smooth animations
5. Set `skipTransitions` during state resets
6. Use refs for values that don't need re-renders
7. Memoize expensive calculations
8. Lazy load images/videos for non-visible slides

---

## Testing Strategy

1. **Desktop Navigation:**
   - Wheel up/down between slides
   - Subscroll wheel handling
   - Keyboard navigation (if implemented)

2. **Mobile Navigation:**
   - Swipe up/down between slides
   - Touch on interactive elements
   - Pull-to-refresh prevention

3. **Edge Cases:**
   - First slide (can't go previous)
   - Last slide (can't go next)
   - Rapid scrolling
   - Subscroll at boundaries
   - Window resize
   - Mobile orientation change

4. **Performance:**
   - Smooth 60fps animations
   - No jank during transitions
   - Memory leaks (check cleanup)
   - Mobile performance

---

## Summary

The pallax scroll system is a well-architected solution that:

1. **Separates concerns**: Configuration, logic, and presentation
2. **Uses GSAP effectively**: Smooth, performant animations
3. **Handles complexity**: Main scroll + subscroll coordination
4. **Mobile-first**: Separate configs and touch handling
5. **Extensible**: Easy to add new slides and features
6. **Robust**: Proper cleanup, edge case handling, and state management

The key innovation is the **subscroll pause mechanism** that seamlessly transitions between GSAP-controlled navigation and native browser scrolling within specific slides.
