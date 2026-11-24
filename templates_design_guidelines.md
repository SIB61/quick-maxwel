# Portfolio Templates Design Guidelines & Specifications

This document defines the architectural requirements, visual design rules, responsive layouts, and interactive behaviors for all templates in the **PortfoliooSite** ecosystem.

Each template represents a distinct aesthetic philosophy inspired by award-winning portfolios on Awwwards, Dribbble, GitHub, and modern engineering platforms.

---

## 1. Universal Functional Requirements for All Templates

Every template MUST fulfill these structural requirements regardless of its visual theme:

1. **Multi-Page & Section Support**:
   - Seamlessly render all portfolio entities: **Hero / Bio**, **Featured Articles**, **Career Timeline / Experience**, **Honors & Achievements**, **Services & Packages**, **Speaking & Events**, and **Direct Contact CTA**.
   - Provide clickable navigation paths to both the detail views (e.g. `/[handle]/articles/[slug]`) and full listing views (`/[handle]/articles`, `/[handle]/experience`, etc.).
2. **Dynamic Theme & Palette Adaptability**:
   - Must NEVER hardcode accent colors (e.g. no raw `text-emerald-400` where a theme accent is required).
   - Must consume CSS variables injected by `PortfolioLayout`:
     - `--theme-accent`: Primary accent hex (used for primary links, badges, highlights, CTA buttons).
     - `--theme-accent-glow`: Translucent rgba glow token for box shadows and blur layers.
     - `--theme-primary`: Deep backdrop primary hex.
3. **Design System & Spatial Grid**:
   - Strict 8pt grid scale (`p-4`, `p-6`, `p-8`, `gap-4`, `gap-6`, `space-y-6`, `space-y-8`).
   - Primary CTA buttons and inputs adhere to 44px minimum touch target height (`h-11 rounded-xl` or template-appropriate border-radius).
4. **Empty State & Fallback Resilience**:
   - If a user has 0 articles or 0 events, the template must gracefully collapse or render a subtle, non-intrusive indicator without breaking the layout.
5. **Responsive Excellence**:
   - Fully optimized for mobile viewports (`375px+`), tablets (`768px+`), and wide desktop screens (`1024px - 1440px`).

---

## 2. Template Catalog & Design Specifications

### Current Core Templates
1. **Simple Professional (`simple_professional`)**
   - *Vibe*: Editorial resume, structured chronological timeline, clean reading column.
   - *Key Features*: Continuous vertical timeline ruler with date chips, subtle card borders, high information readability.

2. **Fancy Creative (`fancy_creative`)**
   - *Vibe*: Gradient meshes, floating glassmorphic cards, glowing badges.
   - *Key Features*: Ambient backdrop blur spheres, animated live availability radar pills, gradient text titles, high-impact CTA banner.

3. **Bento Grid (`bento_grid`)**
   - *Vibe*: Apple & Linear inspired 4-column asymmetrical bento grid.
   - *Key Features*: Modular tiles (Profile, Live Status, Quick Connect, Writing Spotlight, Deliverables pill cloud, Skill tags, and Accolades).

---

### New Templates to Implement

### Template 4: Developer Terminal (`developer_terminal`)
- **Design Philosophy**: High-fidelity developer console / macOS Unix terminal experience.
- **Visual Vocabulary**:
  - Realistic window frame with terminal header, title bar (`~/${handle} — zsh — 80x24`), and traffic light buttons (🔴 🟡 🟢).
  - Monospace prompt styling (`$ whoami`, `$ cat bio.md`, `$ ls -la services/`, `$ ./contact.sh`).
  - Terminal tab navigation (`README.md`, `EXPERIENCE.sh`, `WRITINGS.log`, `SERVICES.json`).
  - Blinking terminal cursor indicator (`animate-pulse`).
  - Dark obsidian background with clean code-like borders (`border-zinc-800`).
  - Command line execution chips and return codes (`200 OK`).
- **Interactive Details**:
  - Interactive tab switcher to inspect different sections in command-line format.
  - One-click copy or run contact command.
  - Hover states simulating terminal text selection.

---

### Template 5: Minimal Swiss (`minimal_swiss`)
- **Design Philosophy**: Swiss International Typographic Style (Max Bill, Josef Müller-Brockmann, Vignelli) combined with modern minimalist engineering.
- **Visual Vocabulary**:
  - Dramatic negative space and asymmetric editorial layout.
  - Oversized display typography with hairline 1px architectural divider rules.
  - Numbered section indicators (`01 / ESSAYS`, `02 / CAREER RECORD`, `03 / SPECIALIZED SERVICES`, `04 / ACCOLADES`).
  - High-contrast hover inversions (elements invert on hover with crisp contrast).
  - Monospaced metadata tags juxtaposed against clean serif or sans display headlines.
- **Interactive Details**:
  - Horizontal list accordion hover reveals.
  - Distinctive arrow markers (`→`) that shift on hover.
  - Understated elegance without distracting heavy shadows.

---

### Template 6: Aurora Studio (`aurora_studio`)
- **Design Philosophy**: Spatial glassmorphism, multi-layered aurora ambient lighting, and high-end modern studio agency aesthetic (Linear, Vercel, Apple VisionOS).
- **Visual Vocabulary**:
  - Multi-stop vibrant radial aurora light flares that blend smoothly behind floating frosted panels (`backdrop-blur-2xl bg-zinc-900/30 border-white/10`).
  - Floating pill navigation and capsule badges with metallic border gradients.
  - Interactive spotlight border glow effect on cards (`hover:border-[var(--theme-accent)]/80 hover:shadow-2xl`).
  - Glass avatars and status spheres.
- **Interactive Details**:
  - Micro-scale elevation transitions (`hover:-translate-y-1.5`).
  - Radiant button glows.
  - Visual depth layering with z-index hierarchies.

---

## 3. Step-by-Step Delivery Roadmap

Each template will be crafted, integrated, verified, reviewed, and committed one by one:

1. **Milestone 1**: **Template 4 — Developer Terminal (`developer_terminal`)**
   - Build `src/components/templates/developer-terminal.tsx`.
   - Update `src/lib/templates.ts`, `src/actions/theme.ts`, `src/components/templates/portfolio-dispatcher.tsx`, and `studio-form.tsx`.
   - Test compilation & live responsiveness on `http://localhost:3000`.
   - Dispatch Reviewer Agent -> QA audit -> Git Commit.

2. **Milestone 2**: **Template 5 — Minimal Swiss (`minimal_swiss`)**
   - Build `src/components/templates/minimal-swiss.tsx`.
   - Register in theme engine and Theme Studio.
   - Test compilation & live responsiveness.
   - Dispatch Reviewer Agent -> QA audit -> Git Commit.

3. **Milestone 3**: **Template 6 — Aurora Studio (`aurora_studio`)**
   - Build `src/components/templates/aurora-studio.tsx`.
   - Register in theme engine and Theme Studio.
   - Test compilation & live responsiveness.
   - Dispatch Reviewer Agent -> QA audit -> Git Commit.

---
