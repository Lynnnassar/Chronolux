# ChronoLux

ChronoLux is a luxury watches full-stack e-commerce platform built with:

- **Backend:** Node.js + Express + MongoDB
- **Customer storefront:** React + Vite
- **Admin dashboard:** React + Vite
- **Gateway:** lightweight HTTP proxy for local storefront/admin routing

## Repository Structure

- `backend/` – Express API, authentication, products, orders, analytics, media uploads
- `frontend/` – customer-facing React storefront
- `admin-panel/` – admin React dashboard for managing products, brands, orders, analytics
- `gateway.js` – local proxy forwarding `localhost` to frontend and `admin.localhost` to admin panel
- `PROJECT_OVERVIEW.md` – high-level app overview and API summary

## Quick Start

### 1. Install dependencies

From the repository root:

```bash
npm run install:all
```

This installs dependencies for the root, `backend`, `frontend`, and `admin-panel`.

### 2. Configure environment variables

Create a `.env` file in `backend/` with values like:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/chronolux
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```

Optional front-end environment variables can be added in `frontend/` and `admin-panel/`:

```env
VITE_API_URL=http://localhost:4000/api
VITE_IMAGE_BASE_URL=http://localhost:4000
```

### 3. Start development servers

From the root directory, run:

```bash
npm run dev
```

This launches:

- backend API server
- customer frontend Vite server
- admin panel Vite server
- gateway proxy server

### 4. Open the apps

- Customer storefront: `http://localhost:5173`
- Admin panel: `http://admin.localhost:5173`

> The admin panel uses the `Host` header to route through the gateway. If `admin.localhost` does not resolve on your machine, add the following to your hosts file:
>
> ```text
> 127.0.0.1 admin.localhost
> ```

## Available Scripts

From the root:

- `npm run dev` – Starts backend, frontend, admin panel, and gateway together
- `npm run dev:backend` – Starts only the backend
- `npm run dev:frontend` – Starts only the customer frontend
- `npm run dev:admin` – Starts only the admin panel
- `npm run dev:gateway` – Starts only the gateway proxy
- `npm run install:all` – Installs dependencies for all subprojects

From each subproject directory, standard Vite/Node scripts are available.

## Local Development Architecture

- `backend/` exposes the API at `http://localhost:4000/api`
- `frontend/` runs on Vite port `5175`
- `admin-panel/` runs on Vite port `5176`
- `gateway.js` listens on port `5173`

The gateway forwards requests as follows:

- `localhost:5173` → customer storefront
- `admin.localhost:5173` → admin panel

## Notes

- The backend uses MongoDB and requires a running database instance.
- Uploaded media is stored under `backend/media/`.
- Admin operations are expected to be protected by authentication and role checks.

## Helpful Links

- `backend/README.md` – backend-specific setup and API details
- `frontend/README.md` – storefront details
- `admin-panel/README.md` – admin dashboard details
- `PROJECT_OVERVIEW.md` – overall architecture and API summary
