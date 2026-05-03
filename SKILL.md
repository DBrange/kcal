---
name: kcal-design
description: Use this skill to generate well-branded interfaces and assets for Kcal — a fictional Binance-styled mobile calorie counter (Binance × Fitia). Contains essential design guidelines, colors, type, fonts, assets, and a mobile UI kit for prototyping screens, slides, marketing pages, or production code in this style.
user-invocable: true
---

Read the `README.md` file within this skill first — it covers brand context, content fundamentals (voice, casing, "you" vs "I", no emoji), visual foundations (dark monochrome surfaces, single brand yellow `#FCD535`, semantic green/red, Inter + JetBrains Mono, 4px grid, 8/12/999 radii, 120–200ms animations), and iconography (Lucide stroke icons).

Then explore:

- `colors_and_type.css` — all CSS custom properties for colors and type. Import this in any new HTML file you produce.
- `fonts/` — local Inter and JetBrains Mono fonts referenced by `colors_and_type.css`.
- `assets/` — logo mark, full logo, app icon, brand background. Copy these out when needed.
- `ui_kits/mobile/` — flagship UI kit. Read its `README.md` for the component inventory (`KCalorieRing`, `KMacroBar`, `KStatCard`, `KFoodRow`, `KMealHeader`, `KSegmented`, `KPill`, `KBtn`, `KSparkline`, `KAvatar`, `KTopBar`, `KTabBar`) and the 5 screens. Reuse these components — don't reinvent them.
- `preview/` — small reference cards rendering the design system in the project's Design System tab.

If you're producing **visual artifacts** (slides, mocks, throwaway prototypes, marketing pages), copy assets out of `assets/` and `fonts/` into the artifact's folder and write a self-contained HTML file. Always link `colors_and_type.css` (or inline its variables).

If you're working on **production code**, copy what you need and treat the rules in `README.md` as the spec — particularly the content-tone rules (numbers first, no motivational copy, no emoji, sentence-case UI, UPPERCASE mono labels) and the layout rules (right-align numbers, fixed translucent tab bar, primary "+" FAB in the tab bar, 56px log row, no decorative shadows).

If the user invokes this skill **without other guidance**, ask them what they want to build (single screen? full flow? marketing page? slide deck?), then a few targeted questions (which screen / which component / dark only or both themes / how many variations), and act as an expert designer. Output HTML artifacts unless they ask for production code.

**Never** introduce visual motifs that are not in this system: no purple-blue gradients, no emoji, no rounded-left-border accent cards, no decorative drop shadows, no playful springs or bounces. The brand is data-dense, monochrome, yellow-accented. When in doubt, fewer pixels.
