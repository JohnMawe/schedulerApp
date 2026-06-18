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


const selectedRenderArea = document.querySelector(".selectedContainer");
const selectedArea = document.querySelector("#selectedArea");
const tasksContainer = document.querySelector(".tasksContainer");
const tasksArea = document.querySelector("#tasksArea");
const titleArea = document.querySelector("#titleArea");
const descriptionArea = document.querySelector("#descriptionArea");
const beginsArea = document.querySelector("#beginsArea");
const dueArea = document.querySelector("#dueArea");
const  taskForm = document.querySelector("#taskForm");
const taskFormClass = document.querySelector(".taskForm");
const notificationArea = document.querySelector("#notificationArea");
const notificationContainer = document.querySelector(".notificationContainer");
const messageArea = document.querySelector("#messageArea");

let getTaskId = null
function handleGetTaskID(taskId) {
    if (taskId !==undefined && taskId !== " " && taskId !== null) {
        getTaskId = taskId;
    }
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
        renderTasks(data.data, tasksArea, showTask, handleGetTaskID);
        document.querySelector("#addTaskBTN").addEventListener("click",  () => {
            taskFormClass.classList.toggle("activate");
        });

    }else{
        renderError(data.message, messageArea);
    }
}

// Get task info from backend and display it. Task ID is taken from form input.
async function showTask(id) {
    console.log(id);
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
        rendersSelectedTask(data.data, titleArea, descriptionArea, beginsArea, dueArea);
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
                taskForm.reset()
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
                taskForm.reset()
                renderSuccess(updateNewTask.message, messageArea);
                await showTasks();
            }else {
                renderError(updateNewTask.message, messageArea);
            }
    }});


async function deleteRender(){
    const id = getTaskId;
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
        // Refresh task to show new update
        await showTasks()
        // Clear Details dashboard
        selectedRenderArea.classList.remove("activate");
        // Activate home dashboard
        tasksContainer.classList.remove("deactivate");
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

document.querySelector("#deleteTaskBTN").addEventListener("click", deleteRender);

document.querySelector("#notificationLink").addEventListener("click", async () => {
    selectedRenderArea.classList.remove("activate");
    tasksContainer.classList.add("deactivate");
    notificationContainer.classList.add("activate");
    await notification();
});

document.querySelector("#backBTN").addEventListener("click",  () => {selectedRenderArea.classList.remove("activate"); tasksContainer.classList.remove("deactivate"); });

document.querySelector("#notifBackBTN").addEventListener("click",  () => {tasksContainer.classList.remove("deactivate"); notificationContainer.classList.remove("activate"); });