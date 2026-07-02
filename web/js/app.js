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
import {eleMent} from "./UI/uiElements.js";
import {
    hideHome, hideInfoContainer, hideNotifications,
    hideTaskDetails,
    hideUpdateTaskForm,
    showHome, showInfoContainer,
    showNotifications, showUpdateTaskForm,
    toggleAddTaskForm
} from "./UI/navigation.js";

let getTaskId = null
function handleGetTaskID(taskId) {
    if (taskId !==undefined && taskId !== " " && taskId !== null) {
        getTaskId = taskId;
    }
}

function showMessage(type, text) {
    showInfoContainer()
    if (type === "success") {
        renderSuccess(text, eleMent.messageArea);
    }
    if (type === "error") {
        renderError(text, eleMent.messageArea);
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
        showMessage("error", response.message);
        return;
    }
    const data = response.data

    if (data.success) {
        renderTasks(data.data, eleMent.tasksArea, showTask, handleGetTaskID);
        eleMent.addTaskBTN.addEventListener("click",  () => {
            toggleAddTaskForm()
        });

    }else{
        showMessage("error", data.message);
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
        showMessage("error", response.message);
        return;
    }
    const data = response.data;
    if (data.success) {
        rendersSelectedTask(data.data, eleMent.titleArea, eleMent.descriptionArea, eleMent.beginsArea, eleMent.dueArea);
    } else {
        showMessage("error", data.message);
    }
}

// Get task info from form, saves task
eleMent.addTaskForm.addEventListener("submit", async (event) => {
    // Keeps the page reloading when the form is submitted, allowing us to handle the submission with JavaScript instead of the default browser behavior.
    event.preventDefault();

    // Browser checks 'required' FIRST. This block only runs if Valid!
    const title = document.getElementById("taskTitle").value;
    const rawStart = document.getElementById("taskStart").value;
    const rawEnd = document.getElementById("taskEnd").value;
    const note = document.getElementById("taskNote").value;
    const reminder = parseInt(document.getElementById("taskReminder").value);

    // Save task

    const response = await handleSaveAction(title, rawStart, rawEnd, note, reminder);

    if (!response.success) {
        showMessage("error", response.message);
        return;
    }
    const addNewTask = response.data
    if (addNewTask.success) {
        eleMent.addTaskForm.reset()
        showMessage("success", addNewTask.message);
        await showTasks();
    } else {
        showMessage("error", addNewTask.message);
    }
})

//Updates task
eleMent.updateTaskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("newTitle").value;
        const rawStart = document.getElementById("newStart").value;
        const rawEnd = document.getElementById("newEnd").value;
        const note = document.getElementById("newNote").value;

        const id = getTaskId;
        if (!id) {
            renderWarning("Please enter a task ID");
            return;
        }

        const response = await handleUpdateAction(id, title, rawStart, rawEnd, note);

        if(!response.success) {
            showMessage("error", response.message);
            return;
        }
        const updateNewTask = response.data
        if(updateNewTask.success) {
            showMessage("success", updateNewTask.message);
            hideUpdateTaskForm()
            eleMent.updateTaskForm.reset()
            await showTasks();
        }else {
            showMessage("error", updateNewTask.message);
            eleMent.updateTaskForm.reset()
        }
    })


async function deleteRender(){
    const id = getTaskId;
    if (!id) {
        renderWarning("Please enter a task ID");
        return;
    }

    const response = await deleteTask(id);
    if (!response.success) {
        showMessage("error", response.message);
        return;
    }

    const data = response.data;

    if (data.success) {
        showMessage("success", data.message);

        // Refresh task to show new update
        await showTasks()
        // Clear Details dashboard
        eleMent.selectedRenderArea.classList.remove("activate");
        hideTaskDetails()
        // Activate home dashboard
        showHome()
    } else {
        showMessage("error", data.message);
    }
}

async function notification() {
    const response = await checkReminders();
    if (!response.success) {
        showMessage("error", response.message);
        return;
    }
    const data = response.data;

    if (data.success) {
        renderReminders(data.data, eleMent.notificationArea);
    } else {
        showMessage("error", data.message);
    }
}

eleMent.deleteTaskBTN.addEventListener("click", deleteRender);

eleMent.notificationLink.addEventListener("click", async () => {
    hideTaskDetails()
    hideHome()
    showNotifications()
    await notification();
});

eleMent.backBTN.addEventListener("click",  () => {
    hideTaskDetails()
    showHome()
});

eleMent.notifBackBTN.addEventListener("click",  () => {
    showHome()
    hideNotifications()
});

eleMent.updateTaskBTN.addEventListener("click", () =>
    showUpdateTaskForm()
);

eleMent.exitBTN.addEventListener("click", () =>
    hideUpdateTaskForm()
);

eleMent.confirmBTN.addEventListener("click", () =>
    hideInfoContainer()
);