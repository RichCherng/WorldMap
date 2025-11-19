# Frontend Design Specifications - WorldMap Application

**Created:** 2025-11-19  
**Status:** ✅ Approved  
**Theme:** Light Theme with Modern Aesthetic

---

## 🎨 Design Philosophy

### Core Principles
1. **Clean & Airy** - Light theme with generous white space
2. **Modern & Premium** - Vibrant gradients and smooth interactions
3. **Intuitive Navigation** - Clear visual hierarchy and user flows
4. **Smooth Animations** - Micro-interactions that feel alive
5. **Consistent Design Language** - Cohesive across all pages

---

## 🎨 Design System

### Color Palette

#### Background Colors
```css
--bg-primary: hsl(0, 0%, 98%);          /* Main background - clean white */
--bg-secondary: hsl(0, 0%, 100%);       /* Card backgrounds - pure white */
--bg-tertiary: hsl(0, 0%, 95%);         /* Inactive elements - light gray */
```

#### Accent Colors
```css
--accent-primary: hsl(280, 100%, 65%);   /* Purple */
--accent-secondary: hsl(200, 100%, 60%); /* Cyan */
--accent-gradient: linear-gradient(135deg, 
  hsl(280, 100%, 65%) 0%, 
  hsl(200, 100%, 60%) 100%);
```

#### Text Colors
```css
--text-primary: hsl(0, 0%, 10%);        /* Almost black - main text */
--text-secondary: hsl(0, 0%, 40%);      /* Medium gray - secondary text */
--text-tertiary: hsl(0, 0%, 60%);       /* Light gray - subtle text */
```

#### Shadows & Depth
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.06);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.05);
```

### Typography

#### Font Families
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-heading: 'Outfit', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;
```

#### Font Sizes
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
```

#### Font Weights
```css
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale
```css
--space-1: 0.25rem;      /* 4px */
--space-2: 0.5rem;       /* 8px */
--space-3: 0.75rem;      /* 12px */
--space-4: 1rem;         /* 16px */
--space-6: 1.5rem;       /* 24px */
--space-8: 2rem;         /* 32px */
--space-12: 3rem;        /* 48px */
--space-16: 4rem;        /* 64px */
--space-20: 5rem;        /* 80px */
```

### Border Radius
```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Pill/circle shape */
```

### Animation & Transitions
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

## 🧭 Navigation Design

### Pill Navigation Bar

**Visual Design:**
- Clean white/light gray background: `hsl(0, 0%, 98%)`
- Horizontal pill-style navigation items
- Active tab has vibrant purple-to-cyan gradient background
- Inactive tabs have light gray background: `hsl(0, 0%, 95%)`
- Smooth sliding animation when switching tabs

**Specifications:**
```css
/* Navigation Container */
- Background: hsl(0, 0%, 98%)
- Padding: var(--space-4) var(--space-6)
- Display: flex, justify-content: center
- Gap: var(--space-2) /* 8px between items */

/* Navigation Pills */
- Border radius: var(--radius-full) /* 24px pill shape */
- Padding: var(--space-3) var(--space-6) /* 12px vertical, 24px horizontal */
- Font size: var(--text-sm) /* 14px */
- Font weight: var(--font-semibold) /* 600 */
- Transition: all var(--duration-normal) var(--ease-in-out)

/* Active Pill */
- Background: var(--accent-gradient)
- Color: white
- Shadow: var(--shadow-md)

/* Inactive Pill */
- Background: hsl(0, 0%, 95%)
- Color: var(--text-primary)
- Hover: background shifts to hsl(0, 0%, 92%)

/* Hover State */
- Transform: scale(1.05)
- Shadow: var(--shadow-sm)
```

**Navigation Items:**
- Home
- World Map
- About
- Contact
- Flash Card
- Stack

**Design Reference:** See `pill_nav_light.png`

---

## 🏠 Home Page / Landing Design

### Hero Section

**Visual Design:**
- Large gradient heading: "WorldMap Application"
- Subtitle: "Learn Chinese with Interactive Flashcards"
- Clean white background with subtle gradient overlay
- Feature cards with white backgrounds and soft shadows
- Generous white space and modern layout

**Specifications:**
```css
/* Hero Container */
- Background: hsl(0, 0%, 98%)
- Padding: var(--space-16) var(--space-8)
- Text align: center

/* Heading */
- Font size: var(--text-5xl) /* 48px */
- Font weight: var(--font-bold)
- Background: var(--accent-gradient)
- -webkit-background-clip: text
- -webkit-text-fill-color: transparent
- Margin bottom: var(--space-4)

/* Subtitle */
- Font size: var(--text-xl) /* 20px */
- Color: var(--text-secondary)
- Font weight: var(--font-regular)
```

### Feature Cards

**Specifications:**
```css
/* Card Container */
- Background: white
- Border radius: var(--radius-xl) /* 16px */
- Padding: var(--space-8)
- Shadow: var(--shadow-md)
- Transition: all var(--duration-normal) var(--ease-in-out)

/* Hover State */
- Transform: translateY(-4px)
- Shadow: var(--shadow-lg)
```

**Design Reference:** See `hero_light_theme.png`, `full_layout_light.png`

---

## 🎴 Flashcard Page Design

### Study View

**Visual Design:**
- Large flashcard centered on screen
- Chinese character prominently displayed (48-64px)
- Pinyin pronunciation below (18-24px)
- English translation at bottom (20-28px)
- Progress indicator with gradient bar
- Swipe gesture indicators

**Flashcard Specifications:**
```css
/* Card Container */
- Width: 350px
- Height: 450px
- Background: white
- Border radius: var(--radius-xl) /* 16px */
- Shadow: var(--shadow-xl)
- Padding: var(--space-8)
- Display: flex, flex-direction: column
- Justify content: center, align items: center

/* Chinese Character */
- Font size: var(--text-5xl) /* 48px or larger */
- Font weight: var(--font-bold)
- Color: var(--text-primary)
- Margin bottom: var(--space-4)

/* Pinyin */
- Font size: var(--text-lg) /* 18px */
- Font weight: var(--font-medium)
- Color: var(--text-secondary)
- Margin bottom: var(--space-6)

/* English Translation */
- Font size: var(--text-xl) /* 20px */
- Font weight: var(--font-regular)
- Color: var(--text-primary)

/* 3D Flip Animation */
- Transform: rotateY(180deg)
- Transition: transform var(--duration-slow) var(--ease-in-out)
- Backface visibility: hidden
```

**Progress Indicator:**
```css
/* Progress Bar Container */
- Width: 100%
- Height: 8px
- Background: hsl(0, 0%, 90%)
- Border radius: var(--radius-full)
- Overflow: hidden

/* Progress Fill */
- Background: var(--accent-gradient)
- Height: 100%
- Transition: width var(--duration-normal) var(--ease-out)

/* Progress Text */
- Font size: var(--text-sm)
- Color: var(--text-secondary)
- Margin top: var(--space-2)
- Text: "5/20 cards"
```

**Design Reference:** See `flashcard_study_view.png`, `flashcard_full_page.png`

---

### Vocabulary List Panel

**Visual Design:**
- Side panel or drawer showing vocabulary list
- Each item displays: Chinese characters, pinyin, English translation
- Two icon buttons on right: Star (selection) and Edit
- Search bar at top
- "Add New Vocabulary" button at bottom with gradient

**List Item Specifications:**
```css
/* List Item Container */
- Background: white
- Border: 1px solid hsl(0, 0%, 90%)
- Border radius: var(--radius-md) /* 8px */
- Padding: var(--space-4)
- Margin bottom: var(--space-2)
- Display: flex, justify-content: space-between
- Align items: center
- Transition: all var(--duration-fast) var(--ease-in-out)

/* Hover State */
- Background: hsl(0, 0%, 97%)
- Border color: hsl(280, 100%, 65%, 0.3)
- Shadow: var(--shadow-sm)

/* Text Content */
- Chinese: font-size var(--text-lg), font-weight var(--font-semibold)
- Pinyin: font-size var(--text-sm), color var(--text-secondary)
- English: font-size var(--text-base), color var(--text-primary)
```

**Action Buttons:**
```css
/* Button Container */
- Display: flex
- Gap: var(--space-2) /* 8px */

/* Icon Button Base */
- Width: 32px
- Height: 32px
- Border radius: var(--radius-full)
- Border: none
- Background: transparent
- Cursor: pointer
- Transition: all var(--duration-fast) var(--ease-in-out)

/* Star Button - Unselected */
- Icon: Star outline
- Color: hsl(0, 0%, 60%)
- Hover: color hsl(280, 100%, 65%), scale 1.1

/* Star Button - Selected */
- Icon: Star filled
- Background: var(--accent-gradient)
- Color: white
- Hover: scale 1.1, shadow var(--shadow-md)

/* Edit Button */
- Icon: Pencil/Edit
- Color: hsl(0, 0%, 60%)
- Hover: color hsl(200, 100%, 60%), scale 1.1
```

**Search Bar:**
```css
/* Search Input */
- Width: 100%
- Padding: var(--space-3) var(--space-4)
- Border: 1px solid hsl(0, 0%, 85%)
- Border radius: var(--radius-lg)
- Font size: var(--text-sm)
- Transition: all var(--duration-fast) var(--ease-in-out)

/* Focus State */
- Border color: hsl(280, 100%, 65%)
- Shadow: 0 0 0 3px rgba(168, 85, 247, 0.1)
- Outline: none
```

**Add Vocabulary Button:**
```css
/* Button */
- Width: 100%
- Padding: var(--space-3) var(--space-6)
- Background: var(--accent-gradient)
- Color: white
- Border: none
- Border radius: var(--radius-lg)
- Font size: var(--text-sm)
- Font weight: var(--font-semibold)
- Cursor: pointer
- Transition: all var(--duration-normal) var(--ease-in-out)

/* Hover State */
- Transform: translateY(-2px)
- Shadow: var(--shadow-lg)

/* Active State */
- Transform: translateY(0)
- Shadow: var(--shadow-md)
```

**Design Reference:** See `vocab_list_button_select.png`, `vocab_item_detail.png`

---

## 📐 Layout Structure

### Page Layout
```css
/* Main Container */
- Max width: 1200px
- Margin: 0 auto
- Padding: var(--space-8)
- Background: hsl(0, 0%, 98%)

/* Content Grid (for Flashcard page) */
- Display: grid
- Grid template columns: 1fr 400px /* Main content + sidebar */
- Gap: var(--space-8)
- Align items: start

/* Responsive Breakpoints */
@media (max-width: 768px) {
  - Grid template columns: 1fr /* Stack vertically */
  - Sidebar becomes bottom sheet/drawer
}
```

---

## 🎯 Interactive States

### Button States
```css
/* Default */
- Opacity: 1
- Cursor: pointer

/* Hover */
- Transform: scale(1.05) or translateY(-2px)
- Shadow increase
- Color shift

/* Active/Pressed */
- Transform: scale(0.98)
- Shadow decrease

/* Disabled */
- Opacity: 0.5
- Cursor: not-allowed
- Grayscale filter
```

### Card States
```css
/* Default */
- Shadow: var(--shadow-md)

/* Hover */
- Transform: translateY(-4px)
- Shadow: var(--shadow-lg)

/* Active/Selected */
- Border: 2px solid gradient
- Background tint
```

---

## 🎬 Animations

### Micro-interactions
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale In */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

/* Slide In */
@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* Card Flip */
@keyframes cardFlip {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(180deg); }
}
```

### Page Transitions
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Fade + slight vertical movement

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 640px) {
  - Single column layout
  - Larger touch targets (min 44px)
  - Simplified navigation (hamburger menu)
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  - Two column layout where appropriate
  - Adjusted spacing
}

/* Desktop */
@media (min-width: 1025px) {
  - Full multi-column layouts
  - Hover effects enabled
  - Larger cards and spacing
}
```

---

## ✅ Design Checklist

### Navigation
- [x] Pill-style navigation designed
- [x] Active state with gradient
- [x] Hover states defined
- [x] Mobile responsive plan

### Home Page
- [x] Hero section designed
- [x] Feature cards specified
- [x] Layout structure defined

### Flashcard Page
- [x] Study view designed
- [x] Card flip animation specified
- [x] Progress indicators designed
- [x] Vocabulary list panel designed
- [x] Selection mechanism (star button) designed
- [x] Search functionality designed
- [x] Add vocabulary button designed

### Design System
- [x] Color palette defined
- [x] Typography scale established
- [x] Spacing system created
- [x] Shadow/depth system defined
- [x] Animation timings specified

---

## 🎨 Design Assets

### Generated Mockups
1. **Navigation:**
   - `pill_nav_light.png` - Pill navigation bar
   - `hero_light_theme.png` - Hero section
   - `full_layout_light.png` - Complete layout

2. **Flashcard:**
   - `flashcard_study_view.png` - Study interface
   - `flashcard_full_page.png` - Complete flashcard page
   - `vocab_list_button_select.png` - Vocabulary list with selection
   - `vocab_item_detail.png` - List item states detail

---

## 📝 Implementation Notes

### Dependencies Required
```json
{
  "framer-motion": "^10.x",      // For smooth animations
  "react-icons": "^4.x",          // Icon library
  "lucide-react": "^0.x"          // Additional icons
}
```

### CSS Architecture
- Use CSS custom properties (variables) for design tokens
- Component-scoped CSS modules
- Global design system in `design-system.css`
- Animation utilities in `animations.css`

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- ARIA labels for interactive elements
- Focus visible states
- Sufficient color contrast (4.5:1 minimum)

---

## 🚀 Next Steps

1. **Review & Approve** this design specification
2. **Set up design system** CSS file with all variables
3. **Implement navigation** component first
4. **Build flashcard page** components
5. **Add animations** and polish
6. **Test responsiveness** across devices
7. **Accessibility audit** and improvements

---

**Last Updated:** 2025-11-19  
**Design Status:** ✅ Approved and ready for implementation
