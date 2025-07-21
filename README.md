# 🌌 Órbita – Painel Espacial Interativo

Painel informativo e visual sobre o universo, integrando dados públicos das APIs da **NASA** e da **SpaceX**. Permite explorar imagens astronômicas, lançamentos de foguetes, asteroides próximos da Terra e mais.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.1.0** com **TypeScript 5.8.3**
- **Vite 6.3.5** como bundler e dev server
- **React Router DOM 7.6.2** para navegação
- **Axios 1.10.0** para requisições HTTP
- **Date-fns 4.1.0** para manipulação de datas

### UI/UX
- **Tailwind CSS 4.1.10** para estilização utilitária
- **Material UI (MUI) 7.1.2** para componentes React
- **@emotion/react** e **@emotion/styled** para styled components
- **@mui/icons-material** para ícones

### Backend & Autenticação
- **Firebase 11.9.1** (autenticação, Firestore, storage)
- **react-firebase-hooks 5.1.1** para integração React-Firebase

### Desenvolvimento
- **Biome 1.8.3** para linting e formatação
- **PostCSS** e **Autoprefixer** para processamento CSS

---

## 📁 Estrutura de Pastas

```
📦 painel-espacial/
├── 📁 public/                    # Arquivos públicos estáticos
│   ├── logo.png
│   ├── vite.svg
│   └── wallpaper.jpg
├── 📁 src/
│   ├── 📁 assets/                # Recursos estáticos
│   │   └── react.svg
│   ├── 📁 components/            # Componentes reutilizáveis
│   │   ├── 📁 dashboard/         # Componentes específicos do dashboard
│   │   │   ├── ApodCard.tsx      # Card da Imagem do Dia da NASA
│   │   │   ├── DashboardHeader.tsx
│   │   │   ├── PlanetCarousel.tsx
│   │   │   ├── PlanetsList.ts
│   │   │   ├── SpaceXLaunchCard.tsx
│   │   │   └── StatsCard.tsx
│   │   ├── 📁 layout/            # Componentes de layout
│   │   │   └── AuthBackground.tsx
│   │   ├── 📁 navigation/        # Componentes de navegação
│   │   │   ├── NavBar.tsx
│   │   │   └── navItems.tsx
│   │   ├── 📁 profile/           # Componentes de perfil
│   │   │   ├── AvatarSection.tsx
│   │   │   ├── PasswordDialog.tsx
│   │   │   └── ProfileForm.tsx
│   │   ├── 📁 ui/                # Componentes de UI base
│   │   │   ├── GlassCard.tsx
│   │   │   ├── OrbitaFooter.tsx
│   │   │   └── OrbitaHeader.tsx
│   │   ├── BackgroundStars.tsx   # Efeito de fundo estrelado
│   │   └── LogoutButton.tsx
│   ├── 📁 context/               # Contextos React
│   │   └── AuthContext.ts
│   ├── 📁 features/              # Módulos por domínio
│   │   ├── 📁 nasa/              # Integração com API da NASA
│   │   │   └── nasaService.ts
│   │   └── 📁 spacex/            # Integração com API da SpaceX
│   │       └── spaceXService.ts
│   ├── 📁 firebase/              # Configuração Firebase
│   │   └── firebaseConfig.ts
│   ├── 📁 hooks/                 # Hooks customizados
│   │   ├── useCountdown.ts
│   │   ├── useFirebaseAuth.ts
│   │   ├── useFirebaseLogin.ts
│   │   ├── useFirebaseRegister.ts
│   │   ├── useFirebaseStorage.ts
│   │   ├── useFirestoreAvatar.ts
│   │   ├── usePasswordChange.ts
│   │   └── useUserProfile.ts
│   ├── 📁 page/                  # Páginas da aplicação
│   │   ├── 📁 Auth/              # Páginas autenticadas
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── FavoritesPage.tsx
│   │   │   ├── NasaImagePage.tsx
│   │   │   ├── NotFoundPage.tsx
│   │   │   ├── SpaceXLaunchesPage.tsx
│   │   │   └── UserProfilePage.tsx
│   │   └── 📁 Public/            # Páginas públicas
│   │       ├── ForgotPasswordPage.tsx
│   │       ├── LoginPage.tsx
│   │       └── RegisterPage.tsx
│   ├── 📁 theme/                 # Sistema de temas
│   │   ├── 📁 themes/
│   │   ├── 📁 tokens/
│   │   │   ├── colors.ts
│   │   │   ├── effects.ts
│   │   │   ├── index.ts
│   │   │   ├── spacing.ts
│   │   │   └── typography.ts
│   │   ├── index.ts
│   │   ├── purpleTheme.ts
│   │   ├── ThemeProvider.tsx
│   │   └── types.ts
│   ├── 📁 utils/                 # Utilitários e helpers
│   │   ├── ApiStatusChecker.tsx
│   │   └── firebaseErrors.ts
│   ├── App.css                   # Estilos globais
│   ├── App.tsx                   # Componente raiz
│   ├── AuthenticatedApp.tsx      # App para usuários autenticados
│   ├── UnauthenticatedApp.tsx    # App para usuários não autenticados
│   ├── config.ts                 # Configurações da aplicação
│   ├── index.css                 # Estilos base
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Tipos do Vite
├── 📄 Configurações
│   ├── biome.json                # Configuração Biome (linting + formatação)
│   ├── postcss.config.cjs        # Configuração PostCSS
│   ├── tailwind.config.js        # Configuração Tailwind
│   ├── tsconfig.json             # Configuração TypeScript
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts            # Configuração Vite
├── package.json
├── package-lock.json
└── README.md
```

---

## 🏗️ Arquitetura e Boas Práticas

### 1. **Organização por Features**
- Cada domínio (NASA, SpaceX) tem sua própria pasta com componentes, serviços e tipos
- Separação clara entre lógica de negócio e apresentação

### 2. **Componentes Reutilizáveis**
- Componentes UI base em `/components/ui/`
- Componentes específicos organizados por contexto
- Uso de TypeScript para tipagem forte

### 3. **Hooks Customizados**
- Lógica de negócio encapsulada em hooks
- Separação de responsabilidades (auth, storage, profile)
- Reutilização de lógica entre componentes

### 4. **Sistema de Temas**
- Design tokens organizados em `/theme/tokens/`
- Suporte a múltiplos temas
- Integração com Tailwind e MUI

### 5. **Roteamento Estruturado**
- Separação entre rotas públicas e autenticadas
- Lazy loading de páginas
- Proteção de rotas

### 6. **Integração com APIs**
- Serviços centralizados para cada API
- Tratamento de erros padronizado
- Tipagem forte para respostas de API

### 7. **Imports Absolutos**
- Path mapping configurado no TypeScript e Vite
- Aliases organizados por domínio (`@/components`, `@/hooks`, etc.)
- Imports mais limpos e manuteníveis

---

## 🔐 Sistema de Autenticação

### Funcionalidades Implementadas
- ✅ Login/Registro com Firebase Auth
- ✅ Recuperação de senha
- ✅ Perfil de usuário com avatar
- ✅ Alteração de senha
- ✅ Logout
- ✅ Proteção de rotas

### Estrutura de Dados do Usuário
```typescript
interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  createdAt: Date;
  lastLogin: Date;
}
```

---

## 🎨 Design System

### Paleta de Cores
- **Primária**: Purple (Tema espacial)
- **Secundária**: Blue (Complementar)
- **Neutras**: Gray scale
- **Estados**: Success, Warning, Error

### Componentes Base
- `GlassCard`: Card com efeito glassmorphism
- `OrbitaHeader/Footer`: Cabeçalho e rodapé padronizados
- `BackgroundStars`: Efeito de fundo animado

---

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build

# Qualidade de Código
npm run lint         # Executa Biome lint
npm run format       # Formata código com Biome
npm run check        # Executa lint + format
```

---

## 📦 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/painel-espacial.git
cd painel-espacial
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_NASA_API_KEY=sua_nasa_api_key
```

### 4. Execute o projeto
```bash
npm run dev
```

---

## 🌟 Funcionalidades Principais

### Dashboard
- 📊 Visão geral com estatísticas
- 🖼️ Imagem do dia da NASA (APOD)
- 🚀 Próximo lançamento da SpaceX
- 🌍 Carrossel de planetas

### NASA Integration
- 📷 Galeria de imagens astronômicas
- ☄️ Asteroides próximos da Terra
- 📅 Calendário de eventos astronômicos

### SpaceX Integration
- 🚀 Lançamentos futuros e passados
- 📊 Estatísticas de missões
- 🎯 Detalhes de foguetes e cápsulas

### Perfil do Usuário
- 👤 Gerenciamento de perfil
- 🖼️ Upload de avatar
- 🔒 Alteração de senha
- ⭐ Favoritos (em desenvolvimento)

---

## 🔧 Configurações de Desenvolvimento

### TypeScript
- Configuração estrita para melhor qualidade de código
- Path mapping para imports absolutos (`@/components`, `@/hooks`, etc.)
- Tipagem forte em toda a aplicação

### Biome
- Linting e formatação unificados
- Regras específicas para React e TypeScript
- Organização automática de imports
- Regras de acessibilidade (a11y) integradas

### Vite
- Hot Module Replacement (HMR)
- Build otimizado para produção
- Suporte a TypeScript nativo

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Gabriel Lima** - 2025

- GitHub: [@gabriellima-wav](https://github.com/gabriellima-wav)
- LinkedIn: [Gabriel Lima](https://www.linkedin.com/in/contatogabriellima/)

