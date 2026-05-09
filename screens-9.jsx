/* Kcal — Screens part 9
 * Integraciones del briefing:
 *  1.1  Bloques de nutrición mergeados a SuppDetailScreen / CreateSupplementScreen / HomeScreen
 *  1.2  Edit mode dual en CreateSupplementScreen (USER_CUSTOM owned)
 *  1.3  Edit mode dual en SupplementRegimenScreen + archivar / eliminar
 *  1.4  Take-now inline en SupplementsScreen
 */

/* =========================================================
 * 1.1 SuppDetailScreen integrado · variantes propio / curated
 * ========================================================= */
const SuppDetailFinal = ({ owned = true, hasNutrition = true }) => {
  const supp = {
    name: "Whey Protein Isolate",
    brand: "Optimum Nutrition",
    notes: "Aislado de proteína de suero. Disolver en 250 ml de agua o leche post-entreno.",
    suggested_unit: "G",
    suggested_amount: 30,
    calories_kcal_per_unit: 4.0,
    protein_g_per_unit: 0.8,
    carbs_g_per_unit: 0.1,
    fat_g_per_unit: 0.066,
    source: owned ? "USER_CUSTOM" : "CURATED",
  };
  const unitLabel = { G: "gramo", IU: "UI", UNIT: "cápsula", ML: "ml", MG: "mg", MCG: "mcg" }[supp.suggested_unit];
  const perServing = {
    kcal: supp.calories_kcal_per_unit * supp.suggested_amount,
    p: supp.protein_g_per_unit * supp.suggested_amount,
    c: supp.carbs_g_per_unit * supp.suggested_amount,
    f: +(supp.fat_g_per_unit * supp.suggested_amount).toFixed(1),
  };
  const allNull = !hasNutrition;

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="" left="back" right={
        owned
          ? <Icon name="edit" size={20} color="var(--text-secondary)"/>
          : <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4 }}>Curated</span>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Identidad */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: "var(--macro-fiber-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--macro-fiber)" }}>
              <Icon name="scale" size={28}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{supp.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{supp.brand} · polvo · {supp.suggested_amount} g</div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                <span style={{ padding: "2px 8px", borderRadius: 999, background: "var(--success-50)", color: "var(--success-600)", fontSize: 10, fontWeight: 700 }}>ACTIVO</span>
                {!owned && (
                  <span style={{ padding: "2px 8px", borderRadius: 999, background: "var(--surface-2)", color: "var(--text-tertiary)", fontSize: 10, fontWeight: 700 }}>CATÁLOGO</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Adherencia */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Adherencia · 30 días</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="tabular" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.6px" }}>96</span>
            <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>%</span>
            <span className="tabular" style={{ fontSize: 12, color: "var(--success-500)", fontWeight: 700, marginLeft: 8 }}>29 / 30 días</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 3, marginTop: 12 }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{
                aspectRatio: "1", borderRadius: 3,
                background: i === 18 ? "var(--surface-3)" : "var(--success-500)",
                opacity: i === 18 ? 1 : 0.85,
              }}/>
            ))}
          </div>
          <div className="tabular" style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "var(--text-tertiary)" }}>
            <span>9 abr</span><span>9 may</span>
          </div>
        </div>

        {/* Configuración */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Configuración</div>
          <ConfigRow label="Dosis" value="30 g" sub="1 scoop"/>
          <ConfigRow label="Frecuencia" value="Diaria" sub="todos los días"/>
          <ConfigRow label="Horario" value="9:00" sub="recordatorio activo"/>
          <ConfigRow label="Stock" value="22 días" sub="660 g restantes" last/>
        </div>

        {/* === BLOQUE INTEGRADO: aporte nutricional === */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Aporte nutricional</span>
            {!allNull && <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 500 }}>por {unitLabel}</span>}
          </div>

          {!allNull ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
                <NutriCellF label="kcal" value={supp.calories_kcal_per_unit} color="var(--text-primary)"/>
                <NutriCellF label="Prot." value={supp.protein_g_per_unit} unit="g" color="var(--macro-protein)"/>
                <NutriCellF label="Carbs" value={supp.carbs_g_per_unit} unit="g" color="var(--macro-carbs)"/>
                <NutriCellF label="Grasa" value={supp.fat_g_per_unit.toFixed(2)} unit="g" color="var(--macro-fat)"/>
              </div>
              <div style={{ marginTop: 12, padding: "10px 12px", background: "var(--surface)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Por porción ({supp.suggested_amount} g)</span>
                <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>
                  {perServing.kcal} kcal · {perServing.p}g P · {perServing.c}g C · {perServing.f}g G
                </span>
              </div>
              <div style={{ marginTop: 10, fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.45, fontStyle: "italic" }}>
                Verificá la etiqueta del envase. La información puede tener errores.
              </div>
            </>
          ) : (
            <div style={{ padding: "12px 14px", background: "var(--surface)", borderRadius: 10, fontSize: 12, color: "var(--text-tertiary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Sin info nutricional cargada</span>
              {owned && <span style={{ fontSize: 11, color: "var(--primary-700)", fontWeight: 700 }}>Agregar</span>}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Notas</div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {supp.notes}
          </div>
        </div>

        <div style={{ height: 80 }}/>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px 24px", display: "flex", gap: 8 }}>
        <div style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid var(--border-strong)", fontSize: 13, fontWeight: 600, textAlign: "center", color: "var(--text-secondary)" }}>Pausar</div>
        <div style={{ flex: 1.4, padding: "12px", borderRadius: 12, background: "var(--success-500)", color: "#fff", fontSize: 14, fontWeight: 700, textAlign: "center" }}>✓ Marcar como tomado</div>
      </div>
    </div>
  );
};

const NutriCellF = ({ label, value, unit, color }) => (
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


/* =========================================================
 * 1.2 CreateSupplementScreen integrado · modo create + edit
 *      Form completo con sección colapsable de nutrición.
 * ========================================================= */
const SUPPLEMENT_FORMS_F = [
  { value: "POWDER", label: "Polvo", icon: "scale" },
  { value: "CAPSULE", label: "Cápsula", icon: "pill" },
  { value: "TABLET", label: "Comprim.", icon: "pill" },
  { value: "LIQUID", label: "Líquido", icon: "droplet" },
  { value: "GUMMY", label: "Gomita", icon: "cookie" },
  { value: "OTHER", label: "Otro", icon: "more" },
];

const CreateSupplementFinal = ({ mode = "create" }) => {
  const isEdit = mode === "edit";
  const form = "POWDER";
  const unit = "G";

  // Wizard nutrición state mock
  const nutritionExpanded = true;
  const servingSize = 30;
  const perServing = { kcal: 120, p: 24, c: 3, f: 2 };
  const perUnit = {
    kcal: (perServing.kcal / servingSize).toFixed(2),
    p: (perServing.p / servingSize).toFixed(3),
    c: (perServing.c / servingSize).toFixed(3),
    f: (perServing.f / servingSize).toFixed(3),
  };

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader
        title={isEdit ? "Editar suplemento" : "Nuevo suplemento"}
        left="back"
        right={<span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Mode banner */}
        {isEdit && (
          <div style={{ padding: "8px 16px 4px" }}>
            <div style={{
              padding: "10px 12px", borderRadius: 10,
              background: "var(--surface)", display: "flex", gap: 10, alignItems: "center",
            }}>
              <Icon name="info" size={13} color="var(--text-secondary)" strokeWidth={2}/>
              <div style={{ flex: 1, fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                Estás editando un suplemento <b>USER_CUSTOM</b> de tu catálogo personal. Los CURATED no son editables.
              </div>
            </div>
          </div>
        )}

        {/* Identidad */}
        <div style={{ padding: "8px 16px 4px" }}>
          <TextField label="Nombre" required
            value={isEdit ? "Whey Protein Isolate" : "Creatina monohidrato"}
            placeholder="Ej. Creatina monohidrato"/>
          <TextField label="Marca" optional
            value={isEdit ? "Optimum Nutrition" : "MyProtein"} placeholder="Marca"/>
          <TextField label="Componente principal" optional
            value={isEdit ? "Whey Protein Isolate" : "Creatina"}
            placeholder="Ej. Whey Protein, L-Carnitina"
            hint="Ingrediente activo principal"/>
        </div>

        {/* Forma */}
        <FormSection title="Forma" hint="Requerido">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {SUPPLEMENT_FORMS_F.map(f => {
              const active = f.value === form;
              return (
                <div key={f.value} style={{
                  padding: "12px 8px", textAlign: "center",
                  borderRadius: 10,
                  border: `1px solid ${active ? "var(--primary-500)" : "var(--border)"}`,
                  background: active ? "#FFFCF0" : "var(--bg)",
                }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 4, color: active ? "var(--primary-700)" : "var(--text-secondary)" }}>
                    <Icon name={f.icon} size={20} strokeWidth={active ? 2 : 1.7}/>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "var(--text-primary)" : "var(--text-secondary)" }}>{f.label}</div>
                </div>
              );
            })}
          </div>
        </FormSection>

        {/* Dosis sugerida */}
        <FormSection title="Dosis sugerida por toma" hint="Opcional · si completás una, la otra es requerida">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 2fr", gap: 10 }}>
            <NumberField label="Cantidad" optional value={isEdit ? "30" : "5"}/>
            <SelectField label="Unidad" optional value="g (gramos)"/>
          </div>
        </FormSection>

        {/* Sección colapsable: Info nutricional */}
        <FormSection title="Info nutricional" hint="Opcional · desde la etiqueta">
          <div style={{
            padding: "12px 14px", borderRadius: 12,
            border: `1px solid ${nutritionExpanded ? "var(--primary-500)" : "var(--border)"}`,
            background: nutritionExpanded ? "#FFFCF0" : "var(--bg)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              border: `1.5px solid ${nutritionExpanded ? "var(--primary-500)" : "var(--border-strong)"}`,
              background: nutritionExpanded ? "var(--primary-500)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {nutritionExpanded && <Icon name="check" size={14} color="#0B0E11" strokeWidth={3}/>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>Tengo info nutricional</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                La cargo desde la etiqueta del envase
              </div>
            </div>
          </div>

          {nutritionExpanded && (
            <>
              <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
                Tamaño de porción
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.6fr", gap: 10 }}>
                <NumberField label="Cantidad" required value={servingSize}/>
                <SelectField label="Unidad" required value="g (gramos)"/>
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
                Ej: <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>1 scoop = 30 g</span> · 1 cápsula = 1 unidad
              </div>

              <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
                Por porción
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <NumberField label="Calorías" optional value={perServing.kcal} unit="kcal"/>
                <NumberField label="Proteína" optional value={perServing.p} unit="g"/>
                <NumberField label="Carbos" optional value={perServing.c} unit="g"/>
                <NumberField label="Grasa" optional value={perServing.f} unit="g"/>
              </div>

              <div style={{
                marginTop: 12, padding: "10px 12px", borderRadius: 10,
                background: "#0B0E11", color: "#fff",
              }}>
                <div className="tabular" style={{ fontSize: 11, lineHeight: 1.5, fontWeight: 500 }}>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Se guarda como (por gramo)</div>
                  <div>kcal/u: <span style={{ color: "var(--primary-500)" }}>{perUnit.kcal}</span> · P/u: <span style={{ color: "var(--macro-protein)" }}>{perUnit.p}</span> · C/u: <span style={{ color: "var(--macro-carbs)" }}>{perUnit.c}</span> · G/u: <span style={{ color: "var(--macro-fat)" }}>{perUnit.f}</span></div>
                </div>
              </div>

              <div style={{
                marginTop: 10, padding: "10px 12px",
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
                marginTop: 8, fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.45, fontStyle: "italic",
              }}>
                Verificá la etiqueta del envase. La información puede tener errores.
              </div>
            </>
          )}
        </FormSection>

        {/* Notas */}
        <FormSection title="Notas" hint="Opcional · 500 caracteres">
          <TextField multiline rows={3}
            value={isEdit ? "Aislado de proteína de suero. Disolver en 250 ml post-entreno." : ""}
            placeholder="Indicaciones, momento del día, contraindicaciones…"/>
        </FormSection>

        <div style={{
          margin: "8px 16px 8px", padding: "10px 12px",
          background: "var(--surface)", borderRadius: 10,
          fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.45,
        }}>
          <Icon name="info" size={11} strokeWidth={2} style={{ verticalAlign: -1, marginRight: 4 }}/>
          Marcado como <b style={{ color: "var(--text-secondary)" }}>USER_CUSTOM</b>. Solo vos lo verás en tu catálogo personal.
        </div>

        {/* Acción destructiva solo en edit */}
        {isEdit && (
          <div style={{ padding: "8px 16px 16px" }}>
            <div style={{
              padding: "12px 14px", borderRadius: 10,
              border: "1px solid var(--danger-500)",
              color: "var(--danger-500)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontSize: 13, fontWeight: 700,
            }}>
              <Icon name="x" size={14} strokeWidth={2.4}/> Eliminar suplemento
            </div>
            <div style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 6, textAlign: "center", lineHeight: 1.45 }}>
              Solo se elimina si no tiene logs ni regimens activos.
            </div>
          </div>
        )}

        <div style={{ height: 8 }}/>
      </div>

      <FormFooter primary={isEdit ? "Guardar cambios" : "Guardar suplemento"} secondary="Vista previa"/>
    </div>
  );
};


/* =========================================================
 * 1.3 SupplementRegimenScreen integrado · modo create + edit
 *      Edit: header read-only, archivar/reactivar, eliminar (1 paso).
 * ========================================================= */
const SupplementRegimenFinal = ({ mode = "create", isActive = true }) => {
  const isEdit = mode === "edit";
  const supplement = {
    name: "Creatina monohidrato",
    brand: "MyProtein",
    form: "POWDER",
  };

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader
        title={isEdit ? "Editar pauta" : "Nueva pauta"}
        left="back"
        right={<span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header del supplement: read-only en edit, "Cambiar" en create */}
        <div style={{ padding: "8px 16px 4px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 14px", borderRadius: 12,
            background: "var(--surface)", border: "1px solid var(--border)",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--macro-fiber-bg)", color: "var(--macro-fiber)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="scale" size={20}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{supplement.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{supplement.brand} · polvo</div>
            </div>
            {isEdit ? (
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4 }}>
                Fijo
              </span>
            ) : (
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary-700)" }}>Cambiar</span>
            )}
          </div>
          {isEdit && (
            <div style={{ marginTop: 6, fontSize: 10.5, color: "var(--text-tertiary)", lineHeight: 1.4, padding: "0 4px" }}>
              No se puede cambiar el suplemento de una pauta existente. Si querés otro, creá una pauta nueva.
            </div>
          )}
        </div>

        {/* Compresión visual de las secciones (forma idéntica al original — placeholder) */}
        <FormSection title="Dosis por toma">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 2fr", gap: 10 }}>
            <NumberField label="Cantidad" required value="5"/>
            <SelectField label="Unidad" required value="g (gramos)"/>
          </div>
        </FormSection>

        <FormSection title="Frecuencia y horarios">
          <SegmentedControl value="DAILY" options={[
            { value: "DAILY", label: "Diario" },
            { value: "WEEKLY", label: "Semanal" },
            { value: "AS_NEEDED", label: "Según necesidad" },
          ]}/>
          <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Chip active>9:00</Chip>
            <Chip active>13:00</Chip>
            <Chip icon="plus">Agregar</Chip>
          </div>
        </FormSection>

        <FormSection title="Stock">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <NumberField label="Inventario" required value={isEdit ? "44" : "150"} unit="g"/>
            <NumberField label="Aviso al llegar a" optional value="14" unit="días"/>
          </div>
        </FormSection>

        {/* === Edit-only: archivar / eliminar === */}
        {isEdit && (
          <>
            <div style={{ padding: "8px 16px 4px", marginTop: 6 }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
                Estado
              </div>
              <div style={{
                padding: "12px 14px", borderRadius: 10,
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: isActive ? "var(--success-50)" : "var(--surface-2)",
                  color: isActive ? "var(--success-600)" : "var(--text-tertiary)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon name={isActive ? "check" : "clock"} size={16} strokeWidth={2}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {isActive ? "Archivar este régimen" : "Reactivar régimen"}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2, lineHeight: 1.4 }}>
                    {isActive
                      ? "Lo deja en histórico, oculto de la lista activa."
                      : "Vuelve a aparecer en tu lista de pautas activas."}
                  </div>
                </div>
                <Toggle on={isActive}/>
              </div>
            </div>

            <div style={{ padding: "16px 16px 8px" }}>
              <div style={{
                padding: "12px 14px", borderRadius: 10,
                border: "1px solid var(--danger-500)",
                color: "var(--danger-500)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontSize: 13, fontWeight: 700,
              }}>
                <Icon name="x" size={14} strokeWidth={2.4}/> Eliminar régimen
              </div>
              <div style={{
                marginTop: 8, padding: "10px 12px", borderRadius: 10,
                background: "var(--surface)",
                fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5,
                display: "flex", gap: 8,
              }}>
                <Icon name="info" size={11} strokeWidth={2}/>
                <div>
                  Una sola confirmación. <b style={{ color: "var(--text-secondary)" }}>"Esto oculta el régimen y sus tomas históricas. ¿Continuar?"</b>
                </div>
              </div>
            </div>
          </>
        )}

        <div style={{ height: 8 }}/>
      </div>

      <FormFooter primary={isEdit ? "Guardar cambios" : "Guardar pauta"} secondary="Cancelar"/>
    </div>
  );
};

const Toggle = ({ on }) => (
  <div style={{
    width: 38, height: 22, borderRadius: 999,
    background: on ? "var(--success-500)" : "var(--surface-3)",
    padding: 2, display: "flex", alignItems: "center",
  }}>
    <div style={{
      width: 18, height: 18, borderRadius: 999, background: "#fff",
      transform: on ? "translateX(16px)" : "translateX(0)",
      transition: "transform 0.15s",
    }}/>
  </div>
);


/* =========================================================
 * 1.4 SupplementsScreen integrado · take-now inline + low-stock
 * ========================================================= */
const SupplementsFinal = () => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>Mi régimen</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", marginTop: 2 }}>Suplementos</div>
        </div>
        <div style={{ display: "flex", gap: 14, color: "var(--text-secondary)" }}>
          <Icon name="bell" size={20}/>
          <Icon name="plus" size={22} strokeWidth={2}/>
        </div>
      </div>

      {/* Adherencia */}
      <div style={{ margin: "0 16px 12px", padding: "14px", borderRadius: 12, border: "1px solid var(--border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Adherencia · 30 días</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
              <span className="tabular" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.4px" }}>92</span>
              <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>%</span>
              <span className="tabular" style={{ fontSize: 12, fontWeight: 700, color: "var(--success-500)", marginLeft: 6 }}>+4%</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {[1,1,1,1,0,1,1].map((v, i) => (
              <div key={i} style={{ width: 7, height: 28, borderRadius: 3, background: v ? "var(--success-500)" : "var(--surface-3)" }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Low stock alert (toca → abre edit con focus en inventory_quantity) */}
      <div style={{ margin: "0 16px 8px", padding: "10px 12px", borderRadius: 10, background: "rgba(246,70,93,0.06)", border: "1px solid rgba(246,70,93,0.25)", display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--danger-50)", color: "var(--danger-600)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="info" size={14} strokeWidth={2.2}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>Quedan pocas unidades</div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 1 }}>Magnesio bisglicinato · 6 días restantes</div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--danger-600)" }}>Reabastecer</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid var(--divider)" }}>
        <Tab active>Hoy</Tab>
        <Tab>Activos</Tab>
        <Tab>Pausados</Tab>
        <Tab>Catálogo</Tab>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "14px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Mañana · 9:00
          </div>
          <SuppCardF name="Creatina monohidrato" brand="MyProtein" dose="5 g · polvo" stock="22 días" status="taken" time="9:00"/>
          <SuppCardF name="Multivitamínico" brand="Now Foods" dose="1 cápsula" stock="14 días" status="taken" time="9:00"/>
        </div>

        <div style={{ padding: "14px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Tarde · 13:00
          </div>
          <SuppCardF name="Omega-3" brand="Solgar" dose="1 cápsula · 1000 mg" stock="42 días" status="pending" time="13:00" takeNow/>
        </div>

        <div style={{ padding: "14px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Noche · 22:00
          </div>
          <SuppCardF name="Magnesio bisglicinato" brand="Pure Encapsulations" dose="400 mg" stock="6 días" stockLow status="pending" time="22:00" takeNow/>
          <SuppCardF name="Melatonina" brand="Genérica" dose="1 mg" stock="—" status="paused" time="22:00"/>
        </div>

        {/* Toast take-now success */}
        <div style={{ padding: "8px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Estado de toast (mock)
          </div>
          <div style={{
            padding: "12px 14px", borderRadius: 12,
            background: "#0B0E11", color: "#fff",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 999, background: "var(--success-500)",
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Icon name="check" size={14} strokeWidth={2.5}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Tomada</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 1 }}>Reminder 13:00 marcado · stock −1</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary-500)" }}>Deshacer</span>
          </div>
        </div>

        {/* Bottom-sheet — sin toma elegible */}
        <div style={{ padding: "8px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Sin toma programada (409)
          </div>
          <div style={{
            padding: "16px", borderRadius: 14,
            border: "1px solid var(--border)",
          }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: "var(--surface-3)", margin: "0 auto 12px" }}/>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Sin toma programada hoy</div>
            <div style={{ fontSize: 11.5, color: "var(--text-tertiary)", lineHeight: 1.5 }}>
              No hay un recordatorio elegible para Creatina ahora mismo. Si igual la querés registrar, creá una <b>toma libre</b>.
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <div style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid var(--border-strong)", fontSize: 12.5, fontWeight: 600, textAlign: "center", color: "var(--text-secondary)" }}>Cancelar</div>
              <div style={{ flex: 1.6, padding: "10px", borderRadius: 10, background: "var(--primary-500)", color: "#0B0E11", fontSize: 13, fontWeight: 700, textAlign: "center" }}>Registrar toma libre</div>
            </div>
          </div>
        </div>

        <div style={{ height: 16 }}/>
      </div>

      <BottomNav active="me"/>
    </div>
  );
};

const SuppCardF = ({ name, brand, dose, stock, stockLow, status, time, takeNow }) => {
  const isTaken = status === "taken";
  const isPaused = status === "paused";
  return (
    <div style={{
      padding: "12px 12px", marginBottom: 8,
      border: "1px solid var(--border)", borderRadius: 12,
      background: isTaken ? "var(--surface-2)" : "var(--bg)",
      opacity: isPaused ? 0.55 : 1,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: "var(--surface-2)",
          display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", flexShrink: 0,
        }}>
          <Icon name="pill" size={20}/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: isTaken ? "var(--text-secondary)" : "var(--text-primary)", textDecoration: isTaken ? "line-through" : "none" }}>{name}</div>
            {isPaused && <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: "var(--surface-3)", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4 }}>Pausa</span>}
          </div>
          <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
            {dose} · {brand}
          </div>
          <div className="tabular" style={{ fontSize: 10, color: stockLow ? "var(--danger-500)" : "var(--text-tertiary)", marginTop: 2, fontWeight: stockLow ? 600 : 500 }}>
            {stockLow ? "⚠ stock bajo · " : "Stock: "}{stock}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <span className="tabular" style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>{time}</span>
          <div style={{
            width: 28, height: 28, borderRadius: 999,
            border: isTaken ? "none" : "1.5px solid var(--border-strong)",
            background: isTaken ? "var(--success-500)" : "transparent",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", flexShrink: 0,
          }}>
            {isTaken && <Icon name="check" size={16} strokeWidth={3}/>}
          </div>
        </div>
      </div>

      {/* Take-now inline (1.4) */}
      {takeNow && !isTaken && !isPaused && (
        <div style={{
          marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--divider)",
          display: "flex", gap: 6,
        }}>
          <div style={{ flex: 1, padding: "8px 10px", borderRadius: 8, background: "var(--primary-500)", color: "#0B0E11", fontSize: 12, fontWeight: 700, textAlign: "center" }}>
            Tomar ahora
          </div>
          <div style={{ width: 36, padding: "8px 0", borderRadius: 8, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="edit" size={14} color="var(--text-secondary)" strokeWidth={1.9}/>
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, {
  SuppDetailFinal,
  CreateSupplementFinal,
  SupplementRegimenFinal,
  SupplementsFinal,
});
