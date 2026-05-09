/* Kcal — Screens part 8
 * Suplementos · gaps del briefing
 *  1.1 SupplementSearchScreen        — buscar/elegir del catálogo
 *  1.2 RemindersTodayScreen          — TAKE/SKIP/UNDO del día
 *  2.3 SupplementStatsScreen         — adherencia 7/30/90 d
 *  4.1 TakeNowToast                  — confirmación inline (helper)
 *  4.2 LogLibreScreen                — toma no planificada
 *  4.3 SuppLogsHistoryScreen         — histórico de tomas
 *
 * Modos dual (edit) de Crear suplemento / Crear pauta se exponen como variantes
 * de las pantallas existentes — ver props `mode` agregados en index.html.
 */

/* =========================================================
 * 1.1  SupplementSearchScreen — GET /supplements/search
 * ========================================================= */
const SupplementSearchScreen = ({ state = "results" }) => {
  const query = state === "empty" ? "ashwa quetiapina" : "creatina";
  const results = state === "empty" ? [] : [
    { id: "1", name: "Creatina monohidrato", brand: "MyProtein", form: "POWDER", main_component: "Creatina", source: "CURATED" },
    { id: "2", name: "Creatine HCl", brand: "Now Foods", form: "CAPSULE", main_component: "Creatina HCl", source: "CURATED" },
    { id: "3", name: "Creatina Creapure", brand: "Universal", form: "POWDER", main_component: "Creatina micronizada", source: "CURATED" },
    { id: "4", name: "Creatina monohidrato (mía)", brand: "Genérica", form: "POWDER", main_component: "Creatina", source: "USER_CUSTOM" },
  ];

  const FORM_LABELS = {
    POWDER: { label: "Polvo", color: "var(--macro-fiber)", bg: "var(--macro-fiber-bg)" },
    CAPSULE: { label: "Cápsula", color: "var(--info-500)", bg: "#E1ECFE" },
    TABLET: { label: "Comprim.", color: "var(--text-secondary)", bg: "var(--surface-2)" },
    LIQUID: { label: "Líquido", color: "var(--macro-water)", bg: "#E1F2FE" },
    GUMMY: { label: "Gomita", color: "var(--macro-fat)", bg: "var(--macro-fat-bg)" },
    OTHER: { label: "Otro", color: "var(--text-tertiary)", bg: "var(--surface-2)" },
  };

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Elegir suplemento" left="back"/>

      {/* Search bar */}
      <div style={{ padding: "4px 16px 10px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "11px 14px", borderRadius: 12,
          background: "var(--surface)", border: "1px solid var(--border)",
        }}>
          <Icon name="search" size={16} color="var(--text-secondary)"/>
          <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "var(--text-primary)" }}>
            {query}
          </span>
          <Icon name="x" size={16} color="var(--text-tertiary)" strokeWidth={2}/>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {state === "loading" && (
          <div style={{ padding: "8px 16px" }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "12px 0",
                borderTop: i ? "1px solid var(--divider)" : "none",
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface-2)" }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ width: "60%", height: 12, background: "var(--surface-2)", borderRadius: 4 }}/>
                  <div style={{ width: "40%", height: 10, background: "var(--surface-2)", borderRadius: 4, marginTop: 6 }}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {state === "results" && (
          <>
            <div style={{ padding: "0 16px 4px" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 4 }}>
                {results.length} resultados
              </div>
            </div>
            <div style={{ padding: "0 16px" }}>
              {results.map((s, i) => {
                const f = FORM_LABELS[s.form];
                return (
                  <div key={s.id} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 0",
                    borderTop: i ? "1px solid var(--divider)" : "none",
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 11, background: f.bg, color: f.color,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Icon name={s.form === "POWDER" ? "scale" : "pill"} size={20} strokeWidth={1.9}/>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {s.name}
                        </span>
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: f.bg, color: f.color, textTransform: "uppercase", letterSpacing: 0.4 }}>{f.label}</span>
                        {s.source === "USER_CUSTOM" && (
                          <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4 }}>mío</span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                        {s.brand} · {s.main_component}
                      </div>
                    </div>
                    <Icon name="chevronRight" size={16} color="var(--text-tertiary)"/>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {state === "empty" && (
          <div style={{ padding: "32px 16px 16px", textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, margin: "0 auto",
              background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-tertiary)",
            }}>
              <Icon name="search" size={26} strokeWidth={1.6}/>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 14 }}>Sin resultados</div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 4, lineHeight: 1.5 }}>
              No encontramos "{query}" en el catálogo.<br/>
              Probá con otro nombre o creá uno custom.
            </div>
          </div>
        )}

        {/* CTA crear custom */}
        <div style={{ padding: "16px 16px 24px" }}>
          <div style={{
            padding: "14px 16px", borderRadius: 12,
            border: state === "empty" ? "1px solid var(--primary-500)" : "1px dashed var(--border-strong)",
            background: state === "empty" ? "#FFFCF0" : "var(--bg)",
            display: "flex", gap: 12, alignItems: "center",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: state === "empty" ? "var(--primary-500)" : "var(--surface-2)",
              color: state === "empty" ? "#0B0E11" : "var(--text-secondary)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="plus" size={18} strokeWidth={2.2}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>No lo encuentro · Crear custom</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                Volverá a este flujo con tu suplemento listo.
              </div>
            </div>
            <Icon name="chevronRight" size={16} color="var(--text-tertiary)"/>
          </div>
        </div>
      </div>
    </div>
  );
};


/* =========================================================
 * 1.2  RemindersTodayScreen — TAKE/SKIP/UNDO
 * ========================================================= */
const RemindersTodayScreen = () => {
  const reminders = [
    { id: "1", supp: "Creatina monohidrato", brand: "MyProtein", dose: "5 g", time: "08:00", status: "TAKEN", takenAt: "08:04" },
    { id: "2", supp: "Multivitamínico", brand: "Now Foods", dose: "1 cápsula", time: "08:00", status: "TAKEN", takenAt: "08:05" },
    { id: "3", supp: "Omega-3", brand: "Solgar", dose: "1 cápsula", time: "13:00", status: "PENDING" },
    { id: "4", supp: "Magnesio bisglicinato", brand: "Pure Encapsulations", dose: "400 mg", time: "22:00", status: "PENDING" },
    { id: "5", supp: "Vitamina D3", brand: "Now Foods", dose: "2000 UI", time: "07:30", status: "MISSED" },
    { id: "6", supp: "Probiótico", brand: "Garden of Life", dose: "1 cápsula", time: "12:00", status: "SKIPPED", reason: "Sin stock" },
  ];
  const taken = reminders.filter(r => r.status === "TAKEN").length;
  const total = reminders.length;

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Recordatorios de hoy" left="back"/>

      {/* Hero */}
      <div style={{ padding: "0 16px 12px" }}>
        <div style={{
          padding: "16px 18px", borderRadius: 14,
          background: "var(--surface)", border: "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Domingo 9 may</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <span className="tabular" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.6px" }}>{taken}</span>
                <span style={{ fontSize: 14, color: "var(--text-tertiary)" }}>/ {total} tomados</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              {reminders.map(r => (
                <div key={r.id} style={{
                  width: 8, height: 26, borderRadius: 3,
                  background: r.status === "TAKEN" ? "var(--success-500)"
                    : r.status === "SKIPPED" ? "var(--surface-3)"
                    : r.status === "MISSED" ? "var(--danger-500)"
                    : "var(--border-strong)",
                  opacity: r.status === "PENDING" ? 0.5 : 1,
                }}/>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid var(--divider)" }}>
        <Tab active>Hoy</Tab>
        <Tab>Pendientes</Tab>
        <Tab>Históricos</Tab>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Group by hour */}
        {Object.entries(reminders.reduce((acc, r) => {
          (acc[r.time] = acc[r.time] || []).push(r);
          return acc;
        }, {})).map(([hour, items]) => (
          <div key={hour} style={{ padding: "14px 16px 4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Icon name="clock" size={12} color="var(--text-tertiary)" strokeWidth={2}/>
              <span className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>
                {hour}
              </span>
            </div>
            {items.map(r => <ReminderCard key={r.id} r={r}/>)}
          </div>
        ))}
        <div style={{ height: 16 }}/>
      </div>
    </div>
  );
};

const ReminderCard = ({ r }) => {
  const styleByStatus = {
    TAKEN: { bg: "var(--surface-2)", text: "var(--text-secondary)", strike: true },
    SKIPPED: { bg: "var(--bg)", text: "var(--text-tertiary)", strike: true, dimIcon: true },
    MISSED: { bg: "var(--bg)", text: "var(--text-primary)", strike: false },
    PENDING: { bg: "var(--bg)", text: "var(--text-primary)", strike: false },
  }[r.status];

  return (
    <div style={{
      padding: "12px 12px", marginBottom: 8,
      border: `1px solid ${r.status === "MISSED" ? "var(--danger-500)" : "var(--border)"}`,
      borderRadius: 12,
      background: styleByStatus.bg,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: r.status === "TAKEN" ? "var(--success-500)" : "var(--surface-2)",
          color: r.status === "TAKEN" ? "#fff" : "var(--text-secondary)",
          opacity: styleByStatus.dimIcon ? 0.5 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon name={r.status === "TAKEN" ? "check" : "pill"} size={20} strokeWidth={r.status === "TAKEN" ? 2.5 : 1.9}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 13.5, fontWeight: 600,
            color: styleByStatus.text,
            textDecoration: styleByStatus.strike ? "line-through" : "none",
          }}>{r.supp}</div>
          <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
            {r.dose} · {r.brand}
            {r.takenAt && <> · <span style={{ color: "var(--success-500)", fontWeight: 600 }}>tomado {r.takenAt}</span></>}
            {r.status === "MISSED" && <> · <span style={{ color: "var(--danger-500)", fontWeight: 600 }}>no marcaste</span></>}
            {r.reason && <> · {r.reason}</>}
          </div>
        </div>
      </div>

      {/* Action row */}
      <div style={{
        marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--divider)",
        display: "flex", gap: 6,
      }}>
        {r.status === "PENDING" || r.status === "MISSED" ? (
          <>
            <ActionBtn primary>Tomé</ActionBtn>
            <ActionBtn>Salté</ActionBtn>
            <ActionBtn icon="edit"/>
          </>
        ) : r.status === "TAKEN" ? (
          <>
            <div style={{ flex: 1, fontSize: 11, color: "var(--success-500)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="check" size={12} strokeWidth={2.5}/> Stock −1
            </div>
            <ActionBtn>Deshacer</ActionBtn>
          </>
        ) : (
          <>
            <div style={{ flex: 1, fontSize: 11, color: "var(--text-tertiary)" }}>Salteado · sin descontar stock</div>
            <ActionBtn>Deshacer</ActionBtn>
          </>
        )}
      </div>
    </div>
  );
};

const ActionBtn = ({ children, primary, icon }) => (
  <div style={{
    flex: icon ? "0 0 36px" : 1,
    padding: icon ? "8px 0" : "8px 10px",
    textAlign: "center",
    borderRadius: 8,
    background: primary ? "var(--primary-500)" : "var(--surface-2)",
    color: primary ? "#0B0E11" : "var(--text-primary)",
    fontSize: 12, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    {icon ? <Icon name={icon} size={14} strokeWidth={1.9}/> : children}
  </div>
);


/* =========================================================
 * 2.3  SupplementStatsScreen — GET /supplement-stats?days=N
 * ========================================================= */
const SupplementStatsScreen = () => {
  const data = {
    window_days: 30,
    total_reminders: 90,
    taken_count: 75,
    skipped_count: 5,
    missed_count: 10,
    pending_count: 0,
    adherence_pct: 83.3,
    current_streak_days: 5,
  };
  const series = Array.from({ length: 30 }).map((_, i) => {
    const r = (i * 13 + 7) % 100;
    return r > 14 ? "TAKEN" : (r > 8 ? "MISSED" : (r > 4 ? "SKIPPED" : "TAKEN"));
  });

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Adherencia · suplementos" left="back"/>

      {/* Window selector */}
      <div style={{ padding: "0 16px 12px" }}>
        <SegmentedControl value="30"
          options={[{ value: "7", label: "7 días" }, { value: "30", label: "30 días" }, { value: "90", label: "90 días" }]}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Big number */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{
            padding: "20px 18px", borderRadius: 14,
            background: "var(--surface)", border: "1px solid var(--border)",
          }}>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Adherencia</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
              <span className="tabular" style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-1.2px", color: "var(--success-500)" }}>{data.adherence_pct.toFixed(0)}</span>
              <span style={{ fontSize: 18, color: "var(--text-tertiary)", fontWeight: 600 }}>%</span>
            </div>
            <div className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
              {data.taken_count} de {data.total_reminders} recordatorios tomados
            </div>

            {/* horizontal stacked bar */}
            <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginTop: 16 }}>
              <div style={{ flex: data.taken_count, background: "var(--success-500)" }}/>
              <div style={{ flex: data.skipped_count, background: "var(--surface-3)" }}/>
              <div style={{ flex: data.missed_count, background: "var(--danger-500)" }}/>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11 }}>
              <StatLegend color="var(--success-500)" label="Tomados" value={data.taken_count}/>
              <StatLegend color="var(--surface-3)" label="Salteados" value={data.skipped_count}/>
              <StatLegend color="var(--danger-500)" label="Perdidos" value={data.missed_count}/>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 16px", borderRadius: 12,
            background: "var(--bg)", border: "1px solid var(--border)",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "var(--macro-fat-bg)", color: "var(--macro-fat)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="flame" size={22} strokeWidth={2}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Racha actual</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
                <span className="tabular" style={{ fontSize: 24, fontWeight: 700 }}>{data.current_streak_days}</span>
                <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>días consecutivos al 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar grid */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Últimos 30 días</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 4 }}>
            {series.map((s, i) => (
              <div key={i} style={{
                aspectRatio: "1", borderRadius: 4,
                background: s === "TAKEN" ? "var(--success-500)"
                  : s === "SKIPPED" ? "var(--surface-3)"
                  : "var(--danger-500)",
                opacity: s === "TAKEN" ? 0.85 : 1,
              }}/>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-tertiary)", marginTop: 6 }} className="tabular">
            <span>9 abr</span><span>9 may</span>
          </div>
        </div>

        {/* Por suplemento */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Por suplemento</div>
          {[
            { name: "Creatina monohidrato", pct: 100, taken: 30, total: 30 },
            { name: "Multivitamínico", pct: 96, taken: 29, total: 30 },
            { name: "Omega-3", pct: 73, taken: 22, total: 30 },
            { name: "Magnesio bisglicinato", pct: 60, taken: 18, total: 30 },
          ].map((s, i) => (
            <div key={i} style={{ padding: "10px 0", borderTop: i ? "1px solid var(--divider)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                <span className="tabular" style={{ fontSize: 12, fontWeight: 700, color: s.pct >= 90 ? "var(--success-500)" : s.pct >= 70 ? "var(--text-primary)" : "var(--macro-fat)" }}>
                  {s.pct}% <span style={{ color: "var(--text-tertiary)", fontWeight: 500 }}>· {s.taken}/{s.total}</span>
                </span>
              </div>
              <div style={{ height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, background: s.pct >= 90 ? "var(--success-500)" : s.pct >= 70 ? "var(--primary-500)" : "var(--macro-fat)" }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatLegend = ({ color, label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    <div style={{ width: 8, height: 8, borderRadius: 999, background: color }}/>
    <span style={{ color: "var(--text-tertiary)" }}>{label}</span>
    <span className="tabular" style={{ color: "var(--text-primary)", fontWeight: 700 }}>{value}</span>
  </div>
);


/* =========================================================
 * 4.2  LogLibreScreen — POST /supplement-logs (toma no planificada)
 * ========================================================= */
const LogLibreScreen = () => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Registrar toma libre" left="back" right={
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "8px 16px" }}>
          <div style={{
            padding: "10px 12px", borderRadius: 10,
            background: "var(--surface)", display: "flex", gap: 10, alignItems: "center", marginBottom: 8,
          }}>
            <Icon name="info" size={13} color="var(--text-secondary)" strokeWidth={2}/>
            <div style={{ flex: 1, fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Para tomas <b>fuera de tu pauta</b> del día. Si era una dosis programada, marcala desde Recordatorios.
            </div>
          </div>
        </div>

        <FormSection title="Suplemento (de tus regímenes activos)" hint="Requerido">
          <SelectField value="Creatina monohidrato · 5 g" required/>
        </FormSection>

        <FormSection title="Dosis tomada">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 2fr", gap: 10 }}>
            <NumberField label="Cantidad" required value="5" unit="g"/>
            <SelectField label="Unidad" required value="g (gramos)"/>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-tertiary)" }}>
            Pre-cargado desde el régimen — podés ajustarlo.
          </div>
        </FormSection>

        <FormSection title="Cuándo">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <ReadOnlyField icon="clock" label="Hora" value="14:32" hint="Hace 2 min"/>
            <ReadOnlyField icon="utensils" label="Día" value="9 may 2026" mono/>
          </div>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
            <Chip active>Ahora</Chip>
            <Chip>Hace 1h</Chip>
            <Chip>Esta mañana</Chip>
            <Chip icon="edit">Otro horario</Chip>
          </div>
        </FormSection>

        <FormSection title="Notas" hint="Opcional">
          <TextField multiline rows={3}
            value=""
            placeholder="Tomé doble dosis post-entreno…"/>
        </FormSection>

        <div style={{
          margin: "8px 16px 16px", padding: "10px 12px",
          background: "var(--surface)", borderRadius: 10,
          fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.45,
          display: "flex", gap: 8,
        }}>
          <Icon name="info" size={11} strokeWidth={2}/>
          <div>
            Esta toma <b style={{ color: "var(--text-secondary)" }}>descuenta stock</b> del régimen y suma a la adherencia del día.
          </div>
        </div>
      </div>

      <FormFooter primary="Registrar toma" secondary="Cancelar"/>
    </div>
  );
};


/* =========================================================
 * 4.3  SuppLogsHistoryScreen — GET /supplement-logs?...
 * ========================================================= */
const SuppLogsHistoryScreen = () => {
  const days = [
    {
      date: "Hoy · domingo 9 may", taken: 3, total: 4,
      logs: [
        { time: "08:04", name: "Creatina monohidrato", dose: "5 g", source: "REMINDER" },
        { time: "08:05", name: "Multivitamínico", dose: "1 cápsula", source: "REMINDER" },
        { time: "14:32", name: "Creatina monohidrato", dose: "5 g extra", source: "FREE" },
      ],
    },
    {
      date: "Sábado 8 may", taken: 4, total: 4,
      logs: [
        { time: "08:01", name: "Creatina monohidrato", dose: "5 g", source: "REMINDER" },
        { time: "08:01", name: "Multivitamínico", dose: "1 cápsula", source: "REMINDER" },
        { time: "13:15", name: "Omega-3", dose: "1 cápsula", source: "REMINDER" },
        { time: "22:10", name: "Magnesio bisglicinato", dose: "400 mg", source: "REMINDER" },
      ],
    },
    {
      date: "Viernes 7 may", taken: 2, total: 4,
      logs: [
        { time: "08:00", name: "Creatina monohidrato", dose: "5 g", source: "REMINDER" },
        { time: "13:00", name: "Omega-3", dose: "1 cápsula", source: "REMINDER" },
      ],
    },
  ];

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Historial de tomas" left="back" right={
        <Icon name="sliders" size={20} color="var(--text-secondary)"/>
      }/>

      {/* Filters */}
      <div style={{ padding: "0 16px 10px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        <Chip active>Últ. 7 días</Chip>
        <Chip>30 días</Chip>
        <Chip>Todo</Chip>
        <Chip icon="pill">Por suplemento</Chip>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {days.map((d, i) => (
          <div key={i}>
            <div style={{
              padding: "10px 16px",
              background: "var(--surface)",
              borderTop: "1px solid var(--divider)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 12, fontWeight: 700 }}>{d.date}</span>
              <span className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600 }}>
                {d.taken}/{d.total} tomados
              </span>
            </div>
            <div style={{ padding: "0 16px" }}>
              {d.logs.map((l, j) => (
                <div key={j} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 0",
                  borderTop: j ? "1px solid var(--divider)" : "none",
                }}>
                  <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", width: 40, fontWeight: 600 }}>{l.time}</div>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: "var(--surface-2)",
                    color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name="check" size={14} strokeWidth={2.5}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{l.name}</span>
                      {l.source === "FREE" && (
                        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: "var(--macro-fat-bg)", color: "var(--macro-fat)", textTransform: "uppercase", letterSpacing: 0.4 }}>libre</span>
                      )}
                    </div>
                    <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                      {l.dose}
                    </div>
                  </div>
                  <Icon name="chevronRight" size={14} color="var(--text-tertiary)"/>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
};


/* =========================================================
 * 3.1 helper exports — bloques nutrición que se montan en
 *     SuppDetailScreen / CreateSupplementScreen / HomeScreen
 *     (renderizados como overlays separados en el canvas)
 * ========================================================= */

/* SuppDetailScreen — bloque "Aporte por unidad" */
const SuppNutritionBlock = () => {
  const supp = {
    name: "Whey Protein Isolate",
    suggested_unit: "G",
    suggested_amount: 30,
    calories_kcal_per_unit: 4.0,
    protein_g_per_unit: 0.8,
    carbs_g_per_unit: 0.1,
    fat_g_per_unit: 0.066,
  };
  const unitLabel = { G: "gramo", IU: "UI", UNIT: "cápsula", ML: "ml", MG: "mg", MCG: "mcg" }[supp.suggested_unit];
  // Por porción declarada
  const perServing = {
    kcal: supp.calories_kcal_per_unit * supp.suggested_amount,
    p: supp.protein_g_per_unit * supp.suggested_amount,
    c: supp.carbs_g_per_unit * supp.suggested_amount,
    f: supp.fat_g_per_unit * supp.suggested_amount,
  };

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="" left="back" right={<Icon name="edit" size={20} color="var(--text-secondary)"/>}/>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "0 16px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: "var(--macro-fiber-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--macro-fiber)" }}>
              <Icon name="scale" size={28}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{supp.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Optimum Nutrition · polvo · 30 g</div>
              <div style={{ display: "inline-block", marginTop: 4, padding: "2px 8px", borderRadius: 999, background: "var(--success-50)", color: "var(--success-600)", fontSize: 10, fontWeight: 700 }}>ACTIVO</div>
            </div>
          </div>
        </div>

        {/* === BLOQUE NUEVO: aporte nutricional === */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Aporte nutricional</span>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 500 }}>por {unitLabel}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
            <NutriCell label="kcal" value={supp.calories_kcal_per_unit} color="var(--text-primary)"/>
            <NutriCell label="Prot." value={supp.protein_g_per_unit} unit="g" color="var(--macro-protein)"/>
            <NutriCell label="Carbs" value={supp.carbs_g_per_unit} unit="g" color="var(--macro-carbs)"/>
            <NutriCell label="Grasa" value={supp.fat_g_per_unit.toFixed(2)} unit="g" color="var(--macro-fat)"/>
          </div>

          <div style={{ marginTop: 12, padding: "10px 12px", background: "var(--surface)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Por porción ({supp.suggested_amount} g)</span>
            <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>
              {perServing.kcal} kcal · {perServing.p}g P
            </span>
          </div>

          <div style={{ marginTop: 10, fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.45, fontStyle: "italic" }}>
            Verificá la etiqueta del envase. La información puede tener errores.
          </div>
        </div>

        {/* Estado vacío variante */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>Variante · sin info</div>
          <div style={{ padding: "12px 14px", background: "var(--surface)", borderRadius: 10, fontSize: 12, color: "var(--text-tertiary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Sin info nutricional cargada</span>
            <span style={{ fontSize: 11, color: "var(--primary-700)", fontWeight: 700 }}>Agregar</span>
          </div>
        </div>

        <div style={{ height: 20 }}/>
      </div>
    </div>
  );
};

const NutriCell = ({ label, value, unit, color }) => (
  <div style={{
    padding: "10px 8px", borderRadius: 10,
    border: "1px solid var(--border)",
    textAlign: "center",
  }}>
    <div className="tabular" style={{ fontSize: 17, fontWeight: 700, color, letterSpacing: "-0.2px" }}>
      {value}{unit && <span style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 500 }}> {unit}</span>}
    </div>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.3, fontWeight: 600, marginTop: 2 }}>{label}</div>
  </div>
);


/* CreateSupplementScreen — sección "Info nutricional (opcional)" wizard por porción */
const CreateSuppNutritionSection = () => {
  const expanded = true;
  const servingSize = 30;
  const servingUnit = "G";
  const perServing = { kcal: 120, p: 24, c: 3, f: 2 };
  const perUnit = {
    kcal: (perServing.kcal / servingSize).toFixed(2),
    p: (perServing.p / servingSize).toFixed(3),
    c: (perServing.c / servingSize).toFixed(3),
    f: (perServing.f / servingSize).toFixed(3),
  };

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Crear suplemento · nutrición" left="back"/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Toggle */}
        <div style={{ padding: "8px 16px 4px" }}>
          <div style={{
            padding: "12px 14px", borderRadius: 12,
            border: `1px solid ${expanded ? "var(--primary-500)" : "var(--border)"}`,
            background: expanded ? "#FFFCF0" : "var(--bg)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              border: `1.5px solid ${expanded ? "var(--primary-500)" : "var(--border-strong)"}`,
              background: expanded ? "var(--primary-500)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {expanded && <Icon name="check" size={14} color="#0B0E11" strokeWidth={3}/>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Tengo info nutricional</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                La cargo desde la etiqueta del envase
              </div>
            </div>
          </div>
        </div>

        {expanded && (
          <>
            {/* Tamaño de porción */}
            <FormSection title="Tamaño de porción" hint="Cómo viene en la etiqueta">
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.6fr", gap: 10 }}>
                <NumberField label="Cantidad" required value={servingSize}/>
                <SelectField label="Unidad" required value="g (gramos)"/>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
                Ej: <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>1 scoop = 30 g</span> · 1 cápsula = 1 unidad · 1 gomita = 1 unidad
              </div>
            </FormSection>

            {/* Por porción */}
            <FormSection title="Por porción" hint="Lee directo de la etiqueta">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <NumberField label="Calorías" optional value={perServing.kcal} unit="kcal"/>
                <NumberField label="Proteína" optional value={perServing.p} unit="g"/>
                <NumberField label="Carbos" optional value={perServing.c} unit="g"/>
                <NumberField label="Grasa" optional value={perServing.f} unit="g"/>
              </div>
            </FormSection>

            {/* Preview cálculo */}
            <div style={{ padding: "0 16px 4px" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
                Se guarda como (por gramo)
              </div>
              <div style={{
                padding: "12px 14px", borderRadius: 10,
                background: "#0B0E11", color: "#fff",
              }}>
                <div className="tabular" style={{ fontSize: 12, lineHeight: 1.6, fontWeight: 500 }}>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 6 }}>JSON al backend</div>
                  <div>"calories_kcal_per_unit": <span style={{ color: "var(--primary-500)" }}>{perUnit.kcal}</span>,</div>
                  <div>"protein_g_per_unit": <span style={{ color: "var(--macro-protein)" }}>{perUnit.p}</span>,</div>
                  <div>"carbs_g_per_unit": <span style={{ color: "var(--macro-carbs)" }}>{perUnit.c}</span>,</div>
                  <div>"fat_g_per_unit": <span style={{ color: "var(--macro-fat)" }}>{perUnit.f}</span></div>
                </div>
              </div>
            </div>

            {/* Null vs 0 hint */}
            <div style={{
              margin: "12px 16px 8px", padding: "10px 12px",
              background: "var(--surface)", borderRadius: 10,
              fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5,
              display: "flex", gap: 8,
            }}>
              <Icon name="info" size={11} strokeWidth={2}/>
              <div>
                <b style={{ color: "var(--text-secondary)" }}>Vacío ≠ 0.</b> Dejá el campo en blanco si no tenés el dato. Solo escribí <b className="tabular">0</b> si la etiqueta dice 0.
              </div>
            </div>

            <div style={{
              margin: "0 16px 16px",
              fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.45, fontStyle: "italic",
              padding: "0 4px",
            }}>
              Verificá la etiqueta del envase. La información puede tener errores.
            </div>
          </>
        )}

        <div style={{ height: 16 }}/>
      </div>

      <FormFooter primary="Guardar suplemento" secondary="Vista previa"/>
    </div>
  );
};


/* HomeScreen variant — split kcal comida + suplementos */
const HomeWithSuppSplitScreen = () => {
  const consumed = 1620;
  const fromFood = 1500;
  const fromSupp = 120;
  const target = 2247;
  const pct = consumed / target;

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 16px 4px" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>Mayo 2026</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", marginTop: 2 }}>Hoy</div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", color: "var(--text-secondary)" }}>
          <Icon name="search" size={22}/><Icon name="bell" size={22}/>
        </div>
      </div>

      <WeekStrip activeIndex={6}/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Calorie widget — variant con split */}
        <div style={{
          background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 16,
          margin: "8px 16px 0", padding: "16px 18px 18px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="flame" size={18} color="var(--primary-500)" strokeWidth={2}/>
              <span style={{ fontSize: 14, fontWeight: 600 }} className="tabular">12</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Dom, 9 may</div>
            <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--info-500)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>D</div>
          </div>

          <div style={{ height: 1, background: "var(--divider)", margin: "0 -18px 18px" }}/>

          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <div className="tabular" style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.8px" }}>
              {consumed.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2 }}>
              de {target.toLocaleString()} kcal · faltan {target - consumed}
            </div>
          </div>

          {/* Split bar */}
          <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", background: "var(--surface-3)", marginTop: 6 }}>
            <div style={{ width: `${(fromFood / target) * 100}%`, background: "var(--primary-500)" }}/>
            <div style={{ width: `${(fromSupp / target) * 100}%`, background: "var(--macro-protein)" }}/>
          </div>

          {/* Legend with split */}
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: 2, background: "var(--primary-500)" }}/>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Comida</span>
              <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>{fromFood}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 9, height: 9, borderRadius: 2, background: "var(--macro-protein)" }}/>
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Suplementos</span>
              <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>+{fromSupp}</span>
            </div>
          </div>
        </div>

        {/* Macros con split */}
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Macros con split
          </div>
          <SplitMacro label="Proteína" food={120} supp={25} target={168} unit="g" color="var(--macro-protein)"/>
          <SplitMacro label="Carbos"   food={198} supp={2}  target={252} unit="g" color="var(--macro-carbs)"/>
          <SplitMacro label="Grasa"    food={62}  supp={1.5} target={75}  unit="g" color="var(--macro-fat)"/>
        </div>

        {/* Suplementos card con take-now CTA */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                <Icon name="pill" size={16}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Suplementos</div>
                <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>2 de 4 · aportaron <span className="tabular" style={{ color: "var(--macro-protein)", fontWeight: 700 }}>+120 kcal</span></div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Ver todos</div>
          </div>
          <SuppRowQuick name="Omega-3" dose="1 cápsula" time="13:00"/>
          <SuppRowQuick name="Magnesio bisglicinato" dose="400 mg" time="22:00"/>
        </div>

        <div style={{ height: 24 }}/>
      </div>

      <BottomNav active="home"/>
    </div>
  );
};

const SplitMacro = ({ label, food, supp, target, unit, color }) => {
  const total = food + supp;
  const pct = Math.min(total / target, 1);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, fontWeight: 600 }}>{label}</span>
        <span className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)" }}>
          <b>{total}</b> / {target} {unit}
        </span>
      </div>
      <div style={{ height: 6, background: "var(--surface-3)", borderRadius: 3, overflow: "hidden", display: "flex" }}>
        <div style={{ width: `${(food / target) * 100}%`, background: color, opacity: 1 }}/>
        <div style={{ width: `${(supp / target) * 100}%`, background: color, opacity: 0.4, borderLeft: "1.5px solid var(--bg)" }}/>
      </div>
      <div className="tabular" style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 4 }}>
        {food} comida + {supp} suplementos
      </div>
    </div>
  );
};

const SuppRowQuick = ({ name, dose, time }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", marginBottom: 6,
    border: "1px solid var(--border)", borderRadius: 10,
  }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
      <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 1 }}>{dose} · {time}</div>
    </div>
    <div style={{ padding: "6px 10px", borderRadius: 8, background: "var(--primary-500)", color: "#0B0E11", fontSize: 11, fontWeight: 700 }}>
      Tomar ahora
    </div>
  </div>
);


Object.assign(window, {
  SupplementSearchScreen, RemindersTodayScreen, SupplementStatsScreen,
  LogLibreScreen, SuppLogsHistoryScreen,
  SuppNutritionBlock, CreateSuppNutritionSection, HomeWithSuppSplitScreen,
});
