# Court Management System

A comprehensive web-based Court Management System with role-based access for Clients, Judges, and Administrators.

## Features

### Client Features
- Browse court services (8 different services)
- Book appointments online
- Upload case documents (PDF, JPG, PNG)
- Track appointment status in real-time
- Receive status notifications
- **Edit pending appointments**
- **Delete pending appointments** (soft delete)

### Judge Features
- View assigned cases
- Review client documents
- Add remarks and notes
- Reschedule appointments
- Update case status

### Administrator Features
- Approve/Reject appointments
- Reschedule appointments
- Assign judges to cases
- Mark appointments as completed
- View all client files
- Dashboard with statistics
- **View deleted appointments history**

## Tech Stack

**Frontend:**
- Vue 3 (Composition API)
- Vue Router
- Tailwind CSS
- Axios
- DOMPurify (XSS protection)
- Vite

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (File uploads)
- bcryptjs (Password hashing)

## Security Features

- Role-Based Access Control (RBAC)
- JWT with HttpOnly cookies
- XSS Protection (DOMPurify)
- File upload validation
- HTTPS ready
- Environment variables for secrets

## Accessibility (WCAG 2.1 AA)

- Semantic HTML5 elements
- Keyboard navigation support
- ARIA labels and descriptions
- 4.5:1 color contrast ratio
- Responsive design (mobile & desktop)
- Screen reader friendly

## Setup Instructions

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on: http://localhost:3000

### Backend Setup (Coming Soon)

Backend implementation will include:
- User authentication
- Appointment management
- File upload handling
- Database models
- API endpoints

## Project Structure

```
CMS_project/
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   │   ├── Login.vue
│   │   │   ├── ClientDashboard.vue
│   │   │   ├── JudgeDashboard.vue
│   │   │   └── AdminDashboard.vue
│   │   ├── router/
│   │   │   └── index.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/ (To be implemented)
```

## User Roles

1. **Client** - Book appointments, upload documents, track status
2. **Judge** - Review cases, add remarks, reschedule hearings
3. **Administrator** - Full control over appointments and user management

## Appointment Lifecycle

1. **Pending** - Client books appointment
2. **Approved** - Admin approves appointment
3. **Assigned** - Admin assigns judge (Judge can now see it!)
4. **Rejected** - Admin rejects with reason
5. **Rescheduled** - Admin or Judge changes date
6. **Completed** - Admin marks as done

### Important: Judge Dashboard
Judges will ONLY see cases that are:
- ✅ Approved by admin
- ✅ Assigned to them specifically

If judge dashboard is empty, admin needs to:
1. Approve pending appointments
2. Assign them to the judge

## Color Themes (Role-based)

- Client: Teal (#14b8a6)
- Judge: Purple (#a855f7)
- Admin: Red (#ef4444)

## Development

To run the frontend in development mode:
```bash
cd frontend
npm run dev
```

To build for production:
```bash
npm run build
```

## Next Steps

1. Implement backend API
2. Set up MongoDB database
3. Create authentication endpoints
4. Implement file upload functionality
5. Add email notifications
6. Deploy to production

## License

MIT License - Academic Project
