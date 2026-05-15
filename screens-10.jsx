/* Kcal — Screens part 10
 * CreateActivityLogScreen — registrar actividad ya realizada.
 *
 * Dos modos en la MISMA pantalla:
 *  • Formulario  → POST /activity-logs        (1 log)
 *  • Texto libre → POST /activity-logs/from-text  (N logs vía LLM)
 *
 * Domain note: "crear activity" en lenguaje del producto, internamente
 * persiste un activity_log (catálogo `activities` es read-only).
 *
 * Reglas transversales aplicadas:
 *  - Append-only en MVP: sin botones editar/eliminar.
 *  - Snapshot inmutable: kcal del log son las del momento del POST.
 *  - i18n del catálogo client-side por `code` (backend devuelve EN).
 *  - Sin framing pseudociencia / sin racha punitiva.
 */

const ACT_CATEGORY = {
  CARDIO:       { label: "Cardio",       color: "var(--danger-500)",    bg: "var(--danger-50)",         icon: "trending" },
  STRENGTH:     { label: "Fuerza",       color: "var(--macro-fiber)",   bg: "var(--macro-fiber-bg)",    icon: "scale" },
  SPORTS:       { label: "Deportes",     color: "var(--info-500)",      bg: "#E1ECFE",                  icon: "target" },
  FLEXIBILITY:  { label: "Flexibilidad", color: "var(--macro-protein)", bg: "var(--macro-protein-bg)",  icon: "droplet" },
  DAILY:        { label: "Cotidiana",    color: "var(--text-secondary)",bg: "var(--surface-2)",         icon: "home" },
};

// Mock i18n map por code (frontend mantiene esto; backend devuelve EN)
const ACT_I18N = {
  running_8kmh:        "Correr · 8 km/h",
  running_jogging:     "Correr · trote suave",
  cycling_moderate:    "Ciclismo · moderado",
  walking_brisk:       "Caminar · ritmo enérgico",
  weight_lifting_vigorous: "Pesas · vigoroso",
  yoga_hatha:          "Yoga · hatha",
  swimming_freestyle:  "Natación · estilo libre",
  hiit_general:        "HIIT · general",
};

const ACT_RESULTS_MOCK = [
  { id: "ce92…b14", code: "running_8kmh",        name: "Running 8 km/h",            met_value: 11.5, category: "CARDIO" },
  { id: "1c8e…7a3f",code: "running_jogging",     name: "Running, jogging, general", met_value: 7.0,  category: "CARDIO" },
  { id: "ab12…99f0",code: "cycling_moderate",    name: "Cycling, moderate effort",  met_value: 7.5,  category: "CARDIO" },
  { id: "55de…0a21",code: "walking_brisk",       name: "Walking, 4.0 mph, brisk",   met_value: 4.3,  category: "DAILY" },
];

/* =========================================================
 * Main screen
 * ========================================================= */
const CreateActivityLogScreen = ({ initialMode = "form", state = "default" }) => {
  // state ∈ default | loading | validation | parser_error | success_form | success_text | text_empty_search
  const mode = state.startsWith("success_text") ? "text" : initialMode;
  const isForm = mode === "form" && !state.startsWith("success_text");
  const isText = mode === "text" || state.startsWith("success_text");

  // === Form state (mock) ===
  const selected = state === "default" || state === "validation" || state === "loading"
    ? { id: "ce92…b14", code: "running_8kmh", name: "Running 8 km/h", met_value: 11.5, category: "CARDIO" }
    : null;
  const duration = state === "validation" ? 1450 : 30;
  const performedAt = state === "validation" ? "Mañana · 14:30" : "Hoy · 18:30";
  const logDate = "2026-05-15";
  const errors = state === "validation" ? {
    duration_min: "Duración debe estar entre 1 y 1440 min (24 h)",
    performed_at: "No podés registrar una actividad en el futuro",
  } : {};

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader
        title="Registrar actividad"
        left="back"
        right={<span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>}
      />

      {/* Mode toggle */}
      <div style={{ padding: "0 16px 12px" }}>
        <SegmentedControl
          value={isText ? "text" : "form"}
          options={[
            { value: "form", label: "Formulario" },
            { value: "text", label: "Texto libre" },
          ]}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {isForm && (
          <ActFormMode
            selected={selected}
            duration={duration}
            performedAt={performedAt}
            logDate={logDate}
            errors={errors}
            state={state}
          />
        )}
        {isText && (
          <ActTextMode state={state}/>
        )}
      </div>

      {/* Footer dinámico según modo + estado */}
      {state === "success_form" ? (
        <ActSuccessFooter kcal={287.5}/>
      ) : state === "success_text" ? null : (
        <FormFooter
          primary={
            state === "loading"
              ? "Registrando…"
              : isText ? "Registrar actividades" : `Registrar · 287 kcal`
          }
          secondary="Cancelar"
        />
      )}
    </div>
  );
};


/* =========================================================
 * MODE 1 — Formulario
 * ========================================================= */
const ActFormMode = ({ selected, duration, performedAt, logDate, errors, state }) => {
  return (
    <>
      {/* Endpoint hint */}
      <div style={{ padding: "0 16px 4px" }}>
        <EndpointHint method="POST" path="/activity-logs"/>
      </div>

      {/* Buscador de actividad */}
      <FormSection title="Actividad" hint="Catálogo · solo lectura">
        {state === "loading" ? (
          <ActivitySearchLoading/>
        ) : selected ? (
          <SelectedActivity item={selected}/>
        ) : (
          <ActivitySearchInput value=""/>
        )}

        {/* Resultados (autocomplete) */}
        {!selected && state !== "loading" && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 10.5, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, padding: "8px 0 6px" }}>
              GET /activities/search?name=run
            </div>
            {ACT_RESULTS_MOCK.map(r => <ActivityResultRow key={r.id} item={r}/>)}
          </div>
        )}

        <div style={{ marginTop: 8, fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
          El catálogo es read-only. Si no encontrás algo, usá <b style={{ color: "var(--text-secondary)" }}>Texto libre</b> arriba.
        </div>
      </FormSection>

      {/* Duración */}
      <FormSection title="Duración" hint="Requerido · 1 – 1440 min">
        <NumberField
          value={duration}
          unit="min"
          required
          error={errors.duration_min}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {[15, 30, 45, 60, 90].map(m => (
            <Chip key={m} active={!errors.duration_min && m === duration}>{m} min</Chip>
          ))}
          <Chip icon="edit">Otro</Chip>
        </div>
      </FormSection>

      {/* Cuándo */}
      <FormSection title="¿Cuándo lo hiciste?" hint="Requerido · no futuro">
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 10 }}>
          <DateTimeField
            label="Fecha y hora"
            required
            value={performedAt}
            icon="clock"
            error={errors.performed_at}
          />
          <NumberField
            label="Día asignado"
            value={logDate}
            mono
            required
            hint="log_date · TZ local"
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          <Chip active>Ahora</Chip>
          <Chip>Hace 30m</Chip>
          <Chip>Hace 2h</Chip>
          <Chip>Esta mañana</Chip>
          <Chip>Ayer</Chip>
        </div>
        <div style={{ marginTop: 8, fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
          El día asignado lo calcula el cliente en tu zona horaria — permite registrar
          "ayer a las 11pm" en el día correcto.
        </div>
      </FormSection>

      {/* Notas */}
      <FormSection title="Notas" hint="Opcional · 500 caracteres">
        <TextField
          multiline
          rows={3}
          value=""
          placeholder="Cómo te sentiste, ritmo, distancia recorrida…"
        />
      </FormSection>

      {/* Vista previa del cálculo */}
      {selected && !errors.duration_min && (
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{
            padding: "14px 16px", borderRadius: 12,
            background: "#0B0E11", color: "#fff",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 8 }}>
              kcal = MET × peso × duración (snapshot)
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 13.5, fontWeight: 500 }}>
              <span className="tabular">
                <span style={{ color: "var(--primary-500)", fontWeight: 700 }}>{selected.met_value.toFixed(1)}</span> ×{" "}
                <span style={{ color: "var(--macro-fiber)", fontWeight: 700 }}>72.4 kg</span> ×{" "}
                <span style={{ color: "var(--macro-protein)", fontWeight: 700 }}>{duration} min</span>
              </span>
              <span className="tabular" style={{ fontSize: 22, fontWeight: 700 }}>
                <span style={{ color: "var(--macro-fat)" }}>−287</span><span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}> kcal</span>
              </span>
            </div>
            <div style={{ marginTop: 8, fontSize: 10.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.45 }}>
              El valor se calcula en el servidor al registrar y queda inmutable.
              Si tu peso cambia, los logs viejos no se recalculan.
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 8 }}/>
    </>
  );
};


/* =========================================================
 * MODE 2 — Texto libre
 * ========================================================= */
const ActTextMode = ({ state }) => {
  const hasError = state === "parser_error";
  const isSuccess = state === "success_text";

  return (
    <>
      <div style={{ padding: "0 16px 4px" }}>
        <EndpointHint method="POST" path="/activity-logs/from-text"/>
      </div>

      <FormSection title="Describí lo que hiciste" hint="Requerido · max 1000 caracteres">
        <div style={{
          padding: "14px 14px",
          border: `1px solid ${hasError ? "var(--danger-500)" : "var(--border)"}`,
          borderRadius: 12,
          minHeight: 120,
          fontSize: 14, lineHeight: 1.5,
          color: hasError ? "var(--text-primary)" : "var(--text-primary)",
          fontWeight: 500,
        }}>
          {hasError
            ? "Hice cosas hoy"
            : isSuccess
              ? "Corrí 30 minutos a 8 km/h y después hice 45 min de yoga"
              : "Corrí 30 minutos a 8 km/h y después hice 45 min de yoga"}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: "var(--text-tertiary)" }}>
          <span>Ej: "corrí 30 min y después hice 45 min de yoga"</span>
          <span className="tabular">{hasError ? 14 : 59}/1000</span>
        </div>

        {hasError && (
          <div style={{
            marginTop: 10, padding: "10px 12px",
            background: "rgba(246,70,93,0.08)",
            border: "1px solid rgba(246,70,93,0.3)",
            borderRadius: 10,
            display: "flex", gap: 8, alignItems: "flex-start",
          }}>
            <Icon name="info" size={13} color="var(--danger-600)" strokeWidth={2.2} style={{ marginTop: 1 }}/>
            <div style={{ fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.45 }}>
              <b style={{ color: "var(--text-primary)" }}>422 · no activities identified.</b>{" "}
              No pudimos identificar actividades en tu texto. Probá ser más específico o usá el formulario.
            </div>
          </div>
        )}
      </FormSection>

      {/* Fecha/hora colapsable (95% de los casos: ahora, hoy) */}
      <FormSection title="Fecha y hora" hint="Opcional · default: ahora, hoy">
        <div style={{
          padding: "12px 14px",
          border: "1px solid var(--border)", borderRadius: 10,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <Icon name="clock" size={14} color="var(--text-secondary)"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Hoy · 18:00</div>
            <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
              performed_at + log_date = 2026-05-15
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary-700)" }}>Cambiar</span>
        </div>
      </FormSection>

      {/* Resultado de parsing (success) */}
      {isSuccess && <ActTextParseResult/>}

      {/* Disclaimer LLM */}
      <div style={{
        margin: "8px 16px 16px", padding: "10px 12px",
        background: "var(--surface)", borderRadius: 10,
        display: "flex", gap: 8, alignItems: "flex-start",
      }}>
        <Icon name="info" size={11} strokeWidth={2} style={{ marginTop: 2 }}/>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
          El texto se parsea con IA y se descarta — no se guarda en <span className="tabular" style={{ color: "var(--text-secondary)", fontWeight: 600 }}>notes</span>.
          El servidor crea <b style={{ color: "var(--text-secondary)" }}>N logs atómicos</b> (uno por actividad detectada).
        </div>
      </div>
    </>
  );
};


/* =========================================================
 * Sub-components
 * ========================================================= */

const EndpointHint = ({ method, path }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "4px 8px 4px 6px", borderRadius: 6,
    background: "var(--surface-2)", marginBottom: 4,
  }}>
    <span className="tabular" style={{ fontSize: 9, fontWeight: 800, color: "var(--success-600)", letterSpacing: 0.4 }}>{method}</span>
    <span className="tabular" style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600 }}>{path}</span>
  </div>
);

const ActivitySearchInput = ({ value }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "11px 12px", borderRadius: 10,
    border: "1px solid var(--border)",
  }}>
    <Icon name="search" size={16} color="var(--text-secondary)"/>
    <span style={{ flex: 1, fontSize: 14, color: value ? "var(--text-primary)" : "var(--text-tertiary)" }}>
      {value || "Buscar en el catálogo (ej: correr, yoga, pesas…)"}
    </span>
  </div>
);

const ActivitySearchLoading = () => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "11px 12px", borderRadius: 10,
    border: "1px solid var(--border)",
  }}>
    <div style={{ width: 14, height: 14, border: "2px solid var(--surface-3)", borderTopColor: "var(--primary-500)", borderRadius: 999 }}/>
    <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Buscando "run"…</span>
  </div>
);

const SelectedActivity = ({ item }) => {
  const cat = ACT_CATEGORY[item.category];
  const localName = ACT_I18N[item.code] || item.name;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 12px", borderRadius: 12,
      border: "1px solid var(--primary-500)",
      background: "#FFFCF0",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: cat.bg, color: cat.color,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon name={cat.icon} size={20} strokeWidth={1.9}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 13.5, fontWeight: 700 }}>{localName}</span>
          <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: cat.bg, color: cat.color, textTransform: "uppercase", letterSpacing: 0.4 }}>{cat.label}</span>
        </div>
        <div className="tabular" style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 2, fontStyle: "italic" }}>
          {item.name} · MET {item.met_value.toFixed(1)}
        </div>
      </div>
      <Icon name="x" size={16} color="var(--text-tertiary)" strokeWidth={2}/>
    </div>
  );
};

const ActivityResultRow = ({ item }) => {
  const cat = ACT_CATEGORY[item.category];
  const localName = ACT_I18N[item.code] || item.name;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "10px 0", borderTop: "1px solid var(--divider)",
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, background: cat.bg, color: cat.color,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon name={cat.icon} size={16} strokeWidth={1.9}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{localName}</span>
        </div>
        <div className="tabular" style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 1 }}>
          {item.code} · {cat.label} · MET {item.met_value.toFixed(1)}
        </div>
      </div>
      <Icon name="chevronRight" size={14} color="var(--text-tertiary)"/>
    </div>
  );
};

const DateTimeField = ({ label, value, icon, required, error }) => (
  <div>
    <FieldLabel required={required}>{label}</FieldLabel>
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "11px 12px",
      border: `1px solid ${error ? "var(--danger-500)" : "var(--border)"}`,
      borderRadius: 10,
    }}>
      {icon && <Icon name={icon} size={14} color="var(--text-tertiary)" strokeWidth={1.9}/>}
      <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{value}</span>
      <Icon name="chevronDown" size={14} color="var(--text-tertiary)"/>
    </div>
    {error && <div style={{ fontSize: 11, color: "var(--danger-500)", marginTop: 4, fontWeight: 500 }}>⚠ {error}</div>}
  </div>
);


/* =========================================================
 * Success states
 * ========================================================= */
const ActSuccessFooter = ({ kcal }) => (
  <div style={{
    borderTop: "1px solid var(--border)",
    padding: "12px 16px 24px",
    background: "var(--bg)",
  }}>
    <div style={{
      padding: "14px 16px", borderRadius: 12,
      background: "var(--success-50)", border: "1px solid var(--success-500)",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 999, background: "var(--success-500)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon name="check" size={18} strokeWidth={2.5}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--success-600)" }}>Registrado</div>
        <div className="tabular" style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
          <span style={{ color: "var(--macro-fat)", fontWeight: 700 }}>−{kcal}</span> kcal · snapshot inmutable
        </div>
      </div>
      <div style={{
        padding: "8px 14px", borderRadius: 8,
        background: "var(--success-500)", color: "#fff",
        fontSize: 12, fontWeight: 700,
      }}>Volver</div>
    </div>
  </div>
);

const ActTextParseResult = () => {
  const logs = [
    { code: "running_8kmh", name: "Running 8 km/h", duration_min: 30, kcal: 287.5, category: "CARDIO" },
    { code: "yoga_hatha", name: "Yoga, hatha", duration_min: 45, kcal: 99.0, category: "FLEXIBILITY" },
  ];
  const total = logs.reduce((s, l) => s + l.kcal, 0);
  return (
    <div style={{ padding: "0 16px 4px" }}>
      <div style={{
        padding: "14px 16px", borderRadius: 12,
        background: "var(--success-50)", border: "1px solid var(--success-500)",
        marginBottom: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 999, background: "var(--success-500)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon name="check" size={16} strokeWidth={2.5}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--success-600)" }}>
              {logs.length} actividades registradas
            </div>
            <div className="tabular" style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
              <span style={{ color: "var(--macro-fat)", fontWeight: 700 }}>−{total}</span> kcal total · snapshots inmutables
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {logs.map((l, i) => {
            const cat = ACT_CATEGORY[l.category];
            const localName = ACT_I18N[l.code] || l.name;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10, background: "var(--bg)",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, background: cat.bg, color: cat.color,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon name={cat.icon} size={14} strokeWidth={1.9}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{localName}</div>
                  <div className="tabular" style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 1 }}>
                    {l.duration_min} min
                  </div>
                </div>
                <span className="tabular" style={{ fontSize: 13, fontWeight: 700, color: "var(--macro-fat)" }}>−{l.kcal}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ flex: 1, padding: "11px", borderRadius: 10, border: "1px solid var(--border-strong)", fontSize: 13, fontWeight: 600, textAlign: "center", color: "var(--text-secondary)" }}>
          Registrar otra
        </div>
        <div style={{ flex: 1.4, padding: "11px", borderRadius: 10, background: "var(--primary-500)", color: "#0B0E11", fontSize: 13, fontWeight: 700, textAlign: "center" }}>
          Volver
        </div>
      </div>
    </div>
  );
};


Object.assign(window, { CreateActivityLogScreen });
