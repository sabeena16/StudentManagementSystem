# Student Management System

A full-stack Student Management System developed using Django REST Framework, HTML, CSS, JavaScript, and SQLite.

## Features

- Add new students
- View all students
- Update student information
- Delete students
- Input validation
- Email validation
- Age validation
- Duplicate email prevention
- REST API integration
- SQLite database

## Technologies Used

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Python
- Django
- Django REST Framework
- django-cors-headers

### Database

- SQLite

## Project Structure

```text
StudentManagementSystem/
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3
│   │
│   ├── student_api/
│   │   └── ...
│   │
│   └── students/
│       ├── models.py
│       ├── views.py
│       ├── migrations/
│       └── ...
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md

## Student Fields

Each student contains:

- ID
- Name
- Email
- Age
- Course

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students/` | Get all students |
| POST | `/api/students/create/` | Create a student |
| PUT | `/api/students/<id>/` | Update a student |
| DELETE | `/api/students/delete/<id>/` | Delete a student |

## Validation

The system validates:

- All required fields must be entered.
- Age must be a number.
- Age must be greater than 0.
- Email must contain a valid email format.
- Duplicate email addresses are not allowed.

## How to Run

### 1. Start the Backend

Open a terminal inside the `backend` folder.

Run:

```powershell
.\venv\Scripts\python.exe manage.py runserver