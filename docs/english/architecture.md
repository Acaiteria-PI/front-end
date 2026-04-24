# Architecture

## Folder Structure

```
src/
├── App.vue                    # Root component (navbar switching, router-view)
├── main.js                    # App entry point (Vue + Pinia + Router)
├── assets/
│   ├── img/                   # Static images (logo, icons, payment logos)
│   ├── logo.ico
│   └── main.css               # Global styles (Tailwind import, Inter font)
├── components/                # Reusable UI components (see components.md)
│   ├── sidebar/               # Sidebar navigation
│   ├── Orders/                # Order creation flow components
│   │   ├── combo/
│   │   ├── custom-cup/
│   │   └── final-cup/
│   ├── dashboard/             # Dashboard widgets
│   ├── finance/               # Revenue charts and filters
│   └── management-menu/       # CRUD modals, tables, cards
│       ├── combos-section/
│       └── products-section/
├── composables/               # Reusable composition functions
├── constants/                 # App-wide constants
├── router/                    # Vue Router configuration
├── services/                  # API service classes (Axios wrappers)
├── stores/                    # Pinia state management stores
└── views/                     # Page-level components (one per route)
```

## Design Patterns

### Layer Architecture

The app follows a clean three-layer pattern:

```
Views (pages) → Stores (state + business logic) → Services (HTTP calls)
```

- **Views** are responsible for layout, user interaction, and calling store actions.
- **Stores** hold reactive state, orchestrate API calls, and contain business logic.
- **Services** are thin wrappers around Axios that encapsulate endpoint URLs and HTTP methods.

Each domain entity (ingredient, stock, order, etc.) has its own dedicated service class and store, creating a 1:1 mapping that keeps concerns isolated.

### Store-Driven UI

Components never call API services directly. All data flows through Pinia stores:

```
User action → Component calls store action → Store calls service → Service calls API
                                            → Store updates reactive state
                                            → Vue reactivity updates the UI
```

### Centralized Modal Management

Instead of each component managing its own modal state, a shared `modal` store (`src/stores/modal.js`) controls:

- Whether the create/edit modal is open (`createModal`)
- Whether the delete confirmation modal is open (`confirmDeleteModal`)
- The current mode (`modalMode`: `'create'` or `'edit'`)
- The item being edited (`editingItem`) or deleted (`itemToDelete`)
- A context string (`modalContext`) to differentiate which entity's modal is active

This allows any view to open/close modals through a single API and prevents body scroll when modals are open.

### Global Loading State

A dedicated `loading` store (`src/stores/loading.js`) provides a single `isLoading` flag used with `vue-loading-overlay` for full-page loading indicators. Every store action that performs async work toggles this flag.

### Lazy-Loaded Routes

All route components use dynamic imports for code splitting:

```js
component: () => import('@/views/DashboardView.vue')
```

This ensures only the code needed for the current page is loaded.

### Data Caching Pattern

Most `onMounted` hooks check if data is already loaded before fetching:

```js
onMounted(async () => {
  if (store.items.length > 0) return
  await store.fetchItems()
})
```

This prevents redundant API calls when navigating between pages.

## Routing

### Route Map

| Path                                    | Name               | Component                | Description                          |
| --------------------------------------- | ------------------ | ------------------------ | ------------------------------------ |
| `/`                                     | `dashboard`        | `DashboardView`          | Home dashboard with stats            |
| `/login`                                | `login`            | `LoginView`              | Authentication page                  |
| `/management-menu`                      | `management-menu`  | `ManagementMenu`         | Layout wrapper (redirects to ingredients) |
| `/management-menu/ingredients`          | `ingredients`      | `IngredientView`         | Ingredient CRUD                      |
| `/management-menu/stock`                | `stock`            | `StockView`              | Stock inventory CRUD                 |
| `/management-menu/products`             | `products`         | `FinalCupsView`          | Pre-made cup CRUD                    |
| `/management-menu/recipients`           | `recipients`       | `RecipientsView`         | Cup container CRUD                   |
| `/management-menu/combos`               | `combos`           | `CombosView`             | Combo product CRUD                   |
| `/management-menu/finance`              | `finance`          | `FinanceView`            | Revenue analytics                    |
| `/management-menu/employees`            | `employees`        | `EmployeeView`           | Employee CRUD                        |
| `/management-menu/suppliers`            | `suppliers`        | `SuppliersView`          | Supplier listing                     |
| `/management-menu/suppliers/new`        | `supplier-create`  | `RegisterSupplierView`   | Create supplier form                 |
| `/management-menu/suppliers/:id/edit`   | `supplier-edit`    | `RegisterSupplierView`   | Edit supplier form                   |
| `/orders/create/:orderId?`             | `create-order`     | `ChoseOrderTypeView`     | Select order type                    |
| `/orders/create/custom-cup/:orderId?`  | `create-custom-cup`| `CreateCustomCupView`    | Build custom açaí cup                |
| `/orders/create/final-cup/:orderId?`   | `create-final-cup` | `CreateFinalCupView`     | Select pre-made cup                  |
| `/orders/create/combo/:orderId?`       | `create-combo`     | `CreateComboView`        | Select combo                         |
| `/orders`                               | `orders`           | `CreatedOrdersView`      | Order list and management            |
| `/orders/payment-method/:orderId`      | `payment-method`   | `PaymentMethodView`      | Payment processing                   |
| `/orders/success/:orderId`             | `order-success`    | `OrderSuccessView`       | Order confirmation                   |

### Nested Routes

The `/management-menu` route uses nested `<router-view>` with a sidebar layout. All management sub-pages render inside the `ManagementMenu` wrapper. Navigating to `/management-menu` automatically redirects to `/management-menu/ingredients`.

### Navigation Guards

A global `beforeEach` guard handles:

1. **User hydration:** If an access token exists but no user object is loaded, it calls `fetchCurrentUser()` to restore the session.
2. **Auth protection:** All routes except `/login` require `isLoggedIn` to be true. Unauthenticated users are redirected to `/login`.
3. **Management redirect:** Navigating to `/management-menu` (without a sub-path) redirects to the `ingredients` child route.

## Composables

### `useBreakpoint(breakpoint = 768)`

**File:** `src/composables/useBreakpoint.js`

Reactive responsive breakpoint detection. Returns an `isDesktop` ref that updates on window resize.

```js
const { isDesktop } = useBreakpoint(768)
// isDesktop.value === true when window.innerWidth >= 768
```

Used in `App.vue` to switch between `NavBar` (desktop) and `MobileNavBar` (mobile).

### `useRelationErrorHandler()`

**File:** `src/composables/useRelationErrorHandler.js`

Handles deletion errors when an entity is referenced by a `FinalCup`. When a delete fails, it checks which final cups reference the entity and returns a user-friendly error message listing the related product names.

```js
const { handleDeleteRelationError } = useRelationErrorHandler()
const errorMessage = await handleDeleteRelationError('recipient', recipientId)
```

Used in the `recipient` store to prevent orphaned references.

## Constants

### `lowStockTreshold.js`

**File:** `src/constants/lowStockTreshold.js`

Defines stock level thresholds used for color-coding in the dashboard stock graph:

| Constant                    | Value   | Meaning                        |
| --------------------------- | ------- | ------------------------------ |
| `lowStockThresholdGrams`    | `3000`  | Below this = red (critical)    |
| `mediumStockThresholdGrams` | `5000`  | Below this = amber (warning)   |

## Responsive Design

The app uses a mobile-first approach with Tailwind CSS breakpoints:

- **Mobile (< 768px):** Bottom navigation bar (`MobileNavBar`), card-based tables, full-width sidebar overlay
- **Desktop (≥ 768px):** Top navigation bar (`NavBar`), traditional tables, persistent sidebar in management section
- **Large screens (≥ 1024px):** Multi-column layouts for dashboard and finance views
