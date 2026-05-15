# ChronoLux Frontend

Customer-facing storefront for the ChronoLux luxury watch platform.

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

## Routes (current)

- `/`
- `/shop`
- `/login`

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
