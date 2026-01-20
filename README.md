
# NGO Registration and Donation Management System

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Objectives](#objectives)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [Key Design Decisions](#key-design-decisions)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)

---
[Demo Video](https://drive.google.com/file/d/1o_VfOISPwOBVGEIGX_ZXxb_TCahuJLdF/view?usp=sharing)
[Project Report](https://drive.google.com/file/d/1VTRX1y10RVzq3Y5A0n2ZWWDXpnIHNkXT/view?usp=sharing)
---
## 🎯 Project Overview

The **NGO Registration and Donation Management System** is a comprehensive web application designed to enable Non-Governmental Organizations (NGOs) to:
- Manage user registrations securely
- Handle online donations with multiple payment gateway support
- Provide administrators with clear visibility into registrations and donations
- Maintain data integrity by ensuring registration data is saved independently of payment outcomes

This project addresses critical challenges faced by NGOs in managing online campaigns where user data is often lost if donations are not completed.

---

## 🔍 Problem Statement

Non-Governmental Organizations frequently face challenges with online donation campaigns:

1. **Data Loss**: User registration data is often lost if a donation is not completed
2. **Lack of Transparency**: Administrators lack visibility into registrations and donation attempts
3. **Payment Management**: Difficulty tracking donation status (success, pending, failed)
4. **User Experience**: Users cannot view their registration details or donation history

This system provides a **backend-driven solution** that separates user registration from the donation flow, ensuring ethical payment handling and complete data integrity.

---

## 🎯 Objectives

1. **Secure User Registration**: Enable users to register and maintain their data regardless of donation completion
2. **Flexible Donation System**: Allow users to donate any amount with complete tracking
3. **Admin Dashboard**: Provide administrators with comprehensive visibility into registrations and donations
4. **Data Integrity**: Ensure registration data is saved independently of payment outcomes
5. **Payment Tracking**: Track donation status accurately (success, pending, failed)
6. **User Control**: Allow users to view their registration details and donation history

---

## ✨ Key Features

### 👤 User Features
- **User Registration & Authentication**
  - Role-based login (User/Admin)
  - Secure password handling
  - Email-based registration
  
- **User Dashboard**
  - View personal registration details
  - Quick access to donation and history sections
  - Logout functionality

- **Donation Management**
  - Donate any custom amount
  - Pre-set donation options (₹100, ₹500, ₹1000)
  - Multiple payment methods support:
    - UPI
    - Credit/Debit Card
    - Net Banking
    - Wallet
  - Secure payment processing via Razorpay

- **Donation History**
  - View complete donation history
  - Track donation status (Success, Pending, Failed)
  - View donation amounts and timestamps

### 👨‍💼 Admin Features
- **Admin Dashboard**
  - Real-time statistics:
    - Total registered users
    - Total donation amount
    - Success/Pending/Failed donation counts

- **User Management**
  - View all registered users
  - Filter users by registration date
  - Export user data to CSV

- **Donation Management**
  - View all donation records
  - Filter donations by amount and date range
  - Track payment status with timestamps
  - View aggregated donation information
  - Export donation data to CSV

---

## 💻 Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Payment Gateway**: Razorpay (Test/Sandbox Mode)
- **Authentication**: Token-based (localStorage)
- **Dependencies**:
  - FastAPI
  - Uvicorn
  - Pydantic
  - python-dotenv
  - Supabase client
  - Razorpay client
  - python-multipart
  - requests

### Frontend
- **Framework**: React 19
- **Routing**: React Router DOM v7
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **JavaScript**: ES6+

### Infrastructure
- **Database**: Supabase (PostgreSQL)
- **Payment**: Razorpay
- **Version Control**: Git/GitHub

---

## 📁 Project Structure

```
NGO_Donation/
├── backend/
│   ├── main.py                 # FastAPI application & endpoints
│   ├── razorpay_client.py      # Razorpay payment gateway integration
│   ├── supabase_client.py      # Supabase database client
│   └── requirements.txt        # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main routing component
│   │   ├── App.css             # Global styles
│   │   ├── index.css           # Base styles
│   │   ├── main.jsx            # React entry point
│   │   │
│   │   ├── components/
│   │   │   └── RequireAuth.jsx # Route protection component
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx       # User & Admin login page
│   │   │   ├── Register.jsx    # User registration page
│   │   │   ├── UserDashboard.jsx      # User profile dashboard
│   │   │   ├── AdminDashboard.jsx     # Admin management dashboard
│   │   │   ├── donate.jsx      # Donation form & payment page
│   │   │   └── donation_history.jsx   # User donation history
│   │   │
│   │   └── assets/             # Images & static files
│   │
│   ├── package.json            # Node dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── eslint.config.js        # ESLint configuration
│   ├── index.html              # HTML template
│   └── README.md               # Frontend documentation
│
└── README.md                   # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend)
- **npm or yarn** (for frontend package management)
- **Supabase Account** (free tier available)
- **Razorpay Account** (test mode for sandbox)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd NGO_Donation
```

### Step 2: Backend Setup

#### 2.1 Create Virtual Environment
```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

#### 2.2 Install Dependencies
```bash
pip install -r requirements.txt
```

#### 2.3 Configure Environment Variables
Create a `.env` file in the `backend` folder:
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Razorpay Configuration (Test Keys)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**How to get these credentials:**
- **Supabase**: Visit [supabase.com](https://supabase.com), create a project, and get URL & keys from project settings
- **Razorpay**: Visit [razorpay.com](https://razorpay.com), sign up, enable test mode, and get test keys from dashboard

#### 2.4 Start Backend Server
```bash
# From backend directory
python main.py

# Or using uvicorn directly
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The backend will run on: `http://127.0.0.1:8000`

### Step 3: Frontend Setup

#### 3.1 Install Dependencies
```bash
cd frontend
npm install
```

#### 3.2 Start Development Server
```bash
npm run dev
```

The frontend will run on: `http://localhost:5173`

---

## 🏃 Running the Application

### Starting Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open your browser and navigate to: `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## 🔌 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"
}
```

#### Login User/Admin
```
POST /login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login success",
  "user_id": 1,
  "role": "user",
  "email": "john@example.com"
}
```

### Donation Endpoints

#### Create Donation
```
POST /donate
```
**Request Body:**
```json
{
  "user_id": 1,
  "amount": 500.00
}
```

**Response:**
```json
{
  "message": "Donation created",
  "donation_id": 123
}
```

#### Get User Donations
```
GET /my_donations/{user_id}
```
**Response:**
```json
[
  {
    "donation_id": 123,
    "user_id": 1,
    "amount": 500.00,
    "status": "success",
    "created_at": "2024-01-15T10:30:00"
  }
]
```

#### Create Payment Order
```
POST /create-payment
```
**Request Body:**
```json
{
  "donation_id": "123",
  "amount": 500
}
```

### Admin Endpoints

#### Get All Users
```
GET /admin/users
```

#### Get All Donations
```
GET /admin/donations
```

#### Get Admin Statistics
```
GET /admin/stats
```

**Response:**
```json
{
  "total_users": 50,
  "total_amount": 25000,
  "success": 30,
  "pending": 10,
  "failed": 5
}
```

#### Filter Users by Date
```
GET /admin/users/filter?from_date=2024-01-01&to_date=2024-01-31
```

#### Filter Donations
```
GET /admin/donations/filter?min_amount=100&from_date=2024-01-01&to_date=2024-01-31
```

#### Export Users CSV
```
GET /admin/export/users
```

#### Export Donations CSV
```
GET /admin/export/donations
```

---

## 🏗️ System Architecture

### High-Level Architecture Flow

```
┌─────────────────┐
│  React Frontend │
└────────┬────────┘
         │ (HTTP/REST)
         ▼
┌─────────────────────┐
│  FastAPI Backend    │
│  (Routes & Logic)   │
└────────┬────────────┘
         │
    ┌────┴─────┬──────────────┐
    ▼          ▼              ▼
┌────────┐ ┌──────────┐ ┌──────────────┐
│Supabase│ │Razorpay  │ │LocalStorage  │
│(PostgreSQL)│(Payments)│ │ (Session)    │
└────────┘ └──────────┘ └──────────────┘
```

### Authentication Flow

1. User registers with name, email, password, and role
2. Credentials stored in Supabase
3. User logs in and receives user_id and role
4. Token stored in localStorage for session management
5. RequireAuth component protects routes based on authentication and role

### Donation Flow

1. Authenticated user selects donation amount
2. Frontend sends donation request to `/donate` endpoint
3. Backend creates donation record with **pending** status
4. Backend creates Razorpay payment order
5. User completes payment via Razorpay SDK
6. Backend verifies payment and updates donation status
7. User can view donation status in donation history

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Donations Table
```sql
CREATE TABLE donations (
  donation_id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Key Design Decisions:
- **Separate Tables**: Users and donations are independent, ensuring data isn't lost
- **Status Tracking**: Donations have explicit status field (pending, success, failed)
- **Timestamps**: Both tables track creation and update times for auditing
- **Foreign Key**: Donation.user_id links to Users.id for referential integrity

---

## 🎨 Key Design Decisions

### 1. **Separation of Registration and Donation**
- User data is saved **immediately** during registration
- Donations are created before payment processing
- Status is updated after payment verification
- **Benefit**: No data loss even if payment fails

### 2. **Role-Based Access Control**
- Two roles: `user` and `admin`
- Route protection via RequireAuth component
- Role checked on login and route access
- **Benefit**: Simple, secure access management

### 3. **Frontend State Management**
- User data stored in localStorage
- Session persists across page refreshes
- No backend session required
- **Benefit**: Lightweight, fast authentication

### 4. **Payment Status Tracking**
- All payments tracked with explicit status
- Timestamps recorded for audit trail
- Admin can see payment history and trends
- **Benefit**: Complete transparency and accountability

### 5. **CSV Export Capability**
- Admins can export user and donation data
- Useful for reporting and external analysis
- **Benefit**: Data portability and analytics

### 6. **Razorpay Integration**
- Test/Sandbox mode for development
- Support for multiple payment methods
- Secure payment processing
- **Benefit**: Production-ready payment handling

---

## 📖 Usage Guide

### For Regular Users

#### 1. Register
- Click "New user? Register" on login page
- Fill in name, email, password
- Submit to create account

#### 2. Login
- Enter email and password
- You'll be redirected to your dashboard

#### 3. Make a Donation
- Click "Donate" from dashboard
- Select amount or enter custom amount
- Click "Donate Securely"
- Complete payment via Razorpay
- Payment status updates automatically

#### 4. View History
- Click "View Donation History"
- See all your donations with status
- Track payment progress

### For Administrators

#### 1. Admin Login
- Register with role "admin" OR login with admin credentials
- Dashboard automatically loads

#### 2. View Statistics
- See total users, donation amount
- Monitor success, pending, and failed donations

#### 3. Manage Users
- View all registered users
- Filter by registration date
- Export user data to CSV

#### 4. Manage Donations
- View all donations with user details
- Filter by amount and date range
- Track donation status
- Export donation data to CSV

---

## 🔒 Security Considerations

### Current Implementation
- Password stored in database (plain text - **for development only**)
- CORS enabled for development environment
- Role-based access control

### Production Recommendations
1. **Hash Passwords**: Use bcrypt or argon2 for password hashing
2. **JWT Tokens**: Replace localStorage tokens with secure JWT
3. **HTTPS**: Enable SSL/TLS in production
4. **Environment Variables**: Never commit sensitive data
5. **Input Validation**: Add server-side validation for all inputs
6. **Rate Limiting**: Implement rate limiting on API endpoints
7. **CSRF Protection**: Add CSRF tokens for state-changing operations

---

## 📦 Dependencies

### Backend Dependencies
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `python-dotenv` - Environment variable management
- `pydantic` - Data validation
- `supabase` - Database client
- `razorpay` - Payment gateway
- `python-multipart` - Form data parsing
- `requests` - HTTP client

### Frontend Dependencies
- `react` - UI framework
- `react-router-dom` - Routing
- `tailwindcss` - CSS framework
- `vite` - Build tool

---

## 🐛 Troubleshooting

### Backend Issues

**Issue**: "Connection refused" error
- **Solution**: Ensure Supabase credentials are correct in `.env`
- Verify backend is running on `http://127.0.0.1:8000`

**Issue**: Razorpay payments not working
- **Solution**: Check Razorpay test keys in `.env`
- Verify you're in test mode in Razorpay dashboard

**Issue**: CORS errors
- **Solution**: Ensure frontend runs on `http://localhost:5173`
- Check CORS middleware in main.py

### Frontend Issues

**Issue**: "Cannot find module" errors
- **Solution**: Run `npm install` in frontend directory
- Delete `node_modules` and `package-lock.json`, then reinstall

**Issue**: Page not loading after login
- **Solution**: Check browser console for errors
- Verify backend is running and accessible

**Issue**: Styling looks broken
- **Solution**: Rebuild with `npm run build`
- Clear browser cache (Ctrl+F5)

---

## 📝 Future Enhancements

1. **Email Notifications**: Send confirmation emails for donations
2. **Recurring Donations**: Support monthly/yearly donations
3. **Advanced Analytics**: Detailed donation analytics and charts
4. **Multiple Payment Gateways**: Add PayPal, Stripe, etc.
5. **Two-Factor Authentication**: Enhanced security with 2FA
6. **Donation Campaigns**: Create specific campaigns users can donate to
7. **Receipt Generation**: Auto-generate and email donation receipts
8. **Mobile App**: Native iOS/Android applications
9. **International Payments**: Support multiple currencies
10. **API Documentation**: OpenAPI/Swagger documentation

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [Your Contact Information]

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated**: January 2026
**Version**: 1.0.0

---

## ✅ Project Checklist

- [x] User Registration & Authentication
- [x] Role-based Access Control
- [x] User Dashboard
- [x] Donation Management
- [x] Donation History Tracking
- [x] Admin Dashboard with Statistics
- [x] User Management (View & Filter)
- [x] Donation Management (View & Filter)
- [x] CSV Export Functionality
- [x] Razorpay Payment Integration
- [x] Data Integrity (Separate registration from donation)
- [ ] Email Notifications
- [ ] Advanced Analytics
- [ ] Two-Factor Authentication
- [ ] Mobile App

---

**Thank you for using the NGO Registration and Donation Management System!** 🙏
