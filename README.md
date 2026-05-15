# Portal de Matriz de Desempenho RH – iBen Engenharia

Sistema de avaliação de desempenho com login, formulários, histórico e dashboard.

---

## Como fazer o deploy no Vercel (5 minutos, gratuito)

### Passo 1 – Criar conta no GitHub
Acesse https://github.com e crie uma conta gratuita (se ainda não tiver).

### Passo 2 – Criar repositório
1. Clique em **"New repository"**
2. Nome: `iben-hr-portal`
3. Clique em **"Create repository"**

### Passo 3 – Fazer upload dos arquivos
1. Dentro do repositório criado, clique em **"uploading an existing file"**
2. Arraste TODA a pasta `iben-portal` para a área de upload
3. Clique em **"Commit changes"**

### Passo 4 – Deploy no Vercel
1. Acesse https://vercel.com e clique em **"Sign up with GitHub"**
2. Clique em **"New Project"**
3. Selecione o repositório `iben-hr-portal`
4. Clique em **"Deploy"**

✅ Pronto! Em 1-2 minutos você receberá um link como:
`https://iben-hr-portal.vercel.app`

---

## Credenciais de acesso

| Perfil | E-mail | Senha |
|--------|--------|-------|
| RH Administrador | rh@iben.com.br | admin123 |
| Gestor | gestor@iben.com.br | gestor123 |

> ⚠️ Para produção, substitua as credenciais por autenticação Firebase ou Supabase.

---

## Funcionalidades

- ✅ Login com dois perfis (RH Admin e Gestor)
- ✅ Seleção de Sede (12 áreas) e Obras (19 canteiros)
- ✅ Formulário completo de avaliação com 5 perguntas
- ✅ Histórico de avaliações por área
- ✅ Dashboard com gráficos dinâmicos
- ✅ Busca e filtros por colaborador e área
- ✅ Responsivo para desktop e mobile

---

## Tecnologias

- React 18 + Vite
- Recharts (gráficos)
- CSS inline (sem dependência de Tailwind)
