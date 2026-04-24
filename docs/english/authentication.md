# Authentication

## Overview

The app uses JWT (JSON Web Token) authentication with access and refresh tokens. Tokens are obtained from the Django backend and stored in `localStorage`. The Axios instance automatically attaches tokens to requests and handles transparent token refresh on 401 responses.

## Authentication Flow

### Login

```
1. User enters email + password on LoginView
2. Auth store calls POST /token/ with credentials
3. Backend returns { access, refresh } tokens
4. Tokens are saved to localStorage
5. Auth store calls GET /api/users/me/ to fetch user profile
6. Router navigates to / (dashboard)
```

### Session Restoration (Page Reload)

```
1. App loads, router beforeEach guard fires
2. Guard checks: accessToken exists in localStorage but user object is null
3. Guard calls fetchCurrentUser() → GET /api/users/me/
4. If successful: user object is populated, navigation proceeds
5. If 401: token refresh is attempted automatically (see below)
6. If refresh fails: logout() is called, redirect to /login
```

### Token Refresh

The Axios response interceptor handles automatic token refresh:

```
1. Any API request returns 401 Unauthorized
2. Interceptor checks: is this the first retry? (_retry flag)
3. If yes: POST /token/refresh/ with the refresh token
4. Backend returns a new access token
5. New token is saved to localStorage and Axios headers
6. Original failed request is retried with the new token
7. If refresh also fails: tokens are cleared, user is redirected to login
```

The `_retry` flag on the request config prevents infinite loops — each request only attempts one refresh.

### Logout

```
1. User confirms logout via ConfirmLogout modal
2. Auth store clears accessToken and refreshToken
3. localStorage entries 'access' and 'refresh' are removed
4. user ref is set to null
5. Router navigates to /login
```

## Auth Store (`src/stores/auth.js`)

### State

| Property       | Type              | Description                                    |
| -------------- | ----------------- | ---------------------------------------------- |
| `accessToken`  | `ref<string>`     | JWT access token (initialized from localStorage)|
| `refreshToken` | `ref<string>`     | JWT refresh token (initialized from localStorage)|
| `user`         | `ref<object|null>`| Current user profile data                      |

### Computed

| Property      | Type               | Description                                     |
| ------------- | ------------------ | ----------------------------------------------- |
| `isLoggedIn`  | `computed<boolean>`| `true` if `accessToken` is non-empty            |
| `firstLetter` | `computed<string>` | First letter of user's name (uppercase), for avatar |

### Actions

| Action              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `login(email, pwd)` | Authenticates, stores tokens, fetches user, navigates to `/` |
| `fetchCurrentUser()` | Calls `GET /api/users/me/` to populate user object      |
| `logout()`          | Clears tokens, user, and redirects to `/login`           |

## Axios Configuration (`src/services/axios.js`)

### Base URL

Read from `VITE_API_URL` environment variable:

```js
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})
```

### Request Interceptor

Attaches the Bearer token from `localStorage` to every outgoing request:

```
Authorization: Bearer <access_token>
```

### Response Interceptor

Handles 401 errors with automatic token refresh:

1. Catches 401 responses
2. Attempts to refresh using `POST /token/refresh/`
3. Updates stored tokens
4. Retries the original request
5. On refresh failure: clears tokens from localStorage

## Route Guard (`src/router/index.js`)

The global `beforeEach` guard enforces authentication:

```js
router.beforeEach(async (to, from, next) => {
  const authStore = useAuth()

  // Restore session if token exists but user isn't loaded
  if (!authStore.user && authStore.accessToken) {
    await authStore.fetchCurrentUser()
  }

  // Redirect to login if not authenticated (except login page itself)
  if (to.name !== 'login' && !authStore.isLoggedIn) {
    return next({ name: 'login' })
  }

  // Redirect /management-menu to /management-menu/ingredients
  if (to.name === 'management-menu') {
    return next({ name: 'ingredients' })
  }

  next()
})
```

## Security Notes

- Tokens are stored in `localStorage`, which is accessible to JavaScript. This is a common SPA pattern but is vulnerable to XSS attacks. Consider `httpOnly` cookies for higher security requirements.
- The refresh token mechanism prevents users from being logged out on short-lived access token expiration.
- Failed refresh attempts clear all stored credentials and force re-authentication.
