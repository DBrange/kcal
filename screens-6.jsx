/* Kcal — Screens part 6
 * Forms: Crear alimento, Crear receta, Crear suplemento.
 * Activity (logs API): listado del día + detalle.
 *
 * All screens are read-only mockups; "form" controls are visual only.
 * Field names mirror backend payloads to make handoff cleaner.
 */

/* =========================================================
 * Reusable form atoms (kept local — no shadow conflicts)
 * ========================================================= */
const FormSection = ({ title, hint, children }) => (
  <div style={{ borderTop: "1px solid var(--divider)", padding: "16px 16px 14px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
      <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>{title}</span>
      {hint && <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{hint}</span>}
    </div>
    {children}
  </div>
);

const FieldLabel = ({ children, required, optional }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>{children}</span>
    {required && <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4 }}>req</span>}
    {optional && <span style={{ fontSize: 10, color: "var(--text-tertiary)", fontWeight: 500 }}>opcional</span>}
  </div>
);

const TextField = ({ label, value, placeholder, required, optional, suffix, mono, hint, error, multiline, rows = 3 }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <FieldLabel required={required} optional={optional}>{label}</FieldLabel>}
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: multiline ? "10px 12px" : "11px 12px",
      border: `1px solid ${error ? "var(--danger-500)" : "var(--border)"}`,
      borderRadius: 10,
      background: "var(--bg)",
      minHeight: multiline ? rows * 18 : "auto",
    }}>
      <div style={{
        flex: 1,
        fontSize: 14,
        fontWeight: value ? 500 : 400,
        color: value ? "var(--text-primary)" : "var(--text-tertiary)",
        fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
        lineHeight: multiline ? 1.4 : 1,
        whiteSpace: multiline ? "pre-wrap" : "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>{value || placeholder}</div>
      {suffix && <span className="tabular" style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}>{suffix}</span>}
    </div>
    {hint && !error && <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>{hint}</div>}
    {error && <div style={{ fontSize: 11, color: "var(--danger-500)", marginTop: 4, fontWeight: 500 }}>⚠ {error}</div>}
  </div>
);

const NumberField = ({ label, value, unit, required, optional, error }) => (
  <div style={{ marginBottom: 0 }}>
    {label && <FieldLabel required={required} optional={optional}>{label}</FieldLabel>}
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "10px 12px",
      border: `1px solid ${error ? "var(--danger-500)" : "var(--border)"}`,
      borderRadius: 10,
      background: "var(--bg)",
    }}>
      <div className="tabular" style={{
        flex: 1, fontSize: 15, fontWeight: 600,
        color: value !== "" && value != null ? "var(--text-primary)" : "var(--text-tertiary)",
      }}>{value !== "" && value != null ? value : "0"}</div>
      {unit && <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, letterSpacing: 0.2 }}>{unit}</span>}
    </div>
  </div>
);

const SelectField = ({ label, value, placeholder, required, optional }) => (
  <div style={{ marginBottom: 12 }}>
    {label && <FieldLabel required={required} optional={optional}>{label}</FieldLabel>}
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "11px 12px",
      border: "1px solid var(--border)",
      borderRadius: 10,
    }}>
      <span style={{ flex: 1, fontSize: 14, fontWeight: value ? 500 : 400, color: value ? "var(--text-primary)" : "var(--text-tertiary)" }}>
        {value || placeholder}
      </span>
      <Icon name="chevronDown" size={16} color="var(--text-tertiary)"/>
    </div>
  </div>
);

const Chip = ({ active, children, onClick, icon }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "6px 10px",
    borderRadius: 999,
    border: `1px solid ${active ? "var(--primary-500)" : "var(--border)"}`,
    background: active ? "#FFF8E1" : "var(--bg)",
    color: active ? "var(--primary-700)" : "var(--text-secondary)",
    fontSize: 12, fontWeight: active ? 700 : 500,
    cursor: "pointer",
  }}>
    {icon && <Icon name={icon} size={12} strokeWidth={active ? 2.2 : 1.8}/>}
    {children}
  </div>
);

const SegmentedControl = ({ options, value }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: `repeat(${options.length}, 1fr)`,
    gap: 4,
    padding: 4,
    background: "var(--surface-2)",
    borderRadius: 10,
  }}>
    {options.map(opt => {
      const active = opt.value === value;
      return (
        <div key={opt.value} style={{
          padding: "8px 6px", textAlign: "center", borderRadius: 7,
          background: active ? "var(--bg)" : "transparent",
          fontSize: 12, fontWeight: active ? 700 : 500,
          color: active ? "var(--text-primary)" : "var(--text-secondary)",
          boxShadow: active ? "0 0 0 1px var(--border)" : "none",
        }}>{opt.label}</div>
      );
    })}
  </div>
);

const StepperRow = ({ label, value, unit }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0" }}>
    <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{label}</div>
    <div style={{
      display: "flex", alignItems: "center", gap: 0,
      border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden",
    }}>
      <div style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>−</div>
      <div className="tabular" style={{ minWidth: 42, textAlign: "center", fontSize: 13, fontWeight: 700, borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)", padding: "6px 4px" }}>{value}</div>
      <div style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>+</div>
    </div>
    {unit && <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, width: 24 }}>{unit}</span>}
  </div>
);

const FormFooter = ({ primary, secondary }) => (
  <div style={{
    borderTop: "1px solid var(--border)", padding: "10px 16px 24px",
    display: "flex", gap: 8, background: "var(--bg)",
  }}>
    {secondary && (
      <div style={{
        flex: 1, padding: "13px 14px", borderRadius: 12,
        border: "1px solid var(--border-strong)",
        fontSize: 13, fontWeight: 600, textAlign: "center",
        color: "var(--text-primary)",
      }}>{secondary}</div>
    )}
    <div style={{
      flex: secondary ? 1.6 : 1,
      padding: "13px 14px", borderRadius: 12,
      background: "var(--primary-500)", color: "#0B0E11",
      fontSize: 14, fontWeight: 700, textAlign: "center",
    }}>{primary}</div>
  </div>
);


/* =========================================================
 * 1. CREAR ALIMENTO  (POST /foods)
 * ========================================================= */
const FOOD_CATEGORIES = [
  ["DAIRY", "Lácteos", "🥛"], ["MEAT", "Carnes", "🥩"], ["FISH", "Pescados", "🐟"],
  ["FRUITS", "Frutas", "🍎"], ["VEGETABLES", "Verduras", "🥬"], ["GRAINS", "Cereales", "🌾"],
  ["LEGUMES", "Legumbres", "🫘"], ["NUTS", "Frutos secos", "🥜"], ["SEEDS", "Semillas", "🌱"],
  ["EGGS", "Huevos", "🥚"], ["OILS", "Aceites", "🫒"], ["SWEETS", "Dulces", "🍬"],
  ["BAKERY", "Panadería", "🥖"], ["BEVERAGES", "Bebidas", "🥤"], ["ALCOHOL", "Alcohol", "🍷"],
  ["PROCESSED", "Procesados", "📦"], ["CONDIMENTS", "Condimentos", "🧂"], ["SUPPLEMENTS_FOOD", "Supl. alimenticios", "💊"],
];

const CreateFoodScreen = () => {
  const activeCats = ["DAIRY"];
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Nuevo alimento" left="back" right={
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Identidad */}
        <div style={{ padding: "8px 16px 4px" }}>
          <TextField label="Nombre" required
            value="Leche entera La Serenísima 3,5%"
            placeholder="Ej. Leche entera La Serenísima 3,5%"
            hint="Hasta 120 caracteres"/>
          <TextField label="Marca" optional
            value="La Serenísima" placeholder="Marca"/>
          <TextField label="Código de barras" optional
            value="7790895000847" placeholder="Escanear o ingresar"
            mono suffix={<Icon name="barcode" size={16} color="var(--text-secondary)"/>}/>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 12px", borderRadius: 10,
            background: "var(--surface)", border: "1px dashed var(--border-strong)",
            marginBottom: 4,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
              <Icon name="barcode" size={16}/>
            </div>
            <span style={{ fontSize: 12, color: "var(--text-secondary)", flex: 1 }}>Escanear código de barras</span>
            <Icon name="chevronRight" size={16} color="var(--text-tertiary)"/>
          </div>
        </div>

        {/* Macros — required */}
        <FormSection title="Nutrientes · por 100 g" hint="Requeridos">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <NumberField label="Calorías" required value="61" unit="kcal"/>
            <NumberField label="Proteína" required value="3.2" unit="g"/>
            <NumberField label="Carbos" required value="4.7" unit="g"/>
            <NumberField label="Grasa" required value="3.5" unit="g"/>
          </div>
        </FormSection>

        {/* Sub-carbs */}
        <FormSection title="Carbohidratos — desglose" hint="Opcional">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <NumberField label="Azúcares" optional value="4.7" unit="g"/>
            <NumberField label="Az. añadidos" optional value="0" unit="g"/>
            <NumberField label="Fibra" optional value="0" unit="g"/>
          </div>
        </FormSection>

        {/* Sub-fats */}
        <FormSection title="Grasas — desglose" hint="Opcional">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <NumberField label="Saturadas" optional value="2.0" unit="g"/>
            <NumberField label="Trans" optional value="" unit="g"/>
            <NumberField label="Mono-insat." optional value="" unit="g"/>
            <NumberField label="Poli-insat." optional value="" unit="g"/>
            <NumberField label="Colesterol" optional value="14" unit="mg"/>
          </div>
        </FormSection>

        {/* Minerales y vitaminas — collapsible */}
        <FormSection title="Minerales" hint="Opcional · 7 campos">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <NumberField label="Sodio" optional value="44" unit="mg"/>
            <NumberField label="Calcio" optional value="120" unit="mg"/>
            <NumberField label="Hierro" optional value="" unit="mg"/>
            <NumberField label="Magnesio" optional value="" unit="mg"/>
            <NumberField label="Potasio" optional value="" unit="mg"/>
            <NumberField label="Zinc" optional value="" unit="mg"/>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="plus" size={12} strokeWidth={2}/> Mostrar fósforo
          </div>
        </FormSection>

        <FormSection title="Vitaminas" hint="Opcional · 9 campos">
          <div style={{ fontSize: 12, color: "var(--text-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
            <span>A · C · D · B1 · B2 · B3 · B6 · B12 · B9 (folato)</span>
            <Icon name="chevronDown" size={16} color="var(--text-tertiary)"/>
          </div>
        </FormSection>

        {/* Servings */}
        <FormSection title="Porciones" hint="Opcional · marca solo una como predeterminada">
          <ServingRow name="1 vaso" amount="200" isDefault/>
          <ServingRow name="1 taza" amount="240"/>
          <ServingRow name="1 sachet" amount="1000"/>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "10px 12px", marginTop: 8,
            border: "1px dashed var(--border-strong)", borderRadius: 10,
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
          }}>
            <Icon name="plus" size={14} strokeWidth={2}/> Agregar porción
          </div>
        </FormSection>

        {/* Categorías */}
        <FormSection title="Categorías" hint="Opcional · multi-select">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {FOOD_CATEGORIES.map(([key, label, emoji]) => (
              <Chip key={key} active={activeCats.includes(key)}>
                <span style={{ fontSize: 12 }}>{emoji}</span>{label}
              </Chip>
            ))}
          </div>
        </FormSection>

        {/* Server-forced fields hint */}
        <div style={{
          margin: "8px 16px 16px", padding: "10px 12px",
          background: "var(--surface)", borderRadius: 10,
          fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.45,
        }}>
          <Icon name="info" size={11} strokeWidth={2} style={{ verticalAlign: -1, marginRight: 4 }}/>
          El servidor marca este alimento como <b style={{ color: "var(--text-secondary)" }}>USER_CUSTOM</b> y registra tu autoría automáticamente.
        </div>
      </div>

      <FormFooter primary="Guardar alimento" secondary="Vista previa"/>
    </div>
  );
};

const ServingRow = ({ name, amount, isDefault }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 12px", marginBottom: 6,
    border: `1px solid ${isDefault ? "var(--primary-500)" : "var(--border)"}`,
    background: isDefault ? "#FFFCF0" : "var(--bg)",
    borderRadius: 10,
  }}>
    <div style={{
      width: 16, height: 16, borderRadius: 999,
      border: `1.5px solid ${isDefault ? "var(--primary-500)" : "var(--border-strong)"}`,
      background: isDefault ? "var(--primary-500)" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      {isDefault && <div style={{ width: 6, height: 6, borderRadius: 999, background: "#0B0E11" }}/>}
    </div>
    <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{name}</div>
    <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>{amount}</span>
    <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600 }}>g</span>
    <Icon name="x" size={14} color="var(--text-tertiary)" strokeWidth={2}/>
  </div>
);


/* =========================================================
 * 2. CREAR RECETA (POST /recipes)
 * ========================================================= */
const RECIPE_TAGS = [
  "HIGH_PROTEIN", "LOW_CARB", "VEGAN", "VEGETARIAN", "GLUTEN_FREE", "LACTOSE_FREE",
];
const RECIPE_TAG_LABELS = {
  HIGH_PROTEIN: "Alta proteína", LOW_CARB: "Bajo en carbos",
  VEGAN: "Vegana", VEGETARIAN: "Vegetariana",
  GLUTEN_FREE: "Sin gluten", LACTOSE_FREE: "Sin lactosa",
};

const CreateRecipeScreen = () => {
  const activeTags = ["HIGH_PROTEIN", "GLUTEN_FREE"];
  const activeCats = ["MEAT", "GRAINS"];
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Nueva receta" left="back" right={
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Foto */}
        <div style={{ padding: "8px 16px 4px" }}>
          <div style={{
            height: 140, borderRadius: 12,
            background: "#7FA858",
            backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 12px)",
            position: "relative",
            display: "flex", alignItems: "flex-end", padding: 10,
            marginBottom: 14,
          }}>
            <div style={{
              padding: "6px 10px", borderRadius: 999,
              background: "rgba(0,0,0,0.55)", color: "#fff",
              fontSize: 11, fontWeight: 600, display: "flex", alignItems: "center", gap: 4,
            }}>
              <Icon name="camera" size={12} strokeWidth={2}/> Cambiar foto
            </div>
          </div>

          <TextField label="Nombre" required
            value="Bowl de pollo y quinoa"
            placeholder="Nombre de la receta"/>
          <TextField label="Descripción" optional multiline rows={3}
            value="Plato completo, balanceado y rápido. Ideal para meal prep — aguanta 3 días en heladera."
            placeholder="Cuenta de qué va esta receta"
            hint="Hasta 500 caracteres"/>
        </div>

        {/* Tiempos y porciones */}
        <FormSection title="Tiempos y rendimiento">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <NumberField label="Porciones" required value="2" unit="porc."/>
            <NumberField label="Prep" optional value="10" unit="min"/>
            <NumberField label="Cocción" optional value="15" unit="min"/>
          </div>
        </FormSection>

        {/* Ingredientes */}
        <FormSection title="Ingredientes" hint="Mínimo 1 · arrastrá para reordenar">
          <IngredientRow n={1} food="Pechuga de pollo" qty="300" unit="g" mode="GRAMS"/>
          <IngredientRow n={2} food="Quinoa" qty="150" unit="g" mode="GRAMS"/>
          <IngredientRow n={3} food="Palta" qty="1" unit="unidad" mode="SERVING" servingName="1 palta mediana"/>
          <IngredientRow n={4} food="Tomate cherry" qty="200" unit="g" mode="GRAMS"/>
          <IngredientRow n={5} food="Aceite de oliva" qty="1" unit="cda" mode="SERVING" servingName="1 cucharada (15 ml)"/>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "10px 12px", marginTop: 8,
            border: "1px dashed var(--border-strong)", borderRadius: 10,
            color: "var(--text-secondary)", fontSize: 13, fontWeight: 600,
          }}>
            <Icon name="search" size={14} strokeWidth={2}/> Buscar ingrediente
          </div>
        </FormSection>

        {/* Pasos */}
        <FormSection title="Preparación" hint="Cada línea es un paso · orden importa">
          <StepRow n={1} text="Cocinar la quinoa en agua hirviendo con sal por 15 min, escurrir."/>
          <StepRow n={2} text="Saltear el pollo cortado en cubos con aceite de oliva 7-8 min."/>
          <StepRow n={3} text="Cortar la palta y los tomates cherry en mitades."/>
          <StepRow n={4} text="Armar el bowl con quinoa de base, pollo, palta y tomates."/>
          <StepRow n={5} text=""/>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "8px 12px", marginTop: 4,
            color: "var(--text-secondary)", fontSize: 12, fontWeight: 600,
          }}>
            <Icon name="plus" size={12} strokeWidth={2}/> Agregar paso
          </div>
        </FormSection>

        {/* Categorías + tags */}
        <FormSection title="Categorías y etiquetas" hint="Opcional">
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>Tags de receta</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {RECIPE_TAGS.map(t => (
              <Chip key={t} active={activeTags.includes(t)}>{RECIPE_TAG_LABELS[t]}</Chip>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>Tipo de comida</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {FOOD_CATEGORIES.slice(0, 10).map(([key, label, emoji]) => (
              <Chip key={key} active={activeCats.includes(key)}>
                <span style={{ fontSize: 12 }}>{emoji}</span>{label}
              </Chip>
            ))}
            <Chip>+ 8 más</Chip>
          </div>
        </FormSection>

        {/* Calculated nutrition note */}
        <div style={{
          margin: "8px 16px 16px", padding: "12px 14px",
          background: "var(--surface)", borderRadius: 10,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Icon name="info" size={14} color="var(--text-secondary)" strokeWidth={2}/>
          <div style={{ flex: 1, fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.45 }}>
            La nutrición se calcula automáticamente al guardar, sumando los ingredientes. Estimación actual:
            <span className="tabular" style={{ display: "block", marginTop: 4, color: "var(--text-primary)", fontWeight: 700 }}>412 kcal · 38 P · 42 C · 11 G  <span style={{ fontWeight: 500, color: "var(--text-tertiary)" }}>(por porción)</span></span>
          </div>
        </div>
      </div>

      <FormFooter primary="Guardar receta" secondary="Vista previa"/>
    </div>
  );
};

const IngredientRow = ({ n, food, qty, unit, mode, servingName }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 12px", marginBottom: 6,
    border: "1px solid var(--border)", borderRadius: 10,
  }}>
    <div style={{
      width: 14, height: 14, color: "var(--text-tertiary)",
      display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, flexShrink: 0,
    }}>
      <div style={{ height: 1.5, background: "currentColor", borderRadius: 1 }}/>
      <div style={{ height: 1.5, background: "currentColor", borderRadius: 1 }}/>
      <div style={{ height: 1.5, background: "currentColor", borderRadius: 1 }}/>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{food}</div>
      <div style={{ fontSize: 10.5, color: "var(--text-tertiary)", marginTop: 1 }}>
        {mode === "SERVING" ? `Porción · ${servingName}` : "En gramos"}
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span className="tabular" style={{ fontSize: 13, fontWeight: 700, minWidth: 28, textAlign: "right" }}>{qty}</span>
      <span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, minWidth: 30 }}>{unit}</span>
    </div>
    <Icon name="x" size={14} color="var(--text-tertiary)" strokeWidth={2}/>
  </div>
);

const StepRow = ({ n, text }) => (
  <div style={{
    display: "flex", gap: 10, alignItems: "flex-start",
    padding: "10px 0", borderTop: n > 1 ? "1px solid var(--divider)" : "none",
  }}>
    <div style={{
      width: 22, height: 22, borderRadius: 999, background: "var(--surface-2)",
      color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
    }} className="tabular">{n}</div>
    <div style={{ flex: 1, fontSize: 13, color: text ? "var(--text-primary)" : "var(--text-tertiary)", lineHeight: 1.45, fontWeight: text ? 400 : 400, fontStyle: text ? "normal" : "italic" }}>
      {text || "Describí el paso…"}
    </div>
    <Icon name="x" size={14} color="var(--text-tertiary)" strokeWidth={2} style={{ marginTop: 4 }}/>
  </div>
);


/* =========================================================
 * 3. CREAR SUPLEMENTO (POST /supplements)
 * ========================================================= */
const SUPPLEMENT_FORMS = [
  { value: "CAPSULE", label: "Cápsula", icon: "pill" },
  { value: "TABLET", label: "Comprim.", icon: "pill" },
  { value: "POWDER", label: "Polvo", icon: "scale" },
  { value: "LIQUID", label: "Líquido", icon: "droplet" },
  { value: "GUMMY", label: "Gomita", icon: "cookie" },
  { value: "OTHER", label: "Otro", icon: "plus" },
];
const SUPPLEMENT_UNITS = [
  { value: "G", label: "g" }, { value: "MG", label: "mg" }, { value: "MCG", label: "mcg" },
  { value: "IU", label: "UI" }, { value: "ML", label: "ml" }, { value: "UNIT", label: "unidad" },
];

const CreateSupplementScreen = () => {
  const form = "POWDER";
  const unit = "G";
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Nuevo suplemento" left="back" right={
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-tertiary)" }}>Cancelar</span>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Identidad */}
        <div style={{ padding: "8px 16px 4px" }}>
          <TextField label="Nombre" required
            value="Creatina monohidrato"
            placeholder="Ej. Creatina monohidrato"/>
          <TextField label="Marca" optional
            value="MyProtein" placeholder="Marca"/>
          <TextField label="Componente principal" optional
            value="Creatina"
            placeholder="Ej. Whey Protein, L-Carnitina"
            hint="Ingrediente activo principal"/>
        </div>

        {/* Forma — required */}
        <FormSection title="Forma" hint="Requerido">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {SUPPLEMENT_FORMS.map(f => {
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
            <NumberField label="Cantidad" optional value="5"/>
            <SelectField label="Unidad" optional value="g (gramos)"/>
          </div>

          <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-tertiary)", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>Unidades disponibles</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SUPPLEMENT_UNITS.map(u => (
              <Chip key={u.value} active={u.value === unit}>{u.label}</Chip>
            ))}
          </div>

          <div style={{
            marginTop: 14, padding: "10px 12px",
            background: "var(--surface)", borderRadius: 10,
            display: "flex", gap: 10, alignItems: "center",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, background: "var(--bg)",
              border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="scale" size={16} color="var(--text-secondary)"/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Vista previa</div>
              <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
                "5 g de Creatina monohidrato — Polvo"
              </div>
            </div>
          </div>
        </FormSection>

        {/* Notas */}
        <FormSection title="Notas" hint="Opcional · 500 caracteres">
          <TextField multiline rows={4}
            value="Tomar 1 vez al día, idealmente post-entrenamiento, disuelta en 200 ml de agua o jugo. Mantener fase de carga 5-7 días, luego dosis de mantenimiento."
            placeholder="Indicaciones, momento del día, contraindicaciones…"/>
        </FormSection>

        {/* Programación opcional — UX sugerencia */}
        <FormSection title="Programación" hint="Opcional · podés agregarla después">
          <div style={{
            padding: "12px 14px", borderRadius: 10,
            background: "var(--surface)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <Icon name="clock" size={16} color="var(--text-secondary)"/>
            <span style={{ flex: 1, fontSize: 12.5, color: "var(--text-secondary)" }}>Definir horarios y recordatorios</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--primary-700)" }}>Configurar</span>
          </div>
        </FormSection>

        <div style={{
          margin: "8px 16px 16px", padding: "10px 12px",
          background: "var(--surface)", borderRadius: 10,
          fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.45,
        }}>
          <Icon name="info" size={11} strokeWidth={2} style={{ verticalAlign: -1, marginRight: 4 }}/>
          Marcado como <b style={{ color: "var(--text-secondary)" }}>USER_CUSTOM</b>. Solo vos lo verás en tu catálogo personal.
        </div>
      </div>

      <FormFooter primary="Guardar suplemento" secondary="Vista previa"/>
    </div>
  );
};


/* =========================================================
 * 4. DETALLE DE ACTIVIDAD FÍSICA  (GET /activity-logs/:id)
 *    Read-only — append-only logs. No edit/delete in MVP.
 * ========================================================= */
const ACTIVITY_CATEGORY_LABELS = {
  CARDIO: { label: "Cardio", color: "var(--danger-500)", bg: "var(--danger-50)", icon: "trending" },
  STRENGTH: { label: "Fuerza", color: "var(--macro-fiber)", bg: "var(--macro-fiber-bg)", icon: "scale" },
  SPORTS: { label: "Deportes", color: "var(--info-500)", bg: "#E1ECFE", icon: "target" },
  FLEXIBILITY: { label: "Flexibilidad", color: "var(--macro-protein)", bg: "var(--macro-protein-bg)", icon: "droplet" },
  DAILY: { label: "Cotidiana", color: "var(--text-secondary)", bg: "var(--surface-2)", icon: "home" },
};

const ActivityLogDetailScreen = () => {
  const data = {
    id: "0c8e2…7a3f",
    activity_id: "ce92…b14",
    activity_name: "Running, jogging, general",
    activity_name_es: "Correr · trote suave",
    category: "CARDIO",
    met_value: 7.0,
    duration_min: 32,
    performed_at: "Domingo 3 may · 7:15",
    log_date: "2025-05-03",
    calories_burned: 218,
    notes: "Trote en el parque por el lago. Buen clima, terminé sin agitarme. Ritmo cómodo, charlable.",
  };
  const cat = ACTIVITY_CATEGORY_LABELS[data.category];

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Detalle de actividad" left="back"/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Hero */}
        <div style={{ padding: "8px 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: cat.bg,
              display: "flex", alignItems: "center", justifyContent: "center", color: cat.color,
            }}>
              <Icon name={cat.icon} size={22} strokeWidth={1.9}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "inline-block", padding: "2px 8px", borderRadius: 999, background: cat.bg, color: cat.color, fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3, marginBottom: 4 }}>
                {cat.label}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.2px", lineHeight: 1.2 }}>{data.activity_name_es}</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2, fontStyle: "italic" }}>
                {data.activity_name}
              </div>
            </div>
          </div>

          {/* Big calorie number */}
          <div style={{
            padding: "16px 18px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
          }}>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Calorías quemadas</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
              <span className="tabular" style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.6px", color: "var(--macro-fat)" }}>−{data.calories_burned}</span>
              <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>kcal</span>
            </div>
            <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 4 }}>
              Calculado al registrar · MET {data.met_value.toFixed(1)} × {data.duration_min} min × peso
            </div>
          </div>
        </div>

        {/* Métricas read-only */}
        <FormSection title="Datos del registro">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <ReadOnlyField icon="clock" label="Duración" value={`${data.duration_min}`} unit="min"/>
            <ReadOnlyField icon="flame" label="MET" value={data.met_value.toFixed(1)} hint="Compendium"/>
            <ReadOnlyField icon="utensils" label="Realizada" value="Dom · 7:15" hint="3 may 2025"/>
            <ReadOnlyField icon="target" label="Día asignado" value="2025-05-03" mono/>
          </div>
        </FormSection>

        {/* IDs (debug-friendly, optional in real app) */}
        <FormSection title="Identificadores">
          <KeyValueRow label="ID del registro" value={data.id} mono/>
          <KeyValueRow label="ID de actividad" value={data.activity_id} mono/>
          <KeyValueRow label="Fuente" value={<span style={{ display: "inline-block", padding: "1px 6px", borderRadius: 4, background: "var(--surface-2)", fontSize: 10, fontWeight: 700, color: "var(--text-secondary)", letterSpacing: 0.3 }}>SISTEMA</span>}/>
        </FormSection>

        {/* Notas */}
        <FormSection title="Nota">
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {data.notes}
          </div>
        </FormSection>

        {/* Append-only notice */}
        <div style={{
          margin: "0 16px 16px", padding: "12px 14px",
          background: "var(--warning-500)", backgroundColor: "rgba(240,185,11,0.08)",
          border: "1px solid rgba(240,185,11,0.3)",
          borderRadius: 10, display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <Icon name="info" size={14} color="var(--primary-700)" strokeWidth={2}/>
          <div style={{ flex: 1, fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.45 }}>
            <b style={{ color: "var(--text-primary)" }}>Registro inmutable.</b> Los logs de actividad son append-only — no se pueden editar ni borrar. Si te equivocaste, registrá una corrección con la duración correcta.
          </div>
        </div>

        <div style={{ height: 16 }}/>
      </div>
    </div>
  );
};

const ReadOnlyField = ({ icon, label, value, unit, hint, mono }) => (
  <div style={{ padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 10 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4, color: "var(--text-tertiary)" }}>
      {icon && <Icon name={icon} size={11} strokeWidth={1.8}/>}
      <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</span>
    </div>
    <div className={mono ? "tabular" : "tabular"} style={{
      fontSize: mono ? 12 : 16, fontWeight: 700,
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
    }}>
      {value}{unit && <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-tertiary)" }}> {unit}</span>}
    </div>
    {hint && <div style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 2 }}>{hint}</div>}
  </div>
);

const KeyValueRow = ({ label, value, mono }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
    padding: "10px 0", borderTop: "1px solid var(--divider)",
  }}>
    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</span>
    <span className={mono ? "tabular" : ""} style={{
      fontSize: mono ? 11 : 13, fontWeight: mono ? 600 : 700,
      fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)",
      color: "var(--text-primary)",
    }}>{value}</span>
  </div>
);


/* =========================================================
 * 5. LISTADO DE ACTIVIDADES DEL DÍA  (GET /activity-logs?date=)
 * ========================================================= */
const ActivityLogListScreen = () => {
  const items = [
    { id: "1", activity_name_es: "Correr · trote suave", activity_name: "Running, jogging, general", category: "CARDIO", duration_min: 32, performed_at: "07:15", calories_burned: 218 },
    { id: "2", activity_name_es: "Pesas · tren superior", activity_name: "Weight lifting, vigorous", category: "STRENGTH", duration_min: 18, performed_at: "12:30", calories_burned: 66 },
    { id: "3", activity_name_es: "Caminar al trabajo", activity_name: "Walking, 4.0 mph, brisk", category: "DAILY", duration_min: 14, performed_at: "08:45", calories_burned: 42 },
    { id: "4", activity_name_es: "Yoga restaurativa", activity_name: "Yoga, hatha", category: "FLEXIBILITY", duration_min: 25, performed_at: "20:00", calories_burned: 58 },
  ];
  const totalKcal = items.reduce((s, i) => s + i.calories_burned, 0);
  const totalMin = items.reduce((s, i) => s + i.duration_min, 0);

  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header con date picker */}
      <div style={{ padding: "8px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>Actividad física</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
            <Icon name="chevronLeft" size={18} color="var(--text-secondary)"/>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px" }}>Domingo 3 may</span>
            <Icon name="chevronRight" size={18} color="var(--text-secondary)"/>
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, color: "var(--text-secondary)" }}>
          <Icon name="utensils" size={20}/>
          <Icon name="plus" size={22} strokeWidth={2}/>
        </div>
      </div>

      {/* Hero totales */}
      <div style={{ padding: "8px 16px 14px" }}>
        <div style={{
          padding: "16px 18px", borderRadius: 14,
          background: "var(--surface)", border: "1px solid var(--border)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Total quemado</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                <span className="tabular" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.6px", color: "var(--macro-fat)" }}>−{totalKcal}</span>
                <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>kcal</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Tiempo activo</div>
              <div className="tabular" style={{ fontSize: 22, fontWeight: 700, marginTop: 2 }}>{totalMin}<span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}> min</span></div>
              <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{items.length} sesiones</div>
            </div>
          </div>

          {/* breakdown bar by category */}
          <div style={{ display: "flex", gap: 2, height: 6, borderRadius: 3, overflow: "hidden", marginTop: 14 }}>
            {items.map(it => {
              const cat = ACTIVITY_CATEGORY_LABELS[it.category];
              const pct = (it.calories_burned / totalKcal) * 100;
              return <div key={it.id} style={{ width: `${pct}%`, background: cat.color }}/>;
            })}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
            {Object.entries(
              items.reduce((acc, it) => {
                acc[it.category] = (acc[it.category] || 0) + it.calories_burned;
                return acc;
              }, {})
            ).map(([catKey, kcal]) => {
              const cat = ACTIVITY_CATEGORY_LABELS[catKey];
              return (
                <div key={catKey} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 999, background: cat.color }}/>
                  <span style={{ fontSize: 10.5, color: "var(--text-secondary)", fontWeight: 500 }}>{cat.label}</span>
                  <span className="tabular" style={{ fontSize: 10.5, color: "var(--text-tertiary)", fontWeight: 600 }}>{kcal}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid var(--divider)" }}>
        <Tab active>Sesiones</Tab>
        <Tab>Por categoría</Tab>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "12px 16px 4px" }}>
          {items.map(it => <ActivityLogRow key={it.id} item={it}/>)}
        </div>

        {/* Quick add via texto libre + manual */}
        <div style={{ padding: "8px 16px 14px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>
            Agregar actividad
          </div>
          <div style={{
            padding: "12px 14px", borderRadius: 12,
            background: "var(--bg)", border: "1px solid var(--border)",
            marginBottom: 8, display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="edit" size={16}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Describilo en una frase</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>"Corrí 30 min y 45 min de yoga" — la IA crea los registros</div>
            </div>
            <Icon name="chevronRight" size={16} color="var(--text-tertiary)"/>
          </div>
          <div style={{
            padding: "12px 14px", borderRadius: 12,
            background: "var(--bg)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="search" size={16}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Elegir del catálogo</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>Buscar entre +800 actividades del Compendium</div>
            </div>
            <Icon name="chevronRight" size={16} color="var(--text-tertiary)"/>
          </div>
        </div>

        <div style={{ height: 16 }}/>
      </div>

      <BottomNav active="home"/>
    </div>
  );
};

const ActivityLogRow = ({ item }) => {
  const cat = ACTIVITY_CATEGORY_LABELS[item.category];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 14px", marginBottom: 8,
      border: "1px solid var(--border)", borderRadius: 12,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: cat.bg, color: cat.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon name={cat.icon} size={20} strokeWidth={1.9}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.activity_name_es}
          </span>
        </div>
        <div className="tabular" style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>
          {item.duration_min} min · {item.performed_at} · <span style={{ color: cat.color, fontWeight: 600 }}>{cat.label}</span>
        </div>
      </div>
      <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
        <span className="tabular" style={{ fontSize: 14, fontWeight: 700, color: "var(--macro-fat)" }}>−{item.calories_burned}</span>
        <Icon name="chevronRight" size={14} color="var(--text-tertiary)"/>
      </div>
    </div>
  );
};


/* === Export === */
Object.assign(window, {
  CreateFoodScreen, CreateRecipeScreen, CreateSupplementScreen,
  ActivityLogDetailScreen, ActivityLogListScreen,
  // helper atoms (in case other screens want to reuse)
  FormSection, FieldLabel, TextField, NumberField, SelectField,
  Chip, SegmentedControl, FormFooter, ReadOnlyField, KeyValueRow,
});
