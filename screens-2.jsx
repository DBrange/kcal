/* Kcal — Screens part 2: Comparator, Stats, MealDetail */

const ComparatorScreen = () => {
  const opts = [
    {
      name: "Milanesa napolitana",
      sub: "Restaurante · 220 g",
      kcal: 528, protein: 32, carbs: 38, fat: 28,
      score: 62, swatch: "#C44848",
      pros: ["Alta proteína (32 g)", "Sacia mucho"],
      cons: ["Sodio elevado", "Grasas saturadas: 12 g"],
    },
    {
      name: "Bowl de pollo y quinoa",
      sub: "Casero · 350 g",
      kcal: 412, protein: 38, carbs: 42, fat: 11,
      score: 84, swatch: "#7FA858",
      pros: ["Mejor perfil de macros", "Más fibra (8.2 g)", "Menos sodio"],
      cons: ["Menos saciante a corto plazo"],
      winner: true,
    },
  ];
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Comparar" left="back" right={<Icon name="info" size={20}/>}/>

      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 6, padding: "0 16px 12px" }}>
        <Pill active>Texto</Pill>
        <Pill>Foto</Pill>
        <Pill>Menú</Pill>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Recommendation banner */}
        <div style={{
          margin: "0 16px 14px", padding: "12px 14px",
          borderRadius: 12, background: "var(--surface-2)",
          border: "1px solid var(--border)",
          display: "flex", gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "var(--primary-500)", color: "#0B0E11",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon name="target" size={18} strokeWidth={2}/>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Bowl de pollo y quinoa para vos hoy</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2, lineHeight: 1.4 }}>
              Te queda 11 g de proteína y 405 kcal hasta tu meta. Esta opción cubre mejor ambos sin pasarte de grasa.
            </div>
          </div>
        </div>

        {/* Side by side cards */}
        <div style={{ padding: "0 16px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {opts.map((o, i) => <CompareCard key={i} {...o}/>)}
        </div>

        {/* Comparison table */}
        <div style={{ padding: "0 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, padding: "0 0 8px" }}>
            Detalle
          </div>
          <CompareRow label="Calorías"  a="528 kcal" b="412 kcal" winner="b"/>
          <CompareRow label="Proteína"  a="32 g"     b="38 g"     winner="b" color="var(--macro-protein)"/>
          <CompareRow label="Carbos"    a="38 g"     b="42 g"     winner="—" color="var(--macro-carbs)"/>
          <CompareRow label="Grasa"     a="28 g"     b="11 g"     winner="b" color="var(--macro-fat)"/>
          <CompareRow label="Sat."      a="12 g"     b="2.4 g"    winner="b"/>
          <CompareRow label="Fibra"     a="3.1 g"    b="8.2 g"    winner="b"/>
          <CompareRow label="Sodio"     a="980 mg"   b="312 mg"   winner="b"/>
          <CompareRow label="Saciedad"  a="Alta"     b="Media"    winner="a"/>
        </div>

        <div style={{ height: 16 }}/>
      </div>

      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "10px 16px 24px",
        display: "flex", gap: 8,
        background: "var(--bg)",
      }}>
        <div style={{
          flex: 1, padding: "12px 14px", borderRadius: 12,
          border: "1px solid var(--border-strong)",
          fontSize: 14, fontWeight: 600, textAlign: "center",
        }}>Registrar A</div>
        <div style={{
          flex: 1.2, padding: "12px 14px", borderRadius: 12,
          background: "var(--primary-500)", color: "#0B0E11",
          fontSize: 14, fontWeight: 700, textAlign: "center",
        }}>Registrar B</div>
      </div>
    </div>
  );
};

const CompareCard = ({ name, sub, kcal, protein, carbs, fat, score, swatch, winner }) => (
  <div style={{
    border: winner ? "1.5px solid var(--primary-500)" : "1px solid var(--border)",
    borderRadius: 12, padding: 12,
    background: "var(--bg)",
    position: "relative",
  }}>
    {winner && (
      <div style={{
        position: "absolute", top: -8, left: 10,
        background: "var(--primary-500)", color: "#0B0E11",
        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
        textTransform: "uppercase", letterSpacing: 0.4,
      }}>Recomendada</div>
    )}
    <div style={{
      height: 64, borderRadius: 8, background: swatch,
      backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 4px, transparent 4px 8px)",
      marginBottom: 10,
    }}/>
    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25, minHeight: 32 }}>{name}</div>
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{sub}</div>

    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 10 }}>
      <span className="tabular" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px" }}>{kcal}</span>
      <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>kcal</span>
    </div>

    {/* score bar */}
    <div style={{ marginTop: 8, marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-tertiary)", marginBottom: 3 }}>
        <span style={{ textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Score</span>
        <span className="tabular" style={{ color: "var(--text-primary)", fontWeight: 700 }}>{score}</span>
      </div>
      <div style={{ height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${score}%`, background: score > 75 ? "var(--success-500)" : "var(--primary-500)", borderRadius: 2 }}/>
      </div>
    </div>

    {/* macro bars */}
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <MacroMini label="P" value={protein} max={50} color="var(--macro-protein)"/>
      <MacroMini label="C" value={carbs}   max={60} color="var(--macro-carbs)"/>
      <MacroMini label="G" value={fat}     max={40} color="var(--macro-fat)"/>
    </div>
  </div>
);

const MacroMini = ({ label, value, max, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-tertiary)", width: 10 }}>{label}</span>
    <div style={{ flex: 1, height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${Math.min(value/max*100, 100)}%`, background: color }}/>
    </div>
    <span style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600, width: 22, textAlign: "right" }} className="tabular">{value}g</span>
  </div>
);

const CompareRow = ({ label, a, b, winner, color }) => {
  const cell = (val, isWin) => (
    <div style={{
      flex: 1, textAlign: "center",
      fontSize: 13, fontWeight: isWin ? 700 : 500,
      color: isWin ? "var(--text-primary)" : "var(--text-secondary)",
      position: "relative",
    }} className="tabular">
      {val}
      {isWin && <div style={{ position: "absolute", left: "50%", bottom: -2, transform: "translateX(-50%)", width: 4, height: 4, borderRadius: 999, background: "var(--primary-500)" }}/>}
    </div>
  );
  return (
    <div style={{
      display: "flex", alignItems: "center",
      padding: "10px 0", borderTop: "1px solid var(--divider)",
    }}>
      <div style={{ width: 80, fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 6 }}>
        {color && <div style={{ width: 6, height: 6, borderRadius: 999, background: color }}/>}
        {label}
      </div>
      {cell(a, winner === "a")}
      {cell(b, winner === "b")}
    </div>
  );
};

/* =================== STATS =================== */
const StatsScreen = ({ chartType = "line" }) => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Custom header */}
      <div style={{ padding: "8px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px" }}>Progreso</div>
        <Icon name="share" size={20} color="var(--text-secondary)"/>
      </div>

      {/* Tab row */}
      <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid var(--divider)" }}>
        <Tab active>Peso</Tab>
        <Tab>Calorías</Tab>
        <Tab>Macros</Tab>
        <Tab>Micros</Tab>
        <Tab>Hábitos</Tab>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Period chips */}
        <div style={{ display: "flex", gap: 6, padding: "12px 16px 8px", overflowX: "auto" }}>
          {["7d","30d","3m","6m","1a","Todo"].map((p, i) => <Pill key={i} active={i === 1}>{p}</Pill>)}
        </div>

        {/* Headline */}
        <div style={{ padding: "8px 16px 4px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>
            Peso actual
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 2 }}>
            <span className="tabular" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.6px" }}>74.2</span>
            <span style={{ fontSize: 14, color: "var(--text-tertiary)" }}>kg</span>
            <span className="tabular" style={{ fontSize: 13, fontWeight: 600, color: "var(--success-500)", marginLeft: 6 }}>−1.8 kg</span>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>vs hace 30d</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
            Faltan <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>4.2 kg</span> para tu objetivo (70 kg)
          </div>
        </div>

        {/* Chart */}
        <div style={{ padding: "12px 16px 8px" }}>
          {chartType === "line" && <WeightLineChart/>}
          {chartType === "bar" && <WeightBarChart/>}
          {chartType === "area" && <WeightAreaChart/>}
        </div>

        {/* Adherencia / metric grid */}
        <div style={{ padding: "0 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <StatCell label="Adherencia"   value="86" unit="%" sub="26 / 30 días" color="var(--success-500)"/>
          <StatCell label="kcal promedio" value="2,189" sub="+58 vs target" color="var(--primary-500)" tabular/>
          <StatCell label="Proteína prom." value="142" unit="g" sub="85% del target" color="var(--macro-protein)"/>
          <StatCell label="Racha actual"   value="12" unit="días" sub="máx: 24" color="var(--primary-500)"/>
        </div>

        {/* Distribución macros */}
        <div style={{ padding: "16px 16px 4px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
            Distribución de macros · promedio
          </div>
          <div style={{
            display: "flex", height: 10, borderRadius: 5, overflow: "hidden",
          }}>
            <div style={{ width: "28%", background: "var(--macro-protein)" }}/>
            <div style={{ width: "44%", background: "var(--macro-carbs)" }}/>
            <div style={{ width: "28%", background: "var(--macro-fat)" }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginTop: 8 }}>
            <MacroLegend color="var(--macro-protein)" label="Proteína" pct="28%" g="142g"/>
            <MacroLegend color="var(--macro-carbs)"   label="Carbos"   pct="44%" g="225g"/>
            <MacroLegend color="var(--macro-fat)"     label="Grasa"    pct="28%" g="64g"/>
          </div>
        </div>

        {/* Micros deficitarios */}
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>
              Micronutrientes a vigilar
            </div>
            <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>Ver todo</span>
          </div>
          <MicroRow name="Hierro"    pct={48} value="9.6 / 20 mg"/>
          <MicroRow name="Vitamina D" pct={32} value="4.8 / 15 µg"/>
          <MicroRow name="Calcio"    pct={68} value="680 / 1,000 mg"/>
          <MicroRow name="Omega-3"   pct={88} value="1.4 / 1.6 g" ok/>
        </div>

        <div style={{ height: 24 }}/>
      </div>

      <BottomNav active="stats"/>
    </div>
  );
};

const WeightLineChart = () => {
  // 30 days
  const data = [76.0, 76.1, 75.8, 75.9, 75.7, 75.4, 75.5, 75.3, 75.2, 75.0,
                74.9, 75.1, 74.8, 74.7, 74.6, 74.5, 74.7, 74.4, 74.3, 74.5,
                74.2, 74.1, 74.0, 74.2, 74.1, 74.3, 74.0, 73.9, 74.1, 74.2];
  const min = 73.5, max = 76.5;
  const w = 320, h = 140;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 16) - 8;
    return [x, y];
  });
  const path = "M " + points.map(p => p.join(" ")).join(" L ");
  const target = h - ((70 - min) / (max - min)) * (h - 16) - 8;
  const gridY = [76, 75, 74];
  return (
    <div style={{
      border: "1px solid var(--border)", borderRadius: 12, padding: "12px 12px 8px",
    }}>
      <svg width="100%" viewBox={`0 0 ${w} ${h + 18}`}>
        {gridY.map((g, i) => {
          const y = h - ((g - min) / (max - min)) * (h - 16) - 8;
          return (
            <g key={i}>
              <line x1="0" x2={w} y1={y} y2={y} stroke="var(--divider)" strokeDasharray="2 3"/>
              <text x="2" y={y - 2} fontSize="9" fill="var(--text-tertiary)" className="tabular">{g.toFixed(1)}</text>
            </g>
          );
        })}
        {/* target line */}
        <line x1="0" x2={w} y1={target} y2={target} stroke="var(--success-500)" strokeDasharray="3 3"/>
        <text x={w - 28} y={target - 3} fontSize="9" fill="var(--success-500)" fontWeight="600">meta</text>
        {/* curve */}
        <path d={path} stroke="var(--primary-500)" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        {/* last point */}
        <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="4" fill="var(--primary-500)" stroke="var(--bg)" strokeWidth="2"/>
        {/* x labels */}
        <text x="0" y={h + 14} fontSize="9" fill="var(--text-tertiary)">3 abr</text>
        <text x={w/2 - 10} y={h + 14} fontSize="9" fill="var(--text-tertiary)">18 abr</text>
        <text x={w - 24} y={h + 14} fontSize="9" fill="var(--text-tertiary)">3 may</text>
      </svg>
    </div>
  );
};

const WeightBarChart = () => {
  const data = [76.0, 75.7, 75.4, 75.0, 74.7, 74.5, 74.2];
  const labels = ["L","M","M","J","V","S","D"];
  const w = 320, h = 140, base = 73.5, top = 76.5;
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "12px 12px 8px" }}>
      <svg width="100%" viewBox={`0 0 ${w} ${h + 18}`}>
        {data.map((v, i) => {
          const bw = w / data.length - 8;
          const x = i * (w / data.length) + 4;
          const barH = ((v - base) / (top - base)) * (h - 16);
          const y = h - 8 - barH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={barH} rx="3" fill={i === data.length - 1 ? "var(--primary-500)" : "var(--surface-3)"}/>
              <text x={x + bw/2} y={y - 4} fontSize="9" fill="var(--text-secondary)" textAnchor="middle" fontWeight="600" className="tabular">{v}</text>
              <text x={x + bw/2} y={h + 14} fontSize="9" fill="var(--text-tertiary)" textAnchor="middle">{labels[i]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const WeightAreaChart = () => {
  const data = [76.0, 76.1, 75.8, 75.9, 75.7, 75.4, 75.5, 75.3, 75.2, 75.0,
                74.9, 75.1, 74.8, 74.7, 74.6, 74.5, 74.7, 74.4, 74.3, 74.5,
                74.2, 74.1, 74.0, 74.2, 74.1, 74.3, 74.0, 73.9, 74.1, 74.2];
  const min = 73.5, max = 76.5;
  const w = 320, h = 140;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 16) - 8;
    return [x, y];
  });
  const path = "M 0 " + h + " L " + points.map(p => p.join(" ")).join(" L ") + ` L ${w} ${h} Z`;
  const linePath = "M " + points.map(p => p.join(" ")).join(" L ");
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "12px 12px 8px" }}>
      <svg width="100%" viewBox={`0 0 ${w} ${h + 18}`}>
        <defs>
          <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-500)" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="var(--primary-500)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={path} fill="url(#areaG)"/>
        <path d={linePath} stroke="var(--primary-500)" strokeWidth="2" fill="none"/>
        <circle cx={points[points.length-1][0]} cy={points[points.length-1][1]} r="4" fill="var(--primary-500)" stroke="var(--bg)" strokeWidth="2"/>
      </svg>
    </div>
  );
};

const StatCell = ({ label, value, unit, sub, color, tabular }) => (
  <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "12px 14px", background: "var(--bg)" }}>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
      <span className="tabular" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.3px" }}>{value}</span>
      {unit && <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{unit}</span>}
    </div>
    <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{sub}</div>
    <div style={{ height: 2, background: color, borderRadius: 1, marginTop: 8, opacity: 0.7 }}/>
  </div>
);

const MacroLegend = ({ color, label, pct, g }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ width: 7, height: 7, borderRadius: 999, background: color }}/>
    <div>
      <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 11, fontWeight: 700 }} className="tabular">{pct} <span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}>· {g}</span></div>
    </div>
  </div>
);

const MicroRow = ({ name, pct, value, ok }) => (
  <div style={{ padding: "8px 0", borderTop: "1px solid var(--divider)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
      <span className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>{pct}%</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: ok ? "var(--success-500)" : (pct < 50 ? "var(--danger-500)" : "var(--primary-500)") }}/>
      </div>
      <span className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", width: 90, textAlign: "right" }}>{value}</span>
    </div>
  </div>
);

/* =================== MEAL DETAIL =================== */
const MealDetailScreen = () => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Almuerzo" left="back" right={
        <div style={{ display: "flex", gap: 14, color: "var(--text-secondary)" }}>
          <Icon name="edit" size={20}/>
          <Icon name="share" size={20}/>
        </div>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Meal summary */}
        <div style={{ padding: "8px 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--surface-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-primary)",
            }}>
              <Icon name="utensils" size={18}/>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>Domingo · 13:15</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Almuerzo</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 14 }}>
            <span className="tabular" style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.8px" }}>678</span>
            <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>kcal</span>
            <span className="tabular" style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500, marginLeft: 8 }}>de 787</span>
            <span className="tabular" style={{ fontSize: 12, fontWeight: 700, color: "var(--success-500)", marginLeft: "auto" }}>−109</span>
          </div>
          {/* progress */}
          <div style={{ height: 4, background: "var(--surface-3)", borderRadius: 2, marginTop: 8, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(678/787)*100}%`, background: "var(--primary-500)" }}/>
          </div>

          {/* macro inline */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
            <MacroCell label="Proteína" value={48} unit="g" pct="28%" color="var(--macro-protein)"/>
            <MacroCell label="Carbos"   value={62} unit="g" pct="37%" color="var(--macro-carbs)"/>
            <MacroCell label="Grasa"    value={26} unit="g" pct="35%" color="var(--macro-fat)"/>
          </div>
        </div>

        {/* Items */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "12px 16px 4px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 4 }}>
            3 alimentos
          </div>
          {[
            { name: "Milanesa de pollo al horno", qty: "1 unidad · 180 g", kcal: 342, p: 38, c: 14, f: 16, swatch: "#D4A574" },
            { name: "Ensalada mixta con palta", qty: "1 plato · 220 g", kcal: 186, p: 4, c: 12, f: 14, swatch: "#7FA858" },
            { name: "Arroz integral", qty: "½ taza · 100 g", kcal: 150, p: 6, c: 36, f: 1, swatch: "#E8DCC4" },
          ].map((it, i) => <MealItemRow key={i} {...it}/>)}
        </div>

        {/* Add more */}
        <div style={{ padding: "10px 16px 6px", display: "flex", gap: 8 }}>
          <div style={{
            flex: 1, padding: "10px 12px", borderRadius: 10,
            border: "1px dashed var(--border-strong)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 500,
          }}>
            <Icon name="plus" size={16}/> Agregar alimento
          </div>
        </div>

        {/* Notes */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 6 }}>Nota</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45 }}>
            Comí en casa. La milanesa quedó un poco más grande de lo habitual.
          </div>
        </div>

        <div style={{ height: 16 }}/>
      </div>
    </div>
  );
};

const MealItemRow = ({ name, qty, kcal, p, c, f, swatch }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "12px 0", borderTop: "1px solid var(--divider)",
  }}>
    <div style={{
      width: 44, height: 44, borderRadius: 10, background: swatch,
      backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 4px, transparent 4px 8px)",
      flexShrink: 0,
    }}/>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)" }}>{name}</div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }} className="tabular">{qty}</div>
      <div style={{ display: "flex", gap: 8, marginTop: 4, fontSize: 10, color: "var(--text-secondary)" }} className="tabular">
        <span><span style={{ color: "var(--macro-protein)", fontWeight: 700 }}>P</span> {p}g</span>
        <span><span style={{ color: "var(--macro-carbs)", fontWeight: 700 }}>C</span> {c}g</span>
        <span><span style={{ color: "var(--macro-fat)", fontWeight: 700 }}>G</span> {f}g</span>
      </div>
    </div>
    <div style={{ fontSize: 14, fontWeight: 700 }} className="tabular">{kcal}</div>
  </div>
);

Object.assign(window, {
  ComparatorScreen, StatsScreen, MealDetailScreen,
  WeightLineChart, WeightBarChart, WeightAreaChart,
  StatCell, MacroLegend, MicroRow, MealItemRow, CompareCard, CompareRow, MacroMini,
});
