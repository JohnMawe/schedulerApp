const route = "http://192.168.0.2:5100/tasks";

async function getTasks() {
    const response = await fetch("http://127.0.0.1:5100/tasks");
    const data = await response.json();
    console.log(data);
}

async function getTask(id) {
    const response = await fetch(`http://127.0.0.1:5100/tasks/${id}`);
    
    const data = await response.json();
    console.log(data);
}

async function addTask() {
    const newTask = {
        title: "Money",
        start: "2026-05-29 18:40",
        end: "2026-05-29 18:45",
        note: "every day",
        reminder: 1
    };

    const response = await fetch("http://127.0.0.1:5100/tasks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
    });

    const data = await response.json();
    console.log(data);
}

async function updateTask(id) {
    const newTask = {
        title: "Make Money",
        start: "2026-05-29 18:47",
        end: "2026-05-29 18:50",
        note: "every day"
    };
    
    const response = await fetch(`http://127.0.0.1:5100/tasks/${id}`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
    });
    
    const data = await response.json();
    console.log(data);
}

async function deleteTask(id) {
    const response = await fetch(`http://127.0.0.1:5100/tasks/${id}`, {
        method: "DELETE"
    });
    
    const data = await response.json();
    console.log(data);
}

async function checkReminders() {
    const response = await fetch("http://127.0.0.1:5100/tasks/reminders");
    
    const data = await response.json();
    console.log(data);
}
