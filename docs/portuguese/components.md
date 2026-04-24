# Componentes

## Componentes de Layout

### `App.vue`

Componente raiz. Renderiza condicionalmente `NavBar` (desktop, ≥768px) ou `MobileNavBar` (mobile). Esconde a navegação completamente na página de login. Contém o `<router-view>` principal.

### `NavBar.vue`

Barra de navegação superior para desktop com:
- Logo linkando para `/`
- Links de navegação: Início (`/`), Menu de gerenciamento (`/management-menu`), Pedidos (`/orders/create`)
- Ícone de sacola de compras com badge de contagem de pedidos linkando para `/orders`
- `ProfileDropdown` (quando logado) ou botão de Login
- Busca pedidos no mount para popular o badge de contagem

### `MobileNavBar.vue`

Barra de navegação inferior para mobile. Links apenas com ícones para Home, Gerenciamento e Pedidos. Mostra círculo de avatar do usuário quando logado.

### `ProfileDropdown.vue`

Círculo de avatar do usuário (primeira letra do nome) que alterna um dropdown com botão de logout.

| Emits          | Descrição                              |
| -------------- | -------------------------------------- |
| `open-logout`  | Dispara o modal de confirmação de logout |

### `ConfirmLogout.vue`

Modal teleportado perguntando ao usuário se deseja confirmar o logout.

| Props   | Tipo      | Descrição                    |
| ------- | --------- | ---------------------------- |
| `show`  | `Boolean` | Controla visibilidade do modal |

| Emits   | Descrição              |
| ------- | ---------------------- |
| `close` | Fecha o modal          |

---

## Componentes da Sidebar

### `SideBar.vue` (`src/components/sidebar/`)

Sidebar do menu de gerenciamento com duas seções:
- **Produtos:** Ingredientes, Estoque, Produtos, Recipientes, Combos, Financeiro
- **Equipe:** Fornecedores, Funcionários

Responsivo: no mobile (< 768px), torna-se um overlay de tela cheia alternado por um botão hamburger. No desktop, é um painel lateral persistente.

### `SideBarItem.vue`

Item individual de navegação da sidebar com indicador de estado ativo (barra rosa).

| Props        | Tipo        | Descrição                      |
| ------------ | ----------- | ------------------------------ |
| `name`       | `String`    | Label de exibição              |
| `icon`       | `Component` | Componente de ícone Lucide     |
| `route`      | `String`    | Caminho da rota                |
| `currentTab` | `String`    | Caminho da rota atualmente ativa |

---

## Componentes de Pedido

### `OrderForm.vue`

Input simples de nome do cliente vinculado a `orderStore.newOrder.customer`. Usado em todas as views de criação de pedido quando criando um novo pedido (não ao adicionar itens a um existente).

### `OrderTypeCard.vue`

Card para selecionar um tipo de pedido (copo customizado, copo pronto ou combo).

| Props         | Tipo        | Descrição              |
| ------------- | ----------- | ---------------------- |
| `title`       | `String`    | Título do card         |
| `description` | `String`    | Descrição do card      |
| `icon`        | `Component` | Ícone Lucide           |
| `iconColor`   | `String`    | Cor hex do ícone       |

### `CreatedOrderItem.vue`

Exibe um único item de pedido dentro da lista de pedidos. Resolve detalhes do item (nome, ingredientes, recipiente) a partir da store apropriada baseado no tipo do item. Inclui botão de exclusão com modal de confirmação.

| Props       | Tipo     | Descrição                   |
| ----------- | -------- | --------------------------- |
| `order`     | `Object` | Objeto do pedido pai        |
| `orderItem` | `Object` | O item de pedido a exibir   |

### `PaymentMethod.vue`

Card de seleção de método de pagamento com estado selecionado (borda verde + checkmark).

| Props            | Tipo              | Descrição                      |
| ---------------- | ----------------- | ------------------------------ |
| `method`         | `Object`          | `{ id, name, description, icon }` |
| `selectedMethod` | `String \| null`  | ID do método atualmente selecionado |
| `received`       | `Number \| null`  | Valor recebido (para dinheiro) |

| Emits                     | Descrição                        |
| ------------------------- | -------------------------------- |
| `update:selected-method`  | Emite ID do método selecionado   |
| `update:received`         | Emite valor recebido             |

---

### Componentes de Copo Customizado (`src/components/Orders/custom-cup/`)

#### `CustomCupForm.vue`

Formulário para montar um copo de açaí customizado:
- Dropdown para selecionar um recipiente (copo)
- Grid de checkboxes de ingredientes adicionais com preços

Busca recipientes e ingredientes no mount se ainda não carregados.

#### `CustomCupOrderSummary.vue`

Resumo do pedido mostrando tamanho do recipiente, ingredientes selecionados e preço total calculado (preço do recipiente + soma dos preços dos ingredientes).

---

### Componentes de Copo Pronto (`src/components/Orders/final-cup/`)

#### `FinalCupSelectionCard.vue`

Card para selecionar um copo pronto. Mostra nome, recipiente, ingredientes e preço. Destaca quando selecionado.

| Props         | Tipo             | Descrição                    |
| ------------- | ---------------- | ---------------------------- |
| `cup`         | `Object`         | Dados do copo pronto         |
| `selectedCup` | `Number \| null` | ID do copo atualmente selecionado |

#### `FinalCupOrderSummary.vue`

Resumo do pedido mostrando nome do produto, tamanho do copo, ingredientes e preço do copo pronto selecionado.

| Props         | Tipo             | Descrição                    |
| ------------- | ---------------- | ---------------------------- |
| `selectedCup` | `Number \| null` | ID do copo atualmente selecionado |

---

### Componentes de Combo (`src/components/Orders/combo/`)

#### `ComboSelectionCard.vue`

Card para selecionar um combo. Mostra nome, copos incluídos e preço. Destaca quando selecionado.

| Props           | Tipo             | Descrição                      |
| --------------- | ---------------- | ------------------------------ |
| `combo`         | `Object`         | Dados do combo                 |
| `selectedCombo` | `Number \| null` | ID do combo atualmente selecionado |

#### `ComboOrderSummary.vue`

Resumo do pedido mostrando nome do combo, produtos incluídos e preço.

| Props           | Tipo             | Descrição                      |
| --------------- | ---------------- | ------------------------------ |
| `selectedCombo` | `Number \| null` | ID do combo atualmente selecionado |

---

## Componentes do Dashboard (`src/components/dashboard/`)

### `DashboardCard.vue`

Renderiza um grid de cards de métricas a partir de um array de stats.

| Props   | Tipo    | Descrição                                                      |
| ------- | ------- | -------------------------------------------------------------- |
| `stats` | `Array` | Array de `{ label, value, change, icon, bgColor, iconColor }` |

### `RecentOrders.vue`

Lista todos os pedidos com badge de ID, nome do cliente, pill de status, horário e valor total. Usa a store de pedidos diretamente.

### `StockGraph.vue`

Gráfico de barras horizontal mostrando itens com estoque baixo. Codificado por cores:
- Vermelho (< 3000g): crítico
- Âmbar (≥ 3000g e < 5000g): alerta
- Verde (≥ 5000g): saudável

Busca dados de estoque baixo no mount. Usa Chart.js via `vue-chart-3`.

### `CoposProntos.vue`

Componente placeholder com dados mock hardcoded para exibição de copos prontos e combos. Não está conectado a dados reais atualmente.

---

## Componentes de Finanças (`src/components/finance/`)

### `RevenueFilters.vue`

Controles de filtro para a página de finanças: seletor de mês, data inicial, data final e botão de atualizar.

| Props                 | Tipo      | Descrição                      |
| --------------------- | --------- | ------------------------------ |
| `selectedMonthUi`     | `String`  | Mês selecionado (YYYY-MM)     |
| `selectedStartDateUi` | `String`  | Filtro de data inicial         |
| `selectedEndDateUi`   | `String`  | Filtro de data final           |
| `isRefreshing`        | `Boolean` | Estado de loading do botão     |

| Emits                          | Descrição                      |
| ------------------------------ | ------------------------------ |
| `update:selectedMonthUi`       | Mês alterado                   |
| `update:selectedStartDateUi`   | Data inicial alterada          |
| `update:selectedEndDateUi`     | Data final alterada            |
| `refresh`                      | Botão atualizar clicado        |

### `RevenueMetricCards.vue`

Dois cards de KPI: faturamento de hoje + contagem de pedidos, e total do período selecionado + contagem de pedidos. Formata valores como moeda BRL.

| Props                            | Tipo     | Descrição                      |
| -------------------------------- | -------- | ------------------------------ |
| `todayRevenue`                   | `Number` | Valor do faturamento de hoje   |
| `todayOrdersCount`               | `Number` | Contagem de pedidos de hoje    |
| `totalSelectedPeriod`            | `Number` | Faturamento total do período   |
| `totalSelectedPeriodOrdersCount` | `Number` | Total de pedidos do período    |

### `RevenueDailyChart.vue`

Gráfico de linha mostrando faturamento diário do mês selecionado. Tooltips formatados como moeda BRL com data completa.

| Props             | Tipo     | Descrição                              |
| ----------------- | -------- | -------------------------------------- |
| `chartData`       | `Object` | Dataset Chart.js                       |
| `selectedMonthUi` | `String` | Mês selecionado para formatação do tooltip |

### `RevenueMonthlyComparisonChart.vue`

Gráfico de barras comparando totais de faturamento mensal. Tooltips formatados como moeda BRL.

| Props       | Tipo     | Descrição          |
| ----------- | -------- | ------------------ |
| `chartData` | `Object` | Dataset Chart.js   |

---

## Componentes de Gerenciamento (`src/components/management-menu/`)

### `SectionTitle.vue`

Componente simples de título.

| Props   | Tipo     | Descrição        |
| ------- | -------- | ---------------- |
| `title` | `String` | Título da seção  |

### `SearchBar.vue`

Input de busca com ícone. Emite o valor da busca no input.

| Emits           | Descrição                    |
| --------------- | ---------------------------- |
| `update:search` | Emite texto de busca atual   |

### `NewProductBtn.vue`

Botão para criar novos itens.

| Props   | Tipo     | Padrão        | Descrição        |
| ------- | -------- | ------------- | ---------------- |
| `title` | `String` | `'Registrar'` | Label do botão   |

### `ProductsTable.vue`

Tabela de dados genérica usada em todas as views de gerenciamento. Renderiza layout de cards no mobile (< 768px) e tabela no desktop (≥ 768px). Trata formatação de campos para datas, preços, quantidades e objetos de dados aninhados.

| Props           | Tipo      | Padrão | Descrição                                |
| --------------- | --------- | ------ | ---------------------------------------- |
| `headers`       | `Array`   | —      | Definições de coluna `[{ name, value }]` |
| `products`      | `Array`   | —      | Linhas de dados                          |
| `canDelete`     | `Boolean` | `true` | Se mostra botão de exclusão              |
| `deleteContext` | `String`  | —      | String de contexto do modal para ação de exclusão |

Cada linha tem botões de ação editar (lápis) e excluir (lixeira) que interagem com a store de modal.

### `ConfirmDeleteModal.vue`

Diálogo de confirmação teleportado para ações de exclusão.

| Emits     | Descrição                    |
| --------- | ---------------------------- |
| `confirm` | Usuário confirmou exclusão   |
| `cancel`  | Usuário cancelou             |

### `RegisterStockModal.vue`

Formulário modal para criar/editar itens de estoque. Inclui dropdowns de ingrediente e fornecedor, informações de lote, quantidade, data de validade e preço (via `MoneyInput`).

### `ReisterIngredientModal.vue`

Formulário modal para criar/editar ingredientes. Inclui nome, porção, unidade de medida, preço (via `MoneyInput`) e toggle "é adicional".

### `RegisterRecipientModal.vue`

Formulário modal para criar/editar recipientes. Inclui dropdown de conteúdo (ingrediente), título, quantidade em ml, preço (via `MoneyInput`) e quantidade em estoque.

### `RegisterEmployeeModal.vue`

Formulário modal para criar/editar funcionários. Inclui dropdown de estabelecimento, número de registro, nome, email, campos de senha e toggle de administrador.

### `SupplierCard.vue`

Card exibindo informações do fornecedor: nome, razão social, badge de tipo, documento, endereço, emails de contato e telefones. Editar navega para a página de edição do fornecedor; excluir abre modal de confirmação.

Todos os modais de cadastro compartilham o mesmo padrão de props:

| Props     | Tipo     | Descrição                                |
| --------- | -------- | ---------------------------------------- |
| `title`   | `String` | Título do modal                          |
| `btnName` | `String` | Label do botão de submit                 |
| `mode`    | `String` | `'create'` ou `'edit'`                   |
| `model`   | `Object` | O modelo de dados (novo item ou item em edição) |

---

### Seção de Combos (`src/components/management-menu/combos-section/`)

#### `ComboCard.vue`

Card exibindo um combo com nome, preço, copos prontos incluídos e ações de editar/excluir.

| Props     | Tipo     | Descrição        |
| --------- | -------- | ---------------- |
| `product` | `Object` | Dados do combo   |

#### `RegisterComboModal.vue`

Modal para criar/editar combos. Inclui nome, preço (via `MoneyInput`) e lista de checkboxes rolável de copos prontos.

---

### Seção de Produtos (`src/components/management-menu/products-section/`)

#### `FinalCupCard.vue`

Card exibindo um copo pronto com nome, tamanho do recipiente, preço, ingredientes e ações de editar/excluir.

| Props     | Tipo     | Descrição              |
| --------- | -------- | ---------------------- |
| `product` | `Object` | Dados do copo pronto   |

#### `RegisterFinalCupModal.vue`

Modal para criar/editar copos prontos. Inclui nome, preço (via `MoneyInput`), dropdown de recipiente e lista de checkboxes rolável de ingredientes adicionais.

---

## Componentes Utilitários

### `MoneyInput.vue`

Wrapper de input de moeda sobre `v-money3` configurado para Real Brasileiro (R$).

| Props        | Tipo     | Descrição            |
| ------------ | -------- | -------------------- |
| `modelValue` | `Number` | O valor numérico     |

| Emits               | Descrição                    |
| ------------------- | ---------------------------- |
| `update:modelValue` | Emite número não formatado   |

Configuração: prefixo `R$`, separador de milhares `.`, separador decimal `,`, 2 casas decimais, sem negativos.

### `SubmitButton.vue`

Botão de submit reutilizável com estilo rose-900.

| Props     | Tipo     | Padrão        | Descrição        |
| --------- | -------- | ------------- | ---------------- |
| `btnName` | `String` | `'Cadastrar'` | Label do botão   |
