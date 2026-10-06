# MESO-LOG — Contexto do Projeto para Claude

> Este arquivo é lido automaticamente por Claude em cada sessão de trabalho no repositório.
> Atualizado em: 22/09/2026

---

## 🧭 O que é este projeto

**MESO-LOG** é uma plataforma de gestão logística e operacional para a distribuição Mesoestetic no Brasil.
É desenvolvida e mantida por Marco Wanuthe (distribuidor oficial Mesoestetic Brasil) em parceria com Claude.

O sistema gerencia: solicitações de produtos, envios, estoque, PDV, faturamento, recepção, portal de clientes, filiais, fiscal, inteligência de dados e ajuda.

---

## 🏗️ Arquitetura — Single File App

```
meso-log/
├── meso-log.html        ← ARQUIVO ÚNICO (toda a plataforma: HTML + CSS + JS)
├── .gitignore           ← protege deploy_runner.html e scripts locais
└── CLAUDE.md            ← este arquivo
```

**O projeto inteiro vive em um único arquivo HTML** com ~18.000+ linhas.
Não há bundler, framework ou build step. É HTML/CSS/JS puro, rodando no browser.

---

## 🔧 Stack técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla) |
| Banco de dados | Firebase Firestore (projeto: `meso-log`) |
| Autenticação | Firebase Auth |
| Storage | Firebase Storage |
| Email | EmailJS (service: `service_8keiagt`, conta: `marcowanuthe.mw@gmail.com`) |
| Hosting | GitHub Pages + Fastly CDN |
| Repositório | https://github.com/MarcoWanuthe/meso-log |
| URL ao vivo | https://marcowanuthe.github.io/meso-log/meso-log.html |

---

## 📄 Módulos do sistema (páginas)

1. `home` — Dashboard principal
2. `solicitacoes` — Solicitações de produtos
3. `envios` — Controle de envios/entregas
4. `estoque` — Gestão de estoque
5. `adm` — Administração (acesso restrito)
6. `operacoes` — Operações (apenas ADM)
7. `pdv` — Ponto de Venda — PDV Recepção
8. `faturamento` — Faturamento
9. `recepcao` — Recepção de produtos
10. `portal` — Portal de clientes
11. `clientes` — Gestão de clientes
12. `filiais` — Gestão de filiais
13. `fiscal` — Módulo fiscal
14. `intel` — Inteligência de dados
15. `ajuda` — Central de ajuda

---

## 🚀 Deploy — como publicar atualizações

### Método A — PowerShell (principal)
```powershell
cd C:\Users\Marco.Wanuthe\Projetos\meso-log
.\deploy_pagamento.ps1
```
Script faz: git add → commit → push → GitHub Pages atualiza via Fastly CDN.

### Método B — Browser (deploy_runner.html)
Abrir `deploy_runner.html` no Chrome. A página envia o arquivo via GitHub API (PUT /contents).
Contém o token GitHub e a versão do arquivo codificada em Base64.

---

## 🔐 Regras de segurança — CRÍTICAS

| Arquivo | Motivo | Status |
|---------|--------|--------|
| `deploy_runner.html` | Contém token GitHub hardcoded | ✅ No .gitignore |
| `deploy_runner_*.html` | Variantes datadas do runner | ✅ No .gitignore |
| `deploy_pagamento.ps1` | Script com credenciais | ✅ No .gitignore |
| `deploy_*.ps1` | Variantes do script | ✅ No .gitignore |
| `*.log` | Logs de deploy | ✅ No .gitignore |

**NUNCA commitar deploy_runner.html ou scripts .ps1 — contêm tokens de acesso.**

---

## 💻 Ambiente de desenvolvimento

- **Editor:** VS Code
- **Pasta local:** `C:\Users\Marco.Wanuthe\Projetos\meso-log`
- **Git config:** `user.name=Marco Wanuthe`, `user.email=marcowanuthe.mw@gmail.com`
- **OS:** Windows 11
- **Git:** v2.55.0(5)

---

## 📦 Versões

| Versão | Data | Linhas | Commit | Status |
|--------|------|--------|--------|--------|
| v2026-08-26-SEC4 | 26/08/2026 | 18.265 | e43fd34 | ✅ Atual no GitHub |
| v2.2 FIX-VENC-CACHE | 15/07/2026 | 9.561 | — | 📦 Backup |

---

## 🗺️ Roadmap planejado

- [ ] Relatórios e dashboards com gráficos
- [ ] App mobile (PWA ou nativo)
- [ ] Novos módulos além dos 15 existentes
- [ ] Integração com outros sistemas (ERPs, NFe, Mesoestetic Espanha)

---

## 🤝 Contexto de parceria

- **Marco Wanuthe** — product owner, desenvolvedor principal, distribuidor Mesoestetic Brasil
- **Claude** — par de desenvolvimento (Cowork + Claude Code)
- Conversas longas podem sumir do histórico do Claude — este arquivo garante continuidade

---

## 📋 Padrões de código

- **Sem frameworks** — JavaScript vanilla puro
- **Single file** — todo o código fica em `meso-log.html`
- **Firebase SDK** — versão compat (não modular)
- **Commits em português** — padrão `feat:`, `fix:`, `chore:`
- **Testes** — testar localmente via Live Server antes de fazer push

---

*Gerado automaticamente em sessão Claude Cowork · 22/09/2026*
