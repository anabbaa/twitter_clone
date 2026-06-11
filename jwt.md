# JWT Authentication Flow in Next.js (Replacing NextAuth)

## Overview

This document explains how to build a custom JWT authentication system in Next.js App Router without using NextAuth.

---

# Architecture

```text
Signin Form
    ↓
POST /api/signin
    ↓
Validate User
    ↓
Generate JWT
    ↓
Store JWT in Cookie
    ↓
Return Success
    ↓
Browser Stores Cookie
    ↓
GET /api/me
    ↓
AuthContext
    ↓
Components
```

---

# Step 1: User Registration

Create:

```text
app/api/signup/route.js
```

Responsibilities:

* Validate input
* Check if user already exists
* Hash password
* Save user

Example:

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

Store the hashed password in MongoDB.

---

# Step 2: Login Route

Create:

```text
app/api/signin/route.js
```

Responsibilities:

* Receive email and password
* Find user in MongoDB
* Verify password
* Generate JWT
* Store JWT in cookie

Flow:

```text
Signin Form
    ↓
POST /api/signin
    ↓
Validate Password
    ↓
Generate JWT
    ↓
Create Cookie
    ↓
Return User
```

---

# Step 3: Generate JWT

Example:

```js
const token = jwt.sign(
  {
    id: user._id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);
```

Purpose:

* Identify user
* Verify authenticity
* Maintain login session

---

# Step 4: Store JWT in Cookie

Example:

```js
response.cookies.set("auth-token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60,
});
```

Purpose:

* Browser stores token automatically
* Cookie is sent with future requests

Flow:

```text
JWT Created
    ↓
Cookie Set
    ↓
Browser Stores Cookie
```

---

# Step 5: Verify Cookie Exists

Open browser developer tools:

```text
Application
  └── Cookies
       └── localhost
```

Look for:

```text
auth-token
```

If present, login is working correctly.

---

# Step 6: Create /api/me

Create:

```text
app/api/me/route.js
```

Purpose:

Determine who is currently logged in.

Flow:

```text
Cookie
   ↓
Verify JWT
   ↓
Extract User ID
   ↓
Find User
   ↓
Return User
```

Example response:

```json
{
  "user": {
    "id": "...",
    "email": "...",
    "username": "Ahmed"
  }
}
```

---

# Step 7: AuthContext

Purpose:

Store authentication state globally.

Without AuthContext:

```text
Navbar      → /api/me
Sidebar     → /api/me
Profile     → /api/me
Tweet Form  → /api/me
```

Many duplicate requests.

With AuthContext:

```text
/api/me
    ↓
AuthContext
    ↓
All Components
```

Only one request.

---

# AuthContext State

```js
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
```

Purpose:

```text
user     → current logged-in user
loading  → auth initialization status
```

---

# App Startup Flow

```text
App Loads
    ↓
AuthProvider
    ↓
GET /api/me
    ↓
Verify Cookie
    ↓
Return User
    ↓
setUser()
```

User remains logged in after refresh.

---

# login()

Purpose:

Provide one reusable login function.

Flow:

```text
Signin Page
    ↓
login()
    ↓
POST /api/signin
    ↓
Cookie Created
    ↓
User Returned
    ↓
setUser()
```

---

# logout()

Purpose:

Remove authentication state.

Flow:

```text
Logout Button
    ↓
POST /api/logout
    ↓
Delete Cookie
    ↓
setUser(null)
```

---

# Create Logout Route

Create:

```text
app/api/logout/route.js
```

Example:

```js
export async function POST() {
  const response = NextResponse.json({
    message: "Logged out",
  });

  response.cookies.delete("auth-token");

  return response;
}
```

---

# isAuthenticated

Instead of:

```js
if (user)
```

Use:

```js
isAuthenticated: !!user
```

Behavior:

```text
user exists  → true
user null    → false
```

---

# Final Authentication Flow

## Login

```text
Signin Form
    ↓
login()
    ↓
POST /api/signin
    ↓
JWT Generated
    ↓
Cookie Created
    ↓
setUser()
```

---

## Refresh

```text
Refresh Page
    ↓
AuthProvider
    ↓
GET /api/me
    ↓
Verify JWT
    ↓
Return User
    ↓
setUser()
```

User stays logged in.

---

## Logout

```text
Logout Button
    ↓
logout()
    ↓
POST /api/logout
    ↓
Delete Cookie
    ↓
setUser(null)
```

---

# Project Structure

```text
app/
├── api/
│   ├── signup/
│   │   └── route.js
│   ├── signin/
│   │   └── route.js
│   ├── logout/
│   │   └── route.js
│   └── me/
│       └── route.js
│
├── context/
│   └── AuthContext.js
│
├── signin/
│   └── page.jsx
│
├── signup/
│   └── page.jsx
│
└── home/
    └── page.jsx
```

---

# Roadmap

```text
✅ Signup Route
✅ Signin Route
✅ JWT Generation
✅ Cookie Creation
✅ /api/me
⬜ AuthContext
⬜ Logout Route
⬜ Route Protection Middleware
```
