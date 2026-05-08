import { useState, useRef } from "react";

// ── LOGO COMPONENT ────────────────────────────────────────────────────
function LatitudLogo({ size = 32, showText = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width: size, height: size,
        background: "linear-gradient(135deg, #20B264, #0EA5E9)",
        borderRadius: size * 0.25,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.45, fontWeight: 900, color: "#fff",
        flexShrink: 0, letterSpacing: -1,
        boxShadow: "0 2px 12px rgba(32,178,100,0.4)",
      }}>°L</div>
      {showText && (
        <div>
          <div style={{
            fontSize: size * 0.45, fontWeight: 900, lineHeight: 1,
            background: "linear-gradient(135deg, #20B264, #0EA5E9)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>°Latitud</div>
          {size > 28 && <div style={{ fontSize: 8, color: "#2A6A4A", letterSpacing: 2, marginTop: 1 }}>CAMBIÁ TU LATITUD</div>}
        </div>
      )}
    </div>
  );
}

// ── DATOS ─────────────────────────────────────────────────────────────
const TRIP = {
  name: "Brasil 🇧🇷", dates: "15–24 Mayo 2026", code: "BRAS-2026",
  mates: [
    { name: "Naty", avatar: "🧡", color: "#FF6B35" },
    { name: "Caro", avatar: "💚", color: "#27AE60" },
    { name: "Gaby", avatar: "💜", color: "#9B59B6" },
  ],
  flights: [
    { dir: "IDA", airline: "Emirates", num: "EK248", code: "H652ZJ", date: "Vie 15 Mayo", time: "22:40", from: "EZE Buenos Aires", to: "GIG Río de Janeiro" },
    { dir: "VUELTA", airline: "Emirates", num: "EK247", code: "H652ZJ", date: "Dom 24 Mayo", time: "17:40", from: "GIG Río de Janeiro", to: "EZE Buenos Aires" },
  ],
  segments: [
    { place: "Búzios", hotel: "Hotel Colona Park", from: "15 Mayo", to: "21 Mayo", emoji: "🏖️", color: "#FF6B35", mapsQuery: "Hotel+Colona+Park+Buzios+RJ" },
    { place: "Barra de Tijuca", hotel: "Wind de Barra", from: "21 Mayo", to: "24 Mayo", emoji: "🌊", color: "#3498DB", mapsQuery: "Wind+Hotel+Barra+da+Tijuca+Rio" },
  ],
  transfers: [
    { from: "Aeropuerto GIG", to: "Búzios", date: "16 Mayo", time: "08:00", company: "Rio Transfer", emoji: "🚐", duration: "~2hs 30min" },
    { from: "Búzios", to: "Barra de Tijuca", date: "21 Mayo", time: "11:00", company: "Rio Transfer", emoji: "🚗", duration: "~2hs" },
  ],
  places: [
    { name: "Rua das Pedras", emoji: "🛍️", note: "Centro de Búzios, imperdible de noche", mapsQuery: "Rua+das+Pedras+Buzios" },
    { name: "Praia de Geribá", emoji: "🏖️", note: "La mejor playa de Búzios", mapsQuery: "Praia+de+Geriba+Buzios" },
    { name: "Praia de Ferradura", emoji: "⛵", note: "Paseo en barco al atardecer", mapsQuery: "Praia+da+Ferradura+Buzios" },
    { name: "Barra da Tijuca", emoji: "🌅", note: "Playa urbana, ideal para caminar", mapsQuery: "Praia+da+Barra+da+Tijuca+Rio" },
  ],
};

const MAP_SEARCHES = [
  { label: "Restaurantes", query: "restaurantes", emoji: "🍽️" },
  { label: "Mariscos", query: "frutos+do+mar+restaurante", emoji: "🐟" },
  { label: "Supermercados", query: "supermercado", emoji: "🛒" },
  { label: "Cajeros ATM", query: "banco+caixa+eletronico", emoji: "🏧" },
  { label: "Farmacias", query: "farmacia", emoji: "💊" },
  { label: "Buggies", query: "aluguel+buggy+buzios", emoji: "🏎️" },
  { label: "Paseos barco", query: "passeio+de+barco+buzios", emoji: "⛵" },
  { label: "Vida nocturna", query: "balada+bar+buzios+noite", emoji: "🌃" },
  { label: "Eventos", query: "eventos+show+buzios", emoji: "🎭" },
  { label: "Clínicas", query: "clinica+medica+pronto+socorro", emoji: "🏥" },
];

const openMaps = (query, near = "Buzios+RJ+Brasil") => window.open(`https://www.google.com/maps/search/${query}+cerca+de+${near}`, "_blank");
const openMapsPlace = (query) => window.open(`https://www.google.com/maps/search/${query}`, "_blank");
const openDirections = (dest) => window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`, "_blank");

const CHECKLIST_ITEMS = [
  { id: 1, cat: "Documentos", text: "Pasaporte vigente", done: false, emoji: "📘" },
  { id: 2, cat: "Documentos", text: "Tarjeta de embarque EK248", done: false, emoji: "🎫" },
  { id: 3, cat: "Documentos", text: "Seguro de viaje", done: false, emoji: "🛡️" },
  { id: 4, cat: "Ropa", text: "Trajes de baño (al menos 3)", done: false, emoji: "👙" },
  { id: 5, cat: "Ropa", text: "Ropa liviana (26-29°C)", done: false, emoji: "👗" },
  { id: 6, cat: "Ropa", text: "Buzo para la noche", done: false, emoji: "🧥" },
  { id: 7, cat: "Salud", text: "Protector solar FPS 50+", done: false, emoji: "🧴" },
  { id: 8, cat: "Salud", text: "Repelente de mosquitos", done: false, emoji: "🦟" },
  { id: 9, cat: "Salud", text: "Botiquín básico", done: false, emoji: "💊" },
  { id: 10, cat: "Tech", text: "Adaptador enchufe (Brasil tipo N)", done: false, emoji: "🔌" },
  { id: 11, cat: "Tech", text: "Cargador y powerbank", done: false, emoji: "🔋" },
  { id: 12, cat: "Dinero", text: "Reales brasileños", done: false, emoji: "💵" },
  { id: 13, cat: "Dinero", text: "Tarjeta de débito internacional", done: false, emoji: "💳" },
];

const INIT_MSGS = [
  { id: 1, who: "Gaby", avatar: "💜", text: "¡Chicas ya falta poquito! 🎉", time: "10:32", highlight: false },
  { id: 2, who: "Caro", avatar: "💚", text: "Yo ya tengo todo listo! 🧳", time: "10:45", highlight: false },
  { id: 3, who: "Naty", avatar: "🧡", text: "El código de check-in es H652ZJ ✈️", time: "11:02", highlight: true },
];

const INIT_EXPENSES = [
  { id: 1, desc: "Cena Rua das Pedras", brl: 420, paidBy: "Naty", shared: true, emoji: "🍽️" },
  { id: 2, desc: "Paseo en barco", brl: 300, paidBy: "Gaby", shared: true, emoji: "⛵" },
  { id: 3, desc: "Souvenirs", brl: 150, paidBy: "Caro", shared: false, emoji: "🛍️" },
];

const WEATHER = [
  { day: "Vie 15", icon: "☀️", hi: 27, lo: 19 },
  { day: "Sáb 16", icon: "🌤️", hi: 26, lo: 18 },
  { day: "Dom 17", icon: "⛅", hi: 25, lo: 18 },
  { day: "Lun 18", icon: "☀️", hi: 28, lo: 20 },
  { day: "Mar 19", icon: "☀️", hi: 29, lo: 21 },
  { day: "Mié 20", icon: "🌧️", hi: 23, lo: 17 },
  { day: "Jue 21", icon: "🌤️", hi: 26, lo: 19 },
];

const TRIP_TYPES = [
  { key: "ocio", label: "Ocio / Vacaciones", emoji: "🏖️", desc: "Viaje de placer con amigos o familia" },
  { key: "trabajo", label: "Negocios", emoji: "💼", desc: "Reuniones, conferencias o trabajo remoto" },
  { key: "evento", label: "Evento especial", emoji: "🎉", desc: "Boda, cumpleaños, festival, etc." },
];

const EMOJI_CATS = {
  "😀": ["😀","😂","🥰","😎","🤩","😜","🥳","😍","🤣","😅","❤️","🔥","✨","💯","🎉","👏","🙌","💪","🤞","👌"],
  "🏖️": ["🏖️","🌊","⛵","🌴","🌺","🦜","🐚","🏄","🤿","🌅","🌄","🌈","☀️","🌙","⭐","🎆","🎇","🧨","🎊","🎈"],
  "✈️": ["✈️","🛫","🛬","🛄","🗺️","🧳","🎒","🏨","🚗","🚐","🚌","🛳️","🚂","🗼","🗽","🏰","🗿","🎡","🎢","🎠"],
  "🍽️": ["🍽️","🍹","🍺","🥂","🍕","🍔","🌮","🥗","🦞","🐟","🍣","🥩","🍰","🎂","🍫","🍦","☕","🧃","🥤","🧋"],
  "💬": ["❤️","💛","💚","💙","💜","🖤","🤍","💕","💞","💓","💗","💖","💘","💝","❣️","💔","🌹","🌸","💐","🌻"],
};

const TABS = [
  { key: "itinerary", label: "🗺️ Plan" },
  { key: "map", label: "📍 Mapa" },
  { key: "flights", label: "✈️ Vuelos" },
  { key: "checklist", label: "✅ Lista" },
  { key: "currency", label: "💱 Cambio" },
  { key: "expenses", label: "💸 Gastos" },
  { key: "chat", label: "💬 Chat" },
  { key: "location", label: "👥 Grupo" },
  { key: "translator", label: "📷 Traducir" },
  { key: "weather", label: "🌤️ Clima" },
];

const S = { HOME: "home", NEW: "new", JOIN: "join", TRIP: "trip" };
const DEFAULT_RATES = { BRL_USD: 0.18, USD_ARS: 1100 };

export default function App() {
  const [screen, setScreen] = useState(S.HOME);
  const [tab, setTab] = useState("itinerary");
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState(false);
  const [rates] = useState(DEFAULT_RATES);
  const [expenses, setExpenses] = useState(INIT_EXPENSES);
  const [checklist, setChecklist] = useState(CHECKLIST_ITEMS);
  const [messages, setMessages] = useState(INIT_MSGS);
  const [locationOn, setLocationOn] = useState({ Naty: true, Caro: false, Gaby: true });
  const [coverImage, setCoverImage] = useState(null);
  const [coverEmoji, setCoverEmoji] = useState("🏖️");

  const handleJoin = () => {
    if (joinCode.toUpperCase() === "BRAS-2026") setScreen(S.TRIP);
    else { setJoinError(true); setTimeout(() => setJoinError(false), 1500); }
  };

  return (
    <div style={css.shell}>
      <div style={css.phone}>
        {/* Status bar */}
        <div style={css.statusBar}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>9:41</span>
          <div style={{ display: "flex", gap: 5 }}><span style={{ fontSize: 11 }}>●●●</span><span>🔋</span></div>
        </div>
        <div style={css.content}>
          {screen === S.HOME && <HomeScreen onNew={() => setScreen(S.NEW)} onJoin={() => setScreen(S.JOIN)} onDemo={() => setScreen(S.TRIP)} coverImage={coverImage} coverEmoji={coverEmoji} />}
          {screen === S.NEW && <NewTripScreen onBack={() => setScreen(S.HOME)} onStart={() => setScreen(S.TRIP)} />}
          {screen === S.JOIN && <JoinScreen code={joinCode} onChange={setJoinCode} onJoin={handleJoin} onBack={() => setScreen(S.HOME)} error={joinError} />}
          {screen === S.TRIP && (
            <TripScreen tab={tab} setTab={setTab} onBack={() => setScreen(S.HOME)}
              rates={rates} expenses={expenses} setExpenses={setExpenses}
              checklist={checklist} setChecklist={setChecklist}
              messages={messages} setMessages={setMessages}
              locationOn={locationOn} setLocationOn={setLocationOn}
              coverImage={coverImage} setCoverImage={setCoverImage}
              coverEmoji={coverEmoji} setCoverEmoji={setCoverEmoji} />
          )}
        </div>
      </div>
      {/* Branding externo */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <LatitudLogo size={28} showText={true} />
        <div style={{ fontSize: 10, color: "#1A4A2A", letterSpacing: 2 }}>BETA · v1.0</div>
      </div>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────
function HomeScreen({ onNew, onJoin, onDemo, coverImage, coverEmoji }) {
  return (
    <div style={{ ...css.screen, background: "linear-gradient(160deg,#040D08,#071A10,#0A2418)" }}>
      {/* Header */}
      <div style={{ padding: "36px 24px 24px" }}>
        <LatitudLogo size={36} showText={true} />
        <p style={{ fontSize: 12, color: "#2A7A4A", marginTop: 12, lineHeight: 1.6 }}>
          Tu compañera de viaje inteligente. Organizá, compartí y viajá sin el caos.
        </p>
      </div>

      {/* Card viaje */}
      <div style={{ padding: "0 24px 20px" }}>
        <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", background: coverImage ? "transparent" : "linear-gradient(135deg,#0D3A20,#0A2A40)", minHeight: 140 }}>
          {coverImage && <img src={coverImage} alt="portada" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
          {coverImage && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))" }} />}
          {!coverImage && <div style={{ position: "absolute", right: -10, top: -10, fontSize: 80, opacity: 0.08 }}>{coverEmoji}</div>}
          <div style={{ position: "relative", padding: "20px" }}>
            <div style={{ fontSize: 10, color: "rgba(32,178,100,0.8)", letterSpacing: 3, marginBottom: 4 }}>PRÓXIMO VIAJE</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>Brasil 🇧🇷</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>Búzios + Barra · 15–24 Mayo · EK248</div>
            <div style={{ display: "flex", gap: 6 }}>
              {TRIP.mates.map(m => (<div key={m.name} style={{ width: 28, height: 28, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "2px solid rgba(255,255,255,0.3)" }}>{m.avatar}</div>))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={onNew} style={{ ...css.btnPrimary, background: "linear-gradient(135deg,#20B264,#0EA5E9)" }}>+ Crear nuevo viaje</button>
        <button onClick={onJoin} style={css.btnSecondary}>🔗 Unirme con código</button>
        <button onClick={onDemo} style={{ ...css.btnSecondary, borderColor: "rgba(32,178,100,0.3)", color: "#20B264", fontSize: 12 }}>👀 Ver demo · BRAS-2026</button>
      </div>

      <div style={{ padding: "20px 24px 0", display: "flex", flexWrap: "wrap", gap: 7 }}>
        {["📍 Mapa Google", "💱 Cotizador", "💬 Chat", "✅ Checklist", "📷 Traducir IA", "💸 Gastos"].map(f => (
          <div key={f} style={{ background: "rgba(32,178,100,0.08)", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 20, padding: "5px 11px", fontSize: 10, color: "#20B264", fontWeight: 700 }}>{f}</div>
        ))}
      </div>

      <div style={{ padding: "24px", marginTop: "auto" }}>
        <div style={{ background: "rgba(32,178,100,0.06)", border: "1px solid rgba(32,178,100,0.1)", borderRadius: 14, padding: "12px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#20B264", letterSpacing: 2, marginBottom: 4 }}>°LATITUD · BETA</div>
          <div style={{ fontSize: 11, color: "#2A5A3A", lineHeight: 1.5 }}>Cambiá tu latitud 🌍</div>
        </div>
      </div>
    </div>
  );
}

// ── NEW TRIP ──────────────────────────────────────────────────────────
function NewTripScreen({ onBack, onStart }) {
  const [step, setStep] = useState(0);
  const [tripType, setTripType] = useState(null);
  const companionOpts = {
    ocio: ["Solo/a 🙋", "En pareja 💑", "Con amigos 👯", "Con familia 👨‍👩‍👧"],
    trabajo: ["Solo/a 💼", "Con colega 🤝", "Equipo pequeño 👥", "Grupo grande 🏢"],
    evento: ["Solo/a 🎫", "En pareja 💑", "Con amigos 🎉", "Grupo grande 🎊"],
  };
  return (
    <div style={{ ...css.screen, background: "#040D08", padding: "28px 24px" }}>
      <button onClick={onBack} style={{ ...css.backBtn, color: "#20B264" }}>← Volver</button>
      <div style={{ marginTop: 18, marginBottom: 24 }}><LatitudLogo size={28} showText={true} /></div>
      {step === 0 && (<>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>¿Qué tipo de viaje?</h2>
        <p style={{ fontSize: 12, color: "#2A7A4A", marginBottom: 24 }}>Personalizamos tu °Latitud según el motivo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {TRIP_TYPES.map(t => (
            <button key={t.key} onClick={() => { setTripType(t.key); setStep(1); }} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.2)", borderRadius: 16, padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, textAlign: "left" }}>
              <span style={{ fontSize: 30 }}>{t.emoji}</span>
              <div><div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{t.label}</div><div style={{ fontSize: 11, color: "#2A5A3A" }}>{t.desc}</div></div>
            </button>
          ))}
        </div>
      </>)}
      {step === 1 && tripType && (<>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>¿Con quién viajás?</h2>
        <p style={{ fontSize: 12, color: "#2A7A4A", marginBottom: 24 }}>Para configurar el grupo</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {companionOpts[tripType].map(opt => (<button key={opt} onClick={() => setStep(2)} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.2)", borderRadius: 14, padding: "14px 18px", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#fff", textAlign: "left" }}>{opt}</button>))}
        </div>
      </>)}
      {step === 2 && (<>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 6 }}>¡Todo listo! 🎉</h2>
        <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.2)", borderRadius: 16, padding: "18px", marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "#2A7A4A", lineHeight: 2 }}>✅ Mapa con Google Maps<br />✅ Chat grupal con emojis<br />✅ Cotizador de moneda<br />✅ Traductor de cámara IA<br />✅ Checklist personalizado</div>
        </div>
        <button onClick={onStart} style={{ ...css.btnPrimary, background: "linear-gradient(135deg,#20B264,#0EA5E9)" }}>Crear mi °Latitud →</button>
      </>)}
    </div>
  );
}

// ── JOIN ──────────────────────────────────────────────────────────────
function JoinScreen({ code, onChange, onJoin, onBack, error }) {
  return (
    <div style={{ ...css.screen, background: "#040D08", padding: "28px 24px" }}>
      <button onClick={onBack} style={{ ...css.backBtn, color: "#20B264" }}>← Volver</button>
      <div style={{ marginTop: 18, marginBottom: 24 }}><LatitudLogo size={28} showText={true} /></div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Unirme a un viaje</h2>
      <p style={{ fontSize: 12, color: "#2A7A4A", marginBottom: 28 }}>Ingresá el código que te compartieron</p>
      <div style={{ background: "rgba(32,178,100,0.06)", border: `2px solid ${error ? "#E74C3C" : "rgba(32,178,100,0.25)"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
        <input value={code} onChange={e => onChange(e.target.value)} placeholder="Ej: BRAS-2026" style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 22, fontWeight: 800, width: "100%", letterSpacing: 3, textAlign: "center" }} />
      </div>
      {error && <p style={{ color: "#E74C3C", fontSize: 11, textAlign: "center" }}>Código incorrecto. Probá: BRAS-2026</p>}
      <button onClick={onJoin} style={{ ...css.btnPrimary, background: "linear-gradient(135deg,#20B264,#0EA5E9)", marginTop: 12 }}>Unirme →</button>
      <p style={{ fontSize: 11, color: "#1A4A2A", textAlign: "center", marginTop: 14 }}>Demo: <strong style={{ color: "#20B264" }}>BRAS-2026</strong></p>
    </div>
  );
}

// ── TRIP SCREEN ───────────────────────────────────────────────────────
function TripScreen({ tab, setTab, onBack, rates, expenses, setExpenses, checklist, setChecklist, messages, setMessages, locationOn, setLocationOn, coverImage, setCoverImage, coverEmoji, setCoverEmoji }) {
  return (
    <div style={{ ...css.screen, background: "#040D08", display: "flex", flexDirection: "column" }}>
      {/* Header con portada */}
      <div style={{ position: "relative", flexShrink: 0, overflow: "hidden" }}>
        {coverImage
          ? <img src={coverImage} alt="portada" style={{ width: "100%", height: 110, objectFit: "cover", display: "block" }} />
          : <div style={{ height: 110, background: "linear-gradient(135deg,#071A10,#0A2A30)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, opacity: 0.2 }}>{coverEmoji}</div>}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.85))", padding: "12px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button onClick={onBack} style={{ ...css.backBtn, color: "rgba(255,255,255,0.8)" }}>← Inicio</button>
            <LatitudLogo size={22} showText={false} />
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, color: "#fff" }}>Brasil 🇧🇷 · 15–24 Mayo</div>
            <div style={{ display: "flex", gap: 7, marginTop: 6, alignItems: "center" }}>
              {TRIP.mates.map(m => (
                <div key={m.name} style={{ textAlign: "center" }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, border: "2px solid rgba(255,255,255,0.4)", position: "relative" }}>
                    {m.avatar}
                    {locationOn[m.name] && <div style={{ position: "absolute", bottom: -2, right: -2, width: 7, height: 7, borderRadius: "50%", background: "#20B264", border: "1px solid #040D08" }} />}
                  </div>
                  <div style={{ fontSize: 7, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>{m.name}</div>
                </div>
              ))}
              <div style={{ background: "rgba(32,178,100,0.2)", borderRadius: 8, padding: "2px 8px" }}>
                <span style={{ fontSize: 9, color: "#20B264", fontWeight: 800, letterSpacing: 1 }}>BRAS-2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "#060F09", borderBottom: "1px solid rgba(32,178,100,0.1)", flexShrink: 0, overflowX: "auto" }}>
        {TABS.map(t => (<button key={t.key} onClick={() => setTab(t.key)} style={{ flex: "0 0 auto", padding: "9px 10px", border: "none", background: "transparent", cursor: "pointer", fontSize: 10, fontWeight: 700, color: tab === t.key ? "#20B264" : "#2A4A3A", borderBottom: tab === t.key ? "2px solid #20B264" : "2px solid transparent", whiteSpace: "nowrap" }}>{t.label}</button>))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {tab === "itinerary" && <ItineraryTab coverImage={coverImage} setCoverImage={setCoverImage} coverEmoji={coverEmoji} setCoverEmoji={setCoverEmoji} />}
        {tab === "map" && <MapTab />}
        {tab === "flights" && <FlightsTab />}
        {tab === "checklist" && <ChecklistTab checklist={checklist} setChecklist={setChecklist} />}
        {tab === "currency" && <CurrencyTab rates={rates} />}
        {tab === "expenses" && <ExpensesTab expenses={expenses} setExpenses={setExpenses} rates={rates} />}
        {tab === "chat" && <ChatTab messages={messages} setMessages={setMessages} />}
        {tab === "location" && <LocationTab locationOn={locationOn} setLocationOn={setLocationOn} />}
        {tab === "translator" && <TranslatorTab />}
        {tab === "weather" && <WeatherTab />}
      </div>
    </div>
  );
}

// ── MAPA ──────────────────────────────────────────────────────────────
function MapTab() {
  const [zone, setZone] = useState("buzios");
  const zones = [{ key: "buzios", label: "Búzios", query: "Buzios+RJ" }, { key: "barra", label: "Barra de Tijuca", query: "Barra+da+Tijuca+Rio" }];
  const current = zones.find(z => z.key === zone);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={css.sectionLabel}>📍 MAPA INTERACTIVO</div>
      <div style={{ display: "flex", gap: 8 }}>
        {zones.map(z => (<button key={z.key} onClick={() => setZone(z.key)} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, background: zone === z.key ? "linear-gradient(135deg,#20B264,#0EA5E9)" : "#0A1A0F", color: "#fff" }}>{z.label}</button>))}
      </div>
      <button onClick={() => openMapsPlace(current.query)} style={{ ...css.btnPrimary, background: "linear-gradient(135deg,#20B264,#0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        🗺️ Abrir {current.label} en Google Maps
      </button>
      <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, color: "#20B264", fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>🔍 BUSCAR CERCA</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {MAP_SEARCHES.map(s => (<button key={s.query} onClick={() => openMaps(s.query, current.query)} style={{ padding: "6px 12px", borderRadius: 20, border: "1px solid rgba(32,178,100,0.2)", background: "rgba(32,178,100,0.06)", color: "#ccc", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{s.emoji} {s.label}</button>))}
        </div>
      </div>
      <div style={css.sectionLabel}>LUGARES DEL VIAJE</div>
      {TRIP.places.map((p, i) => (
        <div key={i} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.12)", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, background: "rgba(32,178,100,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.emoji}</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{p.name}</div><div style={{ fontSize: 10, color: "#2A5A3A" }}>{p.note}</div></div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => openMapsPlace(p.mapsQuery)} style={{ padding: "5px 9px", borderRadius: 8, border: "none", background: "#0EA5E9", color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>📍</button>
            <button onClick={() => openDirections(p.mapsQuery)} style={{ padding: "5px 9px", borderRadius: 8, border: "none", background: "#20B264", color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>🧭</button>
          </div>
        </div>
      ))}
      <div style={css.sectionLabel}>HOTELES</div>
      {TRIP.segments.map((s, i) => (
        <div key={i} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.12)", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>🏨</span>
          <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{s.hotel}</div><div style={{ fontSize: 10, color: "#2A5A3A" }}>{s.place} · {s.from} → {s.to}</div></div>
          <div style={{ display: "flex", gap: 5 }}>
            <button onClick={() => openMapsPlace(s.mapsQuery)} style={{ padding: "5px 9px", borderRadius: 8, border: "none", background: "#0EA5E9", color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>📍</button>
            <button onClick={() => openDirections(s.mapsQuery)} style={{ padding: "5px 9px", borderRadius: 8, border: "none", background: "#20B264", color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>🧭</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ItineraryTab({ coverImage, setCoverImage, coverEmoji, setCoverEmoji }) {
  const fileRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const coverEmojis = ["🏖️","🌊","🏝️","🌴","⛵","🌅","🎉","✈️","🗺️","🌍","🌺","🦜","🏔️","🎆","🌈"];
  const timeline = [
    { type: "flight", data: TRIP.flights[0] },
    { type: "transfer", data: TRIP.transfers[0] },
    { type: "segment", data: TRIP.segments[0] },
    { type: "transfer", data: TRIP.transfers[1] },
    { type: "segment", data: TRIP.segments[1] },
    { type: "flight", data: TRIP.flights[1] },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 10, color: "#20B264", fontWeight: 700, letterSpacing: 1 }}>🖼️ PORTADA DEL VIAJE</div>
          <div style={{ fontSize: 9, color: "#1A4A2A" }}>cualquiera puede editarla</div>
        </div>
        <div style={{ margin: "0 14px", borderRadius: 12, overflow: "hidden", height: 80, background: "rgba(32,178,100,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {coverImage ? <img src={coverImage} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 44 }}>{coverEmoji}</span>}
        </div>
        <div style={{ padding: "10px 14px 14px", display: "flex", gap: 8 }}>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files[0]; if (f) setCoverImage(URL.createObjectURL(f)); }} />
          <button onClick={() => fileRef.current?.click()} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#20B264,#0EA5E9)", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>📷 Subir foto</button>
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "1px solid rgba(32,178,100,0.2)", background: "transparent", color: "#20B264", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>😊 Emoji</button>
          {coverImage && <button onClick={() => setCoverImage(null)} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #4A1A1A", background: "transparent", color: "#E74C3C", fontSize: 11, cursor: "pointer" }}>✕</button>}
        </div>
        {showEmojiPicker && (
          <div style={{ padding: "0 14px 14px", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {coverEmojis.map(e => (<button key={e} onClick={() => { setCoverEmoji(e); setCoverImage(null); setShowEmojiPicker(false); }} style={{ width: 36, height: 36, borderRadius: 8, border: coverEmoji === e ? "2px solid #20B264" : "1px solid rgba(32,178,100,0.15)", background: "rgba(32,178,100,0.05)", fontSize: 20, cursor: "pointer" }}>{e}</button>))}
          </div>
        )}
      </div>

      <div style={css.sectionLabel}>ITINERARIO COMPLETO</div>
      {timeline.map((item, i) => {
        if (item.type === "flight") {
          const f = item.data;
          return (
            <div key={i} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderLeft: "3px solid #20B264", borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 9, color: "#20B264", letterSpacing: 1, marginBottom: 4 }}>✈️ VUELO {f.dir}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{f.airline} {f.num}</div>
              <div style={{ fontSize: 11, color: "#0EA5E9" }}>{f.date} · {f.time} hs</div>
              <div style={{ fontSize: 10, color: "#2A5A3A", marginTop: 2 }}>{f.from} → {f.to}</div>
              <div style={{ marginTop: 6, background: "rgba(32,178,100,0.08)", borderRadius: 8, padding: "5px 10px", display: "inline-block" }}>
                <span style={{ fontSize: 9, color: "#2A7A4A" }}>Check-in: </span>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#20B264", letterSpacing: 1 }}>{f.code}</span>
              </div>
            </div>
          );
        }
        if (item.type === "transfer") {
          const t = item.data;
          return (
            <div key={i} style={{ background: "rgba(32,178,100,0.03)", border: "1px dashed rgba(32,178,100,0.15)", borderRadius: 14, padding: "11px 14px", display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{t.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#ccc" }}>Traslado · {t.date}</div>
                <div style={{ fontSize: 10, color: "#0EA5E9" }}>{t.from} → {t.to}</div>
                <div style={{ fontSize: 10, color: "#2A4A3A" }}>{t.company} · {t.time} hs · {t.duration}</div>
              </div>
              <button onClick={() => openDirections(t.to.replace(/ /g, "+"))} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: "#20B264", color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>🧭</button>
            </div>
          );
        }
        const s = item.data;
        return (
          <div key={i} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.12)", borderLeft: `3px solid ${s.color}`, borderRadius: 14, padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 24 }}>{s.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{s.place}</div>
              <div style={{ fontSize: 10, color: "#0EA5E9" }}>{s.from} → {s.to}</div>
              <div style={{ fontSize: 10, color: "#2A5A3A" }}>🏨 {s.hotel}</div>
            </div>
            <button onClick={() => openMapsPlace(s.mapsQuery)} style={{ padding: "6px 10px", borderRadius: 8, border: "none", background: "#0EA5E9", color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>📍</button>
          </div>
        );
      })}

      <div style={css.sectionLabel}>LUGARES DE INTERÉS</div>
      {TRIP.places.map((p, i) => (
        <div key={i} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.12)", borderRadius: 12, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, background: "rgba(32,178,100,0.08)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{p.emoji}</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{p.name}</div><div style={{ fontSize: 10, color: "#2A5A3A" }}>{p.note}</div></div>
          <button onClick={() => openMapsPlace(p.mapsQuery)} style={{ padding: "6px 9px", borderRadius: 8, border: "none", background: "#0EA5E9", color: "#fff", fontSize: 10, cursor: "pointer" }}>📍</button>
        </div>
      ))}
    </div>
  );
}

function FlightsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={css.sectionLabel}>VUELOS DEL GRUPO</div>
      {TRIP.flights.map((f, i) => (
        <div key={i} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: i === 0 ? "linear-gradient(135deg,#20B264,#0EA5E9)" : "linear-gradient(135deg,#0EA5E9,#0369A1)", padding: "10px 14px" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", letterSpacing: 2 }}>VUELO DE {f.dir}</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>{f.airline} · {f.num}</div>
          </div>
          <div style={{ padding: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div><div style={{ fontSize: 10, color: "#2A5A3A" }}>SALIDA</div><div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{f.time}</div><div style={{ fontSize: 10, color: "#0EA5E9" }}>{f.from}</div></div>
              <span style={{ fontSize: 20 }}>✈️</span>
              <div style={{ textAlign: "right" }}><div style={{ fontSize: 10, color: "#2A5A3A" }}>DESTINO</div><div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{f.to}</div></div>
            </div>
            <div style={{ background: "rgba(32,178,100,0.08)", borderRadius: 10, padding: "10px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 9, color: "#2A7A4A", letterSpacing: 1, marginBottom: 4 }}>CÓDIGO WEB CHECK-IN</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#20B264", letterSpacing: 3 }}>{f.code}</div>
              <div style={{ fontSize: 10, color: "#2A4A3A", marginTop: 2 }}>{f.date}</div>
            </div>
            <div style={{ padding: "8px 12px", background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: "#0EA5E9" }}>⏰ Alarmas configuradas</div>
              <div style={{ fontSize: 9, color: "#1A4A5A", marginTop: 2 }}>Check-in 48hs antes · Salir al aeropuerto · Recordatorio vuelo</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ChecklistTab({ checklist, setChecklist }) {
  const toggle = (id) => setChecklist(c => c.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const cats = [...new Set(checklist.map(i => i.cat))];
  const done = checklist.filter(i => i.done).length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 14, padding: "12px 16px" }}>
        <div style={{ fontSize: 9, color: "#2A7A4A", letterSpacing: 1, marginBottom: 6 }}>PROGRESO</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, background: "rgba(32,178,100,0.1)", borderRadius: 10, height: 8, overflow: "hidden" }}>
            <div style={{ width: `${(done / checklist.length) * 100}%`, height: "100%", background: "linear-gradient(90deg,#20B264,#0EA5E9)", borderRadius: 10, transition: "width 0.3s" }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#20B264" }}>{done}/{checklist.length}</span>
        </div>
      </div>
      {cats.map(cat => (
        <div key={cat}>
          <div style={css.sectionLabel}>{cat.toUpperCase()}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {checklist.filter(i => i.cat === cat).map(item => (
              <div key={item.id} onClick={() => toggle(item.id)} style={{ background: item.done ? "rgba(32,178,100,0.08)" : "#0A1A0F", border: `1px solid ${item.done ? "rgba(32,178,100,0.4)" : "rgba(32,178,100,0.1)"}`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${item.done ? "#20B264" : "#1A4A2A"}`, background: item.done ? "#20B264" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.done && <span style={{ fontSize: 12, color: "#fff" }}>✓</span>}</div>
                <span style={{ fontSize: 16 }}>{item.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: item.done ? "#2A5A3A" : "#ccc", textDecoration: item.done ? "line-through" : "none" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, color: "#0EA5E9", marginBottom: 4 }}>🌤️ Sugerencia de clima</div>
        <div style={{ fontSize: 11, color: "#2A5A6A" }}>Búzios 23°–29°C. Ropa liviana, protector solar FPS 50+ y buzo para las noches.</div>
      </div>
    </div>
  );
}

function CurrencyTab({ rates }) {
  const [brl, setBrl] = useState("");
  const [usdArs, setUsdArs] = useState(String(rates.USD_ARS));
  const brlNum = parseFloat(brl) || 0;
  const usd = brlNum * rates.BRL_USD;
  const ars = usd * (parseFloat(usdArs) || rates.USD_ARS);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={css.sectionLabel}>COTIZADOR DE MONEDA</div>
      <div style={{ display: "flex", gap: 8 }}>
        {[{ label: "1 BRL =", value: `$${rates.BRL_USD.toFixed(4)}`, sub: "USD", color: "#20B264" }, { label: "1 USD =", value: `$${parseFloat(usdArs).toLocaleString()}`, sub: "ARS", color: "#0EA5E9" }].map(c => (
          <div key={c.sub} style={{ flex: 1, background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 12, padding: "10px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#2A5A3A" }}>{c.label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 9, color: "#1A4A2A" }}>{c.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 14, padding: "14px 16px" }}>
        <div style={{ fontSize: 9, color: "#2A7A4A", letterSpacing: 1, marginBottom: 6 }}>INGRESÁ EN REALES 🇧🇷</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16, color: "#20B264", fontWeight: 700 }}>R$</span>
          <input type="number" value={brl} onChange={e => setBrl(e.target.value)} placeholder="0,00" style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 26, fontWeight: 800, width: "100%" }} />
        </div>
      </div>
      {brlNum > 0 && (<>
        <div style={{ background: "rgba(32,178,100,0.06)", border: "1px solid #20B264", borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ fontSize: 9, color: "#20B264", letterSpacing: 1, marginBottom: 2 }}>EN DÓLARES 🇺🇸</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>USD {usd.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid #0EA5E9", borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ fontSize: 9, color: "#0EA5E9", letterSpacing: 1, marginBottom: 2 }}>EN PESOS ARGENTINOS 🇦🇷</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>$ {ars.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        </div>
      </>)}
      <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 14, padding: "12px 16px" }}>
        <div style={{ fontSize: 9, color: "#2A7A4A", letterSpacing: 1, marginBottom: 6 }}>COTIZACIÓN USD → ARS (editable)</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#2A5A3A" }}>1 USD =</span>
          <input type="number" value={usdArs} onChange={e => setUsdArs(e.target.value)} style={{ background: "rgba(32,178,100,0.06)", border: "1px solid rgba(32,178,100,0.2)", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: 700, padding: "6px 10px", width: 90, outline: "none" }} />
          <span style={{ fontSize: 12, color: "#2A5A3A" }}>ARS</span>
        </div>
        <div style={{ fontSize: 9, color: "#1A4A2A", marginTop: 5 }}>Actualizá según el blue del día</div>
      </div>
    </div>
  );
}

function ExpensesTab({ expenses, setExpenses, rates }) {
  const [showForm, setShowForm] = useState(false);
  const [newDesc, setNewDesc] = useState(""); const [newBrl, setNewBrl] = useState(""); const [newPaid, setNewPaid] = useState("Naty"); const [newShared, setNewShared] = useState(true);
  const addExpense = () => { if (!newDesc || !newBrl) return; setExpenses(e => [...e, { id: Date.now(), desc: newDesc, brl: parseFloat(newBrl), paidBy: newPaid, shared: newShared, emoji: newShared ? "👥" : "👤" }]); setNewDesc(""); setNewBrl(""); setShowForm(false); };
  const shared = expenses.filter(e => e.shared); const totalBrl = shared.reduce((a, e) => a + e.brl, 0); const totalUsd = totalBrl * rates.BRL_USD; const perUsd = totalUsd / 3;
  const balances = TRIP.mates.map(m => { const paid = shared.filter(e => e.paidBy === m.name).reduce((a, e) => a + e.brl * rates.BRL_USD, 0); return { ...m, paid, diff: paid - perUsd }; });
  const inp = { width: "100%", background: "rgba(32,178,100,0.05)", border: "1px solid rgba(32,178,100,0.2)", borderRadius: 10, color: "#fff", fontSize: 12, padding: "9px 12px", outline: "none", boxSizing: "border-box" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={css.sectionLabel}>GASTOS DEL GRUPO</div>
      <div style={{ background: "rgba(32,178,100,0.06)", border: "1px solid rgba(32,178,100,0.2)", borderRadius: 14, padding: "14px 16px" }}>
        <div style={{ fontSize: 9, color: "#20B264", letterSpacing: 1 }}>TOTAL COMPARTIDO</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 4 }}>R$ {totalBrl.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</div>
        <div style={{ fontSize: 11, color: "#2A7A4A" }}>≈ USD {totalUsd.toFixed(2)} · Cada una: USD {perUsd.toFixed(2)}</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {balances.map(b => (<div key={b.name} style={{ flex: 1, background: "#0A1A0F", border: `1px solid ${b.diff >= 0 ? "rgba(32,178,100,0.3)" : "rgba(231,76,60,0.3)"}`, borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
          <div style={{ fontSize: 18, marginBottom: 2 }}>{b.avatar}</div>
          <div style={{ fontSize: 9, color: "#2A5A3A" }}>{b.name}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: b.diff >= 0 ? "#20B264" : "#E74C3C" }}>{b.diff >= 0 ? "+" : "-"}${Math.abs(b.diff).toFixed(1)}</div>
          <div style={{ fontSize: 8, color: "#1A4A2A" }}>{b.diff >= 0 ? "le deben" : "debe"}</div>
        </div>))}
      </div>
      {expenses.map(e => (<div key={e.id} style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.1)", borderLeft: `3px solid ${e.shared ? "#20B264" : "#0EA5E9"}`, borderRadius: 12, padding: "10px 13px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>{e.emoji}</span>
        <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{e.desc}</div><div style={{ fontSize: 10, color: "#2A5A3A" }}>Pagó {e.paidBy} · {e.shared ? "👥 Común" : "👤 Personal"}</div></div>
        <div style={{ textAlign: "right" }}><div style={{ fontSize: 13, fontWeight: 800, color: "#20B264" }}>R${e.brl}</div><div style={{ fontSize: 9, color: "#1A4A2A" }}>≈ USD {(e.brl * rates.BRL_USD).toFixed(1)}</div></div>
      </div>))}
      {showForm ? (
        <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.2)", borderRadius: 14, padding: "14px" }}>
          <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Descripción" style={{ ...inp, marginBottom: 8 }} />
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input type="number" value={newBrl} onChange={e => setNewBrl(e.target.value)} placeholder="R$ monto" style={{ ...inp, flex: 1 }} />
            <select value={newPaid} onChange={e => setNewPaid(e.target.value)} style={{ ...inp, flex: 1 }}>{TRIP.mates.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}</select>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {[true, false].map(s => (<button key={String(s)} onClick={() => setNewShared(s)} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "none", cursor: "pointer", background: newShared === s ? (s ? "#20B264" : "#0EA5E9") : "rgba(32,178,100,0.08)", color: "#fff", fontSize: 10, fontWeight: 700 }}>{s ? "👥 Compartido" : "👤 Personal"}</button>))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid rgba(32,178,100,0.2)", background: "transparent", color: "#2A7A4A", fontSize: 11, cursor: "pointer" }}>Cancelar</button>
            <button onClick={addExpense} style={{ flex: 2, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#20B264,#0EA5E9)", color: "#fff", fontSize: 11, fontWeight: 800, cursor: "pointer" }}>Agregar</button>
          </div>
        </div>
      ) : <button onClick={() => setShowForm(true)} style={{ ...css.btnPrimary, background: "linear-gradient(135deg,#20B264,#0EA5E9)", fontSize: 13 }}>+ Agregar gasto</button>}
    </div>
  );
}

function ChatTab({ messages, setMessages }) {
  const [text, setText] = useState(""); const [showEmoji, setShowEmoji] = useState(false); const [emojiCat, setEmojiCat] = useState("😀"); const [highlightNext, setHighlightNext] = useState(false);
  const bottomRef = useRef(null);
  const send = () => { if (!text.trim()) return; setMessages(m => [...m, { id: Date.now(), who: "Naty", avatar: "🧡", text: text.trim(), time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }), highlight: highlightNext }]); setText(""); setShowEmoji(false); setHighlightNext(false); setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50); };
  const toggleHighlight = (id) => setMessages(m => m.map(msg => msg.id === id ? { ...msg, highlight: !msg.highlight } : msg));
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ ...css.sectionLabel, marginBottom: 10 }}>CHAT GRUPAL · BRAS-2026</div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingBottom: 8 }}>
        {messages.map(m => {
          const isMe = m.who === "Naty";
          return (
            <div key={m.id}>
              {m.highlight && <div style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 10, padding: "4px 10px", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 11 }}>📌</span><span style={{ fontSize: 10, color: "#0EA5E9", fontWeight: 700 }}>Destacado</span></div>}
              <div style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
                {!isMe && <div style={{ width: 28, height: 28, borderRadius: "50%", background: TRIP.mates.find(x => x.name === m.who)?.color || "#333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{m.avatar}</div>}
                <div style={{ maxWidth: "72%" }}>
                  {!isMe && <div style={{ fontSize: 9, color: "#2A5A3A", marginBottom: 3, paddingLeft: 4 }}>{m.who}</div>}
                  <div onClick={() => toggleHighlight(m.id)} style={{ background: isMe ? "linear-gradient(135deg,#20B264,#0EA5E9)" : "#0A1A0F", borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px", padding: "9px 12px", border: m.highlight ? "1px solid rgba(14,165,233,0.4)" : "1px solid rgba(32,178,100,0.1)", cursor: "pointer" }}>
                    <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.4 }}>{m.text}</div>
                    {!m.highlight && <div style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>tocá para destacar</div>}
                  </div>
                  <div style={{ fontSize: 9, color: "#1A4A2A", marginTop: 3, textAlign: isMe ? "right" : "left" }}>{m.time}</div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      {showEmoji && (
        <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 14, padding: "10px", marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {Object.keys(EMOJI_CATS).map(cat => (<button key={cat} onClick={() => setEmojiCat(cat)} style={{ padding: "4px 8px", borderRadius: 8, border: "none", background: emojiCat === cat ? "#20B264" : "rgba(32,178,100,0.08)", fontSize: 14, cursor: "pointer" }}>{cat}</button>))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {EMOJI_CATS[emojiCat].map(e => (<button key={e} onClick={() => setText(t => t + e)} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: "transparent", fontSize: 18, cursor: "pointer" }}>{e}</button>))}
          </div>
        </div>
      )}
      <div style={{ borderTop: "1px solid rgba(32,178,100,0.1)", paddingTop: 8 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <button onClick={() => setShowEmoji(!showEmoji)} style={{ padding: "5px 10px", borderRadius: 10, border: `1px solid ${showEmoji ? "#20B264" : "rgba(32,178,100,0.2)"}`, background: showEmoji ? "rgba(32,178,100,0.1)" : "transparent", fontSize: 14, cursor: "pointer" }}>😊</button>
          <button onClick={() => setHighlightNext(!highlightNext)} style={{ padding: "5px 10px", borderRadius: 10, border: `1px solid ${highlightNext ? "#0EA5E9" : "rgba(32,178,100,0.2)"}`, background: highlightNext ? "rgba(14,165,233,0.1)" : "transparent", fontSize: 11, fontWeight: 700, color: highlightNext ? "#0EA5E9" : "#2A5A3A", cursor: "pointer" }}>📌</button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Escribí un mensaje..." style={{ flex: 1, background: "rgba(32,178,100,0.05)", border: `1px solid ${highlightNext ? "rgba(14,165,233,0.4)" : "rgba(32,178,100,0.2)"}`, borderRadius: 20, color: "#fff", fontSize: 13, padding: "9px 14px", outline: "none" }} />
          <button onClick={send} style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#20B264,#0EA5E9)", border: "none", color: "#fff", fontSize: 18, cursor: "pointer" }}>↑</button>
        </div>
      </div>
    </div>
  );
}

function LocationTab({ locationOn, setLocationOn }) {
  const toggle = (name) => setLocationOn(p => ({ ...p, [name]: !p[name] }));
  const pos = { Naty: "Rua das Pedras, Búzios", Caro: "Ubicación desactivada", Gaby: "Hotel Colona Park, Búzios" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={css.sectionLabel}>UBICACIÓN DEL GRUPO</div>
      <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, color: "#0EA5E9", marginBottom: 4 }}>🔒 Tu privacidad primero</div>
        <div style={{ fontSize: 11, color: "#2A5A6A", lineHeight: 1.5 }}>Cada una decide cuándo compartir su ubicación. Solo el grupo BRAS-2026 puede verla.</div>
      </div>
      {TRIP.mates.map(m => (
        <div key={m.name} style={{ background: "#0A1A0F", border: `1px solid ${locationOn[m.name] ? "rgba(32,178,100,0.4)" : "rgba(32,178,100,0.1)"}`, borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{m.avatar}</div>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: locationOn[m.name] ? "#20B264" : "#333", border: "2px solid #0A1A0F" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{m.name}</div>
              <div style={{ fontSize: 10, color: locationOn[m.name] ? "#0EA5E9" : "#1A4A2A" }}>📍 {locationOn[m.name] ? pos[m.name] : "Ubicación desactivada"}</div>
            </div>
            {m.name === "Naty"
              ? <button onClick={() => toggle(m.name)} style={{ padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, background: locationOn[m.name] ? "#20B264" : "rgba(32,178,100,0.1)", color: "#fff" }}>{locationOn[m.name] ? "ON" : "OFF"}</button>
              : <div style={{ fontSize: 10, color: locationOn[m.name] ? "#20B264" : "#1A4A2A", fontWeight: 700 }}>{locationOn[m.name] ? "Activa" : "Inactiva"}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function TranslatorTab() {
  const [image, setImage] = useState(null); const [imageBase64, setImageBase64] = useState(null); const [loading, setLoading] = useState(false); const [result, setResult] = useState(null); const [error, setError] = useState(null); const [targetLang, setTargetLang] = useState("español");
  const fileRef = useRef(null);
  const langs = ["español", "inglés", "portugués", "francés", "italiano"];
  const handleFile = (file) => { if (!file) return; setImage(URL.createObjectURL(file)); setResult(null); setError(null); const r = new FileReader(); r.onload = e => setImageBase64(e.target.result.split(",")[1]); r.readAsDataURL(file); };
  const translate = async () => {
    if (!imageBase64) return; setLoading(true); setResult(null); setError(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: "image/jpeg", data: imageBase64 } }, { type: "text", text: `Sos un traductor de viajes. Analizá esta imagen:\n1. Detectá todo el texto visible\n2. Identificá el idioma\n3. Traducí al ${targetLang}\n4. Si es menú explicá los platos\n5. Si son indicaciones explicá adónde llevan\n\nFormato:\n🔍 IDIOMA DETECTADO: [idioma]\n📝 TEXTO ORIGINAL: [texto]\n🌐 TRADUCCIÓN: [traducción]\n💡 CONTEXTO: [explicación útil]` }] }] }) });
      const data = await res.json();
      if (data.content?.[0]?.text) setResult(data.content[0].text);
      else setError("No se pudo procesar. Intentá de nuevo.");
    } catch { setError("Error de conexión."); }
    setLoading(false);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={css.sectionLabel}>TRADUCTOR DE CÁMARA · IA</div>
      <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 11, color: "#0EA5E9", marginBottom: 4 }}>📷 ¿Cómo funciona?</div>
        <div style={{ fontSize: 11, color: "#2A5A6A", lineHeight: 1.5 }}>Sacá foto a cualquier cartel, menú o indicación. La IA detecta el idioma y traduce al instante.</div>
      </div>
      <div style={{ background: "#0A1A0F", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 9, color: "#2A7A4A", letterSpacing: 1, marginBottom: 8 }}>TRADUCIR A</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {langs.map(l => (<button key={l} onClick={() => setTargetLang(l)} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, background: targetLang === l ? "#20B264" : "rgba(32,178,100,0.08)", color: targetLang === l ? "#fff" : "#2A7A4A" }}>{l}</button>))}
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
      {!image ? <div onClick={() => fileRef.current?.click()} style={{ border: "2px dashed rgba(32,178,100,0.2)", borderRadius: 16, padding: "32px 20px", textAlign: "center", cursor: "pointer", background: "rgba(32,178,100,0.03)" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📷</div><div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Tocar para tomar foto</div><div style={{ fontSize: 11, color: "#2A5A3A" }}>o seleccionar desde la galería</div></div>
        : <div style={{ position: "relative" }}><img src={image} alt="preview" style={{ width: "100%", borderRadius: 14, maxHeight: 200, objectFit: "cover" }} /><button onClick={() => { setImage(null); setImageBase64(null); setResult(null); }} style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", fontSize: 14, cursor: "pointer" }}>✕</button></div>}
      {image && !result && <button onClick={translate} disabled={loading} style={{ ...css.btnPrimary, background: "linear-gradient(135deg,#20B264,#0EA5E9)", opacity: loading ? 0.7 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{loading ? <><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span> Analizando...</> : "🌐 Traducir ahora"}</button>}
      {result && (<div style={{ background: "#0A1A0F", border: "1px solid #20B264", borderRadius: 16, padding: "16px" }}>
        <div style={{ fontSize: 10, color: "#20B264", letterSpacing: 1, marginBottom: 8 }}>✅ TRADUCCIÓN LISTA</div>
        {result.split("\n").filter(Boolean).map((line, i) => { const isH = line.startsWith("🔍") || line.startsWith("📝") || line.startsWith("🌐") || line.startsWith("💡"); return <div key={i} style={{ background: isH ? "rgba(32,178,100,0.05)" : "transparent", borderRadius: 8, padding: isH ? "8px 10px" : "2px 10px", marginBottom: 4 }}><div style={{ fontSize: isH ? 11 : 12, color: isH ? "#20B264" : "#ccc", lineHeight: 1.6, fontWeight: isH ? 700 : 400 }}>{line}</div></div>; })}
        <button onClick={() => setResult(null)} style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: "rgba(32,178,100,0.08)", color: "#20B264", fontSize: 11, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>Nueva foto</button>
      </div>)}
      {error && <div style={{ background: "rgba(231,76,60,0.08)", border: "1px solid #E74C3C", borderRadius: 14, padding: "12px 14px" }}><div style={{ fontSize: 12, color: "#E74C3C" }}>⚠️ {error}</div></div>}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function WeatherTab() {
  return (
    <div>
      <div style={css.sectionLabel}>CLIMA EN BÚZIOS</div>
      <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 16, padding: "16px", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 44 }}>☀️</div>
          <div><div style={{ fontSize: 34, fontWeight: 900, color: "#fff" }}>27°</div><div style={{ fontSize: 11, color: "#0EA5E9" }}>Vie 15 Mayo · Despejado</div><div style={{ fontSize: 10, color: "#1A4A5A" }}>Min 19° · Humedad 72%</div></div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4, marginBottom: 12 }}>
        {WEATHER.map((w, i) => (<div key={i} style={{ background: i === 0 ? "rgba(14,165,233,0.12)" : "#0A1A0F", border: `1px solid ${i === 0 ? "rgba(14,165,233,0.3)" : "rgba(32,178,100,0.1)"}`, borderRadius: 12, padding: "10px 8px", textAlign: "center", minWidth: 48, flexShrink: 0 }}>
          <div style={{ fontSize: 8, color: "#2A4A3A" }}>{w.day.split(" ")[0]}</div>
          <div style={{ fontSize: 8, color: "#2A5A4A", marginBottom: 4 }}>{w.day.split(" ")[1]}</div>
          <div style={{ fontSize: 18, marginBottom: 4 }}>{w.icon}</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>{w.hi}°</div>
          <div style={{ fontSize: 9, color: "#1A4A2A" }}>{w.lo}°</div>
        </div>))}
      </div>
      <div style={{ background: "rgba(32,178,100,0.06)", border: "1px solid rgba(32,178,100,0.15)", borderRadius: 14, padding: "12px 14px" }}>
        <div style={{ fontSize: 10, color: "#20B264", marginBottom: 4 }}>👗 Sugerencia de ropa</div>
        <div style={{ fontSize: 11, color: "#2A6A3A", lineHeight: 1.6 }}>Temperatura 23°–29°C. Ropa liviana y varios trajes de baño. El miércoles 20 hay lluvia — ideal para shopping. Llevá buzo para las noches.</div>
      </div>
    </div>
  );
}

const css = {
  shell: { minHeight: "100vh", background: "#020806", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 0", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" },
  phone: { width: 375, height: 720, background: "#040D08", borderRadius: 44, overflow: "hidden", boxShadow: "0 0 0 10px #0A1A0F, 0 40px 80px rgba(0,0,0,0.9), 0 0 60px rgba(32,178,100,0.08)", display: "flex", flexDirection: "column" },
  statusBar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 24px 4px", background: "rgba(0,0,0,0.4)", color: "#fff", flexShrink: 0 },
  content: { flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" },
  screen: { flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" },
  btnPrimary: { width: "100%", padding: "14px", borderRadius: 16, background: "linear-gradient(135deg,#20B264,#0EA5E9)", border: "none", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer" },
  btnSecondary: { width: "100%", padding: "14px", borderRadius: 16, background: "rgba(32,178,100,0.06)", border: "1px solid rgba(32,178,100,0.2)", color: "#20B264", fontSize: 14, fontWeight: 700, cursor: "pointer" },
  backBtn: { background: "none", border: "none", color: "#20B264", fontSize: 12, fontWeight: 700, cursor: "pointer", padding: 0, letterSpacing: 0.5 },
  sectionLabel: { fontSize: 10, color: "#1A4A2A", letterSpacing: 2, fontWeight: 700, marginBottom: 2 },
};
