# Pé de Açaí — Documentação do Frontend

## Visão Geral

**Pé de Açaí** é um Progressive Web App (PWA) para gerenciamento de uma açaiteria. Ele cobre todo o fluxo de negócio: criação de pedidos, gestão de estoque, administração de funcionários, controle de fornecedores e análise financeira.

A aplicação é construída como uma single-page application que se comunica com um backend Django REST Framework via chamadas de API autenticadas com JWT.

## Stack Tecnológica

| Camada              | Tecnologia                                      |
| ------------------- | ----------------------------------------------- |
| Framework           | Vue 3.5 (Composition API)                       |
| Ferramenta de Build | Vite 6.2                                        |
| Gerenciamento de Estado | Pinia 3.0                                   |
| Roteamento          | Vue Router 4.5                                  |
| Cliente HTTP        | Axios 1.9                                       |
| Estilização         | Tailwind CSS 4.1 (via `@tailwindcss/vite`)      |
| Gráficos            | Chart.js 3.9 + vue-chart-3                      |
| Ícones              | Lucide Vue Next                                 |
| Input de Moeda      | v-money3                                        |
| Overlay de Loading  | vue-loading-overlay                             |
| QR Code             | qrcode                                          |
| PWA                 | vite-plugin-pwa + workbox-precaching             |
| Fonte               | Inter (Google Fonts)                             |

## Pré-requisitos

- Node.js (LTS recomendado)
- npm
- Uma instância rodando do backend Pé de Açaí

## Primeiros Passos

### 1. Instalar dependências

```sh
npm install
```

### 2. Configurar ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://127.0.0.1:8000/
```

`VITE_API_URL` é a URL base do backend Django. Todas as requisições da API são prefixadas com esse valor.

### 3. Rodar em desenvolvimento

```sh
npm run dev
```

### 4. Build para produção

```sh
npm run build
```

### 5. Pré-visualizar build de produção

```sh
npm run preview
```

### 6. Lint e formatação

```sh
npm run lint      # ESLint com auto-fix
npm run format    # Formatação com Prettier
```

## Configuração PWA

A aplicação é configurada como um PWA instalável via `vite-plugin-pwa`. Configurações principais do manifesto:

- **Nome do app:** Pé de Açaí
- **Nome curto:** PeDeAcai
- **ID:** `com.pe-de-acai.app`
- **Tipo de registro:** `autoUpdate` (service worker atualiza automaticamente)
- **Ícones:** `pwa-192x192.png` e `pwa-512x512.png` em `/public`

O modo dev do PWA está habilitado (`devOptions.enabled: true`), então o service worker roda durante o desenvolvimento também.

## Aliases de Caminho

O alias `@` resolve para `./src`, configurado tanto no `vite.config.js` quanto no `jsconfig.json`:

```js
import SomeComponent from '@/components/SomeComponent.vue'
```

## Índice da Documentação

| Documento                                   | Conteúdo                                                          |
| ------------------------------------------- | ----------------------------------------------------------------- |
| [Guia do Usuário](./client-guide.md)        | Guia não técnico explicando cada funcionalidade passo a passo     |
| [Arquitetura](./architecture.md)            | Estrutura de pastas, roteamento, padrões de design, composables   |
| [Autenticação](./authentication.md)         | Fluxo JWT, refresh de token, guards de rota, ciclo login/logout   |
| [API & Estado](./api-and-state.md)          | Todos os serviços de API e stores Pinia documentados lado a lado  |
| [Componentes](./components.md)              | Catálogo completo de componentes com props, eventos e uso         |
