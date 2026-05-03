/* Kcal — Shared Components
 * StatusBar, BottomNav, WeekStrip, CalorieWidget, MacroBar, FoodCard, MealSection, etc.
 * Plain functional components, exposed on window for cross-script use.
 */

/* ============ ICONS (Lucide-style outline, 1.5px) ============ */
const Icon = ({ name, size = 20, color = "currentColor", strokeWidth = 1.75, ...rest }) => {
  const paths = {
    home:        <><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></>,
    search:      <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    plus:        <><path d="M12 5v14M5 12h14"/></>,
    chart:       <><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/></>,
    user:        <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></>,
    chevronLeft: <><path d="m15 18-6-6 6-6"/></>,
    chevronRight:<><path d="m9 18 6-6-6-6"/></>,
    chevronDown: <><path d="m6 9 6 6 6-6"/></>,
    chevronUp:   <><path d="m6 15 6-6 6 6"/></>,
    flame:       <><path d="M12 2c0 4-4 5-4 9a4 4 0 0 0 8 0c0-2-2-3-2-5"/><path d="M9 14a3 3 0 0 0 6 0c0-1.5-1-2-1-3"/></>,
    droplet:     <><path d="M12 2.5C8 7 5 10 5 14a7 7 0 0 0 14 0c0-4-3-7-7-11.5z"/></>,
    camera:      <><path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="4"/></>,
    barcode:     <><path d="M3 5v14M6 5v14M9 5v14M13 5v14M16 5v14M19 5v14"/></>,
    star:        <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9z"/></>,
    bell:        <><path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/><path d="M10 20a2 2 0 0 0 4 0"/></>,
    settings:    <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5"/></>,
    check:       <><path d="m4 12 5 5L20 6"/></>,
    x:           <><path d="M5 5l14 14M19 5 5 19"/></>,
    arrowRight:  <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowLeft:   <><path d="M19 12H5M11 5l-7 7 7 7"/></>,
    arrowUp:     <><path d="M12 19V5M5 12l7-7 7 7"/></>,
    arrowDown:   <><path d="M12 5v14M5 12l7 7 7-7"/></>,
    coffee:      <><path d="M3 8h13v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M16 8h2a3 3 0 0 1 0 6h-2"/><path d="M6 3v2M10 3v2M14 3v2"/></>,
    utensils:    <><path d="M3 3v8a3 3 0 0 0 6 0V3"/><path d="M6 13v8"/><path d="M18 3v18"/><path d="M18 13a4 4 0 0 1 0-8"/></>,
    moon:        <><path d="M19 14.5A8 8 0 0 1 9.5 5a7 7 0 1 0 9.5 9.5z"/></>,
    cookie:      <><circle cx="12" cy="12" r="9"/><circle cx="9" cy="9" r=".7" fill="currentColor"/><circle cx="14" cy="13" r=".7" fill="currentColor"/><circle cx="10" cy="15" r=".7" fill="currentColor"/></>,
    sliders:     <><path d="M4 6h10M18 6h2"/><circle cx="16" cy="6" r="2"/><path d="M4 12h2M10 12h10"/><circle cx="8" cy="12" r="2"/><path d="M4 18h12M20 18h0"/><circle cx="18" cy="18" r="2"/></>,
    scale:       <><path d="M3 7h18l-2 12H5z"/><path d="M9 11h6"/></>,
    pill:        <><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M8.5 7.5l7 7"/></>,
    book:        <><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 17a3 3 0 0 1 3-3h12"/></>,
    edit:        <><path d="M12 20h9"/><path d="M16 4l4 4L8 20H4v-4z"/></>,
    info:        <><circle cx="12" cy="12" r="9"/><path d="M12 8v.5M11 12h1v5h1"/></>,
    share:       <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></>,
    clock:       <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    target:      <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></>,
    trending:    <><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
    grid:        <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

/* ============ STATUS BAR (iOS) ============ */
const StatusBarKcal = ({ time = "9:41", dark = false }) => (
  <div style={{
    height: 47, padding: "14px 24px 0", display: "flex",
    justifyContent: "space-between", alignItems: "center",
    fontFamily: "var(--font-sans)",
    color: dark ? "#fff" : "var(--text-primary)",
    fontSize: 16, fontWeight: 600, letterSpacing: "-0.2px",
  }}>
    <span className="tabular">{time}</span>
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {/* signal */}
      <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
        <rect x="0" y="7" width="3" height="4" rx="0.6"/>
        <rect x="5" y="5" width="3" height="6" rx="0.6"/>
        <rect x="10" y="2" width="3" height="9" rx="0.6"/>
        <rect x="15" y="0" width="3" height="11" rx="0.6"/>
      </svg>
      {/* wifi */}
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M1 4a11 11 0 0 1 14 0M3.5 6.5a7 7 0 0 1 9 0M6 9a3 3 0 0 1 4 0"/>
      </svg>
      {/* battery */}
      <svg width="26" height="12" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="0.8">
        <rect x="0.5" y="0.5" width="22" height="11" rx="2.5"/>
        <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor"/>
        <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill="currentColor"/>
      </svg>
    </div>
  </div>
);

/* ============ BOTTOM NAV ============ */
const BottomNav = ({ active = "home" }) => {
  const items = [
    { id: "home",   label: "Hoy",       icon: "home" },
    { id: "stats",  label: "Progreso",  icon: "chart" },
    { id: "add",    label: "",          icon: "plus", primary: true },
    { id: "recipe", label: "Recetas",   icon: "book" },
    { id: "me",     label: "Yo",        icon: "user" },
  ];
  return (
    <div style={{
      borderTop: "1px solid var(--border)",
      background: "var(--bg)",
      padding: "8px 8px 28px",
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
      gap: 4,
    }}>
      {items.map(it => {
        const isActive = it.id === active;
        if (it.primary) {
          return (
            <div key={it.id} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: "var(--primary-500)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0B0E11",
              }}>
                <Icon name="plus" size={22} strokeWidth={2.5} />
              </div>
            </div>
          );
        }
        return (
          <div key={it.id} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
            paddingTop: 6,
          }}>
            <Icon name={it.icon} size={22} strokeWidth={isActive ? 2 : 1.6} />
            <span style={{ fontSize: 10.5, fontWeight: isActive ? 600 : 500 }}>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
};

/* ============ WEEK STRIP (top of Home) ============ */
const WeekStrip = ({ activeIndex = 6, days = null }) => {
  // Default: a week with today at the end (sun, may 3)
  const defaultDays = [
    { letter: "L", num: 27, kcal: 1980, target: 2247 },
    { letter: "M", num: 28, kcal: 2310, target: 2247 },
    { letter: "M", num: 29, kcal: 2150, target: 2247 },
    { letter: "J", num: 30, kcal: 2400, target: 2247 },
    { letter: "V", num:  1, kcal: 2089, target: 2247 },
    { letter: "S", num:  2, kcal: 2533, target: 2247 },
    { letter: "D", num:  3, kcal: 1842, target: 2247, today: true },
  ];
  const data = days || defaultDays;
  return (
    <div style={{
      padding: "6px 12px 10px",
      display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
      gap: 4,
    }}>
      {data.map((d, i) => {
        const active = i === activeIndex;
        const pct = Math.min(d.kcal / d.target, 1.15);
        // tiny bar height representing % of target
        const barH = Math.round(pct * 18);
        const overshoot = d.kcal > d.target;
        return (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            paddingTop: 4, paddingBottom: 6,
            borderRadius: 10,
            background: active ? "var(--surface-2)" : "transparent",
          }}>
            <div style={{
              fontSize: 10, fontWeight: 600,
              color: active ? "var(--text-primary)" : "var(--text-tertiary)",
              textTransform: "uppercase", letterSpacing: 0.4,
            }}>{d.letter}</div>
            <div style={{
              fontSize: 14, fontWeight: 600,
              color: active ? "var(--text-primary)" : "var(--text-secondary)",
            }} className="tabular">{d.num}</div>
            <div style={{
              width: 18, height: 20, display: "flex", alignItems: "flex-end",
              justifyContent: "center",
            }}>
              <div style={{
                width: 4, height: barH, borderRadius: 2,
                background: overshoot ? "var(--danger-500)" : (active ? "var(--primary-500)" : "var(--border-strong)"),
              }}/>
            </div>
            {d.today && (
              <div style={{
                width: 4, height: 4, borderRadius: 999,
                background: "var(--primary-500)", marginTop: -2,
              }}/>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ============ CALORIE WIDGET (Fitia-inspired curved bar) ============ */
const CalorieWidget = ({
  consumed = 1842,
  target = 2247,
  lower = 2022,
  upper = 2471,
  protein = { current: 124, target: 168 },
  carbs   = { current: 198, target: 252 },
  fat     = { current: 62,  target: 75  },
  date = "Dom, 3 may",
  streak = 12,
  variant = "curve", // curve | ring | donut
}) => {
  return (
    <div style={{
      background: "var(--bg)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      margin: "8px 16px 0",
      padding: "16px 18px 18px",
    }}>
      {/* Top row: streak | date | avatar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 14,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ color: "var(--primary-500)", display: "flex" }}>
            <Icon name="flame" size={18} strokeWidth={2}/>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600 }} className="tabular">{streak}</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>{date}</div>
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          background: "var(--info-500)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600,
        }}>D</div>
      </div>

      <div style={{ height: 1, background: "var(--divider)", margin: "0 -18px 18px" }}/>

      {/* Calorie display */}
      {variant === "curve" && (
        <CalorieCurve consumed={consumed} target={target} lower={lower} upper={upper}/>
      )}
      {variant === "ring" && (
        <CalorieRing consumed={consumed} target={target}/>
      )}
      {variant === "donut" && (
        <CalorieDonut consumed={consumed} target={target} protein={protein} carbs={carbs} fat={fat}/>
      )}

      <div style={{ height: 1, background: "var(--divider)", margin: "18px -18px 14px" }}/>

      {/* Macros */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        <MacroBlock label="Proteínas" current={protein.current} target={protein.target} unit="g" color="var(--macro-protein)"/>
        <MacroBlock label="Carbos"    current={carbs.current}   target={carbs.target}   unit="g" color="var(--macro-carbs)"/>
        <MacroBlock label="Grasas"    current={fat.current}     target={fat.target}     unit="g" color="var(--macro-fat)"/>
      </div>
    </div>
  );
};

const CalorieCurve = ({ consumed, target, lower, upper }) => {
  // Curve from 0 to 1.2× target, with markers at lower/upper bounds
  const max = target * 1.25;
  const pct = Math.min(consumed / max, 1);
  const lowPct = lower / max;
  const upPct  = upper / max;
  const w = 280, h = 60;
  // Curve: a slight upward arc
  const pathBase = `M 8 ${h - 10} Q ${w/2} ${h - 36} ${w - 8} ${h - 10}`;
  const filledLen = pct;

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.6px" }} className="tabular">
          {consumed.toLocaleString()}
        </span>
        <span style={{ fontSize: 18, fontWeight: 500, color: "var(--text-secondary)" }} className="tabular">
          {" / "}{target.toLocaleString()}
        </span>
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: "var(--text-tertiary)", marginBottom: 6, letterSpacing: 0.4 }}>kcal</div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
        <defs>
          <clipPath id="curveClip">
            <rect x="0" y="0" width={w * filledLen} height={h}/>
          </clipPath>
        </defs>
        {/* base track */}
        <path d={pathBase} stroke="var(--surface-3)" strokeWidth="5" strokeLinecap="round" fill="none"/>
        {/* filled */}
        <path d={pathBase} stroke="var(--primary-500)" strokeWidth="5" strokeLinecap="round" fill="none" clipPath="url(#curveClip)"/>
        {/* lower marker */}
        <Tick x={8 + (w-16)*lowPct} h={h} label={lower.toLocaleString()}/>
        {/* upper marker */}
        <Tick x={8 + (w-16)*upPct} h={h} label={upper.toLocaleString()}/>
      </svg>
    </div>
  );
};

const Tick = ({ x, h, label }) => {
  // Approx y on the curve via parabola
  const t = (x - 8) / (272);
  const y = (h - 10) - 26 * 4 * t * (1 - t); // matches Q control offset of 26
  return (
    <g>
      <rect x={x - 1.5} y={y - 7} width="3" height="14" rx="1.5" fill="var(--text-primary)"/>
      <text x={x} y={h - 0} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" className="tabular">{label}</text>
    </g>
  );
};

const CalorieRing = ({ consumed, target }) => {
  const pct = Math.min(consumed / target, 1.15);
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} stroke="var(--surface-3)" strokeWidth="10" fill="none"/>
        <circle cx="70" cy="70" r={r}
          stroke="var(--primary-500)" strokeWidth="10" fill="none"
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(pct, 1))}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"/>
        <text x="70" y="68" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text-primary)" className="tabular">{consumed.toLocaleString()}</text>
        <text x="70" y="88" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">de {target.toLocaleString()} kcal</text>
      </svg>
    </div>
  );
};

const CalorieDonut = ({ consumed, target, protein, carbs, fat }) => {
  // Segments by macro kcal contribution
  const pKcal = protein.current * 4;
  const cKcal = carbs.current * 4;
  const fKcal = fat.current * 9;
  const total = pKcal + cKcal + fKcal || 1;
  const r = 52, c = 2 * Math.PI * r;
  const segs = [
    { color: "var(--macro-protein)", frac: pKcal / total },
    { color: "var(--macro-carbs)",   frac: cKcal / total },
    { color: "var(--macro-fat)",     frac: fKcal / total },
  ];
  let offset = 0;
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} stroke="var(--surface-3)" strokeWidth="10" fill="none"/>
        {segs.map((s, i) => {
          const dash = s.frac * c;
          const el = (
            <circle key={i} cx="70" cy="70" r={r}
              stroke={s.color} strokeWidth="10" fill="none"
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"/>
          );
          offset += dash;
          return el;
        })}
        <text x="70" y="68" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text-primary)" className="tabular">{consumed.toLocaleString()}</text>
        <text x="70" y="88" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">de {target.toLocaleString()} kcal</text>
      </svg>
    </div>
  );
};

const MacroBlock = ({ label, current, target, unit, color }) => {
  const pct = Math.min(current / target, 1);
  return (
    <div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 600 }} className="tabular">
        <span>{current}</span>
        <span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}> / {target} {unit}</span>
      </div>
      <div style={{ height: 4, background: "var(--surface-3)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct*100}%`, background: color, borderRadius: 2 }}/>
      </div>
    </div>
  );
};

/* ============ MEAL SECTION ============ */
const MealSection = ({ icon = "coffee", name = "Desayuno", subtitle = "8:30", kcal = 412, target = 562, items = [], cardStyle = "with-photo" }) => {
  return (
    <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 6px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "var(--surface-2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-secondary)",
          }}>
            <Icon name={icon} size={16}/>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)" }} className="tabular">{subtitle}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }} className="tabular">
            {kcal}
            <span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}> / {target}</span>
          </div>
          <div style={{
            width: 24, height: 24, borderRadius: 8,
            background: "var(--surface-2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--text-secondary)",
          }}>
            <Icon name="plus" size={14} strokeWidth={2.2}/>
          </div>
        </div>
      </div>
      {items.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {items.map((it, i) => <FoodRow key={i} {...it} variant={cardStyle}/>)}
        </div>
      ) : (
        <div style={{ fontSize: 12, color: "var(--text-tertiary)", padding: "4px 0 8px 42px" }}>
          Aún no registraste nada
        </div>
      )}
    </div>
  );
};

const FoodRow = ({ name, brand, qty, kcal, swatch, variant = "with-photo" }) => {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "8px 0",
    }}>
      {variant === "with-photo" ? (
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: swatch || "var(--surface-2)",
          flexShrink: 0,
          backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 4px, transparent 4px 8px)",
        }}/>
      ) : (
        <div style={{
          width: 6, height: 36, borderRadius: 3,
          background: swatch || "var(--border-strong)",
          flexShrink: 0,
        }}/>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)" }} className="tabular">
          {qty}{brand ? ` · ${brand}` : ""}
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600 }} className="tabular">{kcal}</div>
    </div>
  );
};

/* ============ Reusable bits ============ */
const SectionHeader = ({ title, action, sub }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "baseline",
    padding: "16px 16px 8px",
  }}>
    <div>
      <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{sub}</div>}
    </div>
    {action && <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{action}</div>}
  </div>
);

const Tab = ({ active, children }) => (
  <div style={{
    paddingBottom: 8,
    fontSize: 14, fontWeight: active ? 600 : 500,
    color: active ? "var(--text-primary)" : "var(--text-secondary)",
    borderBottom: active ? "2px solid var(--primary-500)" : "2px solid transparent",
  }}>{children}</div>
);

const Pill = ({ active, children, color }) => (
  <div style={{
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12, fontWeight: 600,
    background: active ? (color || "var(--text-primary)") : "var(--surface-2)",
    color: active ? "#fff" : "var(--text-secondary)",
    whiteSpace: "nowrap",
  }}>{children}</div>
);

const ScreenHeader = ({ title, left = "back", right }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "8px 16px 8px",
    height: 44,
  }}>
    <div style={{ width: 24 }}>
      {left === "back" && <Icon name="chevronLeft" size={24} strokeWidth={2}/>}
      {left === "close" && <Icon name="x" size={22} strokeWidth={2}/>}
    </div>
    <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
    <div style={{ width: 24, display: "flex", justifyContent: "flex-end" }}>{right}</div>
  </div>
);

Object.assign(window, {
  Icon, StatusBarKcal, BottomNav, WeekStrip, CalorieWidget, CalorieCurve, CalorieRing, CalorieDonut,
  MacroBlock, MealSection, FoodRow, SectionHeader, Tab, Pill, ScreenHeader,
});
