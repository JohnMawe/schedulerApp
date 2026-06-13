const selectedRenderArea = document.querySelector(".selectedContainer");
const tasksContainer = document.querySelector(".tasksContainer");


export function renderTasks(tasks, renderArea, getTaskByID, getID) {
    renderArea.innerHTML = "";
    const buttonElement = document.createElement("button");
    buttonElement.innerText = "+ADD TASK";
    buttonElement.id = "addTaskBTN";
    buttonElement.className = "addTaskBTN";
    renderArea.append(buttonElement);

    for (const task of tasks) {
        const divElement = document.createElement("div");
        divElement.innerText = task.title;
        divElement.addEventListener("click", () => {
            getTaskByID(task.id);
            getID(task.id);
            selectedRenderArea.classList.add("activate");
            tasksContainer.classList.add("deactivate");
        })
        renderArea.append(divElement);
    }
}

export function rendersSelectedTask(task, renderArea) {
    renderArea.innerHTML = "";
    const paragraphElement = document.createElement("p");
    const headerElement = document.createElement("h3");
    headerElement.innerText = task.title;
    paragraphElement.innerText = task.note;
    renderArea.append(headerElement);
    renderArea.append(paragraphElement);
}

export function renderReminders(reminders, reminderArea) {
    if (reminders.length > 0) {
        reminderArea.innerText = "";
        for (const reminder of reminders) {
            const paragraphElement = document.createElement("p");
            paragraphElement.innerText = reminder;
            reminderArea.append(paragraphElement);
        }
    } else {
        const paragraphElement = document.createElement("p");
        paragraphElement.innerText = "Notification Unavailable";
        reminderArea.append(paragraphElement);
    }
}

export function renderError(error, errorCard) {
    console.log(error);
    errorCard.innerText = "";
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = error;
    errorCard.append(paragraphElement);
}

export function renderSuccess(message, successCard) {
    console.log(message);
    successCard.innerText = "";
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = message;
    successCard.append(paragraphElement);
}

export function renderWarning(message) {
    console.log(message);
    alert(message);
}
