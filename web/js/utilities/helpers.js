export function failResponse(message) {
    return { success: false, message: message };
}

export function successResponse(message, data = null) {
    return { success: true, message: message, data: data };
}