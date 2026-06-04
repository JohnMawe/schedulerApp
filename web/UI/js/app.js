const route = "http://127.0.0.1:5100/tasks";
const taskList = document.querySelector("#taskList");
const selectedTaskArea = document.querySelector("#selectedTask");
const  taskForm = document.querySelector("#taskForm");
const notification = document.querySelector("#notification");

// Format Date and Time to "YYYY-MM-DD HH:MM"
function formatDate(rawDate) {
    const date = new Date(rawDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-11
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return  `${year}-${month}-${day} ${hours}:${minutes}`;
}

window.addEventListener("load", async () => {
    await getTasks();
});

// Get all tasks from backend and display them in the task list.
async function getTasks() {
    const response = await fetch(route);
    const data = await response.json();
    console.log(data);

    if (data.length === 0) {
        alert("There is no tasks");
    }

    if (!data.success) {
        console.log(data.message);
        alert(data.message);
    }

    taskList.innerHTML = "";
    const tasks = data.CLI_data
    for (const task of tasks) {
        const taskElement = document.createElement("li");
        taskElement.innerHTML = task
        taskList.append(taskElement);
    }
}

//  Add new task to backend, then update task list. newTask is an object with the new task info.
async function addTask(newTask) {
    const response = await fetch(route, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
    });

    const data = await response.json();
    console.log(data);
    await getTasks()
    return data
}

// Update task with id, then update task list. newTask is an object with the new task info. If a field is null, it will keep the old value.
async function updateTask(id, newTask) {
    const response = await fetch(`http://127.0.0.1:5100/tasks/${id}`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)
    });

    const data = await response.json();
    console.log(data);
    await getTasks()
    return data
}

// Get task info from backend and display it. Task ID is taken from form input.
async function getTaskId() {
    const id = document.getElementById("taskId").value;

    if (!id) {
        console.error("Please enter a task ID");
        alert("Please enter a task ID");
        return;
    }
    const response = await fetch(`http://127.0.0.1:5100/tasks/${id}`);

    const data = await response.json();
    console.log(data);
    if (!data.success){
        alert(data.message);
    }

    const taskElement = document.createElement("p");
    selectedTaskArea.innerHTML = "";
    taskElement.innerText = data.CLI_data;
    selectedTaskArea.append(taskElement);
}

// Get task info from form, saves or updates, and update task list
taskForm.addEventListener("submit", async (event) => {
    // Keeps the page reloading when the form is submitted, allowing us to handle the submission with JavaScript instead of the default browser behavior.
    event.preventDefault();
    // Detect which button triggered the form submission
    const clickedButton = event.submitter.value;

    // Browser checks 'required' FIRST. This block only runs if Valid!
    const title = document.getElementById("taskTitle").value;
    const rawStart = document.getElementById("taskStart").value;
    const rawEnd = document.getElementById("taskEnd").value;
    const note = document.getElementById("taskNote").value;
    const reminder = parseInt(document.getElementById("taskReminder").value);

        // Save task
        if (clickedButton === "save") {

        const newTask = {
            title: title,
            start: formatDate(rawStart),
            end: formatDate(rawEnd),
            note: note,
            reminder: reminder
        };
        const addResponse = await addTask(newTask);
        if (addResponse.success) {
            alert(addResponse.message);
        } else {
            alert(addResponse.message);
        }

//Updates task
    } else if (clickedButton === "update") {

        // Clean data form - if the user leaves a field empty, it will be sent as null to the backend, which will keep the old value.
        let taskTitle = (!title) ? null : title;
        let startTime = (!rawStart) ? null : formatDate(rawStart);
        let endTime = (!rawEnd) ? null : formatDate(rawEnd);
        let taskNote = (!note) ? null : note;
        console.log(taskTitle, startTime, endTime, taskNote);

        const newTask = {
            title: taskTitle,
            start: startTime,
            end: endTime,
            note: taskNote
        };

        const id = document.getElementById("taskId").value;
            if (!id) {
                console.error("Please enter a task ID");
                alert("Please enter a task ID");
                return;
            }
        const updateResponse = await updateTask(id, newTask);

        if (!updateResponse.success) {
            alert(updateResponse.message);
        } else {
            alert(updateResponse.message);
        }

    }});


async function deleteTask(){
    const id = document.getElementById("taskId").value;

    if (!id) {
        console.error("Please enter a task ID");
        alert("Please enter a task ID");
    }
    const response = await fetch(`http://127.0.0.1:5100/tasks/${id}`, {
        method: "DELETE"
    });
    
    const data = await response.json();
    console.log(data);
    if (data.success) {
        alert(data.message);
        await getTasks()
    } else {
        alert(data.message);
    }
}

async function checkReminders() {
    const response = await fetch(route + "/reminders");
    
    const data = await response.json();
    console.log(data);

    if (data.success) {
        if (data.data.length > 0) {
            notification.innerHTML = "";
            for (const reminder of data.data) {
                const reminderElement = document.createElement("p");
                reminderElement.innerText = reminder;
                notification.append(reminderElement);
            }
    } else {
        alert("Notification unavailable");}
    } else {
        alert(data.message);
    }
}
