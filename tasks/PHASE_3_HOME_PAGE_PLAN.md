# Phase 3: Home Page Redesign Implementation Plan

**Goal:** Create a stunning landing page with hero section, feature cards, and smooth animations.

**Estimated Time:** 3-4 hours

---

## Overview

Phase 3 transforms the home page:
1. Create hero section with gradient heading text
2. Build feature cards showcasing app capabilities
3. Add call-to-action buttons with animations
4. Implement smooth scroll and fade-in animations
5. Apply responsive design for all screen sizes

**Design Reference:** `hero_light_theme.png`, `full_layout_light.png` mockups

---

## Proposed Changes

### Modified Files

#### [MODIFY] [Home.tsx](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/components/Home.tsx)

**Current State:** Basic placeholder content

**New Structure:**
```tsx
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.h1 
          className="hero-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          WorldMap Application
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Learn Chinese with Interactive Flashcards
        </motion.p>
        
        {/* CTA Buttons */}
        <div className="hero-cta">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="features-section">
        <FeatureCard 
          title="Flashcard Learning"
          description="Master Chinese vocabulary with interactive flashcards"
          icon="📚"
        />
        <FeatureCard 
          title="Vocabulary Management"
          description="Organize and track your learning progress"
          icon="📝"
        />
        <FeatureCard 
          title="Progress Tracking"
          description="Monitor your improvement over time"
          icon="📊"
        />
      </section>
    </div>
  );
}
```

**Key Changes:**
- Add hero section with gradient text
- Add subtitle text
- Add CTA buttons
- Add feature cards grid
- Add Framer Motion animations

---

#### [NEW] [Home.css](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/components/Home.css)

**Purpose:** Styles for home page using design system variables.

**Key Styles:**
```css
/* Home Page Container */
.home-page {
  min-height: calc(100vh - 80px);
  padding: var(--space-8) var(--space-4);
  background: var(--bg-primary);
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: var(--space-16) 0;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: var(--text-5xl); /* 48px */
  font-weight: var(--font-bold);
  font-family: var(--font-heading);
  margin-bottom: var(--space-4);
  line-height: var(--leading-tight);
}

.hero-subtitle {
  font-size: var(--text-xl); /* 20px */
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

/* CTA Buttons */
.hero-cta {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  margin-top: var(--space-8);
}

.btn-primary {
  padding: var(--space-3) var(--space-8);
  background: var(--accent-gradient);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-in-out);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  padding: var(--space-3) var(--space-8);
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--text-tertiary);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--duration-normal) var(--ease-in-out);
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

/* Features Section */
.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  max-width: 1200px;
  margin: var(--space-16) auto;
  padding: 0 var(--space-4);
}

/* Feature Card */
.feature-card {
  background: var(--bg-secondary);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-normal) var(--ease-in-out);
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.feature-icon {
  font-size: var(--text-5xl);
  margin-bottom: var(--space-4);
}

.feature-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-3);
  color: var(--text-primary);
}

.feature-description {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: var(--text-4xl);
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}
```

---

### New Components

#### [NEW] [FeatureCard.tsx](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/components/FeatureCard.tsx)

**Purpose:** Reusable feature card component.

**Component Structure:**
```tsx
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay = 0
}) => {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  );
};
```

---

## Implementation Steps

### Step 1: View Current Home Component
- Check existing Home.tsx structure
- Identify what to keep vs replace

### Step 2: Create Home.css
- Create new CSS file for home page
- Use design system variables
- Style hero section, buttons, feature cards

### Step 3: Create FeatureCard Component
- Create `FeatureCard.tsx`
- Add props interface
- Implement Framer Motion animations
- Add stagger effect with delay prop

### Step 4: Redesign Home Component
- Update Home.tsx with new structure
- Add hero section with gradient text
- Add subtitle and CTA buttons
- Add features section with cards

### Step 5: Add Animations
- Import Framer Motion
- Add fade-in animations for hero
- Add scroll-triggered animations for cards
- Implement stagger effect

### Step 6: Test Responsiveness
- Test on desktop
- Test on tablet
- Test on mobile
- Adjust breakpoints as needed

---

## Verification Plan

### Visual Testing
1. **Hero Section**
   - Gradient text displays correctly
   - Subtitle is readable
   - CTA buttons are prominent
   - Spacing looks good

2. **Feature Cards**
   - Cards display in grid
   - Hover effects work
   - Icons and text are centered
   - Shadows provide depth

3. **Animations**
   - Hero fades in smoothly
   - Cards animate on scroll
   - Stagger effect works
   - No jank or stuttering

### Responsive Testing
1. **Desktop** (>1024px)
   - 3 feature cards per row
   - Hero section centered
   - Buttons side by side

2. **Tablet** (640px-1024px)
   - 2 feature cards per row
   - Hero section adjusted
   - Buttons side by side

3. **Mobile** (<640px)
   - 1 feature card per row
   - Hero text smaller
   - Buttons stacked vertically

---

## Success Criteria

- [ ] Hero section displays with gradient text
- [ ] Subtitle and CTA buttons present
- [ ] Feature cards display in responsive grid
- [ ] Hover effects work on cards and buttons
- [ ] Animations are smooth
- [ ] Responsive on all screen sizes
- [ ] Matches design mockup
- [ ] No console errors

---

## Next Steps After Phase 3

1. Commit changes
2. Test on multiple devices
3. Update task documentation
4. Begin Phase 4: Flashcard Page Enhancement
