# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built using **TypeScript**, following **Test-Driven Development (TDD)** principles. The application supports role-based access, inventory management, and a modern, responsive UI.

---

## 🚀 Project Overview

This system allows **users** to browse and purchase sweets, while **admin users** can manage the catalog and inventory. The project demonstrates backend API design, authentication, database integration, frontend architecture, testing, and responsible AI usage.

---

## 🧰 Tech Stack

### Backend
* Node.js + TypeScript
* Express.js
* PostgreSQL
* Prisma ORM
* JWT Authentication
* Zod (request validation)
* Jest + Supertest (TDD)

### Frontend
* React + TypeScript
* Vite
* React Router
* Tailwind CSS
* Axios
* Context API (auth state)

---

## ✨ Features

### Authentication
* User registration & login
* JWT-based authentication
* Role-based authorization (`USER`, `ADMIN`)

### Sweet Management
* View all sweets
* Search sweets by name, category, and price range
* Purchase sweets (quantity decreases)
* Disable purchase if stock is zero

### Admin Capabilities
* Add new sweets
* Update sweet details
* Delete sweets
* Restock inventory
* Admin-only UI & API protection

### UI/UX
* Responsive dashboard
* Blur-backed modals for add/edit actions
* Clean, modern card-based layout
* Optimized state updates (No unnecessary UI re-renders)

---

## 🏗️ Architecture

### Backend
* RESTful API using Express
* Prisma manages database schema and queries
* JWT middleware protects routes
* Role guards restrict admin-only actions
* Tests written **before** implementation (TDD approach)

### Frontend
* Component-driven React architecture
* Custom hooks for data/state management
* Centralized auth context
* Protected routes
* Optimized state updates (no full re-fetch on purchase/restock)

---

## 📸 Screenshots

### Login & Register
| Login | Register |
| :---: | :---: |
| ![Login](screenshots/image1.png) | ![Register](screenshots/image2.png) |

### User Dashboard & Admin Dashboard
| User Dashboard | Admin Dashboard |
| :---: | :---: |
| ![User Dashboard](screenshots/image3.png) | ![Admin Dashboard](screenshots/image4.png) |

### Add / Edit Sweet (Blur Modal)
![Admin Modal](screenshots/image5.png)

---

## ⚙️ Getting Started

### Prerequisites
* Node.js 20+
* PostgreSQL database

### Backend Setup

1.  Create `.env` inside the `backend/` directory:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/sweetshop"
    JWT_SECRET="your_secret"
    PORT=4000
    ```
2.  Install dependencies & migrate the database:
    ```bash
    cd backend
    npm install
    npx prisma migrate dev
    ```
3.  Start the backend server:
    ```bash
    npm run dev
    ```
    *Backend runs on: `http://localhost:4000`*

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies and start the client:
    ```bash
    npm install
    npm run dev
    ```
    *Frontend runs on: `http://localhost:5173`*

---

## 🧪 Running Tests (TDD Proof)

All core business logic is covered with automated tests.

```bash
cd backend
npm test
```


## ✅ Successful Test Run Coverage

A successful test run confirms the stability and reliability of the core application features:

* **✔ Auth tests:** Comprehensive testing of user registration, login, and session management.
* **✔ Sweet CRUD tests:** Validation of Create, Read, Update, and Delete operations for primary data models.
* **✔ Inventory tests:** Full coverage of inventory-specific functions and business logic.
* **✔ Health check tests:** Confirmation that all services and endpoints are operational.

---

## 🔐 Admin Access Testing

To properly test the protected admin functionality and dashboard:

1.  **Register a User:** Register a new user normally through the application's UI (e.g., using the email `admin@example.com`).
2.  **Update Role in DB:** Directly update the user's role in the database using a SQL client:

    ```sql
    UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
    ```

3.  **Access Admin Features:** Log in again with this user to verify access to the protected admin features and the administrative dashboard.

---

## 🤖 My AI Usage

AI tools were used responsibly as development assistants throughout the project.

### Tools Used

* **ChatGPT**

### How I Used AI

* Brainstorming API design and suggesting endpoint structure.
* Writing, refining, and generating boilerplate for **Jest test cases**.
* Debugging complex **TypeScript** and **React state** issues.
* Improving UI/UX consistency and getting suggestions for **Tailwind CSS** component design.

### Reflection

AI significantly improved development speed and helped catch edge cases early. However, all architectural decisions, critical business logic, and final implementations were written, reviewed, and validated by me. AI was used strictly as an assistant—not a replacement for core understanding or final code authorship.