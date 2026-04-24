# Autenticação

## Visão Geral

A aplicação usa autenticação JWT (JSON Web Token) com tokens de acesso e refresh. Os tokens são obtidos do backend Django e armazenados no `localStorage`. A instância do Axios automaticamente anexa tokens às requisições e trata o refresh transparente de token em respostas 401.

## Fluxo de Autenticação

### Login

```
1. Usuário insere email + senha na LoginView
2. Auth store chama POST /token/ com as credenciais
3. Backend retorna tokens { access, refresh }
4. Tokens são salvos no localStorage
5. Auth store chama GET /api/users/me/ para buscar o perfil do usuário
6. Router navega para / (dashboard)
```

### Restauração de Sessão (Reload da Página)

```
1. App carrega, guard beforeEach do router dispara
2. Guard verifica: accessToken existe no localStorage mas objeto user é null
3. Guard chama fetchCurrentUser() → GET /api/users/me/
4. Se bem-sucedido: objeto user é populado, navegação prossegue
5. Se 401: refresh de token é tentado automaticamente (ver abaixo)
6. Se refresh falha: logout() é chamado, redireciona para /login
```

### Refresh de Token

O interceptor de resposta do Axios trata o refresh automático de token:

```
1. Qualquer requisição de API retorna 401 Unauthorized
2. Interceptor verifica: é a primeira tentativa? (flag _retry)
3. Se sim: POST /token/refresh/ com o refresh token
4. Backend retorna um novo access token
5. Novo token é salvo no localStorage e nos headers do Axios
6. Requisição original que falhou é refeita com o novo token
7. Se o refresh também falha: tokens são limpos, usuário é redirecionado para login
```

A flag `_retry` na config da requisição previne loops infinitos — cada requisição tenta apenas um refresh.

### Logout

```
1. Usuário confirma logout via modal ConfirmLogout
2. Auth store limpa accessToken e refreshToken
3. Entradas 'access' e 'refresh' do localStorage são removidas
4. ref user é definida como null
5. Router navega para /login
```

## Auth Store (`src/stores/auth.js`)

### Estado

| Propriedade    | Tipo              | Descrição                                      |
| -------------- | ----------------- | ---------------------------------------------- |
| `accessToken`  | `ref<string>`     | Token de acesso JWT (inicializado do localStorage) |
| `refreshToken` | `ref<string>`     | Token de refresh JWT (inicializado do localStorage) |
| `user`         | `ref<object|null>`| Dados do perfil do usuário atual               |

### Computed

| Propriedade   | Tipo               | Descrição                                       |
| ------------- | ------------------ | ----------------------------------------------- |
| `isLoggedIn`  | `computed<boolean>`| `true` se `accessToken` não está vazio          |
| `firstLetter` | `computed<string>` | Primeira letra do nome do usuário (maiúscula), para avatar |

### Actions

| Action              | Descrição                                                |
| ------------------- | -------------------------------------------------------- |
| `login(email, pwd)` | Autentica, armazena tokens, busca usuário, navega para `/` |
| `fetchCurrentUser()` | Chama `GET /api/users/me/` para popular o objeto user   |
| `logout()`          | Limpa tokens, user, e redireciona para `/login`          |

## Configuração do Axios (`src/services/axios.js`)

### URL Base

Lida a partir da variável de ambiente `VITE_API_URL`:

```js
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
```

### Interceptor de Requisição

Anexa o Bearer token do `localStorage` a toda requisição de saída:

```
Authorization: Bearer <access_token>
```

### Interceptor de Resposta

Trata erros 401 com refresh automático de token:

1. Captura respostas 401
2. Tenta refresh usando `POST /token/refresh/`
3. Atualiza tokens armazenados
4. Refaz a requisição original
5. Em caso de falha no refresh: limpa tokens do localStorage

## Guard de Rota (`src/router/index.js`)

O guard global `beforeEach` impõe autenticação:

```js
router.beforeEach(async (to, from, next) => {
  const authStore = useAuth()

  // Restaura sessão se token existe mas usuário não está carregado
  if (!authStore.user && authStore.accessToken) {
    await authStore.fetchCurrentUser()
  }

  // Redireciona para login se não autenticado (exceto a própria página de login)
  if (to.name !== 'login' && !authStore.isLoggedIn) {
    return next({ name: 'login' })
  }

  // Redireciona /management-menu para /management-menu/ingredients
  if (to.name === 'management-menu') {
    return next({ name: 'ingredients' })
  }

  next()
})
```

## Notas de Segurança

- Tokens são armazenados no `localStorage`, que é acessível via JavaScript. Este é um padrão comum em SPAs mas é vulnerável a ataques XSS. Considere cookies `httpOnly` para requisitos de segurança mais elevados.
- O mecanismo de refresh token previne que usuários sejam deslogados na expiração de tokens de acesso de curta duração.
- Tentativas de refresh que falham limpam todas as credenciais armazenadas e forçam re-autenticação.
