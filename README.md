# CLI Scheduler App 
A backend-focused CLI scheduler application built with Python.
The project focuses on:
- clean backend architecture
- Task scheduling
- reminder systems
- timestamp handling
- file integrity
- testing
- recovery systems


# Features
## Task Management 
- Add tasks
- View tasks
- Update tasks
- Delete tasks
- Task ID tracking

## Reminder System
- Reminder before task starts
- In-progress notifications
- Notification state tracking

## Time system
- UNIX timestamp-based scheduling
- Local time conversion utilities
- Time utility abstraction layer

## Data Integrity
- Validation boundaries
- Atomic file writes
- Corrupt JSON recovery
- Automatic backups
- Recovery logging

## Testing
- Pytest test suite
- Temporary test file
- Reminder logic tests
- Integrity tests
- Recovery tests


# Installation
## Step 1:
Clone Repository

```bash
git clone https://github.com/JohnMawe/schedulerApp.git
cd schedulerApp
```

## Step 2:
Create Virtual Environmet

Linux/macOS:


```bash
python -m venv venv
source venv/bin/activate
```

Windows:


```bash
python -m venv venv
venv/Scripts/activate
```


## Step 3:
Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 3:
Run Application

```bash
python main.py
```


# Core Backend Concepts Practiced
This projecg intentionally focused on backend engineering concepts.

## Encapsulation
- Internal state protection
- Controlled state mutation
- Validation through methods

## Validation Boundaries
- UI input validation
- File validation 
- Business rule enforcement
- Time integrity chacks

## Atomic Writes
Data is first written to a temporary file before replacing the original.
This prevents:

- partial writes
- file corruption diring crashes

## Recovery System
If corrupt JSON is detected:

1. backup is created
2. recovery logged
3. clean file recreated
4. application re.ains usable

## Immutable Thinking
The project explores:

- controlled mutations
- safe access patterns
- stable task identities

## Testing Philosophy
Tests focus on:

- logic behavior
- integrity rules
- predictable system behavior

UI printing is intentionally separatef from logic testing.


# Technologies Used
- Python
- Pytest
- JSON
- pathlib
- datetime
- Git & GitHub
