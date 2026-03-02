# Court Management System 🏛️

A comprehensive web-based Court Management System with role-based access for Clients, Judges, and Administrators.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [User Roles](#user-roles)
- [Security](#security)
- [Documentation](#documentation)
- [Academic Requirements](#academic-requirements)

---

## ✨ Features

### Client Features
- 📅 Browse 8 different court services
- 📝 Book appointments online
- 📎 Upload case documents (PDF, JPG, PNG)
- 📊 Track appointment status in real-time
- 🔔 Receive status notifications

### Judge Features
- 📂 View assigned cases
- 📄 Review client documents
- 💬 Add remarks and notes
- 🔄 Reschedule appointments
- ✅ Update case status

### Administrator Features
- ✔️ Approve/Reject appointments
- 📅 Reschedule appointments
- 👨‍⚖️ Assign judges to cases
- ✅ Mark appointments as completed
- 📁 View all client files
- 📊 Dashboard with statistics

---

## 🛠️ Tech Stack

### Frontend
- **Vue 3** (Composition API)
- **Vue Router** (Navigation)
- **Pinia** (State Management)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP Client)
- **DOMPurify** (XSS Protection)
- **Vite** (Build Tool)

### Backend
- **Node.js** + **Express**
- **PostgreSQL** (Database)
- **JWT** (Authentication)
- **bcryptjs** (Password Hashing)
- **Multer** (File Uploads)
- **CORS** (Cross-Origin Resource Sharing)

---

## 📁 Project Structure

```
CMS_project/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── ClientDashboard.vue
│   │   │   ├── JudgeDashboard.vue
│   │   │   └── AdminDashboard.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── stores/
│   │   │   ├── auth.js
│   │   │   └── appointment.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── initDB.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── appointments.js
│   │   └── users.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
├── SECURITY.md
├── DESIGN.md
├── GIT_WORKFLOW.md
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/court-management-system.git
cd court-management-system
```

### 2. Database Setup
Open PostgreSQL (pgAdmin or psql):
```sql
CREATE DATABASE court_management;
```

### 3. Backend Setup
```bash
cd backend
npm install

# Configure .env file
# Update DB_PASSWORD with your PostgreSQL password

npm run dev
```
Backend runs on: **http://localhost:5000**

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: **http://localhost:3000**

---

## 👥 User Roles

### 1. Client
- Book appointments
- Upload documents
- Track status

### 2. Judge
- Review cases
- Add remarks
- Reschedule hearings

### 3. Administrator
- Full control
- Approve/Reject
- Assign judges
- View statistics

---

## 🔒 Security Features

✅ **Authentication & Authorization**
- JWT tokens with 24-hour expiry
- bcrypt password hashing (10 rounds)
- Role-Based Access Control (RBAC)

✅ **XSS Protection**
- Vue.js automatic HTML escaping
- DOMPurify sanitization
- No `v-html` with user input

✅ **SQL Injection Prevention**
- Parameterized queries
- No string concatenation in SQL

✅ **File Upload Security**
- Type validation (PDF, JPG, PNG only)
- Size limit (5MB max)
- MIME type checking

✅ **Data Protection**
- Environment variables for secrets
- HTTPS-ready configuration
- CORS restricted to specific origin

See [SECURITY.md](SECURITY.md) for detailed threat modeling.

---

## 📚 Documentation

- **[SECURITY.md](SECURITY.md)** - Security & Threat Modeling
- **[DESIGN.md](DESIGN.md)** - User Personas & Design Decisions
- **[GIT_WORKFLOW.md](GIT_WORKFLOW.md)** - Git Best Practices

---

## 🎓 Academic Requirements Checklist

### ✅ Technical Requirements
- [x] Git with proper commit history
- [x] Feature branches
- [x] Clear commit messages
- [x] GitHub repository

### ✅ System Requirements
- [x] 3 user roles (Client, Judge, Admin)
- [x] Authentication system
- [x] Dashboard per role
- [x] CRUD operations
- [x] Vue Router
- [x] Pinia state management

### ✅ Vue Implementation
- [x] Vue 3 Composition API
- [x] Reusable components
- [x] Props and Emits
- [x] Event listeners (@click, @submit)
- [x] v-model, v-if, v-for
- [x] Computed properties
- [x] Proper folder structure

### ✅ UX Requirements
- [x] Clear navigation
- [x] Error messages
- [x] Loading states
- [x] Responsive design
- [x] Call-to-action elements

### ✅ Accessibility (WCAG 2.1 AA)
- [x] Semantic HTML
- [x] Form labels
- [x] ARIA attributes
- [x] Keyboard navigation
- [x] Color contrast (4.5:1)

### ✅ Security & Threat Modeling
- [x] Asset identification
- [x] Threat analysis
- [x] Mitigation strategies
- [x] Secure coding decisions
- [x] Documentation (SECURITY.md)

### ✅ Human-Centered Design
- [x] 3 detailed user personas
- [x] User flow diagrams
- [x] Design decision explanations
- [x] Documentation (DESIGN.md)

---

## 🎨 Color Themes

- **Client:** Teal (#14b8a6)
- **Judge:** Purple (#a855f7)
- **Admin:** Red (#ef4444)

---

## 📊 Appointment Lifecycle

```
1. PENDING → Client books appointment
2. APPROVED → Admin approves & assigns judge
3. REJECTED → Admin rejects with reason
4. RESCHEDULED → Admin/Judge changes date
5. COMPLETED → Admin marks as done
```

---

## 🧪 Testing

### Test Accounts (After Registration)
Create test accounts with these roles:
- **Client:** client@test.com
- **Judge:** judge@test.com
- **Admin:** admin@test.com

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/my` - Get my appointments
- `GET /api/appointments/assigned` - Get assigned cases
- `GET /api/appointments` - Get all appointments
- `PATCH /api/appointments/:id/status` - Update status
- `PATCH /api/appointments/:id/reschedule` - Reschedule
- `PATCH /api/appointments/:id/remarks` - Add remarks
- `PATCH /api/appointments/:id/assign` - Assign judge

### Users
- `GET /api/users/judges` - Get all judges

---

## 🤝 Contributing

This is an academic project. For contributions:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

MIT License - Academic Project

---

## 👨‍💻 Development Team

Court Management System Development Team  
Academic Year: 2024

---

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for efficient court management**
