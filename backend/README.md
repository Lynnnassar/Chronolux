# ChronoLux Backend API

Professional Node.js/Express backend for the ChronoLux luxury watch e-commerce platform.

## Features
- **Scalable Architecture**: Service-Layer pattern with clear separation of concerns.
- **Security**: Helmet, CORS, and Rate Limiting.
- **Authentication**: JWT-based auth with Role-Based Access Control (RBAC).
- **Validation**: Schema-based input validation using Joi.
- **Database**: MongoDB with Mongoose and transaction-based order placement.

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new customer.
- `POST /api/auth/login`: Login and receive a JWT.

### Watches (Public / Admin)
- `GET /api/watches`: List all watches (supports filtering).
- `GET /api/watches/:id`: Get watch details.
- `POST /api/watches`: Create a new watch (Admin only).
- `PUT /api/watches/:id`: Update a watch (Admin only).
- `DELETE /api/watches/:id`: Delete a watch (Admin only).

### Categories (Public / Admin)
- `GET /api/categories`: List all categories.
- `POST /api/categories`: Create a new category (Admin only).

### Orders (Customer / Admin)
- `POST /api/orders`: Place a new order (Authenticated).
- `GET /api/orders/my-orders`: View personal order history (Authenticated).
- `GET /api/orders`: View all store orders (Admin only).
- `PUT /api/orders/:id/status`: Update order status (Admin only).

## Setup
1. `cd backend`
2. `npm install`
3. Configure `.env`
4. `npm run dev`
