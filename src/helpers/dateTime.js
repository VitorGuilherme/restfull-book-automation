function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function dateTime() {
    const today = new Date();
    const checkin = formatDate(today);
    const checkout = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));

    return `${checkin} - ${checkout}`;
}

export function dateTimeThreeDays() {
    const today = new Date();
    const checkin = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
    const checkout = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4));

    return `${checkin} - ${checkout}`;
}