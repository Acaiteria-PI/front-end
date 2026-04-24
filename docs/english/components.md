# Components

## Layout Components

### `App.vue`

Root component. Conditionally renders `NavBar` (desktop, ≥768px) or `MobileNavBar` (mobile). Hides navigation entirely on the login page. Contains the main `<router-view>`.

### `NavBar.vue`

Desktop top navigation bar with:
- Logo linking to `/`
- Navigation links: Início (`/`), Menu de gerenciamento (`/management-menu`), Pedidos (`/orders/create`)
- Shopping bag icon with order count badge linking to `/orders`
- `ProfileDropdown` (when logged in) or Login button
- Fetches orders on mount to populate the badge count

### `MobileNavBar.vue`

Bottom navigation bar for mobile. Icon-only links to Home, Management, and Orders. Shows user avatar circle when logged in.

### `ProfileDropdown.vue`

User avatar circle (first letter of name) that toggles a dropdown with a logout button.

| Emits          | Description                    |
| -------------- | ------------------------------ |
| `open-logout`  | Triggers the logout confirmation modal |

### `ConfirmLogout.vue`

Teleported modal asking the user to confirm logout.

| Props   | Type      | Description              |
| ------- | --------- | ------------------------ |
| `show`  | `Boolean` | Controls modal visibility |

| Emits   | Description                |
| ------- | -------------------------- |
| `close` | Closes the modal           |

---

## Sidebar Components

### `SideBar.vue` (`src/components/sidebar/`)

Management menu sidebar with two sections:
- **Produtos:** Ingredientes, Estoque, Produtos, Recipientes, Combos, Financeiro
- **Equipe:** Fornecedores, Funcionários

Responsive: on mobile (< 768px), it becomes a full-screen overlay toggled by a hamburger button. On desktop, it's a persistent side panel.

### `SideBarItem.vue`

Individual sidebar navigation item with active state indicator (pink bar).

| Props        | Type        | Description                    |
| ------------ | ----------- | ------------------------------ |
| `name`       | `String`    | Display label                  |
| `icon`       | `Component` | Lucide icon component          |
| `route`      | `String`    | Route path                     |
| `currentTab` | `String`    | Currently active route path    |

---

## Order Components

### `OrderForm.vue`

Simple customer name input bound to `orderStore.newOrder.customer`. Used in all order creation views when creating a new order (not adding items to an existing one).

### `OrderTypeCard.vue`

Card for selecting an order type (custom cup, final cup, or combo).

| Props       | Type        | Description              |
| ----------- | ----------- | ------------------------ |
| `title`     | `String`    | Card title               |
| `description` | `String` | Card description         |
| `icon`      | `Component` | Lucide icon              |
| `iconColor` | `String`    | Icon color hex           |

### `CreatedOrderItem.vue`

Displays a single order item within the orders list. Resolves item details (name, ingredients, recipient) from the appropriate store based on item type. Includes a delete button with confirmation modal.

| Props       | Type     | Description           |
| ----------- | -------- | --------------------- |
| `order`     | `Object` | Parent order object   |
| `orderItem` | `Object` | The order item to display |

### `PaymentMethod.vue`

Payment method selection card with selected state (green border + checkmark).

| Props            | Type              | Description                    |
| ---------------- | ----------------- | ------------------------------ |
| `method`         | `Object`          | `{ id, name, description, icon }` |
| `selectedMethod` | `String \| null`  | Currently selected method ID   |
| `received`       | `Number \| null`  | Amount received (for cash)     |

| Emits                     | Description                      |
| ------------------------- | -------------------------------- |
| `update:selected-method`  | Emits selected method ID         |
| `update:received`         | Emits received amount            |

---

### Custom Cup Components (`src/components/Orders/custom-cup/`)

#### `CustomCupForm.vue`

Form for building a custom açaí cup:
- Dropdown to select a recipient (container)
- Checkbox grid of addon ingredients with prices

Fetches recipients and ingredients on mount if not already loaded.

#### `CustomCupOrderSummary.vue`

Order summary showing recipient size, selected ingredients, and calculated total price (recipient price + sum of ingredient prices).

---

### Final Cup Components (`src/components/Orders/final-cup/`)

#### `FinalCupSelectionCard.vue`

Card for selecting a pre-made cup. Shows name, recipient, ingredients, and price. Highlights when selected.

| Props         | Type             | Description                |
| ------------- | ---------------- | -------------------------- |
| `cup`         | `Object`         | Final cup data             |
| `selectedCup` | `Number \| null` | Currently selected cup ID  |

#### `FinalCupOrderSummary.vue`

Order summary showing product name, cup size, ingredients, and price for the selected final cup.

| Props         | Type             | Description                |
| ------------- | ---------------- | -------------------------- |
| `selectedCup` | `Number \| null` | Currently selected cup ID  |

---

### Combo Components (`src/components/Orders/combo/`)

#### `ComboSelectionCard.vue`

Card for selecting a combo. Shows name, included cups, and price. Highlights when selected.

| Props           | Type             | Description                  |
| --------------- | ---------------- | ---------------------------- |
| `combo`         | `Object`         | Combo data                   |
| `selectedCombo` | `Number \| null` | Currently selected combo ID  |

#### `ComboOrderSummary.vue`

Order summary showing combo name, included products, and price.

| Props           | Type             | Description                  |
| --------------- | ---------------- | ---------------------------- |
| `selectedCombo` | `Number \| null` | Currently selected combo ID  |

---

## Dashboard Components (`src/components/dashboard/`)

### `DashboardCard.vue`

Renders a grid of metric cards from a stats array.

| Props   | Type    | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| `stats` | `Array` | Array of `{ label, value, change, icon, bgColor, iconColor }` |

### `RecentOrders.vue`

Lists all orders with ID badge, customer name, status pill, time, and total amount. Uses the order store directly.

### `StockGraph.vue`

Horizontal bar chart showing low-stock items. Color-coded:
- Red (< 3000g): critical
- Amber (≥ 3000g and < 5000g): warning
- Green (≥ 5000g): healthy

Fetches low stock data on mount. Uses Chart.js via `vue-chart-3`.

### `CoposProntos.vue`

Placeholder component with hardcoded mock data for final cups and combos display. Not currently connected to real data.

---

## Finance Components (`src/components/finance/`)

### `RevenueFilters.vue`

Filter controls for the finance page: month picker, start date, end date, and refresh button.

| Props                 | Type      | Description                    |
| --------------------- | --------- | ------------------------------ |
| `selectedMonthUi`     | `String`  | Selected month (YYYY-MM)       |
| `selectedStartDateUi` | `String`  | Start date filter              |
| `selectedEndDateUi`   | `String`  | End date filter                |
| `isRefreshing`        | `Boolean` | Loading state for refresh btn  |

| Emits                          | Description                    |
| ------------------------------ | ------------------------------ |
| `update:selectedMonthUi`       | Month changed                  |
| `update:selectedStartDateUi`   | Start date changed             |
| `update:selectedEndDateUi`     | End date changed               |
| `refresh`                      | Refresh button clicked         |

### `RevenueMetricCards.vue`

Two KPI cards: today's revenue + orders count, and selected period total + orders count. Formats values as BRL currency.

| Props                            | Type     | Description                    |
| -------------------------------- | -------- | ------------------------------ |
| `todayRevenue`                   | `Number` | Today's revenue amount         |
| `todayOrdersCount`               | `Number` | Today's order count            |
| `totalSelectedPeriod`            | `Number` | Period total revenue           |
| `totalSelectedPeriodOrdersCount` | `Number` | Period total orders            |

### `RevenueDailyChart.vue`

Line chart showing daily revenue for the selected month. Tooltips formatted as BRL currency with full date.

| Props             | Type     | Description                    |
| ----------------- | -------- | ------------------------------ |
| `chartData`       | `Object` | Chart.js dataset               |
| `selectedMonthUi` | `String` | Selected month for tooltip formatting |

### `RevenueMonthlyComparisonChart.vue`

Bar chart comparing monthly revenue totals. Tooltips formatted as BRL currency.

| Props       | Type     | Description          |
| ----------- | -------- | -------------------- |
| `chartData` | `Object` | Chart.js dataset     |

---

## Management Components (`src/components/management-menu/`)

### `SectionTitle.vue`

Simple heading component.

| Props   | Type     | Description    |
| ------- | -------- | -------------- |
| `title` | `String` | Section title  |

### `SearchBar.vue`

Search input with icon. Emits the search value on input.

| Emits           | Description              |
| --------------- | ------------------------ |
| `update:search` | Emits current search text |

### `NewProductBtn.vue`

Button for creating new items.

| Props   | Type     | Default       | Description    |
| ------- | -------- | ------------- | -------------- |
| `title` | `String` | `'Registrar'` | Button label   |

### `ProductsTable.vue`

Generic data table used across all management views. Renders a mobile card layout (< 768px) and a desktop table (≥ 768px). Handles field formatting for dates, prices, quantities, and nested data objects.

| Props           | Type      | Default | Description                              |
| --------------- | --------- | ------- | ---------------------------------------- |
| `headers`       | `Array`   | —       | `[{ name, value }]` column definitions   |
| `products`      | `Array`   | —       | Data rows                                |
| `canDelete`     | `Boolean` | `true`  | Whether to show delete button            |
| `deleteContext` | `String`  | —       | Modal context string for delete action   |

Each row has edit (pencil) and delete (trash) action buttons that interact with the modal store.

### `ConfirmDeleteModal.vue`

Teleported confirmation dialog for delete actions.

| Emits     | Description              |
| --------- | ------------------------ |
| `confirm` | User confirmed deletion  |
| `cancel`  | User cancelled           |

### `RegisterStockModal.vue`

Modal form for creating/editing stock items. Includes ingredient and supplier dropdowns, batch info, quantity, expiration date, and price (via `MoneyInput`).

### `ReisterIngredientModal.vue`

Modal form for creating/editing ingredients. Includes name, portion, unit of measure, price (via `MoneyInput`), and an "is addon" toggle.

### `RegisterRecipientModal.vue`

Modal form for creating/editing recipients. Includes content (ingredient) dropdown, title, quantity in ml, price (via `MoneyInput`), and stock count.

### `RegisterEmployeeModal.vue`

Modal form for creating/editing employees. Includes establishment dropdown, registration number, name, email, password fields, and an admin toggle switch.

### `SupplierCard.vue`

Card displaying supplier info: name, legal name, type badge, document, address, contact emails, and phone numbers. Edit navigates to the supplier edit page; delete opens confirmation modal.

All registration modals share the same props pattern:

| Props     | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| `title`   | `String` | Modal title                              |
| `btnName` | `String` | Submit button label                      |
| `mode`    | `String` | `'create'` or `'edit'`                   |
| `model`   | `Object` | The data model (new item or editing item)|

---

### Combo Section (`src/components/management-menu/combos-section/`)

#### `ComboCard.vue`

Card displaying a combo with name, price, included final cups, and edit/delete actions.

| Props     | Type     | Description    |
| --------- | -------- | -------------- |
| `product` | `Object` | Combo data     |

#### `RegisterComboModal.vue`

Modal for creating/editing combos. Includes name, price (via `MoneyInput`), and a scrollable checkbox list of final cups.

---

### Products Section (`src/components/management-menu/products-section/`)

#### `FinalCupCard.vue`

Card displaying a final cup with name, recipient size, price, ingredients, and edit/delete actions.

| Props     | Type     | Description      |
| --------- | -------- | ---------------- |
| `product` | `Object` | Final cup data   |

#### `RegisterFinalCupModal.vue`

Modal for creating/editing final cups. Includes name, price (via `MoneyInput`), recipient dropdown, and a scrollable checkbox list of addon ingredients.

---

## Utility Components

### `MoneyInput.vue`

Currency input wrapper around `v-money3` configured for Brazilian Real (R$).

| Props        | Type     | Description          |
| ------------ | -------- | -------------------- |
| `modelValue` | `Number` | The numeric value    |

| Emits               | Description              |
| ------------------- | ------------------------ |
| `update:modelValue` | Emits unformatted number |

Configuration: `R$` prefix, `.` thousands separator, `,` decimal separator, 2 decimal precision, no negatives.

### `SubmitButton.vue`

Reusable submit button with rose-900 styling.

| Props     | Type     | Default       | Description    |
| --------- | -------- | ------------- | -------------- |
| `btnName` | `String` | `'Cadastrar'` | Button label   |
