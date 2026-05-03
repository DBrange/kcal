# assets/

Brand visual files for Kcal.

| File | Use |
|---|---|
| `logo-mark.svg` | Square brand mark. The four-rhombus K glyph (riff on Binance's binary mark, with one rhombus tinted darker for emphasis). Use at 24–96px. |
| `logo-lockup.svg` | Mark + "KCAL /EXCH" wordmark. Use in app headers, marketing footers. |
| `app-icon.svg` | iOS/Android app icon, 256×256 grid with rounded corners and a subtle dark gradient. |

## Iconography (in-product)

In-product icons come from **[Lucide](https://lucide.dev)**, loaded from CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

⚠️ Lucide is a **substitute** for Binance's internal "Bicon" set — same stroke style and grid, but if the official set is available drop the SVGs in `assets/icons/` and update components to point there.
