# 🌌 Órbita – Painel Espacial Interativo

Painel informativo e visual sobre o universo, integrando dados públicos das APIs da **NASA** e da **SpaceX**. Permite explorar imagens astronômicas, lançamentos de foguetes, asteroides próximos da Terra e mais.

## 🚀 Tecnologias Utilizadas

- **React 18+** com **TypeScript**
- **Tailwind CSS** e **Material UI (MUI)** para o design moderno e responsivo
- **React Router DOM** para navegação
- **Axios** para requisições HTTP
- **Firebase** (autenticação, futuramente dados persistentes)
- **Date-fns** para manipulação de datas

---

## 📁 Estrutura de Pastas
```
📦 painel-espacial/
├── 📁 public/ # Arquivos públicos e index.html
├── 📁 src/
│ ├── 📁 assets/ # Imagens, ícones, SVGs e fontes
│ ├── 📁 components/ # Componentes reutilizáveis (ex: botões, cards)
│ ├── 📁 features/ # Módulos por domínio
│ │ ├── 📁 nasa/ # Tudo relacionado à API da NASA
│ │ │ ├── components/ # Componentes específicos (ex: CardAPOD)
│ │ │ ├── pages/ # Páginas como APODPage, AsteroidsPage
│ │ │ └── services/ # Funções Axios para a NASA API
│ │ └── 📁 spacex/ # Tudo relacionado à API da SpaceX
│ │ ├── components/ # Componentes específicos (ex: LaunchCard)
│ │ ├── pages/ # Lançamentos futuros, detalhes
│ │ └── services/ # Chamadas à API da SpaceX
│ ├── 📁 context/ # Contextos globais como autenticação
│ ├── 📁 firebase/ # Configuração do Firebase
│ ├── 📁 hooks/ # Hooks customizados (ex: useAuth, useFetch)
│ ├── 📁 layouts/ # Layouts base (Navbar, Sidebar, etc)
│ ├── 📁 routes/ # Definições de rotas (privadas, públicas)
│ ├── 📁 theme/ # Tailwind e MUI theme customizados
│ ├── 📁 types/ # Interfaces e tipagens globais
│ ├── 📁 utils/ # Funções auxiliares (ex: formatarData)
│ ├── App.tsx # Root da aplicação com controle de auth
│ ├── main.tsx # Entry point React + Router
│ └── tailwind.config.js # Configuração do Tailwind
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔐 Autenticação

A autenticação está inicialmente implementada com lógica **hardcoded** para fins de protótipo. O sistema exibe:

- Rotas autenticadas via `<AuthenticatedApp />`
- Rotas públicas via `<UnauthenticatedApp />`

> Firebase Authentication será integrado futuramente para login real.

---

## 🎨 Tema

- Tema **padrão em Dark Mode**
- Usuário pode alternar para Light Mode
- Paleta baseada na cor `purple` do Tailwind (`purple.500`)
- Fonte futurista e limpa, ideal para tema espacial

---

## 🧠 Próximos Passos

- [ ] Integração real com autenticação Firebase
- [ ] Favoritos salvos por usuário
- [ ] Página de perfil
- [ ] Charts dinâmicos com dados astronômicos

---

## 📸 Exemplos do que será exibido

- 📷 Imagem do dia da NASA (APOD)
- ☄️ Asteroides próximos da Terra
- 🚀 Missões da SpaceX (futuras e passadas)
- 📅 Calendário de lançamentos

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/painel-espacial.git
cd painel-espacial
npm install
npm run dev
```
🪐 Licença
MIT © Gabriel Lima – 2025