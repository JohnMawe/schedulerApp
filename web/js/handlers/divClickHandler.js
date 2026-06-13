export function handleTaskSelection(id) {
    console.log("SelectedID: " + id);
    if (id !==undefined && id !== " " && id !== null) {
        return id;
    }
    return null;
}