# Design

## Theme

Light. A focused workspace where AI recedes into the background and the user's thoughts take center stage.

## Color Strategy

Restrained. Tinted neutrals carry 90% of the surface. Primary blue marks interactive elements and active states. Accent amber signals status and highlights. Color is information, not decoration.

## Color Palette

All values in OKLCH.

| Role     | Value                        | Usage                                    |
|----------|------------------------------|------------------------------------------|
| bg       | `oklch(1.000 0.000 0)`      | Page background, pure white              |
| surface  | `oklch(0.965 0.003 200)`    | Cards, panels, sidebar, sections         |
| ink      | `oklch(0.145 0.012 200)`    | Body text, headings                      |
| primary  | `oklch(0.520 0.140 200)`    | Primary actions, active states, links    |
| accent   | `oklch(0.620 0.150 55)`     | Status badges, highlights, secondary CTA |
| muted    | `oklch(0.520 0.008 200)`    | Secondary text, placeholders, hints      |

### CSS Custom Properties

```css
:root {
  --color-bg: oklch(1.000 0.000 0);
  --color-surface: oklch(0.965 0.003 200);
  --color-ink: oklch(0.145 0.012 200);
  --color-primary: oklch(0.520 0.140 200);
  --color-accent: oklch(0.620 0.150 55);
  --color-muted: oklch(0.520 0.008 200);
}
```

### Text on Color Fills

White text on primary and accent fills. Dark text only on pale fills (L > 0.85) or pure-neutral fills.

## Typography

### Font Stack

```css
--font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: "SF Mono", "Cascadia Code", "Fira Code", Consolas, monospace;
```

One family for all UI elements. Mono for code blocks and inline code.

### Type Scale

Fixed rem scale, ratio 1.2. No fluid sizing.

| Element   | Size     | Weight | Line Height | Letter Spacing |
|-----------|----------|--------|-------------|----------------|
| h1        | 2.0rem   | 700    | 1.2         | -0.02em        |
| h2        | 1.5rem   | 600    | 1.3         | -0.01em        |
| h3        | 1.25rem  | 600    | 1.4         | 0              |
| body      | 1.0rem   | 400    | 1.6         | 0              |
| body-sm   | 0.875rem | 400    | 1.5         | 0              |
| caption   | 0.75rem  | 500    | 1.4         | 0.01em         |
| mono      | 0.875rem | 400    | 1.6         | 0              |

### Rules

- Body line length capped at 65-75ch
- `text-wrap: balance` on h1-h3
- `text-wrap: pretty` on long prose
- No all-caps body copy

## Spacing

4px base unit. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## Layout

### Structure

Sidebar + main content. Sidebar for conversation history and navigation. Main area for active conversation.

- Sidebar width: 280px, collapsible
- Main content max-width: 48rem (768px), centered
- Responsive: sidebar collapses to overlay below 768px viewport

### Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 100;
--z-sticky: 200;
--z-overlay: 300;
--z-modal: 400;
--z-toast: 500;
--z-tooltip: 600;
```

## Border Radius

```css
--radius-sm: 4px;   /* tags, badges */
--radius-md: 8px;   /* inputs, buttons */
--radius-lg: 12px;  /* cards, panels */
--radius-full: 9999px; /* pills, avatars */
```

## Shadows

```css
--shadow-sm: 0 1px 2px oklch(0.000 0 0 / 0.05);
--shadow-md: 0 2px 8px oklch(0.000 0 0 / 0.08);
--shadow-lg: 0 4px 16px oklch(0.000 0 0 / 0.10);
```

No border + shadow combo on the same element. Pick one.

## Motion

Moderate energy. Micro-interactions that feel responsive without being distracting.

### Duration

| Context       | Duration |
|---------------|----------|
| Hover/press   | 100ms    |
| Expand/collapse | 200ms  |
| Page transition | 250ms  |
| Toast/notification | 300ms |

### Easing

```css
--ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
```

### Rules

- No bounce or elastic easing
- No decorative motion; motion conveys state only
- `prefers-reduced-motion: reduce` falls back to instant or crossfade
- No orchestrated page-load sequences

## Components

### States

Every interactive component must define: default, hover, focus, active, disabled, loading, error.

### Specifics

- **Buttons**: `--radius-md`, primary uses `--color-primary` fill with white text
- **Inputs**: `--radius-md`, border with `--color-muted`, focus ring in `--color-primary`
- **Cards**: `--radius-lg`, `--color-surface` bg, no border + shadow combo
- **Sidebar**: `--color-surface` bg, 1px right border in `oklch(0.900 0.003 200)`
- **Conversation bubbles**: User messages right-aligned with `--color-primary` bg, AI messages left-aligned with `--color-surface` bg
- **Code blocks**: `--font-mono`, `--color-surface` bg, `--radius-lg`, syntax highlighting via shiki

## Iconography

Lucide icon set. 20px default size. Stroke width 1.5px. Consistent with the restrained visual language.
