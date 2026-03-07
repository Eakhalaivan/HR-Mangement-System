# 🚀 HR Management System

![Java](https://img.shields.io/badge/Backend-Java-orange)
![Spring Boot](https://img.shields.io/badge/Framework-SpringBoot-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![MySQL](https://img.shields.io/badge/Database-MySQL-lightgrey)
![License]

A **Full Stack HR Management System** designed to manage employee records, authentication, and administrative operations efficiently.
The application provides a **secure REST API backend using Spring Boot** and a **modern frontend interface for HR administrators and employees**.

---

# 📌 Features

## 🔐 Authentication & Authorization

* Secure user registration and login
* JWT-based authentication
* Role-based access control
* Protected API endpoints

## 👨‍💼 Employee Management

* Add new employees
* Update employee details
* Delete employees
* View employee list
* Search employee records

## 📊 Dashboard

* Employee statistics overview
* Total employee count
* Quick HR metrics

## 🛡 Security

* Spring Security integration
* Role-based endpoint protection
* Token authentication using JWT

---

# 🏗 System Architecture

```
Frontend (React)
       │
       ▼
REST API (Spring Boot)
       │
       ▼
Service Layer
       │
       ▼
Repository Layer
       │
       ▼
MySQL Database
```

---

# 🖥 Screenshots

## Login Page

![Login](screenshots/login.png)

## Dashboard

![Dashboard](screenshots/dashboard.png)

## Employee Management

![Employees](screenshots/employees.png)

*(Create a folder called `screenshots` and add images here)*

---

# ⚙️ Technology Stack

## Frontend

* React.js
* HTML5
* CSS3
* Axios
* Bootstrap / Tailwind

## Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* REST API

## Database

* MySQL

## Tools

* Maven
* Postman
* Git
* GitHub

---

# 📂 Project Structure

```
hr-management-system
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
├── backend
│   ├── controller
│   │   ├── AuthController
│   │   ├── EmployeeController
│   │   └── DashboardController
│   │
│   ├── entity
│   ├── repository
│   ├── service
│   ├── security
│   └── config
│
└── README.md
```

---

# 📡 API Documentation

## Authentication APIs

### Login

```
POST /api/auth/signin
```

Request Body

```json
{
"username": "admin",
"password": "password"
}
```

Response

```json
{
"token": "jwt-token"
}
```

---

### Register User

```
POST /api/auth/signup
```

---

## Employee APIs

### Get All Employees

```
GET /api/employees
```

### Get Employee By ID

```
GET /api/employees/{id}
```

### Create Employee

```
POST /api/employees
```

### Update Employee

```
PUT /api/employees/{id}
```

### Delete Employee

```
DELETE /api/employees/{id}
```

---

# 🗄 Database Schema (Example)

Employee Table

| Field      | Type   |
| ---------- | ------ |
| id         | Long   |
| name       | String |
| email      | String |
| department | String |
| salary     | Double |

---

# 🚀 Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/your-username/hr-management-system.git
cd hr-management-system
```

---

## 2️⃣ Backend Setup

Navigate to backend folder

```
cd backend
```

Update database configuration in:

```
src/main/resources/application.properties
```

Example configuration:

```
spring.datasource.url=jdbc:mysql://localhost:3306/hrms
spring.datasource.username=root
spring.datasource.password=password
```

Run the backend

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## 3️⃣ Frontend Setup

Navigate to frontend

```
cd frontend
```

Install dependencies

```
npm install
```

Run frontend

```
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🧪 API Testing

You can test APIs using:

* Postman
* Swagger
* Curl

Example curl request

```
curl -X GET http://localhost:8080/api/employees
```

---

# 🔮 Future Improvements

* Leave management system
* Payroll module
* Attendance tracking
* Performance evaluation
* Employee self-service portal
* Email notifications

---

# 👨‍💻 Author

Developed as a **Full Stack HR Management System Project** using Spring Boot and React.

---

# 📜 License

This project is licensed under the  License.
