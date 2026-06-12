import {getTasks, deleteTask, checkReminders, getTask} from "./services/tasksAPI.js";

import {
    renderTasks,
    rendersSelectedTask,
    renderReminders,
    renderError,
    renderWarning,
    renderSuccess
} from "./UI/renderer.js";

import {handleSaveAction, handleUpdateAction} from "./handlers/btnClickHandler.js";


const tasksArea = document.querySelector("#tasksArea");
const selectedTaskArea = document.querySelector("#selectedTask");
const  taskForm = document.querySelector("#taskForm");
const notificationArea = document.querySelector("#notificationArea");
const messageArea = document.querySelector("#messageArea");

// Do NOT read the task ID once at module load time. The input may be empty then
// or may change later. Use a getter so we always read the current value and
// avoid a null-element "enter id" error when the element isn't present yet.
function getTaskId() {
    const el = document.getElementById("taskId");
    return el ? el.value : "";
}

// Format Date and Time to "YYYY-MM-DD HH:MM"

window.addEventListener("load", async () => {
   await showTasks();
});


// Get all tasks from backend and display them in the task list.
async function showTasks() {
    const response = await getTasks();
    if (!response.success) {
        renderError(response.message, messageArea);
        return;
    }
    const data = response.data

    if (data.success) {
        renderTasks(data["CLI_data"], tasksArea);
    }else{
        renderError(data.message, messageArea);
    }
}

// Get task info from backend and display it. Task ID is taken from form input.
async function showTask() {
    const id = getTaskId();
    if (!id) {
        renderWarning("Please enter a task ID");
        return;
    }

    const response = await getTask(id);
    if (!response.success) {
        alert(response.message);
        renderError(response.message, messageArea);
        return;
    }
    const data = response.data;
    if (data.success) {
        rendersSelectedTask(data["CLI_data"], selectedTaskArea);
    } else {
        renderError(data.message, messageArea);
    }
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
            const response = await handleSaveAction(title, rawStart, rawEnd, note, reminder);

            if(!response.success) {
                renderError(response.message, messageArea);
                return;
            }
            const addNewTask = response.data
            if(addNewTask.success) {
                renderSuccess(addNewTask.message, messageArea);
                await showTasks();
            }

//Updates task
    } else if (clickedButton === "update") {
        const id = getTaskId();
        if (!id) {
            renderWarning("Please enter a task ID");
            return;
        }

        const response = await handleUpdateAction(id, title, rawStart, rawEnd, note);

        if(!response.success) {
            renderError(response.message, messageArea);
            return;
        }
        const updateNewTask = response.data
            if(updateNewTask.success) {
                renderSuccess(updateNewTask.message, messageArea);
                await showTasks();
            }else {
                renderError(updateNewTask.message, messageArea);
            }
    }});


async function deleteRender(){
    const id = getTaskId();
    if (!id) {
        renderWarning("Please enter a task ID");
        return;
    }

    const response = await deleteTask(id);
    if (!response.success) {
        renderError(response.message, messageArea);
        return;
    }

    const data = response.data;

    if (data.success) {
        renderSuccess(data.message, messageArea);
        await showTasks()
    } else {
        renderError(data.message, messageArea);
    }
}

async function notification() {
    const response = await checkReminders();
    if (!response.success) {
        renderError(response.message, messageArea);
        return;
    }
    const data = response.data;

    if (data.success) {
        renderReminders(data.data, notificationArea);
    } else {
        renderError(data.message, messageArea);
    }
}

document.querySelector("#getTasksBtn").addEventListener("click", showTasks);

document.querySelector("#getTaskIdBtn").addEventListener("click", showTask);

document.querySelector("#deleteTaskBtn").addEventListener("click", deleteRender);

document.querySelector("#checkRemindersBtn").addEventListener("click", notification);



