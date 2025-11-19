# Phase 2: Navigation Component Implementation Plan

**Goal:** Create a modern pill-style navigation bar with smooth animations and mobile responsiveness.

**Estimated Time:** 4-6 hours

---

## Overview

Phase 2 builds the new navigation system:
1. Create pill-style navigation component with gradient active state
2. Add smooth sliding animation using Framer Motion
3. Implement mobile responsive hamburger menu
4. Replace old Navigation component in App.tsx

**Design Reference:** `pill_nav_light.png` mockup

---

## Proposed Changes

### New Components

#### [NEW] [PillNavigation.tsx](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/components/Navigation/PillNavigation.tsx)

**Purpose:** Main navigation component with pill-style design and animations.

**Key Features:**
- Horizontal flex layout with centered pills
- Active tab detection from React Router
- Gradient background for active pill
- Smooth transitions between states
- Framer Motion for sliding active indicator

**Component Structure:**
```tsx
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/home', label: 'Home' },
  { path: '/worldmap', label: 'World Map' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/flash-card', label: 'Flash Card' },
  { path: '/stack', label: 'Stack' },
];

export function PillNavigation() {
  const location = useLocation();
  
  return (
    <nav className="pill-nav">
      {navItems.map((item) => (
        <NavPill 
          key={item.path}
          {...item}
          isActive={location.pathname === item.path}
        />
      ))}
    </nav>
  );
}
```

---

#### [NEW] [PillNavigation.css](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/components/Navigation/PillNavigation.css)

**Purpose:** Styles for pill navigation using design system variables.

**Key Styles:**
```css
.pill-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2); /* 8px */
  padding: var(--space-4) var(--space-6);
  background: var(--bg-primary);
}

.nav-pill {
  padding: var(--space-3) var(--space-6); /* 12px 24px */
  border-radius: var(--radius-full); /* pill shape */
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: all var(--duration-normal) var(--ease-in-out);
  cursor: pointer;
}

.nav-pill.inactive {
  background: var(--bg-tertiary); /* light gray */
  color: var(--text-primary);
}

.nav-pill.inactive:hover {
  background: hsl(0, 0%, 92%);
  transform: scale(1.05);
}

.nav-pill.active {
  background: var(--accent-gradient);
  color: white;
  box-shadow: var(--shadow-md);
}
```

---

#### [NEW] [MobileMenu.tsx](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/components/Navigation/MobileMenu.tsx)

**Purpose:** Hamburger menu for mobile devices (<640px).

**Key Features:**
- Hamburger icon button
- Animated drawer/sheet using Framer Motion
- Same navigation items as desktop
- Touch-friendly tap targets (min 44px)
- Close on navigation

**Component Structure:**
```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="mobile-drawer"
          >
            {/* Navigation items */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

### Modified Files

#### [MODIFY] [App.tsx](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/App.tsx)

**Changes:**
1. Import new `PillNavigation` instead of old `Navigation`
2. Replace `<Navigation />` with `<PillNavigation />`
3. Remove old Navigation import

**Before:**
```tsx
import Navigation from './components/Navigation';

return (
  <div className="container">
    <Navigation />
    <Routes>...</Routes>
  </div>
);
```

**After:**
```tsx
import { PillNavigation } from './components/Navigation/PillNavigation';

return (
  <div className="container">
    <PillNavigation />
    <Routes>...</Routes>
  </div>
);
```

---

#### [DELETE] [Navigation.tsx](file:///Users/rich-mac/Workspace/WorldMap/frontend/src/components/Navigation.tsx)

**Reason:** Replaced by new PillNavigation component.

---

## Implementation Steps

### Step 1: Create Component Directory
```bash
mkdir -p frontend/src/components/Navigation
```

### Step 2: Create PillNavigation Component
- Create `PillNavigation.tsx`
- Set up navigation items array
- Implement active state detection with `useLocation`
- Create NavPill sub-component for individual pills

### Step 3: Create PillNavigation Styles
- Create `PillNavigation.css`
- Use design system variables
- Style active and inactive states
- Add hover effects

### Step 4: Add Framer Motion Animation
- Install if not already: `framer-motion` ✅ (already installed)
- Add motion.div for sliding active indicator
- Implement smooth transitions

### Step 5: Create Mobile Menu
- Create `MobileMenu.tsx`
- Add hamburger icon (lucide-react)
- Implement drawer animation
- Add responsive logic (show on <640px)

### Step 6: Make Navigation Responsive
- Add media queries
- Hide desktop nav on mobile
- Show mobile menu on mobile
- Test on different screen sizes

### Step 7: Update App.tsx
- Import PillNavigation
- Replace old Navigation
- Test all routes work

### Step 8: Delete Old Navigation
- Remove `Navigation.tsx`
- Clean up any unused imports

---

## Verification Plan

### Visual Testing
1. **Desktop View**
   - Navigation pills display horizontally
   - Active pill has gradient background
   - Inactive pills have light gray background
   - Hover effects work smoothly

2. **Mobile View** (<640px)
   - Hamburger menu icon appears
   - Desktop navigation hidden
   - Drawer slides in from right
   - Navigation items are touch-friendly

3. **Animations**
   - Smooth transitions between active states
   - No jank or stuttering
   - Hover effects are responsive

### Functional Testing
1. **Navigation**
   - All links navigate correctly
   - Active state updates on route change
   - Browser back/forward buttons work

2. **Mobile Menu**
   - Opens and closes smoothly
   - Closes when clicking outside (optional)
   - Closes after navigation

---

## Success Criteria

- [ ] Pill navigation displays correctly on desktop
- [ ] Active tab has gradient background
- [ ] Smooth animations between states
- [ ] Mobile menu works on small screens
- [ ] All navigation links function correctly
- [ ] No console errors
- [ ] Matches design mockup

---

## Technical Notes

### Responsive Breakpoints
```css
/* Mobile: < 640px */
@media (max-width: 639px) {
  .pill-nav { display: none; }
  .mobile-menu { display: block; }
}

/* Desktop: >= 640px */
@media (min-width: 640px) {
  .pill-nav { display: flex; }
  .mobile-menu { display: none; }
}
```

### Active State Detection
```tsx
const location = useLocation();
const isActive = location.pathname === item.path || 
                 (item.path === '/home' && location.pathname === '/');
```

### Framer Motion Variants
```tsx
const pillVariants = {
  inactive: { scale: 1 },
  hover: { scale: 1.05 },
  active: { scale: 1 }
};
```

---

## Next Steps After Phase 2

1. Commit changes
2. Test thoroughly on multiple devices
3. Update task documentation
4. Begin Phase 3: Home Page Redesign
