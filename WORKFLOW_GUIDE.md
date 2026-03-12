# Court Management System - Workflow Guide

## How Judge Dashboard Gets Cases

### Step-by-Step Process:

1. **Client Books Appointment**
   - Client logs in
   - Selects a service
   - Uploads documents (optional)
   - Books appointment
   - Status: **Pending**

2. **Admin Reviews Appointment**
   - Admin sees all appointments in dashboard
   - Admin can view uploaded documents
   - Admin clicks "✅ Approve Appointment"
   - Status: **Approved**

3. **Admin Assigns Judge** ⭐ (REQUIRED FOR JUDGE TO SEE IT)
   - Admin selects the approved appointment
   - Scrolls to "Assign Judge" section
   - Selects a judge from dropdown
   - Clicks "Assign" button
   - Status: Still **Approved** but now has judge_id

4. **Judge Can Now See Case**
   - Judge logs in
   - Case appears in "⚖️ Assigned Cases" list
   - Judge can:
     - View all case details
     - Download client documents
     - Add remarks/notes
     - Reschedule appointment

## Important Notes:

- ❌ Judge will NOT see cases that are:
  - Still "Pending" (not approved yet)
  - "Approved" but not assigned to them
  - Assigned to other judges

- ✅ Judge will ONLY see cases that are:
  - Approved by admin
  - Specifically assigned to them by admin

## Testing the Flow:

1. Create 3 users:
   - 1 Client account
   - 1 Judge account  
   - 1 Admin account

2. As Client:
   - Book an appointment
   - Upload some documents

3. As Admin:
   - Approve the appointment
   - Assign it to the judge

4. As Judge:
   - Refresh dashboard
   - Case should now appear!

## Date Format Fixed:

All dates now show as: `YYYY-MM-DD` (e.g., 2024-03-15)
No more `T22:00:00.000Z` timestamps!
