export function toTitleCase(text) {
    return text
        .toLowerCase()
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

export function toSentenceCase(text) {
    if (!text) return "";

    text = text.trim().toLowerCase();

    return text.charAt(0).toUpperCase() + text.slice(1);
}