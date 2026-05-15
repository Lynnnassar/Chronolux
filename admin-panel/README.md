# ChronoLux Admin Panel

Admin dashboard for managing products, brands, collections, inventory, orders, customers, and media.

## Requirements

- Node.js 18+
- Running backend API (see backend folder)

## Setup

```bash
npm install
```

Create an optional `.env` file for local overrides:

```text
VITE_API_URL=http://localhost:4000/api
VITE_IMAGE_BASE_URL=http://localhost:4000
```

Start the dev server:

```bash
npm run dev
```

## Routes

- `/login`
- `/` (dashboard)
- `/products`, `/products/new`, `/products/:id/edit`
- `/brands`, `/brands/new`, `/brands/:id/edit`
- `/categories`, `/categories/new`, `/categories/:id/edit`
- `/collections`, `/collections/new`, `/collections/:id/edit`
- `/orders`
- `/customers`
- `/media`
- `/analytics`
- `/inventory`
- `/settings`

All routes except `/login` are protected and require an admin account.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
