export function sanitizeUsername(e, username) {
    // Replace anything that's NOT a-z, 0-9, _ or .
    username.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g, "").toLowerCase();
}

export function sanitizePhone(e, phone) {
    // Only allow numbers and +
    phone.value = e.target.value.replace(/[^\d+]/g, "");
}
