# Human-Centered Design Document
## Court Management System

---

## 1. User Personas

### Persona 1: Sarah Mukamana - Client

**Demographics:**
- **Age:** 32 years old
- **Occupation:** Small business owner
- **Location:** Kigali, Rwanda
- **Education:** Bachelor's degree in Business Administration
- **Tech Proficiency:** Moderate (uses smartphone daily, familiar with web apps)

**Background:**
Sarah runs a small retail shop and needs to file a civil case regarding a contract dispute with a supplier. She has limited time during business hours and finds it difficult to visit the court physically multiple times just to check case status.

**Goals:**
- Book court appointments without leaving her business
- Upload required documents digitally
- Track case progress in real-time
- Receive notifications about hearing dates
- Avoid multiple physical visits to court

**Pain Points:**
- Physical court visits take 2-3 hours (travel + waiting)
- Lost work hours affect her business income
- Paper documents get damaged or lost
- No way to know case status without visiting
- Difficult to remember hearing dates

**Motivations:**
- Save time and focus on business
- Have peace of mind about case progress
- Keep digital copies of all documents
- Get timely updates about her case

**Technology Usage:**
- Smartphone: Daily (WhatsApp, mobile banking)
- Computer: 2-3 times per week
- Internet: Reliable access at home and shop
- Preferred device: Mobile phone

**Quote:**
> "I can't afford to close my shop every time I need to check on my case. I need a system that works around my schedule, not the other way around."

---

### Persona 2: Judge Emmanuel Nkurunziza - Judge

**Demographics:**
- **Age:** 48 years old
- **Occupation:** District Court Judge
- **Location:** Kigali, Rwanda
- **Education:** Master's degree in Law
- **Tech Proficiency:** High (uses computer daily for work)

**Background:**
Judge Emmanuel handles 15-20 cases per week. He spends significant time searching through physical files, reading handwritten notes, and coordinating with court clerks to access case documents. He often needs to reschedule hearings but the notification process is slow and manual.

**Goals:**
- Access all case files from one digital location
- Review documents before hearings efficiently
- Add remarks and notes digitally
- Reschedule hearings quickly with automatic notifications
- Reduce time spent on administrative tasks

**Pain Points:**
- Physical files are scattered across different offices
- Handwritten notes are difficult to read
- Cannot access case files outside court premises
- Rescheduling requires multiple phone calls
- No central system to track case progress

**Motivations:**
- Improve efficiency and handle more cases
- Make better-informed decisions with easy document access
- Reduce administrative burden
- Provide faster justice to citizens

**Technology Usage:**
- Computer: Daily (8+ hours)
- Smartphone: Daily for communication
- Email: Regularly checks
- Preferred device: Desktop computer with large screen

**Quote:**
> "Justice delayed is justice denied. I need quick access to all case information so I can focus on making fair decisions, not searching for documents."

---

### Persona 3: Administrator Alice Uwase - Court Administrator

**Demographics:**
- **Age:** 35 years old
- **Occupation:** Court Administrator
- **Location:** Kigali, Rwanda
- **Education:** Bachelor's degree in Public Administration
- **Tech Proficiency:** High (manages court systems daily)

**Background:**
Alice manages all court appointments, assigns cases to judges, and maintains records. She handles 30-50 appointment requests per week, manually checking availability, calling judges for assignments, and updating paper registers. The process is time-consuming and error-prone.

**Goals:**
- Centralized dashboard to manage all appointments
- Quick approval/rejection workflow
- Easy judge assignment system
- Real-time statistics and reporting
- Reduce paperwork and manual processes

**Pain Points:**
- Manual appointment scheduling causes conflicts
- Paper registers are difficult to search
- No visibility into overall court workload
- Calling judges for availability is time-consuming
- Difficult to generate reports for management

**Motivations:**
- Streamline court operations
- Reduce errors and conflicts
- Provide better service to citizens
- Generate accurate reports for decision-making

**Technology Usage:**
- Computer: Daily (full workday)
- Spreadsheets: Regularly for tracking
- Email: Constant communication
- Preferred device: Desktop with dual monitors

**Quote:**
> "I need a system that gives me full control and visibility. When I approve an appointment, I should be able to assign a judge and set a date in seconds, not hours."

---

## 2. User Flow Diagrams

### Flow 1: Client Booking Appointment

```
START
  ↓
[Open Website]
  ↓
[Click "Register"] ──→ [Fill Registration Form] ──→ [Select Role: Client]
  ↓                           ↓
[Submit]                 [Account Created]
  ↓                           ↓
[Login Page] ←──────────────┘
  ↓
[Enter Email & Password]
  ↓
[Select Role: Client]
  ↓
[Click Login]
  ↓
[CLIENT DASHBOARD]
  ↓
[View Services List]
  ↓
[Select Service] (e.g., "Case Filing")
  ↓
[Choose Preferred Date]
  ↓
[Enter Case Description]
  ↓
[Upload Documents] (PDF/JPG/PNG)
  ↓
[Click "Book Appointment"]
  ↓
[Success Message: "Appointment Booked"]
  ↓
[View in "My Appointments" Section]
  ↓
[Status: Pending]
  ↓
[Wait for Admin Approval]
  ↓
[Receive Notification] ──→ [Status Changes to "Approved"]
  ↓
[View Assigned Judge & Hearing Date]
  ↓
END
```

**Decision Points:**
- If documents missing → Show error message
- If date unavailable → Suggest alternative dates
- If upload fails → Allow retry

---

### Flow 2: Judge Reviewing Case

```
START
  ↓
[Login as Judge]
  ↓
[JUDGE DASHBOARD]
  ↓
[View "Assigned Cases" List]
  ↓
[Cases Sorted by Date]
  ↓
[Click on Case] ──→ [Case Details Panel Opens]
  ↓
[View Client Information]
  ↓
[View Case Description]
  ↓
[View Uploaded Documents]
  ↓
[Click Document] ──→ [PDF Opens in New Tab]
  ↓
[Review Document]
  ↓
[Return to Dashboard]
  ↓
[Add Remarks in Text Area]
  ↓
Decision: Need to Reschedule?
  ├─ YES ──→ [Select New Date]
  │            ↓
  │         [Enter Reason]
  │            ↓
  │         [Click "Reschedule"]
  │            ↓
  │         [Client Notified]
  │            ↓
  └─ NO ───→ [Click "Save Remarks"]
               ↓
            [Remarks Saved]
               ↓
            [Move to Next Case]
               ↓
            END
```

**Decision Points:**
- If no cases assigned → Show "No cases" message
- If document fails to load → Show error + retry option
- If reschedule date is past → Show validation error

---

### Flow 3: Administrator Managing Appointments

```
START
  ↓
[Login as Administrator]
  ↓
[ADMIN DASHBOARD]
  ↓
[View Statistics Cards]
  ├─ Pending: 12
  ├─ Approved: 45
  ├─ Rejected: 3
  ├─ Rescheduled: 8
  └─ Completed: 120
  ↓
[View All Appointments List]
  ↓
[Filter by Status] ──→ [Select "Pending"]
  ↓
[Click on Appointment]
  ↓
[View Client Details]
  ↓
[View Uploaded Documents]
  ↓
[Review Case Information]
  ↓
Decision: Approve or Reject?
  ├─ APPROVE ──→ [Click "Approve"]
  │                ↓
  │             [Select Judge from Dropdown]
  │                ↓
  │             [Click "Assign Judge"]
  │                ↓
  │             [Status: Approved]
  │                ↓
  │             [Client & Judge Notified]
  │                ↓
  └─ REJECT ───→ [Enter Rejection Reason]
                   ↓
                [Click "Reject"]
                   ↓
                [Status: Rejected]
                   ↓
                [Client Notified with Reason]
                   ↓
[Move to Next Pending Appointment]
  ↓
[After Hearing Completed]
  ↓
[Click "Mark as Completed"]
  ↓
[Status: Completed]
  ↓
END
```

**Decision Points:**
- If no judges available → Show "Add judges first" message
- If rejection reason empty → Show validation error
- If appointment already processed → Show warning

---

## 3. Design Decisions & Rationale

### A. Role-Based Color Coding
**Decision:** Different colors for each role (Client: Teal, Judge: Purple, Admin: Red)

**Rationale:**
- **Visual Identity:** Users immediately know which dashboard they're on
- **Cognitive Load:** Reduces confusion when switching between roles
- **Accessibility:** High contrast colors meet WCAG 2.1 AA standards
- **User Feedback:** Colors provide instant visual feedback about current context

**User Benefit:** Sarah (Client) sees teal and knows she's in the right place. If she accidentally opens a judge link, the purple color alerts her immediately.

---

### B. Single-Page Dashboard Design
**Decision:** All key actions visible on one dashboard without deep navigation

**Rationale:**
- **Efficiency:** Users complete tasks faster (Sarah books in 3 clicks)
- **Cognitive Mapping:** Users see the full workflow at once
- **Mobile-Friendly:** Less navigation = better mobile experience
- **Reduced Errors:** Users don't get lost in multiple pages

**User Benefit:** Judge Emmanuel sees all assigned cases in one view without clicking through multiple menus.

---

### C. Real-Time Status Updates
**Decision:** Appointment status visible immediately after any change

**Rationale:**
- **Transparency:** Users always know where their case stands
- **Trust Building:** No "black box" - users see progress
- **Reduced Anxiety:** Sarah doesn't worry about case status
- **Fewer Support Calls:** Users don't need to call court for updates

**User Benefit:** Sarah checks her dashboard and instantly sees "Approved" status with assigned judge name.

---

### D. Document Upload with Preview
**Decision:** Allow multiple file uploads with file type validation

**Rationale:**
- **Convenience:** Upload all documents at once
- **Error Prevention:** File type validation prevents wrong uploads
- **Security:** Size limits prevent system abuse
- **User Control:** Users see what they uploaded

**User Benefit:** Sarah uploads 3 documents (contract, ID, evidence) in one action instead of three separate uploads.

---

### E. Inline Actions (No Modals)
**Decision:** Actions happen directly on the dashboard, not in popup modals

**Rationale:**
- **Speed:** Faster interaction (no modal open/close)
- **Context:** Users see full information while taking action
- **Accessibility:** Better keyboard navigation
- **Mobile UX:** Modals are difficult on small screens

**User Benefit:** Alice (Admin) approves appointments with one click without losing context of other pending cases.

---

### F. Semantic HTML & ARIA Labels
**Decision:** Use proper HTML5 elements and ARIA attributes

**Rationale:**
- **Accessibility:** Screen readers work correctly
- **SEO:** Better search engine understanding
- **Standards Compliance:** Follows web best practices
- **Future-Proof:** Works with assistive technologies

**User Benefit:** Users with visual impairments can navigate using screen readers.

---

### G. Responsive Grid Layout
**Decision:** Mobile-first responsive design with Tailwind CSS

**Rationale:**
- **Mobile Usage:** 60%+ of users access from phones
- **Flexibility:** Works on any device size
- **Performance:** Tailwind generates minimal CSS
- **Maintenance:** Easy to update and modify

**User Benefit:** Sarah books appointments from her phone while managing her shop.

---

### H. Clear Call-to-Action Buttons
**Decision:** Large, colorful buttons with action verbs

**Rationale:**
- **Visibility:** Users immediately see what to do next
- **Confidence:** Clear labels reduce hesitation
- **Accessibility:** Large touch targets for mobile
- **Consistency:** Same button style across all pages

**User Benefit:** Judge Emmanuel knows exactly which button to click to reschedule a hearing.

---

## 4. Usability Testing Insights

### Key Findings:
1. **Users prefer status badges** over text descriptions (implemented)
2. **Document preview is essential** before submission (implemented)
3. **Filter by status** saves admin time (implemented)
4. **Keyboard shortcuts** would improve judge efficiency (future enhancement)

---

## 5. Accessibility Considerations

### WCAG 2.1 AA Compliance:
✅ **Perceivable:**
- 4.5:1 color contrast ratio
- Text alternatives for icons
- Semantic HTML structure

✅ **Operable:**
- Keyboard navigation support
- Focus indicators on interactive elements
- No time limits on forms

✅ **Understandable:**
- Clear error messages
- Consistent navigation
- Predictable behavior

✅ **Robust:**
- Valid HTML5
- ARIA labels where needed
- Works with screen readers

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Prepared By:** Court Management System Development Team
