import { useState, useEffect, useRef, useCallback } from "react";

// ─── Fonts + Global Styles ────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --bg:#0a0a0f; --surface:#111118; --surface2:#1a1a26; --border:#ffffff12;
      --accent:#ff6b35; --accent2:#ffd166; --accent3:#06d6a0; --accent4:#8b5cf6;
      --text:#f0f0f8; --muted:#7878a0; --danger:#ef4444; --r:14px;
    }
    body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;}
    h1,h2,h3,.brand{font-family:'Syne',sans-serif;}
    ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes ripple{0%{transform:scale(0);opacity:1;}100%{transform:scale(4);opacity:0;}}
    @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
    @keyframes waveBar{0%,100%{transform:scaleY(.35);}50%{transform:scaleY(1);}}
    @keyframes flashWhite{0%,100%{opacity:0;}15%{opacity:.9;}}
    @keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
    .fade-up{animation:fadeUp .4s ease forwards;}
    .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;}
    .card-hover{transition:border-color .2s,transform .2s;} .card-hover:hover{border-color:#ffffff22;transform:translateY(-2px);}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;}
    .btn-primary{background:var(--accent);color:#fff;} .btn-primary:hover{background:#e55a24;}
    .btn-secondary{background:var(--surface2);color:var(--text);border:1px solid var(--border);} .btn-secondary:hover{background:#22222e;}
    .btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border);} .btn-ghost:hover{color:var(--text);border-color:#ffffff22;}
    .btn-danger{background:#1f1020;color:var(--danger);border:1px solid #ef444430;} .btn-danger:hover{background:#2a1525;}
    .btn-success{background:#051f17;color:var(--accent3);border:1px solid #06d6a030;} .btn-success:hover{background:#082b20;}
    .btn-edit{background:#1a1428;color:var(--accent4);border:1px solid #8b5cf630;} .btn-edit:hover{background:#221a38;}
    .btn-finish{background:linear-gradient(135deg,#06d6a0,#04b585);color:#fff;border:none;font-weight:700;} .btn-finish:hover{filter:brightness(1.1);}
    .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:500;}
    .input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
    .input:focus{border-color:#ff6b3550;} .input::placeholder{color:var(--muted);}
    .chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;font-size:13px;border:1px solid var(--border);background:var(--surface2);cursor:pointer;transition:all .2s;}
    .chip.active{border-color:var(--accent);background:#ff6b3515;color:var(--accent);}
    .progress-bar{height:6px;background:var(--surface2);border-radius:3px;overflow:hidden;}
    .progress-fill{height:100%;border-radius:3px;transition:width .6s ease;}
    .nav{display:flex;gap:2px;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:4px;}
    .nav-item{flex:1;padding:8px 12px;border-radius:9px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;text-align:center;color:var(--muted);display:flex;align-items:center;justify-content:center;gap:6px;border:none;background:transparent;font-family:'DM Sans',sans-serif;}
    .nav-item.active{background:var(--surface2);color:var(--text);} .nav-item:hover:not(.active){color:var(--text);}
    .mic-btn{width:72px;height:72px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:28px;position:relative;transition:all .3s;}
    .mic-btn.idle{background:var(--surface2);border:2px solid var(--border);} .mic-btn.idle:hover{border-color:var(--accent);transform:scale(1.06);}
    .mic-btn.recording{background:#ff6b35;border:2px solid #ff6b35;box-shadow:0 0 28px #ff6b3555;}
    .mic-btn.recording::after{content:'';position:absolute;inset:-10px;border-radius:50%;border:2px solid #ff6b3550;animation:ripple 1.5s ease infinite;}
    .wave-bar{width:4px;border-radius:3px;background:var(--accent);transform-origin:bottom;animation:waveBar .65s ease-in-out infinite;}
    .order-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px;transition:all .2s;animation:fadeUp .3s ease;}
    .order-card:hover{border-color:#ffffff20;}
    .active-order-card{border-left:3px solid var(--accent);}
    .finished-order-card{border-left:3px solid var(--accent3);opacity:.85;}
    .stat{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;}
    .table{width:100%;border-collapse:collapse;}
    .table th{text-align:left;padding:10px 14px;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border);}
    .table td{padding:12px 14px;font-size:14px;border-bottom:1px solid var(--border);}
    .table tr:last-child td{border-bottom:none;} .table tr:hover td{background:#ffffff04;}
    .drop-zone{border:2px dashed var(--border);border-radius:var(--r);padding:32px;text-align:center;cursor:pointer;transition:all .2s;}
    .drop-zone:hover,.drop-zone.drag{border-color:var(--accent);background:#ff6b3508;}
    .rec-dot{width:8px;height:8px;border-radius:50%;background:var(--danger);animation:blink 1s infinite;}
    .toast{position:fixed;bottom:24px;right:24px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px 20px;font-size:14px;z-index:2000;animation:fadeUp .3s ease;display:flex;align-items:center;gap:10px;}
    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
    @media(max-width:768px){.grid-2,.grid-4{grid-template-columns:1fr;}}
    .donut-wrap{position:relative;width:140px;height:140px;margin:0 auto;}
    .donut-wrap svg{transform:rotate(-90deg);}
    .donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
    .orders-columns{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    @media(max-width:900px){.orders-columns{grid-template-columns:1fr;}}
    .col-header{display:flex;align-items:center;gap:8px;margin-bottom:14px;}
    .col-dot{width:10px;height:10px;border-radius:50%;}
    .media-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
    .media-thumb{position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1px solid var(--border);background:var(--surface2);}
    .media-thumb img{width:100%;height:100%;object-fit:cover;}
    .media-thumb .remove-btn{position:absolute;top:4px;right:4px;background:#000000cc;border:none;color:#fff;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;z-index:2;}
    .media-add-btn{aspect-ratio:1;border-radius:8px;border:2px dashed var(--border);background:transparent;color:var(--muted);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;transition:all .2s;font-family:'DM Sans',sans-serif;}
    .media-add-btn:hover{border-color:var(--accent);color:var(--accent);background:#ff6b3508;}
    .modal-overlay{position:fixed;inset:0;background:#000000bb;z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);}
    .modal{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:480px;animation:modalIn .3s cubic-bezier(.34,1.2,.64,1);}
    .ocr-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:100px;font-size:12px;background:#8b5cf620;color:var(--accent4);border:1px solid #8b5cf630;}
    .cam-flash{position:absolute;inset:0;background:#fff;pointer-events:none;animation:flashWhite .4s ease forwards;z-index:10;}
  `}</style>
);

// ─── Constants ────────────────────────────────────────────────────────────────
const CUSTOMER_TYPES = [
  { id:"single",  label:"Solo",    emoji:"🧍",   color:"#8b5cf6" },
  { id:"couple",  label:"Couple",  emoji:"👫",   color:"#ec4899" },
  { id:"family",  label:"Family",  emoji:"👨‍👩‍👧", color:"#f59e0b" },
  { id:"friends", label:"Friends", emoji:"👥",   color:"#06d6a0" },
];

// Empty start — no pre-loaded menu
const EMPTY_MENU = [];

// ─── Local Storage ────────────────────────────────────────────────────────────
const DB = {
  get: (key, fallback) => {
    try { const r = localStorage.getItem(`rt_${key}`); return r ? JSON.parse(r) : fallback; }
    catch { return fallback; }
  },
  set: (key, val) => {
    try { localStorage.setItem(`rt_${key}`, JSON.stringify(val)); } catch {}
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateId = () => Math.random().toString(36).slice(2,9);
const fmt      = (n) => `₹${n.toLocaleString("en-IN")}`;
const fmtDate  = (d) => new Date(d).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});

// ─── Voice matching — Soundex + Edit-distance hybrid ────────────────────────
// Restores the original far-field tolerant system (soundex catches "paner"→"paneer",
// "steem"→"steam", "weg"→"veg" etc.) PLUS adds a confusion guard that prevents
// "Paneer Fried Momo" from matching when the user said "Paneer Steam Momo".
//
// How the guard works: for every clearly-recognisable spoken word (wms > 0.82),
// find which menu item's DISTINCTIVE word it best matches. If that word belongs
// to a different item (not this one), the match is rejected.
// "Distinctive" = appears in fewer than half the menu items (so "momo"/"burger"
// are NOT distinctive and are ignored by the guard).

function soundex(s) {
  return s.toLowerCase()
    .replace(/[aeiou]/g, "")
    .replace(/[bfpv]/g, "1").replace(/[cgjkqsxyz]/g, "2")
    .replace(/[dt]/g, "3").replace(/l/g, "4").replace(/[mn]/g, "5").replace(/r/g, "6")
    .replace(/(.)\1+/g, "$1");
}

function editSim(a, b) {
  const m = a.length, n = b.length;
  if (!m || !n) return 0;
  const dp = Array.from({length:m+1}, (_,i) => Array.from({length:n+1}, (_,j) => i||j));
  for (let i=1;i<=m;i++) for (let j=1;j<=n;j++)
    dp[i][j] = a[i-1]===b[j-1] ? dp[i-1][j-1] : 1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return 1 - dp[m][n] / Math.max(m, n);
}

// Per-word similarity: edit distance + soundex phonetic bonus
function wms(a, b) {
  return Math.max(editSim(a, b), soundex(a) === soundex(b) ? 0.82 : 0);
}

// Returns 0–1 confidence that itemName matches the spoken string.
// Pass allItemNames (array of all menu item names) to enable the confusion guard.
function matchScore(itemName, spoken, allItemNames) {
  const name = itemName.toLowerCase();
  const sp   = spoken.toLowerCase();
  if (sp.includes(name)) return 1.0;

  const nameWords = name.split(" ");
  const spWords   = sp.split(/\s+/);

  // ── Original scoring: each name-word looks for its best spoken-word match ──
  // Hit threshold 0.65 (down from original 0.72) to tolerate far-field garbling
  // like "weg"→"veg" (editSim=0.67, soundex differs) or "fred"→"fried"
  let hits = 0;
  nameWords.forEach(nw => {
    if (Math.max(...spWords.map(sw => wms(nw, sw))) > 0.65) hits++;
  });
  const wordScore    = hits / nameWords.length;
  const phoneticFull = soundex(name) === soundex(sp.slice(0, name.length + 5)) ? 0.78 : 0;
  const rawScore     = Math.max(wordScore, phoneticFull);

  if (rawScore < 0.75) return 0;  // doesn't pass basic threshold

  // ── Confusion guard: prevent "Paneer Steam Momo" matching "fried momo" ─────
  if (allItemNames && allItemNames.length > 0) {
    const allWords = allItemNames.flatMap(n => n.toLowerCase().split(" "));
    const freq = {};
    allWords.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const N = allItemNames.length;
    const isDistinctive = w => (freq[w] || 0) < N / 2;

    for (const sw of spWords) {
      // Find which distinctive word across all items this spoken word best matches
      let bestScore = 0, bestWord = "", bestItem = "";
      for (const other of allItemNames) {
        for (const ow of other.toLowerCase().split(" ")) {
          if (!isDistinctive(ow)) continue;
          const s = wms(sw, ow);
          if (s > bestScore) { bestScore = s; bestWord = ow; bestItem = other.toLowerCase(); }
        }
      }
      // Only act if spoken word unambiguously maps to some distinctive word (≥ 0.82)
      if (bestScore < 0.82) continue;
      // If that word is NOT in this item, and the item it belongs to is different → reject
      const thisHasWord = nameWords.some(nw => wms(nw, bestWord) > 0.65);
      if (!thisHasWord && bestItem !== name) return 0;
    }
  }
  return rawScore;
}

const NUM_WORDS = {one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10};

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  return <div className="toast"><span>✓</span> {msg}</div>;
}

// ─── Donut Chart ─────────────────────────────────────────────────────────────
function DonutChart({ data, total }) {
  let offset = 0;
  const r = 54, circ = 2 * Math.PI * r;
  return (
    <div className="donut-wrap">
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={70} cy={70} r={r} fill="none" stroke="#1a1a26" strokeWidth={18} />
        {data.map((d) => {
          const pct = total ? d.value/total : 0;
          const dash = pct * circ;
          const el = <circle key={d.id} cx={70} cy={70} r={r} fill="none" stroke={d.color} strokeWidth={18}
            strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-offset*circ}
            style={{transition:"stroke-dasharray .6s ease"}} />;
          offset += pct; return el;
        })}
      </svg>
      <div className="donut-center">
        <span style={{fontFamily:"Syne",fontSize:24,fontWeight:700}}>{total}</span>
        <span style={{fontSize:11,color:"var(--muted)"}}>orders</span>
      </div>
    </div>
  );
}

// ─── Edit Menu Item Modal ─────────────────────────────────────────────────────
function EditMenuItemModal({ item, onSave, onClose }) {
  const [name,     setName]     = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [price,    setPrice]    = useState(String(item.price));

  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontFamily:"Syne",fontWeight:800,fontSize:20}}>✏️ Edit Menu Item</div>
          <button className="btn btn-ghost" style={{padding:"6px 12px"}} onClick={onClose}>✕</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:6,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Item Name</div>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Cheesy Burger" />
          </div>
          <div>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:6,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Category</div>
            <input className="input" value={category} onChange={e=>setCategory(e.target.value)} placeholder="e.g. Burger, Snacks, Drink" />
          </div>
          <div>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:6,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Price (₹)</div>
            <input className="input" type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="e.g. 120" />
          </div>
          <div style={{display:"flex",gap:10,marginTop:6}}>
            <button className="btn btn-ghost" style={{flex:1,justifyContent:"center"}} onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" style={{flex:2,justifyContent:"center"}}
              onClick={() => {
                if (!name.trim() || !price) return;
                onSave({...item, name:name.trim(), category:category.trim()||"Other", price:Number(price)});
              }}>
              Save Changes ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── OCR Item Row ─────────────────────────────────────────────────────────────
function OcrItemRow({ item, onAdd, onDismiss }) {
  const [name,     setName]     = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [price,    setPrice]    = useState(String(item.price));
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 90px 70px auto auto",gap:6,alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
      <input className="input" style={{padding:"5px 10px",fontSize:13}} value={name}     onChange={e=>setName(e.target.value)} />
      <input className="input" style={{padding:"5px 10px",fontSize:13}} value={category} onChange={e=>setCategory(e.target.value)} />
      <input className="input" style={{padding:"5px 10px",fontSize:13}} value={price}    onChange={e=>setPrice(e.target.value)} type="number" />
      <button className="btn btn-success" style={{padding:"5px 12px",fontSize:12,whiteSpace:"nowrap"}}
        onClick={()=>onAdd({name:name.trim(),category:category.trim()||"Other",price:Number(price)||0})}>
        + Add
      </button>
      <button className="btn btn-ghost" style={{padding:"5px 8px",fontSize:12}} onClick={onDismiss}>✕</button>
    </div>
  );
}

// ─── Tesseract loader ─────────────────────────────────────────────────────────
let tessReady = false, tessLoading = false;
const tessCbs = [];
function loadTesseract() {
  return new Promise(resolve => {
    if (tessReady) { resolve(); return; }
    tessCbs.push(resolve);
    if (tessLoading) return;
    tessLoading = true;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js";
    s.onload = () => { tessReady = true; tessCbs.forEach(cb => cb()); };
    document.head.appendChild(s);
  });
}

// ─── Image preprocessor ───────────────────────────────────────────────────────
// Upscale → grayscale → percentile contrast stretch → mild unsharp mask
// Returns ONE clean greyscale PNG — no binary thresholding (Tesseract handles that internally)
function preprocessImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.max(1, Math.min(4, 2400 / img.width));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      const ctx = cv.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      const id = ctx.getImageData(0, 0, w, h);
      const d = id.data;

      // Grayscale
      const g = new Uint8Array(w * h);
      for (let i = 0; i < d.length; i += 4)
        g[i>>2] = 0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2];

      // Percentile contrast stretch (2nd–98th, robust to outliers)
      const sorted = g.slice().sort((a,b)=>a-b);
      const lo = sorted[Math.floor(sorted.length * 0.02)];
      const hi = sorted[Math.floor(sorted.length * 0.98)];
      const rng = Math.max(1, hi - lo);
      for (let i = 0; i < g.length; i++)
        g[i] = Math.min(255, Math.max(0, Math.round(((g[i]-lo)/rng)*255)));

      // Unsharp mask (blend strength 0.4 — safe, not over-sharpened)
      const sh = new Uint8Array(w * h);
      for (let y = 1; y < h-1; y++) {
        for (let x = 1; x < w-1; x++) {
          const i = y*w+x;
          const blur = (g[(y-1)*w+x]+g[(y+1)*w+x]+g[y*w+x-1]+g[y*w+x+1]+g[i])/5;
          sh[i] = Math.min(255, Math.max(0, Math.round(g[i]+0.4*(g[i]-blur))));
        }
      }
      for (let x=0;x<w;x++){sh[x]=g[x];sh[(h-1)*w+x]=g[(h-1)*w+x];}
      for (let y=0;y<h;y++){sh[y*w]=g[y*w];sh[y*w+w-1]=g[y*w+w-1];}

      for (let i=0;i<sh.length;i++){d[i*4]=d[i*4+1]=d[i*4+2]=sh[i];d[i*4+3]=255;}
      ctx.putImageData(id, 0, 0);
      resolve(cv.toDataURL("image/png"));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

// Pixel-invert a dataURL (for white-text-on-dark sections like French Fries)
function invertImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement("canvas");
      cv.width = img.width; cv.height = img.height;
      const ctx = cv.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, cv.width, cv.height);
      for (let i=0;i<id.data.length;i+=4){id.data[i]=255-id.data[i];id.data[i+1]=255-id.data[i+1];id.data[i+2]=255-id.data[i+2];}
      ctx.putImageData(id, 0, 0);
      resolve(cv.toDataURL("image/png"));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

// ─── OCR text corrections ─────────────────────────────────────────────────────
function fixOcrText(t) {
  return t
    .replace(/\b0(?=[a-zA-Z])/g, "O")
    .replace(/(?<=[a-zA-Z])0\b/g, "o")
    .replace(/(?<=\d)l(?=\d)/g, "1")
    .replace(/(\d)\s*[|l]\s*-/g, "$1/-")
    .replace(/(\d)\s*\/\s*-/g, "$1/-")
    .replace(/\bVVeg\b/gi, "Veg")
    .replace(/\bPanear\b/gi, "Paneer")
    .replace(/\bMom[o0]\b/gi, "Momo")
    .replace(/\bFri[e3]s\b/gi, "Fries")
    .replace(/\bBuger\b/gi, "Burger")
    .replace(/\bBurqer\b/gi, "Burger")
    .replace(/\bChiken\b/gi, "Chicken")
    .replace(/\bChiopt[eo]l[e3]\b/gi, "Chipotle")
    .replace(/\bP[e3]r[il1]\s+P[e3]r[il1]\b/gi, "Peri Peri")
    .replace(/\bKurku[re][e]?\b/gi, "Kurkure")
    .replace(/\bAfgh[ae]n[il1]\b/gi, "Afghani")
    .replace(/([a-zA-Z])\s*[|_]\s*([a-zA-Z])/g, "$1 $2")
    // Strip ALL-CAPS lines with no price — decorative headers/logos
    .split("\n").map(line => {
      if (!/\d{2,4}/.test(line) && line.length > 3 && line.trim() === line.trim().toUpperCase()) return "";
      return line;
    }).join("\n");
}

// ─── Menu text parser ─────────────────────────────────────────────────────────
// Handles multi-column menus: "Item ... 40/- 70/-" → (Regular) + (Medium)
function parseMenuText(rawText) {
  const lines = rawText.split("\n").map(l => l.trim()).filter(l => l.length > 1);

  // ── Section header tracking ────────────────────────────────────────────────
  // Maps any recognisable header keyword → category name
  const SECTION_MAP = [
    { re: /veg\s+burger|non.?veg\s+burger/i,  cat: "Burger"  },
    { re: /\bburgers?\b/i,                     cat: "Burger"  },
    { re: /veg\s+momo|paneer\s+momo/i,         cat: "Snacks"  },
    { re: /\bmomos?\b/i,                       cat: "Snacks"  },
    { re: /french\s+fries|fries/i,             cat: "Sides"   },
    { re: /\bsides?\b/i,                       cat: "Sides"   },
    { re: /\bpizza\b/i,                        cat: "Pizza"   },
    { re: /\bpasta\b/i,                        cat: "Pasta"   },
    { re: /\bstarters?\b/i,                    cat: "Starter" },
    { re: /\bmains?\b/i,                       cat: "Main"    },
    { re: /\bdrinks?\b|\bbeverages?\b/i,       cat: "Drink"   },
    { re: /\bdesserts?\b/i,                    cat: "Dessert" },
    { re: /\bbreads?\b/i,                      cat: "Bread"   },
    { re: /\brice\b|\bbiryani\b/i,             cat: "Rice"    },
    { re: /\bnon.?veg\b/i,                     cat: "Non-Veg" },
    { re: /\bsnacks?\b/i,                      cat: "Snacks"  },
  ];
  let sectionCat = null;

  const getSectionCat = (line) => {
    // Strip prices and noise, keep only letters/spaces
    const clean = line.replace(/[\d₹\/\-\.\|_•*]/g, " ").trim();
    for (const { re, cat } of SECTION_MAP)
      if (re.test(clean)) return cat;
    return null;
  };

  // A line is a section header if it has no prices OR it's a short all-caps/bold label
  // (Tesseract often reads "VEG BURGERS Meal" as one line — we treat it as a header
  //  by checking if the FIRST part matches a section keyword even if prices follow)
  const isSectionHeader = (line) => {
    // Has prices → only treat as header if the non-price part alone matches a section
    const withoutPrices = line.replace(/(?:₹|Rs\.?\s*)?\d{2,4}(?:\.\d{0,2})?\s*(?:\/-)?\s*/g, "").trim();
    if (withoutPrices.length < 2) return false;
    const cat = getSectionCat(withoutPrices);
    if (!cat) return false;
    // If the line has prices but the text part is very short (just a header label), accept it
    const hasPrices = /\d{2,4}/.test(line);
    if (hasPrices) {
      // Only treat as header if the text part is short — e.g. "VEG BURGERS Meal" (no item name)
      return withoutPrices.split(/\s+/).length <= 4;
    }
    return true;
  };

  // ── Column label detection ─────────────────────────────────────────────────
  const full = lines.join(" ");
  let colLabels = null;
  const LABEL_PATTERNS = [
    { re:/\bhalf\b.{0,20}\bfull\b/i,                    labels:["Regular","Medium"] },
    { re:/\bsmall\b.{0,20}\bmedium\b.{0,20}\blarge\b/i, labels:["Small","Medium","Large"] },
    { re:/\bregular\b.{0,20}\bmedium\b.{0,20}\blarge\b/i,labels:["Regular","Medium","Large"] },
    { re:/\bsmall\b.{0,20}\blarge\b/i,                  labels:["Small","Large"] },
    { re:/\bregular\b.{0,20}\blarge\b/i,                labels:["Regular","Large"] },
    { re:/\bmini\b.{0,20}\bfull\b/i,                    labels:["Mini","Full"] },
    { re:/\bregular\b.{0,20}\bmeal\b/i,                 labels:["Regular","Meal"] },
    { re:/\bsingle\b.{0,20}\bdouble\b/i,                labels:["Single","Double"] },
  ];
  for (const p of LABEL_PATTERNS) { if (p.re.test(full)) { colLabels = p.labels; break; } }

  // ── Category guesser — item name fallback when no section is active ────────
  // IMPORTANT: check burger/fries/momo BEFORE paneer/chicken so that
  // "Paneer Cheese Burger" → Burger, not Main
  const guessCategory = (name) => {
    if (sectionCat) return sectionCat;
    const n = name.toLowerCase();
    if (/burger|sandwich|wrap/i.test(n))                              return "Burger";
    if (/\bfries\b|wedges|nugget/i.test(n))                          return "Sides";
    if (/momo|dumpling/i.test(n))                                    return "Snacks";
    if (/pizza/i.test(n))                                            return "Pizza";
    if (/pasta|noodle|maggi/i.test(n))                               return "Pasta";
    if (/\brice\b|biryani|pulao/i.test(n))                           return "Rice";
    if (/naan|roti|paratha/i.test(n))                                return "Bread";
    if (/lassi|chai|\btea\b|coffee|juice|\bsoda\b|shake|mojito/i.test(n)) return "Drink";
    if (/gulab|kulfi|halwa|ice.?cream|dessert/i.test(n))             return "Dessert";
    if (/soup|salad|raita/i.test(n))                                 return "Starter";
    if (/chicken|mutton|fish|prawn|lamb|kebab|tikka|tandoor/i.test(n)) return "Non-Veg";
    if (/paneer|tofu|dal|palak|aloo|gobi|mushroom|rajma/i.test(n))  return "Main";
    return "Main";
  };

  // ── Food word whitelist — always trust names containing these ─────────────
  const FOOD_WORDS = /^(veg|paneer|chicken|momo|burger|fries|pizza|pasta|naan|roti|rice|biryani|lassi|chai|tea|coffee|juice|steam|fried|afghani|kurkure|chipotle|simply|classic|cheesy|salted|peri|just|cheese|tikka|tandoor|kebab|masala|wrap|sandwich|curry|dal|palak|aloo|gobi|mushroom|gulab|kulfi|halwa|shake|soda|soup|salad|special|combo)$/i;

  // ── Noise detector — rejects OCR garbage ──────────────────────────────────
  const isNoise = (str) => {
    const words = str.trim().split(/\s+/);
    // Whitelist: trust if any food word present
    if (words.some(w => FOOD_WORDS.test(w))) return false;
    // Single-letter non-articles
    if (words.some(w => w.length===1 && !/^[aAiI&]$/.test(w))) return true;
    // 2+ tiny fragments
    const tiny = words.filter(w => w.length<=2 && !/^(a|I|or|of|on|in|&|kg|pc|ml)$/i.test(w));
    if (tiny.length >= 2) return true;
    // Word with zero vowels (OCR artifact like "Ps", "fs")
    if (words.some(w => w.length>=2 && !/[aeiouAEIOU]/.test(w))) return true;
    // Long uppercase run = logo text
    if (/[A-Z]{6,}/.test(str.replace(/\s/g,""))) return true;
    // All words very short
    if (words.every(w => w.length<=3) && words.length>=2) return true;
    // Too many words for a menu item name
    if (words.length > 7) return true;
    return false;
  };

  const SKIP_LINE = /^(menu|half|full|regular|large|small|medium|meal|size|price|item|name|category|qty|tax|total|subtotal|gst|note|chef|welcome|call|order|contact|phone|address|email|www|http)$/i;

  // Price regex
  const PRICE_RE = /(?:₹|Rs\.?\s*)?(\d{2,4})(?:\.\d{0,2})?\s*(?:\/-)?/g;

  const results = [];

  for (const line of lines) {
    // Always check if this line sets a new section — even if it also has prices
    // e.g. "VEG MOMOS Half Full" or "French Fries Half Full" sets sectionCat
    const possibleSection = getSectionCat(line.replace(/[\d₹\/\-\.]/g," "));
    if (possibleSection) sectionCat = possibleSection;

    // If it's purely a header (no real item name + price), skip it
    if (isSectionHeader(line)) continue;

    // Extract prices
    const prices = [];
    let m; const re = new RegExp(PRICE_RE.source, "g");
    while ((m = re.exec(line)) !== null) {
      const p = parseInt(m[1]);
      if (p >= 20 && p <= 3000) prices.push({ val:p, idx:m.index });
    }
    if (prices.length === 0) continue;

    // Extract name
    let name = line.slice(0, prices[0].idx).trim()
      .replace(/^[\d.\-–•*+|\\]+\s*/,"").trim()
      .replace(/[\.\-–_\s]+$/,"").trim()
      .replace(/^[^a-zA-Z]+/,"").trim();

    if (name.length < 3) continue;
    if (SKIP_LINE.test(name.trim())) continue;
    if (isNoise(name)) continue;
    if (!/[a-zA-Z]{2,}/.test(name)) continue;

    if (prices.length === 1) {
      if (!results.find(r => r.name.toLowerCase() === name.toLowerCase()))
        results.push({ name, category:guessCategory(name), price:prices[0].val });
    } else {
      const labels = colLabels || prices.map((_,i)=>["Regular","Medium","Large","XL"][i]||`Size ${i+1}`);
      prices.forEach((p, i) => {
        const fullName = `${name} (${labels[i]||`Size ${i+1}`})`;
        if (!results.find(r => r.name.toLowerCase() === fullName.toLowerCase()))
          results.push({ name:fullName, category:guessCategory(name), price:p.val });
      });
    }
  }
  return results;
}

// ─── Page: Take Order ─────────────────────────────────────────────────────────
function TakeOrderPage({ menu, orders, setOrders, toast }) {
  const [customerType, setCustomerType] = useState("family");
  const [tableNum,     setTableNum]     = useState("");
  const [search,       setSearch]       = useState("");
  const [cart,         setCart]         = useState([]);
  const [isRecording,  setIsRecording]  = useState(false);
  const [transcript,   setTranscript]   = useState("");
  const [note,         setNote]         = useState("");

  const recognitionRef = useRef(null);

  const activeOrders  = orders.filter(o => o.status === "active");
  const recentOrders  = orders.filter(o => o.status === "finished");

  const filtered = menu.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase()));

  const addItem = useCallback((item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      return ex ? prev.map(c => c.id===item.id ? {...c, qty:c.qty+1} : c)
                : [...prev, {...item, qty:1}];
    });
  }, []);

  const removeItem = (id) =>
    setCart(prev => prev.map(c => c.id===id ? {...c, qty:c.qty-1} : c).filter(c => c.qty>0));

  const cartTotal = cart.reduce((s,c) => s+c.price*c.qty, 0);

  const placeOrder = () => {
    if (!cart.length) return;
    const order = {id:generateId(), table:tableNum||"—", customerType, items:[...cart], total:cartTotal, note, status:"active", ts:Date.now()};
    const updated = [order, ...orders];
    setOrders(updated); DB.set("orders", updated);
    setCart([]); setNote(""); setTableNum("");
    toast("Order placed successfully!");
  };

  const finishOrder = (id) => {
    const updated = orders.map(o => o.id===id ? {...o, status:"finished", finishedAt:Date.now()} : o);
    setOrders(updated); DB.set("orders", updated);
    toast("Order marked as finished!");
  };

  // ── Voice — exact original implementation ────────────────────────────────
  const toggleMic = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast("Speech recognition not supported in this browser");
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Rec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";
    rec.onresult = (e) => {
      const t = Array.from(e.results).map((r) => r[0].transcript).join(" ");
      setTranscript(t);
      menu.forEach((item) => {
        if (t.toLowerCase().includes(item.name.toLowerCase())) {
          addItem(item);
        }
      });
    };
    rec.onend = () => setIsRecording(false);
    rec.start();
    recognitionRef.current = rec;
    setIsRecording(true);
  };

  const categories = [...new Set(menu.map(m => m.category))];

  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:20,height:"calc(100vh - 80px)",overflow:"hidden"}}>
      {/* Left */}
      <div style={{overflowY:"auto",paddingRight:4}}>
        {/* Customer + table */}
        <div className="card fade-up" style={{marginBottom:16}}>
          <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:12,color:"var(--muted)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Customer Type</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {CUSTOMER_TYPES.map(ct => (
                  <button key={ct.id} className={`chip ${customerType===ct.id?"active":""}`}
                    onClick={()=>setCustomerType(ct.id)}
                    style={customerType===ct.id?{borderColor:ct.color,background:ct.color+"18",color:ct.color}:{}}>
                    {ct.emoji} {ct.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{width:140}}>
              <div style={{fontSize:12,color:"var(--muted)",marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em"}}>Table No.</div>
              <input className="input" placeholder="e.g. T-04" value={tableNum} onChange={e=>setTableNum(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Voice + Search */}
        <div style={{display:"flex",gap:12,marginBottom:16,alignItems:"center"}}>
          <button className={`mic-btn ${isRecording?"recording":"idle"}`} onClick={toggleMic} title={isRecording?"Stop recording":"Voice order"}>
            🎙️
          </button>
          <div style={{flex:1}}>
            <input className="input" placeholder="Search menu items…" value={search} onChange={e=>setSearch(e.target.value)} />
            {isRecording && (
              <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8}}>
                <div className="rec-dot" />
                <span style={{fontSize:13,color:"var(--muted)"}}>{transcript || "Listening for items…"}</span>
              </div>
            )}
          </div>
        </div>

        {/* Menu grid */}
        {menu.length === 0 ? (
          <div style={{textAlign:"center",padding:"40px 0",color:"var(--muted)"}}>
            <div style={{fontSize:40,marginBottom:12}}>📋</div>
            <div style={{fontSize:16,fontWeight:600,marginBottom:8}}>No menu items yet</div>
            <div style={{fontSize:13}}>Go to the Menu tab to add items via camera or manually</div>
          </div>
        ) : (
          categories.filter(cat => filtered.some(m => m.category===cat)).map(cat => (
            <div key={cat} style={{marginBottom:20}}>
              <div style={{fontSize:12,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>{cat}</div>
              <div className="grid-2" style={{gap:10}}>
                {filtered.filter(m => m.category===cat).map(item => {
                  const inCart = cart.find(c => c.id===item.id);
                  return (
                    <div key={item.id} className="order-card card-hover" style={{cursor:"pointer"}} onClick={()=>addItem(item)}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <div>
                          <div style={{fontWeight:500,fontSize:14,marginBottom:4}}>{item.name}</div>
                          <div style={{fontSize:15,fontFamily:"Syne",fontWeight:700,color:"var(--accent)"}}>{fmt(item.price)}</div>
                        </div>
                        {inCart && (
                          <div style={{background:"var(--accent)",color:"#fff",borderRadius:"50%",width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>
                            {inCart.qty}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Active + Finished orders */}
        <div className="orders-columns" style={{marginTop:10}}>
          <div>
            <div className="col-header">
              <div className="col-dot" style={{background:"var(--accent)"}} />
              <span style={{fontFamily:"Syne",fontWeight:700,fontSize:15}}>Current Orders</span>
              <span className="badge" style={{background:"#ff6b3520",color:"var(--accent)",marginLeft:4}}>{activeOrders.length}</span>
            </div>
            {activeOrders.length === 0
              ? <div style={{padding:"20px 0",color:"var(--muted)",fontSize:13,textAlign:"center"}}>No active orders</div>
              : <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {activeOrders.map(o => {
                    const ct = CUSTOMER_TYPES.find(c => c.id===o.customerType);
                    return (
                      <div key={o.id} className="order-card active-order-card">
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <span style={{fontFamily:"Syne",fontWeight:800,fontSize:15,color:"var(--accent)"}}>🪑 {o.table}</span>
                            <span className="badge" style={{background:ct.color+"20",color:ct.color}}>{ct.emoji} {ct.label}</span>
                          </div>
                          <span style={{fontSize:11,color:"var(--muted)"}}>{fmtDate(o.ts)}</span>
                        </div>
                        <div style={{fontSize:13,color:"var(--muted)",marginBottom:10}}>{o.items.map(it=>`${it.name} ×${it.qty}`).join(", ")}</div>
                        {o.note && <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic",marginBottom:10}}>📝 {o.note}</div>}
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{fontFamily:"Syne",fontWeight:800,fontSize:16,color:"var(--accent3)"}}>{fmt(o.total)}</span>
                          <button className="btn btn-finish" style={{padding:"6px 14px",fontSize:12}} onClick={()=>finishOrder(o.id)}>✓ Finished</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
            }
          </div>
          <div>
            <div className="col-header">
              <div className="col-dot" style={{background:"var(--accent3)"}} />
              <span style={{fontFamily:"Syne",fontWeight:700,fontSize:15}}>Recent Orders</span>
              <span className="badge" style={{background:"#06d6a020",color:"var(--accent3)",marginLeft:4}}>{recentOrders.length}</span>
            </div>
            {recentOrders.length === 0
              ? <div style={{padding:"20px 0",color:"var(--muted)",fontSize:13,textAlign:"center"}}>No finished orders yet</div>
              : <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {recentOrders.map(o => {
                    const ct = CUSTOMER_TYPES.find(c => c.id===o.customerType);
                    return (
                      <div key={o.id} className="order-card finished-order-card">
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <span style={{fontFamily:"Syne",fontWeight:800,fontSize:14,color:"var(--accent3)"}}>✓ {o.table}</span>
                            <span className="badge" style={{background:ct.color+"20",color:ct.color}}>{ct.emoji}</span>
                          </div>
                          <span style={{fontSize:11,color:"var(--muted)"}}>Done {fmtDate(o.finishedAt||o.ts)}</span>
                        </div>
                        <div style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>{o.items.map(it=>`${it.name} ×${it.qty}`).join(", ")}</div>
                        <div style={{fontFamily:"Syne",fontWeight:700,fontSize:15,color:"var(--accent3)"}}>{fmt(o.total)}</div>
                      </div>
                    );
                  })}
                </div>
            }
          </div>
        </div>
      </div>

      {/* Right: Cart */}
      <div style={{display:"flex",flexDirection:"column",gap:12,overflowY:"auto"}}>
        <div className="card" style={{flex:1,display:"flex",flexDirection:"column"}}>
          <div style={{fontFamily:"Syne",fontWeight:700,fontSize:18,marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            Order Cart
            {cart.length>0 && <span style={{fontSize:12,background:"var(--accent)",color:"#fff",borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center"}}>{cart.reduce((s,c)=>s+c.qty,0)}</span>}
          </div>
          {cart.length===0
            ? <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",color:"var(--muted)",gap:10}}>
                <span style={{fontSize:40}}>🍽️</span>
                <span style={{fontSize:14}}>Tap items or use voice</span>
              </div>
            : <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:8}}>
                {cart.map(item => (
                  <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:"1px solid var(--border)"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:500}}>{item.name}</div>
                      <div style={{fontSize:13,color:"var(--muted)"}}>{fmt(item.price)} × {item.qty}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button className="btn btn-ghost" style={{padding:"4px 10px",fontSize:16}} onClick={()=>removeItem(item.id)}>−</button>
                      <span style={{fontWeight:700,fontSize:14,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                      <button className="btn btn-ghost" style={{padding:"4px 10px",fontSize:16}} onClick={()=>addItem(item)}>+</button>
                    </div>
                    <div style={{fontWeight:700,fontSize:14,minWidth:60,textAlign:"right"}}>{fmt(item.price*item.qty)}</div>
                  </div>
                ))}
              </div>
          }
          {cart.length>0 && (
            <div style={{borderTop:"1px solid var(--border)",paddingTop:16,marginTop:8}}>
              <input className="input" placeholder="Note (e.g. no spice)…" value={note} onChange={e=>setNote(e.target.value)} style={{marginBottom:12}} />
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <span style={{color:"var(--muted)",fontSize:14}}>Total</span>
                <span style={{fontFamily:"Syne",fontWeight:800,fontSize:22,color:"var(--accent)"}}>{fmt(cartTotal)}</span>
              </div>
              <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",padding:"13px",fontSize:15,fontWeight:600}} onClick={placeOrder}>
                Place Order →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page: Sales ──────────────────────────────────────────────────────────────
function SalesPage({ orders }) {
  const totalRevenue = orders.reduce((s,o) => s+o.total, 0);
  const avgOrder = orders.length ? Math.round(totalRevenue/orders.length) : 0;
  const custData = CUSTOMER_TYPES.map(ct => ({...ct, value:orders.filter(o => o.customerType===ct.id).length}));
  const itemCounts = {};
  orders.forEach(o => o.items.forEach(it => {
    itemCounts[it.name] = itemCounts[it.name] || {count:0,rev:0};
    itemCounts[it.name].count += it.qty; itemCounts[it.name].rev += it.price*it.qty;
  }));
  const bestSellers = Object.entries(itemCounts).sort((a,b)=>b[1].count-a[1].count).slice(0,8).map(([name,d])=>({name,...d}));
  const maxCount = bestSellers[0]?.count || 1;
  const now = Date.now();
  const hours = Array.from({length:12}, (_,i) => {
    const h = new Date(now - (11-i)*3600000);
    const rev = orders.filter(o => new Date(o.ts).getHours()===h.getHours()).reduce((s,o)=>s+o.total,0);
    return {label:h.getHours()+":00", rev};
  });
  const maxRev = Math.max(...hours.map(h=>h.rev), 1);
  return (
    <div style={{overflowY:"auto",height:"calc(100vh - 80px)",paddingRight:4}}>
      <div className="grid-4 fade-up" style={{marginBottom:20}}>
        {[
          {label:"Today's Revenue", value:fmt(totalRevenue), icon:"💰", color:"var(--accent)"},
          {label:"Total Orders",    value:orders.length,     icon:"🧾", color:"var(--accent2)"},
          {label:"Avg Order Value", value:fmt(avgOrder),     icon:"📊", color:"var(--accent3)"},
          {label:"Active Tables",   value:[...new Set(orders.map(o=>o.table))].length, icon:"🪑", color:"var(--accent4)"},
        ].map(kpi => (
          <div key={kpi.label} className="stat card-hover">
            <div style={{fontSize:28,marginBottom:10}}>{kpi.icon}</div>
            <div style={{fontFamily:"Syne",fontSize:26,fontWeight:800,color:kpi.color}}>{kpi.value}</div>
            <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>{kpi.label}</div>
          </div>
        ))}
      </div>
      <div className="grid-2" style={{marginBottom:20}}>
        <div className="card">
          <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:20}}>Customer Breakdown</div>
          <DonutChart data={custData} total={orders.length} />
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:20}}>
            {custData.map(ct => (
              <div key={ct.id} style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:16}}>{ct.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4,fontSize:13}}>
                    <span>{ct.label}</span><span style={{color:ct.color,fontWeight:700}}>{ct.value}</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{width:`${orders.length?(ct.value/orders.length)*100:0}%`,background:ct.color}} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:20}}>Revenue Timeline</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:140}}>
            {hours.map(h => (
              <div key={h.label} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4,height:"100%"}}>
                <div style={{flex:1,width:"100%",display:"flex",alignItems:"flex-end"}}>
                  <div style={{width:"100%",background:h.rev>0?"var(--accent)":"var(--surface2)",borderRadius:"4px 4px 0 0",height:`${(h.rev/maxRev)*100}%`,minHeight:h.rev>0?4:0,transition:"height .6s ease"}} />
                </div>
                <span style={{fontSize:10,color:"var(--muted)",whiteSpace:"nowrap"}}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{marginBottom:20}}>
        <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:16}}>🏆 Best Sellers</div>
        {bestSellers.length === 0
          ? <div style={{color:"var(--muted)",fontSize:14}}>No sales data yet</div>
          : <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {bestSellers.map((item,i) => (
                <div key={item.name} style={{display:"flex",alignItems:"center",gap:14}}>
                  <span style={{fontFamily:"Syne",fontWeight:800,fontSize:20,color:i===0?"var(--accent2)":"var(--muted)",minWidth:28}}>#{i+1}</span>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:14}}>
                      <span style={{fontWeight:500}}>{item.name}</span>
                      <span style={{color:"var(--muted)"}}>{item.count} sold · {fmt(item.rev)}</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{width:`${(item.count/maxCount)*100}%`,background:i===0?"var(--accent2)":"var(--accent)"}} /></div>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
      <div className="card">
        <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:16}}>All Orders</div>
        <div style={{overflowX:"auto"}}>
          <table className="table">
            <thead><tr><th>ID</th><th>Table</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {orders.length===0
                ? <tr><td colSpan={7} style={{textAlign:"center",color:"var(--muted)",padding:24}}>No orders yet</td></tr>
                : orders.map(o => {
                    const ct = CUSTOMER_TYPES.find(c=>c.id===o.customerType);
                    return (
                      <tr key={o.id}>
                        <td style={{fontFamily:"monospace",fontSize:12,color:"var(--muted)"}}>#{o.id}</td>
                        <td style={{fontWeight:600}}>{o.table}</td>
                        <td><span className="badge" style={{background:ct.color+"18",color:ct.color}}>{ct.emoji} {ct.label}</span></td>
                        <td style={{color:"var(--muted)",fontSize:13}}>{o.items.map(it=>`${it.name} ×${it.qty}`).join(", ")}</td>
                        <td style={{fontWeight:700,color:"var(--accent3)"}}>{fmt(o.total)}</td>
                        <td><span className="badge" style={{background:o.status==="finished"?"#06d6a020":"#ff6b3520",color:o.status==="finished"?"var(--accent3)":"var(--accent)"}}>{o.status==="finished"?"✓ Done":"● Active"}</span></td>
                        <td style={{color:"var(--muted)",fontSize:13}}>{fmtDate(o.ts)}</td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Menu Manager ───────────────────────────────────────────────────────
function MenuPage({ menu, setMenu, toast }) {
  // Persist media items across sessions
  const [mediaItems, setMediaItems] = useState(() =>
    DB.get("mediaItems", []).map(m => ({...m, ocrDone:true}))
  );
  const [showCam,    setShowCam]    = useState(false);
  const [camStream,  setCamStream]  = useState(null);
  const [flashOn,    setFlashOn]    = useState(false);
  const [drag,       setDrag]       = useState(false);
  const [ocrItems,   setOcrItems]   = useState([]);
  const [ocrRawText, setOcrRawText] = useState("");
  const [showRaw,    setShowRaw]    = useState(false);
  const [form,       setForm]       = useState({name:"",category:"",price:""});
  const [editingItem,setEditingItem]= useState(null);   // ← edit modal

  const videoRef    = useRef(null);
  const imgInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Save media whenever it changes (strip rawText to keep localStorage small)
  useEffect(() => {
    DB.set("mediaItems", mediaItems.map(({rawText,...r}) => r));
  }, [mediaItems]);

  // ── OCR ──────────────────────────────────────────────────────────────────
  const runOCR = async (id, imageSrc) => {
    await loadTesseract();
    const {createWorker} = window.Tesseract;

    let processed = imageSrc;
    try { processed = await preprocessImage(imageSrc); } catch {}

    const worker = await createWorker("eng", 1, {logger:()=>{}});
    const params = {
      tessedit_pageseg_mode: "6",
      tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\u20b9/-.,()'& ",
      preserve_interword_spaces: "1",
    };

    let primary = "", fallback = "";
    try {
      await worker.setParameters(params);
      primary = (await worker.recognize(processed)).data.text;

      // Only run inverted pass if primary found few price patterns
      // (catches white-text-on-dark-photo sections like French Fries)
      const priceHits = (primary.match(/\d{2,4}\s*\/-/g)||[]).length;
      if (priceHits < 3) {
        const inv = await invertImage(processed);
        fallback = (await worker.recognize(inv)).data.text;
      }
    } catch {
      toast("OCR failed — try better lighting");
    } finally {
      await worker.terminate();
    }

    // Pick the richer result, line-merge the other
    const countP = t => (t.match(/\d{2,4}\s*\/-/g)||[]).length;
    const [best, other] = countP(primary) >= countP(fallback)
      ? [fixOcrText(primary), fixOcrText(fallback)]
      : [fixOcrText(fallback), fixOcrText(primary)];

    const bestLines  = best.split("\n").map(l=>l.trim()).filter(Boolean);
    const otherLines = other.split("\n").map(l=>l.trim()).filter(Boolean);
    const seen = new Set(bestLines.map(l=>l.toLowerCase()));
    const merged = [...bestLines, ...otherLines.filter(l=>!seen.has(l.toLowerCase()))].join("\n");

    setMediaItems(prev => prev.map(m => m.id===id ? {...m, ocrDone:true, rawText:best} : m));
    setOcrRawText(prev => prev + (prev?"\n\n--- scan ---\n\n":"") + best);

    const parsed = parseMenuText(merged);
    if (parsed.length === 0) {
      toast("No items found — check lighting, avoid glare, keep menu flat");
    } else {
      setOcrItems(prev => {
        const existing = new Set(prev.map(i=>i.name.toLowerCase()));
        return [...prev, ...parsed.filter(p=>!existing.has(p.name.toLowerCase()))];
      });
      toast(`✓ OCR found ${parsed.length} item${parsed.length>1?"s":""} — review & edit below`);
    }
  };

  const addMedia = (type, src, name) => {
    const id = generateId();
    setMediaItems(prev => [...prev, {id, type, src, name, ocrDone:false, ts:Date.now()}]);
    if (type==="image" && src) runOCR(id, src);
    else {
      setTimeout(() => {
        setMediaItems(prev => prev.map(m => m.id===id ? {...m, ocrDone:true} : m));
        toast("PDF uploaded — export pages as images for OCR");
      }, 1000);
    }
  };

  const removeMedia = (id) => setMediaItems(prev => prev.filter(m => m.id!==id));

  const handleImageFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = e => addMedia("image", e.target.result, file.name);
      reader.readAsDataURL(file);
    });
    if (files.length) toast(`${files.length} image(s) queued for OCR`);
  };

  const handlePdfFiles = (files) => {
    Array.from(files).forEach(file => addMedia("pdf", null, file.name));
    if (files.length) toast(`${files.length} PDF(s) uploaded`);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    const imgs = Array.from(e.dataTransfer.files).filter(f=>f.type.startsWith("image/"));
    const pdfs = Array.from(e.dataTransfer.files).filter(f=>f.type==="application/pdf"||f.name.endsWith(".pdf"));
    if (imgs.length) handleImageFiles(imgs);
    if (pdfs.length) handlePdfFiles(pdfs);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video:{facingMode:"environment",width:{ideal:1920},height:{ideal:1080}}
      });
      setCamStream(stream); setShowCam(true);
      setTimeout(()=>{ if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch { toast("Camera access denied"); }
  };

  const capturePhoto = () => {
    const cv = document.createElement("canvas");
    cv.width = videoRef.current.videoWidth; cv.height = videoRef.current.videoHeight;
    cv.getContext("2d").drawImage(videoRef.current, 0, 0);
    setFlashOn(true); setTimeout(()=>setFlashOn(false), 400);
    addMedia("image", cv.toDataURL("image/jpeg", 0.95), `capture_${Date.now()}.jpg`);
    toast("Photo captured — OCR scanning…");
  };

  const closeCamera = () => {
    camStream?.getTracks().forEach(t=>t.stop());
    setCamStream(null); setShowCam(false);
  };

  const addMenuItem = () => {
    if (!form.name || !form.price) return;
    const updated = [...menu, {id:Date.now(), name:form.name, category:form.category||"Other", price:Number(form.price)}];
    setMenu(updated); DB.set("menu", updated);
    setForm({name:"",category:"",price:""});
    toast("Menu item added!");
  };

  const removeMenuItem = (id) => {
    const updated = menu.filter(m => m.id!==id);
    setMenu(updated); DB.set("menu", updated);
  };

  const saveEditedItem = (updated) => {
    const newMenu = menu.map(m => m.id===updated.id ? updated : m);
    setMenu(newMenu); DB.set("menu", newMenu);
    setEditingItem(null);
    toast(`"${updated.name}" updated!`);
  };

  return (
    <>
      {editingItem && <EditMenuItemModal item={editingItem} onSave={saveEditedItem} onClose={()=>setEditingItem(null)} />}

      <div style={{overflowY:"auto",height:"calc(100vh - 80px)"}}>
        <div className="grid-2" style={{marginBottom:20}}>

          {/* Upload / Camera */}
          <div className="card">
            <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
              📋 Upload Menu
              <span className="ocr-pill">🔬 OCR</span>
            </div>

            {showCam ? (
              <div style={{position:"relative",borderRadius:12,overflow:"hidden",marginBottom:12,background:"#000"}}>
                <video ref={videoRef} autoPlay playsInline style={{width:"100%",display:"block",borderRadius:12}} />
                {flashOn && <div className="cam-flash" />}
                <div style={{position:"absolute",bottom:14,left:0,right:0,display:"flex",justifyContent:"center",gap:10}}>
                  <button className="btn btn-primary" onClick={capturePhoto}>📷 Capture</button>
                  <button onClick={closeCamera} style={{background:"#000000aa",border:"none",color:"#fff",borderRadius:10,padding:"10px 16px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>✕ Done</button>
                </div>
              </div>
            ) : (
              <div className={`drop-zone ${drag?"drag":""}`}
                onDragOver={e=>{e.preventDefault();setDrag(true);}}
                onDragLeave={()=>setDrag(false)}
                onDrop={handleDrop}
                onClick={()=>imgInputRef.current.click()}>
                <input ref={imgInputRef} type="file" accept="image/*" multiple hidden onChange={e=>handleImageFiles(e.target.files)} />
                <div style={{fontSize:40,marginBottom:10}}>🖼️</div>
                <div style={{fontWeight:600,marginBottom:4}}>Drop menu photos here</div>
                <div style={{fontSize:12,color:"var(--muted)"}}>Multiple images · drag & drop or click · OCR detects prices</div>
              </div>
            )}

            <div style={{display:"flex",gap:8,marginTop:12,flexWrap:"wrap"}}>
              <button className="btn btn-secondary" style={{flex:1}} onClick={showCam ? closeCamera : openCamera}>
                {showCam ? "✕ Close Camera" : "📷 Camera"}
              </button>
              <button className="btn btn-secondary" style={{flex:1}} onClick={()=>pdfInputRef.current.click()}>
                📄 Upload PDF
              </button>
              <input ref={pdfInputRef} type="file" accept=".pdf,application/pdf" multiple hidden onChange={e=>handlePdfFiles(e.target.files)} />
            </div>

            {/* ── Recent Uploads — always visible, persists across sessions ── */}
            <div style={{marginTop:16,borderTop:"1px solid var(--border)",paddingTop:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{fontSize:11,color:"var(--muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em"}}>
                  🕓 Recent Uploads {mediaItems.length>0 && `(${mediaItems.length})`}
                </div>
                {mediaItems.length>0 && (
                  <button className="btn btn-ghost" style={{padding:"2px 10px",fontSize:11}}
                    onClick={()=>{setMediaItems([]);setOcrItems([]);setOcrRawText("");}}>
                    🗑 Clear all
                  </button>
                )}
              </div>
              {mediaItems.length===0
                ? <div style={{textAlign:"center",padding:"16px 0",color:"var(--muted)",fontSize:13}}>
                    <div style={{fontSize:28,marginBottom:6}}>📂</div>
                    Photos & PDFs will appear here
                  </div>
                : <div className="media-gallery">
                    {mediaItems.map(m => (
                      <div key={m.id} className="media-thumb">
                        {m.type==="image"
                          ? <img src={m.src} alt="menu scan" style={{width:"100%",height:"100%",objectFit:"cover"}} />
                          : <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,padding:8,fontSize:10,color:"var(--accent3)"}}>
                              <span style={{fontSize:26}}>📄</span>
                              <span style={{wordBreak:"break-all",textAlign:"center"}}>{m.name.slice(0,18)}</span>
                            </div>
                        }
                        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"3px 6px",background:m.ocrDone?"#06d6a0cc":"#000000cc",fontSize:9,textAlign:"center",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
                          {m.ocrDone ? "✓ Done" : <><div style={{width:7,height:7,border:"1.5px solid #fff",borderTopColor:"transparent",borderRadius:"50%",animation:"spin .6s linear infinite"}} /> Scanning…</>}
                        </div>
                        {m.ts && <div style={{position:"absolute",top:4,left:4,background:"#000000bb",borderRadius:4,padding:"1px 5px",fontSize:9,color:"#ffffffcc"}}>{new Date(m.ts).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}</div>}
                        <button className="remove-btn" onClick={()=>removeMedia(m.id)}>✕</button>
                      </div>
                    ))}
                    <button className="media-add-btn" onClick={()=>imgInputRef.current.click()}>
                      <span style={{fontSize:22}}>＋</span>
                      <span style={{fontSize:10}}>Add photo</span>
                    </button>
                  </div>
              }
            </div>

            {/* OCR results */}
            {ocrItems.length>0 && (
              <div style={{marginTop:14,borderTop:"1px solid var(--border)",paddingTop:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:12,fontWeight:700,color:"var(--accent4)",textTransform:"uppercase",letterSpacing:".06em"}}>
                    🔬 OCR Detected ({ocrItems.length}) — edit & add
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn btn-ghost" style={{padding:"3px 10px",fontSize:11}} onClick={()=>setShowRaw(v=>!v)}>
                      {showRaw?"Hide":"Raw text"}
                    </button>
                    <button className="btn btn-success" style={{padding:"3px 10px",fontSize:11}} onClick={()=>{
                      const newMenu = [...menu, ...ocrItems.map(item=>({...item,id:Date.now()+Math.random()}))];
                      setMenu(newMenu); DB.set("menu", newMenu);
                      setOcrItems([]);
                      toast("All items added to menu!");
                    }}>+ Add All</button>
                  </div>
                </div>
                {showRaw && (
                  <textarea readOnly value={ocrRawText}
                    style={{width:"100%",height:120,background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:8,color:"var(--muted)",fontSize:11,fontFamily:"monospace",padding:10,marginBottom:10,resize:"vertical"}} />
                )}
                {ocrItems.map((item,i) => (
                  <OcrItemRow key={i} item={item}
                    onAdd={(edited)=>{
                      const newMenu = [...menu, {...edited,id:Date.now()}];
                      setMenu(newMenu); DB.set("menu", newMenu);
                      setOcrItems(prev=>prev.filter((_,j)=>j!==i));
                      toast(`"${edited.name}" added!`);
                    }}
                    onDismiss={()=>setOcrItems(prev=>prev.filter((_,j)=>j!==i))}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Manual add */}
          <div className="card">
            <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:16}}>➕ Add Menu Item</div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <input className="input" placeholder="Item name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
              <input className="input" placeholder="Category (e.g. Burger, Snacks)" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
              <input className="input" placeholder="Price (₹)" type="number" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
              <button className="btn btn-primary" style={{justifyContent:"center"}} onClick={addMenuItem}>Add to Menu</button>
            </div>
          </div>
        </div>

        {/* Menu table with Edit + Remove */}
        <div className="card">
          <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:16}}>
            Current Menu <span style={{fontSize:14,color:"var(--muted)",fontFamily:"DM Sans",fontWeight:400}}>({menu.length} items)</span>
          </div>
          {menu.length === 0
            ? <div style={{textAlign:"center",padding:"32px 0",color:"var(--muted)"}}>
                <div style={{fontSize:32,marginBottom:8}}>🍽️</div>
                <div style={{fontSize:14}}>No items yet — upload a menu photo or add manually above</div>
              </div>
            : <table className="table">
                <thead><tr><th>Name</th><th>Category</th><th>Price</th><th style={{textAlign:"right"}}>Actions</th></tr></thead>
                <tbody>
                  {menu.map(item => (
                    <tr key={item.id}>
                      <td style={{fontWeight:500}}>{item.name}</td>
                      <td><span className="badge" style={{background:"var(--surface2)",color:"var(--muted)"}}>{item.category}</span></td>
                      <td style={{fontFamily:"Syne",fontWeight:700}}>{fmt(item.price)}</td>
                      <td style={{textAlign:"right"}}>
                        <div style={{display:"flex",gap:6,justifyContent:"flex-end"}}>
                          <button className="btn btn-edit" style={{padding:"4px 10px",fontSize:12}} onClick={()=>setEditingItem(item)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-danger" style={{padding:"4px 10px",fontSize:12}} onClick={()=>removeMenuItem(item.id)}>
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
        </div>
      </div>
    </>
  );
}

// ─── Page: Analytics ─────────────────────────────────────────────────────────
function AnalyticsPage({ orders }) {
  const byType = CUSTOMER_TYPES.map(ct => {
    const typeOrders = orders.filter(o => o.customerType===ct.id);
    const items = {};
    typeOrders.forEach(o => o.items.forEach(it => { items[it.name]=(items[it.name]||0)+it.qty; }));
    const top     = Object.entries(items).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const revenue = typeOrders.reduce((s,o)=>s+o.total,0);
    const avg     = typeOrders.length ? Math.round(revenue/typeOrders.length) : 0;
    return {...ct, count:typeOrders.length, revenue, avg, top};
  });
  return (
    <div style={{overflowY:"auto",height:"calc(100vh - 80px)"}}>
      <div style={{fontFamily:"Syne",fontWeight:800,fontSize:24,marginBottom:20}}>Customer Analytics</div>
      <div className="grid-2">
        {byType.map(ct => (
          <div key={ct.id} className="card card-hover fade-up" style={{borderTop:`3px solid ${ct.color}`}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
              <span style={{fontSize:32}}>{ct.emoji}</span>
              <div>
                <div style={{fontFamily:"Syne",fontWeight:700,fontSize:18}}>{ct.label}</div>
                <span className="badge" style={{background:ct.color+"20",color:ct.color}}>{ct.count} orders</span>
              </div>
            </div>
            <div className="grid-2" style={{marginBottom:16,gap:10}}>
              {[{l:"Revenue",v:fmt(ct.revenue),c:ct.color},{l:"Avg Spend",v:fmt(ct.avg),c:"var(--text)"}].map(s=>(
                <div key={s.l} style={{background:"var(--surface2)",borderRadius:10,padding:"12px 14px"}}>
                  <div style={{fontSize:11,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{s.l}</div>
                  <div style={{fontFamily:"Syne",fontWeight:800,fontSize:18,color:s.c}}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:12,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:".05em",marginBottom:8}}>Top Picks</div>
            {ct.top.length===0
              ? <div style={{fontSize:13,color:"var(--muted)"}}>No orders yet</div>
              : ct.top.map(([name,qty],i)=>(
                  <div key={name} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--border)",fontSize:13}}>
                    <span>{["🥇","🥈","🥉"][i]} {name}</span>
                    <span style={{color:"var(--muted)"}}>{qty} ordered</span>
                  </div>
                ))
            }
          </div>
        ))}
      </div>
      {orders.length>0 && (() => {
        const top = [...byType].sort((a,b)=>b.revenue-a.revenue)[0];
        return (
          <div style={{background:top.color+"15",border:`1px solid ${top.color}30`,borderRadius:14,padding:20,marginTop:20,display:"flex",gap:16,alignItems:"center"}}>
            <span style={{fontSize:36}}>💡</span>
            <div>
              <div style={{fontFamily:"Syne",fontWeight:700,fontSize:16,marginBottom:4}}>Top Insight</div>
              <div style={{fontSize:14,color:"var(--muted)"}}>
                Your <strong style={{color:top.color}}>{top.emoji} {top.label}</strong> customers generate the most revenue at <strong>{fmt(top.revenue)}</strong>.
                {top.top[0] && ` Their favourite is "${top.top[0][0]}".`}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
const PAGES = [
  {id:"order",     label:"Take Order", icon:"🍽️"},
  {id:"sales",     label:"Sales",      icon:"📈"},
  {id:"analytics", label:"Analytics",  icon:"📊"},
  {id:"menu",      label:"Menu",       icon:"📋"},
];

export default function App() {
  const [page,     setPage]     = useState("order");
  const [orders,   setOrders]   = useState(() => DB.get("orders", []));
  const [menu,     setMenu]     = useState(() => DB.get("menu", EMPTY_MENU));
  const [toastMsg, setToastMsg] = useState(null);
  const toast = useCallback((msg) => setToastMsg(msg), []);

  return (
    <>
      <FontLink />
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column"}}>
        <header style={{padding:"16px 24px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",background:"var(--bg)",position:"sticky",top:0,zIndex:100}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:36,height:36,borderRadius:10,background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🍴</div>
            <div>
              <div style={{fontFamily:"Syne",fontWeight:800,fontSize:18,lineHeight:1}}>RestroTrack</div>
              <div style={{fontSize:11,color:"var(--muted)"}}>Restaurant Management</div>
            </div>
          </div>
          <nav className="nav" style={{maxWidth:520}}>
            {PAGES.map(p => (
              <button key={p.id} className={`nav-item ${page===p.id?"active":""}`} onClick={()=>setPage(p.id)}>
                <span>{p.icon}</span>
                <span style={{display:window.innerWidth<500?"none":undefined}}>{p.label}</span>
              </button>
            ))}
          </nav>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:13,fontWeight:600}}>{orders.length} orders</div>
            <div style={{fontSize:11,color:"var(--muted)"}}>{new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}</div>
          </div>
        </header>
        <main style={{flex:1,padding:"20px 24px"}}>
          {page==="order"     && <TakeOrderPage menu={menu} orders={orders} setOrders={setOrders} toast={toast} />}
          {page==="sales"     && <SalesPage orders={orders} />}
          {page==="analytics" && <AnalyticsPage orders={orders} />}
          {page==="menu"      && <MenuPage menu={menu} setMenu={setMenu} toast={toast} />}
        </main>
      </div>
      {toastMsg && <Toast msg={toastMsg} onDone={()=>setToastMsg(null)} />}
    </>
  );
}
