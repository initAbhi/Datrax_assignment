# Menu Change Request (CR) Tracker

A professional, internal business application for managing and tracking menu change requests. Built with a modern full-stack architecture using React, Express, and Microsoft SQL Server.

## 🚀 Project Overview

The Menu CR Tracker allows restaurant Managers to propose changes to the menu (e.g., price updates, availability changes, description edits). Supervisors can then review these requests in their dashboard and choose to approve or reject them. The application features a clean, responsive UI tailored for internal company use.

## 🛠 Tech Stack

### Frontend
- **React 19** & **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS v4** (Styling)
- **React Router DOM v7** (Routing)
- **React Hook Form** & **Zod** (Form Validation)
- **Axios** (API Client)
- **Context API** (State Management)

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **TypeORM** (ORM)
- **Microsoft SQL Server** (Database)
- **JWT** (Authentication)
- **bcrypt** (Password Hashing)
- **Helmet**, **Morgan**, **CORS** (Security & Logging)
- **Zod** (Request Validation)

## 📦 Installation & Setup

### 1. Database Setup (Docker)

The project includes a `docker-compose.yml` file to quickly spin up an MSSQL instance.

```bash
# Start the MSSQL Database container
docker compose up -d
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Generate and Run Database Migrations
npm run migration:generate
npm run migration:run

# Seed the Database (Creates users and menu items)
npm run seed

# Start the Backend Server (Runs on port 5000)
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies (using bun or npm)
bun install

# Start the Frontend Server (Runs on port 5174 or 5173)
bun run dev
```

## 🔐 Default Login Credentials

The database is seeded with two default users for testing role-based access:

**Manager Account**
- **Email:** `manager@sapphire.com`
- **Password:** `password123`
- **Role:** `MANAGER`

**Supervisor Account**
- **Email:** `supervisor@sapphire.com`
- **Password:** `password123`
- **Role:** `SUPERVISOR`

## 📁 Architecture Highlights

- **Clean Layered Architecture (Backend):** Separation of concerns via `Controllers` (HTTP layer), `Services` (Business logic), and `Repositories` (Database layer).
- **Global Error Handling:** Custom `AppError` class and a global error middleware ensure consistent API responses.
- **Strict Validation:** `Zod` is used on both the frontend (forms) and backend (requests) for strict data typing and validation.
- **Component-Driven UI:** Reusable UI components (`Card`, `Badge`, `Button`, `Table`, `Input`) using Tailwind CSS for a consistent design system.
