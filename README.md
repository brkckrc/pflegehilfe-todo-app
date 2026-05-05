# Pflegehilfe Todo App

A full-stack ToDo application built as part of a technical assignment.

## 🧰 Tech Stack

### Backend
- C# / ASP.NET Core (.NET 9)
- Entity Framework Core
- SQLite

### Frontend
- React
- TypeScript
- Vite

---

## ⚙️ Prerequisites

Make sure the following tools are installed on your system:

- .NET 9 SDK → https://dotnet.microsoft.com/download
- Node.js (v18+) → https://nodejs.org/
- npm (comes with Node.js)

---

## 🚀 Features

- Create tasks (must be longer than 10 characters)
- Optional deadline selection
- Overdue tasks are highlighted in red
- Mark tasks as done
- Delete tasks
- Persistent data storage using SQLite
- Responsive and modern UI

---

## 🧠 Architecture

The application follows a clean structure:

### Backend
- Domain → Entities
- Persistence → EF Core (SQLite)
- API → Controllers
- Dependency Injection → Configured in Persistence layer

### Frontend
- React + TypeScript
- Simple state management with hooks

---

## 🗄️ Data Persistence

All data is stored in a SQLite database using Entity Framework Core.

---

## 🌍 Date Handling

The date input is handled by the browser and adapts to the user's locale.

The backend uses a standardized ISO format (yyyy-MM-dd) for consistency.

---

## ⚠️ Notes

- The deadline field is optional
- Tasks with past deadlines are visually marked as overdue
- Completed tasks are displayed with a line-through style

---

## 🔄 Possible Improvements

- Soft delete instead of hard delete (e.g. IsDeleted flag)
- Authentication & user-based tasks
- Pagination / filtering
- Unit tests
- Docker support

---

## ▶️ How to Run

### Backend

cd backend/Pflegehilfe.TodoApi  
dotnet run  

API will run on:  
http://localhost:5256  

---

### Frontend

cd frontend/pflegehilfe-todo-ui  
npm install  
npm run dev  

App will run on:  
http://localhost:5173  

---

## 📌 Final Note

This project was implemented with a focus on clean structure, simplicity, and fulfilling the given requirements.

In a real-world scenario, additional features such as soft delete, logging, and advanced validation could be added.

The application focuses on simplicity, correctness, and meeting all requirements without unnecessary complexity.
