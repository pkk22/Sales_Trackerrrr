import { useState, useEffect, useRef, useCallback } from "react";

// ─── Fonts ──────────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    :root{
      --bg:#0a0a0f;
      --surface:#111118;
      --surface2:#1a1a26;
      --border:#ffffff12;
      --accent:#ff6b35;
      --accent2:#ffd166;
      --accent3:#06d6a0;
      --accent4:#8b5cf6;
      --text:#f0f0f8;
      --muted:#7878a0;
      --danger:#ef4444;
      --r:14px;
    }
    body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;}
    h1,h2,h3,.brand{font-family:'Syne',sans-serif;}

    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}

    @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
    @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.5;}}
    @keyframes spin{to{transform:rotate(360deg);}}
    @keyframes ripple{0%{transform:scale(0);opacity:1;}100%{transform:scale(4);opacity:0;}}
    @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
    @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
    @keyframes checkPop{0%{transform:scale(0) rotate(-10deg);opacity:0;}60%{transform:scale(1.2) rotate(3deg);}100%{transform:scale(1) rotate(0deg);opacity:1;}}
    @keyframes slideFade{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);}}

    .fade-up{animation:fadeUp .4s ease forwards;}

    .card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;}
    .card-hover{transition:border-color .2s,transform .2s;}
    .card-hover:hover{border-color:#ffffff22;transform:translateY(-2px);}

    .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s;}
    .btn-primary{background:var(--accent);color:#fff;}
    .btn-primary:hover{background:#e55a24;}
    .btn-secondary{background:var(--surface2);color:var(--text);border:1px solid var(--border);}
    .btn-secondary:hover{background:#22222e;}
    .btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border);}
    .btn-ghost:hover{color:var(--text);border-color:#ffffff22;}
    .btn-danger{background:#1f1020;color:var(--danger);border:1px solid #ef444430;}
    .btn-danger:hover{background:#2a1525;}
    .btn-success{background:#051f17;color:var(--accent3);border:1px solid #06d6a030;}
    .btn-success:hover{background:#082b20;}
    .btn-finish{background:linear-gradient(135deg,#06d6a0,#04b585);color:#fff;border:none;font-weight:700;letter-spacing:.03em;}
    .btn-finish:hover{filter:brightness(1.1);}

    .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:100px;font-size:12px;font-weight:500;}

    .input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:10px 14px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
    .input:focus{border-color:#ff6b3550;}
    .input::placeholder{color:var(--muted);}

    .chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;font-size:13px;border:1px solid var(--border);background:var(--surface2);cursor:pointer;transition:all .2s;}
    .chip.active{border-color:var(--accent);background:#ff6b3515;color:var(--accent);}

    .progress-bar{height:6px;background:var(--surface2);border-radius:3px;overflow:hidden;}
    .progress-fill{height:100%;border-radius:3px;transition:width .6s ease;}

    .nav{display:flex;gap:2px;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:4px;}
    .nav-item{flex:1;padding:8px 12px;border-radius:9px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;text-align:center;color:var(--muted);display:flex;align-items:center;justify-content:center;gap:6px;border:none;background:transparent;font-family:'DM Sans',sans-serif;}
    .nav-item.active{background:var(--surface2);color:var(--text);}
    .nav-item:hover:not(.active){color:var(--text);}

    .mic-btn{width:72px;height:72px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:28px;position:relative;transition:all .2s;}
    .mic-btn.idle{background:var(--surface2);border:2px solid var(--border);}
    .mic-btn.idle:hover{border-color:var(--accent);}
    .mic-btn.recording{background:#ff6b35;border:2px solid #ff6b35;}
    .mic-btn.recording::after{content:'';position:absolute;inset:-8px;border-radius:50%;border:2px solid #ff6b3560;animation:ripple 1.5s ease infinite;}

    .order-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px;transition:all .2s;animation:fadeUp .3s ease;}
    .order-card:hover{border-color:#ffffff20;}
    .active-order-card{border-left:3px solid var(--accent);}
    .finished-order-card{border-left:3px solid var(--accent3);opacity:.8;}

    .stat{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;}

    .table{width:100%;border-collapse:collapse;}
    .table th{text-align:left;padding:10px 14px;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid var(--border);}
    .table td{padding:12px 14px;font-size:14px;border-bottom:1px solid var(--border);}
    .table tr:last-child td{border-bottom:none;}
    .table tr:hover td{background:#ffffff04;}

    .drop-zone{border:2px dashed var(--border);border-radius:var(--r);padding:40px;text-align:center;cursor:pointer;transition:all .2s;}
    .drop-zone:hover,.drop-zone.drag{border-color:var(--accent);background:#ff6b3508;}
    .drop-zone.pdf-success{border-color:var(--accent3);background:#06d6a010;}

    .rec-dot{width:8px;height:8px;border-radius:50%;background:var(--danger);animation:blink 1s infinite;}

    .shimmer{background:linear-gradient(90deg,var(--surface) 25%,var(--surface2) 50%,var(--surface) 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;border-radius:6px;}

    .toast{position:fixed;bottom:24px;right:24px;background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:12px 20px;font-size:14px;z-index:1000;animation:fadeUp .3s ease;display:flex;align-items:center;gap:10px;}

    .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
    .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
    @media(max-width:768px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr;}}

    .scroll-y{overflow-y:auto;max-height:calc(100vh - 200px);}

    .donut-wrap{position:relative;width:140px;height:140px;margin:0 auto;}
    .donut-wrap svg{transform:rotate(-90deg);}
    .donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}

    .check-anim{animation:checkPop .5s cubic-bezier(.34,1.56,.64,1) forwards;}
    .slide-fade{animation:slideFade .35s ease forwards;}

    .orders-columns{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
    @media(max-width:900px){.orders-columns{grid-template-columns:1fr;}}

    .col-header{display:flex;align-items:center;gap:8px;margin-bottom:14px;}
    .col-dot{width:10px;height:10px;border-radius:50%;}

    .pdf-success-icon{font-size:48px;animation:checkPop .5s cubic-bezier(.34,1.56,.64,1) forwards;}
    .ocr-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:100px;font-size:12px;background:#8b5cf620;color:var(--accent4);border:1px solid #8b5cf630;}
  `}</style>
);

// ─── Constants ───────────────────────────────────────────────────────────────
const CUSTOMER_TYPES = [
  { id: "single", label: "Solo", emoji: "🧍", color: "#8b5cf6" },
  { id: "couple", label: "Couple", emoji: "👫", color: "#ec4899" },
  { id: "family", label: "Family", emoji: "👨‍👩‍👧", color: "#f59e0b" },
  { id: "friends", label: "Friends", emoji: "👥", color: "#06d6a0" },
];

const SAMPLE_MENU = [
  { id: 1, name: "Butter Chicken", category: "Main", price: 280 },
  { id: 2, name: "Paneer Tikka", category: "Starter", price: 220 },
  { id: 3, name: "Dal Makhani", category: "Main", price: 180 },
  { id: 4, name: "Garlic Naan", category: "Bread", price: 60 },
  { id: 5, name: "Biryani", category: "Main", price: 320 },
  { id: 6, name: "Mango Lassi", category: "Drink", price: 90 },
  { id: 7, name: "Gulab Jamun", category: "Dessert", price: 80 },
  { id: 8, name: "Masala Chai", category: "Drink", price: 40 },
  { id: 9, name: "Tandoori Chicken", category: "Starter", price: 350 },
  { id: 10, name: "Palak Paneer", category: "Main", price: 200 },
];

const generateId = () => Math.random().toString(36).slice(2, 9);
const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
const fmtDate = (d) => new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

// ─── Local Storage Backend ────────────────────────────────────────────────────
const DB = {
  get: (key, fallback) => {
    try {
      const raw = localStorage.getItem(`restrotrack_${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set: (key, val) => {
    try { localStorage.setItem(`restrotrack_${key}`, JSON.stringify(val)); } catch {}
  },
};

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div className="toast">
      <span style={{ fontSize: 16 }}>✓</span> {msg}
    </div>
  );
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
          const el = (
            <circle key={d.id} cx={70} cy={70} r={r} fill="none"
              stroke={d.color} strokeWidth={18}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset * circ}
              style={{ transition: "stroke-dasharray .6s ease" }}
            />
          );
          offset += pct;
          return el;
        })}
      </svg>
      <div className="donut-center">
        <span style={{ fontFamily: "Syne", fontSize: 24, fontWeight: 700 }}>{total}</span>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>orders</span>
      </div>
    </div>
  );
}

// ─── Page: Take Order ─────────────────────────────────────────────────────────
function TakeOrderPage({ menu, orders, setOrders, toast }) {
  const [customerType, setCustomerType] = useState("family");
  const [tableNum, setTableNum] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [note, setNote] = useState("");
  const [micError, setMicError] = useState("");
  const recognitionRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const [noiseLevel, setNoiseLevel] = useState(0);

  const activeOrders = orders.filter((o) => o.status === "active");
  const recentOrders = orders.filter((o) => o.status === "finished");

  const filtered = menu.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase())
  );

  const addItem = (item) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.id === item.id);
      return ex ? prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) => setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c).filter((c) => c.qty > 0));

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const placeOrder = () => {
    if (!cart.length) return;
    const order = {
      id: generateId(),
      table: tableNum || "—",
      customerType,
      items: [...cart],
      total: cartTotal,
      note,
      status: "active",
      ts: Date.now(),
    };
    const updated = [order, ...orders];
    setOrders(updated);
    DB.set("orders", updated);
    setCart([]);
    setNote("");
    setTableNum("");
    toast("Order placed successfully!");
  };

  const finishOrder = (orderId) => {
    const updated = orders.map((o) => o.id === orderId ? { ...o, status: "finished", finishedAt: Date.now() } : o);
    setOrders(updated);
    DB.set("orders", updated);
    toast("Order marked as finished!");
  };

  // Enhanced Voice with noise suppression
  const toggleMic = async () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setMicError("Speech recognition not supported in this browser");
      toast("Speech recognition not supported in this browser");
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      setTranscript("");
      if (audioCtxRef.current) { audioCtxRef.current.close(); audioCtxRef.current = null; }
      return;
    }

    setMicError("");

    // Request mic with noise suppression constraints
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 16000,
        }
      });

      // Setup analyser for visual feedback
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      src.connect(analyser);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;

      const data = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b) / data.length;
        setNoiseLevel(Math.min(100, avg * 2));
        requestAnimationFrame(tick);
      };
      tick();
    } catch (e) {
      toast("Microphone access denied");
      return;
    }

    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Rec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-IN";
    rec.maxAlternatives = 3;

    rec.onresult = (e) => {
      let finalT = "";
      let interimT = "";
      for (let i = 0; i < e.results.length; i++) {
        const res = e.results[i];
        // Use best alternative
        const best = res[0].transcript;
        if (res.isFinal) finalT += best + " ";
        else interimT += best;
      }
      const full = (finalT + interimT).toLowerCase();
      setTranscript(finalT + interimT);

      // Fuzzy keyword matching with qty detection
      menu.forEach((item) => {
        const name = item.name.toLowerCase();
        if (full.includes(name)) {
          // Check for quantity keywords
          const qtyMatch = full.match(new RegExp(`(\\d+|one|two|three|four|five)\\s+${name.replace(/\s+/g, "\\s+")}`));
          const numMap = { one: 1, two: 2, three: 3, four: 4, five: 5 };
          let qty = 1;
          if (qtyMatch) {
            const q = qtyMatch[1];
            qty = isNaN(q) ? (numMap[q] || 1) : parseInt(q);
          }
          for (let i = 0; i < qty; i++) addItem(item);
        }
      });

      // Table number detection
      const tableMatch = full.match(/table\s+(number\s+)?(\w+)/i);
      if (tableMatch) setTableNum(tableMatch[2].toUpperCase());
    };

    rec.onerror = (e) => {
      if (e.error === "no-speech") return; // non-fatal
      setMicError(`Mic error: ${e.error}`);
      setIsRecording(false);
    };

    rec.onend = () => {
      setIsRecording(false);
      setNoiseLevel(0);
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };

    rec.start();
    recognitionRef.current = rec;
    setIsRecording(true);
  };

  const categories = [...new Set(menu.map((m) => m.category))];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, height: "calc(100vh - 80px)", overflow: "hidden" }}>
      {/* Left: Menu + Current/Recent Orders */}
      <div style={{ overflowY: "auto", paddingRight: 4 }}>
        {/* Customer type + table */}
        <div className="card fade-up" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>Customer Type</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CUSTOMER_TYPES.map((ct) => (
                  <button key={ct.id} className={`chip ${customerType === ct.id ? "active" : ""}`}
                    onClick={() => setCustomerType(ct.id)}
                    style={customerType === ct.id ? { borderColor: ct.color, background: ct.color + "18", color: ct.color } : {}}>
                    {ct.emoji} {ct.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ width: 140 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>Table No.</div>
              <input className="input" placeholder="e.g. T-04" value={tableNum} onChange={(e) => setTableNum(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Voice + Search */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <button className={`mic-btn ${isRecording ? "recording" : "idle"}`} onClick={toggleMic} title={isRecording ? "Stop recording" : "Voice order (noise-cancelling)"}>
              {isRecording ? "⏹" : "🎙️"}
            </button>
            {isRecording && (
              <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 16 }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{
                    width: 3, borderRadius: 2,
                    background: "var(--accent)",
                    height: `${Math.max(4, (noiseLevel / 100) * 16 * (0.4 + Math.random() * 0.6))}px`,
                    transition: "height .1s",
                    opacity: noiseLevel > 0 ? 1 : 0.3,
                  }} />
                ))}
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <input className="input" placeholder="Search menu items…" value={search} onChange={(e) => setSearch(e.target.value)} />
            {isRecording && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, padding: "8px 12px", background: "var(--surface2)", borderRadius: 10, border: "1px solid #ff6b3530" }}>
                <div className="rec-dot" />
                <span style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>{transcript || "Listening… (noise suppression active)"}</span>
              </div>
            )}
            {micError && <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 6 }}>{micError}</div>}
          </div>
        </div>

        {/* Menu grid */}
        {categories.filter((cat) => filtered.some((m) => m.category === cat)).map((cat) => (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>{cat}</div>
            <div className="grid-2" style={{ gap: 10 }}>
              {filtered.filter((m) => m.category === cat).map((item) => {
                const inCart = cart.find((c) => c.id === item.id);
                return (
                  <div key={item.id} className="order-card card-hover" style={{ cursor: "pointer", position: "relative" }}
                    onClick={() => addItem(item)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 15, fontFamily: "Syne", fontWeight: 700, color: "var(--accent)" }}>{fmt(item.price)}</div>
                      </div>
                      {inCart && (
                        <div style={{ background: "var(--accent)", color: "#fff", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
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

        {/* ─── Current Orders & Recent Orders ─── */}
        <div className="orders-columns" style={{ marginTop: 10 }}>
          {/* Current Active Orders */}
          <div>
            <div className="col-header">
              <div className="col-dot" style={{ background: "var(--accent)" }} />
              <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>Current Orders</span>
              <span className="badge" style={{ background: "#ff6b3520", color: "var(--accent)", marginLeft: 4 }}>{activeOrders.length}</span>
            </div>
            {activeOrders.length === 0 ? (
              <div style={{ padding: "20px 0", color: "var(--muted)", fontSize: 13, textAlign: "center" }}>No active orders</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {activeOrders.map((o) => {
                  const ct = CUSTOMER_TYPES.find((c) => c.id === o.customerType);
                  return (
                    <div key={o.id} className="order-card active-order-card slide-fade">
                      {/* Header row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 16, color: "var(--accent)" }}>
                            🪑 {o.table}
                          </span>
                          <span className="badge" style={{ background: ct.color + "20", color: ct.color }}>{ct.emoji} {ct.label}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>{fmtDate(o.ts)}</span>
                      </div>
                      {/* Items table */}
                      <table className="table" style={{ marginBottom: 10 }}>
                        <thead>
                          <tr>
                            <th style={{ fontSize: 11, padding: "6px 0" }}>Item</th>
                            <th style={{ fontSize: 11, padding: "6px 0", textAlign: "center" }}>Qty</th>
                            <th style={{ fontSize: 11, padding: "6px 0", textAlign: "right" }}>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.items.map((it) => (
                            <tr key={it.id}>
                              <td style={{ fontSize: 13, padding: "5px 0" }}>{it.name}</td>
                              <td style={{ textAlign: "center", fontSize: 13, padding: "5px 0" }}>{it.qty}</td>
                              <td style={{ textAlign: "right", fontSize: 13, fontWeight: 600, padding: "5px 0" }}>{fmt(it.price * it.qty)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 16, color: "var(--accent3)" }}>{fmt(o.total)}</span>
                        <button className="btn btn-finish" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => finishOrder(o.id)}>
                          ✓ Finished
                        </button>
                      </div>
                      {o.note && <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>📝 {o.note}</div>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Finished Orders */}
          <div>
            <div className="col-header">
              <div className="col-dot" style={{ background: "var(--accent3)" }} />
              <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>Recent Orders</span>
              <span className="badge" style={{ background: "#06d6a020", color: "var(--accent3)", marginLeft: 4 }}>{recentOrders.length}</span>
            </div>
            {recentOrders.length === 0 ? (
              <div style={{ padding: "20px 0", color: "var(--muted)", fontSize: 13, textAlign: "center" }}>No finished orders yet</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {recentOrders.map((o) => {
                  const ct = CUSTOMER_TYPES.find((c) => c.id === o.customerType);
                  return (
                    <div key={o.id} className="order-card finished-order-card slide-fade">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 15, color: "var(--accent3)" }}>✓ {o.table}</span>
                          <span className="badge" style={{ background: ct.color + "20", color: ct.color }}>{ct.emoji}</span>
                        </div>
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>Done {fmtDate(o.finishedAt || o.ts)}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>
                        {o.items.map((it) => `${it.name} ×${it.qty}`).join(", ")}
                      </div>
                      <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15, color: "var(--accent3)" }}>{fmt(o.total)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Cart */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Order Cart
            {cart.length > 0 && <span style={{ fontSize: 12, background: "var(--accent)", color: "#fff", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{cart.reduce((s, c) => s + c.qty, 0)}</span>}
          </div>

          {cart.length === 0 ? (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--muted)", gap: 10 }}>
              <span style={{ fontSize: 40 }}>🍽️</span>
              <span style={{ fontSize: 14 }}>Tap items or use voice to add</span>
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)" }}>{fmt(item.price)} × {item.qty}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 16 }} onClick={() => removeItem(item.id)}>−</button>
                    <span style={{ fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 16 }} onClick={() => addItem(item)}>+</button>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, minWidth: 60, textAlign: "right" }}>{fmt(item.price * item.qty)}</div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 8 }}>
              <input className="input" placeholder="Add note (e.g. no spice)…" value={note} onChange={(e) => setNote(e.target.value)} style={{ marginBottom: 12 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ color: "var(--muted)", fontSize: 14 }}>Total</span>
                <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, color: "var(--accent)" }}>{fmt(cartTotal)}</span>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 15, fontWeight: 600 }} onClick={placeOrder}>
                Place Order →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page: Sales Dashboard ────────────────────────────────────────────────────
function SalesPage({ orders }) {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? Math.round(totalRevenue / orders.length) : 0;

  const custData = CUSTOMER_TYPES.map((ct) => ({
    ...ct,
    value: orders.filter((o) => o.customerType === ct.id).length,
  }));

  const itemCounts = {};
  orders.forEach((o) => o.items.forEach((it) => {
    itemCounts[it.name] = (itemCounts[it.name] || { count: 0, rev: 0 });
    itemCounts[it.name].count += it.qty;
    itemCounts[it.name].rev += it.price * it.qty;
  }));
  const bestSellers = Object.entries(itemCounts)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 8)
    .map(([name, d]) => ({ name, ...d }));
  const maxCount = bestSellers[0]?.count || 1;

  const now = Date.now();
  const hours = Array.from({ length: 12 }, (_, i) => {
    const h = new Date(now - (11 - i) * 3600000);
    const label = h.getHours() + ":00";
    const rev = orders.filter((o) => new Date(o.ts).getHours() === h.getHours()).reduce((s, o) => s + o.total, 0);
    return { label, rev };
  });
  const maxRev = Math.max(...hours.map((h) => h.rev), 1);

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 80px)", paddingRight: 4 }}>
      <div className="grid-4 fade-up" style={{ marginBottom: 20 }}>
        {[
          { label: "Today's Revenue", value: fmt(totalRevenue), icon: "💰", color: "var(--accent)" },
          { label: "Total Orders", value: orders.length, icon: "🧾", color: "var(--accent2)" },
          { label: "Avg Order Value", value: fmt(avgOrder), icon: "📊", color: "var(--accent3)" },
          { label: "Active Tables", value: [...new Set(orders.map((o) => o.table))].length, icon: "🪑", color: "var(--accent4)" },
        ].map((kpi) => (
          <div key={kpi.label} className="stat card-hover" style={{ animation: "fadeUp .4s ease" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{kpi.icon}</div>
            <div style={{ fontFamily: "Syne", fontSize: 26, fontWeight: 800, color: kpi.color }}>{kpi.value}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Customer Breakdown</div>
          <DonutChart data={custData} total={orders.length} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
            {custData.map((ct) => (
              <div key={ct.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>{ct.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                    <span>{ct.label}</span>
                    <span style={{ color: ct.color, fontWeight: 700 }}>{ct.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${orders.length ? (ct.value / orders.length) * 100 : 0}%`, background: ct.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Revenue Timeline</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
            {hours.map((h) => (
              <div key={h.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", background: h.rev > 0 ? "var(--accent)" : "var(--surface2)", borderRadius: "4px 4px 0 0", height: `${(h.rev / maxRev) * 100}%`, minHeight: h.rev > 0 ? 4 : 0, transition: "height .6s ease" }} />
                </div>
                <span style={{ fontSize: 10, color: "var(--muted)", whiteSpace: "nowrap" }}>{h.label}</span>
              </div>
            ))}
          </div>
          {orders.length === 0 && <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 14, marginTop: 12 }}>No orders yet to chart</div>}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🏆 Best Sellers</div>
        {bestSellers.length === 0 ? (
          <div style={{ color: "var(--muted)", fontSize: 14 }}>No sales data yet. Place some orders first!</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {bestSellers.map((item, i) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 20, color: i === 0 ? "var(--accent2)" : i === 1 ? "var(--muted)" : "var(--surface2)", minWidth: 28 }}>#{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 14 }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: "var(--muted)" }}>{item.count} sold · {fmt(item.rev)}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(item.count / maxCount) * 100}%`, background: i === 0 ? "var(--accent2)" : "var(--accent)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>All Orders</div>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th><th>Table</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--muted)", padding: 24 }}>No orders placed yet</td></tr>
              ) : orders.map((o) => {
                const ct = CUSTOMER_TYPES.find((c) => c.id === o.customerType);
                return (
                  <tr key={o.id}>
                    <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--muted)" }}>#{o.id}</td>
                    <td style={{ fontWeight: 600 }}>{o.table}</td>
                    <td><span className="badge" style={{ background: ct.color + "18", color: ct.color }}>{ct.emoji} {ct.label}</span></td>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>{o.items.map((it) => `${it.name} ×${it.qty}`).join(", ")}</td>
                    <td style={{ fontWeight: 700, color: "var(--accent3)" }}>{fmt(o.total)}</td>
                    <td>
                      <span className="badge" style={{ background: o.status === "finished" ? "#06d6a020" : "#ff6b3520", color: o.status === "finished" ? "var(--accent3)" : "var(--accent)" }}>
                        {o.status === "finished" ? "✓ Done" : "● Active"}
                      </span>
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: 13 }}>{fmtDate(o.ts)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Menu Manager (with OCR + PDF upload) ────────────────────────────────────────────────────────
function MenuPage({ menu, setMenu, toast }) {
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState(null);
  const [previewType, setPreviewType] = useState(null); // "image" | "pdf"
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [pdfName, setPdfName] = useState("");
  const [form, setForm] = useState({ name: "", category: "", price: "" });
  const [cameraStream, setCameraStream] = useState(null);
  const [showCam, setShowCam] = useState(false);
  const [ocrStatus, setOcrStatus] = useState(""); // "processing" | "done" | ""
  const [ocrItems, setOcrItems] = useState([]);
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const pdfRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const isPDF = file.type === "application/pdf" || file.name.endsWith(".pdf");

    if (isPDF) {
      setPdfName(file.name);
      setPdfUploaded(true);
      setPreview(null);
      setPreviewType("pdf");
      toast(`PDF "${file.name}" uploaded successfully!`);
      // Simulate OCR processing for PDF
      setOcrStatus("processing");
      setTimeout(() => {
        setOcrStatus("done");
        toast("Menu extracted from PDF!");
      }, 2200);
      return;
    }

    // Image file — show preview + OCR
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setPreviewType("image");
      setPdfUploaded(false);
      // Simulate OCR processing
      setOcrStatus("processing");
      setTimeout(() => {
        setOcrStatus("done");
        // Mock OCR-detected items (in real app, call Tesseract.js or backend OCR)
        const detected = [
          { name: "Special Thali", category: "Main", price: 250 },
          { name: "Lassi", category: "Drink", price: 60 },
        ];
        setOcrItems(detected);
        toast("OCR complete! Review detected items below.");
      }, 2200);
    };
    reader.readAsDataURL(file);
    toast(`"${file.name}" uploaded – running OCR…`);
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        }
      });
      setCameraStream(stream);
      setShowCam(true);
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch {
      toast("Camera access denied");
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    setPreview(dataUrl);
    setPreviewType("image");
    setPdfUploaded(false);
    cameraStream.getTracks().forEach((t) => t.stop());
    setCameraStream(null);
    setShowCam(false);
    // Simulate OCR
    setOcrStatus("processing");
    toast("Photo captured – running OCR…");
    setTimeout(() => {
      setOcrStatus("done");
      const detected = [{ name: "Chef's Special", category: "Main", price: 320 }];
      setOcrItems(detected);
      toast("OCR complete! Review detected items.");
    }, 2000);
  };

  const addOcrItem = (item) => {
    setMenu((prev) => [...prev, { ...item, id: Date.now() }]);
    setOcrItems((prev) => prev.filter((i) => i !== item));
    toast(`"${item.name}" added to menu!`);
  };

  const addItem = () => {
    if (!form.name || !form.price) return;
    const updated = [...menu, { id: Date.now(), name: form.name, category: form.category || "Other", price: Number(form.price) }];
    setMenu(updated);
    DB.set("menu", updated);
    setForm({ name: "", category: "", price: "" });
    toast("Menu item added!");
  };

  const removeItem = (id) => {
    const updated = menu.filter((m) => m.id !== id);
    setMenu(updated);
    DB.set("menu", updated);
  };

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 80px)" }}>
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Upload area */}
        <div className="card">
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            📋 Upload Menu
            <span className="ocr-pill">🔬 OCR Enabled</span>
          </div>

          {showCam ? (
            <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%", borderRadius: 10 }} />
              <button className="btn btn-primary" style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)" }} onClick={capturePhoto}>📷 Capture</button>
            </div>
          ) : pdfUploaded ? (
            /* PDF success state */
            <div className={`drop-zone pdf-success`} style={{ cursor: "default" }}>
              <div className="pdf-success-icon">✅</div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: "var(--accent3)", marginTop: 10 }}>PDF Uploaded!</div>
              <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 6, wordBreak: "break-all" }}>{pdfName}</div>
              {ocrStatus === "processing" && (
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  <div style={{ width: 16, height: 16, border: "2px solid var(--accent3)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                  <span style={{ fontSize: 13, color: "var(--accent3)" }}>Extracting menu items…</span>
                </div>
              )}
              {ocrStatus === "done" && (
                <div style={{ marginTop: 10, fontSize: 13, color: "var(--accent3)" }}>✓ Extraction complete</div>
              )}
            </div>
          ) : (
            <div className={`drop-zone ${drag ? "drag" : ""}`}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
              onClick={() => fileRef.current.click()}>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
              {preview ? (
                <div>
                  <img src={preview} alt="menu" style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, objectFit: "contain" }} />
                  {ocrStatus === "processing" && (
                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                      <div style={{ width: 16, height: 16, border: "2px solid var(--accent4)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                      <span style={{ fontSize: 13, color: "var(--accent4)" }}>OCR scanning prices…</span>
                    </div>
                  )}
                  {ocrStatus === "done" && <div style={{ marginTop: 8, fontSize: 13, color: "var(--accent3)" }}>✓ OCR complete</div>}
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🖼️</div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Drop menu photo here</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>or click to browse · OCR will detect prices</div>
                </>
              )}
            </div>
          )}

          {/* PDF Upload button */}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={openCamera}>📷 Camera</button>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => pdfRef.current.click()}>
              📄 Upload PDF
            </button>
            <input ref={pdfRef} type="file" accept=".pdf,application/pdf" hidden onChange={(e) => handleFile(e.target.files[0])} />
            {(preview || pdfUploaded) && (
              <button className="btn btn-ghost" onClick={() => { setPreview(null); setPdfUploaded(false); setOcrStatus(""); setOcrItems([]); setPreviewType(null); setPdfName(""); }}>✕</button>
            )}
          </div>

          {/* OCR detected items */}
          {ocrItems.length > 0 && (
            <div style={{ marginTop: 14, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent4)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>🔬 OCR Detected Items</div>
              {ocrItems.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{item.category} · {fmt(item.price)}</div>
                  </div>
                  <button className="btn btn-success" style={{ padding: "4px 12px", fontSize: 12 }} onClick={() => addOcrItem(item)}>+ Add</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add item manually */}
        <div className="card">
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>➕ Add Menu Item</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input className="input" placeholder="Item name (e.g. Butter Chicken)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Category (e.g. Main, Starter, Drink)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="input" placeholder="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <button className="btn btn-primary" style={{ justifyContent: "center" }} onClick={addItem}>Add to Menu</button>
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div className="card">
        <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>
          Current Menu <span style={{ fontSize: 14, color: "var(--muted)", fontFamily: "DM Sans", fontWeight: 400 }}>({menu.length} items)</span>
        </div>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Category</th><th>Price</th><th></th></tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 500 }}>{item.name}</td>
                <td><span className="badge" style={{ background: "var(--surface2)", color: "var(--muted)" }}>{item.category}</span></td>
                <td style={{ fontFamily: "Syne", fontWeight: 700 }}>{fmt(item.price)}</td>
                <td><button className="btn btn-danger" style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => removeItem(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Page: Analytics ──────────────────────────────────────────────────────────
function AnalyticsPage({ orders }) {
  const byType = CUSTOMER_TYPES.map((ct) => {
    const typeOrders = orders.filter((o) => o.customerType === ct.id);
    const items = {};
    typeOrders.forEach((o) => o.items.forEach((it) => { items[it.name] = (items[it.name] || 0) + it.qty; }));
    const top = Object.entries(items).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const revenue = typeOrders.reduce((s, o) => s + o.total, 0);
    const avg = typeOrders.length ? Math.round(revenue / typeOrders.length) : 0;
    return { ...ct, count: typeOrders.length, revenue, avg, top };
  });

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 80px)" }}>
      <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 24, marginBottom: 20 }}>Customer Analytics</div>
      <div className="grid-2">
        {byType.map((ct) => (
          <div key={ct.id} className="card card-hover fade-up" style={{ borderTop: `3px solid ${ct.color}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 32 }}>{ct.emoji}</span>
              <div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18 }}>{ct.label}</div>
                <span className="badge" style={{ background: ct.color + "20", color: ct.color }}>{ct.count} orders</span>
              </div>
            </div>
            <div className="grid-2" style={{ marginBottom: 16, gap: 10 }}>
              <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Revenue</div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: ct.color }}>{fmt(ct.revenue)}</div>
              </div>
              <div style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 4 }}>Avg Spend</div>
                <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18 }}>{fmt(ct.avg)}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Top Picks</div>
            {ct.top.length === 0 ? (
              <div style={{ fontSize: 13, color: "var(--muted)" }}>No orders yet</div>
            ) : ct.top.map(([name, qty], i) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border)", fontSize: 13 }}>
                <span>{["🥇", "🥈", "🥉"][i]} {name}</span>
                <span style={{ color: "var(--muted)" }}>{qty} ordered</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {orders.length > 0 && (() => {
        const top = [...byType].sort((a, b) => b.revenue - a.revenue)[0];
        return (
          <div style={{ background: top.color + "15", border: `1px solid ${top.color}30`, borderRadius: 14, padding: 20, marginTop: 20, display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 36 }}>💡</span>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Top Insight</div>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>
                Your <strong style={{ color: top.color }}>{top.emoji} {top.label}</strong> customers generate the most revenue at <strong>{fmt(top.revenue)}</strong>.
                {top.top[0] && ` Their favorite item is "${top.top[0][0]}".`}
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
  { id: "order", label: "Take Order", icon: "🍽️" },
  { id: "sales", label: "Sales", icon: "📈" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "menu", label: "Menu", icon: "📋" },
];

export default function App() {
  const [page, setPage] = useState("order");
  const [orders, setOrders] = useState(() => DB.get("orders", []));
  const [menu, setMenu] = useState(() => DB.get("menu", SAMPLE_MENU));
  const [toastMsg, setToastMsg] = useState(null);

  const toast = useCallback((msg) => setToastMsg(msg), []);

  return (
    <>
      <FontLink />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🍴</div>
            <div>
              <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, lineHeight: 1 }}>RestroTrack</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Restaurant Management</div>
            </div>
          </div>
          <nav className="nav" style={{ maxWidth: 520 }}>
            {PAGES.map((p) => (
              <button key={p.id} className={`nav-item ${page === p.id ? "active" : ""}`} onClick={() => setPage(p.id)}>
                <span>{p.icon}</span>
                <span style={{ display: window.innerWidth < 500 ? "none" : undefined }}>{p.label}</span>
              </button>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{orders.length} orders</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</div>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: "20px 24px" }}>
          {page === "order" && <TakeOrderPage menu={menu} orders={orders} setOrders={setOrders} toast={toast} />}
          {page === "sales" && <SalesPage orders={orders} />}
          {page === "analytics" && <AnalyticsPage orders={orders} />}
          {page === "menu" && <MenuPage menu={menu} setMenu={setMenu} toast={toast} />}
        </main>
      </div>

      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg(null)} />}
    </>
  );
}
