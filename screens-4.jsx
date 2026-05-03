/* Kcal — Screens part 4: Full Onboarding (7 steps) + Recipes + Plan + Shopping + Barcode + QuickAdd + SupplementDetail */

/* =================== ONBOARDING — 7 STEPS =================== */
const OnboardingShell = ({ step = 1, total = 7, children, ctaLabel = "Continuar", showBack = true, ctaDisabled = false }) => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "12px 16px 8px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 22, opacity: showBack ? 1 : 0 }}>
        <Icon name="chevronLeft" size={22} color="var(--text-secondary)"/>
      </div>
      <div style={{ flex: 1, height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(step/total)*100}%`, background: "var(--primary-500)" }}/>
      </div>
      <span className="tabular" style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>{step} / {total}</span>
    </div>
    <div style={{ flex: 1, padding: "20px 20px 0", overflowY: "auto" }}>{children}</div>
    <div style={{ padding: "16px 16px 28px", borderTop: "1px solid var(--divider)" }}>
      <div style={{
        padding: "14px", borderRadius: 12,
        background: ctaDisabled ? "var(--surface-3)" : "var(--primary-500)",
        color: ctaDisabled ? "var(--text-tertiary)" : "#0B0E11",
        textAlign: "center", fontSize: 15, fontWeight: 700,
      }}>{ctaLabel}</div>
    </div>
  </div>
);

const OnbStep1 = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 28px" }}>
      <div style={{
        width: 80, height: 80, borderRadius: 22,
        background: "var(--primary-500)", color: "#0B0E11",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 40, fontWeight: 800, letterSpacing: "-1px",
        marginBottom: 28,
      }}>K</div>
      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.6px", lineHeight: 1.1 }}>
        Comer mejor,<br/>sin culpa.
      </div>
      <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.55, marginTop: 14 }}>
        Tracking nutricional honesto. Catálogo fuerte en comida latina, suplementos integrados y sin etiquetas de "bueno" o "malo".
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 28 }}>
        {["Más de 80,000 alimentos LATAM", "Foto IA · código de barras · comparador", "Sin moralizar · sin gamificación agresiva"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
            <Icon name="check" size={16} color="var(--success-500)" strokeWidth={2.5}/>{s}
          </div>
        ))}
      </div>
    </div>
    <div style={{ padding: "16px 16px 28px" }}>
      <div style={{ padding: "14px", borderRadius: 12, background: "var(--primary-500)", color: "#0B0E11", textAlign: "center", fontSize: 15, fontWeight: 700 }}>
        Empezar
      </div>
      <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: "var(--text-secondary)" }}>
        Ya tengo cuenta · <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Iniciar sesión</span>
      </div>
    </div>
  </div>
);

const OnbStep2 = () => (
  <OnboardingShell step={2}>
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Empecemos</div>
    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.4px", lineHeight: 1.2, marginTop: 6 }}>¿Cómo te llamamos?</div>
    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Solo lo usamos para saludarte.</div>
    <div style={{ marginTop: 26 }}>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 6 }}>Nombre</div>
      <div style={{ padding: "14px 14px", border: "1.5px solid var(--primary-500)", borderRadius: 12, fontSize: 16, fontWeight: 500 }}>
        Diego<span style={{ color: "var(--primary-500)" }}>|</span>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
      <div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 6 }}>Edad</div>
        <div style={{ padding: "14px 14px", border: "1px solid var(--border)", borderRadius: 12, fontSize: 16, fontWeight: 500 }} className="tabular">29</div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 6 }}>Sexo biológico</div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ flex: 1, padding: "14px 0", textAlign: "center", borderRadius: 12, background: "var(--primary-50)", border: "1.5px solid var(--primary-500)", fontSize: 14, fontWeight: 600 }}>M</div>
          <div style={{ flex: 1, padding: "14px 0", textAlign: "center", borderRadius: 12, border: "1px solid var(--border)", fontSize: 14, fontWeight: 500, color: "var(--text-secondary)" }}>F</div>
        </div>
      </div>
    </div>
  </OnboardingShell>
);

const OnbStep3 = () => (
  <OnboardingShell step={3}>
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Tus medidas</div>
    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.4px", lineHeight: 1.2, marginTop: 6 }}>¿Cuánto pesás y medís?</div>
    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Lo necesitamos para calcular tus calorías diarias.</div>

    <div style={{ marginTop: 22, padding: "20px 16px", border: "1px solid var(--border)", borderRadius: 14, textAlign: "center" }}>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Peso actual</div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginTop: 8 }}>
        <span className="tabular" style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-1px" }}>76.0</span>
        <span style={{ fontSize: 16, color: "var(--text-tertiary)" }}>kg</span>
      </div>
      {/* Ruler */}
      <div style={{ marginTop: 14, position: "relative", height: 36, overflow: "hidden" }}>
        <svg width="100%" height="36" viewBox="0 0 320 36">
          {Array.from({length: 41}).map((_, i) => {
            const x = i * 8;
            const major = i % 5 === 0;
            return <line key={i} x1={x} y1={major ? 0 : 8} x2={x} y2={major ? 22 : 16} stroke={major ? "var(--text-secondary)" : "var(--border-strong)"} strokeWidth="1"/>;
          })}
          <line x1="160" y1="0" x2="160" y2="28" stroke="var(--primary-500)" strokeWidth="2"/>
        </svg>
        <div style={{ position: "absolute", left: 8, bottom: 0, fontSize: 9, color: "var(--text-tertiary)" }} className="tabular">74</div>
        <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", fontSize: 10, color: "var(--primary-700)", fontWeight: 600 }} className="tabular">76</div>
        <div style={{ position: "absolute", right: 8, bottom: 0, fontSize: 9, color: "var(--text-tertiary)" }} className="tabular">78</div>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
      <div style={{ padding: "14px", border: "1px solid var(--border)", borderRadius: 12 }}>
        <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Altura</div>
        <div className="tabular" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>178<span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}> cm</span></div>
      </div>
      <div style={{ padding: "14px", border: "1px solid var(--border)", borderRadius: 12 }}>
        <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Peso objetivo</div>
        <div className="tabular" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>70<span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}> kg</span></div>
      </div>
    </div>
  </OnboardingShell>
);

const OnbStep4 = () => (
  <OnboardingShell step={4}>
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Tu objetivo</div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.4px", lineHeight: 1.2 }}>¿Qué te gustaría lograr?</div>
    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Podés cambiar esto cuando quieras.</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
      {[
        { label: "Bajar de peso", sub: "Déficit calórico moderado", icon: "arrowDown", active: true },
        { label: "Mantener peso", sub: "Estás donde querés estar", icon: "target" },
        { label: "Subir de peso", sub: "Superávit para ganar masa", icon: "arrowUp" },
        { label: "Recomp", sub: "Bajar grasa y ganar músculo", icon: "trending" },
      ].map((o, i) => (
        <div key={i} style={{ padding: "14px", borderRadius: 12,
          border: o.active ? "1.5px solid var(--primary-500)" : "1px solid var(--border)",
          background: o.active ? "var(--primary-50)" : "var(--bg)",
          display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10,
            background: o.active ? "var(--primary-500)" : "var(--surface-2)",
            color: o.active ? "#0B0E11" : "var(--text-secondary)",
            display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={o.icon} size={18} strokeWidth={2}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{o.label}</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{o.sub}</div>
          </div>
          {o.active && <div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--primary-500)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0B0E11" }}>
            <Icon name="check" size={14} strokeWidth={3}/>
          </div>}
        </div>
      ))}
    </div>
    <div style={{ marginTop: 18, padding: "14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Ritmo</div>
        <div className="tabular" style={{ fontSize: 14, fontWeight: 700 }}>−0.5 kg / sem</div>
      </div>
      <div style={{ position: "relative", height: 6, background: "var(--surface-3)", borderRadius: 3, marginTop: 12 }}>
        <div style={{ height: "100%", width: "40%", background: "var(--primary-500)", borderRadius: 3 }}/>
        <div style={{ position: "absolute", left: "40%", top: -6, transform: "translateX(-50%)", width: 18, height: 18, borderRadius: 999, background: "#fff", border: "2px solid var(--primary-500)" }}/>
      </div>
    </div>
  </OnboardingShell>
);

const OnbStep5 = () => (
  <OnboardingShell step={5}>
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Actividad física</div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.4px", lineHeight: 1.2 }}>¿Qué tan activo sos?</div>
    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Sin contar el ejercicio que registres.</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
      {[
        { label: "Sedentario", sub: "Trabajo de oficina · poco movimiento", mult: "× 1.2" },
        { label: "Liviano", sub: "Caminar 1-3 días/sem", mult: "× 1.375" },
        { label: "Moderado", sub: "Ejercicio 3-5 días/sem", mult: "× 1.55", active: true },
        { label: "Activo", sub: "Ejercicio intenso 6-7 días/sem", mult: "× 1.725" },
        { label: "Muy activo", sub: "Trabajo físico + entreno diario", mult: "× 1.9" },
      ].map((o, i) => (
        <div key={i} style={{ padding: "12px 14px", borderRadius: 12,
          border: o.active ? "1.5px solid var(--primary-500)" : "1px solid var(--border)",
          background: o.active ? "var(--primary-50)" : "var(--bg)",
          display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{o.label}</div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>{o.sub}</div>
          </div>
          <span className="tabular" style={{ fontSize: 11, color: o.active ? "var(--primary-700)" : "var(--text-tertiary)", fontWeight: 600 }}>{o.mult}</span>
        </div>
      ))}
    </div>
  </OnboardingShell>
);

const OnbStep6 = () => (
  <OnboardingShell step={6}>
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Restricciones</div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.4px", lineHeight: 1.2 }}>¿Tenés alguna restricción?</div>
    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Filtramos resultados según tus necesidades.</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
      {[
        { label: "Sin restricción", active: true },
        { label: "Vegetariano" },
        { label: "Vegano" },
        { label: "Sin gluten" },
        { label: "Sin lactosa" },
        { label: "Keto" },
        { label: "Paleo" },
        { label: "Diabetes" },
      ].map((r, i) => (
        <div key={i} style={{
          padding: "10px 14px", borderRadius: 999,
          border: r.active ? "1.5px solid var(--primary-500)" : "1px solid var(--border)",
          background: r.active ? "var(--primary-50)" : "var(--bg)",
          fontSize: 13, fontWeight: r.active ? 600 : 500,
          color: r.active ? "var(--primary-700)" : "var(--text-secondary)",
        }}>{r.label}</div>
      ))}
    </div>
    <div style={{ marginTop: 22 }}>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>Alergias específicas</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {["Maní", "Frutos secos", "Mariscos", "Huevo", "Soja", "+ Agregar"].map((a, i) => (
          <Pill key={i} active={i === 0}>{a}</Pill>
        ))}
      </div>
    </div>
  </OnboardingShell>
);

const OnbStep7 = () => (
  <OnboardingShell step={7} ctaLabel="Empezar a trackear">
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Tu plan</div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.4px", lineHeight: 1.2 }}>Listo, Diego.</div>
    <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>Esto es lo que calculamos para vos.</div>

    <div style={{ marginTop: 22, padding: "20px 16px", borderRadius: 16, background: "var(--primary-50)", border: "1.5px solid var(--primary-500)", textAlign: "center" }}>
      <div style={{ fontSize: 11, color: "var(--primary-700)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 700 }}>Calorías diarias</div>
      <div className="tabular" style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-1px", marginTop: 4 }}>2,247</div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>kcal · déficit de 500 kcal</div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
      <MacroTargetCell label="Proteína" g={168} pct={30} color="var(--macro-protein)"/>
      <MacroTargetCell label="Carbos"   g={252} pct={45} color="var(--macro-carbs)"/>
      <MacroTargetCell label="Grasa"    g={75}  pct={25} color="var(--macro-fat)"/>
    </div>

    <div style={{ marginTop: 18, padding: "14px", border: "1px solid var(--border)", borderRadius: 12 }}>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>Cómo lo calculamos</div>
      <BMRRow label="BMR (Mifflin-St Jeor)" value="1,742 kcal" sub="lo que tu cuerpo quema solo"/>
      <BMRRow label="TDEE (× 1.55 moderado)" value="2,747 kcal" sub="con tu nivel de actividad"/>
      <BMRRow label="Déficit −500 kcal" value="2,247 kcal" sub="para bajar 0.5 kg/sem" last/>
    </div>

    <div style={{ marginTop: 14, fontSize: 11, color: "var(--text-tertiary)", lineHeight: 1.5, textAlign: "center" }}>
      Esto es una sugerencia, no una prescripción médica. Consultá con un profesional si tenés condiciones de salud.
    </div>
  </OnboardingShell>
);

const MacroTargetCell = ({ label, g, pct, color }) => (
  <div style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: 12, textAlign: "center" }}>
    <div style={{ width: 6, height: 6, borderRadius: 999, background: color, margin: "0 auto 6px" }}/>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>{label}</div>
    <div className="tabular" style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{g}<span style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 500 }}>g</span></div>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)" }} className="tabular">{pct}%</div>
  </div>
);

const BMRRow = ({ label, value, sub, last }) => (
  <div style={{ padding: "8px 0", borderBottom: last ? "none" : "1px solid var(--divider)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{label}</span>
      <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>{value}</span>
    </div>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", marginTop: 2 }}>{sub}</div>
  </div>
);

/* =================== RECIPES LIST =================== */
const RecipesScreen = () => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px" }}>Recetas</div>
        <div style={{ display: "flex", gap: 14, color: "var(--text-secondary)" }}>
          <Icon name="search" size={20}/>
          <Icon name="plus" size={22} strokeWidth={2}/>
        </div>
      </div>

      <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid var(--divider)" }}>
        <Tab active>Mis recetas</Tab>
        <Tab>Favoritas</Tab>
        <Tab>Comunidad</Tab>
      </div>

      <div style={{ display: "flex", gap: 6, padding: "12px 16px", overflowX: "auto" }}>
        {["Todas", "Argentina", "Mexicana", "Vegana", "Alta proteína", "Rápidas"].map((c, i) => <Pill key={i} active={i === 0}>{c}</Pill>)}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { name: "Bowl de pollo y quinoa", time: "25 min", kcal: 412, p: 38, swatch: "#7FA858", fav: true },
            { name: "Milanesa de pollo al horno", time: "40 min", kcal: 342, p: 38, swatch: "#D4A574" },
            { name: "Tacos de carne molida", time: "20 min", kcal: 386, p: 26, swatch: "#C44848" },
            { name: "Ensalada César con palta", time: "10 min", kcal: 310, p: 18, swatch: "#7FA858", fav: true },
            { name: "Tortilla de papas", time: "30 min", kcal: 412, p: 14, swatch: "#E8C896" },
            { name: "Yogur bowl con frutos rojos", time: "5 min", kcal: 248, p: 22, swatch: "#A78668" },
          ].map((r, i) => <RecipeCard key={i} {...r}/>)}
        </div>
      </div>

      <BottomNav active="recipe"/>
    </div>
  );
};

const RecipeCard = ({ name, time, kcal, p, swatch, fav }) => (
  <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--bg)" }}>
    <div style={{ height: 100, background: swatch, position: "relative",
      backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 5px, transparent 5px 10px)" }}>
      <div style={{ position: "absolute", top: 8, right: 8, width: 24, height: 24, borderRadius: 999, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: fav ? "var(--primary-500)" : "#fff" }}>
        <Icon name="star" size={12} strokeWidth={2} {...(fav ? { fill: "var(--primary-500)" } : {})}/>
      </div>
    </div>
    <div style={{ padding: "10px 12px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, minHeight: 34 }}>{name}</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "var(--text-tertiary)" }} className="tabular">
        <span>{time}</span>
        <span><b style={{ color: "var(--text-primary)" }}>{kcal}</b> kcal · {p}g P</span>
      </div>
    </div>
  </div>
);

/* =================== RECIPE DETAIL =================== */
const RecipeDetailScreen = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ position: "relative" }}>
      <div style={{ height: 200, background: "#7FA858",
        backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 6px, transparent 6px 12px)" }}/>
      <div style={{ position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: 999, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        <Icon name="chevronLeft" size={20}/>
      </div>
      <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 8 }}>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary-500)" }}>
          <Icon name="star" size={18} fill="var(--primary-500)"/>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <Icon name="share" size={18}/>
        </div>
      </div>
    </div>

    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <Pill active>Alta proteína</Pill><Pill>Sin gluten</Pill>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.3px" }}>Bowl de pollo y quinoa</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4 }}>Plato completo, balanceado y rápido. Ideal para meal prep.</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 14 }}>
          <RecipeStat icon="clock" value="25" unit="min"/>
          <RecipeStat icon="utensils" value="2" unit="porc."/>
          <RecipeStat icon="flame" value="412" unit="kcal"/>
          <RecipeStat icon="target" value="38g" unit="prot."/>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Nutrición · por porción</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <MacroCell label="Proteína" value={38} unit="g" pct="37%" color="var(--macro-protein)"/>
          <MacroCell label="Carbos" value={42} unit="g" pct="41%" color="var(--macro-carbs)"/>
          <MacroCell label="Grasa" value={11} unit="g" pct="22%" color="var(--macro-fat)"/>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Ingredientes · 2 porciones</div>
        {[
          ["Pechuga de pollo", "300 g"],
          ["Quinoa", "150 g"],
          ["Palta", "1 unidad"],
          ["Tomate cherry", "200 g"],
          ["Aceite de oliva", "1 cda"],
          ["Limón", "½ unidad"],
        ].map(([n, q], i) => (
          <div key={i} style={{ padding: "9px 0", borderTop: i ? "1px solid var(--divider)" : "none", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13 }}>{n}</span>
            <span className="tabular" style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>{q}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Preparación</div>
        {[
          "Cocinar la quinoa en agua hirviendo con sal por 15 min, escurrir.",
          "Saltear el pollo cortado en cubos con aceite de oliva 7-8 min.",
          "Cortar la palta y los tomates cherry en mitades.",
          "Armar el bowl con quinoa de base, pollo, palta y tomates.",
          "Aderezar con jugo de limón y un chorrito de aceite de oliva.",
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0" }}>
            <div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--primary-500)", color: "#0B0E11", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }} className="tabular">{i+1}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, paddingTop: 2 }}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 80 }}/>
    </div>

    <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px 24px", display: "flex", gap: 8 }}>
      <div style={{ flex: 1, padding: "12px 14px", borderRadius: 12, border: "1px solid var(--border-strong)", fontSize: 13, fontWeight: 600, textAlign: "center" }}>+ Lista de compras</div>
      <div style={{ flex: 1.4, padding: "12px 14px", borderRadius: 12, background: "var(--primary-500)", color: "#0B0E11", fontSize: 14, fontWeight: 700, textAlign: "center" }}>Registrar 412 kcal</div>
    </div>
  </div>
);

const RecipeStat = ({ icon, value, unit }) => (
  <div style={{ padding: "10px", border: "1px solid var(--border)", borderRadius: 10, textAlign: "center" }}>
    <div style={{ display: "flex", justifyContent: "center", color: "var(--text-secondary)", marginBottom: 2 }}>
      <Icon name={icon} size={14}/>
    </div>
    <div className="tabular" style={{ fontSize: 14, fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>{unit}</div>
  </div>
);

/* =================== MEAL PLAN =================== */
const MealPlanScreen = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <div style={{ padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 600 }}>Semana del 27 abr</div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px", marginTop: 2 }}>Mi plan</div>
      </div>
      <div style={{ display: "flex", gap: 14, color: "var(--text-secondary)" }}>
        <Icon name="sliders" size={20}/>
        <Icon name="plus" size={22} strokeWidth={2}/>
      </div>
    </div>

    {/* Week strip with kcal totals */}
    <div style={{ padding: "8px 12px 12px", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
      {[
        ["L", 27, 2180, true], ["M", 28, 2247, true], ["M", 29, 2210, true],
        ["J", 30, 2247, false], ["V", 1, 2180, false], ["S", 2, 2400, false], ["D", 3, 2247, false],
      ].map(([letter, num, kcal, planned], i) => (
        <div key={i} style={{ padding: "6px 0", borderRadius: 10, background: i === 3 ? "var(--surface-2)" : "transparent", textAlign: "center" }}>
          <div style={{ fontSize: 9, fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase" }}>{letter}</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }} className="tabular">{num}</div>
          <div style={{ fontSize: 9, color: planned ? "var(--success-500)" : "var(--text-tertiary)", marginTop: 2, fontWeight: 600 }} className="tabular">{kcal}</div>
        </div>
      ))}
    </div>

    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "8px 16px 4px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Jueves 30 abril</div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)" }} className="tabular">2,247 / 2,247 kcal · plan completo</div>
        </div>
        <Icon name="edit" size={18} color="var(--text-secondary)"/>
      </div>

      {[
        { meal: "Desayuno", kcal: 412, items: ["Avena con banana", "Café con leche"] },
        { meal: "Almuerzo", kcal: 678, items: ["Bowl de pollo y quinoa", "Manzana"] },
        { meal: "Merienda", kcal: 312, items: ["Tostadas con queso crema"] },
        { meal: "Cena", kcal: 540, items: ["Salmón al horno", "Verduras grilladas", "Arroz integral"] },
        { meal: "Snacks", kcal: 305, items: ["Almendras", "Yogur griego"] },
      ].map((m, i) => (
        <div key={i} style={{ padding: "12px 16px", borderTop: "1px solid var(--divider)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{m.meal}</span>
            <span className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>{m.kcal} kcal</span>
          </div>
          {m.items.map((it, j) => (
            <div key={j} style={{ fontSize: 12.5, color: "var(--text-secondary)", padding: "3px 0" }}>· {it}</div>
          ))}
        </div>
      ))}
      <div style={{ padding: "12px 16px", borderTop: "1px solid var(--divider)" }}>
        <div style={{ padding: "12px", border: "1px dashed var(--border-strong)", borderRadius: 10, textAlign: "center", fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>
          ✨ Generar plan automático
        </div>
      </div>
      <div style={{ height: 16 }}/>
    </div>
  </div>
);

/* =================== SHOPPING LIST =================== */
const ShoppingScreen = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <ScreenHeader title="Lista de compras" left="back" right={<Icon name="share" size={20}/>}/>

    <div style={{ padding: "8px 16px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div className="tabular" style={{ fontSize: 14, fontWeight: 600 }}>14 / 22 items</div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>Total estimado · $18,400 ARS</div>
      </div>
      <Pill active>Modo compra</Pill>
    </div>

    <div style={{ flex: 1, overflowY: "auto" }}>
      {[
        { cat: "Verdulería", items: [
          ["Tomate cherry", "400 g", false],
          ["Palta", "3 un", true],
          ["Limón", "1 un", false],
          ["Cebolla", "2 un", false],
        ]},
        { cat: "Carnicería", items: [
          ["Pechuga de pollo", "1 kg", true],
          ["Carne molida", "500 g", false],
        ]},
        { cat: "Almacén", items: [
          ["Quinoa", "300 g", true],
          ["Aceite de oliva", "1 botella", true],
          ["Arroz integral", "500 g", false],
        ]},
        { cat: "Lácteos", items: [
          ["Yogur griego", "4 potes", true],
          ["Queso crema", "1 un", false],
        ]},
      ].map((g, gi) => (
        <div key={gi} style={{ padding: "0 16px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, padding: "12px 0 6px" }}>
            {g.cat}
          </div>
          {g.items.map(([n, q, done], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderTop: i ? "1px solid var(--divider)" : "none" }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                border: done ? "none" : "1.5px solid var(--border-strong)",
                background: done ? "var(--success-500)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0,
              }}>{done && <Icon name="check" size={16} strokeWidth={3}/>}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500,
                color: done ? "var(--text-tertiary)" : "var(--text-primary)",
                textDecoration: done ? "line-through" : "none" }}>{n}</div>
              <div className="tabular" style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>{q}</div>
            </div>
          ))}
        </div>
      ))}
      <div style={{ height: 80 }}/>
    </div>

    <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px 24px", display: "flex", gap: 8 }}>
      <div style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid var(--border-strong)", fontSize: 13, fontWeight: 600, textAlign: "center" }}>Limpiar</div>
      <div style={{ flex: 1.4, padding: "12px", borderRadius: 12, background: "var(--primary-500)", color: "#0B0E11", fontSize: 14, fontWeight: 700, textAlign: "center" }}>+ Agregar item</div>
    </div>
  </div>
);

/* =================== BARCODE SCANNER =================== */
const BarcodeScreen = () => (
  <div style={{ background: "#0B0E11", height: "100%", color: "#fff", display: "flex", flexDirection: "column", position: "relative" }}>
    <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="x" size={20} color="#fff" strokeWidth={2}/>
      </div>
      <div style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(0,0,0,0.5)", fontSize: 12, fontWeight: 600 }}>
        Escanear código
      </div>
      <div style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="info" size={18} color="#fff"/>
      </div>
    </div>

    <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Scan frame */}
      <div style={{ width: 260, height: 160, position: "relative" }}>
        {[
          { top: 0, left: 0, br: "0", borders: "tl" },
          { top: 0, right: 0, borders: "tr" },
          { bottom: 0, left: 0, borders: "bl" },
          { bottom: 0, right: 0, borders: "br" },
        ].map((c, i) => (
          <div key={i} style={{
            position: "absolute", width: 30, height: 30,
            top: c.top, left: c.left, right: c.right, bottom: c.bottom,
            borderTop: (c.borders === "tl" || c.borders === "tr") ? "3px solid var(--primary-500)" : "none",
            borderLeft: (c.borders === "tl" || c.borders === "bl") ? "3px solid var(--primary-500)" : "none",
            borderRight: (c.borders === "tr" || c.borders === "br") ? "3px solid var(--primary-500)" : "none",
            borderBottom: (c.borders === "bl" || c.borders === "br") ? "3px solid var(--primary-500)" : "none",
            borderRadius: c.borders === "tl" ? "8px 0 0 0" : c.borders === "tr" ? "0 8px 0 0" : c.borders === "bl" ? "0 0 0 8px" : "0 0 8px 0",
          }}/>
        ))}
        {/* Fake barcode */}
        <div style={{ position: "absolute", inset: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          {Array.from({length: 32}).map((_, i) => (
            <div key={i} style={{ width: i % 3 === 0 ? 3 : 1, height: 60, background: "rgba(255,255,255,0.85)" }}/>
          ))}
        </div>
        {/* Scanning line */}
        <div style={{ position: "absolute", left: 12, right: 12, top: "50%", height: 2, background: "var(--primary-500)", boxShadow: "0 0 8px var(--primary-500)" }}/>
      </div>
    </div>

    <div style={{ padding: "20px 24px 28px", textAlign: "center" }}>
      <div style={{ fontSize: 14, fontWeight: 600 }}>Apuntá al código de barras</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 6, lineHeight: 1.4 }}>
        Mantené el producto a 10-15 cm. Detectamos automáticamente.
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 18 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="edit" size={20} color="#fff"/>
          </div>
          <div style={{ fontSize: 10, marginTop: 6, color: "rgba(255,255,255,0.6)" }}>Manual</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 999, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="droplet" size={20} color="#fff"/>
          </div>
          <div style={{ fontSize: 10, marginTop: 6, color: "rgba(255,255,255,0.6)" }}>Linterna</div>
        </div>
      </div>
    </div>
  </div>
);

/* =================== QUICK ADD =================== */
const QuickAddScreen = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <ScreenHeader title="Quick add" left="close"/>

    <div style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
        Para cuando no querés buscar el alimento exacto. Solo cargá los números.
      </div>

      <div style={{ marginTop: 22, padding: "20px 16px", border: "1px solid var(--border)", borderRadius: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Calorías</div>
        <div className="tabular" style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-1.2px", marginTop: 4 }}>
          450<span style={{ color: "var(--primary-500)" }}>|</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>kcal</div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>Macros (opcional)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            ["Proteína", "32g", "var(--macro-protein)"],
            ["Carbos", "48g", "var(--macro-carbs)"],
            ["Grasa", "18g", "var(--macro-fat)"],
          ].map(([l, v, c], i) => (
            <div key={i} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: c }}/>
                <span style={{ fontSize: 10, color: "var(--text-secondary)", fontWeight: 600 }}>{l}</span>
              </div>
              <div className="tabular" style={{ fontSize: 16, fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 8 }}>Etiqueta (opcional)</div>
        <div style={{ padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 14, color: "var(--text-tertiary)" }}>
          ej: "Asado con amigos"
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
        <SelectField icon="utensils" label="Comida" value="Almuerzo"/>
        <SelectField icon="clock" label="Hora" value="13:30"/>
      </div>
    </div>

    <div style={{ borderTop: "1px solid var(--border)", padding: "10px 16px 24px" }}>
      <div style={{ padding: "12px", borderRadius: 12, background: "var(--primary-500)", color: "#0B0E11", textAlign: "center", fontSize: 14, fontWeight: 700 }}>
        Agregar 450 kcal
      </div>
    </div>
  </div>
);

/* =================== SUPPLEMENT DETAIL =================== */
const SuppDetailScreen = () => (
  <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
    <ScreenHeader title="" left="back" right={<Icon name="edit" size={20} color="var(--text-secondary)"/>}/>

    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: 14, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
            <Icon name="pill" size={28}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700 }}>Creatina monohidrato</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>MyProtein · polvo · 5 g</div>
            <div style={{ display: "inline-block", marginTop: 4, padding: "2px 8px", borderRadius: 999, background: "var(--success-50)", color: "var(--success-600)", fontSize: 10, fontWeight: 700 }}>ACTIVO</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Adherencia · 30 días</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span className="tabular" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.6px" }}>96</span>
          <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>%</span>
          <span className="tabular" style={{ fontSize: 12, color: "var(--success-500)", fontWeight: 700, marginLeft: 8 }}>29 / 30 días</span>
        </div>
        {/* Calendar mini */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 3, marginTop: 12 }}>
          {Array.from({length: 30}).map((_, i) => (
            <div key={i} style={{
              aspectRatio: "1",
              borderRadius: 3,
              background: i === 18 ? "var(--surface-3)" : "var(--success-500)",
              opacity: i === 18 ? 1 : 0.85,
            }}/>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "var(--text-tertiary)" }}>
          <span>3 abr</span><span>3 may</span>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Configuración</div>
        <ConfigRow label="Dosis" value="5 g" sub="medida incluida"/>
        <ConfigRow label="Frecuencia" value="Diaria" sub="todos los días"/>
        <ConfigRow label="Horario" value="9:00" sub="recordatorio activo"/>
        <ConfigRow label="Stock" value="22 días" sub="44 g restantes" last/>
      </div>

      <div style={{ borderTop: "1px solid var(--divider)", padding: "14px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>Información del producto</div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
          Creatina monohidrato pura, sin sabor. Compuesta por 100% creatina micronizada para mejor absorción.
        </div>
        <div style={{ marginTop: 10, padding: "10px 12px", background: "var(--surface)", borderRadius: 10, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Por porción (5 g)</span>
          <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>0 kcal · 0 g proteína</span>
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

const ConfigRow = ({ label, value, sub, last }) => (
  <div style={{ padding: "10px 0", borderBottom: last ? "none" : "1px solid var(--divider)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{label}</div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }}>{sub}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span className="tabular" style={{ fontSize: 13, fontWeight: 700 }}>{value}</span>
      <Icon name="chevronRight" size={14} color="var(--text-tertiary)"/>
    </div>
  </div>
);

Object.assign(window, {
  OnbStep1, OnbStep2, OnbStep3, OnbStep4, OnbStep5, OnbStep6, OnbStep7,
  RecipesScreen, RecipeDetailScreen, MealPlanScreen, ShoppingScreen,
  BarcodeScreen, QuickAddScreen, SuppDetailScreen,
  RecipeCard, RecipeStat, MacroTargetCell, BMRRow, ConfigRow,
});
