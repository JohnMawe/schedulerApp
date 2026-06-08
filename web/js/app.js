import {addTask, getTasks, updateTask, deleteTask, checkReminders, getTask} from "./services/tasksAPI.js";

import {formatDateTime} from "./utilities/dateFomatter.js";

const taskList = document.querySelector("#taskList");
const selectedTaskArea = document.querySelector("#selectedTask");
const  taskForm = document.querySelector("#taskForm");
const notification = document.querySelector("#notification");

// Format Date and Time to "YYYY-MM-DD HH:MM"

window.addEventListener("load", async () => {
   await renderTasks();
});

// Get all tasks from backend and display them in the task list.
async function renderTasks() {
    const response = await getTasks();
    if (!response.success) {
        alert(response.message);
        return;
    }
    const data = response.data;
    console.log(data);
    if (data.data.length === 0) {
        taskList.innerHTML = "";
        const taskElement = document.createElement("p");
        taskElement.innerText = "+ADD TASK";
        taskList.append(taskElement);
        return;
        }

    if (!data.success) {
        console.log(data.message);
        alert(data.message);
        return;
    }

    taskList.innerHTML = "";
    const tasks = data["CLI_data"];
    for (const task of tasks) {
        const taskElement = document.createElement("p");
        taskElement.innerHTML = task
        taskList.append(taskElement);
    }
}

// Get task info from backend and display it. Task ID is taken from form input.
async function getTaskId() {

    const id = document.getElementById("taskId").value;
    if (!id) {
        console.error("Please enter a task ID");
        alert("Please enter a task ID");
        return;
    }

    const response = await getTask(id);
    if (!response.success) {
        alert(response.message);
        return;
    }
    const data = response.data;
    if (!data.success){
        alert(data.message);
        return;
    }
    const taskElement = document.createElement("p");
    selectedTaskArea.innerHTML = "";
    taskElement.innerText = data["CLI_data"];
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
            start: formatDateTime(rawStart),
            end: formatDateTime(rawEnd),
            note: note,
            reminder: reminder
        };
        const response = await addTask(newTask);
        if (!response.success) {
            alert(response.message);
            return;
        }

        const addResponse = response.data;
        if (addResponse.success) {
            alert(addResponse.message);
            await renderTasks()
        } else {
            alert(addResponse.message);
        }

//Updates task
    } else if (clickedButton === "update") {

        // Clean data form - if the user leaves a field empty, it will be sent as null to the backend, which will keep the old value.
        let taskTitle = (!title) ? null : title;
        let startTime = (!rawStart) ? null : formatDateTime(rawStart);
        let endTime = (!rawEnd) ? null : formatDateTime(rawEnd);
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

        const response = await updateTask(id, newTask);
        if (!response.success) {
            alert(response.message);
            return;
        }

        const updateResponse = response.data;
        if (!updateResponse.success) {
            alert(updateResponse.message);
            await renderTasks()
        } else {
            alert(updateResponse.message);
        }
    }});


async function deleteRender(){
    const id = document.getElementById("taskId").value;

    if (!id) {
        console.error("Please enter a task ID");
        alert("Please enter a task ID");
        return;
    }

    const response = await deleteTask(id);
    if (!response.success) {
        alert(response.message);
        return;
    }

    const data = response.data;

    if (data.success) {
        alert(data.message);
        await renderTasks()
    } else {
        alert(data.message);
    }
}

async function renderReminders() {
    const response = await checkReminders();
    if (!response.success) {
        alert(response.message);
        return;
    }
    const data = response.data;

    if (data.success) {
        if (data.data.length > 0) {
            notification.innerHTML = "";
            for (const reminder of data.data) {
                const reminderElement = document.createElement("p");
                reminderElement.innerText = reminder;
                notification.append(reminderElement);
            }
        } else {
            alert("Notification unavailable");
        }
    } else {
        alert(data.message);
    }
}

document.querySelector("#getTasksBtn").addEventListener("click", renderTasks);

document.querySelector("#getTaskIdBtn").addEventListener("click", getTaskId);

document.querySelector("#deleteTaskBtn").addEventListener("click", deleteRender);

document.querySelector("#checkRemindersBtn").addEventListener("click", renderReminders);



