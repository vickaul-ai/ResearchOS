# Digital Zen Design System

**Version:** 2.0.0
**Status:** Active
**Scope:** Universal Standard for Professional Data Applications

---

## 1.0 Introduction

**Digital Zen** is a design language built for high-focus, data-intensive applications. It prioritizes clarity over decoration and calm efficiency over aggressive engagement. This document serves as the single source of truth for design and development teams across all projects sharing this aesthetic.

### 1.1 Core Principles
1.  **Radical Clarity:** Content precedes chrome. Remove decorative elements that do not support the user's task.
2.  **Calm Efficiency:** Interactions should be smooth and predictable. Avoid jarring animations or aggressive alerts.
3.  **Trust through Precision:** Use consistent spacing, alignment, and typography to convey reliability.

---

## 2.0 Foundations

### 2.1 Typography
We use **Inter** for UI text to ensure maximum legibility across all sizes, and **JetBrains Mono** for code and technical data.

| Role | Font Family | Weight | Size (Desktop) | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display XL** | Inter | Bold (700) | 36px (2.25rem) | 40px | -0.02em |
| **Display L** | Inter | Bold (700) | 30px (1.875rem) | 36px | -0.02em |
| **Heading M** | Inter | Semibold (600) | 24px (1.5rem) | 32px | -0.01em |
| **Heading S** | Inter | Semibold (600) | 20px (1.25rem) | 28px | -0.01em |
| **Body L** | Inter | Regular (400) | 18px (1.125rem) | 28px | 0 |
| **Body M** | Inter | Regular (400) | 16px (1rem) | 24px | 0 |
| **Body S** | Inter | Regular (400) | 14px (0.875rem) | 20px | 0 |
| **Caption** | Inter | Medium (500) | 12px (0.75rem) | 16px | 0.02em |
| **Code** | JetBrains Mono | Regular (400) | 14px (0.875rem) | 20px | 0 |

### 2.2 Color Palette
Our palette is built on **Zinc** (neutrals) and **Professional Blue** (primary action), defined in OKLCH for perceptual uniformity.

#### Neutrals (Zinc)
Used for structure, text, and backgrounds.
- **Background:** `oklch(1 0 0)` (White) / `oklch(0.141 0.005 285.823)` (Dark)
- **Foreground:** `oklch(0.235 0.015 65)` (Soft Black)
- **Muted:** `oklch(0.967 0.001 286.375)` (Light Gray)
- **Border:** `oklch(0.92 0.004 286.32)` (Subtle Divider)

#### Primary (Blue)
Used for primary actions, active states, and focus rings.
- **Primary:** `var(--color-blue-700)`
- **Primary Foreground:** `var(--color-blue-50)`
- **Focus Ring:** `ring-primary/20` (Subtle Glow)

#### Semantic Status
- **Success:** Green-600 text on Green-500/10 background.
- **Warning:** Amber-600 text on Amber-500/10 background.
- **Error:** Red-600 text on Red-500/10 background.
- **Info/Processing:** Blue-600 text on Blue-500/10 background.

### 2.3 Spacing & Grid
We use a **4px baseline grid**. All spacing values must be multiples of 4.

- **Container:** Max-width `1280px`, centered.
- **Padding (Page):** `px-4` (Mobile), `px-6` (Tablet), `px-8` (Desktop).
- **Gap (Section):** `space-y-8` (32px) or `space-y-10` (40px).
- **Gap (Component):** `gap-4` (16px) or `gap-2` (8px).

### 2.4 Radius & Shadows
- **Radius:**
    - **Cards/Panels:** `rounded-xl` (0.75rem / 12px)
    - **Buttons/Inputs:** `rounded-md` (0.375rem / 6px)
    - **Tags/Badges:** `rounded-full` (9999px)
- **Shadows:**
    - **Card (Rest):** `shadow-sm` (Subtle lift)
    - **Card (Hover):** `shadow-md` (Interactive lift)
    - **Dropdown/Modal:** `shadow-lg` (High elevation)

---

## 3.0 Iconography

We use **Lucide React** as our standard icon library due to its clean lines, consistency, and tree-shakability.

### 3.1 Sizing
- **Small (Inline):** `w-4 h-4` (16px). Used inside buttons or metadata tags.
- **Medium (Navigation):** `w-5 h-5` (20px). Used in sidebars or headers.
- **Large (Empty States):** `w-10 h-10` (40px). Used in "No Data" placeholders.

### 3.2 Style
- **Stroke Width:** `stroke-[1.5px]` (Light/Elegant) is the default.
- **Color:** Icons should inherit text color (`currentColor`) or use `text-muted-foreground` for secondary icons.

---

## 4.0 Content & Voice

Our voice is **Calm, Objective, and Efficient**. We speak like a helpful, intelligent colleague—never robotic, but never overly chatty.

### 4.1 Microcopy Guidelines
- **Be Direct:** Start with the verb. (e.g., "Save Changes" not "Would you like to save?")
- **Be Specific:** Avoid vague terms. (e.g., "API Key Invalid" not "Something went wrong.")
- **Sentence Case:** Use sentence case for all headers and buttons (e.g., "Create new project").

### 4.2 Error Messages
Errors are opportunities to help, not to blame.
- **Structure:** [What happened] + [Why] + [How to fix].
- **Example:** "Connection failed. Your internet signal is weak. Please check your Wi-Fi and try again."
- **Tone:** Neutral and constructive. Avoid "Oops!" or "Whoops!" (too casual) or "Fatal Error" (too alarming).

### 4.3 Empty States
Empty states should encourage action.
- **Structure:** [Icon] + [Title] + [Description] + [Call to Action].
- **Example:** "No research yet. Start your first deep dive to uncover insights." + [Start Research Button].

---

## 5.0 Technical Implementation

This design system is implemented using the following stack. All projects must adhere to this foundation to ensure component portability.

### 5.1 Core Stack
- **Framework:** React 19+
- **Styling:** Tailwind CSS v4
- **Component Primitives:** **shadcn/ui** (Radix UI)
    - *Note:* We use shadcn/ui as the base but apply our specific "Digital Zen" tokens (Section 2.0) for styling.

### 5.2 Component Library (shadcn/ui)
We rely on the following key primitives:
- `Button`, `Input`, `Card`, `Dialog`, `DropdownMenu`, `Tabs`, `ScrollArea`.
- **Do not reinvent** these components. Install them via CLI and customize the `globals.css` variables to match our palette.

---

## 6.0 Interaction & Motion

### 6.1 Transitions
All interactive elements must have smooth transitions.
- **Standard:** `transition-all duration-300 ease-in-out`.
- **Hover:** `duration-200`.

### 6.2 Loading States
Never leave the user wondering if the system is working.
- **Skeleton:** Use shimmering skeletons (`animate-pulse bg-muted`) for initial page loads.
- **Spinner:** Use spinning icons (`Loader2`) for button actions.
- **Progress Bar:** Use for long-running tasks (like Deep Research).

---

## 7.0 Accessibility (WCAG 2.1 AA)

1.  **Contrast:** All text must meet 4.5:1 contrast ratio against background.
2.  **Keyboard Nav:** All interactive elements must be focusable and usable via Tab/Enter/Space.
3.  **Focus Indicators:** Never remove outline (`outline-none`) without replacing it with a visible focus ring.
4.  **Screen Readers:**
    - Use semantic HTML (`<main>`, `<nav>`, `<button>`).
    - Provide `aria-label` for icon-only buttons.
    - Use `alt` text for all meaningful images.
