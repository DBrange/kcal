/* Kcal — Screens part 7
 * Crear pauta de suplemento (POST /supplement-regimens)
 *
 * Pre-condición: el user llega con un `supplement` ya elegido (catálogo o recién creado).
 * Esta pantalla arma SOLO la pauta privada — cómo lo toma — no edita el supplement.
 */

const SupplementRegimenScreen = () => {
  // Mock del supplement pre-elegido (read-only header)
  const supplement = {
    id: "ce92…b14",
    name: "Creatina monohidrato",
    brand: "MyProtein",
    form: "POWDER",
    main_component: "Creatina",
    suggested_amount: 5,
    suggested_unit: "G",
    available_units: ["G", "MG"],
  };

  // Estado simulado del form
  const state = {
    dose_amount: 5,
    dose_unit: "G",
    frequency: "DAILY",
    times_per_day: 1,
    schedule: ["09:00"],
    started_at: "2026-05-09",
    ended_at: null,
    notes: "",
    inventory_quantity: 30,
    low_stock_threshold: 7,
  };

  // Warning suaves — no bloquean
  const noScheduleWarn = state.frequency === "DAILY" && state.schedule.length === 0;
  const scheduleMismatch = state.frequency === "DAILY" && state.schedule.length > 0 && state.schedule.length !== state.times_per_day;

  // Stock derivado: 30 / (5 g por toma · 1 vez al día) = 6 días si fueran g
  const remainingDays = state.inventory_quantity && state.times_per_day
    ? Math.floor(state.inventory_quantity / (state.dose_amount * state.times_per_day))
    : null;

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Nueva pauta" left="back" right={
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* === Read-only supplement header === */}
        <div style={{ padding: "8px 16px 4px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", borderRadius: 12,
            background: "var(--surface)", border: "1px solid var(--border)",
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, flexShrink: 0,
              background: "var(--bg)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--macro-fiber)",
            }}>
              <Icon name="scale" size={22} strokeWidth={1.9}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.1px" }}>{supplement.name}</span>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: "var(--macro-fiber-bg)", color: "var(--macro-fiber)", textTransform: "uppercase", letterSpacing: 0.4 }}>polvo</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                {supplement.brand} · {supplement.main_component}
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary-700)" }}>Cambiar</span>
          </div>
          <div style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 6, paddingLeft: 2 }}>
            Sugerido por el catálogo: <b style={{ color: "var(--text-secondary)" }} className="tabular">5 g</b> por toma
          </div>
        </div>

        {/* === Dosis === */}
        <FormSection title="Dosis por toma" hint="Requerido">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 2fr", gap: 10 }}>
            <NumberField label="Cantidad" required value={state.dose_amount}/>
            <SelectField label="Unidad" required value="g (gramos)"/>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>
            Unidades disponibles
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              { v: "G", l: "g" }, { v: "MG", l: "mg" }, { v: "MCG", l: "mcg", disabled: true },
              { v: "IU", l: "UI", disabled: true }, { v: "ML", l: "ml", disabled: true }, { v: "UNIT", l: "unidad", disabled: true },
            ].map(u => (
              <div key={u.v} style={{
                padding: "6px 10px", borderRadius: 999,
                border: `1px solid ${u.v === state.dose_unit ? "var(--primary-500)" : "var(--border)"}`,
                background: u.v === state.dose_unit ? "#FFF8E1" : "var(--bg)",
                color: u.disabled ? "var(--text-tertiary)" : (u.v === state.dose_unit ? "var(--primary-700)" : "var(--text-secondary)"),
                fontSize: 12, fontWeight: u.v === state.dose_unit ? 700 : 500,
                opacity: u.disabled ? 0.5 : 1,
              }}>{u.l}</div>
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 10.5, color: "var(--text-tertiary)" }}>
            Solo se ofrecen las unidades declaradas en este suplemento.
          </div>
        </FormSection>

        {/* === Frecuencia === */}
        <FormSection title="Frecuencia" hint="Requerido">
          <SegmentedControl
            value={state.frequency}
            options={[
              { value: "DAILY", label: "Diaria" },
              { value: "WEEKLY", label: "Semanal" },
              { value: "AS_NEEDED", label: "A demanda" },
            ]}
          />
          <div style={{ marginTop: 14 }}>
            <StepperRow label="Tomas por día" value={state.times_per_day} unit=""/>
          </div>

          {state.frequency === "WEEKLY" && (
            <RegimenNotice tone="warn">
              <b>Próximamente.</b> Las pautas semanales aún no generan recordatorios automáticos.
            </RegimenNotice>
          )}
          {state.frequency === "AS_NEEDED" && (
            <RegimenNotice tone="info">
              Sin recordatorios automáticos en este modo — registrá la toma cuando suceda.
            </RegimenNotice>
          )}
        </FormSection>

        {/* === Horarios === */}
        {state.frequency === "DAILY" && (
          <FormSection title="Horarios" hint="Opcional · podés agregar después">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {state.schedule.map(t => (
                <div key={t} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 10px 8px 12px", borderRadius: 999,
                  background: "var(--surface-2)", border: "1px solid var(--border)",
                }}>
                  <Icon name="clock" size={13} color="var(--text-secondary)" strokeWidth={1.9}/>
                  <span className="tabular" style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{t}</span>
                  <Icon name="x" size={13} color="var(--text-tertiary)" strokeWidth={2}/>
                </div>
              ))}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "8px 12px", borderRadius: 999,
                border: "1px dashed var(--border-strong)", color: "var(--text-secondary)",
                fontSize: 12, fontWeight: 600,
              }}>
                <Icon name="plus" size={13} strokeWidth={2.2}/> Agregar hora
              </div>
            </div>

            {noScheduleWarn && (
              <RegimenNotice tone="warn">
                Sin horarios no se programan recordatorios. Podés agregarlos después.
              </RegimenNotice>
            )}
            {scheduleMismatch && (
              <RegimenNotice tone="warn">
                Cargaste <b className="tabular">{state.schedule.length}</b> horarios pero indicaste <b className="tabular">{state.times_per_day}</b> tomas por día.
              </RegimenNotice>
            )}
          </FormSection>
        )}

        {/* === Período === */}
        <FormSection title="Período">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <DateField label="Inicio" required value="9 may 2026" hint="Hoy"/>
            <DateField label="Fin" optional value="" placeholder="Sin fin" hint="Pauta abierta"/>
          </div>
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
            <PresetChip>Sin fin</PresetChip>
            <PresetChip>4 semanas</PresetChip>
            <PresetChip active>8 semanas</PresetChip>
            <PresetChip>12 semanas</PresetChip>
          </div>
        </FormSection>

        {/* === Stock === */}
        <FormSection title="Stock e inventario" hint="Opcional">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <NumberField label="Cantidad inicial" optional value={state.inventory_quantity} unit="unid."/>
            <NumberField label="Avisar cuando queden" optional value={state.low_stock_threshold} unit="unid."/>
          </div>

          {/* Stock preview */}
          {remainingDays != null && (
            <div style={{
              marginTop: 12, padding: "12px 14px",
              borderRadius: 10, background: "var(--surface)",
              display: "flex", gap: 12, alignItems: "center",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--macro-fiber-bg)", color: "var(--macro-fiber)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="scale" size={18} strokeWidth={1.9}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Estimación de duración</div>
                <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                  {state.inventory_quantity} unidades ÷ {state.dose_amount} {state.dose_unit.toLowerCase()} × {state.times_per_day}/día
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="tabular" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.4px" }}>~{remainingDays}</div>
                <div style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 500 }}>días</div>
              </div>
            </div>
          )}

          <div style={{ marginTop: 10, fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.45 }}>
            El stock se descuenta automáticamente cuando marcás un recordatorio como "tomado". Saltearlo no descuenta.
          </div>
        </FormSection>

        {/* === Notas === */}
        <FormSection title="Notas" hint="Opcional · 500 caracteres">
          <TextField multiline rows={3}
            value=""
            placeholder="Disuelta en 200ml de agua post-entreno, mantener fase de carga 5-7 días…"/>
        </FormSection>

        {/* === Vista previa textual === */}
        <div style={{ padding: "0 16px 4px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
            Vista previa
          </div>
          <div style={{
            padding: "14px 16px", borderRadius: 12,
            background: "#0B0E11", color: "#fff",
          }}>
            <div style={{ fontSize: 13.5, lineHeight: 1.55, fontWeight: 500 }}>
              <span className="tabular" style={{ color: "var(--primary-500)", fontWeight: 700 }}>5 g</span>{" "}de{" "}
              <span style={{ fontWeight: 700 }}>Creatina monohidrato</span>{" "}—{" "}
              todos los días a las{" "}
              <span className="tabular" style={{ fontWeight: 700 }}>9:00</span>,{" "}
              stock para{" "}
              <span className="tabular" style={{ fontWeight: 700 }}>~{remainingDays} días</span>.
            </div>
          </div>
        </div>

        {/* === Disclaimer push === */}
        {state.frequency === "DAILY" && state.schedule.length > 0 && (
          <div style={{
            margin: "12px 16px 16px", padding: "10px 12px",
            background: "var(--surface)", borderRadius: 10,
            display: "flex", gap: 10, alignItems: "flex-start",
          }}>
            <Icon name="bell" size={13} color="var(--text-secondary)" strokeWidth={1.9} style={{ marginTop: 1 }}/>
            <div style={{ flex: 1, fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
              Los recordatorios push respetan tu zona horaria y se planifican automáticamente en una ventana de 7 días.
            </div>
          </div>
        )}

        <div style={{ height: 16 }}/>
      </div>

      <FormFooter primary="Guardar pauta" secondary="Cancelar"/>
    </div>
  );
};

/* ============== local atoms ============== */
const RegimenNotice = ({ tone = "info", children }) => {
  const palette = {
    info:  { bg: "var(--surface)", border: "var(--border)", icon: "info", iconColor: "var(--text-secondary)" },
    warn:  { bg: "rgba(240,185,11,0.08)", border: "rgba(240,185,11,0.3)", icon: "info", iconColor: "var(--primary-700)" },
  }[tone];
  return (
    <div style={{
      marginTop: 12, padding: "10px 12px",
      background: palette.bg, border: `1px solid ${palette.border}`, borderRadius: 10,
      display: "flex", gap: 8, alignItems: "flex-start",
    }}>
      <Icon name={palette.icon} size={13} color={palette.iconColor} strokeWidth={2} style={{ marginTop: 1, flexShrink: 0 }}/>
      <div style={{ flex: 1, fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>{children}</div>
    </div>
  );
};

const DateField = ({ label, value, placeholder, required, optional, hint }) => (
  <div>
    <FieldLabel required={required} optional={optional}>{label}</FieldLabel>
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "11px 12px", border: "1px solid var(--border)", borderRadius: 10,
    }}>
      <Icon name="clock" size={14} color="var(--text-tertiary)" strokeWidth={1.9}/>
      <div className="tabular" style={{
        flex: 1, fontSize: 13, fontWeight: value ? 600 : 400,
        color: value ? "var(--text-primary)" : "var(--text-tertiary)",
      }}>{value || placeholder}</div>
    </div>
    {hint && <div style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 4 }}>{hint}</div>}
  </div>
);

const PresetChip = ({ active, children }) => (
  <div style={{
    padding: "5px 10px", borderRadius: 999,
    border: `1px solid ${active ? "var(--primary-500)" : "var(--border)"}`,
    background: active ? "#FFF8E1" : "var(--bg)",
    color: active ? "var(--primary-700)" : "var(--text-secondary)",
    fontSize: 11.5, fontWeight: active ? 700 : 500,
  }}>{children}</div>
);

Object.assign(window, { SupplementRegimenScreen });
