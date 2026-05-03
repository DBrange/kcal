/* Kcal — Screens part 3: Onboarding, Profile, CameraAI, Supplements */

/* =================== ONBOARDING (multi-step in one frame) =================== */
const OnboardingScreen = () => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Progress */}
      <div style={{ padding: "12px 16px 8px", display: "flex", alignItems: "center", gap: 12 }}>
        <Icon name="chevronLeft" size={22} color="var(--text-secondary)"/>
        <div style={{ flex: 1, height: 4, background: "var(--surface-3)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "57%", background: "var(--primary-500)" }}/>
        </div>
        <span className="tabular" style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>4 / 7</span>
      </div>

      <div style={{ flex: 1, padding: "24px 20px 0", overflowY: "auto" }}>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Tu objetivo</div>
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6, letterSpacing: "-0.4px", lineHeight: 1.2 }}>
          ¿Qué te gustaría lograr?
        </div>
        <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8, lineHeight: 1.5 }}>
          No te juzgamos: podés cambiar esto cuando quieras desde tu perfil.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 22 }}>
          {[
            { label: "Bajar de peso", sub: "Déficit calórico moderado", icon: "arrowDown", active: true },
            { label: "Mantener peso", sub: "Estás donde querés estar", icon: "target" },
            { label: "Subir de peso", sub: "Superávit para ganar masa", icon: "arrowUp" },
            { label: "Recomp", sub: "Bajar grasa y ganar músculo", icon: "trending" },
          ].map((o, i) => (
            <div key={i} style={{
              padding: "14px 14px",
              borderRadius: 12,
              border: o.active ? "1.5px solid var(--primary-500)" : "1px solid var(--border)",
              background: o.active ? "var(--primary-50)" : "var(--bg)",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: o.active ? "var(--primary-500)" : "var(--surface-2)",
                color: o.active ? "#0B0E11" : "var(--text-secondary)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name={o.icon} size={18} strokeWidth={2}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{o.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{o.sub}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: 999,
                border: o.active ? "none" : "1.5px solid var(--border-strong)",
                background: o.active ? "var(--primary-500)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#0B0E11",
              }}>
                {o.active && <Icon name="check" size={14} strokeWidth={3}/>}
              </div>
            </div>
          ))}
        </div>

        {/* Pace slider for selected */}
        <div style={{ marginTop: 22, padding: "14px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>Ritmo deseado</div>
            <div className="tabular" style={{ fontSize: 14, fontWeight: 700 }}>−0.5 kg / sem</div>
          </div>
          <div style={{ position: "relative", height: 6, background: "var(--surface-3)", borderRadius: 3, marginTop: 12 }}>
            <div style={{ height: "100%", width: "40%", background: "var(--primary-500)", borderRadius: 3 }}/>
            <div style={{ position: "absolute", left: "40%", top: -6, transform: "translateX(-50%)", width: 18, height: 18, borderRadius: 999, background: "#fff", border: "2px solid var(--primary-500)" }}/>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "var(--text-tertiary)" }}>
            <span>Lento · sostenible</span>
            <span>Agresivo</span>
          </div>
        </div>

        <div style={{ marginTop: 16, padding: "10px 12px", background: "var(--success-50)", borderRadius: 10, display: "flex", gap: 8 }}>
          <Icon name="info" size={16} color="var(--success-600)"/>
          <div style={{ fontSize: 12, color: "var(--success-600)", lineHeight: 1.4 }}>
            A este ritmo llegarías a tu meta el <b>14 de agosto</b>.
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 28px", borderTop: "1px solid var(--divider)" }}>
        <div style={{
          padding: "14px", borderRadius: 12,
          background: "var(--primary-500)", color: "#0B0E11",
          textAlign: "center", fontSize: 15, fontWeight: 700,
        }}>Continuar</div>
      </div>
    </div>
  );
};

/* =================== PROFILE =================== */
const ProfileScreen = () => {
  return (
    <div style={{ background: "var(--bg)", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "8px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.4px" }}>Yo</div>
        <Icon name="settings" size={20} color="var(--text-secondary)"/>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Profile card */}
        <div style={{ padding: "8px 16px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 999,
              background: "var(--info-500)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 700,
            }}>D</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Diego</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>diego@ejemplo.com · Buenos Aires</div>
              <div style={{ fontSize: 11, color: "var(--primary-700)", fontWeight: 600, marginTop: 4, display: "inline-block",
                padding: "2px 8px", background: "var(--primary-50)", borderRadius: 999 }}>Plan Premium</div>
            </div>
            <Icon name="edit" size={18} color="var(--text-secondary)"/>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ padding: "0 16px 16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <ProfileStat label="Peso" value="74.2" unit="kg"/>
          <ProfileStat label="Altura" value="178" unit="cm"/>
          <ProfileStat label="Edad" value="29" unit="años"/>
        </div>

        {/* Targets group */}
        <SettingsGroup title="Objetivos y targets">
          <SettingsRow icon="target" label="Objetivo" value="Bajar de peso"/>
          <SettingsRow icon="flame" label="Calorías diarias" value="2,247 kcal"/>
          <SettingsRow icon="sliders" label="Distribución de macros" value="P 30 · C 45 · G 25"/>
          <SettingsRow icon="droplet" label="Hidratación" value="2.5 L" last/>
        </SettingsGroup>

        <SettingsGroup title="Restricciones dietéticas">
          <SettingsRow icon="utensils" label="Tipo de dieta" value="Sin restricción"/>
          <SettingsRow icon="info" label="Alergias" value="Maní" last/>
        </SettingsGroup>

        <SettingsGroup title="Preferencias">
          <SettingsRow icon="scale" label="Unidades" value="kg · cm · ml · kcal"/>
          <SettingsRow icon="moon" label="Apariencia" value="Sistema"/>
          <SettingsRow icon="bell" label="Notificaciones" value="3 activas"/>
          <SettingsRow icon="grid" label="Idioma" value="Español" last/>
        </SettingsGroup>

        <SettingsGroup title="Datos">
          <SettingsRow icon="share" label="Exportar mis datos"/>
          <SettingsRow icon="trending" label="Importar de otra app"/>
          <SettingsRow icon="check" label="Conectar con Apple Health" value="Conectado" last/>
        </SettingsGroup>

        <SettingsGroup title="Cuenta">
          <SettingsRow icon="user" label="Suscripción" value="Premium · vence 14 ago"/>
          <SettingsRow icon="info" label="Ayuda y soporte"/>
          <SettingsRow icon="x" label="Cerrar sesión" danger last/>
        </SettingsGroup>

        <div style={{ padding: "16px 16px 24px", textAlign: "center", fontSize: 11, color: "var(--text-tertiary)" }}>
          Kcal v1.0.0 · build 142
        </div>
      </div>

      <BottomNav active="me"/>
    </div>
  );
};

const ProfileStat = ({ label, value, unit }) => (
  <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: "10px 12px", textAlign: "center" }}>
    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>{label}</div>
    <div style={{ marginTop: 4 }}>
      <span className="tabular" style={{ fontSize: 18, fontWeight: 700 }}>{value}</span>
      <span style={{ fontSize: 11, color: "var(--text-tertiary)", marginLeft: 3 }}>{unit}</span>
    </div>
  </div>
);

const SettingsGroup = ({ title, children }) => (
  <div style={{ padding: "0 16px 16px" }}>
    <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, padding: "0 4px 8px" }}>
      {title}
    </div>
    <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "var(--bg)" }}>
      {children}
    </div>
  </div>
);

const SettingsRow = ({ icon, label, value, last, danger }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12,
    padding: "12px 14px",
    borderBottom: last ? "none" : "1px solid var(--divider)",
  }}>
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: "var(--surface-2)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: danger ? "var(--danger-500)" : "var(--text-secondary)",
    }}>
      <Icon name={icon} size={15}/>
    </div>
    <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: danger ? "var(--danger-500)" : "var(--text-primary)" }}>
      {label}
    </div>
    {value && <div style={{ fontSize: 12, color: "var(--text-tertiary)" }} className="tabular">{value}</div>}
    <Icon name="chevronRight" size={16} color="var(--text-tertiary)"/>
  </div>
);

/* =================== CAMERA AI =================== */
const CameraAIScreen = () => {
  return (
    <div style={{ background: "#0B0E11", height: "100%", color: "#fff", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Camera preview area */}
      <div style={{
        flex: 1,
        background: "#1a1611",
        backgroundImage: `
          radial-gradient(circle at 30% 30%, rgba(212, 165, 116, 0.6) 0, transparent 30%),
          radial-gradient(circle at 65% 50%, rgba(127, 168, 88, 0.5) 0, transparent 28%),
          radial-gradient(circle at 50% 75%, rgba(232, 200, 150, 0.5) 0, transparent 25%)
        `,
        position: "relative",
      }}>
        {/* Top bar */}
        <div style={{
          padding: "12px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="x" size={20} color="#fff" strokeWidth={2}/>
          </div>
          <div style={{
            padding: "6px 12px", borderRadius: 999,
            background: "rgba(0,0,0,0.5)",
            fontSize: 11, fontWeight: 600,
          }}>
            <span style={{ color: "var(--primary-500)" }}>●</span> Foto IA · 4 usos restantes
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 999,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="info" size={18} color="#fff"/>
          </div>
        </div>

        {/* Detection overlays */}
        <div style={{ position: "absolute", top: "26%", left: "16%", width: 120, height: 110, border: "2px solid var(--primary-500)", borderRadius: 8 }}>
          <div style={{ position: "absolute", top: -22, left: 0, fontSize: 11, fontWeight: 600, background: "var(--primary-500)", color: "#0B0E11", padding: "2px 6px", borderRadius: 4 }}>
            Pollo · 92%
          </div>
        </div>
        <div style={{ position: "absolute", top: "44%", left: "52%", width: 110, height: 100, border: "2px solid var(--primary-500)", borderRadius: 8 }}>
          <div style={{ position: "absolute", top: -22, left: 0, fontSize: 11, fontWeight: 600, background: "var(--primary-500)", color: "#0B0E11", padding: "2px 6px", borderRadius: 4 }}>
            Ensalada · 86%
          </div>
        </div>
        <div style={{ position: "absolute", top: "65%", left: "32%", width: 90, height: 70, border: "2px dashed rgba(255,255,255,0.6)", borderRadius: 8 }}>
          <div style={{ position: "absolute", top: -22, left: 0, fontSize: 11, fontWeight: 600, background: "rgba(0,0,0,0.6)", color: "#fff", padding: "2px 6px", borderRadius: 4 }}>
            Arroz · 64% (?)
          </div>
        </div>

        {/* Tip */}
        <div style={{
          position: "absolute", left: 16, right: 16, bottom: 16,
          padding: "10px 12px", borderRadius: 10,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          fontSize: 12, lineHeight: 1.4,
        }}>
          <span style={{ fontWeight: 600 }}>Tip:</span> usá luz natural y encuadrá todo el plato desde arriba.
        </div>
      </div>

      {/* Detection results */}
      <div style={{
        background: "var(--bg)", color: "var(--text-primary)",
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        padding: "8px 16px 24px",
      }}>
        <div style={{ width: 36, height: 4, background: "var(--surface-3)", borderRadius: 2, margin: "4px auto 12px" }}/>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Detectados</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>3 alimentos · 568 kcal</div>
          </div>
          <Icon name="edit" size={18} color="var(--text-secondary)"/>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <DetectedRow name="Pechuga de pollo grillado" qty="180 g" kcal={296} swatch="#D4A574" confidence={92}/>
          <DetectedRow name="Ensalada mixta con palta" qty="220 g" kcal={186} swatch="#7FA858" confidence={86}/>
          <DetectedRow name="Arroz integral" qty="80 g" kcal={86} swatch="#E8DCC4" confidence={64} doubt/>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <div style={{
            flex: 1, padding: "12px 14px", borderRadius: 12,
            border: "1px solid var(--border-strong)",
            fontSize: 14, fontWeight: 600, textAlign: "center",
          }}>Tomar otra</div>
          <div style={{
            flex: 1.4, padding: "12px 14px", borderRadius: 12,
            background: "var(--primary-500)", color: "#0B0E11",
            fontSize: 14, fontWeight: 700, textAlign: "center",
          }}>Agregar 568 kcal</div>
        </div>
      </div>
    </div>
  );
};

const DetectedRow = ({ name, qty, kcal, swatch, confidence, doubt }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 0", borderTop: "1px solid var(--divider)",
  }}>
    <div style={{ width: 38, height: 38, borderRadius: 8, background: swatch, flexShrink: 0,
      backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.2) 0 4px, transparent 4px 8px)" }}/>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2, display: "flex", alignItems: "center", gap: 6 }} className="tabular">
        <span>{qty}</span>
        <span style={{
          color: doubt ? "var(--warning-500)" : "var(--success-500)",
          fontWeight: 600,
        }}>{confidence}% {doubt ? "· revisar" : ""}</span>
      </div>
    </div>
    <div style={{ fontSize: 14, fontWeight: 700 }} className="tabular">{kcal}</div>
    <Icon name="chevronRight" size={14} color="var(--text-tertiary)"/>
  </div>
);

/* =================== SUPPLEMENTS LIST =================== */
const SupplementsScreen = () => {
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

      {/* Adherence summary */}
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
          {/* Mini week */}
          <div style={{ display: "flex", gap: 3 }}>
            {[1,1,1,1,0,1,1].map((v, i) => (
              <div key={i} style={{
                width: 7, height: 28, borderRadius: 3,
                background: v ? "var(--success-500)" : "var(--surface-3)",
              }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 18, padding: "0 16px", borderBottom: "1px solid var(--divider)" }}>
        <Tab active>Hoy</Tab>
        <Tab>Activos</Tab>
        <Tab>Pausados</Tab>
        <Tab>Catálogo</Tab>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Schedule timeline */}
        <div style={{ padding: "14px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Mañana · 9:00
          </div>
          <SuppCard name="Creatina monohidrato" brand="MyProtein" dose="5 g · polvo" stock="22 días" status="taken" time="9:00"/>
          <SuppCard name="Multivitamínico" brand="Now Foods" dose="1 cápsula" stock="14 días" status="taken" time="9:00"/>
        </div>

        <div style={{ padding: "14px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Tarde · 13:00
          </div>
          <SuppCard name="Omega-3" brand="Solgar" dose="1 cápsula · 1000 mg" stock="42 días" status="pending" time="13:00"/>
        </div>

        <div style={{ padding: "14px 16px 6px" }}>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600, marginBottom: 10 }}>
            Noche · 22:00
          </div>
          <SuppCard name="Magnesio bisglicinato" brand="Pure Encapsulations" dose="400 mg" stock="6 días" stockLow status="pending" time="22:00"/>
          <SuppCard name="Melatonina" brand="Genérica" dose="1 mg" stock="—" status="paused" time="22:00"/>
        </div>

        <div style={{ height: 16 }}/>
      </div>

      <BottomNav active="me"/>
    </div>
  );
};

const SuppCard = ({ name, brand, dose, stock, stockLow, status, time }) => {
  const isTaken = status === "taken";
  const isPaused = status === "paused";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 12px",
      border: "1px solid var(--border)",
      borderRadius: 12,
      background: isTaken ? "var(--surface-2)" : "var(--bg)",
      opacity: isPaused ? 0.55 : 1,
      marginBottom: 8,
    }}>
      {/* Pill icon swatch */}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: "var(--surface-2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--text-secondary)", flexShrink: 0,
      }}>
        <Icon name="pill" size={20}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: isTaken ? "var(--text-secondary)" : "var(--text-primary)",
            textDecoration: isTaken ? "line-through" : "none" }}>{name}</div>
          {isPaused && <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: "var(--surface-3)", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: 0.4 }}>Pausa</span>}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-tertiary)", marginTop: 2 }} className="tabular">
          {dose} · {brand}
        </div>
        <div style={{ fontSize: 10, color: stockLow ? "var(--danger-500)" : "var(--text-tertiary)", marginTop: 2, fontWeight: stockLow ? 600 : 500 }} className="tabular">
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
  );
};

Object.assign(window, {
  OnboardingScreen, ProfileScreen, CameraAIScreen, SupplementsScreen,
  ProfileStat, SettingsGroup, SettingsRow, DetectedRow, SuppCard,
});
