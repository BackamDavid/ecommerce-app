# Ecommerce App

A full-stack ecommerce application built with Flask backend and React frontend, featuring user authentication, product management, order processing, and Stripe payment integration.

## Features

- **User Authentication**: JWT-based authentication with role-based access (admin/user)
- **Product Management**: Add, view, and manage products with image uploads
- **Order Management**: Place orders and track order history
- **Payment Integration**: Secure payments via Stripe
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Admin Panel**: Admin users can manage products and view orders

## Tech Stack

### Backend
- **Flask**: Python web framework
- **MongoDB**: NoSQL database
- **JWT**: JSON Web Tokens for authentication
- **Flask-CORS**: Cross-origin resource sharing
- **Werkzeug**: Password hashing

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Stripe**: Payment processing
- **Tailwind CSS**: Utility-first CSS framework

## Prerequisites

- Python 3.12+
- Node.js 16+
- MongoDB
- Stripe account (for payments)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python3 -m venv e-com
   source e-com/bin/activate  # On Windows: e-com\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install Flask Flask-Cors Flask-JWT-Extended PyMongo bcrypt
   ```

4. Set up MongoDB connection in `config/db.py`

5. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Stripe (update `src/config/stripe.js` with your publishable key)

4. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000`

## Usage

### Admin Access
- **Email**: admin@example.com
- **Password**: admin123

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (admin only)
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

#### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   ├── config/
│   │   └── db.py             # Database configuration
│   ├── models/               # Data models
│   ├── routes/               # API route handlers
│   └── uploads/              # Product image uploads
├── frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   └── config/          # Configuration files
│   └── package.json         # Node dependencies
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
