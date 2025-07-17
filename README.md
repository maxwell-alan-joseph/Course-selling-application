# Course Selling Application

A full-stack course marketplace built with Node.js and Express.js.

## Features

**Users:** Browse courses, purchase, view owned courses  
**Admins:** Create, update, delete courses

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- Cookie-based authentication
- Rate limiting middleware

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/maxwell-alan-joseph/Course-selling-application.git
   cd Course-selling-application
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file with your MongoDB connection string
   ```env
   DB_CONNECTION_STRING=your_mongodb_connection_string
   PORT=3000
   ```

4. Run locally
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser

## API Routes

### User
- `POST /user/signup` - Register
- `POST /user/login` - Login  
- `GET /user/courses` - View all courses
- `POST /user/purchase` - Buy course
- `GET /user/purchases` - View owned courses

### Admin
- `POST /admin/signup` - Register
- `POST /admin/login` - Login
- `POST /admin/course` - Create course
- `PUT /admin/course` - Update course
- `DELETE /admin/course` - Delete course

## Database Models

- **User:** name, email, password, purchasedCourses
- **Admin:** name, email, password
- **Course:** title, description, price, createdBy, content
- **Purchase:** userId, courseId, purchaseDate

🔐 Security Measures

🔐 Hashed Passwords – Stored using bcryptjs

🍪 Cookie Authentication – Maintains secure sessions

🛡️ CORS Policy – Prevents unauthorized cross-origin access

🧼 Input Validation – Prevents injection & malformed input

---

*Educational project from Cohort 3.0 week 8*