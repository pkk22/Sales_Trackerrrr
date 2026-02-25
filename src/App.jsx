import { useState, useEffect, useRef, useCallback } from "react";

// ─── Fonts ───────────────────────────────────────────────────────────────────
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
    @keyframes checkPop{0%{transform:scale(0) rotate(-10deg);opacity:0;}60%{transform:scale(1.2);}100%{transform:scale(1);opacity:1;}}
    @keyframes slideFade{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}
    @keyframes modalIn{from{opacity:0;transform:scale(.94) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}
    @keyframes waveBar{0%,100%{transform:scaleY(.35);}50%{transform:scaleY(1);}}
    @keyframes flashWhite{0%,100%{opacity:0;}15%{opacity:.9;}}

    .fade-up{animation:fadeUp .4s ease forwards;}
    .slide-fade{animation:slideFade .35s ease forwards;}

    .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;}
    .card-hover{transition:border-color .2s,transform .2s;}
    .card-hover:hover{border-color:#ffffff22;transform:translateY(-2px);}

    .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;}
    .btn-primary{background:var(--accent);color:#fff;} .btn-primary:hover{background:#e55a24;}
    .btn-secondary{background:var(--surface2);color:var(--text);border:1px solid var(--border);} .btn-secondary:hover{background:#22222e;}
    .btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border);} .btn-ghost:hover{color:var(--text);border-color:#ffffff22;}
    .btn-danger{background:#1f1020;color:var(--danger);border:1px solid #ef444430;} .btn-danger:hover{background:#2a1525;}
    .btn-success{background:#051f17;color:var(--accent3);border:1px solid #06d6a030;} .btn-success:hover{background:#082b20;}
    .btn-finish{background:linear-gradient(135deg,#06d6a0,#04b585);color:#fff;border:none;font-weight:700;}
    .btn-finish:hover{filter:brightness(1.1);}
    .btn-edit{background:#1a1428;color:var(--accent4);border:1px solid #8b5cf630;} .btn-edit:hover{background:#221a38;}

    .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:500;}
    .input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
    .input:focus{border-color:#ff6b3550;} .input::placeholder{color:var(--muted);}
    .chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;font-size:13px;border:1px solid var(--border);background:var(--surface2);cursor:pointer;transition:all .2s;}
    .chip.active{border-color:var(--accent);background:#ff6b3515;color:var(--accent);}
    .progress-bar{height:6px;background:var(--surface2);border-radius:3px;overflow:hidden;}
    .progress-fill{height:100%;border-radius:3px;transition:width .6s ease;}

    .nav{display:flex;gap:2px;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:4px;}
    .nav-item{flex:1;padding:8px 12px;border-radius:9px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;text-align:center;color:var(--muted);display:flex;align-items:center;justify-content:center;gap:6px;border:none;background:transparent;font-family:'DM Sans',sans-serif;}
    .nav-item.active{background:var(--surface2);color:var(--text);}
    .nav-item:hover:not(.active){color:var(--text);}

    .mic-btn{width:72px;height:72px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:28px;position:relative;transition:all .3s;}
    .mic-btn.idle{background:var(--surface2);border:2px solid var(--border);}
    .mic-btn.idle:hover{border-color:var(--accent);transform:scale(1.06);}
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
    .table tr:last-child td{border-bottom:none;}
    .table tr:hover td{background:#ffffff04;}

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

    /* Multi-media gallery */
    .media-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
    .media-thumb{position:relative;aspect-ratio:1;border-radius:8px;overflow:hidden;border:1px solid var(--border);background:var(--surface2);}
    .media-thumb img{width:100%;height:100%;object-fit:cover;}
    .media-thumb .pdf-badge{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:8px;text-align:center;font-size:10px;color:var(--accent3);}
    .media-thumb .remove-btn{position:absolute;top:4px;right:4px;background:#000000cc;border:none;color:#fff;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;z-index:2;}
    .media-add-btn{aspect-ratio:1;border-radius:8px;border:2px dashed var(--border);background:transparent;color:var(--muted);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;font-size:22px;transition:all .2s;font-family:'DM Sans',sans-serif;}
    .media-add-btn:hover{border-color:var(--accent);color:var(--accent);background:#ff6b3508;}

    /* Modal */
    .modal-overlay{position:fixed;inset:0;background:#000000bb;z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);}
    .modal{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:28px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;animation:modalIn .3s cubic-bezier(.34,1.2,.64,1);}

    .ocr-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:100px;font-size:12px;background:#8b5cf620;color:var(--accent4);border:1px solid #8b5cf630;}
    .cam-flash{position:absolute;inset:0;background:#fff;pointer-events:none;animation:flashWhite .4s ease forwards;z-index:10;}
  `}</style>
);

// ─── Constants ───────────────────────────────────────────────────────────────
const CUSTOMER_TYPES = [
  { id: "single",  label: "Solo",    emoji: "🧍",      color: "#8b5cf6" },
  { id: "couple",  label: "Couple",  emoji: "👫",      color: "#ec4899" },
  { id: "family",  label: "Family",  emoji: "👨‍👩‍👧",    color: "#f59e0b" },
  { id: "friends", label: "Friends", emoji: "👥",      color: "#06d6a0" },
];

const SAMPLE_MENU = []; // Start empty — add items via camera/OCR or manually

// ─── Fuzzy / phonetic helpers for better voice accuracy ──────────────────────
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
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => i || j));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return 1 - dp[m][n] / Math.max(m, n);
}

// Returns 0–1 confidence that itemName appears in spoken string
function matchScore(itemName, spoken) {
  const name = itemName.toLowerCase();
  const sp   = spoken.toLowerCase();
  if (sp.includes(name)) return 1.0;
  const nameWords = name.split(" ");
  const spWords   = sp.split(/\s+/);
  let hits = 0;
  nameWords.forEach((nw) => {
    const best = Math.max(...spWords.map((sw) =>
      Math.max(editSim(nw, sw), soundex(nw) === soundex(sw) ? 0.82 : 0)));
    if (best > 0.72) hits++;
  });
  const wordScore = hits / nameWords.length;
  const phoneticFull = soundex(name) === soundex(sp.slice(0, name.length + 5)) ? 0.78 : 0;
  return Math.max(wordScore, phoneticFull);
}

const NUM_WORDS = { one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10 };

const generateId = () => Math.random().toString(36).slice(2,9);
const fmt     = (n) => `₹${n.toLocaleString("en-IN")}`;
const fmtDate = (d) => new Date(d).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"});

// ─── Local Storage Backend ────────────────────────────────────────────────────
const DB = {
  get: (key, fallback) => {
    try { const r = localStorage.getItem(`restrotrack_${key}`); return r ? JSON.parse(r) : fallback; }
    catch { return fallback; }
  },
  set: (key, val) => {
    try { localStorage.setItem(`restrotrack_${key}`, JSON.stringify(val)); } catch {}
  },
};

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
          const pct = total ? d.value / total : 0;
          const dash = pct * circ;
          const el = <circle key={d.id} cx={70} cy={70} r={r} fill="none" stroke={d.color} strokeWidth={18}
            strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset * circ}
            style={{ transition: "stroke-dasharray .6s ease" }} />;
          offset += pct; return el;
        })}
      </svg>
      <div className="donut-center">
        <span style={{ fontFamily:"Syne", fontSize:24, fontWeight:700 }}>{total}</span>
        <span style={{ fontSize:11, color:"var(--muted)" }}>orders</span>
      </div>
    </div>
  );
}

// ─── Edit Order Modal ─────────────────────────────────────────────────────────
function EditOrderModal({ order, menu, onSave, onClose }) {
  const [items, setItems] = useState(order.items.map(i => ({ ...i })));
  const [note,         setNote]         = useState(order.note || "");
  const [tableNum,     setTableNum]     = useState(order.table);
  const [customerType, setCustomerType] = useState(order.customerType);
  const [search,       setSearch]       = useState("");

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const addItem = (item) => setItems(prev => {
    const ex = prev.find(c => c.id === item.id);
    return ex ? prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
              : [...prev, { ...item, qty: 1 }];
  });

  const changeQty = (id, delta) =>
    setItems(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0));

  const filtered = menu.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:20 }}>✏️ Edit Order</div>
          <button className="btn btn-ghost" style={{ padding:"6px 12px" }} onClick={onClose}>✕ Close</button>
        </div>

        <div className="grid-2" style={{ marginBottom:16, gap:12 }}>
          <div>
            <div style={{ fontSize:11, color:"var(--muted)", marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Table No.</div>
            <input className="input" value={tableNum} onChange={e => setTableNum(e.target.value)} placeholder="e.g. T-04" />
          </div>
          <div>
            <div style={{ fontSize:11, color:"var(--muted)", marginBottom:6, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Customer Type</div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {CUSTOMER_TYPES.map(ct => (
                <button key={ct.id} className={`chip ${customerType === ct.id ? "active" : ""}`}
                  onClick={() => setCustomerType(ct.id)}
                  style={{ fontSize:12, padding:"4px 10px", ...(customerType === ct.id ? { borderColor:ct.color, background:ct.color+"18", color:ct.color } : {}) }}>
                  {ct.emoji} {ct.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, color:"var(--muted)", marginBottom:10, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Items in Order</div>
          {items.length === 0
            ? <div style={{ color:"var(--muted)", fontSize:13, textAlign:"center", padding:"12px 0" }}>No items — add from menu below</div>
            : <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {items.map(item => (
                  <div key={item.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:"var(--surface2)", borderRadius:10 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:500 }}>{item.name}</div>
                      <div style={{ fontSize:12, color:"var(--muted)" }}>{fmt(item.price)} each</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <button className="btn btn-ghost" style={{ padding:"2px 10px", fontSize:16 }} onClick={() => changeQty(item.id, -1)}>−</button>
                      <span style={{ fontWeight:700, minWidth:20, textAlign:"center" }}>{item.qty}</span>
                      <button className="btn btn-ghost" style={{ padding:"2px 10px", fontSize:16 }} onClick={() => changeQty(item.id, 1)}>+</button>
                    </div>
                    <div style={{ fontWeight:700, minWidth:54, textAlign:"right", color:"var(--accent)", fontSize:13 }}>{fmt(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>
          }
        </div>

        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:11, color:"var(--muted)", marginBottom:8, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Add from Menu</div>
          <input className="input" placeholder="Search items…" value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom:8 }} />
          <div style={{ maxHeight:160, overflowY:"auto", display:"flex", flexDirection:"column", gap:4 }}>
            {filtered.map(item => {
              const inOrder = items.find(i => i.id === item.id);
              return (
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", borderRadius:8, background:"var(--surface2)", cursor:"pointer" }}
                  onClick={() => addItem(item)}>
                  <div>
                    <span style={{ fontSize:13, fontWeight:500 }}>{item.name}</span>
                    {inOrder && <span style={{ marginLeft:8, fontSize:11, color:"var(--accent3)" }}>×{inOrder.qty} in order</span>}
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:"var(--accent)" }}>{fmt(item.price)}</span>
                </div>
              );
            })}
          </div>
        </div>

        <input className="input" placeholder="Note (e.g. no spice)…" value={note} onChange={e => setNote(e.target.value)} style={{ marginBottom:20 }} />

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:12, color:"var(--muted)" }}>Updated Total</div>
            <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:22, color:"var(--accent)" }}>{fmt(total)}</div>
          </div>
          <button className="btn btn-primary" style={{ padding:"12px 24px", fontSize:15 }}
            onClick={() => onSave({ ...order, items, note, table:tableNum, customerType, total })}>
            Save Changes ✓
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Take Order ─────────────────────────────────────────────────────────
function TakeOrderPage({ menu, orders, setOrders, toast }) {
  const [customerType, setCustomerType] = useState("family");
  const [tableNum,     setTableNum]     = useState("");
  const [search,       setSearch]       = useState("");
  const [cart,         setCart]         = useState([]);
  const [isRecording,  setIsRecording]  = useState(false);
  const [transcript,   setTranscript]   = useState("");
  const [interimText,  setInterimText]  = useState("");
  const [note,         setNote]         = useState("");
  const [micError,     setMicError]     = useState("");
  const [noiseLevel,   setNoiseLevel]   = useState(0);
  const [micMatches,   setMicMatches]   = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);

  const recognitionRef = useRef(null);
  const audioCtxRef    = useRef(null);
  const analyserRef    = useRef(null);
  const rafRef         = useRef(null);
  const addedRef       = useRef(new Set());
  const activeRef      = useRef(false);

  const activeOrders  = orders.filter(o => o.status === "active");
  const recentOrders  = orders.filter(o => o.status === "finished");

  const filtered = menu.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase()));

  const addItem = useCallback((item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      return ex ? prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
                : [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = (id) =>
    setCart(prev => prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c).filter(c => c.qty > 0));

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const placeOrder = () => {
    if (!cart.length) return;
    const order = { id:generateId(), table:tableNum||"—", customerType, items:[...cart], total:cartTotal, note, status:"active", ts:Date.now() };
    const updated = [order, ...orders];
    setOrders(updated); DB.set("orders", updated);
    setCart([]); setNote(""); setTableNum("");
    toast("Order placed successfully!");
  };

  const finishOrder = (orderId) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status:"finished", finishedAt:Date.now() } : o);
    setOrders(updated); DB.set("orders", updated);
    toast("Order marked as finished!");
  };

  const saveEdit = (updatedOrder) => {
    const updated = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    setOrders(updated); DB.set("orders", updated);
    setEditingOrder(null);
    toast("Order updated!");
  };

  // ── Detect if running on a mobile/Android device ─────────────────────────
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator !== "undefined" ? navigator.userAgent : ""
  );
  const isAndroid = /Android/i.test(typeof navigator !== "undefined" ? navigator.userAgent : "");

  // ── Stop mic cleanly ──────────────────────────────────────────────────────
  const stopMic = useCallback(() => {
    activeRef.current = false;
    try { recognitionRef.current?.abort(); } catch {}
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
      audioCtxRef.current = null;
    }
    analyserRef.current = null;
    setIsRecording(false);
    setNoiseLevel(0);
    setInterimText("");
    addedRef.current.clear();
  }, []);

  // ── Core recognition logic (shared between mobile & desktop) ─────────────
  const buildAndStartRec = useCallback((onResult) => {
    if (!activeRef.current) return;
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Rec();

    // Android Chrome does NOT reliably support continuous=true
    // Setting it false + auto-restarting onend is the only reliable pattern
    rec.continuous     = !isAndroid; // false on Android, true on desktop
    rec.interimResults = true;
    rec.lang           = "en-IN";
    rec.maxAlternatives = 5;

    rec.onresult = onResult;

    rec.onerror = (ev) => {
      // These are non-fatal on Android — it stops and restarts frequently
      if (["no-speech", "aborted", "audio-capture"].includes(ev.error)) return;
      // network error = speech recognition server unreachable
      if (ev.error === "network") {
        setMicError("Network error — check your internet connection");
        stopMic();
        return;
      }
      // not-allowed = user denied mic permission
      if (ev.error === "not-allowed") {
        setMicError("Microphone permission denied — allow mic in browser settings");
        stopMic();
        return;
      }
      setMicError(`Voice error: ${ev.error}`);
    };

    // onend fires very frequently on Android — restart quickly but not instantly
    // (too fast = Android bans you; too slow = noticeable gap)
    rec.onend = () => {
      if (!activeRef.current) return;
      const delay = isAndroid ? 300 : 150;
      setTimeout(() => buildAndStartRec(onResult), delay);
    };

    try {
      rec.start();
      recognitionRef.current = rec;
    } catch (e) {
      // InvalidStateError = already started, just wait for onend restart
    }
  }, [isAndroid, stopMic]);

  const toggleMic = async () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setMicError("Voice not supported — use Chrome on Android or Chrome/Edge on desktop");
      toast("Use Chrome on Android for voice support");
      return;
    }
    if (isRecording) { stopMic(); return; }

    setMicError(""); setMicMatches([]);
    activeRef.current = true;
    setIsRecording(true);
    setTranscript("");

    // ── On MOBILE: skip getUserMedia entirely — it blocks SpeechRecognition ──
    // SpeechRecognition handles its own mic access internally on Android Chrome
    if (isMobile) {
      // Fake animated visualizer — just pulses while speaking
      // (no real audio data without getUserMedia, but bars still animate via CSS)
      const fakeViz = () => {
        if (!activeRef.current) return;
        setNoiseLevel(prev => {
          // Gentle random walk so bars look alive
          const next = prev + (Math.random() - 0.45) * 25;
          return Math.max(10, Math.min(90, next));
        });
        rafRef.current = requestAnimationFrame(fakeViz);
      };
      fakeViz();

    } else {
      // ── On DESKTOP: use getUserMedia for real noise-level visualizer ─────
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: { ideal: true },
            noiseSuppression: { ideal: true },
            autoGainControl:  { ideal: true },
            channelCount: 1,
            sampleRate: { ideal: 48000 },
          },
        });
      } catch {
        // Mic permission denied on desktop — still try SpeechRecognition alone
        toast("Mic permission denied — voice may still work via browser prompt");
      }

      if (stream) {
        const ctx     = new (window.AudioContext || window.webkitAudioContext)();
        const src     = ctx.createMediaStreamSource(stream);
        const hp      = ctx.createBiquadFilter();
        hp.type = "highpass"; hp.frequency.value = 180; hp.Q.value = 0.7;
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512; analyser.smoothingTimeConstant = 0.8;
        src.connect(hp); hp.connect(analyser);
        audioCtxRef.current = ctx;
        analyserRef.current = analyser;

        const freqData = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(freqData);
          const avg = freqData.slice(3, 40).reduce((a, b) => a + b, 0) / 37;
          setNoiseLevel(Math.min(100, avg * 2.6));
          rafRef.current = requestAnimationFrame(tick);
        };
        tick();
      }
    }

    // ── Shared result handler ─────────────────────────────────────────────
    const handleResult = (e) => {
      let finals = ""; let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res  = e.results[i];
        const alts = Array.from({ length: res.length }, (_, k) => res[k].transcript);

        if (res.isFinal) {
          finals += res[0].transcript + " ";

          // Match menu items across all alternatives
          const newlyAdded = [];
          menu.forEach(item => {
            if (addedRef.current.has(item.id)) return;
            const best = Math.max(...alts.map(a => matchScore(item.name, a)));
            if (best >= 0.75) {
              let qty = 1;
              alts.forEach(a => {
                const m = a.toLowerCase().match(/(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+/);
                if (m) { const q = m[1]; qty = isNaN(q) ? (NUM_WORDS[q] || 1) : parseInt(q); }
              });
              qty = Math.min(qty, 10);
              for (let q = 0; q < qty; q++) addItem(item);
              addedRef.current.add(item.id);
              newlyAdded.push(`${item.name}${qty > 1 ? ` ×${qty}` : ""}`);
            }
          });
          if (newlyAdded.length) setMicMatches(prev => [...prev.slice(-4), ...newlyAdded]);

          // Table number detection
          alts.forEach(a => {
            const tm = a.toLowerCase().match(/table\s+(?:number\s+)?([a-z0-9-]+)/i);
            if (tm) setTableNum(tm[1].toUpperCase());
          });

        } else {
          interim += res[0].transcript;
        }
      }
      if (finals) setTranscript(prev => (prev + finals).slice(-300));
      setInterimText(interim);
    };

    buildAndStartRec(handleResult);
  };

  const categories = [...new Set(menu.map(m => m.category))];

  return (
    <>
      {editingOrder && <EditOrderModal order={editingOrder} menu={menu} onSave={saveEdit} onClose={() => setEditingOrder(null)} />}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20, height:"calc(100vh - 80px)", overflow:"hidden" }}>
        {/* Left */}
        <div style={{ overflowY:"auto", paddingRight:4 }}>

          {/* Customer + table */}
          <div className="card fade-up" style={{ marginBottom:16 }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:8, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Customer Type</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {CUSTOMER_TYPES.map(ct => (
                    <button key={ct.id} className={`chip ${customerType === ct.id ? "active" : ""}`}
                      onClick={() => setCustomerType(ct.id)}
                      style={customerType === ct.id ? { borderColor:ct.color, background:ct.color+"18", color:ct.color } : {}}>
                      {ct.emoji} {ct.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ width:140 }}>
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:8, fontWeight:600, textTransform:"uppercase", letterSpacing:".06em" }}>Table No.</div>
                <input className="input" placeholder="e.g. T-04" value={tableNum} onChange={e => setTableNum(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Voice + Search */}
          <div style={{ display:"flex", gap:14, marginBottom:16, alignItems:"flex-start" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
              <button className={`mic-btn ${isRecording ? "recording" : "idle"}`} onClick={toggleMic}
                title={isRecording ? "Tap to stop" : "Tap to start voice order"}>
                {isRecording ? "⏹" : "🎙️"}
              </button>
              {/* Waveform bars — real audio data on desktop, animated on mobile */}
              {isRecording && (
                <div style={{ display:"flex", gap:3, alignItems:"center", height:22 }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className={isMobile ? "wave-bar" : "wave-bar"}
                      style={{
                        height: isMobile
                          ? `${12 + Math.sin(i * 0.9) * 6}px`        // static pattern on mobile
                          : `${10 + (noiseLevel/100)*14}px`,          // real level on desktop
                        animationDelay:`${i*0.09}s`,
                        opacity: isRecording ? 1 : 0.3,
                        background: "var(--accent)",
                        width: 3,
                        borderRadius: 2,
                        animation: "waveBar .7s ease-in-out infinite",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
              {/* Show mic mode label */}
              {!isRecording && (
                <span style={{ fontSize:10, color:"var(--muted)", textAlign:"center", lineHeight:1.3 }}>
                  {isAndroid ? "Android\nChrome" : "Voice"}
                </span>
              )}
            </div>

            <div style={{ flex:1 }}>
              <input className="input" placeholder="Search menu…" value={search} onChange={e => setSearch(e.target.value)} />

              {/* Recording panel */}
              {isRecording && (
                <div style={{ marginTop:8, padding:"10px 14px", background:"var(--surface2)", borderRadius:10, border:"1px solid #ff6b3530" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <div className="rec-dot" />
                    <span style={{ fontSize:12, color:"var(--accent)", fontWeight:600 }}>
                      {isMobile ? "Listening… speak item names" : "Listening — noise filter active"}
                    </span>
                  </div>
                  {interimText && (
                    <div style={{ fontSize:12, color:"var(--muted)", fontStyle:"italic", marginBottom:6 }}>
                      "{interimText}"
                    </div>
                  )}
                  {micMatches.length > 0 && (
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {micMatches.map((m, i) => (
                        <span key={i} style={{ background:"#06d6a020", color:"var(--accent3)", borderRadius:100, padding:"2px 10px", fontSize:12, border:"1px solid #06d6a030" }}>
                          ✓ {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {transcript && !isRecording && (
                <div style={{ marginTop:6, fontSize:12, color:"var(--muted)" }}>
                  Last: "{transcript.slice(-80)}"
                </div>
              )}

              {/* Error message — with actionable fix instructions */}
              {micError && (
                <div style={{ marginTop:8, padding:"10px 14px", background:"#1f1020", borderRadius:10, border:"1px solid #ef444430" }}>
                  <div style={{ fontSize:12, color:"var(--danger)", fontWeight:600, marginBottom:4 }}>⚠ {micError}</div>
                  {micError.includes("not-allowed") || micError.includes("denied") ? (
                    <div style={{ fontSize:11, color:"var(--muted)", lineHeight:1.6 }}>
                      <strong>Android fix:</strong> Open Chrome → tap the 🔒 lock icon in address bar → tap Permissions → enable Microphone → refresh the page.
                    </div>
                  ) : micError.includes("supported") ? (
                    <div style={{ fontSize:11, color:"var(--muted)", lineHeight:1.6 }}>
                      Please open this app in <strong>Google Chrome</strong> on Android for voice support.
                    </div>
                  ) : micError.includes("network") ? (
                    <div style={{ fontSize:11, color:"var(--muted)", lineHeight:1.6 }}>
                      Voice needs an internet connection to process speech. Check your WiFi/data.
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Menu grid */}
          {categories.filter(cat => filtered.some(m => m.category === cat)).map(cat => (
            <div key={cat} style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".08em", marginBottom:10 }}>{cat}</div>
              <div className="grid-2" style={{ gap:10 }}>
                {filtered.filter(m => m.category === cat).map(item => {
                  const inCart = cart.find(c => c.id === item.id);
                  return (
                    <div key={item.id} className="order-card card-hover" style={{ cursor:"pointer" }} onClick={() => addItem(item)}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                        <div>
                          <div style={{ fontWeight:500, fontSize:14, marginBottom:4 }}>{item.name}</div>
                          <div style={{ fontSize:15, fontFamily:"Syne", fontWeight:700, color:"var(--accent)" }}>{fmt(item.price)}</div>
                        </div>
                        {inCart && (
                          <div style={{ background:"var(--accent)", color:"#fff", borderRadius:"50%", width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>
                            {inCart.qty}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Current & Recent Orders columns */}
          <div className="orders-columns" style={{ marginTop:10 }}>
            {/* Active */}
            <div>
              <div className="col-header">
                <div className="col-dot" style={{ background:"var(--accent)" }} />
                <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:15 }}>Current Orders</span>
                <span className="badge" style={{ background:"#ff6b3520", color:"var(--accent)", marginLeft:4 }}>{activeOrders.length}</span>
              </div>
              {activeOrders.length === 0
                ? <div style={{ padding:"20px 0", color:"var(--muted)", fontSize:13, textAlign:"center" }}>No active orders</div>
                : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {activeOrders.map(o => {
                      const ct = CUSTOMER_TYPES.find(c => c.id === o.customerType);
                      return (
                        <div key={o.id} className="order-card active-order-card slide-fade">
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:15, color:"var(--accent)" }}>🪑 {o.table}</span>
                              <span className="badge" style={{ background:ct.color+"20", color:ct.color }}>{ct.emoji} {ct.label}</span>
                            </div>
                            <span style={{ fontSize:11, color:"var(--muted)" }}>{fmtDate(o.ts)}</span>
                          </div>

                          {/* Item breakdown table */}
                          <table className="table" style={{ marginBottom:10 }}>
                            <thead>
                              <tr>
                                <th style={{ fontSize:11, padding:"4px 0" }}>Item</th>
                                <th style={{ fontSize:11, padding:"4px 0", textAlign:"center" }}>Qty</th>
                                <th style={{ fontSize:11, padding:"4px 0", textAlign:"right" }}>Amt</th>
                              </tr>
                            </thead>
                            <tbody>
                              {o.items.map(it => (
                                <tr key={it.id}>
                                  <td style={{ fontSize:13, padding:"4px 0" }}>{it.name}</td>
                                  <td style={{ textAlign:"center", fontSize:13, padding:"4px 0" }}>{it.qty}</td>
                                  <td style={{ textAlign:"right", fontSize:13, fontWeight:600, padding:"4px 0" }}>{fmt(it.price * it.qty)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {o.note && <div style={{ fontSize:12, color:"var(--muted)", fontStyle:"italic", marginBottom:10 }}>📝 {o.note}</div>}

                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                            <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:16, color:"var(--accent3)" }}>{fmt(o.total)}</span>
                            <div style={{ display:"flex", gap:8 }}>
                              <button className="btn btn-edit" style={{ padding:"6px 12px", fontSize:12 }} onClick={() => setEditingOrder(o)}>
                                ✏️ Edit
                              </button>
                              <button className="btn btn-finish" style={{ padding:"6px 14px", fontSize:12 }} onClick={() => finishOrder(o.id)}>
                                ✓ Finished
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
              }
            </div>

            {/* Finished */}
            <div>
              <div className="col-header">
                <div className="col-dot" style={{ background:"var(--accent3)" }} />
                <span style={{ fontFamily:"Syne", fontWeight:700, fontSize:15 }}>Recent Orders</span>
                <span className="badge" style={{ background:"#06d6a020", color:"var(--accent3)", marginLeft:4 }}>{recentOrders.length}</span>
              </div>
              {recentOrders.length === 0
                ? <div style={{ padding:"20px 0", color:"var(--muted)", fontSize:13, textAlign:"center" }}>No finished orders yet</div>
                : <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {recentOrders.map(o => {
                      const ct = CUSTOMER_TYPES.find(c => c.id === o.customerType);
                      return (
                        <div key={o.id} className="order-card finished-order-card slide-fade">
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:14, color:"var(--accent3)" }}>✓ {o.table}</span>
                              <span className="badge" style={{ background:ct.color+"20", color:ct.color }}>{ct.emoji}</span>
                            </div>
                            <span style={{ fontSize:11, color:"var(--muted)" }}>Done {fmtDate(o.finishedAt || o.ts)}</span>
                          </div>
                          <div style={{ fontSize:12, color:"var(--muted)", marginBottom:8 }}>{o.items.map(it => `${it.name} ×${it.qty}`).join(", ")}</div>
                          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:15, color:"var(--accent3)" }}>{fmt(o.total)}</div>
                        </div>
                      );
                    })}
                  </div>
              }
            </div>
          </div>
        </div>

        {/* Right: Cart */}
        <div style={{ display:"flex", flexDirection:"column", gap:12, overflowY:"auto" }}>
          <div className="card" style={{ flex:1, display:"flex", flexDirection:"column" }}>
            <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:18, marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              Order Cart
              {cart.length > 0 && <span style={{ fontSize:12, background:"var(--accent)", color:"#fff", borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center" }}>{cart.reduce((s,c) => s+c.qty, 0)}</span>}
            </div>

            {cart.length === 0
              ? <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"var(--muted)", gap:10 }}>
                  <span style={{ fontSize:40 }}>🍽️</span>
                  <span style={{ fontSize:14 }}>Tap items or use voice to add</span>
                </div>
              : <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", borderBottom:"1px solid var(--border)" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:500 }}>{item.name}</div>
                        <div style={{ fontSize:13, color:"var(--muted)" }}>{fmt(item.price)} × {item.qty}</div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <button className="btn btn-ghost" style={{ padding:"4px 10px", fontSize:16 }} onClick={() => removeItem(item.id)}>−</button>
                        <span style={{ fontWeight:700, fontSize:14, minWidth:20, textAlign:"center" }}>{item.qty}</span>
                        <button className="btn btn-ghost" style={{ padding:"4px 10px", fontSize:16 }} onClick={() => addItem(item)}>+</button>
                      </div>
                      <div style={{ fontWeight:700, fontSize:14, minWidth:60, textAlign:"right" }}>{fmt(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>
            }

            {cart.length > 0 && (
              <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, marginTop:8 }}>
                <input className="input" placeholder="Note (e.g. no spice)…" value={note} onChange={e => setNote(e.target.value)} style={{ marginBottom:12 }} />
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <span style={{ color:"var(--muted)", fontSize:14 }}>Total</span>
                  <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:22, color:"var(--accent)" }}>{fmt(cartTotal)}</span>
                </div>
                <button className="btn btn-primary" style={{ width:"100%", justifyContent:"center", padding:"13px", fontSize:15, fontWeight:600 }} onClick={placeOrder}>
                  Place Order →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Page: Sales ──────────────────────────────────────────────────────────────
function SalesPage({ orders }) {
  const totalRevenue = orders.reduce((s,o) => s+o.total, 0);
  const avgOrder = orders.length ? Math.round(totalRevenue/orders.length) : 0;
  const custData = CUSTOMER_TYPES.map(ct => ({ ...ct, value: orders.filter(o => o.customerType === ct.id).length }));
  const itemCounts = {};
  orders.forEach(o => o.items.forEach(it => {
    itemCounts[it.name] = itemCounts[it.name] || { count:0, rev:0 };
    itemCounts[it.name].count += it.qty; itemCounts[it.name].rev += it.price * it.qty;
  }));
  const bestSellers = Object.entries(itemCounts).sort((a,b) => b[1].count-a[1].count).slice(0,8).map(([name,d]) => ({ name,...d }));
  const maxCount = bestSellers[0]?.count || 1;
  const now = Date.now();
  const hours = Array.from({ length:12 }, (_,i) => {
    const h = new Date(now - (11-i)*3600000);
    const rev = orders.filter(o => new Date(o.ts).getHours() === h.getHours()).reduce((s,o) => s+o.total, 0);
    return { label: h.getHours()+":00", rev };
  });
  const maxRev = Math.max(...hours.map(h => h.rev), 1);

  return (
    <div style={{ overflowY:"auto", height:"calc(100vh - 80px)", paddingRight:4 }}>
      <div className="grid-4 fade-up" style={{ marginBottom:20 }}>
        {[
          { label:"Today's Revenue",  value:fmt(totalRevenue), icon:"💰", color:"var(--accent)" },
          { label:"Total Orders",     value:orders.length,     icon:"🧾", color:"var(--accent2)" },
          { label:"Avg Order Value",  value:fmt(avgOrder),     icon:"📊", color:"var(--accent3)" },
          { label:"Active Tables",    value:[...new Set(orders.map(o=>o.table))].length, icon:"🪑", color:"var(--accent4)" },
        ].map(kpi => (
          <div key={kpi.label} className="stat card-hover" style={{ animation:"fadeUp .4s ease" }}>
            <div style={{ fontSize:28, marginBottom:10 }}>{kpi.icon}</div>
            <div style={{ fontFamily:"Syne", fontSize:26, fontWeight:800, color:kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom:20 }}>
        <div className="card">
          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:20 }}>Customer Breakdown</div>
          <DonutChart data={custData} total={orders.length} />
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:20 }}>
            {custData.map(ct => (
              <div key={ct.id} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:16 }}>{ct.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, fontSize:13 }}>
                    <span>{ct.label}</span><span style={{ color:ct.color, fontWeight:700 }}>{ct.value}</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width:`${orders.length ? (ct.value/orders.length)*100:0}%`, background:ct.color }} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:20 }}>Revenue Timeline</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:140 }}>
            {hours.map(h => (
              <div key={h.label} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, height:"100%" }}>
                <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end" }}>
                  <div style={{ width:"100%", background:h.rev>0?"var(--accent)":"var(--surface2)", borderRadius:"4px 4px 0 0", height:`${(h.rev/maxRev)*100}%`, minHeight:h.rev>0?4:0, transition:"height .6s ease" }} />
                </div>
                <span style={{ fontSize:10, color:"var(--muted)", whiteSpace:"nowrap" }}>{h.label}</span>
              </div>
            ))}
          </div>
          {orders.length === 0 && <div style={{ textAlign:"center", color:"var(--muted)", fontSize:14, marginTop:12 }}>No orders yet</div>}
        </div>
      </div>

      <div className="card" style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:16 }}>🏆 Best Sellers</div>
        {bestSellers.length === 0
          ? <div style={{ color:"var(--muted)", fontSize:14 }}>No sales data yet</div>
          : <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {bestSellers.map((item,i) => (
                <div key={item.name} style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontFamily:"Syne", fontWeight:800, fontSize:20, color:i===0?"var(--accent2)":"var(--muted)", minWidth:28 }}>#{i+1}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5, fontSize:14 }}>
                      <span style={{ fontWeight:500 }}>{item.name}</span>
                      <span style={{ color:"var(--muted)" }}>{item.count} sold · {fmt(item.rev)}</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width:`${(item.count/maxCount)*100}%`, background:i===0?"var(--accent2)":"var(--accent)" }} /></div>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>

      <div className="card">
        <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:16 }}>All Orders</div>
        <div style={{ overflowX:"auto" }}>
          <table className="table">
            <thead><tr><th>ID</th><th>Table</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {orders.length === 0
                ? <tr><td colSpan={7} style={{ textAlign:"center", color:"var(--muted)", padding:24 }}>No orders placed yet</td></tr>
                : orders.map(o => {
                    const ct = CUSTOMER_TYPES.find(c => c.id === o.customerType);
                    return (
                      <tr key={o.id}>
                        <td style={{ fontFamily:"monospace", fontSize:12, color:"var(--muted)" }}>#{o.id}</td>
                        <td style={{ fontWeight:600 }}>{o.table}</td>
                        <td><span className="badge" style={{ background:ct.color+"18", color:ct.color }}>{ct.emoji} {ct.label}</span></td>
                        <td style={{ color:"var(--muted)", fontSize:13 }}>{o.items.map(it=>`${it.name} ×${it.qty}`).join(", ")}</td>
                        <td style={{ fontWeight:700, color:"var(--accent3)" }}>{fmt(o.total)}</td>
                        <td><span className="badge" style={{ background:o.status==="finished"?"#06d6a020":"#ff6b3520", color:o.status==="finished"?"var(--accent3)":"var(--accent)" }}>{o.status==="finished"?"✓ Done":"● Active"}</span></td>
                        <td style={{ color:"var(--muted)", fontSize:13 }}>{fmtDate(o.ts)}</td>
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

// ─── Editable OCR result row ──────────────────────────────────────────────────
function OcrItemRow({ item, onAdd, onDismiss }) {
  const [name,     setName]     = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [price,    setPrice]    = useState(String(item.price));

  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 90px 70px auto auto", gap:6, alignItems:"center", padding:"8px 0", borderBottom:"1px solid var(--border)" }}>
      <input className="input" style={{ padding:"5px 10px", fontSize:13 }} value={name}     onChange={e => setName(e.target.value)} placeholder="Item name" />
      <input className="input" style={{ padding:"5px 10px", fontSize:13 }} value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <input className="input" style={{ padding:"5px 10px", fontSize:13 }} value={price}    onChange={e => setPrice(e.target.value)} placeholder="₹" type="number" />
      <button className="btn btn-success" style={{ padding:"5px 12px", fontSize:12, whiteSpace:"nowrap" }}
        onClick={() => onAdd({ name: name.trim(), category: category.trim() || "Other", price: Number(price) || 0 })}>
        + Add
      </button>
      <button className="btn btn-ghost" style={{ padding:"5px 8px", fontSize:12 }} onClick={onDismiss}>✕</button>
    </div>
  );
}


let tesseractReady = false;
let tesseractLoading = false;
const tesseractCallbacks = [];

function loadTesseract() {
  return new Promise((resolve) => {
    if (tesseractReady) { resolve(); return; }
    tesseractCallbacks.push(resolve);
    if (tesseractLoading) return;
    tesseractLoading = true;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js";
    s.onload = () => {
      tesseractReady = true;
      tesseractCallbacks.forEach(cb => cb());
    };
    document.head.appendChild(s);
  });
}

// ─── Image preprocessor ──────────────────────────────────────────────────────
// Simple, proven pipeline: upscale → grayscale → contrast stretch → mild sharpen
// No binary thresholding — Tesseract works better on greyscale than on binary
function preprocessImageForOCR(imageSrc) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Upscale to 2400px wide — Tesseract reads best at ~300dpi equivalent
      const scale = Math.max(1, Math.min(4, 2400 / img.width));
      const w = Math.round(img.width  * scale);
      const h = Math.round(img.height * scale);

      const cv  = document.createElement("canvas");
      cv.width  = w; cv.height = h;
      const ctx = cv.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);

      const id = ctx.getImageData(0, 0, w, h);
      const d  = id.data;

      // Step 1 — Grayscale
      const gray = new Uint8Array(w * h);
      for (let i = 0; i < d.length; i += 4) {
        gray[i >> 2] = 0.299 * d[i] + 0.587 * d[i+1] + 0.114 * d[i+2];
      }

      // Step 2 — Contrast stretch using 2nd/98th percentile (robust to outliers)
      const sorted = gray.slice().sort((a,b)=>a-b);
      const lo  = sorted[Math.floor(sorted.length * 0.02)];
      const hi  = sorted[Math.floor(sorted.length * 0.98)];
      const rng = Math.max(1, hi - lo);
      for (let i = 0; i < gray.length; i++) {
        gray[i] = Math.min(255, Math.max(0, Math.round(((gray[i] - lo) / rng) * 255)));
      }

      // Step 3 — Mild unsharp mask (blend = 0.4 strength, safe for greyscale)
      const sharp = new Uint8Array(w * h);
      for (let y = 1; y < h-1; y++) {
        for (let x = 1; x < w-1; x++) {
          const i = y*w+x;
          const blur = (gray[(y-1)*w+x] + gray[(y+1)*w+x] +
                        gray[y*w+x-1]   + gray[y*w+x+1]   + gray[i]) / 5;
          sharp[i] = Math.min(255, Math.max(0, Math.round(gray[i] + 0.4*(gray[i]-blur))));
        }
      }
      for (let x = 0; x < w; x++) { sharp[x] = gray[x]; sharp[(h-1)*w+x] = gray[(h-1)*w+x]; }
      for (let y = 0; y < h; y++) { sharp[y*w] = gray[y*w]; sharp[y*w+w-1] = gray[y*w+w-1]; }

      // Write back
      for (let i = 0; i < sharp.length; i++) {
        d[i*4] = d[i*4+1] = d[i*4+2] = sharp[i]; d[i*4+3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      resolve(cv.toDataURL("image/png"));
    };
    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

// ─── Multi-column menu text parser ───────────────────────────────────────────
function parseMenuText(rawText) {
  const lines = rawText.split("\n").map(l => l.trim()).filter(l => l.length > 1);
  const results = [];

  // ── Noise rejection — multi-signal filter tuned for restaurant menus ───────
  // Whitelisted food words are ALWAYS trusted even if other signals look noisy.
  const FOOD_WORDS = /^(veg|paneer|chicken|momo|burger|fries|pizza|pasta|naan|roti|rice|biryani|lassi|chai|tea|coffee|juice|steam|fried|afghani|kurkure|chipotle|simply|classic|cheesy|salted|peri|just|cheese|tikka|tandoor|kebab|masala|wrap|sandwich|roll|curry|dal|palak|aloo|gobi|mushroom|gulab|kulfi|halwa|shake|soda|water|lemon|soup|salad|starter|dessert|special|combo|platter|non)$/i;

  const isGarbage = (str) => {
    const words = str.trim().split(/\s+/);

    // ✅ Whitelist: any known food word → always keep
    if (words.some(w => FOOD_WORDS.test(w))) return false;

    // 🚫 Single-letter words that aren't a/I/&
    if (words.some(w => w.length === 1 && !/^[aAiI&]$/.test(w))) return true;

    // 🚫 Two or more tiny words (≤2 chars, not common short words)
    const tiny = words.filter(w => w.length <= 2 && !/^(a|I|or|of|on|in|&|kg|pc|ml)$/i.test(w));
    if (tiny.length >= 2) return true;

    // 🚫 Any word with zero vowels and length ≥ 2 (OCR fragments like "Ps", "fs", "UE")
    if (words.some(w => w.length >= 2 && !/[aeiouAEIOU]/.test(w))) return true;

    // 🚫 Low vowel ratio across the whole name
    const letters = str.replace(/[^a-zA-Z]/g, "");
    const vowels  = (letters.match(/[aeiouAEIOU]/g) || []).length;
    if (letters.length > 5 && vowels / letters.length < 0.18) return true;

    // 🚫 Long unbroken uppercase run = logo / decorative text
    if (/[A-Z]{6,}/.test(str.replace(/\s/g, ""))) return true;

    // 🚫 All words ≤ 3 chars = likely OCR fragments
    if (words.every(w => w.length <= 3) && words.length >= 2) return true;

    return false;
  };

  // ── Column label detection — scans ALL lines, not just first 10 ──────────
  // This handles menus where section headers appear mid-page (like yours)
  const fullText = lines.join(" ");
  let detectedLabels = null;
  const labelPatterns = [
    { re: /\bhalf\b.{0,20}\bfull\b/i,              labels: ["Regular", "Medium"] },  // Half→Regular, Full→Medium
    { re: /\bsmall\b.{0,20}\bmedium\b.{0,20}\blarge\b/i, labels: ["Small","Medium","Large"] },
    { re: /\bregular\b.{0,20}\bmedium\b.{0,20}\blarge\b/i, labels: ["Regular","Medium","Large"] },
    { re: /\bsmall\b.{0,20}\blarge\b/i,            labels: ["Small", "Large"] },
    { re: /\bregular\b.{0,20}\blarge\b/i,          labels: ["Regular", "Large"] },
    { re: /\bmini\b.{0,20}\bfull\b/i,              labels: ["Mini", "Full"] },
    { re: /\bregular\b.{0,20}\bmeal\b/i,           labels: ["Regular", "Meal"] },
    { re: /\bsingle\b.{0,20}\bdouble\b/i,          labels: ["Single", "Double"] },
    { re: /\b6\s*pc\b.{0,20}\b12\s*pc\b/i,        labels: ["6pc", "12pc"] },
  ];
  for (const p of labelPatterns) {
    if (p.re.test(fullText)) { detectedLabels = p.labels; break; }
  }

  // ── Section header tracker — gives each item its category context ─────────
  // When OCR reads "VEG BURGERS" or "French Fries" as a standalone line,
  // we use it to tag subsequent items instead of treating it as an item itself.
  const sectionCategoryMap = {
    "veg burger": "Burger", "burger": "Burger",
    "veg momo":   "Snacks", "momo":   "Snacks",
    "french fries":"Sides", "fries":  "Sides",
    "starter":    "Starter","starters":"Starter",
    "main":       "Main",
    "pizza":      "Pizza",
    "pasta":      "Pasta",
    "drink":      "Drink", "drinks": "Drink", "beverages": "Drink",
    "dessert":    "Dessert","desserts":"Dessert","sweets":"Dessert",
    "bread":      "Bread",
    "rice":       "Rice",
    "non.?veg":   "Non-Veg","chicken":"Non-Veg",
    "snack":      "Snacks", "snacks": "Snacks",
    "sides":      "Sides",
  };
  let currentSectionCategory = null;

  const isSectionHeader = (line) => {
    const clean = line.replace(/[^a-zA-Z\s]/g, "").trim().toLowerCase();
    if (clean.length < 3 || clean.length > 40) return false;
    for (const key of Object.keys(sectionCategoryMap)) {
      if (new RegExp(`\\b${key}\\b`).test(clean)) return true;
    }
    return false;
  };

  const getSectionCategory = (line) => {
    const clean = line.replace(/[^a-zA-Z\s]/g, "").trim().toLowerCase();
    for (const [key, cat] of Object.entries(sectionCategoryMap)) {
      if (new RegExp(`\\b${key}\\b`).test(clean)) return cat;
    }
    return null;
  };

  // ── Item name → category guesser (fallback if no section header seen) ─────
  const guessCategory = (name) => {
    if (currentSectionCategory) return currentSectionCategory;
    const n = name.toLowerCase();
    if (/burger|sandwich|wrap|sub/.test(n))  return "Burger";
    if (/momo|dumpling/.test(n))             return "Snacks";
    if (/pizza/.test(n))                     return "Pizza";
    if (/fries|wedges|nugget/.test(n))       return "Sides";
    if (/pasta|noodle|maggi/.test(n))        return "Pasta";
    if (/chicken|mutton|fish|prawn|seekh|kebab|tikka|tandoor/.test(n)) return "Non-Veg";
    if (/paneer|tofu|dal|palak|aloo|gobi|mushroom/.test(n)) return "Main";
    if (/naan|roti|paratha|kulcha|puri/.test(n)) return "Bread";
    if (/rice|biryani|pulao/.test(n))        return "Rice";
    if (/lassi|chai|tea|coffee|juice|soda|shake/.test(n)) return "Drink";
    if (/gulab|kheer|halwa|ice.?cream|kulfi/.test(n)) return "Dessert";
    return "Main";
  };

  // ── Words that mark a line as NOT a menu item ─────────────────────────────
  // Expanded significantly to catch OCR noise headers
  const skipLineRe = /^(menu|half|full|regular|large|small|medium|meal|size|price|item|name|category|qty|tax|total|subtotal|gst|inclusive|exclusive|note|chef|welcome|enjoy|call|order|contact|phone|address|email|www|http|veg\s+burgers?|veg\s+momos?|french\s+fries|snacks?|starters?|mains?|drinks?|desserts?|breads?|sides?|pizza|pasta|beverages?)$/i;

  // Price regex — matches: 40/- | ₹40 | Rs 40 | 40.00 | plain 40
  const priceRe = /(?:₹|Rs\.?\s*)?(\d{2,4})(?:\.\d{0,2})?\s*(?:\/-)?/g;

  for (const line of lines) {

    // Check if this line is a section header — update context, skip as item
    if (isSectionHeader(line)) {
      const cat = getSectionCategory(line);
      if (cat) currentSectionCategory = cat;
      continue;
    }

    // Extract all prices from this line
    const prices = [];
    let m;
    const re = new RegExp(priceRe.source, "g");
    while ((m = re.exec(line)) !== null) {
      const p = parseInt(m[1]);
      if (p >= 20 && p <= 3000) prices.push({ val: p, idx: m.index });
    }
    if (prices.length === 0) continue;

    // Extract item name = everything before first price
    let name = line.slice(0, prices[0].idx).trim();
    name = name.replace(/^[\d\.\-–•*+|\\]+\s*/, "").trim(); // strip leading punctuation
    name = name.replace(/[\.\-–_\s]+$/, "").trim();          // strip trailing dots/dashes
    name = name.replace(/^[^a-zA-Z]+/, "").trim();           // strip leading non-alpha

    // Hard filters
    if (name.length < 3) continue;
    if (skipLineRe.test(name.trim())) continue;
    if (isGarbage(name)) continue;                           // ← NEW: rejects noise

    // Must have at least one letter (not just numbers/symbols)
    if (!/[a-zA-Z]{2,}/.test(name)) continue;

    // The name part should have reasonable word count (1–6 words for menu items)
    const wordCount = name.trim().split(/\s+/).length;
    if (wordCount > 7) continue;                             // ← rejects long OCR garble

    if (prices.length === 1) {
      if (!results.find(r => r.name.toLowerCase() === name.toLowerCase())) {
        results.push({ name, category: guessCategory(name), price: prices[0].val });
      }
    } else {
      // Multi-price line → one entry per column
      const labels = detectedLabels ||
        prices.map((_, i) => ["Regular","Medium","Large","XL"][i] || `Size ${i+1}`);
      prices.forEach((p, i) => {
        const label    = labels[i] || `Size ${i+1}`;
        const fullName = `${name} (${label})`;
        if (!results.find(r => r.name.toLowerCase() === fullName.toLowerCase())) {
          results.push({ name: fullName, category: guessCategory(name), price: p.val });
        }
      });
    }
  }

  return results;
}

// ─── Page: Menu Manager ───────────────────────────────────────────────────────
function MenuPage({ menu, setMenu, toast }) {
  // Restore uploaded images/PDFs from localStorage so they persist after refresh
  const [mediaItems, setMediaItems] = useState(() => {
    try {
      return DB.get("mediaItems", []).map(m => ({ ...m, ocrDone: true }));
    } catch { return []; }
  });
  const [showCam,    setShowCam]    = useState(false);
  const [camStream,  setCamStream]  = useState(null);
  const [flashOn,    setFlashOn]    = useState(false);
  const [drag,       setDrag]       = useState(false);
  const [ocrItems,   setOcrItems]   = useState([]);
  const [ocrRawText, setOcrRawText] = useState("");
  const [showRaw,    setShowRaw]    = useState(false);
  const [form,       setForm]       = useState({ name:"", category:"", price:"" });
  const videoRef    = useRef(null);
  const imgInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  // Persist media items on every change (strip rawText blob to save space)
  useEffect(() => {
    DB.set("mediaItems", mediaItems.map(({ rawText, ...r }) => r));
  }, [mediaItems]);

  // ── Common OCR misread corrections (restaurant domain) ─────────────────────
  const fixOcrText = (t) => t
    .replace(/\b0(?=[a-zA-Z])/g, "O")
    .replace(/(?<=[a-zA-Z])0\b/g, "o")
    .replace(/\bl\b/g, "1")
    .replace(/(?<=\d)l(?=\d)/g, "1")
    .replace(/(?<=\s)I(?=\s)/g, "1")
    .replace(/\bVVeg\b/gi, "Veg")
    .replace(/\bPanear\b/gi, "Paneer")
    .replace(/\bPaneer\s+Tikk[ae]\b/gi, "Paneer Tikka")
    .replace(/\bBiryam\b/gi, "Biryani")
    .replace(/\bBuger\b/gi, "Burger")
    .replace(/\bBurqer\b/gi, "Burger")
    .replace(/\bCheeze\b/gi, "Cheese")
    .replace(/\bChiken\b/gi, "Chicken")
    .replace(/\bNann?\b/gi, "Naan")
    .replace(/\bMom[o0]\b/gi, "Momo")
    .replace(/\bFrise\b/gi, "Fries")
    .replace(/\bFri[e3]s\b/gi, "Fries")
    .replace(/\bChiopt[eo]l[e3]\b/gi, "Chipotle")
    .replace(/\bS[il1]mply\b/gi, "Simply")
    .replace(/\bP[ae]n[ae]{1,2}r\b/gi, "Paneer")
    .replace(/\bAfgh[ae]n[il1]\b/gi, "Afghani")
    .replace(/\bKurku[re][e]?\b/gi, "Kurkure")
    .replace(/\bP[e3]r[il1]\s+P[e3]r[il1]\b/gi, "Peri Peri")
    .replace(/\bS[a4]lt[e3]d\b/gi, "Salted")
    .replace(/(\d)\s*[|l]\s*-/g, "$1/-")
    .replace(/(\d)\s*\/\s*\-/g, "$1/-")
    .replace(/Rs\s*\.\s*/gi, "Rs.")
    .replace(/([a-zA-Z])\s*[|_]\s*([a-zA-Z])/g, "$1 $2")
    // Remove lines that are ALL CAPS and have no prices (likely decorative headers)
    .split("\n").map(line => {
      const noPrice = !/\d{2,4}/.test(line);
      const allCaps = line.length > 3 && line === line.toUpperCase() && /[A-Z]{3,}/.test(line);
      return (noPrice && allCaps) ? "" : line;
    }).join("\n");

  // ── OCR: primary pass + smart fallback ────────────────────────────────────
  const runOCR = async (id, imageSrc) => {
    await loadTesseract();
    const { createWorker } = window.Tesseract;

    // Preprocess once — clean greyscale + contrast + mild sharpen
    let processed = imageSrc;
    try { processed = await preprocessImageForOCR(imageSrc); } catch {}

    const worker = await createWorker("eng", 1, { logger: () => {} });
    const params = {
      // PSM 6 = uniform block of text — most reliable for menu cards
      tessedit_pageseg_mode: "6",
      // Whitelist keeps only chars that appear in menus
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\u20b9/-.,()'& ",
      preserve_interword_spaces: "1",
    };

    let primaryText = "";
    let fallbackText = "";

    try {
      // Primary pass — PSM 6 on preprocessed image
      await worker.setParameters(params);
      primaryText = (await worker.recognize(processed)).data.text;

      // Only run a second pass if primary found very few prices
      // (indicates dark/inverted background like the French Fries section)
      const priceCount = (primaryText.match(/\d{2,4}\s*\/-/g) || []).length;
      if (priceCount < 3) {
        // Inverted pass: flips pixel values — recovers white-text-on-dark-photo sections
        const inverted = await new Promise((res) => {
          const img2 = new Image();
          img2.onload = () => {
            const cv2  = document.createElement("canvas");
            cv2.width  = img2.width; cv2.height = img2.height;
            const ctx2 = cv2.getContext("2d");
            ctx2.drawImage(img2, 0, 0);
            const id2 = ctx2.getImageData(0, 0, cv2.width, cv2.height);
            for (let i = 0; i < id2.data.length; i += 4) {
              id2.data[i]   = 255 - id2.data[i];
              id2.data[i+1] = 255 - id2.data[i+1];
              id2.data[i+2] = 255 - id2.data[i+2];
            }
            ctx2.putImageData(id2, 0, 0);
            res(cv2.toDataURL("image/png"));
          };
          img2.onerror = () => res(processed);
          img2.src = processed;
        });
        await worker.setParameters({ ...params, tessedit_pageseg_mode: "6" });
        fallbackText = (await worker.recognize(inverted)).data.text;
      }
    } catch {
      toast("OCR failed — try better lighting or a flatter photo");
    } finally {
      await worker.terminate();
    }

    // Use whichever text has more price hits; merge unique lines from both
    const countPrices = (t) => (t.match(/\d{2,4}\s*\/-/g) || []).length;
    const primary  = fixOcrText(countPrices(primaryText) >= countPrices(fallbackText)
      ? primaryText : fallbackText);
    const secondary = fixOcrText(primary === fixOcrText(primaryText) ? fallbackText : primaryText);

    // Merge: take all lines from primary, then add unique lines from secondary
    const primaryLines   = primary.split("\n").map(l => l.trim()).filter(Boolean);
    const secondaryLines = secondary.split("\n").map(l => l.trim()).filter(Boolean);
    const seen = new Set(primaryLines.map(l => l.toLowerCase()));
    const merged = [
      ...primaryLines,
      ...secondaryLines.filter(l => !seen.has(l.toLowerCase())),
    ].join("\n");

    setMediaItems(prev => prev.map(m =>
      m.id === id ? { ...m, ocrDone: true, rawText: primary } : m
    ));
    setOcrRawText(prev => prev + (prev ? "\n\n--- new scan ---\n\n" : "") + primary);

    const parsed = parseMenuText(merged);
    if (parsed.length === 0) {
      toast("No items found — check lighting, avoid glare, keep menu flat");
    } else {
      setOcrItems(prev => {
        const existing = new Set(prev.map(i => i.name.toLowerCase()));
        return [...prev, ...parsed.filter(p => !existing.has(p.name.toLowerCase()))];
      });
      toast(`✓ OCR found ${parsed.length} item${parsed.length > 1 ? "s" : ""} — review & edit below`);
    }
  };

  const addMedia = (type, src, name) => {
    const id = generateId();
    setMediaItems(prev => [...prev, { id, type, src, name, ocrDone:false, ts:Date.now() }]);
    if (type === "image" && src) runOCR(id, src);
    else {
      // PDF: no browser-side OCR without a server; mark done and guide user
      setTimeout(() => {
        setMediaItems(prev => prev.map(m => m.id === id ? { ...m, ocrDone:true } : m));
        toast("PDF uploaded — OCR works on images; please export PDF pages as images for best results");
      }, 1000);
    }
  };

  const removeMedia = (id) => setMediaItems(prev => prev.filter(m => m.id !== id));

  const handleImageFiles = (files) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = e => addMedia("image", e.target.result, file.name);
      reader.readAsDataURL(file);
    });
    toast(`${files.length} image(s) queued for OCR`);
  };

  const handlePdfFiles = (files) => {
    Array.from(files).forEach(file => addMedia("pdf", null, file.name));
    toast(`${files.length} PDF(s) uploaded — extracting menu…`);
  };

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    const imgs = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    const pdfs = Array.from(e.dataTransfer.files).filter(f => f.type==="application/pdf" || f.name.endsWith(".pdf"));
    if (imgs.length) handleImageFiles(imgs);
    if (pdfs.length) handlePdfFiles(pdfs);
  };

  // Camera
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode:"environment", width:{ ideal:1920 }, height:{ ideal:1080 } }
      });
      setCamStream(stream); setShowCam(true);
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch { toast("Camera access denied"); }
  };

  const capturePhoto = () => {
    const cv = document.createElement("canvas");
    cv.width = videoRef.current.videoWidth; cv.height = videoRef.current.videoHeight;
    cv.getContext("2d").drawImage(videoRef.current, 0, 0);
    setFlashOn(true); setTimeout(() => setFlashOn(false), 400);
    addMedia("image", cv.toDataURL("image/jpeg", 0.95), `capture_${Date.now()}.jpg`);
    toast("Photo captured — OCR scanning…");
    // Camera stays open for another shot!
  };

  const closeCamera = () => { camStream?.getTracks().forEach(t=>t.stop()); setCamStream(null); setShowCam(false); };

  const addMenuItem = () => {
    if (!form.name || !form.price) return;
    const updated = [...menu, { id:Date.now(), name:form.name, category:form.category||"Other", price:Number(form.price) }];
    setMenu(updated); DB.set("menu", updated);
    setForm({ name:"", category:"", price:"" });
    toast("Menu item added!");
  };

  const removeMenuItem = (id) => {
    const updated = menu.filter(m => m.id !== id);
    setMenu(updated); DB.set("menu", updated);
  };

  return (
    <div style={{ overflowY:"auto", height:"calc(100vh - 80px)" }}>
      <div className="grid-2" style={{ marginBottom:20 }}>

        {/* Upload / Camera */}
        <div className="card">
          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:14, display:"flex", alignItems:"center", gap:10 }}>
            📋 Upload Menu
            <span className="ocr-pill">🔬 OCR Enabled</span>
          </div>

          {/* Live camera */}
          {showCam ? (
            <div style={{ position:"relative", borderRadius:12, overflow:"hidden", marginBottom:12, background:"#000" }}>
              <video ref={videoRef} autoPlay playsInline style={{ width:"100%", display:"block", borderRadius:12 }} />
              {flashOn && <div className="cam-flash" />}
              <div style={{ position:"absolute", bottom:14, left:0, right:0, display:"flex", justifyContent:"center", gap:10 }}>
                <button className="btn btn-primary" onClick={capturePhoto}>📷 Capture</button>
                <button onClick={closeCamera} style={{ background:"#000000aa", border:"none", color:"#fff", borderRadius:10, padding:"10px 16px", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>✕ Done</button>
              </div>
              <div style={{ position:"absolute", top:10, right:10, background:"#000000aa", borderRadius:100, padding:"4px 12px", fontSize:12, color:"#fff" }}>
                {mediaItems.length} captured
              </div>
            </div>
          ) : (
            <div className={`drop-zone ${drag?"drag":""}`}
              onDragOver={e => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={handleDrop}
              onClick={() => imgInputRef.current.click()}>
              <input ref={imgInputRef} type="file" accept="image/*" multiple hidden onChange={e => handleImageFiles(e.target.files)} />
              <div style={{ fontSize:40, marginBottom:10 }}>🖼️</div>
              <div style={{ fontWeight:600, marginBottom:4 }}>Drop menu photos here</div>
              <div style={{ fontSize:12, color:"var(--muted)" }}>Multiple images supported · drag & drop or click · OCR detects prices</div>
            </div>
          )}

          <div style={{ display:"flex", gap:8, marginTop:12, flexWrap:"wrap" }}>
            <button className="btn btn-secondary" style={{ flex:1 }} onClick={showCam ? closeCamera : openCamera}>
              {showCam ? "✕ Close Camera" : "📷 Camera"}
            </button>
            <button className="btn btn-secondary" style={{ flex:1 }} onClick={() => pdfInputRef.current.click()}>
              📄 Upload PDF(s)
            </button>
            <input ref={pdfInputRef} type="file" accept=".pdf,application/pdf" multiple hidden onChange={e => handlePdfFiles(e.target.files)} />
            {mediaItems.length > 0 && (
              <button className="btn btn-ghost" title="Clear all" onClick={() => { setMediaItems([]); setOcrItems([]); }}>🗑</button>
            )}
          </div>

          {/* ── Recent Uploads — always visible, persists across sessions ── */}
          <div style={{ marginTop:16, borderTop:"1px solid var(--border)", paddingTop:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontSize:11, color:"var(--muted)", fontWeight:700, textTransform:"uppercase", letterSpacing:".06em" }}>
                🕓 Recent Uploads {mediaItems.length > 0 && `(${mediaItems.length})`}
              </div>
              {mediaItems.length > 0 && (
                <button className="btn btn-ghost" style={{ padding:"2px 10px", fontSize:11 }} title="Clear all uploads"
                  onClick={() => { setMediaItems([]); setOcrItems([]); setOcrRawText(""); }}>
                  🗑 Clear all
                </button>
              )}
            </div>

            {mediaItems.length === 0 ? (
              <div style={{ textAlign:"center", padding:"18px 0", color:"var(--muted)", fontSize:13 }}>
                <div style={{ fontSize:28, marginBottom:6 }}>📂</div>
                No uploads yet — captured photos &amp; PDFs will appear here
              </div>
            ) : (
              <div className="media-gallery">
                {mediaItems.map(m => (
                  <div key={m.id} className="media-thumb">
                    {m.type === "image"
                      ? <img src={m.src} alt="menu scan" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : <div className="pdf-badge">
                          <span style={{ fontSize:28 }}>📄</span>
                          <span style={{ wordBreak:"break-all", fontSize:10, textAlign:"center", padding:"0 4px" }}>
                            {m.name.slice(0, 20)}
                          </span>
                        </div>
                    }
                    {/* Status bar */}
                    <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"3px 6px",
                      background: m.ocrDone ? "#06d6a0cc" : "#000000cc",
                      fontSize:9, textAlign:"center", color:"#fff",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:4 }}>
                      {m.ocrDone
                        ? "✓ Done"
                        : <><div style={{ width:7, height:7, border:"1.5px solid #fff", borderTopColor:"transparent", borderRadius:"50%", animation:"spin .6s linear infinite" }} /> Scanning…</>
                      }
                    </div>
                    {/* Timestamp badge */}
                    {m.ts && (
                      <div style={{ position:"absolute", top:4, left:4, background:"#000000bb",
                        borderRadius:4, padding:"1px 5px", fontSize:9, color:"#ffffffcc" }}>
                        {new Date(m.ts).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
                      </div>
                    )}
                    <button className="remove-btn" onClick={() => removeMedia(m.id)}>✕</button>
                  </div>
                ))}
                {/* Add-more tile */}
                <button className="media-add-btn" onClick={() => imgInputRef.current.click()}>
                  <span style={{ fontSize:22 }}>＋</span>
                  <span style={{ fontSize:10 }}>Add photo</span>
                </button>
              </div>
            )}
          </div>

          {/* OCR detected items — editable before adding */}
          {ocrItems.length > 0 && (
            <div style={{ marginTop:14, borderTop:"1px solid var(--border)", paddingTop:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--accent4)", textTransform:"uppercase", letterSpacing:".06em" }}>
                  🔬 OCR Detected ({ocrItems.length}) — edit & add
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button className="btn btn-ghost" style={{ padding:"3px 10px", fontSize:11 }} onClick={() => setShowRaw(v => !v)}>
                    {showRaw ? "Hide" : "Raw text"}
                  </button>
                  <button className="btn btn-success" style={{ padding:"3px 10px", fontSize:11 }} onClick={() => {
                    ocrItems.forEach(item => setMenu(prev => [...prev, { ...item, id:Date.now() + Math.random() }]));
                    setOcrItems([]);
                    toast("All detected items added!");
                  }}>+ Add All</button>
                </div>
              </div>

              {showRaw && (
                <textarea readOnly value={ocrRawText}
                  style={{ width:"100%", height:120, background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:8, color:"var(--muted)", fontSize:11, fontFamily:"monospace", padding:10, marginBottom:10, resize:"vertical" }} />
              )}

              {ocrItems.map((item, i) => (
                <OcrItemRow key={i} item={item}
                  onAdd={(edited) => {
                    setMenu(prev => [...prev, { ...edited, id:Date.now() }]);
                    setOcrItems(prev => prev.filter((_, j) => j !== i));
                    toast(`"${edited.name}" added!`);
                  }}
                  onDismiss={() => setOcrItems(prev => prev.filter((_, j) => j !== i))}
                />
              ))}
            </div>
          )}
        </div>

        {/* Manual add */}
        <div className="card">
          <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:16 }}>➕ Add Menu Item</div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <input className="input" placeholder="Item name" value={form.name} onChange={e => setForm({ ...form, name:e.target.value })} />
            <input className="input" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category:e.target.value })} />
            <input className="input" placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm({ ...form, price:e.target.value })} />
            <button className="btn btn-primary" style={{ justifyContent:"center" }} onClick={addMenuItem}>Add to Menu</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:16 }}>
          Current Menu <span style={{ fontSize:14, color:"var(--muted)", fontFamily:"DM Sans", fontWeight:400 }}>({menu.length} items)</span>
        </div>
        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th></th></tr></thead>
          <tbody>
            {menu.map(item => (
              <tr key={item.id}>
                <td style={{ fontWeight:500 }}>{item.name}</td>
                <td><span className="badge" style={{ background:"var(--surface2)", color:"var(--muted)" }}>{item.category}</span></td>
                <td style={{ fontFamily:"Syne", fontWeight:700 }}>{fmt(item.price)}</td>
                <td><button className="btn btn-danger" style={{ padding:"4px 10px", fontSize:12 }} onClick={() => removeMenuItem(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page: Analytics ─────────────────────────────────────────────────────────
function AnalyticsPage({ orders }) {
  const byType = CUSTOMER_TYPES.map(ct => {
    const typeOrders = orders.filter(o => o.customerType === ct.id);
    const items = {};
    typeOrders.forEach(o => o.items.forEach(it => { items[it.name] = (items[it.name]||0) + it.qty; }));
    const top     = Object.entries(items).sort((a,b) => b[1]-a[1]).slice(0,3);
    const revenue = typeOrders.reduce((s,o) => s+o.total, 0);
    const avg     = typeOrders.length ? Math.round(revenue/typeOrders.length) : 0;
    return { ...ct, count:typeOrders.length, revenue, avg, top };
  });

  return (
    <div style={{ overflowY:"auto", height:"calc(100vh - 80px)" }}>
      <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:24, marginBottom:20 }}>Customer Analytics</div>
      <div className="grid-2">
        {byType.map(ct => (
          <div key={ct.id} className="card card-hover fade-up" style={{ borderTop:`3px solid ${ct.color}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <span style={{ fontSize:32 }}>{ct.emoji}</span>
              <div>
                <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:18 }}>{ct.label}</div>
                <span className="badge" style={{ background:ct.color+"20", color:ct.color }}>{ct.count} orders</span>
              </div>
            </div>
            <div className="grid-2" style={{ marginBottom:16, gap:10 }}>
              {[{ l:"Revenue", v:fmt(ct.revenue), c:ct.color },{ l:"Avg Spend", v:fmt(ct.avg), c:"var(--text)" }].map(s => (
                <div key={s.l} style={{ background:"var(--surface2)", borderRadius:10, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".05em", marginBottom:4 }}>{s.l}</div>
                  <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, color:s.c }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".05em", marginBottom:8 }}>Top Picks</div>
            {ct.top.length === 0
              ? <div style={{ fontSize:13, color:"var(--muted)" }}>No orders yet</div>
              : ct.top.map(([name,qty],i) => (
                  <div key={name} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid var(--border)", fontSize:13 }}>
                    <span>{["🥇","🥈","🥉"][i]} {name}</span>
                    <span style={{ color:"var(--muted)" }}>{qty} ordered</span>
                  </div>
                ))
            }
          </div>
        ))}
      </div>
      {orders.length > 0 && (() => {
        const top = [...byType].sort((a,b) => b.revenue-a.revenue)[0];
        return (
          <div style={{ background:top.color+"15", border:`1px solid ${top.color}30`, borderRadius:14, padding:20, marginTop:20, display:"flex", gap:16, alignItems:"center" }}>
            <span style={{ fontSize:36 }}>💡</span>
            <div>
              <div style={{ fontFamily:"Syne", fontWeight:700, fontSize:16, marginBottom:4 }}>Top Insight</div>
              <div style={{ fontSize:14, color:"var(--muted)" }}>
                Your <strong style={{ color:top.color }}>{top.emoji} {top.label}</strong> customers generate the most revenue at <strong>{fmt(top.revenue)}</strong>.
                {top.top[0] && ` Their favorite is "${top.top[0][0]}".`}
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
  { id:"order",     label:"Take Order", icon:"🍽️" },
  { id:"sales",     label:"Sales",      icon:"📈" },
  { id:"analytics", label:"Analytics",  icon:"📊" },
  { id:"menu",      label:"Menu",       icon:"📋" },
];

export default function App() {
  const [page,     setPage]     = useState("order");
  const [orders,   setOrders]   = useState(() => DB.get("orders", []));
  const [menu,     setMenu]     = useState(() => DB.get("menu", SAMPLE_MENU));
  const [toastMsg, setToastMsg] = useState(null);
  const toast = useCallback((msg) => setToastMsg(msg), []);

  return (
    <>
      <FontLink />
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column" }}>
        <header style={{ padding:"16px 24px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", background:"var(--bg)", position:"sticky", top:0, zIndex:100 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"var(--accent)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🍴</div>
            <div>
              <div style={{ fontFamily:"Syne", fontWeight:800, fontSize:18, lineHeight:1 }}>RestroTrack</div>
              <div style={{ fontSize:11, color:"var(--muted)" }}>Restaurant Management</div>
            </div>
          </div>
          <nav className="nav" style={{ maxWidth:520 }}>
            {PAGES.map(p => (
              <button key={p.id} className={`nav-item ${page===p.id?"active":""}`} onClick={() => setPage(p.id)}>
                <span>{p.icon}</span>
                <span style={{ display:window.innerWidth<500?"none":undefined }}>{p.label}</span>
              </button>
            ))}
          </nav>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:13, fontWeight:600 }}>{orders.length} orders</div>
            <div style={{ fontSize:11, color:"var(--muted)" }}>{new Date().toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"})}</div>
          </div>
        </header>

        <main style={{ flex:1, padding:"20px 24px" }}>
          {page==="order"     && <TakeOrderPage menu={menu} orders={orders} setOrders={setOrders} toast={toast} />}
          {page==="sales"     && <SalesPage orders={orders} />}
          {page==="analytics" && <AnalyticsPage orders={orders} />}
          {page==="menu"      && <MenuPage menu={menu} setMenu={setMenu} toast={toast} />}
        </main>
      </div>
      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg(null)} />}
    </>
  );
}
