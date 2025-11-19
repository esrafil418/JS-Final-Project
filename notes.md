## Project Structure

src/
├── components/ # Reusable components
│ ├── auth/ # Login/Signup forms
│ ├── home/ # Home page sections
│ └── layout/ # Menus and navigation
├── pages/ # Full pages
│ ├── auth/ # Authentication page
│ ├── home/ # Home page
│ └── onboarding/ # Welcome page
├── api/ # Server communication
│ ├── authorization.js # Signup/Login
│ └── products.js # Products and brands
├── utils/ # Helper utilities
│ ├── el.js # HTML element creator
│ ├── router.js # Route management
│ ├── auth.js # Token management
│ └── store.js # Data storage
└── constants/ # Constant values
└── index.js # BASE_URL and ...

## User Flow

### Onboarding → App Introduction

- User sees introduction slides
- Automatically redirects to signup after 3 slides
- Spinner SVG Vector:
  https://www.svgrepo.com/svg/435755/spinner

### Signup/Login → Get Token

```javascript
// Successful signup
POST /auth/signup
Response: { token: "xxx", user: { ... } }

// Successful login
POST /auth/login
Response: { token: "xxx", user: { ... } }

## Authentication Flow

### Registration:

1. User fills username/password in Signup form
2. `AuthForm` → `authRequest("/auth/signup")`
3. On success: token saved → redirect to login

### Login:

1. User fills credentials in Login form
2. `AuthForm` → `authRequest("/auth/login")`
3. On success: token saved → redirect to home

### Route Protection:

- Check `localStorage.getItem("onboarded")`
- Check `authHelper.getToken()`
- Redirect accordingly

## API Integration

### Base Configuration

export const BASE_URL = 'http://localhost:3000';

## Auth Endpoints

- POST /auth/signup - User registration

- POST /auth/login - User login

### Product Endpoints

- GET /sneaker?page=1&limit=10 - Get products (requires auth)
```
