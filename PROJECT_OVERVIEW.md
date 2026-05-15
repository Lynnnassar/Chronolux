# ChronoLux E-Commerce Platform

ChronoLux is a full-stack luxury watches e-commerce platform with three apps:

- Backend API (Node.js + Express + MongoDB)
- Customer frontend (React + Vite)
- Admin panel (React + Vite)

This document explains how to run the project, key API endpoints, and the database relationships.

---

## 1. Project Structure

```
backend/        Node.js + Express API
frontend/       Customer storefront (React)
admin-panel/    Admin dashboard (React)
media/          Uploaded media assets (served by backend)
```

---

## 2. Quick Start

### Backend

```
cd backend
npm install
npm run dev
```

Create `.env` inside `backend/`:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/chronolux
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Optional `.env` inside `frontend/`:

```
VITE_API_URL=http://localhost:4000/api
VITE_IMAGE_BASE_URL=http://localhost:4000
```

### Admin Panel

```
cd admin-panel
npm install
npm run dev
```

Optional `.env` inside `admin-panel/`:

```
VITE_API_URL=http://localhost:4000/api
VITE_IMAGE_BASE_URL=http://localhost:4000
```

---

## 3. API Endpoints (Backend)

Base URL: `http://localhost:4000/api`

### Auth

- `POST /auth/register` (customer register)
- `POST /auth/login` (customer/admin login)

### Watches

- `GET /watches`
- `GET /watches/:id`
- `POST /watches` (admin)
- `PUT /watches/:id` (admin)
- `DELETE /watches/:id` (admin)

### Brands

- `GET /brands`
- `GET /brands/:id`
- `POST /brands` (admin, supports image upload)
- `PUT /brands/:id` (admin)
- `DELETE /brands/:id` (admin)

### Collections

- `GET /collections`
- `GET /collections/:id`
- `POST /collections` (admin)
- `PUT /collections/:id` (admin)
- `DELETE /collections/:id` (admin)

### Categories

- `GET /categories`
- `POST /categories` (admin)

### Orders

- `POST /orders` (customer)
- `GET /orders/my-orders` (customer)
- `GET /orders` (admin)
- `GET /orders/:id` (admin)
- `PUT /orders/:id/status` (admin)

### Analytics

- `GET /analytics/dashboard` (admin)

### Media

- `GET /media` (admin)
- `POST /media/delete` (admin)

---

## 4. Frontend Libraries (Why They Are Used)

### Shared (frontend + admin-panel)

- React + Vite: fast dev server and modern React tooling
- React Router: client-side routing for pages
- Axios: HTTP requests to the API
- TanStack Query: server state, caching, and request lifecycle
- Tailwind CSS: fast, consistent styling system
- Framer Motion: page and UI animations
- Lucide React: consistent icon set

### Frontend Only

- @base-ui/react: unstyled primitives for custom luxury UI
- class-variance-authority + clsx + tailwind-merge: ergonomic class composition
- tw-animate-css: animation utilities
- @fontsource-variable/geist: optional variable font support (fallback)

### Admin Panel Only

- Sonner: toast notifications for admin actions and errors

---

## 5. Database Models and Relations

### User

- Fields: `fullName`, `email`, `password`, `role`
- Roles: `customer`, `admin`

### Brand

- One brand can have many collections and watches

### Collection

- Belongs to a brand
- One collection can have many watches

### Category

- Used as filters (many-to-many with watches)

### Watch

- Belongs to one brand
- Optional reference to one collection
- Can belong to multiple categories

### Order

- Belongs to one customer
- Contains embedded order items
- Each item references a watch + captures `priceAtPurchase`

Relationships (high level):

```
Brand -> Collection -> Watch
Watch -> Categories (many)
User (customer) -> Order -> Items -> Watch
```

---

## 6. Media Handling

- Media files are stored under `backend/media/`
- Backend serves static files from `/media`
- Watches/brands/collections store URLs like `/media/watches/<file>`

---

## 7. Admin Panel Notes

- Admin routes are protected by JWT + role check
- Order detail view is available via the eye icon in Orders
- Media library lists files stored in `backend/media/`

---

## 8. Troubleshooting

- `401 Unauthorized` in admin panel: ensure admin login and valid token
- `Cannot populate path user`: ensure order uses `customer`, not `user`
- Images not loading: verify `VITE_IMAGE_BASE_URL` and backend static media

---

## 9. How to Extend

Common extensions:

- Add product reviews model
- Add wishlist and saved items
- Add payment provider integration
- Add shipping address to orders
- Add SEO fields to frontend pages

If you need any changes or a deeper guide for one module, update this file and keep the API list in sync with backend routes.
