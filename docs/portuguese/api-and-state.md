# Serviços de API & Gerenciamento de Estado

Cada entidade de domínio tem uma classe de serviço de API dedicada e uma store Pinia. O serviço trata as chamadas HTTP; a store gerencia o estado reativo e a lógica de negócio. Estão documentados juntos pois possuem mapeamento 1:1.

Todos os serviços de API são wrappers baseados em classe sobre uma instância compartilhada do Axios (`src/services/axios.js`). Todos os endpoints são relativos à URL base `VITE_API_URL`.

## Padrões Comuns

Toda store segue a mesma estrutura:

```js
export const useEntityStore = defineStore('entity', () => {
  const items = ref([])
  const newItem = ref({ /* shape padrão */ })

  const fetchItems = async () => { /* GET, atualiza items.value */ }
  const createItem = async (item) => { /* POST, push em items, reseta newItem */ }
  const updateItem = async () => { /* PUT usando modalStore.editingItem */ }
  const deleteItem = async (id) => { /* DELETE, filtra de items */ }

  return { items, newItem, fetchItems, createItem, updateItem, deleteItem }
})
```

A maioria das stores usa a store `loading` para alternar overlays de loading em tela cheia e a store `modal` para fechar modais após operações bem-sucedidas. Exceções: `useSupplierStore`, `useContactStore` e `useAddressStore` não usam a store de loading.

Respostas da API são normalizadas para tratar tanto respostas paginadas (`data.results`) quanto não paginadas (`data`):

```js
items.value = Array.isArray(data.results) ? [...data.results] : [...data]
```

---

## Pedidos

### API: `OrderApi` (`src/services/orderApi.js`)

| Método               | HTTP     | Endpoint                  |
| -------------------- | -------- | ------------------------- |
| `fetchOrders()`      | `GET`    | `api/orders/`             |
| `createOrder(order)` | `POST`   | `api/orders/`             |
| `updateOrder(order)` | `PUT`    | `api/orders/{id}/`        |
| `partialUpdateOrder(order, data)` | `PATCH` | `api/orders/{id}/` |
| `deleteOrder(id)`    | `DELETE` | `api/orders/{id}/`        |

### Store: `useOrderStore` (`src/stores/order.js`)

**Shape do estado:**
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

**Comportamento adicional:**
- `fetchOrders()` também busca todos os itens de pedido em paralelo via `Promise.all`
- `getOrderItems(order)` filtra itens de pedido pertencentes a um pedido específico
- `partialUpdateOrder()` usa PATCH para atualizações parciais (ex: definir método de pagamento e status)

---

## Itens de Pedido

### API: `OrderItemApi` (`src/services/orderItemApi.js`)

| Método                       | HTTP     | Endpoint               |
| ---------------------------- | -------- | ---------------------- |
| `fetchOrderItems()`          | `GET`    | `api/order-items/`     |
| `createOrderItem(orderItem)` | `POST`   | `api/order-items/`     |
| `updateOrderItem(orderItem)` | `PUT`    | `api/order-items/{id}/`|
| `deleteOrderItem(id)`        | `DELETE` | `api/order-items/{id}/`|

### Store: `useOrderItemStore` (`src/stores/orderItem.js`)

**Shape do estado:**
```js
newOrderItem: {
  id: null,
  type: '',          // 'CUSTOM_CUP' | 'FINAL_CUP' | 'COMBO'
  final_cup: null,
  custom_cup: null,
  combo: null,
  order: null,       // FK para pedido
  quantity: null,
  unity_price: null,
  total_price: null
}
```

**Comportamento adicional:**
- `getCupById(cupId, orderItemType)` resolve os detalhes do produto a partir da store apropriada (customCup, finalCup ou combo) baseado no tipo do item.

> **Nota:** Há uma inconsistência na store: o `newOrderItem` inicial usa `unity_price`, mas o reset após `createOrderItem` usa `unit_price`. O nome do campo no backend deve ser verificado.

---

## Copos Customizados

### API: `CustomCupApi` (`src/services/customCupApi.js`)

| Método                          | HTTP     | Endpoint                |
| ------------------------------- | -------- | ----------------------- |
| `fetchCustomCups()`             | `GET`    | `api/custom-cups/`      |
| `createCustomCup(customCup)`    | `POST`   | `api/custom-cups/`      |
| `updateCustomCup(customCup)`    | `PUT`    | `api/custom-cups/{id}/` |
| `deleteCustomCup(id)`           | `DELETE` | `api/custom-cups/{id}/` |

### Store: `useCustomCupStore` (`src/stores/customCup.js`)

**Shape do estado:**
```js
newCustomCup: {
  id: null,
  recipient: null,        // FK para recipiente
  recipient_data: null,   // Objeto recipiente aninhado (somente leitura, da API)
  ingredient: [],         // Array de IDs de ingredientes
  ingredient_data: null,  // Objetos ingrediente aninhados (somente leitura, da API)
  price: null
}
```

Copos customizados são copos de açaí montados pelo usuário onde o cliente escolhe um recipiente (copo) e ingredientes (complementos). O preço é calculado a partir da soma do preço do recipiente e dos preços dos ingredientes selecionados.

---

## Copos Prontos (Produtos Pré-montados)

### API: `FinalCupApi` (`src/services/finalCupApi.js`)

| Método                       | HTTP     | Endpoint               |
| ---------------------------- | -------- | ----------------------- |
| `fetchFinalCups()`           | `GET`    | `api/final-cups/`       |
| `createFinalCup(product)`    | `POST`   | `api/final-cups/`       |
| `updateFinalCup(product)`    | `PUT`    | `api/final-cups/{id}/`  |
| `deleteFinalCup(id)`         | `DELETE` | `api/final-cups/{id}/`  |

### Store: `useFinalCupStore` (`src/stores/finalCup.js`)

**Shape do estado:**
```js
newFinalCup: {
  id: null,
  name: '',
  price: null,
  recipient: null,    // FK para recipiente
  ingredient: []      // Array de IDs de ingredientes
}
```

**Comportamento adicional:**
- `getIngredientsNames(product)` retorna uma string separada por vírgulas com os nomes dos ingredientes a partir do `ingredient_data` aninhado.

---

## Combos

### API: `ComboApi` (`src/services/comboApi.js`)

| Método                  | HTTP     | Endpoint            |
| ----------------------- | -------- | ------------------- |
| `fetchCombos()`         | `GET`    | `api/combos/`       |
| `createCombo(product)`  | `POST`   | `api/combos/`       |
| `updateCombo(product)`  | `PUT`    | `api/combos/{id}/`  |
| `deleteCombo(id)`       | `DELETE` | `api/combos/{id}/`  |

### Store: `useComboStore` (`src/stores/combo.js`)

**Shape do estado:**
```js
newCombo: {
  id: null,
  name: '',
  price: null,
  final_cup: []    // Array de IDs de copos prontos
}
```

**Comportamento adicional:**
- `getFinalCupsNames(combo)` retorna uma string separada por vírgulas com os nomes dos copos prontos a partir do `final_cup_data` aninhado.

---

## Ingredientes

### API: `IngredientApi` (`src/services/ingredientApi.js`)

| Método                              | HTTP     | Endpoint                          |
| ----------------------------------- | -------- | --------------------------------- |
| `fetchIngredients(search = '')`     | `GET`    | `api/ingredients/?search={query}` |
| `createIngredient(ingredient)`      | `POST`   | `api/ingredients/`                |
| `updateIngredient(ingredient)`      | `PUT`    | `api/ingredients/{id}/`           |
| `deleteIngredient(id)`              | `DELETE` | `api/ingredients/{id}/`           |

Suporta busca server-side via parâmetro de query `search`.

### Store: `useIngredientStore` (`src/stores/ingredient.js`)

**Shape do estado:**
```js
newIngredient: {
  id: null,
  name: '',
  portion: '',
  price: null,
  unit_of_measure: '',
  is_addon: false      // Se este ingrediente aparece como complemento selecionável
}
```

A flag `is_addon` determina se um ingrediente aparece nos formulários de criação de copo customizado e copo pronto como opção selecionável.

---

## Estoque

### API: `StockApi` (`src/services/stockApi.js`)

| Método                        | HTTP     | Endpoint              |
| ----------------------------- | -------- | --------------------- |
| `fetchStock()`                | `GET`    | `api/stock/`          |
| `createStockItem(stockItem)`  | `POST`   | `api/stock/`          |
| `updateStockItem(stockItem)`  | `PUT`    | `api/stock/{id}/`     |
| `deleteStockItem(id)`         | `DELETE` | `api/stock/{id}/`     |
| `fetchLowStock()`             | `GET`    | `api/stock/low_stock/`|

### Store: `useStockStore` (`src/stores/stock.js`)

**Shape do estado:**
```js
newItem: {
  id: null,
  ingredient: null,      // FK para ingrediente
  quantity: null,         // Quantidade em gramas
  batch: '',
  expiration_date: new Date().toISOString().split('T')[0],  // Padrão: data de hoje
  supplier: '',          // FK para fornecedor
  batch_price: 0,
  unit_of_measure: ''
}
```

**Comportamento adicional:**
- Mantém um array separado `lowStockItems` buscado do endpoint `/low_stock/`
- Após criar/atualizar, verifica se a quantidade está abaixo de `mediumStockThresholdGrams` (5000g) e atualiza a lista de estoque baixo conforme necessário

---

## Recipientes (Copos/Containers)

### API: `RecipientApi` (`src/services/recipientApi.js`)

| Método                           | HTTP     | Endpoint                |
| -------------------------------- | -------- | ----------------------- |
| `fetchRecipients()`              | `GET`    | `api/recipients/`       |
| `createRecipient(recipient)`     | `POST`   | `api/recipients/`       |
| `updateRecipient(recipient)`     | `PUT`    | `api/recipients/{id}/`  |
| `deleteRecipient(id)`            | `DELETE` | `api/recipients/{id}/`  |

### Store: `useRecipientStore` (`src/stores/recipient.js`)

**Shape do estado:**
```js
newRecipient: {
  id: null,
  title: '',        // ex: "Copo 400ml"
  quantity: '',      // quantity_ml
  price: null,
  stock: '',
  content: null      // FK para ingrediente (o conteúdo base)
}
```

**Comportamento adicional:**
- Em caso de falha na exclusão, usa `useRelationErrorHandler` para verificar se o recipiente é referenciado por algum copo pronto e exibe uma mensagem de erro apropriada.

---

## Fornecedores

### API: `SupplierApi` (`src/services/supplierApi.js`)

| Método                        | HTTP     | Endpoint               |
| ----------------------------- | -------- | ---------------------- |
| `fetchSuppliers()`            | `GET`    | `api/suppliers/`       |
| `createSupplier(supplier)`    | `POST`   | `api/suppliers/`       |
| `updateSupplier(supplier)`    | `PUT`    | `api/suppliers/{id}/`  |
| `deleteSupplier(id)`          | `DELETE` | `api/suppliers/{id}/`  |

### Store: `useSupplierStore` (`src/stores/supplier.js`)

**Shape do estado:**
```js
newSupplier: {
  id: null,
  legal_name: '',
  name: '',
  document: '',        // CPF ou CNPJ
  type: '',            // 'MANUFACTURER' | 'DISTRIBUTOR' | 'RETAILER' | 'IMPORTER' (maiúsculo, conforme enviado pelo RegisterSupplierView)
  contact: null,       // FK para contato
  address: null,       // FK para endereço
  contact_data: null,  // Objeto contato aninhado (somente leitura)
  address_data: null   // Objeto endereço aninhado (somente leitura)
}
```

Fornecedores possuem entidades `Contact` e `Address` relacionadas que são criadas/atualizadas separadamente e vinculadas via chaves estrangeiras.

> **Nota:** `SupplierCard.vue` mapeia valores de tipo usando chaves minúsculas (`manufacturer`, `distributor`, etc.) para labels de exibição, mas `RegisterSupplierView` envia valores maiúsculos (`MANUFACTURER`, `DISTRIBUTOR`, etc.). Se o backend armazena valores maiúsculos, os labels de exibição do card cairão no valor bruto. Verifique o formato armazenado pelo backend.

---

## Contatos

### API: `ContactApi` (`src/services/contactApi.js`)

| Método                     | HTTP     | Endpoint              |
| -------------------------- | -------- | --------------------- |
| `fetchContacts()`          | `GET`    | `api/contacts/`       |
| `createContact(contact)`   | `POST`   | `api/contacts/`       |
| `updateContact(contact)`   | `PUT`    | `api/contacts/{id}/`  |
| `deleteContact(id)`        | `DELETE` | `api/contacts/{id}/`  |

### Store: `useContactStore` (`src/stores/contact.js`)

**Shape do estado:**
```js
newContact: {
  id: null,
  business_email: '',
  financial_email: '',
  phone_number: '',
  whatsapp_number: ''
}
```

Usado exclusivamente no fluxo de cadastro de fornecedores.

---

## Endereços

### API: `AddressApi` (`src/services/addressApi.js`)

| Método                      | HTTP     | Endpoint               |
| --------------------------- | -------- | ---------------------- |
| `fetchAddresses()`          | `GET`    | `api/addresses/`       |
| `createAddress(address)`    | `POST`   | `api/addresses/`       |
| `updateAddress(address)`    | `PUT`    | `api/addresses/{id}/`  |
| `deleteAddress(id)`         | `DELETE` | `api/addresses/{id}/`  |

### Store: `useAddressStore` (`src/stores/address.js`)

**Shape do estado:**
```js
newAddress: {
  id: null,
  street: '',
  number: '',
  city: '',
  state: '',       // Sigla do estado brasileiro (ex: 'SP', 'RJ')
  zip_code: ''
}
```

Usado exclusivamente no fluxo de cadastro de fornecedores.

---

## Funcionários

### API: `EmployeeApi` (`src/services/employeeApi.js`)

| Método                         | HTTP     | Endpoint            |
| ------------------------------ | -------- | ------------------- |
| `fetchEmployees()`             | `GET`    | `api/users/`        |
| `createEmployee(employee)`     | `POST`   | `api/users/`        |
| `updateEmployee(employee)`     | `PUT`    | `api/users/{id}/`   |
| `deleteEmployee(id)`           | `DELETE` | `api/users/{id}/`   |

Nota: Funcionários usam o endpoint `api/users/` (compartilhado com o modelo de usuário de autenticação).

### Store: `useEmployeeStore` (`src/stores/employee.js`)

**Shape do estado:**
```js
newEmployee: {
  id: null,
  name: '',
  email: '',
  registration: null,
  password: '',
  password_confirmation: '',
  establishment: null,       // FK para estabelecimento
  is_management: false,      // Flag de administrador
  establishment_data: null   // Objeto estabelecimento aninhado (somente leitura)
}
```

**Comportamento adicional:**
- `createEmployee()` valida que `password` corresponde a `password_confirmation` antes de enviar a requisição.

---

## Estabelecimentos

### API: `EstablishmentApi` (`src/services/establishmentApi.js`)

| Método                                  | HTTP     | Endpoint                    |
| --------------------------------------- | -------- | --------------------------- |
| `fetchEstablishments()`                 | `GET`    | `api/establishments/`       |
| `createEstablishment(establishment)`    | `POST`   | `api/establishments/`       |
| `updateEstablishment(establishment)`    | `PUT`    | `api/establishments/{id}/`  |
| `deleteEstablishment(id)`               | `DELETE` | `api/establishments/{id}/`  |

### Store: `useEstablishmentStore` (`src/stores/establishment.js`)

**Shape do estado:**
```js
newEstablishment: {
  id: null,
  name: '',
  cnpj: '',
  amount: 0
}
```

Usado no formulário de cadastro de funcionários para vincular funcionários a estabelecimentos.

---

## Faturamento Diário

### API: `DailyRevenueApi` (`src/services/dailyRevenueApi.js`)

| Método                                        | HTTP  | Endpoint                                          |
| --------------------------------------------- | ----- | ------------------------------------------------- |
| `fetchDailyRevenues({ startDate, endDate })`  | `GET` | `api/daily-revenues/?start_date=&end_date=`       |

Esta é uma API somente leitura. Registros de faturamento são gerados no servidor a partir de pedidos pagos.

### Store: `useRevenueStore` (`src/stores/revenue.js`)

**Shape do estado:**
```js
revenues: [],                // Dados brutos de faturamento da API
selectedMonthUi: '2026-04',  // Mês atual (YYYY-MM)
selectedStartDateUi: '',     // Data inicial do filtro
selectedEndDateUi: ''        // Data final do filtro
```

**Propriedades computed:**

| Propriedade                      | Descrição                                                |
| -------------------------------- | -------------------------------------------------------- |
| `normalizedRevenues`             | Faturamentos com datas parseadas e valores numéricos     |
| `todayRevenue`                   | Valor do faturamento de hoje                             |
| `todayOrdersCount`               | Número de pedidos hoje                                   |
| `totalSelectedPeriod`            | Soma do faturamento para o período selecionado           |
| `totalSelectedPeriodOrdersCount` | Total de pedidos no período selecionado                  |
| `hasRevenueData`                 | Se existem dados de faturamento                          |
| `dailyChartData`                 | Dataset Chart.js para gráfico de linha de faturamento diário |
| `monthlyComparisonData`          | Dataset Chart.js para gráfico de barras comparativo mensal   |

---

## Stores de UI

### `useLoading` (`src/stores/loading.js`)

| Propriedade | Tipo           | Descrição                            |
| ----------- | -------------- | ------------------------------------ |
| `isLoading` | `ref<boolean>` | Estado global de loading             |
| `fullPage`  | `ref<boolean>` | Se o overlay cobre a página inteira (sempre `true`) |

### `useModalStore` (`src/stores/modal.js`)

| Propriedade          | Tipo           | Descrição                                      |
| -------------------- | -------------- | ---------------------------------------------- |
| `createModal`        | `ref<boolean>` | Se o modal de criação/edição está aberto       |
| `confirmDeleteModal` | `ref<boolean>` | Se o modal de confirmação de exclusão está aberto |
| `modalMode`          | `ref<string>`  | `'create'` ou `'edit'`                         |
| `editingItem`        | `ref<any>`     | O item sendo editado                           |
| `itemToDelete`       | `ref<any>`     | O ID do item a ser excluído                    |
| `modalContext`       | `ref<string>`  | Contexto da entidade (ex: `'ingredient'`, `'stock'`) |

**Actions:** `openCreateModal(mode, item)`, `closeCreateModal()`, `openConfirmDeleteModal(id, context)`, `closeConfirmDeleteModal()`

A store também observa ambas as flags de modal e alterna `document.body.style.overflow` para prevenir scroll do background quando qualquer modal está aberto.
