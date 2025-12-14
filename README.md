# Sweet Shop Management System

A full-stack TypeScript application for managing a sweet shop's catalog, stock, and role-based access. The backend uses Express, Prisma, and PostgreSQL; the frontend is built with React, Vite, React Query, and Tailwind.

## Features
- JWT authentication with register/login flows and role-based guards for admin-only actions (see [backend/src/routes/auth.routes.ts](backend/src/routes/auth.routes.ts), [backend/src/middlewares](backend/src/middlewares/auth.middleware.ts)).
- Sweet catalog management: create, list, search, update, delete sweets; purchase/restock updates inventory (see [backend/src/routes/sweets.routes.ts](backend/src/routes/sweets.routes.ts) and [backend/src/routes/inventory.routes.ts](backend/src/routes/inventory.routes.ts)).
- React dashboard with protected routing, filters, admin modals, and optimistic list updates (see [frontend/src/pages/Dashboard.tsx](frontend/src/pages/Dashboard.tsx) and [frontend/src/hooks/useSweets.ts](frontend/src/hooks/useSweets.ts)).
- Typed validation via Zod on auth inputs; Prisma schema for users and sweets (see [backend/src/utils/validators.ts](backend/src/utils/validators.ts) and [backend/prisma/schema.prisma](backend/prisma/schema.prisma)).
- Backend tests with Jest and Supertest for auth, sweets, inventory, and health endpoints (see [backend/src/tests](backend/src/tests)).

## Architecture
- **Backend:** Express API, Prisma PostgreSQL adapter, JWT auth, Zod validation. Entry points in [backend/src/app.ts](backend/src/app.ts) and [backend/src/server.ts](backend/src/server.ts).
- **Frontend:** React + Vite app using React Router, React Query-style data hooks, Tailwind (via Vite plugin). Auth context stores token/user in localStorage (see [frontend/src/auth/AuthContext.tsx](frontend/src/auth/AuthContext.tsx)).
- **Database:** PostgreSQL with `User` and `Sweet` models (roles `USER`/`ADMIN`) defined in [backend/prisma/schema.prisma](backend/prisma/schema.prisma).

## Getting Started
### Prerequisites
- Node.js 20+ and npm.
- PostgreSQL instance.

### Backend setup
1. Create [backend/.env](backend/.env):
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/sweetshop"
   JWT_SECRET="change_me"
   PORT=4000
   ```
2. Install dependencies and apply migrations:
   ```bash
   cd backend
   npm install
   npx prisma migrate deploy
   ```
   For local iteration you can also run `npx prisma migrate dev`.
3. Run the API:
   ```bash
   npm run dev   # starts with nodemon on http://localhost:4000
   # npm run build && npm start  # production build
   ```

### Frontend setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   The app expects the API at http://localhost:4000 (configured in [frontend/src/api/axios.ts](frontend/src/api/axios.ts)).

### Running tests
- Backend: `cd backend && npm test`

## API Quickstart
Register - login - create a sweet (admin role required for create/update/delete/restock; set `role` to `ADMIN` manually in the database for an admin account):
```bash
# Register
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secretpw"}'

# Login
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secretpw"}' | jq -r '.token')

# Create a sweet (admin only)
curl -X POST http://localhost:4000/api/sweets \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Ladoo","category":"Festive","price":2.5,"quantity":50}'
```
Search, purchase, and restock endpoints are available in [backend/src/routes/sweets.routes.ts](backend/src/routes/sweets.routes.ts) and [backend/src/routes/inventory.routes.ts](backend/src/routes/inventory.routes.ts).

## Configuration
- API base URL: [frontend/src/api/axios.ts](frontend/src/api/axios.ts) (default http://localhost:4000).
- Auth token/user: stored in `localStorage` by [frontend/src/auth/AuthContext.tsx](frontend/src/auth/AuthContext.tsx).
- Database connection and JWT secret: [backend/.env](backend/.env).

## Getting Help
- Open an issue in this repository with reproduction details and logs.

## Maintainers & Contributions
- Maintainer: Mayankax
- Contributions are welcome: fork the repo, create a feature branch, add tests for backend changes, and open a PR. For larger changes, consider starting a discussion via an issue first.
