import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const SEDE_AREAS = ["SUPRIMENTOS","PLANEJAMENTO","ORÇAMENTO","SGI","FINANCEIRO","FISCAL","SAC","JURÍDICO","INCORPORAÇÃO","PROJETOS","RH","DP"];
const OBRAS_AREAS = ["PÓS OBRA","GREENPARKS","FAHL LOTEAMENTO","PARQUE DAS ÁGUAS","CICILIATO","VECCON MORADAS","VECCON PAULÍNIA","VECCON KRONOS","VECCON LOTEAMENTO","IZZI","VALPELINE","HARMONIA","ALTUS","TAG GUEDALA","ARTEMIS","UNIQUE","ALADINO","HORIZON","SENSE"];
const PERFORMANCE_OPTIONS = ["ACIMA DA EXPECTATIVA","DENTRO DA EXPECTATIVA","ABAIXO DA EXPECTATIVA"];
const FINAL_OPTIONS = ["DESEMPENHO EXEMPLAR","ACIMA DO ESPERADO","BOM, MAS É PRECISO MELHORAR","PONTO DE ATENÇÃO"];
const PIE_COLORS = ["#22c55e","#84cc16","#f59e0b","#ef4444"];

const USERS = {
  "rh@iben.com.br":     { password:"admin123",  role:"admin",  name:"RH Administrador" },
  "gestor@iben.com.br": { password:"gestor123", role:"gestor", name:"Carlos Lima" },
};

const MOCK_EVALS = [
  { id:1, name:"Ana Souza",      role:"Analista",     area:"FINANCEIRO", sector:"SEDE",  manager:"Carlos Lima",    date:"2025-04-10", q1:"ACIMA DA EXPECTATIVA",  q2:"DENTRO DA EXPECTATIVA", q3:"ACIMA DA EXPECTATIVA",  q4:"ACIMA DA EXPECTATIVA",  q5:"DENTRO DA EXPECTATIVA", feedback:"Excelente profissional.",    final:"DESEMPENHO EXEMPLAR" },
  { id:2, name:"Bruno Costa",    role:"Engenheiro",   area:"GREENPARKS", sector:"OBRAS", manager:"Mariana Rocha",  date:"2025-04-15", q1:"DENTRO DA EXPECTATIVA", q2:"DENTRO DA EXPECTATIVA", q3:"ABAIXO DA EXPECTATIVA", q4:"DENTRO DA EXPECTATIVA", q5:"DENTRO DA EXPECTATIVA", feedback:"Precisa melhorar prazos.", final:"BOM, MAS É PRECISO MELHORAR" },
  { id:3, name:"Carla Mendes",   role:"Coordenadora", area:"RH",         sector:"SEDE",  manager:"Carlos Lima",    date:"2025-05-02", q1:"ACIMA DA EXPECTATIVA",  q2:"ACIMA DA EXPECTATIVA",  q3:"ACIMA DA EXPECTATIVA",  q4:"ACIMA DA EXPECTATIVA",  q5:"ACIMA DA EXPECTATIVA",  feedback:"Referência para a equipe.", final:"DESEMPENHO EXEMPLAR" },
  { id:4, name:"Diego Alves",    role:"Técnico",      area:"HARMONIA",   sector:"OBRAS", manager:"Mariana Rocha",  date:"2025-05-10", q1:"ABAIXO DA EXPECTATIVA", q2:"ABAIXO DA EXPECTATIVA", q3:"DENTRO DA EXPECTATIVA", q4:"ABAIXO DA EXPECTATIVA", q5:"DENTRO DA EXPECTATIVA", feedback:"Requer acompanhamento.",    final:"PONTO DE ATENÇÃO" },
  { id:5, name:"Elisa Ferreira", role:"Advogada",     area:"JURÍDICO",   sector:"SEDE",  manager:"Carlos Lima",    date:"2025-05-12", q1:"ACIMA DA EXPECTATIVA",  q2:"ACIMA DA EXPECTATIVA",  q3:"DENTRO DA EXPECTATIVA", q4:"ACIMA DA EXPECTATIVA",  q5:"ACIMA DA EXPECTATIVA",  feedback:"Ótimo desempenho.",         final:"ACIMA DO ESPERADO" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const s = (base, extra = {}) => ({ ...base, ...extra });

const FinalBadge = ({ value }) => {
  const map = {
    "DESEMPENHO EXEMPLAR":          { bg:"#dcfce7", color:"#14532d", border:"#86efac" },
    "ACIMA DO ESPERADO":            { bg:"#f7fee7", color:"#3f6212", border:"#bef264" },
    "BOM, MAS É PRECISO MELHORAR": { bg:"#fef3c7", color:"#92400e", border:"#fcd34d" },
    "PONTO DE ATENÇÃO":             { bg:"#fee2e2", color:"#7f1d1d", border:"#fca5a5" },
  };
  const c = map[value] || { bg:"#f3f4f6", color:"#374151", border:"#d1d5db" };
  return (
    <span style={{ fontSize:"11px", fontWeight:"600", padding:"3px 10px", borderRadius:"20px",
      background:c.bg, color:c.color, border:`1px solid ${c.border}`, whiteSpace:"nowrap" }}>
      {value}
    </span>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");

  const handle = () => {
    const u = USERS[email.trim().toLowerCase()];
    if (u && u.password === pass) { onLogin({ ...u, email }); }
    else { setErr("Credenciais inválidas. Tente novamente."); }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(135deg,#052e16 0%,#14532d 55%,#166534 100%)" }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:"radial-gradient(circle at 20% 50%,rgba(74,222,128,.06) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(22,163,74,.08) 0%,transparent 40%)" }}/>

      <div style={{ position:"relative", width:"100%", maxWidth:"360px", margin:"0 24px" }}>
        {/* logo */}
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,.07)", backdropFilter:"blur(12px)",
            borderRadius:"16px", padding:"18px 36px", border:"1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontFamily:"Georgia,serif", fontSize:"30px", fontWeight:"700", color:"#fff", letterSpacing:"3px" }}>iBen</div>
            <div style={{ fontSize:"9px", color:"#86efac", letterSpacing:"4px", textAlign:"center" }}>ENGENHARIA</div>
          </div>
        </div>

        {/* card */}
        <div style={{ background:"rgba(255,255,255,.04)", backdropFilter:"blur(20px)",
          border:"1px solid rgba(255,255,255,.1)", borderRadius:"20px", padding:"36px 32px",
          boxShadow:"0 32px 64px rgba(0,0,0,.4)" }}>
          <h2 style={{ color:"#fff", fontSize:"20px", fontWeight:"600", marginBottom:"4px", fontFamily:"Georgia,serif" }}>Acesso ao Portal</h2>
          <p style={{ color:"#86efac", fontSize:"11px", marginBottom:"28px", letterSpacing:"1px" }}>MATRIZ DE DESEMPENHO RH</p>

          {[
            { label:"E-MAIL",  value:email, set:setEmail, type:"text",     ph:"seu@email.com" },
            { label:"SENHA",   value:pass,  set:setPass,  type:"password", ph:"••••••••" },
          ].map(f => (
            <div key={f.label} style={{ marginBottom:"16px" }}>
              <label style={{ color:"#a7f3d0", fontSize:"11px", letterSpacing:"1px", display:"block", marginBottom:"6px" }}>{f.label}</label>
              <input type={f.type} value={f.value} placeholder={f.ph}
                onChange={e => f.set(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handle()}
                style={{ width:"100%", background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.15)",
                  borderRadius:"10px", padding:"12px 14px", color:"#fff", fontSize:"14px", outline:"none", boxSizing:"border-box" }}/>
            </div>
          ))}

          {err && <p style={{ color:"#fca5a5", fontSize:"12px", marginBottom:"12px" }}>{err}</p>}

          <button onClick={handle} style={{ width:"100%", background:"linear-gradient(135deg,#16a34a,#15803d)",
            color:"#fff", padding:"13px", borderRadius:"10px", border:"none", fontSize:"14px",
            fontWeight:"600", cursor:"pointer", letterSpacing:".5px", boxShadow:"0 4px 16px rgba(22,163,74,.4)" }}>
            ENTRAR
          </button>

          <div style={{ marginTop:"20px", padding:"12px", background:"rgba(22,163,74,.1)",
            borderRadius:"10px", border:"1px solid rgba(22,163,74,.2)" }}>
            <p style={{ color:"#86efac", fontSize:"11px", lineHeight:"1.8" }}>
              <strong style={{ color:"#4ade80" }}>RH Admin:</strong> rh@iben.com.br / admin123<br/>
              <strong style={{ color:"#4ade80" }}>Gestor:</strong> gestor@iben.com.br / gestor123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ user, onLogout, onDash, isDash }) {
  return (
    <header style={{ background:"linear-gradient(90deg,#052e16,#14532d)", borderBottom:"1px solid rgba(74,222,128,.15)",
      padding:"0 24px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between",
      position:"sticky", top:0, zIndex:100, boxShadow:"0 2px 20px rgba(0,0,0,.3)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>
        <span style={{ fontFamily:"Georgia,serif", fontSize:"22px", fontWeight:"700", color:"#fff", letterSpacing:"2px" }}>iBen</span>
        <div style={{ width:"1px", height:"24px", background:"rgba(74,222,128,.3)" }}/>
        <div>
          <div style={{ color:"#4ade80", fontSize:"10px", letterSpacing:"2px", fontWeight:"600" }}>MATRIZ DE DESEMPENHO</div>
          <div style={{ color:"rgba(255,255,255,.45)", fontSize:"9px", letterSpacing:"1px" }}>PORTAL DE RH</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        {user.role === "admin" && (
          <button onClick={onDash} style={{ background: isDash ? "rgba(74,222,128,.2)" : "rgba(255,255,255,.07)",
            color:"#86efac", border:`1px solid ${isDash ? "rgba(74,222,128,.4)" : "rgba(255,255,255,.1)"}`,
            borderRadius:"8px", padding:"7px 14px", fontSize:"12px", cursor:"pointer" }}>
            📊 Dashboard
          </button>
        )}
        <div style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,.07)",
          border:"1px solid rgba(255,255,255,.1)", borderRadius:"8px", padding:"6px 12px" }}>
          <div>
            <div style={{ color:"#fff", fontSize:"12px", fontWeight:"600" }}>{user.name}</div>
            <div style={{ color:"#4ade80", fontSize:"10px" }}>{user.role === "admin" ? "Administrador RH" : "Gestor"}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ background:"rgba(239,68,68,.15)", color:"#fca5a5",
          border:"1px solid rgba(239,68,68,.3)", borderRadius:"8px", padding:"7px 12px", fontSize:"11px", cursor:"pointer" }}>
          Sair
        </button>
      </div>
    </header>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({ evaluations, onSelect }) {
  const [hovered, setHovered] = useState(null);

  const cards = [
    { key:"SEDE",  label:"Sede",  sub:"Áreas Administrativas", emoji:"🏢", count:SEDE_AREAS.length },
    { key:"OBRAS", label:"Obras", sub:"Canteiros e Projetos",   emoji:"🏗️", count:OBRAS_AREAS.length },
  ];

  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"48px 24px" }}>
      <div style={{ maxWidth:"860px", margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"52px" }}>
          <h1 style={{ fontFamily:"Georgia,serif", fontSize:"34px", fontWeight:"700", color:"#052e16", marginBottom:"10px" }}>
            Matriz de Desempenho
          </h1>
          <p style={{ color:"#6b7280", fontSize:"15px" }}>Selecione a unidade para iniciar as avaliações</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"24px", marginBottom:"40px" }}>
          {cards.map(c => (
            <button key={c.key} onClick={() => onSelect(c.key)}
              onMouseEnter={() => setHovered(c.key)} onMouseLeave={() => setHovered(null)}
              style={{ background:"#fff", border:`2px solid ${hovered===c.key?"#16a34a":"#e5e7eb"}`,
                borderRadius:"20px", padding:"44px 36px", textAlign:"left", cursor:"pointer",
                transition:"all .25s", boxShadow: hovered===c.key ? "0 16px 48px rgba(14,83,43,.18)" : "0 4px 20px rgba(0,0,0,.06)",
                transform: hovered===c.key ? "translateY(-4px)" : "translateY(0)" }}>
              <div style={{ fontSize:"52px", marginBottom:"20px" }}>{c.emoji}</div>
              <div style={{ fontSize:"28px", fontWeight:"700", color:"#052e16", fontFamily:"Georgia,serif", marginBottom:"6px" }}>{c.label}</div>
              <div style={{ color:"#6b7280", fontSize:"13px", marginBottom:"20px" }}>{c.sub}</div>
              <span style={{ background:"#dcfce7", color:"#14532d", padding:"5px 14px", borderRadius:"20px", fontSize:"12px", fontWeight:"600" }}>
                {c.count} Áreas →
              </span>
            </button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"16px" }}>
          {[
            { label:"Avaliações Realizadas", value: evaluations.length },
            { label:"Desempenho Exemplar",   value: evaluations.filter(e=>e.final==="DESEMPENHO EXEMPLAR").length },
            { label:"Pontos de Atenção",     value: evaluations.filter(e=>e.final==="PONTO DE ATENÇÃO").length },
          ].map((k,i) => (
            <div key={i} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px",
              padding:"22px 24px", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize:"30px", fontWeight:"700", color:"#14532d" }}>{k.value}</div>
              <div style={{ color:"#6b7280", fontSize:"12px", marginTop:"4px" }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── AREA LIST ────────────────────────────────────────────────────────────────
function AreaList({ sector, evaluations, onArea, onBack }) {
  const areas = sector === "SEDE" ? SEDE_AREAS : OBRAS_AREAS;
  const [search, setSearch] = useState("");
  const filtered = areas.filter(a => a.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"32px 24px" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"28px" }}>
          <button onClick={onBack} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"8px",
            padding:"8px 14px", color:"#374151", fontSize:"13px", cursor:"pointer" }}>
            ← Voltar
          </button>
          <div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"24px", fontWeight:"700", color:"#052e16" }}>{sector}</h2>
            <p style={{ color:"#6b7280", fontSize:"13px" }}>Selecione a área para avaliação</p>
          </div>
        </div>

        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar área..."
          style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:"10px", padding:"11px 16px",
            fontSize:"14px", marginBottom:"20px", outline:"none", boxSizing:"border-box", background:"#fff" }}/>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"12px" }}>
          {filtered.map(area => {
            const count = evaluations.filter(e => e.area === area).length;
            return (
              <button key={area} onClick={() => onArea(area)}
                style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"12px",
                  padding:"18px 20px", textAlign:"left", cursor:"pointer", transition:"all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#16a34a"; e.currentTarget.style.background="#f0fdf4"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background="#fff"; }}>
                <div style={{ fontWeight:"600", color:"#052e16", fontSize:"13px", marginBottom:"6px" }}>{area}</div>
                <div style={{ fontSize:"11px", color:"#9ca3af" }}>{count} avaliação{count !== 1 ? "ões" : ""}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── EVAL FORM ────────────────────────────────────────────────────────────────
function EvalForm({ area, sector, user, evaluations, setEvaluations, onBack }) {
  const blank = { name:"", role:"", q1:"", q2:"", q3:"", q4:"", q5:"", feedback:"", date:"", final:"" };
  const [form,  setForm]  = useState(blank);
  const [tab,   setTab]   = useState("form");
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.role || !form.final) {
      alert("Preencha Nome, Função e Avaliação Final antes de salvar.");
      return;
    }
    const record = { ...form, area, sector, manager: user.name, id: Date.now() };
    setEvaluations(ev => [...ev, record]);
    setSaved(true);
    setForm(blank);
    setTimeout(() => setSaved(false), 3000);
  };

  const areaEvals = evaluations.filter(e => e.area === area);

  const inp = { width:"100%", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"10px 14px",
    fontSize:"13px", outline:"none", boxSizing:"border-box", background:"#fff" };
  const sel = { ...inp, border:"1px solid #d1fae5", cursor:"pointer" };
  const lbl = { fontSize:"12px", color:"#374151", fontWeight:"600", display:"block", marginBottom:"6px", letterSpacing:".5px" };

  const questions = [
    { key:"q1", label:"Valor Igile – Enfrenta os problemas com transparência?" },
    { key:"q2", label:"Valor Kanban – Soluciona desafios?" },
    { key:"q3", label:"Valor Norma – Simplifica processos e mitiga riscos?" },
    { key:"q4", label:"Competência Técnica – Demonstra conhecimento técnico necessário para a função?" },
    { key:"q5", label:"Competência Comportamental – Mantém postura colaborativa, proativa e respeitosa?" },
  ];

  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"32px 24px" }}>
      <div style={{ maxWidth:"760px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"28px" }}>
          <button onClick={onBack} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"8px",
            padding:"8px 14px", color:"#374151", fontSize:"13px", cursor:"pointer" }}>
            ← Voltar
          </button>
          <div>
            <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:"22px", fontWeight:"700", color:"#052e16" }}>Avaliação de Desempenho</h2>
              <span style={{ background:"#dcfce7", color:"#14532d", padding:"3px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:"600" }}>{area}</span>
            </div>
            <p style={{ color:"#6b7280", fontSize:"13px" }}>{sector}</p>
          </div>
        </div>

        {/* tabs */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"24px" }}>
          {[["form","Nova Avaliação"], ["history",`Histórico (${areaEvals.length})`]].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ padding:"8px 18px", borderRadius:"8px", fontSize:"13px", cursor:"pointer",
              border:`1px solid ${tab===t?"#16a34a":"#e5e7eb"}`,
              background: tab===t ? "#14532d" : "#fff",
              color: tab===t ? "#fff" : "#374151",
              fontWeight: tab===t ? "600" : "400" }}>
              {l}
            </button>
          ))}
        </div>

        {tab === "history" ? (
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {areaEvals.length === 0 && (
              <div style={{ background:"#fff", borderRadius:"12px", padding:"40px", textAlign:"center",
                color:"#9ca3af", border:"1px solid #e5e7eb" }}>
                Nenhuma avaliação registrada para {area}.
              </div>
            )}
            {areaEvals.map(ev => (
              <div key={ev.id} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"12px",
                padding:"20px 24px", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                  <div>
                    <div style={{ fontWeight:"700", color:"#052e16", fontSize:"15px" }}>{ev.name}</div>
                    <div style={{ color:"#6b7280", fontSize:"12px" }}>{ev.role} · {ev.date}</div>
                  </div>
                  <FinalBadge value={ev.final}/>
                </div>
                {ev.feedback && <div style={{ fontSize:"12px", color:"#6b7280", lineHeight:"1.6", marginTop:"8px" }}>{ev.feedback}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"16px",
            padding:"32px", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
              <div>
                <label style={lbl}>NOME COMPLETO *</label>
                <input value={form.name} onChange={e => set("name",e.target.value)}
                  placeholder="Nome do colaborador" style={inp}/>
              </div>
              <div>
                <label style={lbl}>FUNÇÃO *</label>
                <input value={form.role} onChange={e => set("role",e.target.value)}
                  placeholder="Cargo / função" style={inp}/>
              </div>
            </div>

            <div style={{ marginBottom:"16px" }}>
              <label style={lbl}>ÁREA</label>
              <input value={area} readOnly style={{ ...inp, background:"#f0fdf4", color:"#15803d", fontWeight:"600" }}/>
            </div>

            <div style={{ borderTop:"1px solid #e5e7eb", margin:"24px 0 20px", paddingTop:"24px" }}>
              <h3 style={{ fontFamily:"Georgia,serif", fontSize:"16px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>
                Avaliação de Desempenho
              </h3>
              {questions.map((q,i) => (
                <div key={q.key} style={{ marginBottom:"14px", background:"#f8fafb", borderRadius:"10px",
                  padding:"14px 16px", border:"1px solid #e5e7eb" }}>
                  <label style={{ ...lbl, color:"#374151" }}>{i+1}. {q.label}</label>
                  <select value={form[q.key]} onChange={e => set(q.key,e.target.value)} style={sel}>
                    <option value="">Selecione...</option>
                    {PERFORMANCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div style={{ marginBottom:"16px" }}>
              <label style={lbl}>FEEDBACK / CONSIDERAÇÕES GERAIS</label>
              <textarea value={form.feedback} onChange={e => set("feedback",e.target.value)}
                rows={4} placeholder="Descreva as observações gerais sobre o desempenho do colaborador..."
                style={{ ...inp, resize:"vertical", lineHeight:"1.6" }}/>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"24px" }}>
              <div>
                <label style={lbl}>DATA DA AGENDA DE FEEDBACK</label>
                <input type="date" value={form.date} onChange={e => set("date",e.target.value)} style={inp}/>
              </div>
              <div>
                <label style={lbl}>AVALIAÇÃO FINAL *</label>
                <select value={form.final} onChange={e => set("final",e.target.value)} style={sel}>
                  <option value="">Selecione...</option>
                  {FINAL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <button onClick={handleSave} style={{ width:"100%", background:"linear-gradient(135deg,#16a34a,#15803d)",
              color:"#fff", padding:"14px", borderRadius:"10px", border:"none", fontSize:"14px",
              fontWeight:"600", cursor:"pointer", letterSpacing:".5px", boxShadow:"0 4px 16px rgba(22,163,74,.3)" }}>
              Salvar Avaliação
            </button>

            {saved && (
              <div style={{ marginTop:"12px", background:"#dcfce7", border:"1px solid #86efac",
                borderRadius:"8px", padding:"10px 16px", color:"#14532d", fontSize:"13px",
                fontWeight:"600", textAlign:"center" }}>
                ✓ Avaliação salva com sucesso!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ evaluations, onBack }) {
  const [search, setSearch] = useState("");

  const finalCounts = FINAL_OPTIONS.map(f => ({
    name: f === "BOM, MAS É PRECISO MELHORAR" ? "Bom/Melhorar" : f.split(" ").slice(0,2).join(" "),
    value: evaluations.filter(e => e.final === f).length,
  }));

  const areaCounts = [...new Set(evaluations.map(e => e.area))].map(a => ({
    name: a.length > 14 ? a.slice(0,13)+"…" : a,
    count: evaluations.filter(e => e.area === a).length,
  }));

  const valueCounts = [
    { name:"Igile",  acima:evaluations.filter(e=>e.q1==="ACIMA DA EXPECTATIVA").length,  dentro:evaluations.filter(e=>e.q1==="DENTRO DA EXPECTATIVA").length,  abaixo:evaluations.filter(e=>e.q1==="ABAIXO DA EXPECTATIVA").length },
    { name:"Kanban", acima:evaluations.filter(e=>e.q2==="ACIMA DA EXPECTATIVA").length,  dentro:evaluations.filter(e=>e.q2==="DENTRO DA EXPECTATIVA").length,  abaixo:evaluations.filter(e=>e.q2==="ABAIXO DA EXPECTATIVA").length },
    { name:"Norma",  acima:evaluations.filter(e=>e.q3==="ACIMA DA EXPECTATIVA").length,  dentro:evaluations.filter(e=>e.q3==="DENTRO DA EXPECTATIVA").length,  abaixo:evaluations.filter(e=>e.q3==="ABAIXO DA EXPECTATIVA").length },
  ];

  const managerCounts = [...new Set(evaluations.map(e => e.manager))].map(m => ({
    name: m, count: evaluations.filter(e => e.manager === m).length,
  }));

  const filtered = evaluations.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.area?.toLowerCase().includes(search.toLowerCase())
  );

  const kpis = [
    { label:"Total Avaliações",    value: evaluations.length,                                          color:"#14532d" },
    { label:"Desempenho Exemplar", value: evaluations.filter(e=>e.final==="DESEMPENHO EXEMPLAR").length, color:"#15803d" },
    { label:"Acima do Esperado",   value: evaluations.filter(e=>e.final==="ACIMA DO ESPERADO").length,   color:"#4d7c0f" },
    { label:"Pontos de Atenção",   value: evaluations.filter(e=>e.final==="PONTO DE ATENÇÃO").length,    color:"#dc2626" },
  ];

  const card = { background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px", padding:"24px" };

  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"32px 24px" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"32px" }}>
          <button onClick={onBack} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"8px",
            padding:"8px 14px", color:"#374151", fontSize:"13px", cursor:"pointer" }}>
            ← Voltar
          </button>
          <div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"24px", fontWeight:"700", color:"#052e16" }}>Dashboard Administrativo</h2>
            <p style={{ color:"#6b7280", fontSize:"13px" }}>Visão geral do desempenho organizacional – iBen Engenharia</p>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px", marginBottom:"24px" }}>
          {kpis.map((k,i) => (
            <div key={i} style={{ ...card, padding:"22px 24px" }}>
              <div style={{ fontSize:"30px", fontWeight:"700", color:k.color }}>{k.value}</div>
              <div style={{ color:"#6b7280", fontSize:"12px", marginTop:"4px" }}>{k.label}</div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"20px" }}>
          <div style={card}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Distribuição Final</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={finalCounts} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({value})=>value}>
                  {finalCounts.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Tooltip/>
                <Legend iconSize={10} wrapperStyle={{fontSize:"11px"}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Aderência aos Valores</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={valueCounts} margin={{top:0,right:10,left:-20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="name" tick={{fontSize:12}}/>
                <YAxis tick={{fontSize:11}}/>
                <Tooltip/>
                <Legend iconSize={10} wrapperStyle={{fontSize:"11px"}}/>
                <Bar dataKey="acima"  name="Acima"  fill="#22c55e" radius={[4,4,0,0]}/>
                <Bar dataKey="dentro" name="Dentro" fill="#84cc16" radius={[4,4,0,0]}/>
                <Bar dataKey="abaixo" name="Abaixo" fill="#ef4444" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts row 2 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"24px" }}>
          <div style={card}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Avaliações por Área</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={areaCounts} layout="vertical" margin={{top:0,right:10,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis type="number" tick={{fontSize:11}}/>
                <YAxis dataKey="name" type="category" tick={{fontSize:11}} width={90}/>
                <Tooltip/>
                <Bar dataKey="count" name="Avaliações" fill="#14532d" radius={[0,4,4,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Avaliações por Gestor</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={managerCounts} margin={{top:0,right:10,left:-20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="name" tick={{fontSize:11}}/>
                <YAxis tick={{fontSize:11}}/>
                <Tooltip/>
                <Bar dataKey="count" name="Avaliações" fill="#16a34a" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div style={card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", fontWeight:"700" }}>Todas as Avaliações</h3>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar colaborador ou área..."
              style={{ border:"1px solid #e5e7eb", borderRadius:"8px", padding:"8px 14px", fontSize:"13px", outline:"none", width:"240px" }}/>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"13px" }}>
              <thead>
                <tr style={{ borderBottom:"2px solid #e5e7eb" }}>
                  {["Colaborador","Função","Área","Gestor","Data","Resultado"].map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"10px 12px", color:"#6b7280",
                      fontSize:"11px", fontWeight:"600", letterSpacing:".5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(ev => (
                  <tr key={ev.id} style={{ borderBottom:"1px solid #f3f4f6" }}
                    onMouseEnter={e => e.currentTarget.style.background="#f8fafb"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"11px 12px", fontWeight:"600", color:"#052e16" }}>{ev.name}</td>
                    <td style={{ padding:"11px 12px", color:"#6b7280" }}>{ev.role}</td>
                    <td style={{ padding:"11px 12px" }}>
                      <span style={{ background:"#dcfce7", color:"#14532d", padding:"2px 8px",
                        borderRadius:"20px", fontSize:"11px", fontWeight:"600" }}>{ev.area}</span>
                    </td>
                    <td style={{ padding:"11px 12px", color:"#6b7280" }}>{ev.manager}</td>
                    <td style={{ padding:"11px 12px", color:"#6b7280" }}>{ev.date}</td>
                    <td style={{ padding:"11px 12px" }}><FinalBadge value={ev.final}/></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} style={{ padding:"32px", textAlign:"center", color:"#9ca3af" }}>
                    Nenhum resultado encontrado.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user,        setUser]        = useState(null);
  const [view,        setView]        = useState("home");
  const [sector,      setSector]      = useState(null);
  const [area,        setArea]        = useState(null);
  const [evaluations, setEvaluations] = useState(MOCK_EVALS);

  if (!user) return <LoginScreen onLogin={u => { setUser(u); setView("home"); }}/>;

  const logout = () => { setUser(null); setView("home"); setSector(null); setArea(null); };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", minHeight:"100vh" }}>
      <Header user={user} onLogout={logout}
        onDash={() => setView(v => v === "dash" ? "home" : "dash")}
        isDash={view === "dash"}/>

      {view === "dash"       && <Dashboard  evaluations={evaluations} onBack={() => setView("home")}/>}
      {view === "home"       && <Home       evaluations={evaluations} onSelect={s => { setSector(s); setView("list"); }}/>}
      {view === "list"       && <AreaList   sector={sector} evaluations={evaluations} onArea={a => { setArea(a); setView("form"); }} onBack={() => setView("home")}/>}
      {view === "form"       && <EvalForm   area={area} sector={sector} user={user} evaluations={evaluations} setEvaluations={setEvaluations} onBack={() => setView("list")}/>}
    </div>
  );
}

