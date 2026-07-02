import {eleMent} from "./uiElements.js";

export function showHome() {
    eleMent.tasksContainer.classList.remove("deactivate");
}

export function hideHome() {
    eleMent.tasksContainer.classList.add("deactivate");
}

export function showTaskDetails() {
    eleMent.selectedRenderArea.classList.add("activate");
}

export function hideTaskDetails() {
    eleMent.selectedRenderArea.classList.remove("activate");
}

export function showNotifications() {
    eleMent.notificationContainer.classList.add("activate");
}

export function hideNotifications() {
    eleMent.notificationContainer.classList.remove("activate");
}

export function showUpdateTaskForm() {
    eleMent.updateTaskFormClass.classList.add("activate")
}

export function hideUpdateTaskForm() {
    eleMent.updateTaskFormClass.classList.remove("activate");
}

export function toggleAddTaskForm() {
    eleMent.addTaskFormClass.classList.toggle("activate");
}

export function showInfoContainer() {
    eleMent.infoContainer.classList.add("activate");
}

export function hideInfoContainer() {
    eleMent.infoContainer.classList.remove("activate");
}