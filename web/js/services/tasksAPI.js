import {failResponse, successResponse} from "../utilities/helpers.js";

const API_URL = 'http://localhost:5100/tasks';

export async function addTask(newTask) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        const data = await response.json();
        console.log(data);
        return successResponse("Task added successfully", data);

    } catch (error) {
        console.error("Failed to add task:", error);
        return failResponse("ERROR: Failed to add task. Please check your Network and try again");
    }
}

export async function deleteTask(id) {
    try{
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
        return successResponse("Task deleted successfully", data);
    } catch (error) {
        console.error("Failed to delete task:", error);
        return failResponse("ERROR: Failed to delete task. Please check your Network and try again");
    }
}

export async function updateTask(id, newTask) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTask)
        });
        const data = await response.json();
        console.log(data);
        return successResponse("Task updated successfully", data);
    } catch (error) {
        console.error("Failed to update task:", error);
        return failResponse("ERROR: Failed to update task. Please check your Network and try again");

    }
}

export async function getTasks() {
    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        return successResponse("Tasks fetched successfully", data);
    } catch (error) {
        console.error("Failed to fetch tasks:", error);
        return failResponse("ERROR: Failed to fetch tasks. Please check your Network and try again");
    }
}

export async function getTask(id) {
    try{
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        console.log(data);
        return successResponse("Task fetched successfully", data);
    } catch (error) {
        console.error("Failed to fetch task:", error);
        return failResponse("ERROR: Failed to fetch task. Please check your Network and try again");
    }
}

export async function checkReminders(){
    try{
        const response = await fetch(`${API_URL}/reminders`);
        const data = await response.json();
        console.log(data);
        return successResponse("Reminders fetched successfully", data);
    }catch(error){
        console.error("Failed to fetch reminders:", error);
        return failResponse("ERROR: Failed to fetch reminders. Please check your Network and try again");
    }
}
