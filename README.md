# 📅 Scheduler App

A task scheduling application built with **Python (Flask)** for the backend and **HTML, CSS, and JavaScript** for the frontend.

The application allows users to create, update, delete, and manage tasks through a clean web interface while communicating with a Flask REST API.

---

## 🚀 Features

- Create new tasks
- View all tasks
- View task details
- Update existing tasks
- Delete tasks
- Reminder notifications
- Responsive task dashboard
- Popup forms for adding and updating tasks
- Message dialogs for success and error feedback
- Modular JavaScript architecture

---

## 📸 Screenshots

> Screenshots will be added soon.

---

## 🛠 Tech Stack

### Backend

- Python
- Flask
- JSON file storage
- REST API

### Frontend

- HTML5
- CSS3
- JavaScript (ES6 Modules)

### Development Tools

- Git
- GitHub

---

## 📂 Project Structure

```
schedulerApp/

├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   └── ...
│
├── frontend/
│   ├── css/
│   ├── html/
│   ├── js/
│   │   ├── handlers/
│   │   ├── services/
│   │   ├── UI/
│   │   ├── utilities/
│   │   └── app.js
│   └── ...
│
├── logs/
├── README.md
└── requirements.txt
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/JohnMawe/schedulerApp.git
```

Move into the project

```bash
cd schedulerApp
```

Create a virtual environment

```bash
python -m venv .venv
```

Activate it

Linux / macOS

```bash
source .venv/bin/activate
```

Windows

```bash
.venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the Flask server

```bash
python app.py
```

Open the frontend in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/<id>` | Get one task |
| POST | `/tasks` | Create task |
| PUT | `/tasks/<id>` | Update task |
| DELETE | `/tasks/<id>` | Delete task |
| GET | `/reminders` | Check reminders |

---

## 🧠 What I Learned

This project helped me learn:

- JavaScript Modules
- DOM Manipulation
- Async/Await
- Fetch API
- REST APIs
- Flask
- Clean Code
- Separation of Concerns
- UI State Management
- Git & GitHub Workflow

---

## 🚧 Roadmap

Upcoming improvements include:

- SQLite database
- SQLAlchemy ORM
- User authentication
- User authorization
- Login and registration
- PostgreSQL support
- Responsive mobile design
- Search tasks
- Filter tasks
- Task categories
- Dark mode
- Docker support
- Automated tests
- CI/CD pipeline
- React frontend

---

## 📈 Project Evolution

This project began as a Command Line Interface (CLI) task scheduler and has gradually evolved into a modular web application.

Completed milestones:

- ✅ Python CLI application
- ✅ Flask REST API
- ✅ JavaScript frontend
- ✅ Modular ES6 architecture
- ✅ Interactive task dashboard
- ✅ Notification system
- ✅ GitHub feature branch workflow

Future milestones:

- 🔲 SQLAlchemy
- 🔲 PostgreSQL
- 🔲 Authentication & Authorization
- 🔲 React frontend
- 🔲 React Native mobile app
  
---

## 🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**John Mawe**

GitHub:
https://github.com/JohnMawe
