# Troubleshooting ECONNRESET Error

## What is ECONNRESET?
"ECONNRESET" means the connection between frontend and backend was suddenly closed.

## Common Causes:

### 1. Backend Server Not Running
**Solution:**
```bash
cd backend
npm start
```
Or double-click `start-backend.bat`

### 2. PostgreSQL Not Running
**Check:**
```bash
netstat -ano | findstr :5432
```
**Solution:** Start PostgreSQL service

### 3. Stale Connections
**Symptoms:** Many CLOSE_WAIT or FIN_WAIT_2 connections
**Check:**
```bash
netstat -ano | findstr :5000
```
**Solution:** Restart backend server
```bash
# Find PID
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID_NUMBER> /F

# Restart
cd backend
npm start
```

### 4. Port Already in Use
**Error:** "EADDRINUSE: address already in use :::5000"
**Solution:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

## Quick Fix Steps:

1. **Stop everything:**
   - Close all terminal windows
   - Kill backend process: `taskkill /PID <PID> /F`

2. **Restart PostgreSQL:**
   - Open Services (services.msc)
   - Find "postgresql-x64-XX"
   - Right-click → Restart

3. **Start backend:**
   ```bash
   cd backend
   npm start
   ```

4. **Start frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

## Prevention:

The updated code now includes:
- ✅ Connection pooling (max 20 connections)
- ✅ Idle timeout (30 seconds)
- ✅ Connection timeout (2 seconds)
- ✅ Error handlers for database
- ✅ Frontend error interceptor

## Still Having Issues?

Check:
1. PostgreSQL is running: `netstat -ano | findstr :5432`
2. Backend is running: `netstat -ano | findstr :5000`
3. Frontend is running: `netstat -ano | findstr :3000`
4. .env file has correct database credentials
5. Database exists: `court_management`

## Logs to Check:

**Backend logs:** Look for database connection errors
**Frontend console:** Check Network tab in browser DevTools
**PostgreSQL logs:** Check PostgreSQL data directory logs