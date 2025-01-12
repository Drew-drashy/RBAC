# 📝 Blog Platform with Role-Based Access Control (RBAC)

This is a full-stack **MERN** (MongoDB, Express.js, React, Node.js) blog platform implementing **Role-Based Access Control (RBAC)** with real-time updates and email verification.

---

## 🚀 Features

1. **Authentication & Authorization**  
   - JWT-based authentication.  
   - Role-based access (Admin/User).  

2. **Admin Panel**  
   - Create, delete blog posts.
   - Real-time updates using **Socket.IO**.

3. **User Panel**  
   - View blogs in real-time.

4. **Email Verification**  
   - Verification email sent upon registration.  
   - Users must verify before logging in.

5. **Aesthetic Dark Theme UI**  
   - Responsive UI using **Tailwind CSS**.  
   - Smooth transitions and hover effects.

---

## 🏗️ Project Structure

```
RBAC-Blog-Platform/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
├── .env
├── package.json
└── README.md
```

---

## 🔧 Installation & Setup

### 1. **Clone the Repository**
```bash
https://github.com/your-repo/rbac-blog-platform.git
cd rbac-blog-platform
```

### 2. **Backend Setup**
```bash
cd backend
npm install
```

**Create `.env` in `backend/`**
```env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

**Start Backend**
```bash
npm run dev
```

### 3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints

### **Auth Routes**
- `POST /api/auth/register` → Register (sends verification email)
- `POST /api/auth/login` → Login (checks email verification)
- `GET  /api/auth/verify/:token` → Email Verification

### **Blog Routes**
- `GET  /api/blogs` → View all blogs
- `POST /api/blogs` → Create blog (Admin only)
- `DELETE /api/blogs/:id` → Delete blog (Admin only)

---

## 📸 Screenshots

- **Login Page:** Dark-themed login with smooth transitions.  
- **Admin Dashboard:** Create/Delete blogs with real-time updates.  
- **Blog List:** Blogs load instantly with real-time changes.

---

## ✨ Future Enhancements

- Password Reset via Email 🔑
- Blog Editing Feature ✏️
- Role Management (Super Admin, Moderator)

---

## 📬 Contact

Drashy Sesodia  
📧 Email: drashysesodia110053@gmail.com  
🔗 GitHub: [your-github](https://github.com/Drew-drashy)
Admin Email: admin@rabc.com
Admin password: admin
---

**Enjoy blogging with security and real-time updates!** 🚀

