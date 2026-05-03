# Mobile UI Kit — Kcal (Binance × Fitia)

A high-fidelity, interactive recreation of the Kcal app — a Binance-styled mobile calorie counter.

Open `index.html` to see the kit running inside an iPhone frame. Use the segmented controls above the device to jump between screens; tap the yellow `+` in the tab bar (or "Add food" / "Food detail" in the controls) to launch the bottom sheets.

## Files

| File | What's in it |
|---|---|
| `index.html` | Stage. Loads React + Babel, wires the iOS frame and the 5 screens. |
| `ios-frame.jsx` | iOS device frame (starter component). Status bar + dynamic island + home indicator. |
| `components.jsx` | The shared component library. **Use these to build new screens.** |
| `screens.jsx` | The 5 screens + 2 sheets, all built from `components.jsx`. |

## Components (in `components.jsx`)

All exposed on `window` so other Babel scripts can pick them up.

- `KTopBar({ left, title, sub, right })` — sticky title with mono uppercase subtitle
- `KIconBtn({ glyph, color, onClick })` — 36×36 circular icon button
- `KTabBar({ active, onChange, onPlus })` — bottom tab bar with center yellow FAB
- `KCalorieRing({ size, consumed, target, mode })` — the dashboard hero. `mode` is `'remaining'` or `'consumed'`; tapping toggles in `HomeScreen`.
- `KMacroBar({ name, consumed, target, color })` — vertical macro tile with progress
- `KStatCard({ label, value, unit, delta, deltaColor })` — small numeric card
- `KFoodRow({ thumb, thumbColor, name, meta, kcal })` — order-book style log row
- `KMealHeader({ name, time, kcal, target, onAdd })` — breakfast/lunch/dinner/snack section header
- `KSegmented({ options, value, onChange })` — pill segmented control
- `KPill({ children, variant })` — variants: `default` `pos` `neg` `brand`
- `KBtn({ children, variant, full, sm })` — variants: `primary` `ghost` `pos` `neg`
- `KSparkline({ points, w, h, color })` — area chart
- `KAvatar({ initials, size })` — yellow circle with mono initials

## Screens (in `screens.jsx`)

1. **HomeScreen** — dashboard. Big calorie ring (tap to toggle remaining/consumed), macro bars, stat cards, today's log preview, weight sparkline.
2. **PlanScreen** — full daily food log, broken into Breakfast / Lunch / Dinner / Snack sections with `KMealHeader`. Empty state for dinner. Snack-over-target warning row.
3. **StatsScreen** — period segmented control (D/W/M/Y), weekly bar chart, macro distribution, weight trend, full macro "order book."
4. **MeScreen** — profile, active goal block, BMR/NEAT/EAT breakdown, settings list with mono glyphs.
5. **FoodDetailScreen** (sheet) — portion stepper, macro split bar, per-100g nutrition table, sticky add-CTA.
6. **AddFoodSheet** (sheet) — search bar, photo/barcode/voice/manual chips, verified-results list with inline + buttons.

## Style notes

- All numbers use `JetBrains Mono` with `tabular-nums`.
- All labels use mono UPPERCASE with `letter-spacing: 0.06em`.
- Yellow is reserved for: primary buttons, active tab, calorie ring fill, today's bar, FAB, segmented active state, and pill `brand`.
- The bottom tab bar has `backdrop-filter: blur(20px)` over a 78%-opaque base.
- All transitions are 120–180ms with `cubic-bezier(0.2, 0, 0, 1)`.

## Caveats

- This is a **recreation from public materials** (Binance brand guides, Fitia product pages, App Store screenshots). I had no access to either company's Figma or codebase, so component dimensions are approximate, not pixel-exact.
- Icons in this kit use Unicode glyphs as placeholders. The real Lucide icon set should be substituted in production — see the iconography section in the root README.
