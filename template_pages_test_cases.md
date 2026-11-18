# Comprehensive Template Verification Test Cases

This document establishes the official QA test cases and evaluation criteria for verifying that **every page and component** within the portfolio builder strictly adheres to the selected template's visual language, typography, interactions, and unique header navigation.

---

## 1. Universal Evaluation Matrix Across All Templates

For any template $T \in \{\text{Developer Terminal}, \text{Minimal Swiss}, \text{Aurora Studio}, \text{Bento Grid}, \text{Fancy Creative}, \text{Simple Professional}\}$, the following 10 views MUST reflect $T$'s unique design system:

| Route | View Name | Verification Target |
| :--- | :--- | :--- |
| **All Routes** | **Header Navigation** | Unique navbar designed specifically for $T$ (not generic). |
| **All Routes** | **Footer** | Thematic footer styling with brand signature for $T$. |
| `/[handle]` | **Landing Page** | Full thematic showcase (Hero, Featured items, CTAs). |
| `/[handle]/articles` | **Articles Index** | List/grid of all writings styled in $T$'s aesthetic. |
| `/[handle]/articles/[slug]` | **Article Detail** | Full reading experience, header, prose, and author card. |
| `/[handle]/experience` | **Career Timeline** | Complete career history rendered with $T$'s layout logic. |
| `/[handle]/achievements` | **Achievements Index**| All awards, credentials, and honors styled in $T$. |
| `/[handle]/services` | **Services Catalog** | All consulting & engineering packages in $T$. |
| `/[handle]/services/[slug]` | **Service Detail** | Deliverables checklist, pricing pill, and booking CTA. |
| `/[handle]/events` | **Events Schedule** | Conference talks, workshops, and podcasts in $T$. |
| `/[handle]/events/[slug]` | **Event Detail** | Session abstract, location, and external registration in $T$. |
| `/[handle]/contact` | **Contact Form** | Thematic contact form with 44px inputs and themed submit CTA. |

---

## 2. Template-Specific Test Cases & Design Specifications

### Template 1: Developer Terminal (`developer_terminal`)
- [ ] **Header Navbar**:
  - macOS/Linux terminal window top bar with traffic light buttons (🔴 🟡 🟢).
  - Shell path indicator: `{handle}@archlinux: ~/portfolio/{route} (zsh)`.
  - Monospace prompt navigation pills (`cd ~/articles`, `cd ~/career`, `cd ~/services`, `cd ~/contact`).
  - Terminal status dot with active pulse.
- [ ] **Footer**:
  - Unix exit code indicator: `Process returned 0 (0x00) // Session active`.
  - SSH connection helper: `ssh {handle}@portfolio.dev`.
- [ ] **Articles Index & Detail (`/articles`, `/articles/[slug]`)**:
  - Index styled like `ls -lh --sort=time` table with file permissions (`-rw-r--r--`), file sizes, dates, and click targets.
  - Detail view styled like a Vim/Nano buffer (`:set number`, line numbers, syntax-clean typography, and `:wq` exit button).
- [ ] **Career Timeline (`/experience`)**:
  - Styled as `git log --graph --oneline` with commit hashes, branch merges, and tag chips.
- [ ] **Achievements Index (`/achievements`)**:
  - Formatted as `./list-credentials.sh` command output with status flags `[VERIFIED 200 OK]`.
- [ ] **Services Catalog & Detail (`/services`, `/services/[slug]`)**:
  - Catalog styled as `cat services.json | jq .` with syntax-colored keys and values.
  - Detail view formatted as a parsed JSON manifest with scope parameters.
- [ ] **Events Schedule & Detail (`/events`, `/events/[slug]`)**:
  - Rendered like a crontab schedule / calendar daemon log (`[CRON] 2026-10-14 09:00:00 PST`).
- [ ] **Contact Form (`/contact`)**:
  - Terminal interactive input shell: `./contact.sh --stdin` with prompt prompts (`INPUT: sender_name >`, `INPUT: email >`).

---

### Template 2: Minimal Swiss (`minimal_swiss`)
- [ ] **Header Navbar**:
  - High-contrast International Typographic Style header with hairline architectural dividers.
  - Monospaced edition stamp: `ARCHIVAL FOLIO // VOL. 26`.
  - Uppercase navigation index: `01 / ESSAYS`, `02 / CAREER`, `03 / SERVICES`, `04 / EVENTS`, `05 / CONTACT`.
- [ ] **Footer**:
  - Stark Swiss typographic footer with oversized copyright and grid coordinates.
- [ ] **Articles Index & Detail (`/articles`, `/articles/[slug]`)**:
  - Index: Dramatic oversized numbered index (`№ 01`, `№ 02`) with hairline rules and hover arrow translation (`→`).
  - Detail: High-contrast editorial broadsheet with massive headline, pull-quote margins, and stark archival metadata.
- [ ] **Career Timeline (`/experience`)**:
  - Architectural stage blocks (`STAGE 01`, `STAGE 02`) with monospaced date intervals and uppercase company stamps.
- [ ] **Achievements Index (`/achievements`)**:
  - Clean two-column typographic index with hairline divider lines and uppercase credential links.
- [ ] **Services Catalog & Detail (`/services`, `/services/[slug]`)**:
  - Architectural specification sheets (`SPEC // 01`, `SPEC // 02`) with bold price highlights and modular borders.
- [ ] **Events Schedule & Detail (`/events`, `/events/[slug]`)**:
  - Timetable format with date typography and location stamps.
- [ ] **Contact Form (`/contact`)**:
  - Minimalist broadsheet transmission form with sharp borders, uppercase labels, and `DISPATCH TRANSMISSION` CTA.

---

### Template 3: Aurora Studio (`aurora_studio`)
- [ ] **Header Navbar**:
  - Floating spatial frosted capsule (`backdrop-blur-2xl bg-zinc-900/40 border border-white/10`).
  - Ambient aurora light reflection and metallic border gradient line.
  - Pill navigation links and floating glowing contact capsule button.
- [ ] **Footer**:
  - Translucent frosted glass footer card with ambient bottom aurora flare.
- [ ] **Articles Index & Detail (`/articles`, `/articles/[slug]`)**:
  - Index: Spotlight frosted cards with category capsule pills and elevation micro-transitions.
  - Detail: Radiant glowing backdrop sphere, frosted reading panel, and spatial author card.
- [ ] **Career Timeline (`/experience`)**:
  - Floating translucent milestone capsules with metallic badges and glowing timeline connectors.
- [ ] **Achievements Index (`/achievements`)**:
  - Translucent glass accolade cards with ambient golden-amber lighting flares.
- [ ] **Services Catalog & Detail (`/services`, `/services/[slug]`)**:
  - Frosted studio capability packages with glowing neon price badges and checklist items.
- [ ] **Events Schedule & Detail (`/events`, `/events/[slug]`)**:
  - Frosted glass appearance schedule tiles with glowing location chips.
- [ ] **Contact Form (`/contact`)**:
  - Spatial frosted glass form with multi-stop radial aurora backdrop and radiant send button.

---

### Template 4: Bento Grid (`bento_grid`)
- [ ] **Header Navbar**:
  - Bento-inspired modular floating island navbar with grid status indicator and rounded-2xl geometry.
  - Compact icon-label tabs and quick action chip.
- [ ] **Footer**:
  - Modular multi-tile bento footer with system status and social connectivity blocks.
- [ ] **All Sub-Pages**:
  - Formatted in bento-box modular cards with high visual density, rounded-3xl corners, and tactile interactive tiles.

---

### Template 5: Fancy Creative (`fancy_creative`)
- [ ] **Header Navbar**:
  - Fluid gradient mesh navbar with floating glass effect, animated status ping, and gradient border.
- [ ] **Footer**:
  - High-impact gradient card footer with floating social pills and radial shine.
- [ ] **All Sub-Pages**:
  - Glowing gradient cards, animated status indicators, and expressive typography.

---

### Template 6: Simple Professional (`simple_professional`)
- [ ] **Header Navbar**:
  - Classic minimal resume navigation with discreet brand title and clean border separator.
- [ ] **Footer**:
  - Clean resume footer with copyright and direct back-to-top links.
- [ ] **All Sub-Pages**:
  - Structured chronological timeline, clean single/two-column reading layout, and continuous timeline ruler.

---

## 3. QA Execution & Review Protocol

The Reviewer Agent (`workflow_reviewer`) must execute this step-by-step verification:

1. **Build Test**: Run `pnpm build` and verify 0 TypeScript/lint errors across all App Router routes.
2. **Visual Inspection**:
   - Set template via test script or Theme Studio.
   - Test endpoints: `/sarah`, `/sarah/articles`, `/sarah/articles/[slug]`, `/sarah/experience`, `/sarah/achievements`, `/sarah/services`, `/sarah/services/[slug]`, `/sarah/events`, `/sarah/events/[slug]`, `/sarah/contact`.
   - Verify Header Navbar is unique to that template.
   - Verify every sub-page inherits that template's specific design language.
3. **Approval & Commit**: If all criteria pass, commit with descriptive Git commit message and approve moving to the next template.
