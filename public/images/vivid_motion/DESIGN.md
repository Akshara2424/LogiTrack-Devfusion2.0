---
name: Vivid Motion
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  label-md:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
  label-sm:
    fontFamily: Quicksand
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is built to transform the typically rigid logistics industry into a vibrant, high-energy experience. The brand personality is optimistic, proactive, and approachable, moving away from "corporate utility" toward "friendly partnership." The target audience consists of modern e-commerce entrepreneurs and tech-savvy logistics managers who value clarity over complexity.

The visual style blends **Modern Minimalism** with **Tactile Playfulness**. It utilizes high-saturation colors, generous negative space, and "bouncy" interactions to create a sense of momentum. Visuals should feel "inflated" and soft rather than sharp and industrial, evoking the speed of a delivery and the satisfaction of a package arriving.

## Colors

This design system uses a high-contrast palette to signify action and status.
- **Primary (Vibrant Blue):** Used for main actions, active tracking states, and primary branding.
- **Secondary (Energetic Orange):** Used for alerts, motion-related accents, and "New" indicators to provide a warm, urgent contrast.
- **Success (Green):** Specifically reserved for "Delivered" statuses and completed milestones.
- **Neutral Navy:** Provides the grounding weight for typography and deep structural elements.
- **Backgrounds:** Use ultra-light tints of blue or gray (#f1f5f9) rather than pure white to keep the interface feeling soft and low-strain. Subtle dot-grid patterns (5% opacity) can be used in hero sections to suggest mapping and coordinates.

## Typography

The typography strategy relies exclusively on **Quicksand** for its rounded terminals, which mirror the "friendly logistics" narrative. 
- **Headlines:** Should always be Bold (700) or SemiBold (600) to maintain a strong presence against vibrant backgrounds.
- **Body Text:** Use Medium (500) weight instead of Regular (400) to ensure legibility and a "thick," friendly feel.
- **Hierarchy:** Use tight line-heights for display text to keep the "bubbly" aesthetic contained, but generous line-heights for body text to ensure ease of reading during data-heavy logistics tasks.

## Layout & Spacing

The system follows a **Fluid Grid** model with high-density padding within components to create a "squishy" look.
- **Desktop:** 12-column grid with 48px outer margins.
- **Mobile:** 4-column grid with 16px outer margins.
- **Rhythm:** All spacing must be a multiple of 8px. Use larger gaps (lg, xl) between major sections to prevent the interface from feeling cluttered, reinforcing the "airy" brand pillar. Elements should generally avoid touching the edges of the screen, opting for "floating" container layouts.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layers** to create a sense of physical objects. 
- **Resting State:** Surfaces use a soft, low-blur shadow with a hint of the primary color (e.g., `0 4px 20px rgba(37, 99, 235, 0.08)`).
- **Lifted State:** Interactive elements like cards or buttons should "pop" when hovered, increasing the shadow blur and shifting 4px upward.
- **Depth Levels:**
  - **Level 0 (Background):** Subtly tinted light gray.
  - **Level 1 (Cards/Containers):** Pure white with soft shadows.
  - **Level 2 (Modals/Popovers):** Higher contrast shadows to imply they are floating significantly above the map or dashboard.

## Shapes

The shape language is defined by **Pill-shaped** geometry. 
- **Standard UI elements:** (Buttons, Inputs) use the maximum roundedness (2rem+) to appear approachable and tactile.
- **Cards:** Use `rounded-3xl` (approx 24px-32px) to soften the dashboard.
- **Consistency:** Avoid sharp 90-degree angles anywhere in the interface. Even progress bars and dividers should have rounded caps to maintain the "Vivid Motion" aesthetic.

## Components

### Buttons
- **Primary:** High-saturation Blue with white text. Apply a 2px "bottom-heavy" border in a darker shade of blue to give it a 3D, pressable feel.
- **Hover State:** Button should scale to 102% and shadow should deepen.
- **Active State:** Button should scale to 98% and move 2px down (simulating a physical click).

### Cards
- **Status Cards:** Use colored top-borders (4px) corresponding to the status (Orange for "In Transit", Green for "Delivered").
- **Inner Padding:** Generous (24px to 32px) to ensure character-based illustrations don't feel cramped.

### Inputs & Selects
- Large touch targets. Use a 2px border in a light neutral shade that turns Primary Blue on focus.
- Placeholder text should be high-contrast Navy (at 50% opacity) for immediate legibility.

### Tracking Progress Bar
- Instead of a thin line, use a thick, rounded track (12px height).
- The "Current Location" indicator should be a rounded delivery truck icon or a pulsing circle to add personality to the data.

### Character Integration
- Empty states should feature "delivery boy" or "friendly truck" illustrations.
- Tooltips should use "speech bubble" shapes with a small tail to feel like the character is speaking to the user.