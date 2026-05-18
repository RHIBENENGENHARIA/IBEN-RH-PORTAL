import { useState, useEffect, useRef } from "react";

// ─── BRAND COLORS ────────────────────────────────────────────────────────────
const C = {
  green: "#1a7a4a",
  greenLight: "#e8f5ee",
  greenMid: "#2ea96b",
  greenDark: "#0f4f30",
  black: "#0d0d0d",
  white: "#ffffff",
  gray50: "#f8f9fa",
  gray100: "#f1f3f5",
  gray200: "#e9ecef",
  gray300: "#dee2e6",
  gray400: "#ced4da",
  gray500: "#adb5bd",
  gray600: "#6c757d",
  gray700: "#495057",
  gray800: "#343a40",
  amber: "#f59e0b",
  red: "#dc2626",
  blue: "#2563eb",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const INITIAL_VAGAS = [
  {
    id: "IBN-2024-001",
    funcao: "Engenheiro Civil Sênior",
    local: "Obra Residencial Vila Nova",
    gestor: "Carlos Mendes",
    area: "Engenharia",
    status: "Em andamento",
    dataAbertura: "2024-01-15",
    dataInicio: "2024-02-01",
    quantidade: 2,
    salario: "R$ 8.500",
    regime: "CLT",
    tipo: "Aumento de quadro",
    horario: "08:00 - 18:00",
    centroCusto: "CC-001-OBRAS",
    justificativa: "Expansão do projeto Vila Nova requer reforço na equipe técnica.",
    atividades: "Gerenciamento de equipe, fiscalização de obras, elaboração de laudos técnicos.",
    requisitos: "CREA ativo, 5+ anos de experiência em obras residenciais.",
    perfil: "Proativo, liderança, comunicativo.",
    diferenciais: "Experiência com BIM, conhecimento em Revit.",
    notebook: true,
    sistemas: ["E-mail corporativo", "SharePoint", "AutoCAD", "Revit"],
    recrutamento: { status: "Em andamento", responsavel: "Aline Santos", updatedAt: "2024-01-18 14:30" },
    ti_equipamento: { status: "Em processo de compra", responsavel: "TI", updatedAt: "2024-01-19 09:00" },
    ti_configuracao: { status: "Pendente", responsavel: "TI", updatedAt: "" },
    dp: { status: "A iniciar", responsavel: "Amanda Garcia", updatedAt: "" },
    integracao: { data: "", observacoes: "", responsavel: "", updatedAt: "" },
    timeline: [
      { data: "2024-01-15 10:00", acao: "Vaga aberta", usuario: "Carlos Mendes" },
      { data: "2024-01-16 09:30", acao: "Recrutamento iniciado", usuario: "Aline Santos" },
      { data: "2024-01-18 14:30", acao: "Recrutamento: Em andamento", usuario: "Aline Santos" },
      { data: "2024-01-19 09:00", acao: "TI: Equipamento em processo de compra", usuario: "TI" },
    ],
    progresso: 35,
  },
  {
    id: "IBN-2024-002",
    funcao: "Analista de RH",
    local: "Sede Administrativa",
    gestor: "Patricia Lima",
    area: "Recursos Humanos",
    status: "Concluído",
    dataAbertura: "2024-01-05",
    dataInicio: "2024-01-25",
    quantidade: 1,
    salario: "R$ 4.200",
    regime: "CLT",
    tipo: "Substituição",
    horario: "08:00 - 17:00",
    centroCusto: "CC-002-ADM",
    justificativa: "Substituição por desligamento.",
    atividades: "Recrutamento, seleção, gestão de benefícios, folha de pagamento.",
    requisitos: "Superior completo em Psicologia ou RH, 3+ anos de experiência.",
    perfil: "Organizado, empático, discreto.",
    diferenciais: "Experiência com TOTVS.",
    notebook: true,
    sistemas: ["E-mail corporativo", "SharePoint", "TOTVS"],
    recrutamento: { status: "Concluído", responsavel: "Aline Santos", updatedAt: "2024-01-20 11:00" },
    ti_equipamento: { status: "Concluído", responsavel: "TI", updatedAt: "2024-01-21 14:00" },
    ti_configuracao: { status: "Concluído", responsavel: "TI", updatedAt: "2024-01-22 10:00" },
    dp: { status: "Concluído", responsavel: "Amanda Garcia", updatedAt: "2024-01-24 16:00" },
    integracao: { data: "2024-01-25", observacoes: "Integração realizada com sucesso.", responsavel: "Thainara", updatedAt: "2024-01-25 09:00" },
    timeline: [
      { data: "2024-01-05 08:30", acao: "Vaga aberta", usuario: "Patricia Lima" },
      { data: "2024-01-06 10:00", acao: "Recrutamento iniciado", usuario: "Aline Santos" },
      { data: "2024-01-20 11:00", acao: "Recrutamento concluído", usuario: "Aline Santos" },
      { data: "2024-01-21 14:00", acao: "TI: Equipamento comprado", usuario: "TI" },
      { data: "2024-01-22 10:00", acao: "TI: Configuração concluída", usuario: "TI" },
      { data: "2024-01-24 16:00", acao: "DP: Documentação concluída", usuario: "Amanda Garcia" },
      { data: "2024-01-25 09:00", acao: "Integração realizada", usuario: "Thainara" },
    ],
    progresso: 100,
  },
  {
    id: "IBN-2024-003",
    funcao: "Técnico em Segurança do Trabalho",
    local: "Obra Comercial Centro",
    gestor: "Roberto Alves",
    area: "Segurança",
    status: "Aberto",
    dataAbertura: "2024-01-20",
    dataInicio: "2024-02-10",
    quantidade: 1,
    salario: "R$ 5.800",
    regime: "CLT",
    tipo: "Aumento de quadro",
    horario: "07:00 - 16:00",
    centroCusto: "CC-003-OBR",
    justificativa: "Nova obra exige profissional dedicado de segurança.",
    atividades: "Elaboração de DDS, inspeções de segurança, treinamentos NR.",
    requisitos: "Técnico em Segurança do Trabalho, CIPA, NR-35.",
    perfil: "Disciplinado, comunicativo, atento.",
    diferenciais: "Experiência em obras de grande porte.",
    notebook: false,
    sistemas: ["E-mail corporativo"],
    recrutamento: { status: "A iniciar", responsavel: "Aline Santos", updatedAt: "" },
    ti_equipamento: { status: "Não necessário", responsavel: "TI", updatedAt: "" },
    ti_configuracao: { status: "A iniciar", responsavel: "TI", updatedAt: "" },
    dp: { status: "A iniciar", responsavel: "Amanda Garcia", updatedAt: "" },
    integracao: { data: "", observacoes: "", responsavel: "", updatedAt: "" },
    timeline: [
      { data: "2024-01-20 15:00", acao: "Vaga aberta", usuario: "Roberto Alves" },
    ],
    progresso: 5,
  },
];

const USERS = {
  gestor: { nome: "Carlos Mendes", cargo: "Gerente de Obras", perfil: "gestor", avatar: "CM" },
  rh: { nome: "Aline Santos", cargo: "Analista de RH", perfil: "rh", avatar: "AS" },
  ti: { nome: "Paulo Ferreira", cargo: "Analista de TI", perfil: "ti", avatar: "PF" },
  dp: { nome: "Amanda Garcia", cargo: "Analista de DP", perfil: "dp", avatar: "AG" },
  integracao: { nome: "Thainara Oliveira", cargo: "Analista de Integração", perfil: "integracao", avatar: "TO" },
  admin: { nome: "Patricia Lima", cargo: "Diretora de RH", perfil: "admin", avatar: "PL" },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const statusColor = (s) => {
  if (!s || s === "Pendente" || s === "A iniciar" || s === "Não necessário") return { bg: C.gray100, text: C.gray600, dot: C.gray400 };
  if (s === "Em andamento" || s === "Em processo de compra" || s === "Em processo de configuração") return { bg: "#fff8e1", text: "#92600a", dot: C.amber };
  if (s === "Concluído") return { bg: C.greenLight, text: C.greenDark, dot: C.greenMid };
  if (s === "Aberto") return { bg: "#eff6ff", text: "#1e40af", dot: C.blue };
  return { bg: C.gray100, text: C.gray600, dot: C.gray400 };
};

const Badge = ({ label }) => {
  const c = statusColor(label);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: c.bg, color: c.text,
      padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {label || "Pendente"}
    </span>
  );
};

const ProgressBar = ({ value }) => (
  <div style={{ background: C.gray200, borderRadius: 10, height: 8, overflow: "hidden" }}>
    <div style={{
      height: "100%", borderRadius: 10,
      background: value === 100 ? C.greenMid : value > 50 ? C.green : value > 20 ? C.amber : C.gray400,
      width: `${value}%`, transition: "width 0.5s ease",
    }} />
  </div>
);

const generateId = () => {
  const d = new Date();
  return `IBN-${d.getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`;
};

const now = () => {
  const d = new Date();
  return `${d.toISOString().slice(0, 10)} ${d.toTimeString().slice(0, 5)}`;
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function IbenVagas() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [vagas, setVagas] = useState(INITIAL_VAGAS);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [filtro, setFiltro] = useState({ area: "", status: "", gestor: "", busca: "" });
  const [notifs, setNotifs] = useState([
    { id: 1, msg: "Nova vaga IBN-2024-003 aberta por Roberto Alves", tipo: "info", lida: false },
    { id: 2, msg: "Pendência: IBN-2024-001 aguarda configuração de TI", tipo: "aviso", lida: false },
  ]);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, tipo = "success") => {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 3500);
  };

  const updateVaga = (id, patch) => {
    setVagas(prev => prev.map(v => v.id === id ? { ...v, ...patch } : v));
  };

  const addVaga = (nova) => {
    setVagas(prev => [nova, ...prev]);
    setNotifs(prev => [{ id: Date.now(), msg: `Nova vaga ${nova.id} aberta por ${nova.gestor}`, tipo: "info", lida: false }, ...prev]);
  };

  if (!user) return <LoginScreen onLogin={setUser} />;

  const vagasFiltradas = vagas.filter(v => {
    if (filtro.area && v.area !== filtro.area) return false;
    if (filtro.status && v.status !== filtro.status) return false;
    if (filtro.gestor && !v.gestor.toLowerCase().includes(filtro.gestor.toLowerCase())) return false;
    if (filtro.busca && !`${v.funcao} ${v.local} ${v.id}`.toLowerCase().includes(filtro.busca.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: C.gray50, color: C.black, overflow: "hidden" }}>
      {/* SIDEBAR */}
      <Sidebar page={page} setPage={setPage} user={user} setUser={setUser} setShowForm={setShowForm} />

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* TOPBAR */}
        <div style={{
          background: C.white, borderBottom: `1px solid ${C.gray200}`,
          padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.black }}>
              {page === "dashboard" && "Dashboard"}
              {page === "minhas" && "Minhas Solicitações"}
              {page === "rh" && "Painel RH"}
              {page === "ti" && "Painel TI"}
              {page === "dp" && "Painel DP"}
              {page === "integracao" && "Painel Integração"}
              {page === "todas" && "Todas as Vagas"}
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Notificações */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifs(!showNotifs)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 6,
                color: C.gray600, fontSize: 20, position: "relative",
              }}>
                🔔
                {notifs.filter(n => !n.lida).length > 0 && (
                  <span style={{
                    position: "absolute", top: 2, right: 2,
                    background: C.red, color: C.white, borderRadius: "50%",
                    width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700,
                  }}>{notifs.filter(n => !n.lida).length}</span>
                )}
              </button>
              {showNotifs && (
                <div style={{
                  position: "absolute", right: 0, top: 44, width: 320, background: C.white,
                  border: `1px solid ${C.gray200}`, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  zIndex: 100, overflow: "hidden",
                }}>
                  <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.gray100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: 14 }}>Notificações</strong>
                    <button onClick={() => { setNotifs(prev => prev.map(n => ({ ...n, lida: true }))); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.green, fontSize: 12 }}>Marcar todas</button>
                  </div>
                  {notifs.map(n => (
                    <div key={n.id} style={{
                      padding: "12px 16px", borderBottom: `1px solid ${C.gray100}`,
                      background: n.lida ? C.white : C.greenLight,
                      display: "flex", gap: 10, alignItems: "flex-start",
                    }}>
                      <span>{n.tipo === "info" ? "ℹ️" : "⚠️"}</span>
                      <span style={{ fontSize: 13, color: C.gray700 }}>{n.msg}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: C.green, color: C.white,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
              }}>{user.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{user.nome}</div>
                <div style={{ fontSize: 11, color: C.gray500 }}>{user.cargo}</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {page === "dashboard" && (
            <Dashboard vagas={vagas} setPage={setPage} setVagaSelecionada={setVagaSelecionada} />
          )}
          {(page === "minhas" || page === "todas") && (
            <ListaVagas
              vagas={vagasFiltradas} filtro={filtro} setFiltro={setFiltro}
              setVagaSelecionada={(v) => { setVagaSelecionada(v); setPage("detalhe"); }}
              user={user}
            />
          )}
          {page === "rh" && <PainelRH vagas={vagas} user={user} updateVaga={updateVaga} showToast={showToast} setVagaSelecionada={(v) => { setVagaSelecionada(v); setPage("detalhe"); }} />}
          {page === "ti" && <PainelTI vagas={vagas} user={user} updateVaga={updateVaga} showToast={showToast} setVagaSelecionada={(v) => { setVagaSelecionada(v); setPage("detalhe"); }} />}
          {page === "dp" && <PainelDP vagas={vagas} user={user} updateVaga={updateVaga} showToast={showToast} setVagaSelecionada={(v) => { setVagaSelecionada(v); setPage("detalhe"); }} />}
          {page === "integracao" && <PainelIntegracao vagas={vagas} user={user} updateVaga={updateVaga} showToast={showToast} setVagaSelecionada={(v) => { setVagaSelecionada(v); setPage("detalhe"); }} />}
          {page === "detalhe" && vagaSelecionada && (
            <DetalheVaga
              vaga={vagas.find(v => v.id === vagaSelecionada.id) || vagaSelecionada}
              user={user} updateVaga={updateVaga} showToast={showToast}
              onBack={() => setPage("todas")}
            />
          )}
        </div>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <FormModal
          user={user} onClose={() => setShowForm(false)}
          onSave={(nova) => { addVaga(nova); setShowForm(false); showToast(`Vaga ${nova.id} aberta com sucesso!`); }}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: toast.tipo === "success" ? C.green : C.red,
          color: C.white, padding: "12px 20px", borderRadius: 10,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)", fontSize: 14, fontWeight: 500,
          animation: "slideUp 0.3s ease",
        }}>
          {toast.tipo === "success" ? "✓ " : "✕ "}{toast.msg}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.gray300}; border-radius: 3px; }
        input, select, textarea { font-family: inherit; outline: none; }
        button { font-family: inherit; cursor: pointer; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [perfil, setPerfil] = useState("gestor");

  return (
    <div style={{
      minHeight: "100vh", background: `linear-gradient(135deg, ${C.greenDark} 0%, ${C.green} 60%, ${C.greenMid} 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: C.white, borderRadius: 20, padding: "48px 40px",
        width: 420, boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 60, height: 60, background: C.green, borderRadius: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", fontSize: 28,
          }}>🏗️</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.black, letterSpacing: -0.5 }}>iBen Engenharia</h1>
          <p style={{ margin: "6px 0 0", color: C.gray500, fontSize: 14 }}>Sistema de Gestão de Vagas</p>
        </div>

        {/* Perfil */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: C.gray600, display: "block", marginBottom: 8 }}>Selecione seu perfil de acesso</label>
          <select value={perfil} onChange={e => setPerfil(e.target.value)} style={{
            width: "100%", padding: "12px 16px", border: `1px solid ${C.gray300}`,
            borderRadius: 10, fontSize: 14, background: C.white, color: C.black,
          }}>
            <option value="gestor">Gestor</option>
            <option value="rh">RH — Recrutamento</option>
            <option value="ti">TI</option>
            <option value="dp">DP — Departamento Pessoal</option>
            <option value="integracao">Integração</option>
            <option value="admin">Administrador / Diretoria</option>
          </select>
        </div>

        <button
          onClick={() => onLogin(USERS[perfil])}
          style={{
            width: "100%", padding: "14px", background: C.green,
            color: C.white, border: "none", borderRadius: 10,
            fontSize: 15, fontWeight: 700, letterSpacing: 0.3,
            transition: "background 0.2s",
          }}
          onMouseOver={e => e.target.style.background = C.greenDark}
          onMouseOut={e => e.target.style.background = C.green}
        >
          Entrar no Sistema
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: C.gray400, marginTop: 24, marginBottom: 0 }}>
          iBen Engenharia © 2024 — Uso interno
        </p>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ page, setPage, user, setUser, setShowForm }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "minhas", label: "Minhas Solicitações", icon: "📋" },
    { id: "todas", label: "Todas as Vagas", icon: "🗂️" },
    { id: "rh", label: "Painel RH", icon: "👥" },
    { id: "ti", label: "Painel TI", icon: "💻" },
    { id: "dp", label: "Painel DP", icon: "📄" },
    { id: "integracao", label: "Painel Integração", icon: "🤝" },
  ];

  return (
    <div style={{
      width: 240, background: C.black, display: "flex", flexDirection: "column",
      height: "100vh", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: C.green, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏗️</div>
          <div>
            <div style={{ color: C.white, fontWeight: 800, fontSize: 15, letterSpacing: -0.3 }}>iBen</div>
            <div style={{ color: C.gray500, fontSize: 11 }}>Gestão de Vagas</div>
          </div>
        </div>
      </div>

      {/* Nova Solicitação */}
      <div style={{ padding: "16px 16px 8px" }}>
        <button
          onClick={() => setShowForm(true)}
          style={{
            width: "100%", padding: "11px 14px",
            background: C.green, color: C.white,
            border: "none", borderRadius: 10,
            fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>+</span> Nova Solicitação
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "8px 12px", overflowY: "auto" }}>
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              width: "100%", padding: "10px 12px", marginBottom: 2,
              background: page === item.id ? "rgba(255,255,255,0.1)" : "transparent",
              color: page === item.id ? C.white : C.gray500,
              border: "none", borderRadius: 8,
              fontSize: 13, fontWeight: page === item.id ? 600 : 400,
              display: "flex", alignItems: "center", gap: 10, textAlign: "left",
              borderLeft: page === item.id ? `3px solid ${C.greenMid}` : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            <span>{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: 16, borderTop: `1px solid rgba(255,255,255,0.08)` }}>
        <button
          onClick={() => setUser(null)}
          style={{
            width: "100%", padding: "10px 12px",
            background: "rgba(255,255,255,0.05)", color: C.gray500,
            border: "none", borderRadius: 8, fontSize: 13,
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          🚪 Sair
        </button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ vagas, setPage, setVagaSelecionada }) {
  const abertas = vagas.filter(v => v.status === "Aberto").length;
  const andamento = vagas.filter(v => v.status === "Em andamento").length;
  const concluidas = vagas.filter(v => v.status === "Concluído").length;

  const porArea = vagas.reduce((acc, v) => { acc[v.area] = (acc[v.area] || 0) + 1; return acc; }, {});

  const cards = [
    { label: "Vagas Abertas", value: abertas, icon: "📬", color: C.blue, bg: "#eff6ff" },
    { label: "Em Andamento", value: andamento, icon: "⚙️", color: C.amber, bg: "#fff8e1" },
    { label: "Concluídas", value: concluidas, icon: "✅", color: C.greenMid, bg: C.greenLight },
    { label: "Total de Vagas", value: vagas.length, icon: "📊", color: C.gray600, bg: C.gray100 },
  ];

  return (
    <div>
      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {cards.map(c => (
          <div key={c.label} style={{
            background: C.white, borderRadius: 14, padding: "20px 22px",
            border: `1px solid ${C.gray200}`, display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ width: 48, height: 48, background: c.bg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.value}</div>
              <div style={{ fontSize: 13, color: C.gray500, marginTop: 2 }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>
        {/* Vagas recentes */}
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, overflow: "hidden" }}>
          <div style={{ padding: "18px 22px 14px", borderBottom: `1px solid ${C.gray100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Vagas Recentes</h3>
            <button onClick={() => setPage("todas")} style={{ background: "none", border: "none", color: C.green, fontSize: 13, fontWeight: 600 }}>Ver todas →</button>
          </div>
          {vagas.slice(0, 5).map(v => (
            <div key={v.id} onClick={() => { setVagaSelecionada(v); setPage("detalhe"); }}
              style={{
                padding: "14px 22px", borderBottom: `1px solid ${C.gray100}`,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseOver={e => e.currentTarget.style.background = C.gray50}
              onMouseOut={e => e.currentTarget.style.background = "transparent"}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{v.funcao}</div>
                <div style={{ fontSize: 12, color: C.gray500 }}>{v.id} · {v.local} · {v.gestor}</div>
                <div style={{ marginTop: 8 }}><ProgressBar value={v.progresso} /></div>
              </div>
              <div style={{ marginLeft: 20, flexShrink: 0 }}><Badge label={v.status} /></div>
            </div>
          ))}
        </div>

        {/* Por área */}
        <div>
          <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: "18px 22px", marginBottom: 16 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700 }}>Por Área</h3>
            {Object.entries(porArea).map(([area, qtd]) => (
              <div key={area} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: C.gray700 }}>{area}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 80, height: 6, background: C.gray100, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: C.green, width: `${(qtd / vagas.length) * 100}%`, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.green, minWidth: 16 }}>{qtd}</span>
                </div>
              </div>
            ))}
          </div>

          {/* SLA */}
          <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: "18px 22px" }}>
            <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>SLA por Etapa</h3>
            {[
              { etapa: "Recrutamento", dias: 15, cor: C.blue },
              { etapa: "Aquisição TI", dias: 7, cor: C.amber },
              { etapa: "Documentação DP", dias: 5, cor: C.green },
              { etapa: "Integração", dias: 3, cor: C.greenMid },
            ].map(s => (
              <div key={s.etapa} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: C.gray600 }}>{s.etapa}</span>
                  <span style={{ fontWeight: 600, color: s.cor }}>{s.dias}d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LISTA DE VAGAS ───────────────────────────────────────────────────────────
function ListaVagas({ vagas, filtro, setFiltro, setVagaSelecionada }) {
  return (
    <div>
      {/* Filtros */}
      <div style={{
        background: C.white, borderRadius: 12, border: `1px solid ${C.gray200}`,
        padding: "16px 20px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
      }}>
        <input
          placeholder="🔍  Buscar vaga, função, ID..."
          value={filtro.busca}
          onChange={e => setFiltro(f => ({ ...f, busca: e.target.value }))}
          style={{ flex: 1, minWidth: 200, padding: "9px 14px", border: `1px solid ${C.gray300}`, borderRadius: 8, fontSize: 13 }}
        />
        <select value={filtro.status} onChange={e => setFiltro(f => ({ ...f, status: e.target.value }))}
          style={{ padding: "9px 14px", border: `1px solid ${C.gray300}`, borderRadius: 8, fontSize: 13, background: C.white }}>
          <option value="">Todos os status</option>
          <option>Aberto</option>
          <option>Em andamento</option>
          <option>Concluído</option>
        </select>
        <select value={filtro.area} onChange={e => setFiltro(f => ({ ...f, area: e.target.value }))}
          style={{ padding: "9px 14px", border: `1px solid ${C.gray300}`, borderRadius: 8, fontSize: 13, background: C.white }}>
          <option value="">Todas as áreas</option>
          <option>Engenharia</option>
          <option>Recursos Humanos</option>
          <option>Segurança</option>
          <option>Administrativo</option>
        </select>
        <input
          placeholder="Gestor..."
          value={filtro.gestor}
          onChange={e => setFiltro(f => ({ ...f, gestor: e.target.value }))}
          style={{ padding: "9px 14px", border: `1px solid ${C.gray300}`, borderRadius: 8, fontSize: 13, width: 140 }}
        />
      </div>

      {/* Tabela */}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.gray50 }}>
              {["ID", "Função", "Local", "Gestor", "Qtd.", "Progresso", "Status", "Data Abertura"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: C.gray500, borderBottom: `1px solid ${C.gray200}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vagas.map(v => (
              <tr key={v.id}
                onClick={() => setVagaSelecionada(v)}
                style={{ cursor: "pointer", transition: "background 0.1s", borderBottom: `1px solid ${C.gray100}` }}
                onMouseOver={e => e.currentTarget.style.background = C.gray50}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray500, fontFamily: "monospace" }}>{v.id}</td>
                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600 }}>{v.funcao}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: C.gray600, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.local}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: C.gray600 }}>{v.gestor}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, textAlign: "center" }}>{v.quantidade}</td>
                <td style={{ padding: "14px 16px", minWidth: 120 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1 }}><ProgressBar value={v.progresso} /></div>
                    <span style={{ fontSize: 11, color: C.gray500, minWidth: 32 }}>{v.progresso}%</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}><Badge label={v.status} /></td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: C.gray500 }}>{v.dataAbertura}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {vagas.length === 0 && (
          <div style={{ padding: 48, textAlign: "center", color: C.gray400 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>Nenhuma vaga encontrada com os filtros aplicados.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DETALHE DA VAGA ──────────────────────────────────────────────────────────
function DetalheVaga({ vaga, user, updateVaga, showToast, onBack }) {
  const [tab, setTab] = useState("info");

  const handleStatusUpdate = (area, field, value) => {
    const t = now();
    const patch = {};
    patch[area] = { ...vaga[area], [field]: value, updatedAt: t, responsavel: user.nome };
    const novaTimeline = [...vaga.timeline, { data: t, acao: `${area.toUpperCase()}: ${value}`, usuario: user.nome }];
    
    // Recalculate progress
    const estados = {
      recrutamento: { ...patch.recrutamento || vaga.recrutamento },
      ti_equipamento: { ...vaga.ti_equipamento },
      ti_configuracao: { ...vaga.ti_configuracao },
      dp: { ...vaga.dp },
      integracao: { ...vaga.integracao },
    };
    if (patch.recrutamento) estados.recrutamento = patch.recrutamento;
    if (patch.ti_equipamento) estados.ti_equipamento = patch.ti_equipamento;
    if (patch.ti_configuracao) estados.ti_configuracao = patch.ti_configuracao;
    if (patch.dp) estados.dp = patch.dp;
    if (patch.integracao) estados.integracao = patch.integracao;

    let prog = 0;
    if (estados.recrutamento.status === "Em andamento") prog += 15;
    if (estados.recrutamento.status === "Concluído") prog += 30;
    if (estados.ti_equipamento.status === "Concluído") prog += 15;
    if (estados.ti_configuracao.status === "Concluído") prog += 15;
    if (estados.dp.status === "Em andamento") prog += 10;
    if (estados.dp.status === "Concluído") prog += 20;
    if (estados.integracao.data) prog += 10;

    const novoStatus = prog >= 100 ? "Concluído" : prog > 5 ? "Em andamento" : "Aberto";

    updateVaga(vaga.id, { ...patch, timeline: novaTimeline, progresso: Math.min(100, prog), status: novoStatus });
    showToast("Status atualizado com sucesso!");
  };

  const tabs = [
    { id: "info", label: "Informações" },
    { id: "acompanhamento", label: "Acompanhamento" },
    { id: "timeline", label: "Timeline" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: "none", border: `1px solid ${C.gray300}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, color: C.gray600 }}>← Voltar</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{vaga.funcao}</h1>
            <Badge label={vaga.status} />
          </div>
          <div style={{ fontSize: 13, color: C.gray500 }}>{vaga.id} · Aberto em {vaga.dataAbertura} · {vaga.local}</div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, maxWidth: 400 }}><ProgressBar value={vaga.progresso} /></div>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.green }}>{vaga.progresso}% concluído</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.gray100, borderRadius: 10, padding: 4, width: "fit-content" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              padding: "8px 18px", borderRadius: 8, border: "none",
              background: tab === t.id ? C.white : "transparent",
              color: tab === t.id ? C.black : C.gray500,
              fontSize: 13, fontWeight: tab === t.id ? 600 : 400,
              boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "info" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <InfoCard title="📋 Dados da Vaga">
            <Row label="Função" value={vaga.funcao} />
            <Row label="Quantidade" value={vaga.quantidade} />
            <Row label="Salário" value={vaga.salario} />
            <Row label="Regime" value={vaga.regime} />
            <Row label="Tipo" value={vaga.tipo} />
            <Row label="Local" value={vaga.local} />
            <Row label="Horário" value={vaga.horario} />
            <Row label="Centro de Custo" value={vaga.centroCusto} />
            <Row label="Gestor" value={vaga.gestor} />
            <Row label="Início Previsto" value={vaga.dataInicio} />
          </InfoCard>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <InfoCard title="🎯 Perfil e Requisitos">
              <Row label="Atividades" value={vaga.atividades} />
              <Row label="Requisitos" value={vaga.requisitos} />
              <Row label="Perfil Comportamental" value={vaga.perfil} />
              <Row label="Diferenciais" value={vaga.diferenciais} />
            </InfoCard>
            <InfoCard title="⚙️ Equipamentos e Sistemas">
              <Row label="Notebook" value={vaga.notebook ? "✅ Sim" : "❌ Não"} />
              <Row label="Sistemas" value={vaga.sistemas?.join(", ")} />
            </InfoCard>
            <InfoCard title="📝 Justificativa">
              <p style={{ margin: 0, fontSize: 13, color: C.gray700, lineHeight: 1.6 }}>{vaga.justificativa}</p>
            </InfoCard>
          </div>
        </div>
      )}

      {tab === "acompanhamento" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <AcompCard title="👥 Recrutamento" area="recrutamento" vaga={vaga}
            opções={["A iniciar", "Em andamento", "Concluído"]}
            onUpdate={(v) => handleStatusUpdate("recrutamento", "status", v)} user={user} />
          <AcompCard title="💻 TI — Equipamentos" area="ti_equipamento" vaga={vaga}
            opções={["Pendente", "Em processo de compra", "Concluído", "Não necessário"]}
            onUpdate={(v) => handleStatusUpdate("ti_equipamento", "status", v)} user={user} />
          <AcompCard title="🔧 TI — Configuração" area="ti_configuracao" vaga={vaga}
            opções={["A iniciar", "Em processo de configuração", "Concluído"]}
            onUpdate={(v) => handleStatusUpdate("ti_configuracao", "status", v)} user={user} />
          <AcompCard title="📄 DP — Documentação" area="dp" vaga={vaga}
            opções={["A iniciar", "Em andamento", "Concluído"]}
            onUpdate={(v) => handleStatusUpdate("dp", "status", v)} user={user} />
          <IntegracaoCard vaga={vaga} onUpdate={(patch) => {
            const t = now();
            const novaTimeline = [...vaga.timeline, { data: t, acao: `Integração: ${patch.data || patch.observacoes}`, usuario: user.nome }];
            updateVaga(vaga.id, { integracao: { ...vaga.integracao, ...patch, responsavel: user.nome, updatedAt: t }, timeline: novaTimeline });
            showToast("Integração atualizada!");
          }} user={user} />
        </div>
      )}

      {tab === "timeline" && (
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: "24px" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>Histórico de Movimentações</h3>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 2, background: C.gray200 }} />
            {[...vaga.timeline].reverse().map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 20, marginBottom: 20, position: "relative" }}>
                <div style={{ width: 22, height: 22, background: C.green, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  <div style={{ width: 8, height: 8, background: C.white, borderRadius: "50%" }} />
                </div>
                <div style={{ background: C.gray50, borderRadius: 10, padding: "10px 14px", flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.black }}>{t.acao}</div>
                  <div style={{ fontSize: 12, color: C.gray500, marginTop: 3 }}>por {t.usuario} · {t.data}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: "18px 22px" }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: C.black }}>{title}</h3>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${C.gray100}`, gap: 16 }}>
      <span style={{ fontSize: 12, color: C.gray500, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500, textAlign: "right" }}>{value || "—"}</span>
    </div>
  );
}

function AcompCard({ title, area, vaga, opções, onUpdate, user }) {
  const data = vaga[area];
  return (
    <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: "18px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>{title}</h3>
        <Badge label={data?.status || "Pendente"} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opções.map(op => (
          <button key={op} onClick={() => onUpdate(op)}
            style={{
              padding: "9px 14px", border: `1px solid ${data?.status === op ? C.green : C.gray200}`,
              borderRadius: 8, background: data?.status === op ? C.greenLight : C.white,
              color: data?.status === op ? C.greenDark : C.gray700,
              fontSize: 13, fontWeight: data?.status === op ? 600 : 400, textAlign: "left",
            }}>
            {data?.status === op ? "● " : "○ "}{op}
          </button>
        ))}
      </div>
      {data?.updatedAt && (
        <div style={{ marginTop: 12, fontSize: 11, color: C.gray400 }}>
          Atualizado por {data.responsavel} em {data.updatedAt}
        </div>
      )}
    </div>
  );
}

function IntegracaoCard({ vaga, onUpdate, user }) {
  const [data, setData] = useState(vaga.integracao.data || "");
  const [obs, setObs] = useState(vaga.integracao.observacoes || "");

  return (
    <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: "18px 22px", gridColumn: "1 / -1" }}>
      <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700 }}>🤝 Integração / Onboarding</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
        <div>
          <label style={{ fontSize: 12, color: C.gray500, display: "block", marginBottom: 6 }}>Data do Onboarding</label>
          <input type="date" value={data} onChange={e => setData(e.target.value)}
            style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.gray300}`, borderRadius: 8, fontSize: 13 }} />
        </div>
        <div>
          <label style={{ fontSize: 12, color: C.gray500, display: "block", marginBottom: 6 }}>Observações</label>
          <input value={obs} onChange={e => setObs(e.target.value)}
            placeholder="Observações sobre a integração..."
            style={{ width: "100%", padding: "9px 12px", border: `1px solid ${C.gray300}`, borderRadius: 8, fontSize: 13 }} />
        </div>
      </div>
      <button onClick={() => onUpdate({ data, observacoes: obs })}
        style={{
          marginTop: 14, padding: "10px 20px", background: C.green, color: C.white,
          border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600,
        }}>
        Salvar Integração
      </button>
      {vaga.integracao.updatedAt && (
        <span style={{ marginLeft: 12, fontSize: 11, color: C.gray400 }}>
          Atualizado por {vaga.integracao.responsavel} em {vaga.integracao.updatedAt}
        </span>
      )}
    </div>
  );
}

// ─── PAINEIS DE ÁREA ──────────────────────────────────────────────────────────
function PainelGenerico({ titulo, vagas, filtroFn, renderCard, setVagaSelecionada }) {
  const filtradas = vagas.filter(filtroFn);
  return (
    <div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{titulo}</h2>
        <span style={{ fontSize: 13, color: C.gray500 }}>{filtradas.length} vaga(s)</span>
      </div>
      {filtradas.length === 0 ? (
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: 48, textAlign: "center", color: C.gray400 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🎉</div>
          Nenhuma pendência no momento!
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {filtradas.map(v => renderCard(v))}
        </div>
      )}
    </div>
  );
}

function VagaCardBase({ vaga, children, onClick }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: "18px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{vaga.funcao}</div>
          <div style={{ fontSize: 12, color: C.gray500 }}>{vaga.id} · {vaga.local}</div>
        </div>
        <button onClick={onClick} style={{ background: "none", border: `1px solid ${C.gray200}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, color: C.green }}>Ver</button>
      </div>
      <div style={{ marginBottom: 12 }}><ProgressBar value={vaga.progresso} /></div>
      {children}
    </div>
  );
}

function PainelRH({ vagas, user, updateVaga, showToast, setVagaSelecionada }) {
  return (
    <PainelGenerico titulo="👥 Painel RH — Recrutamento"
      vagas={vagas}
      filtroFn={v => v.recrutamento.status !== "Concluído"}
      setVagaSelecionada={setVagaSelecionada}
      renderCard={(v) => (
        <VagaCardBase key={v.id} vaga={v} onClick={() => setVagaSelecionada(v)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: C.gray500 }}>Status:</span>
            <Badge label={v.recrutamento.status} />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {["A iniciar", "Em andamento", "Concluído"].map(s => (
              <button key={s} onClick={() => {
                const t = now();
                updateVaga(v.id, {
                  recrutamento: { ...v.recrutamento, status: s, responsavel: user.nome, updatedAt: t },
                  timeline: [...v.timeline, { data: t, acao: `Recrutamento: ${s}`, usuario: user.nome }],
                });
                showToast(`Recrutamento atualizado: ${s}`);
              }}
                style={{
                  flex: 1, padding: "7px 4px", fontSize: 11, fontWeight: 600,
                  border: `1px solid ${v.recrutamento.status === s ? C.green : C.gray200}`,
                  borderRadius: 7, background: v.recrutamento.status === s ? C.greenLight : C.white,
                  color: v.recrutamento.status === s ? C.greenDark : C.gray600,
                }}>
                {s}
              </button>
            ))}
          </div>
        </VagaCardBase>
      )}
    />
  );
}

function PainelTI({ vagas, user, updateVaga, showToast, setVagaSelecionada }) {
  const vagasTI = vagas.filter(v => v.notebook || v.sistemas?.length > 0);
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>💻 Painel TI</h2>
      </div>
      {vagasTI.length === 0 ? (
        <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.gray200}`, padding: 48, textAlign: "center", color: C.gray400 }}>Nenhuma solicitação de TI pendente.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {vagasTI.map(v => (
            <VagaCardBase key={v.id} vaga={v} onClick={() => setVagaSelecionada(v)}>
              <div style={{ fontSize: 12, color: C.gray500, marginBottom: 8 }}>
                💻 Notebook: {v.notebook ? "Sim" : "Não"} · Sistemas: {v.sistemas?.length || 0}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: C.gray400 }}>Equipamento</span>
                <Badge label={v.ti_equipamento.status} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 11, color: C.gray400 }}>Configuração</span>
                <Badge label={v.ti_configuracao.status} />
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["Em processo de compra", "Concluído"].map(s => (
                  <button key={s} onClick={() => {
                    const t = now();
                    updateVaga(v.id, {
                      ti_equipamento: { ...v.ti_equipamento, status: s, responsavel: user.nome, updatedAt: t },
                      timeline: [...v.timeline, { data: t, acao: `TI Equip: ${s}`, usuario: user.nome }],
                    });
                    showToast(`Equipamento: ${s}`);
                  }}
                    style={{
                      flex: 1, padding: "7px 4px", fontSize: 11, fontWeight: 600,
                      border: `1px solid ${v.ti_equipamento.status === s ? C.green : C.gray200}`,
                      borderRadius: 7, background: v.ti_equipamento.status === s ? C.greenLight : C.white,
                      color: v.ti_equipamento.status === s ? C.greenDark : C.gray600,
                    }}>
                    {s.replace("Em processo de compra", "Comprando")}
                  </button>
                ))}
              </div>
            </VagaCardBase>
          ))}
        </div>
      )}
    </div>
  );
}

function PainelDP({ vagas, user, updateVaga, showToast, setVagaSelecionada }) {
  return (
    <PainelGenerico titulo="📄 Painel DP — Documentação Admissional"
      vagas={vagas}
      filtroFn={v => v.recrutamento.status === "Concluído" && v.dp.status !== "Concluído"}
      setVagaSelecionada={setVagaSelecionada}
      renderCard={(v) => (
        <VagaCardBase key={v.id} vaga={v} onClick={() => setVagaSelecionada(v)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: C.gray500 }}>Documentação:</span>
            <Badge label={v.dp.status} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["A iniciar", "Em andamento", "Concluído"].map(s => (
              <button key={s} onClick={() => {
                const t = now();
                updateVaga(v.id, {
                  dp: { ...v.dp, status: s, responsavel: user.nome, updatedAt: t },
                  timeline: [...v.timeline, { data: t, acao: `DP: ${s}`, usuario: user.nome }],
                });
                showToast(`DP atualizado: ${s}`);
              }}
                style={{
                  flex: 1, padding: "7px 4px", fontSize: 10, fontWeight: 600,
                  border: `1px solid ${v.dp.status === s ? C.green : C.gray200}`,
                  borderRadius: 7, background: v.dp.status === s ? C.greenLight : C.white,
                  color: v.dp.status === s ? C.greenDark : C.gray600,
                }}>
                {s}
              </button>
            ))}
          </div>
        </VagaCardBase>
      )}
    />
  );
}

function PainelIntegracao({ vagas, user, updateVaga, showToast, setVagaSelecionada }) {
  return (
    <PainelGenerico titulo="🤝 Painel Integração / Onboarding"
      vagas={vagas}
      filtroFn={v => v.dp.status === "Concluído" && !v.integracao.data}
      setVagaSelecionada={setVagaSelecionada}
      renderCard={(v) => {
        const [date, setDate] = useState("");
        return (
          <VagaCardBase key={v.id} vaga={v} onClick={() => setVagaSelecionada(v)}>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 11, color: C.gray400, display: "block", marginBottom: 4 }}>Data do Onboarding</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ width: "100%", padding: "8px 10px", border: `1px solid ${C.gray300}`, borderRadius: 7, fontSize: 13 }} />
            </div>
            <button onClick={() => {
              if (!date) return;
              const t = now();
              updateVaga(v.id, {
                integracao: { ...v.integracao, data: date, responsavel: user.nome, updatedAt: t },
                timeline: [...v.timeline, { data: t, acao: `Integração agendada: ${date}`, usuario: user.nome }],
                progresso: 100, status: "Concluído",
              });
              showToast("Onboarding agendado com sucesso!");
            }}
              style={{ width: "100%", padding: "9px", background: C.green, color: C.white, border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600 }}>
              Confirmar Onboarding
            </button>
          </VagaCardBase>
        );
      }}
    />
  );
}

// ─── FORM MODAL ───────────────────────────────────────────────────────────────
function FormModal({ user, onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    funcao: "", quantidade: 1, salario: "", regime: "CLT", local: "", horario: "",
    centroCusto: "", gestor: user.nome, dataInicio: "", tipo: "Aumento de quadro", justificativa: "",
    atividades: "", requisitos: "", perfil: "", diferenciais: "",
    notebook: false, sistemas: [],
    area: "Engenharia",
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSistema = (s) => set("sistemas", form.sistemas.includes(s) ? form.sistemas.filter(x => x !== s) : [...form.sistemas, s]);

  const handleSave = () => {
    const id = generateId();
    const t = now();
    const nova = {
      ...form,
      id, status: "Aberto", dataAbertura: new Date().toISOString().slice(0, 10),
      recrutamento: { status: "A iniciar", responsavel: "", updatedAt: "" },
      ti_equipamento: { status: form.notebook ? "Pendente" : "Não necessário", responsavel: "", updatedAt: "" },
      ti_configuracao: { status: "A iniciar", responsavel: "", updatedAt: "" },
      dp: { status: "A iniciar", responsavel: "", updatedAt: "" },
      integracao: { data: "", observacoes: "", responsavel: "", updatedAt: "" },
      timeline: [{ data: t, acao: "Vaga aberta", usuario: user.nome }],
      progresso: 5,
    };
    onSave(nova);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: C.white, borderRadius: 20, width: "90%", maxWidth: 700,
        maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{ padding: "22px 28px", borderBottom: `1px solid ${C.gray100}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Nova Solicitação de Vaga</h2>
            <p style={{ margin: 0, fontSize: 12, color: C.gray500, marginTop: 3 }}>Etapa {step} de 3</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, color: C.gray400 }}>×</button>
        </div>

        {/* Steps indicator */}
        <div style={{ padding: "16px 28px", background: C.gray50, display: "flex", gap: 8, alignItems: "center" }}>
          {[{ n: 1, label: "Dados da Vaga" }, { n: 2, label: "Perfil e Requisitos" }, { n: 3, label: "Equipamentos" }].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: step >= s.n ? C.green : C.gray200,
                color: step >= s.n ? C.white : C.gray400,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
              }}>{s.n}</div>
              <span style={{ fontSize: 12, color: step === s.n ? C.green : C.gray400, fontWeight: step === s.n ? 600 : 400 }}>{s.label}</span>
              {i < 2 && <span style={{ color: C.gray300 }}>→</span>}
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {step === 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FormField label="Função *" required>
                <input value={form.funcao} onChange={e => set("funcao", e.target.value)} placeholder="Ex: Engenheiro Civil" style={iStyle} />
              </FormField>
              <FormField label="Área">
                <select value={form.area} onChange={e => set("area", e.target.value)} style={iStyle}>
                  {["Engenharia", "Recursos Humanos", "TI", "Administrativo", "Segurança", "Financeiro"].map(a => <option key={a}>{a}</option>)}
                </select>
              </FormField>
              <FormField label="Quantidade de vagas">
                <input type="number" min={1} value={form.quantidade} onChange={e => set("quantidade", e.target.value)} style={iStyle} />
              </FormField>
              <FormField label="Salário">
                <input value={form.salario} onChange={e => set("salario", e.target.value)} placeholder="R$ 0.000" style={iStyle} />
              </FormField>
              <FormField label="Regime">
                <select value={form.regime} onChange={e => set("regime", e.target.value)} style={iStyle}>
                  {["CLT", "PJ", "Estagiário", "Temporário"].map(r => <option key={r}>{r}</option>)}
                </select>
              </FormField>
              <FormField label="Tipo da vaga">
                <select value={form.tipo} onChange={e => set("tipo", e.target.value)} style={iStyle}>
                  <option>Aumento de quadro</option>
                  <option>Substituição</option>
                </select>
              </FormField>
              <FormField label="Local de trabalho *" span>
                <input value={form.local} onChange={e => set("local", e.target.value)} placeholder="Ex: Obra Residencial Vila Nova" style={iStyle} />
              </FormField>
              <FormField label="Horário de trabalho">
                <input value={form.horario} onChange={e => set("horario", e.target.value)} placeholder="08:00 - 17:00" style={iStyle} />
              </FormField>
              <FormField label="Centro de custo">
                <input value={form.centroCusto} onChange={e => set("centroCusto", e.target.value)} placeholder="CC-001-OBRAS" style={iStyle} />
              </FormField>
              <FormField label="Gestor responsável">
                <input value={form.gestor} onChange={e => set("gestor", e.target.value)} style={iStyle} />
              </FormField>
              <FormField label="Data de início prevista">
                <input type="date" value={form.dataInicio} onChange={e => set("dataInicio", e.target.value)} style={iStyle} />
              </FormField>
              <FormField label="Justificativa" span>
                <textarea value={form.justificativa} onChange={e => set("justificativa", e.target.value)}
                  placeholder="Descreva o motivo da abertura desta vaga..."
                  rows={3} style={{ ...iStyle, resize: "vertical" }} />
              </FormField>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {[
                ["atividades", "Principais atividades *", "Descreva as principais responsabilidades e tarefas do cargo..."],
                ["requisitos", "Requisitos obrigatórios *", "Formação, experiência mínima, certificações necessárias..."],
                ["perfil", "Perfil comportamental desejado", "Características comportamentais esperadas..."],
                ["diferenciais", "Diferenciais da vaga", "Conhecimentos ou experiências que serão diferenciais na seleção..."],
              ].map(([k, label, ph]) => (
                <FormField key={k} label={label}>
                  <textarea value={form[k]} onChange={e => set(k, e.target.value)}
                    placeholder={ph} rows={3} style={{ ...iStyle, resize: "vertical" }} />
                </FormField>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              <FormField label="Necessidade de Notebook">
                <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                  {[true, false].map(v => (
                    <button key={String(v)} onClick={() => set("notebook", v)}
                      style={{
                        padding: "10px 24px", border: `1px solid ${form.notebook === v ? C.green : C.gray200}`,
                        borderRadius: 8, background: form.notebook === v ? C.greenLight : C.white,
                        color: form.notebook === v ? C.greenDark : C.gray600,
                        fontSize: 13, fontWeight: form.notebook === v ? 700 : 400,
                      }}>
                      {v ? "✅ Sim, necessário" : "❌ Não necessário"}
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField label="Sistemas necessários" style={{ marginTop: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 4 }}>
                  {["E-mail corporativo", "SharePoint", "TOTVS", "AutoCAD", "Revit", "Outros"].map(s => (
                    <button key={s} onClick={() => toggleSistema(s)}
                      style={{
                        padding: "10px 14px", border: `1px solid ${form.sistemas.includes(s) ? C.green : C.gray200}`,
                        borderRadius: 8, background: form.sistemas.includes(s) ? C.greenLight : C.white,
                        color: form.sistemas.includes(s) ? C.greenDark : C.gray600,
                        fontSize: 13, fontWeight: form.sistemas.includes(s) ? 600 : 400,
                        display: "flex", alignItems: "center", gap: 8,
                      }}>
                      {form.sistemas.includes(s) ? "☑" : "☐"} {s}
                    </button>
                  ))}
                </div>
              </FormField>

              {/* Resumo */}
              <div style={{ background: C.greenLight, borderRadius: 12, padding: "16px 18px", marginTop: 24, border: `1px solid ${C.greenMid}20` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.greenDark, marginBottom: 10 }}>📋 Resumo da Solicitação</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[
                    ["Função", form.funcao],
                    ["Local", form.local],
                    ["Gestor", form.gestor],
                    ["Tipo", form.tipo],
                    ["Qtd. Vagas", form.quantidade],
                    ["Regime", form.regime],
                  ].map(([l, v]) => (
                    <div key={l} style={{ fontSize: 12 }}>
                      <span style={{ color: C.green }}>{l}: </span>
                      <span style={{ fontWeight: 600, color: C.greenDark }}>{v || "—"}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: C.green }}>
                  📧 E-mail automático será enviado para RH e equipes responsáveis
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 28px", borderTop: `1px solid ${C.gray100}`, display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            style={{ padding: "11px 22px", background: "none", border: `1px solid ${C.gray300}`, borderRadius: 9, fontSize: 13, color: C.gray600 }}>
            {step === 1 ? "Cancelar" : "← Voltar"}
          </button>
          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleSave()}
            disabled={step === 1 && (!form.funcao || !form.local)}
            style={{
              padding: "11px 28px", background: C.green, color: C.white,
              border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700,
              opacity: (step === 1 && (!form.funcao || !form.local)) ? 0.5 : 1,
            }}>
            {step < 3 ? "Próxima etapa →" : "✓ Abrir Vaga"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children, span }) {
  return (
    <div style={{ gridColumn: span ? "1 / -1" : "auto" }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: C.gray600, display: "block", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const iStyle = {
  width: "100%", padding: "10px 13px",
  border: `1px solid ${C.gray300}`, borderRadius: 8,
  fontSize: 13, background: C.white, color: C.black,
};
