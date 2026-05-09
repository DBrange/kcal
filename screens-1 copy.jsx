/* Kcal — Screens part 1: Home, Search, FoodDetail */

const HomeScreen = ({ cardStyle = "with-photo", widgetVariant = "curve" }) => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Header bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 16px 4px",
      }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>Mayo 2026</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", marginTop: 2 }}>Hoy</div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center", color: "var(--text-secondary)" }}>
          <Icon name="search" size={22}/>
          <div style={{ position: "relative" }}>
            <Icon name="bell" size={22}/>
            <div style={{ position: "absolute", top: -1, right: -1, width: 7, height: 7, background: "var(--danger-500)", borderRadius: 999, border: "1.5px solid var(--bg)" }}/>
          </div>
        </div>
      </div>

      {/* Week strip */}
      <WeekStrip activeIndex={6}/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Calorie widget */}
        <CalorieWidget variant={widgetVariant}/>

        {/* Quick actions row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
          padding: "16px 16px 8px",
        }}>
          {[
            { icon: "search", label: "Buscar" },
            { icon: "barcode", label: "Escanear" },
            { icon: "camera", label: "Foto IA" },
            { icon: "droplet", label: "Agua" },
          ].map((q, i) => (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              padding: "12px 4px", borderRadius: 12,
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}>
              <Icon name={q.icon} size={20} color="var(--text-primary)" strokeWidth={1.8}/>
              <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-secondary)" }}>{q.label}</span>
            </div>
          ))}
        </div>

        {/* Water + Steps inline mini stats */}
        <div style={{ padding: "8px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <MiniStat icon="droplet" color="var(--macro-water)" label="Agua" value="1.4" unit="/ 2.5 L" pct={0.56}/>
          <MiniStat icon="flame" color="var(--primary-500)" label="Quemadas" value="284" unit="kcal · 6.2k pasos" pct={0.34}/>
        </div>

        {/* Meals */}
        <div style={{ marginTop: 8 }}>
          <MealSection
            icon="coffee" name="Desayuno" subtitle="8:30 am · 412 kcal"
            kcal={412} target={562} cardStyle={cardStyle}
            items={[
              { name: "Avena con banana y miel", brand: "Casero", qty: "1 taza · 250 g", kcal: 287, swatch: "#E8DCC4" },
              { name: "Café con leche descremada", brand: null, qty: "1 taza · 240 ml", kcal: 65, swatch: "#A78668" },
              { name: "Yogur griego natural", brand: "La Serenísima", qty: "1 pote · 150 g", kcal: 120, swatch: "#F5E9D7" },
            ]}
          />
          <MealSection
            icon="utensils" name="Almuerzo" subtitle="13:15 · 678 kcal"
            kcal={678} target={787} cardStyle={cardStyle}
            items={[
              { name: "Milanesa de pollo al horno", brand: "Casero", qty: "1 unidad · 180 g", kcal: 342, swatch: "#D4A574" },
              { name: "Ensalada mixta con palta", brand: null, qty: "1 plato · 220 g", kcal: 186, swatch: "#7FA858" },
              { name: "Arroz integral", brand: "Gallo", qty: "½ taza · 100 g", kcal: 150, swatch: "#E8DCC4" },
            ]}
          />
          <MealSection
            icon="cookie" name="Merienda" subtitle="17:45 · 312 kcal"
            kcal={312} target={337} cardStyle={cardStyle}
            items={[
              { name: "Tostadas con queso crema", brand: "Casero", qty: "2 unidades", kcal: 220, swatch: "#E8C896" },
              { name: "Manzana", brand: null, qty: "1 mediana · 180 g", kcal: 92, swatch: "#C44848" },
            ]}
          />
          <MealSection
            icon="moon" name="Cena" subtitle="Sin registrar"
            kcal={440} target={561} cardStyle={cardStyle}
            items={[]}
          />

          {/* Suplementos */}
          <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "var(--surface-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-secondary)",
                }}>
                  <Icon name="pill" size={16}/>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Suplementos</div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>2 de 4 tomados</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Ver todos</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 6 }}>
              <SuppRow name="Creatina monohidrato" dose="5 g" time="9:00" done/>
              <SuppRow name="Multivitamínico" dose="1 cápsula" time="9:00" done/>
              <SuppRow name="Omega-3" dose="1 cápsula" time="13:00"/>
              <SuppRow name="Magnesio" dose="400 mg" time="22:00"/>
            </div>
          </div>

          {/* Actividad física */}
          <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "var(--surface-2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--text-secondary)",
                }}>
                  <Icon name="flame" size={16}/>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Actividad física</div>
                  <div style={{ fontSize: 11, color: "var(--text-tertiary)" }} className="tabular">284 kcal · 47 min</div>
                </div>
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
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <ExerciseRow icon="trending" name="Correr" detail="32 min · ritmo medio" kcal={218} time="7:15"/>
              <ExerciseRow icon="scale" name="Pesas — tren superior" detail="4 ejercicios · 18 min" kcal={66} time="18:30"/>
            </div>
          </div>

          {/* Notas del día */}
          <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: "var(--surface-2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-secondary)",
              }}>
                <Icon name="edit" size={16}/>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Notas del día</div>
            </div>
            <div style={{
              padding: "10px 12px", borderRadius: 10,
              background: "var(--surface-2)",
              fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45,
            }}>
              Dormí 7h. Energía media en el entreno. Probé un nuevo desayuno con avena.
            </div>
          </div>

          {/* Resumen del día */}
          <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px 16px" }}>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
              Resumen del día
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <SummaryStat label="Consumido" value="1,842" unit="kcal"/>
              <SummaryStat label="Quemado" value="284" unit="kcal" delta="−"/>
              <SummaryStat label="Balance neto" value="1,558" unit="kcal" sub="vs 2,247 meta"/>
              <SummaryStat label="Déficit del día" value="−689" unit="kcal" color="var(--success-500)"/>
            </div>
          </div>

          <div style={{ height: 24 }}/>
        </div>
      </div>

      <BottomNav active="home"/>
    </div>
  );
};

const MiniStat = ({ icon, color, label, value, unit, pct }) => (
  <div style={{
    border: "1px solid var(--border)", borderRadius: 12,
    padding: "10px 12px",
    background: "var(--bg)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <Icon name={icon} size={14} color={color} strokeWidth={2}/>
      <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
    </div>
    <div className="tabular" style={{ fontSize: 16, fontWeight: 700 }}>
      {value}
      <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-tertiary)" }}> {unit}</span>
    </div>
    <div style={{ height: 3, background: "var(--surface-3)", borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct*100}%`, background: color, borderRadius: 2 }}/>
    </div>
  </div>
);

const SuppRow = ({ name, dose, time, done }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "8px 10px", borderRadius: 10,
    background: done ? "var(--surface-2)" : "var(--bg)",
    border: "1px solid var(--border)",
  }}>
    <div style={{
      width: 22, height: 22, borderRadius: 999,
      border: done ? "none" : "1.5px solid var(--border-strong)",
      background: done ? "var(--success-500)" : "transparent",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", flexShrink: 0,
    }}>
      {done && <Icon name="check" size={14} strokeWidth={3}/>}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, fontWeight: 500, color: done ? "var(--text-secondary)" : "var(--text-primary)",
        textDecoration: done ? "line-through" : "none" }}>{name}</div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{dose}</div>
    </div>
    <div className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{time}</div>
  </div>
);

const ExerciseRow = ({ icon, name, detail, kcal, time }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0" }}>
    <div style={{
      width: 36, height: 36, borderRadius: 8,
      background: "var(--surface-2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "var(--text-primary)", flexShrink: 0,
    }}>
      <Icon name={icon} size={16}/>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)" }} className="tabular">{detail} · {time}</div>
    </div>
    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--macro-fat)" }} className="tabular">−{kcal}</div>
  </div>
);

const SummaryStat = ({ label, value, unit, sub, delta, color }) => (
  <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "10px 12px" }}>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 2 }}>
      <span className="tabular" style={{ fontSize: 18, fontWeight: 700, color: color || "var(--text-primary)" }}>{delta}{value}</span>
      <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{unit}</span>
    </div>
    {sub && <div style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 2 }}>{sub}</div>}
  </div>
);

/* =================== SEARCH =================== */
const SearchScreen = () => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="Agregar al almuerzo" left="close" right={<Icon name="sliders" size={20}/>}/>

      {/* Search bar */}
      <div style={{ padding: "4px 16px 12px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 12px", borderRadius: 10,
          background: "var(--surface-2)",
        }}>
          <Icon name="search" size={18} color="var(--text-secondary)"/>
          <span style={{ fontSize: 14, color: "var(--text-primary)", flex: 1 }}>milanesa</span>
          <Icon name="x" size={16} color="var(--text-tertiary)"/>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 18, padding: "0 16px",
        borderBottom: "1px solid var(--divider)",
      }}>
        <Tab active>Todos</Tab>
        <Tab>Recientes</Tab>
        <Tab>Favoritos</Tab>
        <Tab>Mis comidas</Tab>
      </div>

      {/* Add methods row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8,
        padding: "12px 16px",
      }}>
        {[
          { icon: "barcode", label: "Código" },
          { icon: "camera", label: "Foto" },
          { icon: "edit", label: "Manual" },
          { icon: "book", label: "Receta" },
        ].map((m, i) => (
          <div key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "10px 4px", borderRadius: 10,
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}>
            <Icon name={m.icon} size={18} strokeWidth={1.8}/>
            <span style={{ fontSize: 10.5, color: "var(--text-secondary)", fontWeight: 500 }}>{m.label}</span>
          </div>
        ))}
      </div>

      {/* Section: results */}
      <div style={{ padding: "4px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>14 resultados</span>
        <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>kcal por porción ↓</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {[
          { name: "Milanesa de pollo al horno", brand: "Casero", qty: "180 g", kcal: 342, source: "verified", swatch: "#D4A574", fav: true },
          { name: "Milanesa napolitana", brand: "Restaurante", qty: "1 unidad · 220 g", kcal: 528, source: "community", swatch: "#C44848" },
          { name: "Milanesa de carne", brand: "Casero", qty: "150 g", kcal: 298, source: "verified", swatch: "#A0613A" },
          { name: "Milanesa de soja", brand: "Granja del Sol", qty: "1 unidad · 100 g", kcal: 178, source: "brand", swatch: "#7FA858" },
          { name: "Milanesa de berenjena", brand: "Casero", qty: "120 g", kcal: 156, source: "verified", swatch: "#8B6FB8" },
          { name: "Milanesa de pollo congelada", brand: "Granja del Sol", qty: "1 unidad · 90 g", kcal: 224, source: "brand", swatch: "#E8C896" },
          { name: "Sándwich de milanesa", brand: "Casero", qty: "1 unidad", kcal: 612, source: "community", swatch: "#D4A574" },
        ].map((r, i) => <SearchResultRow key={i} {...r}/>)}
      </div>

      {/* Floating bottom: selected count */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "10px 16px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "var(--bg)",
      }}>
        <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>2</span> seleccionados · <span className="tabular" style={{ fontWeight: 600, color: "var(--text-primary)" }}>520</span> kcal
        </div>
        <div style={{
          background: "var(--primary-500)",
          color: "#0B0E11",
          padding: "10px 18px", borderRadius: 10,
          fontSize: 14, fontWeight: 600,
        }}>Agregar</div>
      </div>
    </div>
  );
};

const SearchResultRow = ({ name, brand, qty, kcal, source, swatch, fav }) => {
  const sourceConfig = {
    verified: { label: "Verificado", color: "var(--success-500)" },
    brand:    { label: "Marca",      color: "var(--info-500)" },
    community:{ label: "Comunidad",  color: "var(--text-tertiary)" },
  }[source];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 16px",
      borderTop: "1px solid var(--divider)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: swatch,
        backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 4px, transparent 4px 8px)",
        flexShrink: 0,
      }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2, display: "flex", alignItems: "center", gap: 6 }}>
          <span>{brand}</span>
          <span>·</span>
          <span style={{ color: sourceConfig.color, fontWeight: 600 }}>{sourceConfig.label}</span>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 14, fontWeight: 700 }} className="tabular">{kcal}</div>
        <div style={{ fontSize: 10, color: "var(--text-tertiary)" }} className="tabular">{qty}</div>
      </div>
      <div style={{ color: fav ? "var(--primary-500)" : "var(--text-tertiary)" }}>
        <Icon name="star" size={18} strokeWidth={1.8} {...(fav ? { fill: "var(--primary-500)" } : {})}/>
      </div>
    </div>
  );
};

/* =================== FOOD DETAIL =================== */
const FoodDetailScreen = () => {
  const portion = 180; // grams
  const protein = 38, carbs = 14, fat = 16;
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <ScreenHeader title="" left="back" right={
        <div style={{ display: "flex", gap: 14, color: "var(--text-secondary)" }}>
          <Icon name="star" size={20} color="var(--primary-500)" fill="var(--primary-500)"/>
          <Icon name="share" size={20}/>
        </div>
      }/>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Hero */}
        <div style={{ padding: "0 16px 16px" }}>
          <div style={{
            height: 160, borderRadius: 14,
            background: "#D4A574",
            backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 6px, transparent 6px 12px)",
            display: "flex", alignItems: "flex-end", padding: 12,
          }}>
            <span style={{
              fontSize: 10, fontFamily: "var(--font-mono)",
              color: "#fff", background: "rgba(0,0,0,0.4)",
              padding: "3px 6px", borderRadius: 4,
            }}>FOTO_PRODUCTO</span>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                background: "var(--success-50)", color: "var(--success-600)",
                textTransform: "uppercase", letterSpacing: 0.4,
              }}>Verificado</div>
              <span style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Casero</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6, letterSpacing: "-0.3px" }}>Milanesa de pollo al horno</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>Sin pan rallado · alta proteína</div>
          </div>
        </div>

        {/* Portion selector */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>Porción</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 8 }}>
            <div style={{
              background: "var(--surface-2)", borderRadius: 10,
              padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 18, fontWeight: 600 }} className="tabular">{portion}</span>
              <Icon name="chevronDown" size={16} color="var(--text-secondary)"/>
            </div>
            <div style={{
              background: "var(--surface-2)", borderRadius: 10,
              padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>gramos</span>
              <Icon name="chevronDown" size={16} color="var(--text-secondary)"/>
            </div>
          </div>
          {/* Quick portion chips */}
          <div style={{ display: "flex", gap: 6, marginTop: 10, overflow: "auto" }}>
            <Pill>½ porción</Pill>
            <Pill active>1 porción</Pill>
            <Pill>2 porciones</Pill>
            <Pill>100 g</Pill>
          </div>
        </div>

        {/* Big nutrition */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.6px" }} className="tabular">342</div>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: -2 }}>kcal · 15% del día</div>
            </div>
            {/* Macro pie */}
            <MacroSplitPie protein={protein} carbs={carbs} fat={fat}/>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <MacroCell label="Proteína" value={protein} unit="g" pct="46%" color="var(--macro-protein)"/>
            <MacroCell label="Carbos"   value={carbs}   unit="g" pct="17%" color="var(--macro-carbs)"/>
            <MacroCell label="Grasa"    value={fat}     unit="g" pct="37%" color="var(--macro-fat)"/>
          </div>
        </div>

        {/* Detailed nutrition */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Información nutricional</div>
          {[
            ["Fibra", "2.4 g", "9%"],
            ["Azúcares", "1.1 g", "—"],
            ["Grasas saturadas", "4.2 g", "21%"],
            ["Sodio", "486 mg", "21%"],
            ["Hierro", "1.8 mg", "10%"],
            ["Calcio", "32 mg", "3%"],
          ].map(([k, v, pct], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "9px 0", borderTop: i === 0 ? "none" : "1px solid var(--divider)",
            }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{k}</span>
              <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }} className="tabular">{v}</span>
                <span style={{ fontSize: 11, color: "var(--text-tertiary)", width: 32, textAlign: "right" }} className="tabular">{pct}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 11, color: "var(--text-tertiary)" }}>
            % del valor diario basado en una dieta de 2,247 kcal
          </div>
        </div>

        {/* Add to meal */}
        <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>Asignar a</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <SelectField icon="utensils" label="Comida" value="Almuerzo"/>
            <SelectField icon="clock" label="Hora" value="13:15"/>
          </div>
        </div>

        <div style={{ height: 16 }}/>
      </div>

      {/* CTA bar */}
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
        }}>Agregar y otro</div>
        <div style={{
          flex: 1.4, padding: "12px 14px", borderRadius: 12,
          background: "var(--primary-500)", color: "#0B0E11",
          fontSize: 14, fontWeight: 700, textAlign: "center",
        }}>Agregar 342 kcal</div>
      </div>
    </div>
  );
};

const MacroSplitPie = ({ protein, carbs, fat }) => {
  const pK = protein * 4, cK = carbs * 4, fK = fat * 9;
  const total = pK + cK + fK || 1;
  const r = 28, c = 2 * Math.PI * r;
  const segs = [
    { color: "var(--macro-protein)", frac: pK / total },
    { color: "var(--macro-carbs)",   frac: cK / total },
    { color: "var(--macro-fat)",     frac: fK / total },
  ];
  let off = 0;
  return (
    <svg width="68" height="68" viewBox="0 0 68 68">
      <circle cx="34" cy="34" r={r} stroke="var(--surface-3)" strokeWidth="6" fill="none"/>
      {segs.map((s, i) => {
        const dash = s.frac * c;
        const el = <circle key={i} cx="34" cy="34" r={r}
          stroke={s.color} strokeWidth="6" fill="none"
          strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={-off}
          transform="rotate(-90 34 34)"/>;
        off += dash;
        return el;
      })}
    </svg>
  );
};

const MacroCell = ({ label, value, unit, pct, color }) => (
  <div style={{
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: 10, padding: "10px 12px",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
      <div style={{ width: 6, height: 6, borderRadius: 999, background: color }}/>
      <span style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 500 }}>{label}</span>
    </div>
    <div className="tabular" style={{ fontSize: 16, fontWeight: 700 }}>
      {value}<span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-tertiary)" }}> {unit}</span>
    </div>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 2 }} className="tabular">{pct} kcal</div>
  </div>
);

const SelectField = ({ icon, label, value }) => (
  <div style={{
    background: "var(--surface-2)", borderRadius: 10,
    padding: "10px 12px",
  }}>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>{label}</div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Icon name={icon} size={14} color="var(--text-secondary)"/>
        <span style={{ fontSize: 14, fontWeight: 500 }}>{value}</span>
      </div>
      <Icon name="chevronDown" size={14} color="var(--text-tertiary)"/>
    </div>
  </div>
);

Object.assign(window, { HomeScreen, SearchScreen, FoodDetailScreen, MiniStat, SuppRow, ExerciseRow, SummaryStat, SearchResultRow, MacroSplitPie, MacroCell, SelectField });
