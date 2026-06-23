export function dateTime() {
    const today = new Date();
    const checkin = today.toISOString().split('T')[0];
    const checkout = new Date(today.getTime() + 86400000).toISOString().split('T')[0];

    return `${checkin} - ${checkout}`;
}

export function dateTimeTomorrow() {
    const checkin = new Date(Date.now() + 86400000);
    const checkout = new Date(Date.now() + 86400000 * 3);
    return `${checkin.toISOString().split('T')[0]} - ${checkout.toISOString().split('T')[0]}`;
}