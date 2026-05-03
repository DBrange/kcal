# Kcal — Binance-style Calorie App Design System

> A nutrition tracker that looks and feels like a crypto exchange. Trading floor energy applied to the question: **what did you eat today, and what's your daily balance?**

This is a **fictional / portfolio** design system. It mashes up two real products:

- **[Fitia](https://fitia.app)** — AI-powered calorie counter, meal planner, fasting tracker. 10M+ users.
- **[Binance](https://binance.com)** — the world's largest crypto exchange, known for its bold yellow-on-near-black visual identity ("trading floor urgency on monochrome surfaces").

The result is **Kcal** — a hypothetical product where:
- Your daily calorie budget is a **balance**.
- Eating something is a **sell** (red, debit). Burning calories or coming under target is a **buy** (green, credit).
- Macros (protein / carbs / fat) are tracked like **portfolio holdings** with daily % moves.
- The food log reads like an **order book**: dense, monospaced, time-stamped.
- Streaks, fasting windows and weight trends are charted with **candle-like visuals**.

The point of this project is to define the brand foundations, type, color, components, and mobile UI kit precisely enough that a designer or AI agent can confidently produce more screens, marketing pages, slides, or campaigns in this style.

---

## Sources & inspiration

This system was built **without** an attached codebase or Figma file. The visual language was reconstructed from public material:

- Binance design retrospective: [absinthewu — "Binance Design System Development"](https://medium.com/@absinthewu/binance-design-system-development-776272415cbf) — confirms white/black + brand yellow for primary actions, green for navigation/positive, red for warnings, and the move from DIN Next to a custom "Binance Plex."
- [Binance.US Facet design system](https://blog.binance.us/new-app-design/) — confirms Inter as the modern app typeface, brighter yellow direction.
- [Mobbin — Binance brand colors](https://mobbin.com/colors/brand/binance) — Shark `#1E2329`, White `#FFFFFF`, Bright Sun `#FCD535`.
- [Design Pieces / Brand Palettes / Online Palette](https://www.designpieces.com/palette/binance-color-palette-hex-and-rgb/) — Binance Gold `#F0B90B`, Binance Black `#0C0E12`.
- [Fitia features page](https://fitia.app/features/) and [Fitia App Store listing](https://apps.apple.com/us/app/fitia-calorie-counter-diet/id1448277011) — feature inventory: photo/voice/barcode logging, meal plan tabs (Breakfast/Lunch/Dinner/Snack), water, fasting, weight & body measurements, teams, recipes.
- [ScreensDesign — Fitia walkthrough](https://screensdesign.com/showcase/fitia-diet-meal-planner) — interaction details: tappable calorie ring toggles between consumed/remaining, copy-paste meal plans across days.

> ⚠️ **Caveat — no real code/Figma to mirror.** This means components are inspired-by, not pixel-perfect copies. If you have access to either Binance's or Fitia's internal design files, drop them into this project and I'll re-derive tokens against them.

---

## Index

| File / folder | Purpose |
|---|---|
| `README.md` | You are here. Brand context, content & visual foundations, iconography. |
| `colors_and_type.css` | All color and typography CSS variables. Import this in any new file. |
| `fonts/` | Local copies and `@font-face` declarations for the type system. |
| `assets/` | Logos, brand marks, app icon, illustrative imagery. |
| `preview/` | Small HTML cards that render in the project's Design System tab. |
| `ui_kits/mobile/` | The flagship UI kit — interactive iPhone-frame mock of the Kcal app with 5 core screens and a full component library. |
| `SKILL.md` | Agent skill manifest. Lets this folder be invoked as a skill in Claude Code. |

---

## CONTENT FUNDAMENTALS

Kcal copy borrows the **terse, ticker-tape register** of a crypto exchange and applies it to nutrition. The voice is informed, slightly clinical, never preachy. We never shame the user, never use exclamation marks, never use emoji as decoration.

### Voice & tone
- **Direct, factual, second person.** "You're 320 kcal under budget" — not "Great job, you're under!" and not "I see you're under budget."
- **Numbers come first.** Headlines lead with a number whenever one is relevant. `+12g protein today` beats `You ate more protein today`.
- **No motivational fluff.** No "You got this!", no "Crushing it!", no streak fireworks. A streak is just a number with a label, like an APR.
- **No food moralising.** Never "guilty," "cheat," "naughty," "bad," "treat yourself." Food is data.
- **Parity with trading vocabulary** where it earns its keep:
  - Daily calorie budget → **Balance**
  - Eating → **Spend** or **Debit**
  - Burning / coming under → **Credit**
  - Macros → **Holdings**
  - 7-day weight trend → **Chart** (candle view available)
  - Streak days → **Streak** (no flame emoji; just a number)
  - Per-meal lines → **Orders**

### Casing
- **Sentence case for UI** ("Add food", "Log weight") — never Title Case for buttons.
- **UPPERCASE for labels and tickers** (`KCAL`, `PROTEIN`, `STREAK`, `BMR`) — small, tracked, almost always in the mono font.
- **Numeric formatting:** thousands separators on counts (`1,847 kcal`), one decimal on weight (`72.4 kg`), no decimals on macros (`148g protein`). Negative deltas use a minus sign, never parentheses (`-320` not `(320)`).

### I vs. you
- **You.** Always. Never "I" or "we." The app is an instrument, not a friend.
  - ✅ "You're 320 kcal under today's target."
  - ❌ "I'd recommend eating more protein."
  - ❌ "We've calculated…"

### Emoji?
**No.** Never as decoration, never in copy, never in section headers. Brand surfaces use the icon set in `assets/icons/` and Lucide as the fallback. The single exception: the app's own logo glyph.

### Examples in the wild

| Context | Do | Don't |
|---|---|---|
| Empty meal slot | `Add to lunch` | `Time for lunch! 🍽️` |
| Over budget | `+184 kcal over` | `Oops, you went over!` |
| Streak | `STREAK · 12d` | `🔥 12 day streak — keep it up!` |
| Macro met | `Protein · target met` | `Great job hitting protein! 🎉` |
| Weight logged | `72.4 kg · -0.3 vs. last week` | `You've lost 0.3kg, woohoo!` |
| Push notification | `Lunch window opens in 12m` | `Hey there! Time for lunch 😋` |

---

## VISUAL FOUNDATIONS

### Mood
**Dark by default. Dense. Confident. Numerate.** The product takes itself seriously the way a Bloomberg terminal or a trading app does. Whitespace is purposeful but not generous. The eye should land on numbers first, labels second, chrome last.

### Color
- **Foundation is monochrome.** Near-black surfaces (`#0B0E11` background, `#181A20` cards, `#1E2329` row dividers) with white text at three opacities (primary `#EAECEF`, secondary `#B7BDC6`, tertiary `#848E9C`).
- **Brand yellow `#FCD535`** is reserved almost exclusively for **the most important call to action on screen** — the primary button, the active tab indicator, the calorie ring fill. Never decorative.
- **Semantic green `#0ECB81`** for under-budget, gain, positive deltas, success, navigation links. Semantic red `#F6465D` for over-budget, loss, errors.
- A light theme exists but is secondary. Default to dark.
- See `colors_and_type.css` for the full token list.

### Type
- **Inter** as the primary UI typeface (open-source substitute for Binance Plex). Weights 400 / 500 / 600 / 700.
- **JetBrains Mono** for all numbers, tickers, percentages, time stamps, and tabular columns. This is the single biggest visual signature after the yellow.
- Display sizes are big and tight: 32–56px display headlines, `letter-spacing: -0.02em`, `font-weight: 600`.
- Body sits at 14–15px. Labels at 11–12px UPPERCASE with `letter-spacing: 0.06em`.

### Spacing
- 4px base grid. Tokens: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 64`.
- Card internal padding is 16px; outer screen padding is 16px on mobile.
- Row height for log items is **56px** — tight enough to feel like a market table.

### Backgrounds
- **No photography on chrome.** No gradient washes, no decorative imagery, no patterns or textures. Surfaces are flat solid colors.
- The **only** background ornaments are: (1) thin grid lines under sparklines/candles, (2) subtle radial gradient behind the calorie ring on the dashboard, (3) the yellow-to-amber gradient inside the brand mark.
- Marketing/onboarding screens may use a single full-bleed product photo with a 60% black overlay — never on the running app surface.

### Animation
- **Sharp and short.** All transitions 120–200ms. Default easing is `cubic-bezier(0.2, 0, 0, 1)` (snappy out, no bounce).
- Numbers count up/down with 400ms ease-out when a value changes (`tabular-nums` so columns don't reflow).
- No page-load shimmers; use a flat `#1E2329` skeleton block instead.
- No bouncy springs, no parallax, no Lottie celebrations. Nothing wiggles.

### States
- **Hover (web):** brighten by ~6% on dark surfaces, darken by ~6% on the yellow brand color. Never change hue.
- **Press:** scale `0.98` for buttons + 80ms duration. No haptic-style ripple.
- **Disabled:** drop opacity to 0.32 on the existing color. Never grey out.
- **Focus:** 2px ring in brand yellow at 50% opacity, `outline-offset: 2px`.

### Borders & dividers
- Dividers are **1px solid `#2B3139`** — barely visible but always present. They define rows, not cards.
- Cards have **no border** by default. They sit on the page via background contrast alone.
- Selected/active inputs gain a 1px yellow border.

### Shadows
- Almost none on chrome. Cards do not float.
- The single allowed elevation: bottom sheets and modals use `0 -8px 32px rgba(0,0,0,0.5)` against the dimmed page.
- The calorie ring on the dashboard uses an inner glow (`box-shadow: inset 0 0 24px rgba(252,213,53,0.15)`) — that's the closest thing to a decorative shadow in the system.

### Corner radii
- Tokens: `0 / 4 / 8 / 12 / 999`.
- Buttons & inputs: **8px**.
- Cards & sheets: **12px**.
- Pills, tags, segmented controls, the calorie ring: **999px** (full).
- Avatars are circular. Food thumbnails are 8px.

### Transparency & blur
- Used sparingly. The bottom tab bar has a `backdrop-filter: blur(20px)` over a 70% opaque base color. Modal dimmers are 60% black.
- Body content does **not** sit on translucent panels — that's a "consumer health app" trope we explicitly avoid.

### Imagery
- Food photos: high-contrast, slightly cool color grade, dark backgrounds, no props, top-down or 3/4 angle. Think delivery-app catalog photography, not lifestyle Instagram.
- People: rare. If used, b&w or near-monochrome with a yellow rim-light.
- We default to **showing data, not pictures**. A plate is a row, not a hero image.

### Layout rules
- **Bottom tab bar is fixed** with a translucent blur background on mobile.
- **Top bar is sticky** but hides on scroll-down, returns on scroll-up.
- **The primary CTA "+" sits in the bottom tab bar** as a yellow circle, sticking up ~8px above the bar (Binance's exchange-tab pattern).
- Numbers always **right-align** in tables. Labels left-align.

### Iconography
See **ICONOGRAPHY** below.

---

## ICONOGRAPHY

Kcal uses a **single-weight 1.5px stroke, 24×24 grid icon system**. Lines have rounded caps and joins. No fills, no two-tone, no color (icons inherit `currentColor`).

- **Set:** [Lucide](https://lucide.dev) loaded from `unpkg.com/lucide@latest`. Lucide is a continuation of Feather Icons and matches the Binance aesthetic almost exactly out of the box — same stroke weight, same minimal style, same 24×24 grid.
  - ⚠️ **Substitution flag:** Binance ships its own custom icon set (called "Bicon" internally). I don't have access to it, so Lucide is the substitute. If you have the Binance icon font, drop the SVGs into `assets/icons/` and update `colors_and_type.css` to point at them.
- **Color usage:** icons are `var(--fg-1)` (high-emphasis white) when active, `var(--fg-2)` when secondary, `var(--brand)` when the only thing they'd compete with is brand yellow.
- **Sizes:** 16 / 20 / 24 / 32. Tab bar icons are 24, button icons are 20, list icons are 20, large hero icons (empty states) are 32.
- **Logo:** the `K` mark in `assets/logo-mark.svg` is the only "filled" glyph in the system. It's used at 24–48px in headers and at 96px on the splash screen.
- **Emoji & unicode glyphs:** never as iconography. The only Unicode allowed in copy is the en-dash `–`, em-dash `—`, and minus sign `−` (use the real minus sign for negative numbers, not a hyphen).
- **Food thumbnails:** square, 48×48 in lists, 8px radius. When a real photo is missing, show a flat-color square with the food's first letter in `JetBrains Mono Bold` — same visual language as a placeholder ticker.

---

## File index

```
README.md              ← brand, content, visuals, iconography (this file)
SKILL.md               ← agent skill manifest (Claude Code compatible)
colors_and_type.css    ← all design tokens as CSS variables
fonts/                 ← Inter + JetBrains Mono (woff2)
assets/
  logo-mark.svg        ← K mark, the only filled glyph in the system
  logo-full.svg        ← horizontal lockup
  app-icon.svg         ← squircle app icon
  brand-bg.svg         ← marketing/splash background
preview/               ← Design System tab reference cards
ui_kits/
  mobile/              ← flagship UI kit (iPhone, 5 screens, full component lib)
    README.md          ← component inventory + screen list
    index.html         ← interactive stage
    components.jsx     ← KCalorieRing, KMacroBar, KFoodRow, KTabBar, ...
    screens.jsx        ← Home / Plan / Stats / Me + AddFood + FoodDetail sheets
    ios-frame.jsx      ← iOS device frame
```

For details on the mobile app, see `ui_kits/mobile/README.md`.
