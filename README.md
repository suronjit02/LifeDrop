# 🩸 Blood Donation Management System (LifeDrop)

A full-stack MERN web application designed to connect blood donors with recipients efficiently. This platform enables users to create, manage, and respond to blood donation requests in a structured and user-friendly way.

---

## 🚀 Live Demo

🔗 Live Site: https://lifedrop-donation.netlify.app/

🔗 Client Repo: https://github.com/suronjit02/LifeDrop/tree/main/lifedrop-client

🔗 Server Repo: https://github.com/suronjit02/LifeDrop/tree/main/lifedrop-backend

---

## 🎯 Purpose

The main goal of this application is to simplify the blood donation process by:

* Connecting donors with recipients
* Managing donation requests efficiently
* Providing role-based dashboards for better control
* Encouraging people to donate blood and save lives

---

## ✨ Key Features

### 🔐 Authentication & Security

* Email & Password Authentication (Firebase)
* JWT-based API protection
* Environment variable secured credentials (Firebase & MongoDB)

### 👤 User Roles

* **Admin**: Full access (user management, requests, funding)
* **Donor**: Create & manage own donation requests
* **Volunteer**: Manage requests (limited access)

### 🩸 Donation Management

* Create, update, delete donation requests
* Donation status flow:

  * `Pending → In Progress → Done / Canceled`
* View request details and donate

### 📊 Dashboard System

* Role-based dashboards
* Profile management with editable form
* Admin statistics (users, funds, requests)

### 🔍 Search System

* Search donors by:

  * Blood group
  * District
  * Upazila

### 💰 Funding System (Stripe)

* Users can donate funds
* Funding history table
* Total funding shown in dashboard

### 📱 Responsive UI

* Fully responsive (Mobile, Tablet, Desktop)
* Clean and modern design
* Consistent UI/UX across all pages

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Tailwind CSS / DaisyUI
* React Router
* Axios
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* JWT (JSON Web Token)

### Payment

* Stripe

---

## 📁 Project Structure

### Client Side

```
src/
 ├── components/
 ├── pages/
 ├── layouts/
 ├── hooks/
 ├── routes/
 └── utils/
```

### Server Side

```
server/
 ├── routes/
 ├── controllers/
 ├── middleware/
 ├── config/
 └── index.js
```

---

## ⚙️ Environment Variables

### Client (.env)

```
VITE_API_URL=your_api_url
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
```

### Server (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
```

---

## 📌 Important Functionalities

* Role-based route protection
* Private routes persistence (reload safe)
* No CORS / 404 / 504 errors in production
* Smooth navigation without reload errors
* Pagination & filtering system

---

## 🧪 Challenges Implemented

* JWT authentication
* Stripe payment integration
* Admin dashboard statistics
* Pagination & filtering
* Protected private routes

---

## 📷 UI Highlights

* Clean & minimal design
* Consistent color scheme
* Equal card layout
* Sidebar-based dashboard
* User-friendly interaction

---

## 📦 NPM Packages Used

* axios
* react-router-dom
* firebase
* jsonwebtoken
* stripe
* dotenv
* mongoose
* express
* cors

---

## 🧑‍💻 Author

**Suronjit Sutradhar**
📘 CSE Student | MERN Stack Developer

---

## 💡 Future Improvements

* Email verification & password reset
* Real-time notification system
* Advanced analytics (charts)
* Mobile app version

---

## ❤️ Final Note

This project is built with the goal of helping people connect and save lives through blood donation. Feedback and contributions are always welcome!
