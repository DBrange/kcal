/* Kcal — Screens part 5: Exercise tracking */

const ExerciseScreen = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <ScreenHeader title="Actividad" left="back" right={<Icon name="plus" size={22} strokeWidth={2}/>}/>

    <div style={{ flex: 1, overflowY: "auto" }}>
      {/* Hero summary */}
      <div style={{ padding: "8px 16px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Hoy · Domingo 3 may</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
          <span className="tabular" style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.6px" }}>284</span>
          <span style={{ fontSize: 14, color: "var(--text-tertiary)" }}>kcal quemadas</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }} className="tabular">
          47 min activos · 6,284 pasos · 4.2 km
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 14 }}>
          <SmallMetric label="Pasos" value="6,284" unit="/ 10k" pct={0.62} color="var(--info-500)"/>
          <SmallMetric label="Distancia" value="4.2" unit="km" pct={0.55} color="var(--macro-fat)"/>
          <SmallMetric label="Frec. card." value="118" unit="ppm prom" pct={0.7} color="var(--danger-500)"/>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid var(--divider)" }}>
        <Tab active>Hoy</Tab>
        <Tab>Semana</Tab>
        <Tab>Historial</Tab>
      </div>

      {/* Sessions */}
      <div style={{ padding: "12px 16px 8px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
          Sesiones de hoy
        </div>
        <SessionCard
          icon="trending" name="Correr" detail="Trote suave · al aire libre"
          duration="32 min" kcal={218} distance="4.2 km" hr="138 ppm" time="7:15 — 7:47"
        />
        <SessionCard
          icon="scale" name="Pesas — tren superior" detail="Press banca · remo · curl"
          duration="18 min" kcal={66} sets="4 ej · 12 series" hr="112 ppm" time="18:30 — 18:48"
        />
      </div>

      {/* Quick add */}
      <div style={{ padding: "0 16px 14px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
          Agregar actividad
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
          {[
            { icon: "trending", label: "Correr" },
            { icon: "scale", label: "Pesas" },
            { icon: "droplet", label: "Natar" },
            { icon: "plus", label: "Otro" },
          ].map((q, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              padding: "12px 4px", borderRadius: 12,
              background: "var(--surface)", border: "1px solid var(--border)",
            }}>
              <Icon name={q.icon} size={20} strokeWidth={1.8}/>
              <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>{q.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Catálogo de ejercicios */}
      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Sugerencias para vos</span>
          <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>Ver más</span>
        </div>
        <CatalogRow icon="trending" name="HIIT 20 min" detail="Quema alta · sin equipo" kcal="≈ 280 kcal"/>
        <CatalogRow icon="scale" name="Tren inferior" detail="Sentadillas · peso muerto" kcal="≈ 180 kcal"/>
        <CatalogRow icon="droplet" name="Yoga restaurativa" detail="Recovery · 30 min" kcal="≈ 110 kcal"/>
      </div>

      {/* Semana mini chart */}
      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Esta semana</span>
          <span className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>1,847 kcal</span>
        </div>
        <WeekBars/>
      </div>

      <div style={{ height: 24 }}/>
    </div>

    <BottomNav active="home"/>
  </div>
);

const SmallMetric = ({ label, value, unit, pct, color }) => (
  <div style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "10px 10px" }}>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>{label}</div>
    <div className="tabular" style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
      {value}<span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-tertiary)" }}> {unit}</span>
    </div>
    <div style={{ height: 3, background: "var(--surface-3)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct*100}%`, background: color, borderRadius: 2 }}/>
    </div>
  </div>
);

const SessionCard = ({ icon, name, detail, duration, kcal, distance, sets, hr, time }) => (
  <div style={{
    border: "1px solid var(--border)", borderRadius: 12,
    padding: "12px 14px", marginBottom: 8,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: "var(--surface-2)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={18}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{detail}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="tabular" style={{ fontSize: 16, fontWeight: 700, color: "var(--macro-fat)" }}>−{kcal}</div>
        <div style={{ fontSize: 10, color: "var(--text-tertiary)" }} className="tabular">{time}</div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--text-secondary)" }} className="tabular">
      <span><Icon name="clock" size={11} strokeWidth={2} style={{ verticalAlign: -1, marginRight: 3 }}/>{duration}</span>
      {distance && <span>· {distance}</span>}
      {sets && <span>· {sets}</span>}
      <span>· {hr}</span>
    </div>
  </div>
);

const CatalogRow = ({ icon, name, detail, kcal }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 0", borderTop: "1px solid var(--divider)",
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: 8,
      background: "var(--surface-2)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon name={icon} size={16}/>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{detail}</div>
    </div>
    <div className="tabular" style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>{kcal}</div>
    <Icon name="chevronRight" size={16} color="var(--text-tertiary)"/>
  </div>
);

const WeekBars = () => {
  const data = [
    { d: "L", kcal: 320 }, { d: "M", kcal: 180 }, { d: "M", kcal: 410 },
    { d: "J", kcal: 220 }, { d: "V", kcal: 0 },   { d: "S", kcal: 433 },
    { d: "D", kcal: 284, today: true },
  ];
  const max = 500;
  return (
    <svg width="100%" viewBox="0 0 320 100">
      {data.map((d, i) => {
        const x = i * (320/7) + 6;
        const bw = 320/7 - 12;
        const h = (d.kcal / max) * 70;
        const y = 80 - h;
        return (
          <g key={i}>
            {d.kcal > 0 && (
              <rect x={x} y={y} width={bw} height={h} rx="3"
                fill={d.today ? "var(--primary-500)" : "var(--surface-3)"}/>
            )}
            <text x={x + bw/2} y={94} fontSize="10" fill={d.today ? "var(--text-primary)" : "var(--text-tertiary)"} textAnchor="middle" fontWeight={d.today ? 700 : 500}>{d.d}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ============ EXERCISE DETAIL ============ */
const ExerciseDetailScreen = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <ScreenHeader title="Sesión" left="back" right={
      <div style={{ display: "flex", gap: 14, color: "var(--text-secondary)" }}>
        <Icon name="edit" size={20}/>
        <Icon name="share" size={20}/>
      </div>
    }/>
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "8px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, background: "var(--surface-2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="trending" size={20}/>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Domingo · 7:15 — 7:47</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Correr</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 16 }}>
          <span className="tabular" style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.8px", color: "var(--macro-fat)" }}>−218</span>
          <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>kcal quemadas</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }} className="tabular">
          32 min · 4.2 km · ritmo 7:36 /km
        </div>
      </div>

      {/* Métricas */}
      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Métricas</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <SmallMetric label="Distancia" value="4.2" unit="km" pct={1} color="var(--info-500)"/>
          <SmallMetric label="Tiempo" value="32:14" unit="min" pct={1} color="var(--primary-500)"/>
          <SmallMetric label="FC media" value="138" unit="ppm" pct={0.7} color="var(--danger-500)"/>
          <SmallMetric label="FC máx" value="164" unit="ppm" pct={0.85} color="var(--danger-500)"/>
          <SmallMetric label="Ritmo" value="7:36" unit="/km" pct={0.7} color="var(--macro-protein)"/>
          <SmallMetric label="Cadencia" value="168" unit="ppm" pct={0.8} color="var(--macro-fiber)"/>
        </div>
      </div>

      {/* HR chart */}
      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Frecuencia cardíaca</span>
          <span className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>138 ppm prom</span>
        </div>
        <svg width="100%" viewBox="0 0 320 120">
          {[100,120,140,160].map((bpm, i) => (
            <g key={i}>
              <line x1="0" x2="320" y1={110 - (bpm-90)*1.2} y2={110 - (bpm-90)*1.2} stroke="var(--divider)" strokeDasharray="2 3"/>
              <text x="2" y={108 - (bpm-90)*1.2} fontSize="8" fill="var(--text-tertiary)" className="tabular">{bpm}</text>
            </g>
          ))}
          <path d="M 0 90 Q 30 80, 50 70 T 100 55 T 150 50 T 200 45 T 250 50 T 320 60"
            stroke="var(--danger-500)" strokeWidth="2" fill="none"/>
          <path d="M 0 90 Q 30 80, 50 70 T 100 55 T 150 50 T 200 45 T 250 50 T 320 60 L 320 110 L 0 110 Z"
            fill="var(--danger-500)" opacity="0.1"/>
        </svg>
      </div>

      {/* Zonas */}
      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Zonas FC</div>
        {[
          { z: "Z1 · Recovery", min: "4 min", pct: 12, color: "#5B7CFA" },
          { z: "Z2 · Aeróbica", min: "18 min", pct: 56, color: "var(--macro-protein)" },
          { z: "Z3 · Tempo", min: "8 min", pct: 25, color: "var(--primary-500)" },
          { z: "Z4 · Umbral", min: "2 min", pct: 7, color: "var(--macro-fat)" },
        ].map((z, i) => (
          <div key={i} style={{ padding: "8px 0", borderTop: i ? "1px solid var(--divider)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500 }}>{z.z}</span>
              <span className="tabular" style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>{z.min} · {z.pct}%</span>
            </div>
            <div style={{ height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${z.pct}%`, background: z.color }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Splits */}
      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Splits por km</div>
        {[
          { km: 1, pace: "7:48", hr: 132 },
          { km: 2, pace: "7:32", hr: 138 },
          { km: 3, pace: "7:28", hr: 142, fastest: true },
          { km: 4, pace: "7:42", hr: 140 },
          { km: "0.2", pace: "7:50", hr: 136 },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", padding: "8px 0", borderTop: i ? "1px solid var(--divider)" : "none" }}>
            <span className="tabular" style={{ fontSize: 12, color: "var(--text-tertiary)", width: 32, fontWeight: 600 }}>{s.km}</span>
            <span className="tabular" style={{ fontSize: 13, fontWeight: s.fastest ? 700 : 500, color: s.fastest ? "var(--primary-700)" : "var(--text-primary)", flex: 1 }}>{s.pace}</span>
            <span className="tabular" style={{ fontSize: 11, color: "var(--text-secondary)" }}>{s.hr} ppm</span>
            {s.fastest && <span style={{ marginLeft: 8, fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#FFF8E1", color: "var(--primary-700)", textTransform: "uppercase", letterSpacing: 0.4 }}>Más rápido</span>}
          </div>
        ))}
      </div>

      {/* Notes */}
      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 6 }}>Nota</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45 }}>
          Trote en el parque. Sentí buenas piernas, terminé sin agitarme.
        </div>
      </div>

      <div style={{ height: 16 }}/>
    </div>
  </div>
);

Object.assign(window, { ExerciseScreen, ExerciseDetailScreen, SmallMetric, SessionCard, CatalogRow, WeekBars });
