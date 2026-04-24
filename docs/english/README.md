# Pé de Açaí — Frontend Documentation

## Overview

**Pé de Açaí** is a Progressive Web App (PWA) for managing an açaí shop (açaiteria). It handles the full business workflow: order creation, inventory management, employee administration, supplier tracking, and financial analytics.

The app is built as a single-page application that communicates with a Django REST Framework backend via JWT-authenticated API calls.

## Tech Stack

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Framework        | Vue 3.5 (Composition API)                       |
| Build Tool       | Vite 6.2                                        |
| State Management | Pinia 3.0                                       |
| Routing          | Vue Router 4.5                                  |
| HTTP Client      | Axios 1.9                                       |
| Styling          | Tailwind CSS 4.1 (via `@tailwindcss/vite`)      |
| Charts           | Chart.js 3.9 + vue-chart-3                      |
| Icons            | Lucide Vue Next                                 |
| Currency Input   | v-money3                                        |
| Loading Overlay  | vue-loading-overlay                             |
| QR Code          | qrcode                                          |
| PWA              | vite-plugin-pwa + workbox-precaching             |
| Font             | Inter (Google Fonts)                             |

## Prerequisites

- Node.js (LTS recommended)
- npm
- A running instance of the Pé de Açaí backend API

## Getting Started

### 1. Install dependencies

```sh
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
VITE_API_URL=http://127.0.0.1:8000/
```

`VITE_API_URL` is the base URL of the Django backend. All API requests are prefixed with this value.

### 3. Run in development

```sh
npm run dev
```

### 4. Build for production

```sh
npm run build
```

### 5. Preview production build

```sh
npm run preview
```

### 6. Lint and format

```sh
npm run lint      # ESLint with auto-fix
npm run format    # Prettier formatting
```

## PWA Configuration

The app is configured as an installable PWA via `vite-plugin-pwa`. Key manifest settings:

- **App name:** Pé de Açaí
- **Short name:** PeDeAcai
- **ID:** `com.pe-de-acai.app`
- **Register type:** `autoUpdate` (service worker updates automatically)
- **Icons:** `pwa-192x192.png` and `pwa-512x512.png` in `/public`

PWA dev mode is enabled (`devOptions.enabled: true`), so the service worker runs during development as well.

## Path Aliases

The `@` alias resolves to `./src`, configured in both `vite.config.js` and `jsconfig.json`:

```js
import SomeComponent from '@/components/SomeComponent.vue'
```

## Documentation Index

| Document                                  | Contents                                                        |
| ----------------------------------------- | --------------------------------------------------------------- |
| [Client Guide](./client-guide.md)         | Non-technical user guide explaining every feature step by step  |
| [Architecture](./architecture.md)         | Folder structure, routing, design patterns, composables, utils  |
| [Authentication](./authentication.md)     | JWT flow, token refresh, route guards, login/logout lifecycle   |
| [API & State](./api-and-state.md)         | All API services and Pinia stores documented side by side       |
| [Components](./components.md)             | Full component catalog with props, events, and usage by domain  |
