# Git Workflow Guide
## Court Management System

This document explains the Git workflow used in this project for academic presentation.

---

## 1. Initial Setup

### Initialize Git Repository
```bash
cd CMS_project
git init
git add .
git commit -m "Initial commit: Project structure setup"
```

### Create Remote Repository
1. Go to GitHub/GitLab
2. Create new repository: `court-management-system`
3. Link local to remote:
```bash
git remote add origin https://github.com/yourusername/court-management-system.git
git branch -M main
git push -u origin main
```

---

## 2. Feature Branch Workflow

### Branch Naming Convention
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring

### Example Workflow

#### Feature 1: Authentication System
```bash
# Create and switch to feature branch
git checkout -b feature/authentication

# Make changes to files
# ... work on login, register, JWT ...

# Stage and commit
git add frontend/src/views/Login.vue
git add frontend/src/views/Register.vue
git add backend/routes/auth.js
git commit -m "feat: Implement user authentication with JWT

- Add Login component with email/password validation
- Add Register component with role selection
- Implement JWT token generation in backend
- Add bcrypt password hashing
- Create auth middleware for protected routes"

# Push feature branch
git push origin feature/authentication

# Merge to main (after testing)
git checkout main
git merge feature/authentication
git push origin main
```

#### Feature 2: Client Dashboard
```bash
git checkout -b feature/client-dashboard

# Work on client features
git add frontend/src/views/ClientDashboard.vue
git add backend/routes/appointments.js
git commit -m "feat: Create client dashboard with appointment booking

- Add service selection dropdown (8 court services)
- Implement appointment booking form
- Add file upload functionality for documents
- Display appointment status tracking
- Integrate with backend API endpoints"

git push origin feature/client-dashboard
git checkout main
git merge feature/client-dashboard
git push origin main
```

#### Feature 3: Judge Dashboard
```bash
git checkout -b feature/judge-dashboard

git add frontend/src/views/JudgeDashboard.vue
git commit -m "feat: Build judge dashboard for case management

- Display assigned cases list
- Add document viewer for client files
- Implement remarks and notes functionality
- Add reschedule appointment feature
- Create case detail panel with client info"

git push origin feature/judge-dashboard
git checkout main
git merge feature/judge-dashboard
git push origin main
```

#### Feature 4: Admin Dashboard
```bash
git checkout -b feature/admin-dashboard

git add frontend/src/views/AdminDashboard.vue
git commit -m "feat: Develop admin dashboard with full control

- Add statistics cards (pending, approved, rejected, etc.)
- Implement appointment approval/rejection workflow
- Add judge assignment functionality
- Create filter by status feature
- Add mark as completed action"

git push origin feature/admin-dashboard
git checkout main
git merge feature/admin-dashboard
git push origin main
```

#### Feature 5: Pinia State Management
```bash
git checkout -b feature/pinia-store

git add frontend/src/stores/auth.js
git add frontend/src/stores/appointment.js
git add frontend/src/main.js
git commit -m "feat: Add Pinia for centralized state management

- Create auth store for user authentication state
- Create appointment store for appointment data
- Implement loading and error states
- Integrate stores with components
- Add computed properties for reactive data"

git push origin feature/pinia-store
git checkout main
git merge feature/pinia-store
git push origin main
```

#### Feature 6: Security Implementation
```bash
git checkout -b feature/security

git add backend/middleware/auth.js
git add backend/middleware/upload.js
git add frontend/package.json  # DOMPurify
git commit -m "feat: Implement security measures and threat mitigation

- Add JWT authentication middleware
- Implement role-based authorization
- Add file upload validation (type, size, MIME)
- Configure CORS for specific origin
- Add parameterized SQL queries to prevent injection
- Include DOMPurify for XSS protection"

git push origin feature/security
git checkout main
git merge feature/security
git push origin main
```

---

## 3. Good Commit Message Examples

### ✅ GOOD Commit Messages
```bash
git commit -m "feat: Add user registration with role selection"
git commit -m "fix: Resolve JWT token expiration issue in auth middleware"
git commit -m "refactor: Extract appointment validation logic into separate function"
git commit -m "docs: Add security threat modeling documentation"
git commit -m "style: Improve responsive layout for mobile devices"
git commit -m "perf: Optimize database queries with indexing"
```

### ❌ BAD Commit Messages (AVOID)
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "test"
git commit -m "changes"
git commit -m "asdf"
git commit -m "done"
```

---

## 4. Commit Message Format

### Structure
```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, CSS
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Example
```bash
git commit -m "feat: Implement appointment reschedule functionality

- Add reschedule button in judge dashboard
- Create API endpoint for date updates
- Send notification to client on reschedule
- Update appointment status to 'Rescheduled'

Closes #15"
```

---

## 5. Handling Merge Conflicts

### Scenario: Conflict in ClientDashboard.vue
```bash
# Pull latest changes
git pull origin main

# Conflict detected
# CONFLICT (content): Merge conflict in frontend/src/views/ClientDashboard.vue

# Open file and resolve conflicts
# Look for markers:
<<<<<<< HEAD
Your changes
=======
Incoming changes
>>>>>>> branch-name

# Choose which code to keep or combine both

# After resolving
git add frontend/src/views/ClientDashboard.vue
git commit -m "fix: Resolve merge conflict in ClientDashboard component"
git push origin main
```

---

## 6. Viewing Git History

### Show commit history
```bash
git log --oneline --graph --all
```

### Show specific file history
```bash
git log --oneline frontend/src/views/Login.vue
```

### Show changes in a commit
```bash
git show <commit-hash>
```

---

## 7. Pull Request Workflow (GitHub)

### Creating a Pull Request
1. Push feature branch to GitHub
```bash
git push origin feature/authentication
```

2. Go to GitHub repository
3. Click "Compare & pull request"
4. Add description:
```
## Feature: User Authentication

### Changes
- Implemented login and register pages
- Added JWT token generation
- Created auth middleware

### Testing
- Tested login with valid/invalid credentials
- Verified JWT token expiration
- Checked role-based access control

### Screenshots
[Add screenshots if applicable]
```

5. Request review (if team project)
6. Merge after approval

---

## 8. Demonstration Checklist

### For Presentation, Show:
✅ **Local Commits History**
```bash
git log --oneline --graph --all
```

✅ **Clear Commit Messages**
```bash
git log --oneline
```

✅ **Feature Branches**
```bash
git branch -a
```

✅ **Merge Process**
```bash
git log --graph --oneline --all
```

✅ **Pull & Push Workflow**
```bash
git log origin/main..main  # Show unpushed commits
```

✅ **GitHub Repository**
- Show branches on GitHub
- Show commit history
- Show pull requests (if used)

---

## 9. Quick Reference Commands

```bash
# Check status
git status

# View branches
git branch

# Switch branch
git checkout <branch-name>

# Create and switch
git checkout -b <new-branch>

# Stage files
git add <file>
git add .

# Commit
git commit -m "message"

# Push
git push origin <branch-name>

# Pull
git pull origin <branch-name>

# Merge
git merge <branch-name>

# View history
git log --oneline

# View remote
git remote -v
```

---

## 10. Project Git Timeline

```
main
  │
  ├─── feat: Initial project setup
  │
  ├─── feature/authentication ──┐
  │                              ├─→ feat: User authentication
  │                              │
  ├─── feature/client-dashboard ─┤
  │                              ├─→ feat: Client booking system
  │                              │
  ├─── feature/judge-dashboard ──┤
  │                              ├─→ feat: Judge case management
  │                              │
  ├─── feature/admin-dashboard ──┤
  │                              ├─→ feat: Admin control panel
  │                              │
  ├─── feature/pinia-store ──────┤
  │                              ├─→ feat: State management
  │                              │
  ├─── feature/security ─────────┤
  │                              ├─→ feat: Security implementation
  │                              │
  └─── docs/documentation ───────┘
                                 └─→ docs: Add security & design docs
```

---

**Remember:** Good Git practices demonstrate professional software development skills!
