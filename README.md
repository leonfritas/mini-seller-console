Mini Seller Console

Projeto desenvolvido como parte de um desafio técnico.
O objetivo é criar um console simples para gerenciar Leads e convertê-los em Opportunities, com edição inline e estados de UX.

🚀 Tecnologias

React (Vite)

TailwindCSS (dark mode incluso)

Lucide Icons para ícones

Estado gerenciado com React Hooks

📦 Como rodar o projeto
# Clone o repositório
git clone https://github.com/seuusuario/mini-seller-console.git

# Acesse a pasta
cd mini-seller-console

# Instale as dependências
npm install

# Rode a aplicação
npm run dev


Acesse em: https://mini-seller-console-weld.vercel.app/

✅ Funcionalidades implementadas

Leads List

Carregamento via arquivo JSON local (/public/leads.json)

Filtro por status (dropdown custom)

Busca por nome/empresa

Ordenação por score (asc/desc)

Paginação com 10 registros por página

Lead Detail Panel

Slide-over lateral (dark mode)

Edição inline de email (com validação de formato)

Alteração de status via dropdown custom com seta animada

Campo de amount opcional

Botões Save, Cancel e Convert

Opportunities

Conversão de Lead → Opportunity

Tabela com estágios atualizáveis (New, In Progress, Won, Lost)

Persistência do estado durante a sessão

UX

Estados de loading, erro e vazio

Responsividade (tabela desktop e cards mobile)

Dark mode completo

Hover states, feedbacks visuais e transições

📸 Demonstração

(Aqui você pode colocar prints da tela ou até gravar um GIF com o fluxo principal — ex: abrir painel, editar lead, converter em opportunity.)

📂 Estrutura do projeto
src/
 ├── components/
 │   ├── LeadsTable.jsx
 │   ├── LeadDetailPanel.jsx
 │   └── OpportunitiesTable.jsx
 ├── App.jsx
 └── main.jsx
public/
 └── leads.json

💡 Observações

Projeto implementado em React + Tailwind sem libs adicionais de estado.

Estruturado para ser facilmente escalável (separação por componentes).

Inclui dark mode e UX refinada como extra.