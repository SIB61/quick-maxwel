# Portfolio Builder — UI/UX Design System & Spacing Guidelines

A unified, mathematically consistent design language built for modern web applications. This specification standardizes spatial rhythm, component geometry, typography scales, and padding hierarchy across all layers of the application.

---

## 1. Spatial Grid & Spacing Scale (8pt System)

All layouts and component dimensions align to an **8pt primary grid** (with a **4pt sub-grid** for micro-alignments):

| Token | Pixels | Rem Equivalent | Primary Usage |
| :--- | :--- | :--- | :--- |
| **`space-1`** | 4px | `0.25rem` | Icon-to-text gaps, badge internal spacing |
| **`space-1.5`** | 6px | `0.375rem` | Micro padding in tags, compact buttons |
| **`space-2`** | 8px | `0.5rem` | Label-to-input gap, header title-to-description |
| **`space-3`** | 12px | `0.75rem` | Card internal element stacks, button padding horizontal |
| **`space-4`** | 16px | `1.0rem` | Default component gap, compact card padding |
| **`space-5`** | 20px | `1.25rem` | Form field-to-field separation (`space-y-5`) |
| **`space-6`** | 24px | `1.5rem` | Standard card internal padding (`p-6`), sub-section gap |
| **`space-8`** | 32px | `2.0rem` | Large card padding (`p-8`), major layout section gaps |
| **`space-10`** | 40px | `2.5rem` | Dashboard widget gaps, hero section rhythm |
| **`space-12`** | 48px | `3.0rem` | Page section spacing (`py-12`) |
| **`space-16`** | 64px | `4.0rem` | Major landing page vertical rhythm (`py-16` or `space-y-16`) |
| **`space-24`** | 96px | `6.0rem` | Hero banners and empty state vertical breathing room |

---

## 2. Card Anatomy & Padding Hierarchy

```
+-------------------------------------------------------------------+
|  Card Container                                                   |
|  Padding: p-6 (mobile: 24px) | p-8 (desktop: 32px)               |
|  Radius: rounded-2xl (16px) | Border: border-zinc-800/80         |
|                                                                   |
|  [Header]                                                         |
|  Title: text-xl / text-2xl font-bold tracking-tight               |
|  --- space-y-2 (8px gap) ---                                      |
|  Description: text-sm text-zinc-400 leading-relaxed               |
|                                                                   |
|  --- gap-6 (24px gap to content) ---                              |
|                                                                   |
|  [Content / Form Body]                                            |
|  Field Stack: space-y-5 (20px between fields)                     |
|  Field Inner: space-y-2 (8px label to input)                      |
|                                                                   |
|  --- gap-6 (24px gap to footer) ---                               |
|                                                                   |
|  [Footer]                                                         |
|  Action Button: h-11 (44px touch target)                          |
|  Secondary Link: pt-4, text-sm text-zinc-400                       |
+-------------------------------------------------------------------+
```

### Specific Card Presets:
1. **Authentication Card (`max-w-[440px]`)**:
   - Outer padding: `p-7 sm:p-8` (28px - 32px)
   - Header gap: `space-y-2` (8px)
   - Content gap: `space-y-5` (20px)
   - Button: `h-11` (44px), `w-full`, `rounded-xl`
   - Footer: `pt-5 mt-2 border-t border-zinc-800/80 text-center`
2. **Dashboard Metric Tile (`grid-cols-2 md:grid-cols-3 lg:grid-cols-6`)**:
   - Padding: `p-5` (20px)
   - Radius: `rounded-xl` (12px)
   - Internal vertical gap: `space-y-3`
3. **Portfolio Content Card (Articles, Services, Events)**:
   - Padding: `p-6 sm:p-7` (24px - 28px)
   - Radius: `rounded-2xl` (16px)
   - Gap between cards: `gap-6` (24px)

---

## 3. Form & Input Geometry

Form elements must adhere strictly to ergonomic touch targets and proportional optical margins:

```
[Label]             text-xs font-semibold tracking-wide uppercase text-zinc-300
                    ↓ (margin-bottom: 8px / mb-2)
[Input Container]   h-11 (44px) | rounded-xl | bg-zinc-950/60 | border-zinc-800
                    Left Icon: left-3.5 (14px) | size-4 (16px)
                    Input Padding: pl-10 pr-4 (40px left for icon, 16px right)
                    Font Size: text-sm (14px)
                    ↓ (gap to next field: 20px / space-y-5)
```

### Input Rules:
- **Height**: Standard inputs and select triggers are strictly `h-11` (44px).
- **Textarea**: Default to `min-h-[120px] p-3.5 text-sm leading-relaxed`.
- **Icon Alignment**: Left icons are positioned with `absolute left-3.5 top-1/2 -translate-y-1/2`.
- **Autofill Compatibility**: Enforce `-webkit-box-shadow: 0 0 0 1000px #09090b inset` to prevent browser color bleed.

---

## 4. Typography Scale & Line Heights

| Style | Tailwind Class | Font Size | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `text-4xl sm:text-6xl font-extrabold` | 36px / 60px | `leading-[1.1]` | `-0.025em` (tight) |
| **Section Title** | `text-2xl sm:text-3xl font-bold` | 24px / 30px | `leading-tight` | `-0.02em` |
| **Card Heading** | `text-lg sm:text-xl font-bold` | 18px / 20px | `leading-snug` | `-0.015em` |
| **Body Large** | `text-base sm:text-lg` | 16px / 18px | `leading-relaxed` | `normal` |
| **Body Default** | `text-sm text-zinc-300` | 14px | `leading-relaxed` | `normal` |
| **Meta / Small** | `text-xs text-zinc-400` | 12px | `leading-normal` | `normal` |
| **Form Label** | `text-xs sm:text-sm font-medium` | 12px / 14px | `leading-none` | `+0.01em` |

---

## 5. Layout Containers & Section Rhythm

- **Global Page Max-Widths**:
  - Auth Modals & Single Forms: `max-w-[440px]`
  - Editorial Articles & Timelines: `max-w-3xl` (768px)
  - Bento Grids & Portfolios: `max-w-5xl` (1024px)
  - Admin Dashboard & Landing Page: `max-w-6xl` (1152px)
- **Container Horizontal Padding**:
  - Mobile (`<640px`): `px-4` or `px-5`
  - Tablet (`640px - 1024px`): `px-6`
  - Desktop (`>1024px`): `px-8`
- **Vertical Spacing Between Sections**:
  - Landing & Portfolio pages: `space-y-16 sm:space-y-20` (64px - 80px)
  - Dashboard: `space-y-8 sm:space-y-10` (32px - 40px)
