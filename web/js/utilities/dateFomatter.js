// extract year,  month, day, hours, and minutes from date time object. Returns dictionary of the same
function datesExtractors (dateObject) {
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-11
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');

    return {
        "year": year,
        "month": month,
        "day": day,
        "hours": hours,
        "minutes": minutes
    }
}

// format date and time to string for api
export function formatDateTime(dateTimeString) {
    const date = datesExtractors(new Date(dateTimeString));

    return  `${date.year}-${date.month}-${date.day} ${date.hours}:${date.minutes}`;
}

export function formatTimestamp(timestampString) {
    const date = datesExtractors(new Date(timestampString * 1000));
    const currentYear = new Date().getUTCFullYear();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = months[Number(date.month) - 1];
    let formattedDate = `${month} ${date.day}`;

    if (date.year !== currentYear) {
        formattedDate += `${formattedDate} -${date.year}`;
    }

    const formattedTime = `${date.hours}:${date.minutes}`;
    return `${formattedDate}, ${formattedTime}`;
}