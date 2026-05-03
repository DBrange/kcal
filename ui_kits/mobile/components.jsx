// Kcal — shared UI kit components (Binance-style mobile)
// Loaded as a Babel script. Exposes components on window.

const C = {
  bg0:'#0B0E11', bg1:'#181A20', bg2:'#1E2329', bg3:'#2B3139',
  fg1:'#EAECEF', fg2:'#B7BDC6', fg3:'#848E9C', fg4:'#5E6673',
  line:'#2B3139', brand:'#FCD535', brandS:'#F0B90B', brandFg:'#0B0E11',
  pos:'#0ECB81', neg:'#F6465D', info:'#5AC8FA',
  protein:'#F6465D', carbs:'#FCD535', fat:'#0ECB81', fiber:'#5AC8FA',
};
const FS = '"Inter",system-ui,sans-serif';
const FM = '"JetBrains Mono",ui-monospace,monospace';

// ─── Top bar (Binance-style: tight, dark, balance number front-and-center)
function KTopBar({ left, title, right, sub }) {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 16px 12px',gap:12}}>
      <div style={{width:36,display:'flex',justifyContent:'flex-start'}}>{left}</div>
      <div style={{flex:1,textAlign:'center'}}>
        {title && <div style={{fontFamily:FS,fontSize:15,fontWeight:600,color:C.fg1,letterSpacing:'-0.01em'}}>{title}</div>}
        {sub && <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:C.fg3,marginTop:2}}>{sub}</div>}
      </div>
      <div style={{width:36,display:'flex',justifyContent:'flex-end'}}>{right}</div>
    </div>
  );
}

function KIconBtn({ glyph, onClick, color = C.fg1 }) {
  return <button onClick={onClick} style={{width:36,height:36,borderRadius:18,background:'transparent',border:0,color,display:'grid',placeItems:'center',cursor:'pointer',padding:0}}>
    <span style={{fontFamily:FM,fontSize:18,lineHeight:1}}>{glyph}</span>
  </button>;
}

// ─── Bottom tab bar with center FAB
function KTabBar({ active, onChange, onPlus }) {
  const tabs = [
    {id:'home', label:'Home', g:'⌂'},
    {id:'plan', label:'Plan', g:'≡'},
    null, // FAB slot
    {id:'stats', label:'Stats', g:'⊞'},
    {id:'me', label:'Me', g:'◉'},
  ];
  return (
    <div style={{position:'absolute',bottom:0,left:0,right:0,height:84,paddingBottom:34,background:'rgba(11,14,17,0.78)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderTop:`1px solid ${C.line}`,display:'flex',alignItems:'center',justifyContent:'space-around',zIndex:5}}>
      {tabs.map((t,i)=> t === null ? (
        <button key={i} onClick={onPlus} style={{width:52,height:52,borderRadius:26,background:C.brand,color:C.brandFg,border:0,marginTop:-22,boxShadow:'0 6px 18px rgba(252,213,53,0.28)',fontSize:28,fontWeight:700,lineHeight:1,cursor:'pointer',fontFamily:FS}}>+</button>
      ) : (
        <button key={t.id} onClick={()=>onChange(t.id)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,background:'transparent',border:0,padding:'4px 8px',cursor:'pointer',color:active===t.id?C.brand:C.fg3,fontFamily:FM}}>
          <span style={{fontSize:20,lineHeight:1}}>{t.g}</span>
          <span style={{fontSize:9,letterSpacing:'.08em',textTransform:'uppercase'}}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Calorie ring
function KCalorieRing({ size=200, consumed=2153, target=2400, mode='remaining' }) {
  const r = size/2 - 8;
  const cx = size/2, cy = size/2;
  const remaining = Math.max(0, target - consumed);
  const pct = Math.min(1, consumed/target);
  const circ = 2*Math.PI*r;
  const main = mode==='remaining' ? remaining : consumed;
  const lbl = mode==='remaining' ? 'remaining' : 'consumed';
  return (
    <div style={{position:'relative',width:size,height:size}}>
      <svg width={size} height={size} style={{transform:'rotate(-90deg)'}}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.bg2} strokeWidth="10"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.brand} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} style={{transition:'stroke-dashoffset 400ms cubic-bezier(0.2,0,0,1)'}}/>
      </svg>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <div style={{fontFamily:FS,fontSize:38,fontWeight:600,color:C.fg1,fontVariantNumeric:'tabular-nums',letterSpacing:'-0.02em',lineHeight:1}}>{main.toLocaleString()}</div>
        <div style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:C.fg3,marginTop:6}}>{lbl}</div>
        <div style={{fontFamily:FM,fontSize:11,color:remaining>0?C.pos:C.neg,marginTop:6,fontVariantNumeric:'tabular-nums'}}>
          {remaining>0 ? `+${remaining} under` : `${remaining} over`}
        </div>
      </div>
    </div>
  );
}

// ─── Macro bar
function KMacroBar({ name, consumed, target, color }) {
  const pct = Math.min(1, consumed/target);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:5,flex:1,minWidth:0}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:6}}>
        <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:C.fg2,fontWeight:500}}>{name}</span>
      </div>
      <div style={{height:4,background:C.bg2,borderRadius:999,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${pct*100}%`,background:color,borderRadius:999}}/>
      </div>
      <div style={{fontFamily:FM,fontSize:11,color:C.fg1,fontVariantNumeric:'tabular-nums'}}>
        <span style={{color:C.fg1,fontWeight:500}}>{consumed}</span><span style={{color:C.fg3}}> / {target}g</span>
      </div>
    </div>
  );
}

// ─── Stat card
function KStatCard({ label, value, unit, delta, deltaColor=C.fg3 }) {
  return (
    <div style={{background:C.bg1,borderRadius:12,padding:14,display:'flex',flexDirection:'column',gap:5,flex:1,minWidth:0}}>
      <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:C.fg3}}>{label}</span>
      <div style={{display:'flex',alignItems:'baseline',gap:4}}>
        <span style={{fontFamily:FS,fontSize:22,fontWeight:600,color:C.fg1,letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums',lineHeight:1}}>{value}</span>
        {unit && <span style={{fontFamily:FS,fontSize:12,color:C.fg3}}>{unit}</span>}
      </div>
      {delta && <span style={{fontFamily:FM,fontSize:11,color:deltaColor,fontVariantNumeric:'tabular-nums'}}>{delta}</span>}
    </div>
  );
}

// ─── Food row (order-book style)
function KFoodRow({ thumb, thumbColor, name, meta, kcal, onClick }) {
  return (
    <div onClick={onClick} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',cursor:'pointer',borderBottom:`1px solid ${C.line}`}}>
      <div style={{width:40,height:40,borderRadius:8,background:thumbColor||C.bg3,display:'grid',placeItems:'center',fontFamily:FM,fontSize:14,fontWeight:700,color:C.fg1,flexShrink:0}}>{thumb}</div>
      <div style={{flex:1,display:'flex',flexDirection:'column',gap:2,minWidth:0}}>
        <div style={{fontFamily:FS,fontSize:14,fontWeight:500,color:C.fg1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
        <div style={{fontFamily:FM,fontSize:11,color:C.fg3}}>{meta}</div>
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{fontFamily:FM,fontSize:14,color:C.fg1,fontVariantNumeric:'tabular-nums',fontWeight:500}}>{kcal}</div>
        <div style={{fontFamily:FM,fontSize:10,color:C.neg,fontVariantNumeric:'tabular-nums'}}>-{kcal}</div>
      </div>
    </div>
  );
}

// ─── Meal section header (Breakfast / Lunch ...)
function KMealHeader({ name, time, kcal, target, onAdd }) {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 16px 10px',background:C.bg0}}>
      <div style={{display:'flex',flexDirection:'column',gap:2}}>
        <div style={{display:'flex',alignItems:'baseline',gap:8}}>
          <span style={{fontFamily:FS,fontSize:16,fontWeight:600,color:C.fg1,letterSpacing:'-0.01em'}}>{name}</span>
          <span style={{fontFamily:FM,fontSize:10,letterSpacing:'.06em',textTransform:'uppercase',color:C.fg3}}>{time}</span>
        </div>
        <div style={{fontFamily:FM,fontSize:11,color:C.fg3,fontVariantNumeric:'tabular-nums'}}>
          <span style={{color:C.fg2}}>{kcal}</span> / {target} kcal
        </div>
      </div>
      <button onClick={onAdd} style={{width:32,height:32,borderRadius:16,background:C.bg2,border:0,color:C.brand,fontSize:20,fontWeight:600,lineHeight:1,cursor:'pointer'}}>+</button>
    </div>
  );
}

// ─── Segmented control
function KSegmented({ options, value, onChange }) {
  return (
    <div style={{display:'inline-flex',background:C.bg2,borderRadius:999,padding:4,gap:4}}>
      {options.map(o => (
        <button key={o.id} onClick={()=>onChange(o.id)} style={{padding:'7px 14px',borderRadius:999,border:0,fontFamily:FS,fontSize:12,fontWeight:500,cursor:'pointer',background:value===o.id?C.brand:'transparent',color:value===o.id?C.brandFg:C.fg2}}>{o.label}</button>
      ))}
    </div>
  );
}

// ─── Pill
function KPill({ children, variant='default' }) {
  const styles = {
    default: {bg:C.bg3, fg:C.fg2},
    pos: {bg:'#0F2A22', fg:C.pos},
    neg: {bg:'#2B1419', fg:C.neg},
    brand: {bg:'#FCD53533', fg:C.brand},
  };
  const s = styles[variant];
  return <span style={{display:'inline-flex',alignItems:'center',gap:4,height:22,padding:'0 8px',borderRadius:999,fontFamily:FS,fontSize:11,fontWeight:500,background:s.bg,color:s.fg,fontVariantNumeric:'tabular-nums'}}>{children}</span>;
}

// ─── Button
function KBtn({ children, variant='primary', onClick, full, sm }) {
  const v = {
    primary: {bg:C.brand, fg:C.brandFg},
    ghost: {bg:C.bg2, fg:C.fg1},
    pos: {bg:C.pos, fg:'#062E1E'},
    neg: {bg:C.neg, fg:'#fff'},
  }[variant];
  return <button onClick={onClick} style={{height:sm?32:48,padding:sm?'0 12px':'0 20px',width:full?'100%':undefined,borderRadius:8,border:0,background:v.bg,color:v.fg,fontFamily:FS,fontSize:sm?13:15,fontWeight:600,cursor:'pointer'}}>{children}</button>;
}

// ─── Sparkline (inline)
function KSparkline({ points, w=300, h=60, color=C.pos, fill=true }) {
  const max = Math.max(...points), min = Math.min(...points);
  const sp = (max - min) || 1;
  const step = w / (points.length - 1);
  const path = points.map((p,i)=>`${i===0?'M':'L'}${i*step},${h - ((p-min)/sp)*(h-4) - 2}`).join(' ');
  const area = path + ` L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{display:'block'}}>
      {fill && <defs><linearGradient id={`gg${color}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".25"/><stop offset="1" stopColor={color} stopOpacity="0"/></linearGradient></defs>}
      {fill && <path d={area} fill={`url(#gg${color})`}/>}
      <path d={path} stroke={color} strokeWidth="2" fill="none"/>
    </svg>
  );
}

// ─── Avatar circle
function KAvatar({ initials='AM', size=40 }) {
  return <div style={{width:size,height:size,borderRadius:'50%',background:C.brand,color:C.brandFg,display:'grid',placeItems:'center',fontFamily:FM,fontWeight:700,fontSize:size*0.38}}>{initials}</div>;
}

Object.assign(window, {
  KCAL_C: C, KCAL_FS: FS, KCAL_FM: FM,
  KTopBar, KIconBtn, KTabBar, KCalorieRing, KMacroBar, KStatCard, KFoodRow,
  KMealHeader, KSegmented, KPill, KBtn, KSparkline, KAvatar,
});
