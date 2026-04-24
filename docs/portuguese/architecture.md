# Arquitetura

## Estrutura de Pastas

```
src/
├── App.vue                    # Componente raiz (troca de navbar, router-view)
├── main.js                    # Ponto de entrada (Vue + Pinia + Router)
├── assets/
│   ├── img/                   # Imagens estáticas (logo, ícones, logos de pagamento)
│   ├── logo.ico
│   └── main.css               # Estilos globais (import do Tailwind, fonte Inter)
├── components/                # Componentes reutilizáveis (ver components.md)
│   ├── sidebar/               # Navegação lateral
│   ├── Orders/                # Componentes do fluxo de criação de pedidos
│   │   ├── combo/
│   │   ├── custom-cup/
│   │   └── final-cup/
│   ├── dashboard/             # Widgets do dashboard
│   ├── finance/               # Gráficos e filtros de faturamento
│   └── management-menu/       # Modais CRUD, tabelas, cards
│       ├── combos-section/
│       └── products-section/
├── composables/               # Funções de composição reutilizáveis
├── constants/                 # Constantes globais da aplicação
├── router/                    # Configuração do Vue Router
├── services/                  # Classes de serviço de API (wrappers do Axios)
├── stores/                    # Stores de gerenciamento de estado (Pinia)
└── views/                     # Componentes de página (um por rota)
```

## Padrões de Design

### Arquitetura em Camadas

A aplicação segue um padrão limpo de três camadas:

```
Views (páginas) → Stores (estado + lógica de negócio) → Services (chamadas HTTP)
```

- **Views** são responsáveis pelo layout, interação do usuário e chamada de actions das stores.
- **Stores** mantêm o estado reativo, orquestram chamadas de API e contêm a lógica de negócio.
- **Services** são wrappers finos do Axios que encapsulam URLs de endpoints e métodos HTTP.

Cada entidade de domínio (ingrediente, estoque, pedido, etc.) tem sua própria classe de serviço e store dedicadas, criando um mapeamento 1:1 que mantém as responsabilidades isoladas.

### UI Orientada por Store

Componentes nunca chamam serviços de API diretamente. Todo o fluxo de dados passa pelas stores Pinia:

```
Ação do usuário → Componente chama action da store → Store chama service → Service chama API
                                                    → Store atualiza estado reativo
                                                    → Reatividade do Vue atualiza a UI
```

### Gerenciamento Centralizado de Modais

Em vez de cada componente gerenciar seu próprio estado de modal, uma store compartilhada `modal` (`src/stores/modal.js`) controla:

- Se o modal de criação/edição está aberto (`createModal`)
- Se o modal de confirmação de exclusão está aberto (`confirmDeleteModal`)
- O modo atual (`modalMode`: `'create'` ou `'edit'`)
- O item sendo editado (`editingItem`) ou excluído (`itemToDelete`)
- Uma string de contexto (`modalContext`) para diferenciar qual modal de entidade está ativo

Isso permite que qualquer view abra/feche modais através de uma única API e previne scroll do body quando modais estão abertos.

### Estado Global de Loading

Uma store dedicada `loading` (`src/stores/loading.js`) fornece uma única flag `isLoading` usada com `vue-loading-overlay` para indicadores de loading em tela cheia. Toda action de store que realiza trabalho assíncrono alterna essa flag.

### Rotas com Lazy Loading

Todos os componentes de rota usam imports dinâmicos para code splitting:

```js
component: () => import('@/views/DashboardView.vue')
```

Isso garante que apenas o código necessário para a página atual seja carregado.

### Padrão de Cache de Dados

A maioria dos hooks `onMounted` verifica se os dados já foram carregados antes de buscar:

```js
onMounted(async () => {
  if (store.items.length > 0) return
  await store.fetchItems()
})
```

Isso previne chamadas de API redundantes ao navegar entre páginas.

## Roteamento

### Mapa de Rotas

| Caminho                                 | Nome               | Componente               | Descrição                            |
| --------------------------------------- | ------------------ | ------------------------ | ------------------------------------ |
| `/`                                     | `dashboard`        | `DashboardView`          | Dashboard com estatísticas           |
| `/login`                                | `login`            | `LoginView`              | Página de autenticação               |
| `/management-menu`                      | `management-menu`  | `ManagementMenu`         | Wrapper de layout (redireciona para ingredientes) |
| `/management-menu/ingredients`          | `ingredients`      | `IngredientView`         | CRUD de ingredientes                 |
| `/management-menu/stock`                | `stock`            | `StockView`              | CRUD de estoque                      |
| `/management-menu/products`             | `products`         | `FinalCupsView`          | CRUD de copos prontos                |
| `/management-menu/recipients`           | `recipients`       | `RecipientsView`         | CRUD de recipientes                  |
| `/management-menu/combos`               | `combos`           | `CombosView`             | CRUD de combos                       |
| `/management-menu/finance`              | `finance`          | `FinanceView`            | Análise de faturamento               |
| `/management-menu/employees`            | `employees`        | `EmployeeView`           | CRUD de funcionários                 |
| `/management-menu/suppliers`            | `suppliers`        | `SuppliersView`          | Listagem de fornecedores             |
| `/management-menu/suppliers/new`        | `supplier-create`  | `RegisterSupplierView`   | Formulário de criação de fornecedor  |
| `/management-menu/suppliers/:id/edit`   | `supplier-edit`    | `RegisterSupplierView`   | Formulário de edição de fornecedor   |
| `/orders/create/:orderId?`             | `create-order`     | `ChoseOrderTypeView`     | Seleção do tipo de pedido            |
| `/orders/create/custom-cup/:orderId?`  | `create-custom-cup`| `CreateCustomCupView`    | Montar copo customizado              |
| `/orders/create/final-cup/:orderId?`   | `create-final-cup` | `CreateFinalCupView`     | Selecionar copo pronto               |
| `/orders/create/combo/:orderId?`       | `create-combo`     | `CreateComboView`        | Selecionar combo                     |
| `/orders`                               | `orders`           | `CreatedOrdersView`      | Lista e gerenciamento de pedidos     |
| `/orders/payment-method/:orderId`      | `payment-method`   | `PaymentMethodView`      | Processamento de pagamento           |
| `/orders/success/:orderId`             | `order-success`    | `OrderSuccessView`       | Confirmação do pedido                |

### Rotas Aninhadas

A rota `/management-menu` usa `<router-view>` aninhado com layout de sidebar. Todas as sub-páginas de gerenciamento renderizam dentro do wrapper `ManagementMenu`. Navegar para `/management-menu` redireciona automaticamente para `/management-menu/ingredients`.

### Guards de Navegação

Um guard global `beforeEach` trata:

1. **Hidratação do usuário:** Se um token de acesso existe mas nenhum objeto de usuário está carregado, chama `fetchCurrentUser()` para restaurar a sessão.
2. **Proteção de autenticação:** Todas as rotas exceto `/login` requerem que `isLoggedIn` seja true. Usuários não autenticados são redirecionados para `/login`.
3. **Redirecionamento de gerenciamento:** Navegar para `/management-menu` (sem sub-caminho) redireciona para a rota filha `ingredients`.

## Composables

### `useBreakpoint(breakpoint = 768)`

**Arquivo:** `src/composables/useBreakpoint.js`

Detecção reativa de breakpoint responsivo. Retorna uma ref `isDesktop` que atualiza no resize da janela.

```js
const { isDesktop } = useBreakpoint(768)
// isDesktop.value === true quando window.innerWidth >= 768
```

Usado no `App.vue` para alternar entre `NavBar` (desktop) e `MobileNavBar` (mobile).

### `useRelationErrorHandler()`

**Arquivo:** `src/composables/useRelationErrorHandler.js`

Trata erros de exclusão quando uma entidade é referenciada por um `FinalCup`. Quando uma exclusão falha, verifica quais copos prontos referenciam a entidade e retorna uma mensagem de erro amigável listando os nomes dos produtos relacionados.

```js
const { handleDeleteRelationError } = useRelationErrorHandler()
const errorMessage = await handleDeleteRelationError('recipient', recipientId)
```

Usado na store `recipient` para prevenir referências órfãs.

## Constantes

### `lowStockTreshold.js`

**Arquivo:** `src/constants/lowStockTreshold.js`

Define os limites de nível de estoque usados para coloração no gráfico de estoque do dashboard:

| Constante                   | Valor   | Significado                    |
| --------------------------- | ------- | ------------------------------ |
| `lowStockThresholdGrams`    | `3000`  | Abaixo disso = vermelho (crítico) |
| `mediumStockThresholdGrams` | `5000`  | Abaixo disso = âmbar (alerta)    |

## Design Responsivo

A aplicação usa uma abordagem mobile-first com breakpoints do Tailwind CSS:

- **Mobile (< 768px):** Barra de navegação inferior (`MobileNavBar`), tabelas em formato de card, sidebar em overlay de tela cheia
- **Desktop (≥ 768px):** Barra de navegação superior (`NavBar`), tabelas tradicionais, sidebar persistente na seção de gerenciamento
- **Telas grandes (≥ 1024px):** Layouts multi-coluna para dashboard e views de finanças
