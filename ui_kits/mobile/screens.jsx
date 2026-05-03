// Kcal — 5 core screens. Loaded after components.jsx.
const { KCAL_C: K, KCAL_FS: FS, KCAL_FM: FM,
  KTopBar, KIconBtn, KTabBar, KCalorieRing, KMacroBar, KStatCard, KFoodRow,
  KMealHeader, KSegmented, KPill, KBtn, KSparkline, KAvatar } = window;

// ─── HOME / DASHBOARD ────────────────────────────────────────
function HomeScreen({ onPlus, onTab, active, onOpenLog }) {
  const [mode, setMode] = React.useState('remaining');
  return (
    <div style={{height:'100%',background:K.bg0,color:K.fg1,display:'flex',flexDirection:'column',position:'relative'}}>
      <div style={{paddingTop:54}}/>
      <KTopBar
        left={<KAvatar initials="AM" size={32}/>}
        title="Kcal"
        sub="3 MAY · TUE"
        right={<KIconBtn glyph="◔" color={K.fg2}/>}
      />
      <div style={{flex:1,overflow:'auto',paddingBottom:100}}>
        {/* Hero ring */}
        <div style={{padding:'8px 16px 16px',display:'flex',justifyContent:'center'}}>
          <div onClick={()=>setMode(mode==='remaining'?'consumed':'remaining')} style={{cursor:'pointer'}}>
            <KCalorieRing size={220} consumed={2153} target={2400} mode={mode}/>
          </div>
        </div>
        {/* Macro row */}
        <div style={{display:'flex',gap:12,padding:'0 16px 18px'}}>
          <KMacroBar name="Protein" consumed={148} target={160} color={K.protein}/>
          <KMacroBar name="Carbs" consumed={202} target={240} color={K.carbs}/>
          <KMacroBar name="Fat" consumed={64} target={70} color={K.fat}/>
        </div>
        {/* Stat cards */}
        <div style={{display:'flex',gap:8,padding:'0 16px 8px'}}>
          <KStatCard label="Streak" value="12" unit="d" delta="+1 today" deltaColor={K.pos}/>
          <KStatCard label="Weight" value="72.4" unit="kg" delta="-0.3 vs last wk" deltaColor={K.pos}/>
          <KStatCard label="Water" value="1.6" unit="/2.5L" delta="64%" deltaColor={K.fg3}/>
        </div>
        {/* Today's log preview */}
        <div style={{padding:'18px 16px 8px',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
          <div style={{display:'flex',alignItems:'baseline',gap:8}}>
            <span style={{fontFamily:FS,fontSize:16,fontWeight:600,letterSpacing:'-0.01em'}}>Today's log</span>
            <KPill variant="pos">+184 under</KPill>
          </div>
          <span onClick={onOpenLog} style={{fontFamily:FM,fontSize:11,color:K.brand,letterSpacing:'.06em',textTransform:'uppercase',cursor:'pointer'}}>Open ›</span>
        </div>
        <div style={{background:K.bg1,margin:'0 16px',borderRadius:12,overflow:'hidden'}}>
          <KFoodRow thumb="O" thumbColor="#3D2818" name="Avena con plátano" meta="08:14 · 250g · breakfast" kcal={412}/>
          <KFoodRow thumb="P" thumbColor="#1E2A2E" name="Pollo a la plancha" meta="13:42 · 180g · lunch" kcal={298}/>
          <KFoodRow thumb="A" thumbColor="#2A1E2E" name="Arroz integral" meta="13:42 · 120g · lunch" kcal={156}/>
        </div>
        {/* Trend chart */}
        <div style={{margin:'18px 16px 0',background:K.bg1,borderRadius:12,padding:14}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
            <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3}}>Weight · 30d</span>
            <span style={{fontFamily:FM,fontSize:12,color:K.pos,fontVariantNumeric:'tabular-nums'}}>-1.8 kg</span>
          </div>
          <div style={{fontFamily:FS,fontSize:22,fontWeight:600,color:K.fg1,fontVariantNumeric:'tabular-nums',letterSpacing:'-0.02em',marginBottom:8}}>72.4<span style={{fontSize:13,color:K.fg3,fontWeight:400}}> kg</span></div>
          <KSparkline points={[74.2,74.0,73.8,73.9,73.6,73.4,73.5,73.2,73.0,73.1,72.8,72.7,72.9,72.6,72.4]} w={340} h={64} color={K.pos}/>
        </div>
      </div>
      <KTabBar active={active} onChange={onTab} onPlus={onPlus}/>
    </div>
  );
}

// ─── PLAN / MEAL LOG ─────────────────────────────────────────
function PlanScreen({ onPlus, onTab, active, onOpenFood }) {
  const [meal, setMeal] = React.useState('all');
  return (
    <div style={{height:'100%',background:K.bg0,color:K.fg1,display:'flex',flexDirection:'column',position:'relative'}}>
      <div style={{paddingTop:54}}/>
      <KTopBar
        left={<KIconBtn glyph="‹" color={K.fg1}/>}
        title="Tuesday, 3 May"
        sub="2,153 / 2,400 KCAL"
        right={<KIconBtn glyph="⌕" color={K.fg2}/>}
      />
      <div style={{display:'flex',justifyContent:'center',padding:'4px 16px 12px'}}>
        <KSegmented value={meal} onChange={setMeal} options={[
          {id:'all',label:'All'},{id:'b',label:'Breakfast'},{id:'l',label:'Lunch'},{id:'d',label:'Dinner'},{id:'s',label:'Snack'},
        ]}/>
      </div>
      <div style={{flex:1,overflow:'auto',paddingBottom:100}}>
        <KMealHeader name="Breakfast" time="08:14" kcal={412} target={550} onAdd={onPlus}/>
        <div style={{background:K.bg1,margin:'0 16px',borderRadius:12,overflow:'hidden'}}>
          <KFoodRow thumb="O" thumbColor="#3D2818" name="Avena con plátano" meta="250g · 1 bowl" kcal={412} onClick={onOpenFood}/>
        </div>
        <KMealHeader name="Lunch" time="13:42" kcal={596} target={750} onAdd={onPlus}/>
        <div style={{background:K.bg1,margin:'0 16px',borderRadius:12,overflow:'hidden'}}>
          <KFoodRow thumb="P" thumbColor="#1E2A2E" name="Pollo a la plancha" meta="180g · 1 portion" kcal={298} onClick={onOpenFood}/>
          <KFoodRow thumb="A" thumbColor="#2A1E2E" name="Arroz integral" meta="120g · 1 cup" kcal={156}/>
          <KFoodRow thumb="E" thumbColor="#1E2E22" name="Ensalada mixta" meta="200g · 1 bowl" kcal={142}/>
        </div>
        <KMealHeader name="Dinner" time="19:30" kcal={0} target={650} onAdd={onPlus}/>
        <div style={{margin:'0 16px',padding:'24px 16px',background:K.bg1,borderRadius:12,textAlign:'center'}}>
          <div style={{fontFamily:FM,fontSize:11,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:6}}>No orders yet</div>
          <div style={{fontFamily:FS,fontSize:13,color:K.fg2,marginBottom:14}}>Plan or log dinner to close the day</div>
          <KBtn variant="ghost" sm onClick={onPlus}>Add to dinner</KBtn>
        </div>
        <KMealHeader name="Snack" time="—" kcal={1145} target={450} onAdd={onPlus}/>
        <div style={{background:K.bg1,margin:'0 16px',borderRadius:12,overflow:'hidden'}}>
          <KFoodRow thumb="N" thumbColor="#2E2418" name="Mix nueces" meta="60g · 1 handful" kcal={387}/>
          <KFoodRow thumb="C" thumbColor="#2E1E1E" name="Café latte" meta="240ml · whole milk" kcal={158}/>
        </div>
        <div style={{margin:'18px 16px 0',padding:'14px 16px',background:K.bg2,borderRadius:8,display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:6,height:6,borderRadius:3,background:K.neg}}/>
          <span style={{fontFamily:FS,fontSize:13,color:K.fg2}}>Snack is +695 over the slot target</span>
        </div>
      </div>
      <KTabBar active={active} onChange={onTab} onPlus={onPlus}/>
    </div>
  );
}

// ─── ADD FOOD (bottom sheet) ─────────────────────────────────
function AddFoodSheet({ onClose, onAddItem }) {
  const [tab, setTab] = React.useState('search');
  const [q, setQ] = React.useState('');
  const items = [
    {n:'Pechuga de pollo, plancha', m:'100g · verified', k:165, c:'#1E2A2E', t:'P'},
    {n:'Arroz blanco, cocido', m:'100g · verified', k:130, c:'#2A1E2E', t:'A'},
    {n:'Plátano, mediano', m:'118g · verified', k:105, c:'#2E2818', t:'B'},
    {n:'Yogur griego, natural', m:'170g · verified', k:100, c:'#252A2E', t:'Y'},
    {n:'Almendras', m:'30g · 23 unidades', k:174, c:'#2E2418', t:'N'},
    {n:'Huevo, entero', m:'50g · 1 unidad', k:78, c:'#2E2A18', t:'H'},
  ];
  return (
    <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.6)',zIndex:20,display:'flex',flexDirection:'column',justifyContent:'flex-end'}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:K.bg0,borderTopLeftRadius:16,borderTopRightRadius:16,height:'88%',display:'flex',flexDirection:'column',boxShadow:'0 -8px 32px rgba(0,0,0,0.5)'}}>
        <div style={{display:'flex',justifyContent:'center',padding:'10px 0'}}>
          <div style={{width:36,height:4,background:K.bg3,borderRadius:2}}/>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'4px 16px 12px'}}>
          <span style={{fontFamily:FS,fontSize:18,fontWeight:600,letterSpacing:'-0.01em'}}>Add to lunch</span>
          <button onClick={onClose} style={{background:'transparent',border:0,color:K.fg2,fontSize:22,cursor:'pointer',lineHeight:1}}>✕</button>
        </div>
        {/* search */}
        <div style={{padding:'0 16px 12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,height:44,padding:'0 14px',background:K.bg2,borderRadius:8}}>
            <span style={{color:K.fg3,fontFamily:FM}}>⌕</span>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search 10M+ verified foods" style={{flex:1,background:'transparent',border:0,color:K.fg1,fontFamily:FS,fontSize:14,outline:'none'}}/>
            {q && <button onClick={()=>setQ('')} style={{background:'transparent',border:0,color:K.fg3,cursor:'pointer'}}>✕</button>}
          </div>
        </div>
        {/* tabs */}
        <div style={{display:'flex',justifyContent:'center',padding:'0 0 12px'}}>
          <KSegmented value={tab} onChange={setTab} options={[
            {id:'search',label:'Search'},{id:'recent',label:'Recent'},{id:'meals',label:'Meals'},{id:'mine',label:'Mine'},
          ]}/>
        </div>
        {/* method row */}
        <div style={{display:'flex',gap:8,padding:'0 16px 14px'}}>
          <MethodChip g="◉" label="Photo"/>
          <MethodChip g="▮" label="Barcode"/>
          <MethodChip g="◍" label="Voice"/>
          <MethodChip g="✎" label="Manual"/>
        </div>
        <div style={{padding:'0 16px 8px',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
          <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3}}>Verified · top results</span>
          <span style={{fontFamily:FM,fontSize:10,color:K.fg3}}>kcal /100g</span>
        </div>
        <div style={{flex:1,overflow:'auto'}}>
          {items.filter(i=>!q||i.n.toLowerCase().includes(q.toLowerCase())).map((it,i)=>(
            <div key={i} onClick={()=>onAddItem(it)} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',cursor:'pointer',borderBottom:`1px solid ${K.line}`}}>
              <div style={{width:36,height:36,borderRadius:8,background:it.c,display:'grid',placeItems:'center',fontFamily:FM,fontWeight:700,color:K.fg1}}>{it.t}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:FS,fontSize:14,fontWeight:500,color:K.fg1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{it.n}</div>
                <div style={{fontFamily:FM,fontSize:11,color:K.fg3}}>{it.m}</div>
              </div>
              <div style={{fontFamily:FM,fontSize:14,color:K.fg1,fontVariantNumeric:'tabular-nums',fontWeight:500}}>{it.k}</div>
              <button style={{width:28,height:28,borderRadius:14,background:K.brand,color:K.brandFg,border:0,fontSize:18,fontWeight:700,lineHeight:1,cursor:'pointer',marginLeft:6}}>+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MethodChip({ g, label }) {
  return (
    <div style={{flex:1,height:64,background:K.bg1,borderRadius:8,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:4,cursor:'pointer'}}>
      <span style={{fontSize:18,color:K.brand,fontFamily:FM}}>{g}</span>
      <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg2}}>{label}</span>
    </div>
  );
}

// ─── FOOD DETAIL ─────────────────────────────────────────────
function FoodDetailScreen({ onClose }) {
  const [grams, setGrams] = React.useState(180);
  const base = {kcal:165, p:31, c:0, f:3.6}; // per 100g
  const ratio = grams/100;
  const calc = k => Math.round(base[k]*ratio*10)/10;
  return (
    <div style={{height:'100%',background:K.bg0,color:K.fg1,display:'flex',flexDirection:'column'}}>
      <div style={{paddingTop:54}}/>
      <KTopBar
        left={<KIconBtn glyph="✕" onClick={onClose} color={K.fg1}/>}
        title="Pollo a la plancha"
        sub="VERIFIED · 100g BASE"
        right={<KIconBtn glyph="♡" color={K.fg2}/>}
      />
      <div style={{flex:1,overflow:'auto',paddingBottom:100}}>
        {/* Big number block */}
        <div style={{padding:'8px 20px 20px'}}>
          <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:6}}>Energy at {grams}g</div>
          <div style={{display:'flex',alignItems:'baseline',gap:8}}>
            <span style={{fontFamily:FS,fontSize:48,fontWeight:700,color:K.fg1,letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums',lineHeight:1}}>{Math.round(base.kcal*ratio)}</span>
            <span style={{fontFamily:FM,fontSize:14,color:K.fg3}}>kcal</span>
            <span style={{marginLeft:'auto'}}><KPill variant="brand">9% of day</KPill></span>
          </div>
        </div>

        {/* Macro split bar */}
        <div style={{margin:'0 16px 14px'}}>
          <div style={{height:8,borderRadius:999,overflow:'hidden',display:'flex',background:K.bg2}}>
            <div style={{width:'74%',background:K.protein}}/>
            <div style={{width:'0%',background:K.carbs}}/>
            <div style={{width:'26%',background:K.fat}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontFamily:FM,fontSize:11}}>
            <span style={{color:K.protein}}>● Protein 74%</span>
            <span style={{color:K.carbs}}>● Carbs 0%</span>
            <span style={{color:K.fat}}>● Fat 26%</span>
          </div>
        </div>

        {/* Portion stepper */}
        <div style={{margin:'0 16px 14px',padding:14,background:K.bg1,borderRadius:12}}>
          <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:10}}>Portion</div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <button onClick={()=>setGrams(Math.max(10,grams-10))} style={{width:44,height:44,borderRadius:8,background:K.bg2,border:0,color:K.fg1,fontSize:24,cursor:'pointer',lineHeight:1}}>−</button>
            <div style={{flex:1,textAlign:'center'}}>
              <div style={{fontFamily:FS,fontSize:32,fontWeight:600,color:K.fg1,fontVariantNumeric:'tabular-nums',letterSpacing:'-0.02em',lineHeight:1}}>{grams}</div>
              <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginTop:4}}>grams</div>
            </div>
            <button onClick={()=>setGrams(grams+10)} style={{width:44,height:44,borderRadius:8,background:K.bg2,border:0,color:K.fg1,fontSize:24,cursor:'pointer',lineHeight:1}}>+</button>
          </div>
          <div style={{display:'flex',gap:6,marginTop:10}}>
            {[100,150,180,250].map(g=>(
              <button key={g} onClick={()=>setGrams(g)} style={{flex:1,height:32,borderRadius:8,background:grams===g?K.bg3:'transparent',border:`1px solid ${K.line}`,color:K.fg2,fontFamily:FM,fontSize:12,cursor:'pointer'}}>{g}g</button>
            ))}
          </div>
        </div>

        {/* Nutrition table */}
        <div style={{padding:'0 16px 8px'}}>
          <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:8}}>Nutrition · {grams}g</div>
          <div style={{background:K.bg1,borderRadius:12,overflow:'hidden'}}>
            <NutRow label="Protein" v={`${calc('p')}g`} pct="92"/>
            <NutRow label="Carbs" v={`${calc('c')}g`} pct="0"/>
            <NutRow label="Fat" v={`${calc('f')}g`} pct="9"/>
            <NutRow label="Sodium" v="148mg" pct="6"/>
            <NutRow label="Iron" v="1.4mg" pct="8" last/>
          </div>
        </div>
      </div>
      {/* Footer CTA */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'12px 16px 28px',background:'rgba(11,14,17,0.92)',backdropFilter:'blur(20px)',borderTop:`1px solid ${K.line}`,display:'flex',gap:8}}>
        <KBtn variant="ghost" full>Save to meals</KBtn>
        <KBtn variant="primary" full onClick={onClose}>Add · {Math.round(base.kcal*ratio)} kcal</KBtn>
      </div>
    </div>
  );
}

function NutRow({ label, v, pct, last }) {
  return (
    <div style={{display:'flex',alignItems:'center',padding:'12px 14px',borderBottom:last?'none':`1px solid ${K.line}`,gap:12}}>
      <span style={{fontFamily:FS,fontSize:14,color:K.fg1,flex:1}}>{label}</span>
      <span style={{fontFamily:FM,fontSize:14,color:K.fg1,fontVariantNumeric:'tabular-nums',fontWeight:500}}>{v}</span>
      <span style={{fontFamily:FM,fontSize:11,color:K.fg3,fontVariantNumeric:'tabular-nums',width:48,textAlign:'right'}}>{pct}%</span>
    </div>
  );
}

// ─── STATS / PROGRESS ────────────────────────────────────────
function StatsScreen({ onPlus, onTab, active }) {
  const [period, setPeriod] = React.useState('week');
  return (
    <div style={{height:'100%',background:K.bg0,color:K.fg1,display:'flex',flexDirection:'column',position:'relative'}}>
      <div style={{paddingTop:54}}/>
      <KTopBar title="Stats" sub="LAST 7 DAYS" right={<KIconBtn glyph="⇪" color={K.fg2}/>}/>
      <div style={{display:'flex',justifyContent:'center',padding:'4px 16px 14px'}}>
        <KSegmented value={period} onChange={setPeriod} options={[
          {id:'day',label:'D'},{id:'week',label:'W'},{id:'month',label:'M'},{id:'year',label:'Y'},
        ]}/>
      </div>
      <div style={{flex:1,overflow:'auto',paddingBottom:100}}>
        {/* Avg KPI */}
        <div style={{padding:'0 16px 16px'}}>
          <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:6}}>Avg daily intake</div>
          <div style={{display:'flex',alignItems:'baseline',gap:10}}>
            <span style={{fontFamily:FS,fontSize:44,fontWeight:700,letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums',lineHeight:1}}>2,184</span>
            <span style={{fontFamily:FM,fontSize:13,color:K.fg3}}>kcal</span>
            <span style={{marginLeft:'auto'}}><KPill variant="neg">+74 vs target</KPill></span>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{margin:'0 16px 16px',padding:14,background:K.bg1,borderRadius:12}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
            <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3}}>Daily intake vs target</span>
            <span style={{fontFamily:FM,fontSize:10,color:K.fg3}}>kcal</span>
          </div>
          <div style={{display:'flex',alignItems:'flex-end',gap:8,height:140,paddingTop:8,position:'relative'}}>
            <div style={{position:'absolute',left:0,right:0,top:34,height:1,background:K.line,borderTop:`1px dashed ${K.fg4}`}}/>
            {[
              {d:'M',v:2300,o:false},{d:'T',v:2050,o:false},{d:'W',v:2480,o:true},{d:'T',v:2210,o:false},
              {d:'F',v:2620,o:true},{d:'S',v:1900,o:false},{d:'S',v:2153,o:false,today:true},
            ].map((b,i)=>(
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:6}}>
                <div style={{width:'100%',height:`${(b.v/2800)*120}px`,background:b.o?K.neg:(b.today?K.brand:K.pos),borderRadius:'3px 3px 0 0',opacity:b.today?1:0.85}}/>
                <span style={{fontFamily:FM,fontSize:10,color:b.today?K.brand:K.fg3,letterSpacing:'.06em'}}>{b.d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Macro distribution */}
        <div style={{margin:'0 16px 16px',padding:14,background:K.bg1,borderRadius:12}}>
          <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:12}}>Macro mix · 7d avg</div>
          <div style={{display:'flex',gap:14}}>
            <KMacroBar name="Protein" consumed={142} target={160} color={K.protein}/>
            <KMacroBar name="Carbs" consumed={228} target={240} color={K.carbs}/>
            <KMacroBar name="Fat" consumed={68} target={70} color={K.fat}/>
          </div>
        </div>

        {/* Weight */}
        <div style={{margin:'0 16px 16px',padding:14,background:K.bg1,borderRadius:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:6}}>
            <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3}}>Weight · 30d</span>
            <span style={{fontFamily:FM,fontSize:12,color:K.pos,fontVariantNumeric:'tabular-nums'}}>-1.8 kg</span>
          </div>
          <div style={{fontFamily:FS,fontSize:24,fontWeight:600,fontVariantNumeric:'tabular-nums',letterSpacing:'-0.02em',marginBottom:8}}>72.4<span style={{fontSize:13,color:K.fg3,fontWeight:400}}> kg</span></div>
          <KSparkline points={[74.2,74.0,73.8,73.9,73.6,73.4,73.5,73.2,73.0,73.1,72.8,72.7,72.9,72.6,72.4]} w={340} h={70} color={K.pos}/>
        </div>

        {/* Order book style: macros breakdown */}
        <div style={{margin:'0 16px 16px'}}>
          <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:8,paddingLeft:4}}>Today's macros · live</div>
          {[
            {t:'PROT', n:'Protein', v:'148g', d:'+12g', dc:K.pos, c:K.protein},
            {t:'CARB', n:'Carbs', v:'202g', d:'-38g', dc:K.neg, c:K.carbs},
            {t:'FAT', n:'Fat', v:'64g', d:'+4g', dc:K.pos, c:K.fat},
            {t:'FIB', n:'Fiber', v:'22g', d:'—', dc:K.fg3, c:K.fiber},
            {t:'NA', n:'Sodium', v:'1,840mg', d:'-340', dc:K.pos, c:K.fg3},
          ].map((r,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:i%2===0?K.bg1:K.bg2,borderRadius:i===0?'8px 8px 0 0':(i===4?'0 0 8px 8px':0)}}>
              <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',color:r.c,width:48,fontWeight:600}}>{r.t}</span>
              <span style={{fontFamily:FS,fontSize:13,color:K.fg1,flex:1}}>{r.n}</span>
              <span style={{fontFamily:FM,fontSize:13,color:K.fg1,fontVariantNumeric:'tabular-nums',fontWeight:500,width:80,textAlign:'right'}}>{r.v}</span>
              <span style={{fontFamily:FM,fontSize:12,color:r.dc,fontVariantNumeric:'tabular-nums',width:60,textAlign:'right'}}>{r.d}</span>
            </div>
          ))}
        </div>
      </div>
      <KTabBar active={active} onChange={onTab} onPlus={onPlus}/>
    </div>
  );
}

// ─── ME / PROFILE ────────────────────────────────────────────
function MeScreen({ onPlus, onTab, active }) {
  return (
    <div style={{height:'100%',background:K.bg0,color:K.fg1,display:'flex',flexDirection:'column',position:'relative'}}>
      <div style={{paddingTop:54}}/>
      <KTopBar title="Me" right={<KIconBtn glyph="⚙" color={K.fg2}/>}/>
      <div style={{flex:1,overflow:'auto',paddingBottom:100}}>
        {/* Profile hero */}
        <div style={{padding:'8px 16px 20px',display:'flex',alignItems:'center',gap:14}}>
          <KAvatar initials="AM" size={64}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:FS,fontSize:18,fontWeight:600,letterSpacing:'-0.01em'}}>Alejandra Méndez</div>
            <div style={{fontFamily:FM,fontSize:11,color:K.fg3,letterSpacing:'.04em'}}>UID 8419-2331 · MEMBER 14m</div>
            <div style={{marginTop:6}}><KPill variant="brand">Premium · annual</KPill></div>
          </div>
        </div>

        {/* Goal block */}
        <div style={{margin:'0 16px 14px',background:K.bg1,borderRadius:12,padding:14}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
            <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3}}>Active goal</span>
            <span style={{fontFamily:FM,fontSize:11,color:K.brand,letterSpacing:'.06em',textTransform:'uppercase'}}>Edit</span>
          </div>
          <div style={{display:'flex',alignItems:'baseline',gap:8,marginBottom:8}}>
            <span style={{fontFamily:FS,fontSize:24,fontWeight:600,letterSpacing:'-0.02em'}}>Lose fat</span>
            <span style={{fontFamily:FM,fontSize:13,color:K.fg3}}>· 0.5 kg / week</span>
          </div>
          <div style={{display:'flex',gap:12,fontFamily:FM,fontSize:12,color:K.fg2,fontVariantNumeric:'tabular-nums'}}>
            <span>Target <span style={{color:K.fg1,fontWeight:600}}>68.0 kg</span></span>
            <span style={{color:K.line}}>│</span>
            <span>Now <span style={{color:K.fg1,fontWeight:600}}>72.4 kg</span></span>
            <span style={{color:K.line}}>│</span>
            <span style={{color:K.pos}}>-4.4 to go</span>
          </div>
        </div>

        {/* Daily target breakdown */}
        <div style={{margin:'0 16px 14px',background:K.bg1,borderRadius:12,overflow:'hidden'}}>
          <Row label="Daily kcal" v="2,400"/>
          <Row label="BMR" v="1,540" sub="Mifflin-St Jeor"/>
          <Row label="Activity (NEAT)" v="+460"/>
          <Row label="Exercise (EAT)" v="+400" last/>
        </div>

        {/* Settings list */}
        <div style={{padding:'0 16px 8px',marginTop:8}}>
          <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:K.fg3,marginBottom:8,paddingLeft:4}}>Settings</div>
          <div style={{background:K.bg1,borderRadius:12,overflow:'hidden'}}>
            <SettingRow g="◔" label="Reminders" sub="Lunch · Dinner · Water"/>
            <SettingRow g="⌖" label="Health Connect" sub="Synced 4m ago" rightG={<span style={{color:K.pos,fontFamily:FM,fontSize:11}}>● live</span>}/>
            <SettingRow g="⏱" label="Fasting" sub="16:8 · ends 12:00"/>
            <SettingRow g="⊞" label="Widgets"/>
            <SettingRow g="⇅" label="Export data" last/>
          </div>
        </div>

        <div style={{padding:'14px 16px 0'}}>
          <KBtn variant="ghost" full>Sign out</KBtn>
        </div>
      </div>
      <KTabBar active={active} onChange={onTab} onPlus={onPlus}/>
    </div>
  );
}

function Row({ label, v, sub, last }) {
  return (
    <div style={{display:'flex',alignItems:'center',padding:'12px 14px',borderBottom:last?'none':`1px solid ${K.line}`,gap:12}}>
      <div style={{flex:1}}>
        <div style={{fontFamily:FS,fontSize:14,color:K.fg1}}>{label}</div>
        {sub && <div style={{fontFamily:FM,fontSize:11,color:K.fg3,marginTop:2}}>{sub}</div>}
      </div>
      <span style={{fontFamily:FM,fontSize:15,color:K.fg1,fontVariantNumeric:'tabular-nums',fontWeight:500}}>{v}</span>
    </div>
  );
}

function SettingRow({ g, label, sub, last, rightG }) {
  return (
    <div style={{display:'flex',alignItems:'center',padding:'12px 14px',borderBottom:last?'none':`1px solid ${K.line}`,gap:12,cursor:'pointer'}}>
      <div style={{width:32,height:32,borderRadius:8,background:K.bg2,display:'grid',placeItems:'center',color:K.fg2,fontFamily:FM,fontSize:14}}>{g}</div>
      <div style={{flex:1}}>
        <div style={{fontFamily:FS,fontSize:14,color:K.fg1}}>{label}</div>
        {sub && <div style={{fontFamily:FM,fontSize:11,color:K.fg3,marginTop:2}}>{sub}</div>}
      </div>
      {rightG || <span style={{color:K.fg3,fontFamily:FM,fontSize:18}}>›</span>}
    </div>
  );
}

Object.assign(window, {
  HomeScreen, PlanScreen, AddFoodSheet, FoodDetailScreen, StatsScreen, MeScreen,
});
