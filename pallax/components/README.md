# Pallax Components

This directory contains refactored slide components for the `/pallax` route to improve code maintainability and organization.

## Components

### Slide1Reviews
- **Purpose**: First slide of the parallax experience
- **Content**: Video player placeholder with play button and Life i Design logo
- **Layout**: Hero layout with image on left, content on right

### Slide2Hero  
- **Purpose**: Second slide with main value proposition
- **Content**: Hero text content describing the Life i Design game concept
- **Layout**: Hero layout with content on left, image on right

### Slide3Demo
- **Purpose**: Third slide with interactive video carousel
- **Content**: Video testimonials carousel with navigation controls
- **Layout**: Hero layout with video carousel and custom controls
- **Props**: Requires video state management props from parent component

### Slide6HeroFlipped
- **Purpose**: Sixth slide with flipped hero layout and experimental philosophy
- **Content**: Game philosophy content about experimentation and discovery
- **Layout**: Hero layout with image on left, content on right

### Slide11HeroFinal
- **Purpose**: Eleventh slide with final hero message and closing thoughts
- **Content**: Concluding message about embodiment and possibility
- **Layout**: Hero layout with content on left, image on right

### Slide16DDIntroduction
- **Purpose**: Sixteenth slide introducing DD (the creator)
- **Content**: Personal introduction with stats and social links
- **Layout**: Custom layout with header, stats grid, and social section

### Slide19FAQ
- **Purpose**: Nineteenth slide with frequently asked questions
- **Content**: Expandable FAQ items about the MAYA universe
- **Layout**: Grid layout with interactive accordion-style questions
- **Props**: Requires FAQ state management props from parent component

## Usage

```javascript
import { 
  Slide1Reviews, 
  Slide2Hero, 
  Slide3Demo, 
  Slide6HeroFlipped, 
  Slide11HeroFinal,
  Slide16DDIntroduction,
  Slide19FAQ
} from './components';

// In renderSectionContent function:
case "reviews":
  return <Slide1Reviews />;

case "hero":
  return <Slide2Hero />;

case "demo":
  return (
    <Slide3Demo
      currentVideoIndex={currentVideoIndex}
      setCurrentVideoIndex={setCurrentVideoIndex}
      videoStates={videoStates}
      setVideoStates={setVideoStates}
      videoRefs={videoRefs}
      togglePlayPause={togglePlayPause}
      updateProgress={updateProgress}
      updateDuration={updateDuration}
      seekVideo={seekVideo}
    />
  );

case "heroFlipped":
  return <Slide6HeroFlipped />;

case "heroFinal":
  return <Slide11HeroFinal />;

case "ddIntroduction":
  return <Slide16DDIntroduction />;

case "faq":
  return (
    <Slide19FAQ
      expandedFAQ={expandedFAQ}
      toggleFAQ={toggleFAQ}
    />
  );
```

## Benefits of Refactoring

1. **Improved Maintainability**: Each slide is now a separate, focused component
2. **Better Code Organization**: Reduces the size of the main page.js file
3. **Reusability**: Components can be easily reused or modified independently
4. **Easier Testing**: Individual components can be tested in isolation
5. **Better Developer Experience**: Cleaner imports and smaller files to work with

## Future Refactoring

Consider extracting more slides into components:
- Slide3Demo (demo section with video carousel)
- Slide4Features (features with scroll reveal)
- Slide5CTA (call-to-action sections)
- And other complex slides...

## File Structure

```
components/
├── README.md
├── index.js                # Barrel exports
├── Slide1Reviews.js        # Reviews slide component
├── Slide2Hero.js           # Hero slide component
├── Slide3Demo.js           # Demo slide component with video carousel
├── Slide6HeroFlipped.js    # Hero flipped slide component
├── Slide11HeroFinal.js     # Hero final slide component
├── Slide16DDIntroduction.js # DD introduction slide component
└── Slide19FAQ.js           # FAQ slide component
```
