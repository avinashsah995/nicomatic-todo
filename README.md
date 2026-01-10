# 📋 Shared To-Do List: Complete Technical & Operational Manual

This project is a real-time, collaborative task management system. It allows multiple people to add, delete, and check off tasks on a single list that synchronizes instantly across all devices.

---

## 🏗️ 1. Technologies Used & The "Why"

We chose a "Modern Full-Stack" architecture. Here is every technology used and the logic behind it:

### Frontend (The User Interface)
*   **React (v19)**: This is the "Engine" of the interface. We used it because it allows us to build "Components" (reusable blocks like buttons or list items). When something changes (like a task being added), React only updates the specific part of the screen that changed, making the app very fast.
*   **Vite**: Think of this as the "Turbo-charger" for development. It helps us see changes instantly as we write code and builds the final website into a very small, fast package.
*   **Tailwind CSS (v4)**: This is our "Styling Tool." Instead of writing thousands of lines of custom design code, we use pre-defined "utility classes." We used it because it makes creating "Premium" effects (like the blurred glass background) extremely consistent and fast.
*   **Framer Motion**: This is our "Animation Studio." It handles physics-based movements. We used it to make tasks slide in and out smoothly, which makes the app feel "premium" and expensive rather than clunky.

### Backend (The Brain)
*   **NestJS**: This is a powerful "Server Framework." We chose it because it forces us to write code in a "Modular" way. It’s organized into "Modules" (like folders) for each feature. This helps ensure the codebase is well-structured and industry-ready..
*   **Socket.io**: This is the "Messenger." Traditional websites only talk to the server when you click a button. Socket.io keeps a "Live Line" open. This is why when you add a task, it appears on your friend's screen instantly without them having to refresh.

### Data & Infrastructure
*   **PostgreSQL**: This is our "Filing Cabinet" (Database). It’s a Relational Database. We chose it over others (like MongoDB) because to-do lists have "Fixed Information" (ID, title, status). PostgreSQL ensures that no two people can accidentally corrupt the same piece of data at the same time.
*   **Prisma ORM**: This is the "Translator." It translates our code into Database language (SQL). It also provides "Type Safety," meaning if we make a mistake in our code, the system will tell us *before* we even run the app.
*   **Docker**: This is the "Shipping Container." It bundles the entire app (Database + Server + Website) into a single package. This ensures that if it runs on my computer, it will run exactly the same on yours.

---

## 🧠 2. The Thought Process (Architecture)

### Why not a Cloud Database (like Supabase or MongoDB Atlas)?
1.  **Isolation**: Running PostgreSQL inside Docker makes the application self-contained. There’s no need to create external accounts or depend on an internet connection for the database, which keeps the setup portable and offline-ready.
2.  **Infrastructure Knowledge**: Self-hosting PostgreSQL within Docker demonstrates familiarity with container networking, volumes, and service orchestration, which are valuable when deploying real applications.

### The "Sync" Logic
Instead of the frontend constantly asking the server "Are there new tasks?", we use an **Event-Driven Architecture**:
1.  User clicks "Add."
2.  Frontend sends a "Save this" request.
3.  Server saves to Database.
4.  Server "Shouts" to every connected device: "Hey, task #123 was just added!"
5.  Every device updates its screen instantly.

---

## 📁 3. File-by-File Breakdown (The Anatomy)

### Root Directory
*   `docker-compose.yml`: The "Instruction Manual" for Docker. It tells the computer to start three separate "machines": The Database, the Backend, and the Frontend.

### /backend/ (The Server)
*   `prisma/schema.prisma`: **The Source of Truth**. This file defines exactly what a "Task" looks like.
*   `src/tasks/tasks.controller.ts`: The "Receptionist." It receives requests from the internet and sends them to the right place.
*   `src/tasks/tasks.service.ts`: The "Worker." It does the actual job of talking to the database.
*   `src/tasks/tasks.gateway.ts`: The "Broadcaster." It handles the live WebSockets to sync data across users.
*   `src/prisma.service.ts`: A small helper that makes sure the server stays connected to the database.

### /frontend/ (The Website)
*   `src/App.tsx`: The "Main Controller." It holds the current list of tasks and handles the live updates.
*   `src/components/TaskInput.tsx`: The "Input Box." It captures what you type and sends it to the server.
*   `src/components/TaskItem.tsx`: The "Rows." It renders each individual task with its checkbox and delete button.
*   `src/services/api.ts`: The "Phone Line." It contains all the functions to send data to the server.
*   `src/services/socket.ts`: The "Live Wire." It sets up the persistent connection for instant updates.
*   `src/index.css`: The "Style Sheet." It contains the Tailwind 4 design logic and our "Premium" glass effects.

---

## 🚀 4. How to Run (Absolute Guide)

### Step 1: Install Docker
Download and install **Docker Desktop** from [docker.com](https://www.docker.com/).

### Step 2: Open Terminal
Open your terminal (or Command Prompt) in the project folder.

### Step 3: Launch everything
Run this single command:
```bash
docker compose up --build
```
*Wait about 2-3 minutes for the first build. It is downloading the database, installing all the "Brain" parts, and building the website.*

### Step 4: Open the App
Go to your browser and type:
`http://localhost:5173`

---

## 🧹 5. How to Clean Up
When you are done and want to delete everything (to keep your computer clean):
```bash
docker compose down -v
```
*(The `-v` removes the hidden database files so it clears up disk space.)*
