# Pé de Açaí — User Guide

Welcome to Pé de Açaí! This guide will walk you through every feature of the system so you can manage your açaí shop with confidence. No technical knowledge required.

---

## Table of Contents

1. [Logging In](#logging-in)
2. [The Dashboard](#the-dashboard)
3. [Creating Orders](#creating-orders)
4. [Managing Orders](#managing-orders)
5. [Finishing an Order (Payment)](#finishing-an-order-payment)
6. [Management Menu](#management-menu)
   - [Ingredients](#ingredients)
   - [Stock](#stock)
   - [Products (Ready Cups)](#products-ready-cups)
   - [Recipients (Cups/Containers)](#recipients-cupscontainers)
   - [Combos](#combos)
   - [Employees](#employees)
   - [Suppliers](#suppliers)
   - [Finance](#finance)
7. [Logging Out](#logging-out)
8. [Using on Mobile](#using-on-mobile)

---

## Logging In

When you open the app, you'll see a login screen.

1. Enter the **email** and **password** provided by your administrator.
2. Click **"Logar"** (Log in).
3. If the credentials are correct, you'll be taken to the Dashboard.

If you see a red error message, double-check your email and password. If the problem persists, contact your administrator.

---

## The Dashboard

The Dashboard is the home screen. It gives you a quick overview of your shop's current status:

- **Pedidos hoje (Orders today):** How many orders have been placed today, and how many items total.
- **Baixo estoque (Low stock):** How many ingredients are running low and need restocking.
- **Faturamento de hoje (Today's revenue):** The total amount earned from today's orders.

Below the cards you'll find:

- **Pedidos Recentes (Recent Orders):** A list of the latest orders with customer name, status, time, and total value.
- **Estoque Baixo (Low Stock chart):** A visual bar chart showing which ingredients are running low. Red bars mean critical, yellow means getting low.

---

## Creating Orders

This is the core of the system — taking customer orders.

### Step 1: Start a new order

From the top navigation bar, click **"Pedidos"** (Orders). Then click **"Criar pedido"** (Create order) or navigate to the order creation page.

### Step 2: Choose the order type

You'll see three options:

- **Copo customizado (Custom cup):** The customer builds their own açaí cup by choosing a container and toppings.
- **Copo pronto (Ready cup):** The customer picks from pre-made açaí combinations that you've already set up.
- **Combo:** The customer picks a bundle deal that includes multiple cups.

### Step 3a: Custom Cup

1. Enter the **customer's name** in the "Cliente" field.
2. Select a **recipient** (cup size) from the dropdown.
3. Check the **ingredients** (toppings) the customer wants. Each one shows its price.
4. Review the **order summary** at the bottom — it shows the cup size, selected ingredients, and the calculated total price.
5. Click **"Confirmar item"** (Confirm item).

### Step 3b: Ready Cup

1. Enter the **customer's name**.
2. Browse the available ready cups — each card shows the cup name, size, ingredients, and price.
3. Click on a cup to select it (it will get a highlighted border).
4. Review the summary showing the product name, cup size, ingredients, and price.
5. Click **"Confirmar pedido"** (Confirm order).

### Step 3c: Combo

1. Enter the **customer's name**.
2. Browse the available combos — each card shows the combo name, included cups, and price.
3. Click on a combo to select it.
4. Review the summary.
5. Click **"Confirmar pedido"** (Confirm order).

After confirming, you'll be redirected to the orders list.

### Adding more items to an existing order

If a customer wants to add another item to their order:

1. Go to the **orders list**.
2. Find the order and click **"Adicionar item"** (Add item).
3. Choose the type (custom cup, ready cup, or combo) and follow the same steps above.

---

## Managing Orders

The **orders page** shows all current orders. Each order card displays:

- **Status:** PENDING (waiting), IN_PROGRESS (being prepared), COMPLETED (done), or CANCELED.
- **Order number** (#1, #2, etc.)
- **Payment status:** "Pago" (Paid) or "Não pago" (Not paid).
- **Customer name**, **date and time**, and **responsible person**.
- **Total value** in the top right.
- **Order items** listed below with their type, details, and individual prices.

### What you can do with each order:

- **Pending orders** show two buttons:
  - **"Adicionar item"** — Add another item to this order.
  - **"Finalizar pedido"** — Proceed to payment.

- **Non-pending orders** (already processed) show:
  - **"Cancelar pedido"** — Cancel the order. You'll be asked to confirm before it's canceled.

- **Deleting an item:** Click the trash icon next to any order item to remove it. You'll be asked to confirm.

---

## Finishing an Order (Payment)

When you click **"Finalizar pedido"** on a pending order:

1. You'll see the **order summary** with the customer name and total value.
2. Choose a **payment method** by clicking one of the three options:
   - **Dinheiro (Cash)**
   - **Cartão (Card)** — credit or debit
   - **Pix** — instant transfer
3. Click **"Registrar pagamento"** (Register payment).

After registering, you'll see a **success screen** with a green checkmark showing:
- Order number, customer name, payment method
- Order date and total paid
- All items in the order

From here you can:
- **"Ver pedidos"** — Go back to the orders list.
- **"Novo pedido"** — Start a new order right away.

---

## Management Menu

The Management Menu is where you set up and maintain everything your shop needs. Access it by clicking **"Menu de gerenciamento"** in the top navigation bar.

On the left side you'll see a sidebar with all the sections. Click any section to navigate to it.

---

### Ingredients

This is where you manage all the ingredients used in your açaí cups.

**What you see:** A table listing all ingredients with their name, portion size, price, and unit of measure.

**What you can do:**

- **Add a new ingredient:** Click **"+ Novo ingrediente"** and fill in:
  - Name (e.g., "Banana")
  - Portion size
  - Unit of measure (e.g., "g" for grams)
  - Price
  - Whether it's an **additional ingredient** (toggle on if customers can select it as a topping)
  - Click **"Cadastrar"** (Register)

- **Edit an ingredient:** Click the pencil icon on any row, modify the fields, and click **"Salvar"** (Save).

- **Delete an ingredient:** Click the trash icon. You'll be asked to confirm. Note: if the ingredient is used in a ready cup, you won't be able to delete it.

- **Search:** Use the search bar at the top to find ingredients by name.

---

### Stock

This is where you track your ingredient inventory.

**What you see:** A table showing each stock entry with the ingredient name, quantity (in grams), batch number, supplier, batch price, and expiration date.

**What you can do:**

- **Register new stock:** Click **"Registrar estoque"** and fill in:
  - Select the ingredient from the dropdown
  - Select the supplier
  - Batch number (e.g., "Lote A1")
  - Expiration date
  - Quantity in grams
  - Batch price
  - Click **"Cadastrar"**

- **Edit a stock entry:** Click the pencil icon, modify the fields, and save.

- **Delete a stock entry:** Click the trash icon and confirm.

When stock is low, it will appear on the Dashboard chart as a warning.

---

### Products (Ready Cups)

Ready cups are pre-configured açaí combinations that customers can order directly.

**What you see:** Cards showing each product with its name, cup size, price, and ingredients.

**What you can do:**

- **Create a new product:** Click **"+ Novo produto"** and fill in:
  - Name (e.g., "Açaí com banana")
  - Price
  - Select a recipient (cup size) from the dropdown
  - Check the ingredients to include
  - Click **"Cadastrar"**

- **Edit:** Click the pencil icon on any card.
- **Delete:** Click the trash icon and confirm.

---

### Recipients (Cups/Containers)

Recipients are the physical cups or containers used to serve açaí.

**What you see:** A table with title, capacity in ml, price, stock quantity, and content.

**What you can do:**

- **Add a new recipient:** Click **"+ Novo recipiente"** and fill in:
  - Content (the base ingredient, e.g., açaí)
  - Title (e.g., "Copo 400ml")
  - Capacity in ml
  - Price
  - Stock quantity
  - Click **"Cadastrar"**

- **Edit / Delete:** Same as other sections — pencil to edit, trash to delete.

Note: You cannot delete a recipient that is being used by a ready cup product.

---

### Combos

Combos are bundle deals that include multiple ready cups at a special price.

**What you see:** Cards showing each combo with its name, price, and included cups.

**What you can do:**

- **Create a new combo:** Click **"+ Novo combo"** and fill in:
  - Name (e.g., "Combo família")
  - Price
  - Check which ready cups to include in the combo
  - Click **"Cadastrar"**

- **Edit / Delete:** Pencil to edit, trash to delete.

---

### Employees

Manage the staff who use the system.

**What you see:** A table with name, email, registration number, establishment, and whether they're an administrator.

**What you can do:**

- **Add a new employee:** Click **"+ Novo funcionário"** and fill in:
  - Select the establishment
  - Registration number
  - Name and email
  - Password and password confirmation (must match)
  - Toggle **"Administrador"** on if they should have full system access
  - Click **"Cadastrar"**

- **Edit / Delete:** Same pattern as other sections.

---

### Suppliers

Manage the companies that supply your ingredients.

**What you see:** Cards showing each supplier with their name, legal name, type, document (CPF/CNPJ), address, and contact information.

**What you can do:**

- **Add a new supplier:** Click **"+ Novo fornecedor"**. You'll be taken to a full-page form with three sections:
  - **Information:** Legal name, trade name, document number, and type (Manufacturer, Distributor, Retailer, or Importer)
  - **Address:** Street, number, city, state (Brazilian states), and ZIP code
  - **Contact:** Business email, financial email, phone number, and WhatsApp number (all optional)
  - Click **"Cadastrar"**

- **Edit a supplier:** Click the pencil icon on the supplier card. You'll be taken to the same form pre-filled with the current data.

- **Delete a supplier:** Click the trash icon and confirm.

---

### Finance

The Finance section gives you a detailed view of your shop's revenue.

**What you see:**

- **Filters** at the top: Select a month, or set a custom date range, then click **"Atualizar"** (Update) to load the data.
- **Metric cards:**
  - **Faturamento de Hoje (Today's Revenue):** How much you've earned today and how many orders.
  - **Total do Período Selecionado (Selected Period Total):** Total revenue and order count for the date range you selected.
- **Charts:**
  - **Faturamento Diário (Daily Revenue):** A line chart showing revenue for each day of the selected month.
  - **Comparativo Mensal (Monthly Comparison):** A bar chart comparing revenue across different months.

All values are displayed in Brazilian Reais (R$).

---

## Logging Out

1. Click your **avatar** (the colored circle with your initial) in the top right corner.
2. Click **"Sair"** (Log out) in the dropdown.
3. A confirmation dialog will appear asking "Sair da conta?" (Log out of account?).
4. Click **"Sair"** to confirm, or **"Cancelar"** to stay logged in.

---

## Using on Mobile

The app works on phones and tablets too! Here's what changes:

- The **top navigation bar** is replaced by a **bottom navigation bar** with icons for Home, Management, and Orders.
- In the **Management Menu**, the sidebar becomes a **full-screen menu** that you can open by tapping the hamburger icon (three lines) in the top right corner.
- **Tables** are displayed as **cards** stacked vertically, making them easier to read on small screens.
- All features work the same way — just the layout adapts to your screen size.

The app can also be **installed on your phone** like a regular app:
- On Android: Your browser may prompt you to "Add to Home Screen". Accept it.
- On iOS: In Safari, tap the share button and select "Add to Home Screen".

Once installed, you can open it from your home screen without needing to open the browser.
