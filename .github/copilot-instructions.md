# Copilot Instructions - Venkata Kondepati Portfolio

## Project Overview
This is a premium static portfolio website for Venkata Kondepati, a data & cloud transformation leader. It's a single-page application with glassmorphism design, dark/light theme support, and narrative-driven content sections.

## Architecture & Structure
- **Static site**: No build process, runs directly in browser with `python3 -m http.server 3000`
- **File organization**: Clean separation of concerns with `styles/`, `scripts/`, and `assets/` directories
- **Single-page layout**: All content sections in `index.html` with anchor-based navigation (`#hero`, `#about`, etc.)
- **Dependencies**: External fonts (Inter + Playfair Display) and Formspree for contact form

## Key Design Patterns

### CSS Custom Properties System
The project uses a comprehensive CSS custom property system in `:root` for theming:
```css
--color-bg, --color-surface, --color-glass, --color-border
--color-primary, --color-secondary, --color-text, --color-muted
--font-sans, --font-serif, --radius-lg/md/sm, --shadow-elevated
```
**Always use these variables** instead of hardcoded colors/values. Light theme overrides are in `[data-theme='light']`.

### Component Naming Convention
- **Block-element structure**: `.hero-container`, `.hero-intro`, `.hero-stats`
- **State classes**: `.is-open`, `.is-active`, `.is-visible`
- **Utility classes**: `.sr-only`, `.container`, `.button primary/ghost`
- **Semantic sections**: Each major section has an ID matching navigation (`#hero`, `#about`, `#experience`)

### JavaScript Patterns
- **IIFE wrapper**: All code wrapped in `(function() { ... })()`
- **Theme persistence**: Uses `localStorage` with key `vk-theme`
- **Accessibility focus**: Proper ARIA attributes, `aria-expanded`, `aria-label`
- **DOM queries**: Cache elements at top, check existence before use

## Content Structure & Conventions

### Hero Section Pattern
- **Stats format**: Use `<dl class="hero-stats">` with `<dt>` for labels, `<dd>` with `.stat-number` spans
- **Portrait card**: Glassmorphism effect with `.portrait-ring`, `.portrait-glow`, and initials
- **Action buttons**: `.button.primary` for main CTA, `.button.ghost` for secondary

### Section Organization
Each content section follows: eyebrow text → heading → description → content grid/list → optional CTA. Maintain this narrative flow when adding/editing sections.

## Development Workflows

### Local Development
```bash
python3 -m http.server 3000
# Visit http://localhost:3000
```

### Content Updates
- **Contact email**: Update `connect@venkatkondepati.com` in contact section
- **Resume**: Replace `assets/venkata-kondepati-resume.pdf`
- **Formspree**: Update form action URL for contact form backend
- **Statistics**: Modify hero stats and company names from LinkedIn data

### Deployment
Static hosting ready - no build step required. Compatible with GitHub Pages, Netlify, Vercel, Azure Static Web Apps.

## Accessibility Requirements
- Maintain semantic HTML structure and ARIA labels
- Ensure keyboard navigation works for mobile menu and theme toggle
- Keep color contrast ratios for both light/dark themes
- Include `alt` text for portrait and descriptive `aria-label` attributes

## Current Requirements (from req.txt)
- Picture placement: Move portrait to left side of hero section
- Text reduction: Condense verbose content sections
- Spotlight restructure: Move spotlight section higher in page flow
- Form backend: Sync contact form to Google Forms instead of Formspree