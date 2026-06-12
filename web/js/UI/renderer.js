export function renderTasks(tasks, renderArea) {
    renderArea.innerHTML = "";
    if (tasks.length === 0) {
        const paragraphElement = document.createElement("p");
        paragraphElement.innerText = "+ADD TASK";
        renderArea.append(paragraphElement);
        return;
    }
    for (const task of tasks) {
        const paragraphElement = document.createElement("p");
        paragraphElement.innerText = task;
        renderArea.append(paragraphElement);
    }
}

export function rendersSelectedTask(task, renderArea) {
    renderArea.innerHTML = "";
    const paragraphElement = document.createElement("p");
    paragraphElement.innerText = task;
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
