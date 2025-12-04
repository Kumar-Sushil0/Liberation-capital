# God-Tier Subscroll Implementation Guide

## Section Mapping (Homepage)

| Index | Type | Section Name | Steps |
|-------|------|--------------|-------|
| 4 | slide03 | FUND TRIBES | 4 |
| 5 | fundOrigin | FUND ORIGIN | 3 |
| 6 | rebuildIdentities | FUND INTENT | 3 |
| 7 | fundCoherence | FUND COHERENCE | 3 |
| 8 | lifeiDesignAccelerator | FUND ENGINE | 4 |
| 9 | subscroll1 | FUND REVELATION | 3 |
| 10 | coreiDesign | FUND ARCHITECTURE | 3 |
| 11 | playiDesign | FUND DISCIPLINE | 3 |
| 12 | epicentre | FUND DATA | 4 |
| 13 | silenceTest | FUND TEST | 3 |
| 14 | disciplineTest | FUND TRUTH | 3 |
| 15 | distractionTest | FUND ELIGIBILITY | 3 |
| 16 | liberationDay | FUND RECEIPTS | 3 |
| 17 | fundCrucible | FUND RITE | 3 |
| 18 | fundBlueprint | FUND BLUEPRINT | 3 |
| 19 | fundAsk | FUND ASK | 3 |
| 20 | fundActivation | FUND SUPPORT | 3 |
| 21 | fundSupport | FUND CAPITAL | 3 |
| 22 | fundEnvironment | FUND LOSS | 3 |
| 23 | fundCapital | FUND CONTINUUM | 3 |

## Required Changes for Each Subscroll Slide

### 1. Add Triggered Columns State

```typescript
const [triggeredColumns, setTriggeredColumns] = useState(new Set<number>());
```

### 2. Fix Initialize useEffect

Remove `isScrollEnabled` dependency:

```typescript
// BEFORE
useEffect(() => {
  // ...
}, [isScrollEnabled]);

// AFTER
useEffect(() => {
  // ...
}, []);
```

### 3. Add Triggered Columns Reset

```typescript
// Reset to initial state when entering this slide
const prevSectionRef = useRef(currentSection);
useEffect(() => {
  if (!isInitialized) return;

  const prevSection = prevSectionRef.current;
  prevSectionRef.current = currentSection;

  if (currentSection === SECTION_INDEX && prevSection !== SECTION_INDEX && isScrollEnabled) {
    setSkipTransitions(true);
    setVisibleColumns(0);
    setTriggeredColumns(new Set()); // ADD THIS LINE

    const container = containerRef.current;
    if (container) {
      container.scrollTop = 0;
    }

    setTimeout(() => {
      setSkipTransitions(false);
    }, 100);
  }
}, [currentSection, isScrollEnabled, isInitialized]);
```

### 4. Add Animation Trigger Effect

```typescript
// Trigger animations when visibleColumns changes
useEffect(() => {
  if (isInitialized && visibleColumns >= 1) {
    if (visibleColumns >= 1 && !triggeredColumns.has(1)) {
      setTimeout(() => {
        setTriggeredColumns(prev => new Set(prev).add(1));
      }, 200);
    }

    if (visibleColumns >= 2 && !triggeredColumns.has(2)) {
      setTimeout(() => {
        setTriggeredColumns(prev => new Set(prev).add(2));
      }, 400);
    }

    if (visibleColumns >= 3 && !triggeredColumns.has(3)) {
      setTimeout(() => {
        setTriggeredColumns(prev => new Set(prev).add(3));
      }, 600);
    }

    // Add more if needed for 4+ step slides
    if (visibleColumns >= 4 && !triggeredColumns.has(4)) {
      setTimeout(() => {
        setTriggeredColumns(prev => new Set(prev).add(4));
      }, 800);
    }
  }
}, [visibleColumns, isInitialized, triggeredColumns]);
```

### 5. Update Scroll Positions (3-step slides)

```typescript
const scrollPositions = [
  0,
  maxScroll * 0.2,
  maxScroll * 0.45,
  maxScroll * 0.7,
  maxScroll
];
```

### 6. Update Scroll Positions (4-step slides)

```typescript
const scrollPositions = [
  0,
  maxScroll * 0.15,
  maxScroll * 0.35,
  maxScroll * 0.55,
  maxScroll * 0.75,
  maxScroll
];
```

### 7. Add Event Dispatching (Skip Animation Path)

```typescript
if (skipAnimation || step === 0) {
  setSkipTransitions(true);
  container.scrollTop = targetScroll;
  setVisibleColumns(step);
  currentStep = step;
  isScrollingRef.current = false;
  
  setTimeout(() => {
    isProcessingScroll = false;
  }, 100);

  setTimeout(() => {
    setSkipTransitions(false);
  }, 50);

  // ADD EVENT DISPATCHING
  if (step === 1) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 1 } 
    }));
  }
  
  if (step === 2) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 2 } 
    }));
  }
  
  if (step === 3) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 3 } 
    }));
    if (onAllColumnsVisible) {
      onAllColumnsVisible();
    }
  }

  // For 4-step slides, add:
  if (step === 4) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 4 } 
    }));
    if (onAllColumnsVisible) {
      onAllColumnsVisible();
    }
  }

  return;
}
```

### 8. Add Event Dispatching (Animation Path)

```typescript
if (progress < 1) {
  requestAnimationFrame(animateScroll);
} else {
  isScrollingRef.current = false;
  setVisibleColumns(step);
  currentStep = step;
  
  setTimeout(() => {
    isProcessingScroll = false;
  }, 100);

  // ADD EVENT DISPATCHING
  if (step === 1) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 1 } 
    }));
  }
  
  if (step === 2) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 2 } 
    }));
  }
  
  if (step === 3) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 3 } 
    }));
    if (onAllColumnsVisible) {
      onAllColumnsVisible();
    }
  }

  // For 4-step slides, add:
  if (step === 4) {
    window.dispatchEvent(new CustomEvent('subscrollComplete', { 
      detail: { section: SECTION_INDEX, step: 4 } 
    }));
    if (onAllColumnsVisible) {
      onAllColumnsVisible();
    }
  }

  // ADD AUTO-ADVANCE LOGIC
  if (step >= FINAL_STEP + 1 && currentSection === SECTION_INDEX) {
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).gotoNextSlide && currentSection === SECTION_INDEX) {
        (window as any).gotoNextSlide();
      }
    }, 300);
  }
}
```

### 9. Update Max Step in handleWheel

```typescript
// For 3-step slides
const nextStep = Math.min(currentStep + 1, 4); // 0, 1, 2, 3, 4 (extra step triggers auto-advance)

// For 4-step slides
const nextStep = Math.min(currentStep + 1, 5); // 0, 1, 2, 3, 4, 5 (extra step triggers auto-advance)
```

## Complete Implementation Checklist

For each subscroll slide:

- [ ] Add `triggeredColumns` state
- [ ] Remove `isScrollEnabled` from init useEffect dependency
- [ ] Add `setTriggeredColumns(new Set())` to section entry reset
- [ ] Add animation trigger useEffect
- [ ] Update scroll positions array
- [ ] Add event dispatching in skip animation path
- [ ] Add event dispatching in animation path
- [ ] Add auto-advance logic after final step
- [ ] Update max step in handleWheel
- [ ] Verify section index matches constants

## Testing Each Slide

1. Enter slide - should start at step 0
2. Scroll down - should advance through steps smoothly
3. Reach final step - should auto-advance to next slide
4. Scroll back from next slide - should return to this slide at step 0
5. Animations should not re-trigger when returning
6. Events should dispatch at each step
7. Mobile should disable subscroll (if applicable)

## Status

✅ SubscrollSlide1 (Section 9) - COMPLETED
✅ Slide03 (Section 4) - COMPLETED
✅ FundOrigin (Section 5) - COMPLETED
✅ RebuildIdentities (Section 6) - COMPLETED
✅ FundCoherence (Section 7) - COMPLETED
✅ LifeiDesignAccelerator (Section 8) - COMPLETED
✅ CoreiDesign (Section 10) - COMPLETED
✅ PlayiDesign (Section 11) - COMPLETED
✅ Epicentre (Section 12) - COMPLETED
✅ SilenceTest (Section 13) - COMPLETED
✅ DisciplineTest (Section 14) - COMPLETED
✅ DistractionTest (Section 15) - COMPLETED
✅ LiberationDay (Section 16) - COMPLETED
✅ FundCrucible (Section 17) - COMPLETED
✅ FundBlueprint (Section 18) - COMPLETED
⏳ FundAsk (Section 19) - PENDING
⏳ FundActivation (Section 20) - PENDING
⏳ FundSupport (Section 21) - PENDING
⏳ FundEnvironment (Section 22) - PENDING
⏳ FundCapital (Section 23) - PENDING
