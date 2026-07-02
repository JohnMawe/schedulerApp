import {formatTimestamp} from "../utilities/dateFomatter.js";
import {hideHome, showTaskDetails} from "./navigation.js";
import {toSentenceCase, toTitleCase} from "../utilities/textFormatter.js";

export function renderTasks(tasks, renderArea, getTaskByID, getID) {
    renderArea.innerHTML = "";
    if (tasks.length === 0) {
        const paragraphElement = document.createElement("p");
        paragraphElement.innerText = "Click to Add Task";
        renderArea.append(paragraphElement);
    }

    for (const task of tasks) {
        const divElement = document.createElement("div");
        divElement.innerText = toTitleCase(task.title);
        divElement.addEventListener("click", () => {
            getTaskByID(task.id);
            getID(task.id);
            showTaskDetails()
            hideHome()
        })
        renderArea.append(divElement);
    }
}

export function rendersSelectedTask(task, ...renderArea) {
    renderArea[0].innerHTML = "";
    renderArea[1].innerHTML = "";
    renderArea[2].innerHTML = "";
    renderArea[3].innerHTML = "";
    const paragraphElement = document.createElement("p");
    const headerElement = document.createElement("p");
    const paragraphElement1 = document.createElement("p");
    const paragraphElement2 = document.createElement("p");
    headerElement.innerText = toTitleCase(task.title);
    paragraphElement.innerText = toSentenceCase(task.note);
    paragraphElement1.innerText = formatTimestamp(task.start_time);

    paragraphElement2.innerText = formatTimestamp(task.end_time);
    renderArea[0].append(headerElement);
    renderArea[1].append(paragraphElement);
    renderArea[2].append(paragraphElement1);
    renderArea[3].append(paragraphElement2);

}

export function renderReminders(reminders, reminderArea) {
    reminderArea.innerText = "";
    if (reminders.length > 0) {
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
