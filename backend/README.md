# Backend Setup Instructions

## Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

## Setup Steps

### 1. Install PostgreSQL
Download and install PostgreSQL from: https://www.postgresql.org/download/

### 2. Create Database
Open PostgreSQL command line (psql) or pgAdmin and run:
```sql
CREATE DATABASE court_management;
```

### 3. Configure Environment Variables
Edit the `.env` file and update:
```
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_secret_key_here
```

### 4. Install Dependencies
```bash
cd backend
npm install
```

### 5. Start Server
```bash
npm run dev
```

Server will run on: http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Appointments
- POST `/api/appointments` - Book appointment (Client)
- GET `/api/appointments/my` - Get my appointments (Client)
- GET `/api/appointments/assigned` - Get assigned cases (Judge)
- GET `/api/appointments` - Get all appointments (Admin)
- PATCH `/api/appointments/:id/status` - Update status (Admin)
- PATCH `/api/appointments/:id/reschedule` - Reschedule (Admin/Judge)
- PATCH `/api/appointments/:id/remarks` - Add remarks (Judge)
- PATCH `/api/appointments/:id/assign` - Assign judge (Admin)

### Users
- GET `/api/users/judges` - Get all judges (Admin)

## Database Tables

### users
- id, name, email, password, role, phone, created_at

### appointments
- id, client_id, judge_id, service, date, description, status, remarks, created_at

### documents
- id, appointment_id, filename, filepath, uploaded_at
