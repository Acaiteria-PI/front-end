# API Services & State Management

Each domain entity has a dedicated API service class and a Pinia store. The service handles HTTP calls; the store manages reactive state and business logic. They are documented together since they map 1:1.

All API services are class-based wrappers around a shared Axios instance (`src/services/axios.js`). All endpoints are relative to the `VITE_API_URL` base URL.

## Common Patterns

Every store follows the same structure:

```js
export const useEntityStore = defineStore('entity', () => {
  const items = ref([])
  const newItem = ref({ /* default shape */ })

  const fetchItems = async () => { /* GET, update items.value */ }
  const createItem = async (item) => { /* POST, push to items, reset newItem */ }
  const updateItem = async () => { /* PUT using modalStore.editingItem */ }
  const deleteItem = async (id) => { /* DELETE, filter from items */ }

  return { items, newItem, fetchItems, createItem, updateItem, deleteItem }
})
```

Most stores use the `loading` store to toggle full-page loading overlays and the `modal` store to close modals after successful operations. Exceptions: `useSupplierStore`, `useContactStore`, and `useAddressStore` do not use the loading store.

API responses are normalized to handle both paginated (`data.results`) and non-paginated (`data`) responses:

```js
items.value = Array.isArray(data.results) ? [...data.results] : [...data]
```

---

## Orders

### API: `OrderApi` (`src/services/orderApi.js`)

| Method               | HTTP     | Endpoint                  |
| -------------------- | -------- | ------------------------- |
| `fetchOrders()`      | `GET`    | `api/orders/`             |
| `createOrder(order)` | `POST`   | `api/orders/`             |
| `updateOrder(order)` | `PUT`    | `api/orders/{id}/`        |
| `partialUpdateOrder(order, data)` | `PATCH` | `api/orders/{id}/` |
| `deleteOrder(id)`    | `DELETE` | `api/orders/{id}/`        |

### Store: `useOrderStore` (`src/stores/order.js`)

**State shape:**
```js
newOrder: {
  id: null,
  status: '',        // 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED'
  customer: '',
  order_date: null,
  establishment: null,
  total_amount: null,
  is_paid: false
}
```

**Additional behavior:**
- `fetchOrders()` also fetches all order items in parallel via `Promise.all`
- `getOrderItems(order)` filters order items belonging to a specific order
- `partialUpdateOrder()` uses PATCH for partial updates (e.g., setting payment method and status)

---

## Order Items

### API: `OrderItemApi` (`src/services/orderItemApi.js`)

| Method                       | HTTP     | Endpoint               |
| ---------------------------- | -------- | ---------------------- |
| `fetchOrderItems()`          | `GET`    | `api/order-items/`     |
| `createOrderItem(orderItem)` | `POST`   | `api/order-items/`     |
| `updateOrderItem(orderItem)` | `PUT`    | `api/order-items/{id}/`|
| `deleteOrderItem(id)`        | `DELETE` | `api/order-items/{id}/`|

### Store: `useOrderItemStore` (`src/stores/orderItem.js`)

**State shape:**
```js
newOrderItem: {
  id: null,
  type: '',          // 'CUSTOM_CUP' | 'FINAL_CUP' | 'COMBO'
  final_cup: null,
  custom_cup: null,
  combo: null,
  order: null,       // FK to order
  quantity: null,
  unity_price: null,
  total_price: null
}
```

**Additional behavior:**
- `getCupById(cupId, orderItemType)` resolves the product details from the appropriate store (customCup, finalCup, or combo) based on the item type.

> **Note:** There is an inconsistency in the store: the initial `newOrderItem` uses `unity_price`, but the reset after `createOrderItem` uses `unit_price`. The backend field name should be verified.

---

## Custom Cups

### API: `CustomCupApi` (`src/services/customCupApi.js`)

| Method                          | HTTP     | Endpoint                |
| ------------------------------- | -------- | ----------------------- |
| `fetchCustomCups()`             | `GET`    | `api/custom-cups/`      |
| `createCustomCup(customCup)`    | `POST`   | `api/custom-cups/`      |
| `updateCustomCup(customCup)`    | `PUT`    | `api/custom-cups/{id}/` |
| `deleteCustomCup(id)`           | `DELETE` | `api/custom-cups/{id}/` |

### Store: `useCustomCupStore` (`src/stores/customCup.js`)

**State shape:**
```js
newCustomCup: {
  id: null,
  recipient: null,        // FK to recipient
  recipient_data: null,   // Nested recipient object (read-only, from API)
  ingredient: [],         // Array of ingredient IDs
  ingredient_data: null,  // Nested ingredient objects (read-only, from API)
  price: null
}
```

Custom cups are user-assembled açaí cups where the customer picks a recipient (container) and ingredients (toppings). The price is calculated from the sum of the recipient price and selected ingredient prices.

---

## Final Cups (Pre-made Products)

### API: `FinalCupApi` (`src/services/finalCupApi.js`)

| Method                       | HTTP     | Endpoint               |
| ---------------------------- | -------- | ----------------------- |
| `fetchFinalCups()`           | `GET`    | `api/final-cups/`       |
| `createFinalCup(product)`    | `POST`   | `api/final-cups/`       |
| `updateFinalCup(product)`    | `PUT`    | `api/final-cups/{id}/`  |
| `deleteFinalCup(id)`         | `DELETE` | `api/final-cups/{id}/`  |

### Store: `useFinalCupStore` (`src/stores/finalCup.js`)

**State shape:**
```js
newFinalCup: {
  id: null,
  name: '',
  price: null,
  recipient: null,    // FK to recipient
  ingredient: []      // Array of ingredient IDs
}
```

**Additional behavior:**
- `getIngredientsNames(product)` returns a comma-separated string of ingredient names from the nested `ingredient_data`.

---

## Combos

### API: `ComboApi` (`src/services/comboApi.js`)

| Method                  | HTTP     | Endpoint            |
| ----------------------- | -------- | ------------------- |
| `fetchCombos()`         | `GET`    | `api/combos/`       |
| `createCombo(product)`  | `POST`   | `api/combos/`       |
| `updateCombo(product)`  | `PUT`    | `api/combos/{id}/`  |
| `deleteCombo(id)`       | `DELETE` | `api/combos/{id}/`  |

### Store: `useComboStore` (`src/stores/combo.js`)

**State shape:**
```js
newCombo: {
  id: null,
  name: '',
  price: null,
  final_cup: []    // Array of final cup IDs
}
```

**Additional behavior:**
- `getFinalCupsNames(combo)` returns a comma-separated string of final cup names from the nested `final_cup_data`.

---

## Ingredients

### API: `IngredientApi` (`src/services/ingredientApi.js`)

| Method                              | HTTP     | Endpoint                          |
| ----------------------------------- | -------- | --------------------------------- |
| `fetchIngredients(search = '')`     | `GET`    | `api/ingredients/?search={query}` |
| `createIngredient(ingredient)`      | `POST`   | `api/ingredients/`                |
| `updateIngredient(ingredient)`      | `PUT`    | `api/ingredients/{id}/`           |
| `deleteIngredient(id)`              | `DELETE` | `api/ingredients/{id}/`           |

Supports server-side search via the `search` query parameter.

### Store: `useIngredientStore` (`src/stores/ingredient.js`)

**State shape:**
```js
newIngredient: {
  id: null,
  name: '',
  portion: '',
  price: null,
  unit_of_measure: '',
  is_addon: false      // Whether this ingredient appears as a selectable topping
}
```

The `is_addon` flag determines whether an ingredient shows up in the custom cup and final cup creation forms as a selectable option.

---

## Stock

### API: `StockApi` (`src/services/stockApi.js`)

| Method                        | HTTP     | Endpoint              |
| ----------------------------- | -------- | --------------------- |
| `fetchStock()`                | `GET`    | `api/stock/`          |
| `createStockItem(stockItem)`  | `POST`   | `api/stock/`          |
| `updateStockItem(stockItem)`  | `PUT`    | `api/stock/{id}/`     |
| `deleteStockItem(id)`         | `DELETE` | `api/stock/{id}/`     |
| `fetchLowStock()`             | `GET`    | `api/stock/low_stock/`|

### Store: `useStockStore` (`src/stores/stock.js`)

**State shape:**
```js
newItem: {
  id: null,
  ingredient: null,      // FK to ingredient
  quantity: null,         // Quantity in grams
  batch: '',
  expiration_date: new Date().toISOString().split('T')[0],  // Defaults to today
  supplier: '',          // FK to supplier
  batch_price: 0,
  unit_of_measure: ''
}
```

**Additional behavior:**
- Maintains a separate `lowStockItems` array fetched from the `/low_stock/` endpoint
- After create/update, checks if the quantity is below `mediumStockThresholdGrams` (5000g) and refreshes the low stock list accordingly

---

## Recipients (Cup Containers)

### API: `RecipientApi` (`src/services/recipientApi.js`)

| Method                           | HTTP     | Endpoint                |
| -------------------------------- | -------- | ----------------------- |
| `fetchRecipients()`              | `GET`    | `api/recipients/`       |
| `createRecipient(recipient)`     | `POST`   | `api/recipients/`       |
| `updateRecipient(recipient)`     | `PUT`    | `api/recipients/{id}/`  |
| `deleteRecipient(id)`            | `DELETE` | `api/recipients/{id}/`  |

### Store: `useRecipientStore` (`src/stores/recipient.js`)

**State shape:**
```js
newRecipient: {
  id: null,
  title: '',        // e.g., "Copo 400ml"
  quantity: '',      // quantity_ml
  price: null,
  stock: '',
  content: null      // FK to ingredient (the base content)
}
```

**Additional behavior:**
- On delete failure, uses `useRelationErrorHandler` to check if the recipient is referenced by any final cups and displays an appropriate error message.

---

## Suppliers

### API: `SupplierApi` (`src/services/supplierApi.js`)

| Method                        | HTTP     | Endpoint               |
| ----------------------------- | -------- | ---------------------- |
| `fetchSuppliers()`            | `GET`    | `api/suppliers/`       |
| `createSupplier(supplier)`    | `POST`   | `api/suppliers/`       |
| `updateSupplier(supplier)`    | `PUT`    | `api/suppliers/{id}/`  |
| `deleteSupplier(id)`          | `DELETE` | `api/suppliers/{id}/`  |

### Store: `useSupplierStore` (`src/stores/supplier.js`)

**State shape:**
```js
newSupplier: {
  id: null,
  legal_name: '',
  name: '',
  document: '',        // CPF or CNPJ
  type: '',            // 'MANUFACTURER' | 'DISTRIBUTOR' | 'RETAILER' | 'IMPORTER' (uppercase, as sent by RegisterSupplierView)
  contact: null,       // FK to contact
  address: null,       // FK to address
  contact_data: null,  // Nested contact object (read-only)
  address_data: null   // Nested address object (read-only)
}
```

Suppliers have related `Contact` and `Address` entities that are created/updated separately and linked via foreign keys.

> **Note:** `SupplierCard.vue` maps type values using lowercase keys (`manufacturer`, `distributor`, etc.) for display labels, but `RegisterSupplierView` sends uppercase values (`MANUFACTURER`, `DISTRIBUTOR`, etc.). If the backend stores uppercase values, the card display labels will fall through to the raw value. Verify the backend's stored format.

---

## Contacts

### API: `ContactApi` (`src/services/contactApi.js`)

| Method                     | HTTP     | Endpoint              |
| -------------------------- | -------- | --------------------- |
| `fetchContacts()`          | `GET`    | `api/contacts/`       |
| `createContact(contact)`   | `POST`   | `api/contacts/`       |
| `updateContact(contact)`   | `PUT`    | `api/contacts/{id}/`  |
| `deleteContact(id)`        | `DELETE` | `api/contacts/{id}/`  |

### Store: `useContactStore` (`src/stores/contact.js`)

**State shape:**
```js
newContact: {
  id: null,
  business_email: '',
  financial_email: '',
  phone_number: '',
  whatsapp_number: ''
}
```

Used exclusively in the supplier registration flow.

---

## Addresses

### API: `AddressApi` (`src/services/addressApi.js`)

| Method                      | HTTP     | Endpoint               |
| --------------------------- | -------- | ---------------------- |
| `fetchAddresses()`          | `GET`    | `api/addresses/`       |
| `createAddress(address)`    | `POST`   | `api/addresses/`       |
| `updateAddress(address)`    | `PUT`    | `api/addresses/{id}/`  |
| `deleteAddress(id)`         | `DELETE` | `api/addresses/{id}/`  |

### Store: `useAddressStore` (`src/stores/address.js`)

**State shape:**
```js
newAddress: {
  id: null,
  street: '',
  number: '',
  city: '',
  state: '',       // Brazilian state abbreviation (e.g., 'SP', 'RJ')
  zip_code: ''
}
```

Used exclusively in the supplier registration flow.

---

## Employees

### API: `EmployeeApi` (`src/services/employeeApi.js`)

| Method                         | HTTP     | Endpoint            |
| ------------------------------ | -------- | ------------------- |
| `fetchEmployees()`             | `GET`    | `api/users/`        |
| `createEmployee(employee)`     | `POST`   | `api/users/`        |
| `updateEmployee(employee)`     | `PUT`    | `api/users/{id}/`   |
| `deleteEmployee(id)`           | `DELETE` | `api/users/{id}/`   |

Note: Employees use the `api/users/` endpoint (shared with the auth user model).

### Store: `useEmployeeStore` (`src/stores/employee.js`)

**State shape:**
```js
newEmployee: {
  id: null,
  name: '',
  email: '',
  registration: null,
  password: '',
  password_confirmation: '',
  establishment: null,       // FK to establishment
  is_management: false,      // Admin flag
  establishment_data: null   // Nested establishment object (read-only)
}
```

**Additional behavior:**
- `createEmployee()` validates that `password` matches `password_confirmation` before sending the request.

---

## Establishments

### API: `EstablishmentApi` (`src/services/establishmentApi.js`)

| Method                                  | HTTP     | Endpoint                    |
| --------------------------------------- | -------- | --------------------------- |
| `fetchEstablishments()`                 | `GET`    | `api/establishments/`       |
| `createEstablishment(establishment)`    | `POST`   | `api/establishments/`       |
| `updateEstablishment(establishment)`    | `PUT`    | `api/establishments/{id}/`  |
| `deleteEstablishment(id)`               | `DELETE` | `api/establishments/{id}/`  |

### Store: `useEstablishmentStore` (`src/stores/establishment.js`)

**State shape:**
```js
newEstablishment: {
  id: null,
  name: '',
  cnpj: '',
  amount: 0
}
```

Used in the employee registration form to assign employees to establishments.

---

## Daily Revenue

### API: `DailyRevenueApi` (`src/services/dailyRevenueApi.js`)

| Method                                        | HTTP  | Endpoint                                          |
| --------------------------------------------- | ----- | ------------------------------------------------- |
| `fetchDailyRevenues({ startDate, endDate })`  | `GET` | `api/daily-revenues/?start_date=&end_date=`       |

This is a read-only API. Revenue records are generated server-side from paid orders.

### Store: `useRevenueStore` (`src/stores/revenue.js`)

**State shape:**
```js
revenues: [],                // Raw revenue data from API
selectedMonthUi: '2026-04',  // Current month (YYYY-MM)
selectedStartDateUi: '',     // Filter start date
selectedEndDateUi: ''        // Filter end date
```

**Computed properties:**

| Property                         | Description                                              |
| -------------------------------- | -------------------------------------------------------- |
| `normalizedRevenues`             | Revenues with parsed dates and numeric amounts           |
| `todayRevenue`                   | Revenue amount for today                                 |
| `todayOrdersCount`               | Number of orders today                                   |
| `totalSelectedPeriod`            | Sum of revenue for the selected date range               |
| `totalSelectedPeriodOrdersCount` | Total orders in the selected period                      |
| `hasRevenueData`                 | Whether any revenue data exists                          |
| `dailyChartData`                 | Chart.js dataset for daily revenue line chart            |
| `monthlyComparisonData`          | Chart.js dataset for monthly comparison bar chart        |

---

## UI Stores

### `useLoading` (`src/stores/loading.js`)

| Property    | Type           | Description                          |
| ----------- | -------------- | ------------------------------------ |
| `isLoading` | `ref<boolean>` | Global loading state                 |
| `fullPage`  | `ref<boolean>` | Whether overlay covers full page (always `true`) |

### `useModalStore` (`src/stores/modal.js`)

| Property             | Type           | Description                                    |
| -------------------- | -------------- | ---------------------------------------------- |
| `createModal`        | `ref<boolean>` | Whether create/edit modal is open              |
| `confirmDeleteModal` | `ref<boolean>` | Whether delete confirmation modal is open      |
| `modalMode`          | `ref<string>`  | `'create'` or `'edit'`                         |
| `editingItem`        | `ref<any>`     | The item being edited                          |
| `itemToDelete`       | `ref<any>`     | The ID of the item to delete                   |
| `modalContext`       | `ref<string>`  | Entity context (e.g., `'ingredient'`, `'stock'`) |

**Actions:** `openCreateModal(mode, item)`, `closeCreateModal()`, `openConfirmDeleteModal(id, context)`, `closeConfirmDeleteModal()`

The store also watches both modal flags and toggles `document.body.style.overflow` to prevent background scrolling when any modal is open.
