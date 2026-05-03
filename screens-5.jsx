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

Object.assign(window, { ExerciseScreen, SmallMetric, SessionCard, CatalogRow, WeekBars });
