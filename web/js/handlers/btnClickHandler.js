import {addTask,   updateTask} from "../services/tasksAPI.js";
import {formatDateTime} from "../utilities/dateFomatter.js";

export async function handleSaveAction(title, start, end, note, reminder) {
    const newTask = {
        title: title,
        start: formatDateTime(start),
        end: formatDateTime(end),
        note: note,
        reminder: reminder
    };
    return await addTask(newTask);
}

export async function handleUpdateAction(id, taskTitle, starTime, endTime, taskNote) {
    // Clean data form - if the user leaves a field empty, it will be sent as null to the backend, which will keep the old value.
    let title = (!taskTitle) ? null : taskTitle;
    let start = (!starTime) ? null : formatDateTime(starTime);
    let end = (!endTime) ? null : formatDateTime(endTime);
    let note = (!taskNote) ? null : taskNote;
    console.log(title, start, end, note);

    const newTask = {
        title: title,
        start: start,
        end: end,
        note: note,
    }
    return await updateTask(id, newTask);
}

