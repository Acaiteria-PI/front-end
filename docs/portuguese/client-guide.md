# Pé de Açaí — Guia do Usuário

Bem-vindo ao Pé de Açaí! Este guia vai te mostrar todas as funcionalidades do sistema para que você consiga gerenciar sua açaiteria com confiança. Nenhum conhecimento técnico é necessário.

---

## Índice

1. [Fazendo Login](#fazendo-login)
2. [O Dashboard](#o-dashboard)
3. [Criando Pedidos](#criando-pedidos)
4. [Gerenciando Pedidos](#gerenciando-pedidos)
5. [Finalizando um Pedido (Pagamento)](#finalizando-um-pedido-pagamento)
6. [Menu de Gerenciamento](#menu-de-gerenciamento)
   - [Ingredientes](#ingredientes)
   - [Estoque](#estoque)
   - [Produtos (Copos Prontos)](#produtos-copos-prontos)
   - [Recipientes (Copos/Containers)](#recipientes-coposcontainers)
   - [Combos](#combos)
   - [Funcionários](#funcionários)
   - [Fornecedores](#fornecedores)
   - [Financeiro](#financeiro)
7. [Fazendo Logout](#fazendo-logout)
8. [Usando no Celular](#usando-no-celular)

---

## Fazendo Login

Quando você abrir o aplicativo, verá uma tela de login.

1. Digite o **email** e a **senha** fornecidos pelo seu administrador.
2. Clique em **"Logar"**.
3. Se as credenciais estiverem corretas, você será levado ao Dashboard.

Se aparecer uma mensagem de erro em vermelho, verifique seu email e senha. Se o problema persistir, entre em contato com seu administrador.

---

## O Dashboard

O Dashboard é a tela inicial. Ele te dá uma visão rápida do estado atual da sua loja:

- **Pedidos hoje:** Quantos pedidos foram feitos hoje e quantos itens no total.
- **Baixo estoque:** Quantos ingredientes estão com estoque baixo e precisam de reposição.
- **Faturamento de hoje:** O valor total ganho com os pedidos de hoje.

Abaixo dos cards você encontra:

- **Pedidos Recentes:** Uma lista dos últimos pedidos com nome do cliente, status, horário e valor total.
- **Estoque Baixo (gráfico):** Um gráfico de barras visual mostrando quais ingredientes estão com estoque baixo. Barras vermelhas significam crítico, amarelas significam que está acabando.

---

## Criando Pedidos

Esta é a parte principal do sistema — registrar os pedidos dos clientes.

### Passo 1: Iniciar um novo pedido

Na barra de navegação superior, clique em **"Pedidos"**. Depois clique em **"Criar pedido"** ou navegue até a página de criação de pedidos.

### Passo 2: Escolher o tipo de pedido

Você verá três opções:

- **Copo customizado:** O cliente monta seu próprio copo de açaí escolhendo um recipiente e complementos.
- **Copo pronto:** O cliente escolhe entre combinações de açaí já montadas que você configurou previamente.
- **Combo:** O cliente escolhe um pacote promocional que inclui múltiplos copos.

### Passo 3a: Copo Customizado

1. Digite o **nome do cliente** no campo "Cliente".
2. Selecione um **recipiente** (tamanho do copo) no dropdown.
3. Marque os **ingredientes** (complementos) que o cliente deseja. Cada um mostra seu preço.
4. Confira o **resumo do pedido** na parte inferior — ele mostra o tamanho do copo, ingredientes selecionados e o preço total calculado.
5. Clique em **"Confirmar item"**.

### Passo 3b: Copo Pronto

1. Digite o **nome do cliente**.
2. Navegue pelos copos prontos disponíveis — cada card mostra o nome do copo, tamanho, ingredientes e preço.
3. Clique em um copo para selecioná-lo (ele ficará com uma borda destacada).
4. Confira o resumo mostrando o nome do produto, tamanho do copo, ingredientes e preço.
5. Clique em **"Confirmar pedido"**.

### Passo 3c: Combo

1. Digite o **nome do cliente**.
2. Navegue pelos combos disponíveis — cada card mostra o nome do combo, copos incluídos e preço.
3. Clique em um combo para selecioná-lo.
4. Confira o resumo.
5. Clique em **"Confirmar pedido"**.

Após confirmar, você será redirecionado para a lista de pedidos.

### Adicionando mais itens a um pedido existente

Se um cliente quiser adicionar outro item ao pedido:

1. Vá para a **lista de pedidos**.
2. Encontre o pedido e clique em **"Adicionar item"**.
3. Escolha o tipo (copo customizado, copo pronto ou combo) e siga os mesmos passos acima.

---

## Gerenciando Pedidos

A **página de pedidos** mostra todos os pedidos atuais. Cada card de pedido exibe:

- **Status:** PENDING (pendente), IN_PROGRESS (em preparo), COMPLETED (concluído) ou CANCELED (cancelado).
- **Número do pedido** (#1, #2, etc.)
- **Status do pagamento:** "Pago" ou "Não pago".
- **Nome do cliente**, **data e hora** e **pessoa responsável**.
- **Valor total** no canto superior direito.
- **Itens do pedido** listados abaixo com tipo, detalhes e preços individuais.

### O que você pode fazer com cada pedido:

- **Pedidos pendentes** mostram dois botões:
  - **"Adicionar item"** — Adicionar outro item a este pedido.
  - **"Finalizar pedido"** — Ir para o pagamento.

- **Pedidos não pendentes** (já processados) mostram:
  - **"Cancelar pedido"** — Cancelar o pedido. Será pedida confirmação antes de cancelar.

- **Excluir um item:** Clique no ícone de lixeira ao lado de qualquer item do pedido para removê-lo. Será pedida confirmação.

---

## Finalizando um Pedido (Pagamento)

Quando você clicar em **"Finalizar pedido"** em um pedido pendente:

1. Você verá o **resumo do pedido** com o nome do cliente e valor total.
2. Escolha um **método de pagamento** clicando em uma das três opções:
   - **Dinheiro**
   - **Cartão** — crédito ou débito
   - **Pix** — transferência instantânea
3. Clique em **"Registrar pagamento"**.

Após registrar, você verá uma **tela de sucesso** com um checkmark verde mostrando:
- Número do pedido, nome do cliente, método de pagamento
- Data do pedido e total pago
- Todos os itens do pedido

A partir daqui você pode:
- **"Ver pedidos"** — Voltar para a lista de pedidos.
- **"Novo pedido"** — Iniciar um novo pedido imediatamente.

---

## Menu de Gerenciamento

O Menu de Gerenciamento é onde você configura e mantém tudo que sua loja precisa. Acesse clicando em **"Menu de gerenciamento"** na barra de navegação superior.

No lado esquerdo você verá uma sidebar com todas as seções. Clique em qualquer seção para navegar até ela.

---

### Ingredientes

Aqui você gerencia todos os ingredientes usados nos seus copos de açaí.

**O que você vê:** Uma tabela listando todos os ingredientes com nome, porção, preço e unidade de medida.

**O que você pode fazer:**

- **Adicionar um novo ingrediente:** Clique em **"+ Novo ingrediente"** e preencha:
  - Nome (ex: "Banana")
  - Tamanho da porção
  - Unidade de medida (ex: "g" para gramas)
  - Preço
  - Se é um **ingrediente adicional** (ative se os clientes podem selecioná-lo como complemento)
  - Clique em **"Cadastrar"**

- **Editar um ingrediente:** Clique no ícone de lápis em qualquer linha, modifique os campos e clique em **"Salvar"**.

- **Excluir um ingrediente:** Clique no ícone de lixeira. Será pedida confirmação. Nota: se o ingrediente é usado em um copo pronto, você não conseguirá excluí-lo.

- **Buscar:** Use a barra de busca no topo para encontrar ingredientes pelo nome.

---

### Estoque

Aqui você acompanha o inventário dos seus ingredientes.

**O que você vê:** Uma tabela mostrando cada entrada de estoque com nome do ingrediente, quantidade (em gramas), número do lote, fornecedor, preço do lote e data de validade.

**O que você pode fazer:**

- **Registrar novo estoque:** Clique em **"Registrar estoque"** e preencha:
  - Selecione o ingrediente no dropdown
  - Selecione o fornecedor
  - Número do lote (ex: "Lote A1")
  - Data de validade
  - Quantidade em gramas
  - Preço do lote
  - Clique em **"Cadastrar"**

- **Editar uma entrada de estoque:** Clique no ícone de lápis, modifique os campos e salve.

- **Excluir uma entrada de estoque:** Clique no ícone de lixeira e confirme.

Quando o estoque estiver baixo, ele aparecerá no gráfico do Dashboard como alerta.

---

### Produtos (Copos Prontos)

Copos prontos são combinações de açaí pré-configuradas que os clientes podem pedir diretamente.

**O que você vê:** Cards mostrando cada produto com nome, tamanho do copo, preço e ingredientes.

**O que você pode fazer:**

- **Criar um novo produto:** Clique em **"+ Novo produto"** e preencha:
  - Nome (ex: "Açaí com banana")
  - Preço
  - Selecione um recipiente (tamanho do copo) no dropdown
  - Marque os ingredientes a incluir
  - Clique em **"Cadastrar"**

- **Editar:** Clique no ícone de lápis em qualquer card.
- **Excluir:** Clique no ícone de lixeira e confirme.

---

### Recipientes (Copos/Containers)

Recipientes são os copos ou containers físicos usados para servir o açaí.

**O que você vê:** Uma tabela com título, capacidade em ml, preço, quantidade em estoque e conteúdo.

**O que você pode fazer:**

- **Adicionar um novo recipiente:** Clique em **"+ Novo recipiente"** e preencha:
  - Conteúdo (o ingrediente base, ex: açaí)
  - Título (ex: "Copo 400ml")
  - Capacidade em ml
  - Preço
  - Quantidade em estoque
  - Clique em **"Cadastrar"**

- **Editar / Excluir:** Mesmo padrão das outras seções — lápis para editar, lixeira para excluir.

Nota: Você não pode excluir um recipiente que está sendo usado por um produto de copo pronto.

---

### Combos

Combos são pacotes promocionais que incluem múltiplos copos prontos por um preço especial.

**O que você vê:** Cards mostrando cada combo com nome, preço e copos incluídos.

**O que você pode fazer:**

- **Criar um novo combo:** Clique em **"+ Novo combo"** e preencha:
  - Nome (ex: "Combo família")
  - Preço
  - Marque quais copos prontos incluir no combo
  - Clique em **"Cadastrar"**

- **Editar / Excluir:** Lápis para editar, lixeira para excluir.

---

### Funcionários

Gerencie a equipe que usa o sistema.

**O que você vê:** Uma tabela com nome, email, número de registro, estabelecimento e se é administrador.

**O que você pode fazer:**

- **Adicionar um novo funcionário:** Clique em **"+ Novo funcionário"** e preencha:
  - Selecione o estabelecimento
  - Número de registro
  - Nome e email
  - Senha e confirmação de senha (devem ser iguais)
  - Ative **"Administrador"** se ele deve ter acesso total ao sistema
  - Clique em **"Cadastrar"**

- **Editar / Excluir:** Mesmo padrão das outras seções.

---

### Fornecedores

Gerencie as empresas que fornecem seus ingredientes.

**O que você vê:** Cards mostrando cada fornecedor com nome, razão social, tipo, documento (CPF/CNPJ), endereço e informações de contato.

**O que você pode fazer:**

- **Adicionar um novo fornecedor:** Clique em **"+ Novo fornecedor"**. Você será levado a um formulário de página inteira com três seções:
  - **Informações:** Razão social, nome fantasia, número do documento e tipo (Fabricante, Distribuidor, Varejista ou Importador)
  - **Endereço:** Rua, número, cidade, estado (estados brasileiros) e CEP
  - **Contato:** Email comercial, email financeiro, telefone e WhatsApp (todos opcionais)
  - Clique em **"Cadastrar"**

- **Editar um fornecedor:** Clique no ícone de lápis no card do fornecedor. Você será levado ao mesmo formulário preenchido com os dados atuais.

- **Excluir um fornecedor:** Clique no ícone de lixeira e confirme.

---

### Financeiro

A seção Financeiro te dá uma visão detalhada do faturamento da sua loja.

**O que você vê:**

- **Filtros** no topo: Selecione um mês, ou defina um intervalo de datas personalizado, depois clique em **"Atualizar"** para carregar os dados.
- **Cards de métricas:**
  - **Faturamento de Hoje:** Quanto você ganhou hoje e quantos pedidos.
  - **Total do Período Selecionado:** Faturamento total e contagem de pedidos para o intervalo de datas que você selecionou.
- **Gráficos:**
  - **Faturamento Diário:** Um gráfico de linha mostrando o faturamento de cada dia do mês selecionado.
  - **Comparativo Mensal:** Um gráfico de barras comparando o faturamento entre diferentes meses.

Todos os valores são exibidos em Reais (R$).

---

## Fazendo Logout

1. Clique no seu **avatar** (o círculo colorido com sua inicial) no canto superior direito.
2. Clique em **"Sair"** no dropdown.
3. Um diálogo de confirmação aparecerá perguntando "Sair da conta?".
4. Clique em **"Sair"** para confirmar, ou **"Cancelar"** para continuar logado.

---

## Usando no Celular

O aplicativo funciona em celulares e tablets também! Veja o que muda:

- A **barra de navegação superior** é substituída por uma **barra de navegação inferior** com ícones para Início, Gerenciamento e Pedidos.
- No **Menu de Gerenciamento**, a sidebar se torna um **menu de tela cheia** que você pode abrir tocando no ícone de hambúrguer (três linhas) no canto superior direito.
- **Tabelas** são exibidas como **cards** empilhados verticalmente, facilitando a leitura em telas pequenas.
- Todas as funcionalidades funcionam da mesma forma — apenas o layout se adapta ao tamanho da sua tela.

O aplicativo também pode ser **instalado no seu celular** como um app normal:
- No Android: Seu navegador pode sugerir "Adicionar à tela inicial". Aceite.
- No iOS: No Safari, toque no botão de compartilhar e selecione "Adicionar à Tela de Início".

Uma vez instalado, você pode abri-lo direto da tela inicial sem precisar abrir o navegador.
