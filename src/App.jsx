import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const LOGO_B64 = "data:image/png;base64,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";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const SEDE_AREAS = ["SUPRIMENTOS","PLANEJAMENTO","ORÇAMENTO","SGI","FINANCEIRO","FISCAL","SAC","JURÍDICO","INCORPORAÇÃO","PROJETOS","PROCESSOS","RH","DP"];
const OBRAS_AREAS = ["PÓS OBRA","GREENPARKS","FAHL LOTEAMENTO","PARQUE DAS ÁGUAS","CICILIATO","VECCON MORADAS","VECCON PAULÍNIA","VECCON KRONOS","VECCON LOTEAMENTO","IZZI","VALPELINE","HARMONIA","ALTUS","TAG GUEDALA","ARTEMIS","UNIQUE","ALADINO","HORIZON","SENSE"];
const PERFORMANCE_OPTIONS = ["ACIMA DA EXPECTATIVA","DENTRO DA EXPECTATIVA","ABAIXO DA EXPECTATIVA"];
const FINAL_OPTIONS = ["DESEMPENHO EXEMPLAR","ACIMA DO ESPERADO","BOM, MAS É PRECISO MELHORAR","PONTO DE ATENÇÃO"];
const PIE_COLORS = ["#22c55e","#84cc16","#f59e0b","#ef4444"];

const USERS = {
  "rh@iben.com.br":        { password:"admin123",      role:"admin",   name:"RH Administrador" },
  "gestor@iben.com.br":    { password:"gestor123",     role:"gestor",  name:"Gestores iBen" },
  "diretores@iben.com.br": { password:"diretores1234", role:"diretor", name:"Diretoria iBen" },
  "gerentes@iben.com.br":  { password:"gerencia1234",  role:"gestor",  name:"Gerentes iBen" },
};

const MOCK_EVALS = [
  { id:1, name:"Ana Souza",      role:"Analista",     area:"FINANCEIRO", sector:"SEDE",  evaluatorName:"Gestores iBen",  evaluatorRole:"gestor",  date:"2025-04-10", q1:"ACIMA DA EXPECTATIVA",  q2:"DENTRO DA EXPECTATIVA", q3:"ACIMA DA EXPECTATIVA",  q4:"ACIMA DA EXPECTATIVA",  q5:"DENTRO DA EXPECTATIVA", feedback:"Excelente profissional.",    final:"DESEMPENHO EXEMPLAR" },
  { id:2, name:"Bruno Costa",    role:"Engenheiro",   area:"GREENPARKS", sector:"OBRAS", evaluatorName:"Gestores iBen",  evaluatorRole:"gestor",  date:"2025-04-15", q1:"DENTRO DA EXPECTATIVA", q2:"DENTRO DA EXPECTATIVA", q3:"ABAIXO DA EXPECTATIVA", q4:"DENTRO DA EXPECTATIVA", q5:"DENTRO DA EXPECTATIVA", feedback:"Precisa melhorar prazos.", final:"BOM, MAS É PRECISO MELHORAR" },
  { id:3, name:"Carla Mendes",   role:"Coordenadora", area:"RH",         sector:"SEDE",  evaluatorName:"Gestores iBen",  evaluatorRole:"gestor",  date:"2025-05-02", q1:"ACIMA DA EXPECTATIVA",  q2:"ACIMA DA EXPECTATIVA",  q3:"ACIMA DA EXPECTATIVA",  q4:"ACIMA DA EXPECTATIVA",  q5:"ACIMA DA EXPECTATIVA",  feedback:"Referência para a equipe.", final:"DESEMPENHO EXEMPLAR" },
  { id:4, name:"Diego Alves",    role:"Técnico",      area:"HARMONIA",   sector:"OBRAS", evaluatorName:"Diretoria iBen", evaluatorRole:"diretor", date:"2025-05-10", q1:"ABAIXO DA EXPECTATIVA", q2:"ABAIXO DA EXPECTATIVA", q3:"DENTRO DA EXPECTATIVA", q4:"ABAIXO DA EXPECTATIVA", q5:"DENTRO DA EXPECTATIVA", feedback:"Requer acompanhamento.",    final:"PONTO DE ATENÇÃO" },
  { id:5, name:"Elisa Ferreira", role:"Advogada",     area:"JURÍDICO",   sector:"SEDE",  evaluatorName:"Diretoria iBen", evaluatorRole:"diretor", date:"2025-05-12", q1:"ACIMA DA EXPECTATIVA",  q2:"ACIMA DA EXPECTATIVA",  q3:"DENTRO DA EXPECTATIVA", q4:"ACIMA DA EXPECTATIVA",  q5:"ACIMA DA EXPECTATIVA",  feedback:"Ótimo desempenho.",         final:"ACIMA DO ESPERADO" },
];

const Q_LABELS = [
  { key:"q1", label:"Valor Igile – Enfrenta os problemas com transparência?" },
  { key:"q2", label:"Valor Kanban – Soluciona desafios?" },
  { key:"q3", label:"Valor Norma – Simplifica processos e mitiga riscos?" },
  { key:"q4", label:"Competência Técnica – Demonstra conhecimento técnico necessário para a função?" },
  { key:"q5", label:"Competência Comportamental – Mantém postura colaborativa, proativa e respeitosa?" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const FinalBadge = ({ value }) => {
  const map = {
    "DESEMPENHO EXEMPLAR":         { bg:"#dcfce7", color:"#14532d", border:"#86efac" },
    "ACIMA DO ESPERADO":           { bg:"#f7fee7", color:"#3f6212", border:"#bef264" },
    "BOM, MAS É PRECISO MELHORAR":{ bg:"#fef3c7", color:"#92400e", border:"#fcd34d" },
    "PONTO DE ATENÇÃO":            { bg:"#fee2e2", color:"#7f1d1d", border:"#fca5a5" },
  };
  const c = map[value] || { bg:"#f3f4f6", color:"#374151", border:"#d1d5db" };
  return (
    <span style={{ fontSize:"11px", fontWeight:"600", padding:"3px 10px", borderRadius:"20px",
      background:c.bg, color:c.color, border:`1px solid ${c.border}`, whiteSpace:"nowrap" }}>
      {value}
    </span>
  );
};

const RoleBadge = ({ role }) => {
  const map = {
    gestor:  { label:"Gestor",   bg:"#dbeafe", color:"#1e3a8a" },
    diretor: { label:"Diretor",  bg:"#ede9fe", color:"#4c1d95" },
    admin:   { label:"RH Admin", bg:"#dcfce7", color:"#14532d" },
  };
  const c = map[role] || { label:role, bg:"#f3f4f6", color:"#374151" };
  return (
    <span style={{ fontSize:"10px", fontWeight:"700", padding:"2px 8px", borderRadius:"20px", background:c.bg, color:c.color }}>
      {c.label}
    </span>
  );
};

const printEvaluation = (ev) => {
  const html = `<html><head><title>Avaliação – ${ev.name}</title>
  <style>
    body{font-family:'Segoe UI',sans-serif;color:#1a1a1a;margin:0;padding:32px}
    .header{background:linear-gradient(135deg,#052e16,#14532d);color:#fff;padding:24px 32px;border-radius:12px;margin-bottom:28px}
    .logo{font-family:Georgia,serif;font-size:28px;font-weight:700;letter-spacing:3px}
    .logo-sub{font-size:9px;letter-spacing:4px;color:#86efac}
    .title{font-size:18px;font-weight:600;color:#a7f3d0;margin-top:6px}
    h2{color:#052e16;font-family:Georgia,serif;border-bottom:2px solid #dcfce7;padding-bottom:8px;margin-top:28px}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
    .field{background:#f8fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px}
    .fl{font-size:10px;color:#6b7280;font-weight:600;letter-spacing:1px;margin-bottom:4px}
    .fv{font-size:14px;color:#052e16;font-weight:600}
    .q-row{background:#f0fdf4;border:1px solid #d1fae5;border-radius:8px;padding:12px 16px;margin-bottom:10px}
    .ql{font-size:12px;color:#374151;margin-bottom:6px}
    .qv{font-size:13px;font-weight:700;color:#14532d}
    .badge{display:inline-block;padding:4px 14px;border-radius:20px;font-weight:700;font-size:12px}
    .exemplar{background:#dcfce7;color:#14532d}
    .acima{background:#f7fee7;color:#3f6212}
    .bom{background:#fef3c7;color:#92400e}
    .atencao{background:#fee2e2;color:#7f1d1d}
    .fb{background:#f8fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;font-size:13px;line-height:1.7}
    .footer{margin-top:40px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;text-align:center}
  </style></head><body>
  <div class="header" style="display:flex;align-items:center;gap:24px">
    <div>
      <div class="logo">iBen</div>
      <div class="logo-sub">ENGENHARIA</div>
    </div>
    <div style="width:1px;height:40px;background:rgba(255,255,255,.3)"></div>
    <div class="title">Relatório de Avaliação de Desempenho – Matriz RH</div>
  </div>
  <h2>Dados do Colaborador</h2>
  <div class="grid">
    <div class="field"><div class="fl">NOME COMPLETO</div><div class="fv">${ev.name}</div></div>
    <div class="field"><div class="fl">FUNÇÃO</div><div class="fv">${ev.role}</div></div>
    <div class="field"><div class="fl">ÁREA</div><div class="fv">${ev.area}</div></div>
    <div class="field"><div class="fl">UNIDADE</div><div class="fv">${ev.sector}</div></div>
  </div>
  <h2>Dados da Avaliação</h2>
  <div class="grid">
    <div class="field"><div class="fl">AVALIADOR</div><div class="fv">${ev.evaluatorName}</div></div>
    <div class="field"><div class="fl">PERFIL</div><div class="fv">${ev.evaluatorRole === "gestor" ? "Gestor" : "Diretor"}</div></div>
    <div class="field"><div class="fl">DATA</div><div class="fv">${ev.date}</div></div>
    <div class="field"><div class="fl">RESULTADO FINAL</div><div class="fv"><span class="badge ${ev.final==="DESEMPENHO EXEMPLAR"?"exemplar":ev.final==="ACIMA DO ESPERADO"?"acima":ev.final==="PONTO DE ATENÇÃO"?"atencao":"bom"}">${ev.final}</span></div></div>
  </div>
  <h2>Avaliação por Critério</h2>
  ${Q_LABELS.map((q,i)=>`<div class="q-row"><div class="ql">${i+1}. ${q.label}</div><div class="qv">${ev[q.key]||"—"}</div></div>`).join("")}
  <h2>Feedback</h2>
  <div class="fb">${ev.feedback||"Nenhum feedback registrado."}</div>
  <div class="footer">Gerado em ${new Date().toLocaleDateString("pt-BR")} · iBen Engenharia · Matriz de Desempenho RH · Confidencial</div>
  </body></html>`;
  const w = window.open("","_blank");
  w.document.write(html);
  w.document.close();
  w.print();
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass,  setPass]  = useState("");
  const [err,   setErr]   = useState("");

  const handle = () => {
    const u = USERS[email.trim().toLowerCase()];
    if (u && u.password === pass) { onLogin({ ...u, email }); }
    else { setErr("Credenciais inválidas. Verifique e tente novamente."); }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:"linear-gradient(135deg,#052e16 0%,#14532d 55%,#166534 100%)" }}>
      <div style={{ position:"absolute", inset:0,
        backgroundImage:"radial-gradient(circle at 20% 50%,rgba(74,222,128,.06) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(22,163,74,.08) 0%,transparent 40%)" }}/>
      <div style={{ position:"relative", width:"100%", maxWidth:"360px", margin:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ display:"inline-block", background:"#fff", backdropFilter:"blur(12px)",
            borderRadius:"16px", padding:"14px 32px", border:"1px solid rgba(255,255,255,.2)" }}>
            <img src={LOGO_B64} alt="iBen Engenharia" style={{ height:"52px", display:"block" }}/>
          </div>
        </div>
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
        <img src={LOGO_B64} alt="iBen" style={{ height:"32px", filter:"brightness(0) invert(1)" }}/>
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
            <div style={{ color:"#4ade80", fontSize:"10px" }}>
              {user.role==="admin"?"Administrador RH":user.role==="diretor"?"Diretor":"Gestor"}
            </div>
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
function Home({ user, evaluations, onSelect }) {
  const [hovered, setHovered] = useState(null);
  const myEvals = user.role === "admin"
    ? evaluations
    : evaluations.filter(e => e.evaluatorName === user.name);

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
          {[
            { key:"SEDE",  label:"Sede",  sub:"Áreas Administrativas", emoji:"🏢", count:SEDE_AREAS.length },
            { key:"OBRAS", label:"Obras", sub:"Canteiros e Projetos",   emoji:"🏗️", count:OBRAS_AREAS.length },
          ].map(c => (
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
            { label:"Avaliações Realizadas", value: myEvals.length },
            { label:"Desempenho Exemplar",   value: myEvals.filter(e=>e.final==="DESEMPENHO EXEMPLAR").length },
            { label:"Pontos de Atenção",     value: myEvals.filter(e=>e.final==="PONTO DE ATENÇÃO").length },
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
function AreaList({ sector, user, evaluations, onArea, onBack }) {
  const areas = sector === "SEDE" ? SEDE_AREAS : OBRAS_AREAS;
  const [search, setSearch] = useState("");
  const filtered = areas.filter(a => a.toLowerCase().includes(search.toLowerCase()));
  const myEvals = user.role === "admin" ? evaluations : evaluations.filter(e => e.evaluatorName === user.name);

  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"32px 24px" }}>
      <div style={{ maxWidth:"900px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"28px" }}>
          <button onClick={onBack} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"8px",
            padding:"8px 14px", color:"#374151", fontSize:"13px", cursor:"pointer" }}>← Voltar</button>
          <div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"24px", fontWeight:"700", color:"#052e16" }}>{sector}</h2>
            <p style={{ color:"#6b7280", fontSize:"13px" }}>Selecione a área</p>
          </div>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar área..."
          style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:"10px", padding:"11px 16px",
            fontSize:"14px", marginBottom:"20px", outline:"none", boxSizing:"border-box", background:"#fff" }}/>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"12px" }}>
          {filtered.map(area => {
            const count = myEvals.filter(e => e.area === area).length;
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

// ─── EVALUATION DETAIL ────────────────────────────────────────────────────────
function EvalDetail({ ev, user, onBack, onEdit, onDelete }) {
  const canModify = user.role === "admin" || ev.evaluatorName === user.name;
  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"32px 24px" }}>
      <div style={{ maxWidth:"720px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"24px", flexWrap:"wrap", gap:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <button onClick={onBack} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"8px",
              padding:"8px 14px", color:"#374151", fontSize:"13px", cursor:"pointer" }}>← Voltar</button>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"22px", fontWeight:"700", color:"#052e16" }}>Detalhes da Avaliação</h2>
          </div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
            <button onClick={() => printEvaluation(ev)}
              style={{ background:"#14532d", color:"#fff", border:"none", borderRadius:"8px",
                padding:"8px 16px", fontSize:"12px", cursor:"pointer", fontWeight:"600" }}>
              📄 Exportar PDF
            </button>
            {canModify && <>
              <button onClick={() => onEdit(ev)}
                style={{ background:"#fff", border:"1px solid #16a34a", color:"#14532d",
                  borderRadius:"8px", padding:"8px 16px", fontSize:"12px", cursor:"pointer", fontWeight:"600" }}>
                ✏️ Editar
              </button>
              <button onClick={() => { if(window.confirm("Deseja excluir esta avaliação?")) onDelete(ev.id); }}
                style={{ background:"#fff", border:"1px solid #ef4444", color:"#dc2626",
                  borderRadius:"8px", padding:"8px 16px", fontSize:"12px", cursor:"pointer", fontWeight:"600" }}>
                🗑️ Excluir
              </button>
            </>}
          </div>
        </div>

        <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"16px",
          padding:"32px", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>
          <div style={{ background:"linear-gradient(135deg,#052e16,#14532d)", borderRadius:"12px",
            padding:"20px 24px", marginBottom:"24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
            <div>
              <div style={{ fontFamily:"Georgia,serif", fontSize:"20px", fontWeight:"700", color:"#fff" }}>{ev.name}</div>
              <div style={{ color:"#86efac", fontSize:"13px", marginTop:"4px" }}>{ev.role} · {ev.area} · {ev.sector}</div>
            </div>
            <FinalBadge value={ev.final}/>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"24px" }}>
            {[
              { label:"AVALIADOR",          value: ev.evaluatorName },
              { label:"PERFIL DO AVALIADOR",value: ev.evaluatorRole === "gestor" ? "Gestor" : "Diretor" },
              { label:"DATA DA AVALIAÇÃO",  value: ev.date },
              { label:"UNIDADE",            value: ev.sector },
            ].map(f => (
              <div key={f.label} style={{ background:"#f8fafb", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"12px 16px" }}>
                <div style={{ fontSize:"10px", color:"#6b7280", fontWeight:"600", letterSpacing:"1px", marginBottom:"4px" }}>{f.label}</div>
                <div style={{ fontSize:"14px", color:"#052e16", fontWeight:"600" }}>{f.value}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"14px", fontWeight:"700" }}>Avaliação por Critério</h3>
          {Q_LABELS.map((q, i) => (
            <div key={q.key} style={{ background:"#f0fdf4", border:"1px solid #d1fae5", borderRadius:"8px", padding:"12px 16px", marginBottom:"10px" }}>
              <div style={{ fontSize:"12px", color:"#374151", marginBottom:"6px" }}>{i+1}. {q.label}</div>
              <div style={{ fontSize:"13px", fontWeight:"700", color:"#14532d" }}>{ev[q.key] || "—"}</div>
            </div>
          ))}

          <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", margin:"20px 0 10px", fontWeight:"700" }}>Feedback</h3>
          <div style={{ background:"#f8fafb", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"16px", fontSize:"13px", color:"#374151", lineHeight:"1.7" }}>
            {ev.feedback || "Nenhum feedback registrado."}
          </div>

          <div style={{ marginTop:"20px", display:"flex", alignItems:"center", gap:"12px", background:"#f0fdf4",
            border:"1px solid #d1fae5", borderRadius:"10px", padding:"14px 18px" }}>
            <span style={{ fontSize:"12px", color:"#374151", fontWeight:"600" }}>AVALIAÇÃO FINAL:</span>
            <FinalBadge value={ev.final}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EVAL FORM ────────────────────────────────────────────────────────────────
function EvalForm({ area, sector, user, evaluations, setEvaluations, onBack, editTarget, setEditTarget }) {
  const blank = { name:"", role:"", q1:"", q2:"", q3:"", q4:"", q5:"", feedback:"", date:"", final:"" };
  const [form,     setForm]     = useState(editTarget ? { ...editTarget } : blank);
  const [tab,      setTab]      = useState("form");
  const [saved,    setSaved]    = useState(false);
  const [detailEv, setDetailEv] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Visibility rules: admin sees all; gestor sees own; diretor sees own
  const areaEvals = evaluations.filter(e => {
    if (e.area !== area) return false;
    if (user.role === "admin") return true;
    return e.evaluatorName === user.name;
  });

  const handleSave = () => {
    if (!form.name || !form.role || !form.final) {
      alert("Preencha Nome, Função e Avaliação Final antes de salvar.");
      return;
    }
    const record = { ...form, area, sector, evaluatorName: user.name, evaluatorRole: user.role, id: editTarget ? editTarget.id : Date.now() };
    if (editTarget) {
      setEvaluations(ev => ev.map(e => e.id === editTarget.id ? record : e));
      setEditTarget(null);
    } else {
      setEvaluations(ev => [...ev, record]);
    }
    setSaved(true);
    setForm(blank);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = (id) => {
    setEvaluations(ev => ev.filter(e => e.id !== id));
    setDetailEv(null);
  };

  const handleEdit = (ev) => {
    setForm({ ...ev });
    setEditTarget(ev);
    setDetailEv(null);
    setTab("form");
  };

  if (detailEv) return (
    <EvalDetail ev={detailEv} user={user}
      onBack={() => setDetailEv(null)}
      onEdit={handleEdit}
      onDelete={handleDelete}/>
  );

  const inp = { width:"100%", border:"1px solid #e5e7eb", borderRadius:"8px", padding:"10px 14px", fontSize:"13px", outline:"none", boxSizing:"border-box", background:"#fff" };
  const sel = { ...inp, border:"1px solid #d1fae5", cursor:"pointer" };
  const lbl = { fontSize:"12px", color:"#374151", fontWeight:"600", display:"block", marginBottom:"6px", letterSpacing:".5px" };

  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"32px 24px" }}>
      <div style={{ maxWidth:"760px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"28px" }}>
          <button onClick={onBack} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"8px",
            padding:"8px 14px", color:"#374151", fontSize:"13px", cursor:"pointer" }}>← Voltar</button>
          <div>
            <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:"22px", fontWeight:"700", color:"#052e16" }}>
                {editTarget ? "Editar Avaliação" : "Avaliação de Desempenho"}
              </h2>
              <span style={{ background:"#dcfce7", color:"#14532d", padding:"3px 10px", borderRadius:"20px", fontSize:"11px", fontWeight:"600" }}>{area}</span>
            </div>
            <p style={{ color:"#6b7280", fontSize:"13px" }}>{sector}</p>
          </div>
        </div>

        <div style={{ display:"flex", gap:"8px", marginBottom:"24px" }}>
          {[["form", editTarget ? "Editar" : "Nova Avaliação"], ["history",`Histórico (${areaEvals.length})`]].map(([t,l]) => (
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
              <button key={ev.id} onClick={() => setDetailEv(ev)}
                style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"12px",
                  padding:"18px 24px", textAlign:"left", cursor:"pointer", width:"100%",
                  transition:"all .2s", boxShadow:"0 2px 8px rgba(0,0,0,.04)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#16a34a"; e.currentTarget.style.background="#f0fdf4"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background="#fff"; }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div>
                    <div style={{ fontWeight:"700", color:"#052e16", fontSize:"15px" }}>{ev.name}</div>
                    <div style={{ color:"#6b7280", fontSize:"12px", marginTop:"3px", display:"flex", gap:"8px", alignItems:"center" }}>
                      <span>{ev.role} · {ev.date}</span>
                      <RoleBadge role={ev.evaluatorRole}/>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                    <FinalBadge value={ev.final}/>
                    <span style={{ color:"#9ca3af", fontSize:"12px" }}>→</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"16px",
            padding:"32px", boxShadow:"0 4px 20px rgba(0,0,0,.06)" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
              <div>
                <label style={lbl}>NOME COMPLETO *</label>
                <input value={form.name} onChange={e => set("name",e.target.value)} placeholder="Nome do colaborador" style={inp}/>
              </div>
              <div>
                <label style={lbl}>FUNÇÃO *</label>
                <input value={form.role} onChange={e => set("role",e.target.value)} placeholder="Cargo / função" style={inp}/>
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
              {Q_LABELS.map((q, i) => (
                <div key={q.key} style={{ marginBottom:"14px", background:"#f8fafb", borderRadius:"10px", padding:"14px 16px", border:"1px solid #e5e7eb" }}>
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

            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={handleSave} style={{ flex:1, background:"linear-gradient(135deg,#16a34a,#15803d)",
                color:"#fff", padding:"14px", borderRadius:"10px", border:"none", fontSize:"14px",
                fontWeight:"600", cursor:"pointer", letterSpacing:".5px", boxShadow:"0 4px 16px rgba(22,163,74,.3)" }}>
                {editTarget ? "Atualizar Avaliação" : "Salvar Avaliação"}
              </button>
              {editTarget && (
                <button onClick={() => { setEditTarget(null); setForm(blank); }}
                  style={{ background:"#fff", border:"1px solid #e5e7eb", color:"#374151",
                    padding:"14px 20px", borderRadius:"10px", fontSize:"13px", cursor:"pointer" }}>
                  Cancelar
                </button>
              )}
            </div>

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
  const [dashType, setDashType] = useState("gestores");
  const [search,   setSearch]   = useState("");

  const baseEvals = evaluations.filter(e =>
    dashType === "gestores" ? e.evaluatorRole === "gestor" : e.evaluatorRole === "diretor"
  );

  const finalCounts = FINAL_OPTIONS.map(f => ({
    name: f === "BOM, MAS É PRECISO MELHORAR" ? "Bom/Melhorar" : f.split(" ").slice(0,2).join(" "),
    value: baseEvals.filter(e => e.final === f).length,
  }));

  const areaCounts = [...new Set(baseEvals.map(e => e.area))].map(a => ({
    name: a.length > 14 ? a.slice(0,13)+"…" : a,
    count: baseEvals.filter(e => e.area === a).length,
  }));

  const valueCounts = [
    { name:"Igile",  acima:baseEvals.filter(e=>e.q1==="ACIMA DA EXPECTATIVA").length,  dentro:baseEvals.filter(e=>e.q1==="DENTRO DA EXPECTATIVA").length,  abaixo:baseEvals.filter(e=>e.q1==="ABAIXO DA EXPECTATIVA").length },
    { name:"Kanban", acima:baseEvals.filter(e=>e.q2==="ACIMA DA EXPECTATIVA").length,  dentro:baseEvals.filter(e=>e.q2==="DENTRO DA EXPECTATIVA").length,  abaixo:baseEvals.filter(e=>e.q2==="ABAIXO DA EXPECTATIVA").length },
    { name:"Norma",  acima:baseEvals.filter(e=>e.q3==="ACIMA DA EXPECTATIVA").length,  dentro:baseEvals.filter(e=>e.q3==="DENTRO DA EXPECTATIVA").length,  abaixo:baseEvals.filter(e=>e.q3==="ABAIXO DA EXPECTATIVA").length },
  ];

  const managerCounts = [...new Set(baseEvals.map(e => e.evaluatorName))].map(m => ({
    name: m, count: baseEvals.filter(e => e.evaluatorName === m).length,
  }));

  const filtered = baseEvals.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.area?.toLowerCase().includes(search.toLowerCase())
  );

  const card = { background:"#fff", border:"1px solid #e5e7eb", borderRadius:"14px", padding:"24px" };

  return (
    <div style={{ minHeight:"calc(100vh - 60px)", background:"#f8fafb", padding:"32px 24px" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"28px" }}>
          <button onClick={onBack} style={{ background:"#fff", border:"1px solid #e5e7eb", borderRadius:"8px",
            padding:"8px 14px", color:"#374151", fontSize:"13px", cursor:"pointer" }}>← Voltar</button>
          <div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"24px", fontWeight:"700", color:"#052e16" }}>Dashboard Administrativo</h2>
            <p style={{ color:"#6b7280", fontSize:"13px" }}>Exclusivo RH · Dados separados por público avaliador</p>
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"24px", background:"#fff", border:"1px solid #e5e7eb",
          borderRadius:"12px", padding:"6px", width:"fit-content" }}>
          {[["gestores","👥 Gestores"],["diretores","🏛️ Diretores"]].map(([k,l]) => (
            <button key={k} onClick={() => setDashType(k)} style={{ padding:"9px 22px", borderRadius:"8px",
              fontSize:"13px", cursor:"pointer", border:"none",
              background: dashType===k ? "#14532d" : "transparent",
              color: dashType===k ? "#fff" : "#374151",
              fontWeight: dashType===k ? "700" : "400" }}>
              {l}
            </button>
          ))}
        </div>

        {/* KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px", marginBottom:"24px" }}>
          {[
            { label:"Total Avaliações",    value: baseEvals.length,                                              color:"#14532d" },
            { label:"Desempenho Exemplar", value: baseEvals.filter(e=>e.final==="DESEMPENHO EXEMPLAR").length,   color:"#15803d" },
            { label:"Acima do Esperado",   value: baseEvals.filter(e=>e.final==="ACIMA DO ESPERADO").length,     color:"#4d7c0f" },
            { label:"Pontos de Atenção",   value: baseEvals.filter(e=>e.final==="PONTO DE ATENÇÃO").length,      color:"#dc2626" },
          ].map((k,i) => (
            <div key={i} style={{ ...card, padding:"22px 24px" }}>
              <div style={{ fontSize:"30px", fontWeight:"700", color:k.color }}>{k.value}</div>
              <div style={{ color:"#6b7280", fontSize:"12px", marginTop:"4px" }}>{k.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"20px" }}>
          <div style={card}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Distribuição Final</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={finalCounts} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({value})=>value||""}>
                  {finalCounts.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Tooltip/><Legend iconSize={10} wrapperStyle={{fontSize:"11px"}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Aderência aos Valores</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={valueCounts} margin={{top:0,right:10,left:-20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="name" tick={{fontSize:12}}/><YAxis tick={{fontSize:11}}/><Tooltip/>
                <Legend iconSize={10} wrapperStyle={{fontSize:"11px"}}/>
                <Bar dataKey="acima"  name="Acima"  fill="#22c55e" radius={[4,4,0,0]}/>
                <Bar dataKey="dentro" name="Dentro" fill="#84cc16" radius={[4,4,0,0]}/>
                <Bar dataKey="abaixo" name="Abaixo" fill="#ef4444" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"24px" }}>
          <div style={card}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Por Área</h3>
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
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", marginBottom:"20px", fontWeight:"700" }}>Por Avaliador</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={managerCounts} margin={{top:0,right:10,left:-20,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis dataKey="name" tick={{fontSize:11}}/><YAxis tick={{fontSize:11}}/><Tooltip/>
                <Bar dataKey="count" name="Avaliações" fill="#16a34a" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
            <h3 style={{ fontFamily:"Georgia,serif", fontSize:"15px", color:"#052e16", fontWeight:"700" }}>
              Avaliações – {dashType === "gestores" ? "Gestores" : "Diretores"}
            </h3>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..."
              style={{ border:"1px solid #e5e7eb", borderRadius:"8px", padding:"8px 14px", fontSize:"13px", outline:"none", width:"220px" }}/>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"13px" }}>
              <thead>
                <tr style={{ borderBottom:"2px solid #e5e7eb" }}>
                  {["Colaborador","Função","Área","Avaliador","Perfil","Data","Resultado"].map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"10px 12px", color:"#6b7280", fontSize:"11px", fontWeight:"600", letterSpacing:".5px" }}>{h}</th>
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
                      <span style={{ background:"#dcfce7", color:"#14532d", padding:"2px 8px", borderRadius:"20px", fontSize:"11px", fontWeight:"600" }}>{ev.area}</span>
                    </td>
                    <td style={{ padding:"11px 12px", color:"#6b7280" }}>{ev.evaluatorName}</td>
                    <td style={{ padding:"11px 12px" }}><RoleBadge role={ev.evaluatorRole}/></td>
                    <td style={{ padding:"11px 12px", color:"#6b7280" }}>{ev.date}</td>
                    <td style={{ padding:"11px 12px" }}><FinalBadge value={ev.final}/></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} style={{ padding:"32px", textAlign:"center", color:"#9ca3af" }}>Nenhum resultado.</td></tr>
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
  const [editTarget,  setEditTarget]  = useState(null);

  if (!user) return <LoginScreen onLogin={u => { setUser(u); setView("home"); }}/>;

  const logout = () => { setUser(null); setView("home"); setSector(null); setArea(null); setEditTarget(null); };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", minHeight:"100vh" }}>
      <Header user={user} onLogout={logout}
        onDash={() => setView(v => v === "dash" ? "home" : "dash")}
        isDash={view === "dash"}/>

      {view === "dash" && user.role === "admin" &&
        <Dashboard evaluations={evaluations} onBack={() => setView("home")}/>}
      {view === "home" &&
        <Home user={user} evaluations={evaluations} onSelect={s => { setSector(s); setView("list"); }}/>}
      {view === "list" &&
        <AreaList sector={sector} user={user} evaluations={evaluations}
          onArea={a => { setArea(a); setView("form"); }} onBack={() => setView("home")}/>}
      {view === "form" &&
        <EvalForm area={area} sector={sector} user={user}
          evaluations={evaluations} setEvaluations={setEvaluations}
          onBack={() => setView("list")}
          editTarget={editTarget} setEditTarget={setEditTarget}/>}
    </div>
  );
}
