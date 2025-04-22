function formatDateTime(utcString) {
    if (!utcString) return "Invalid Date";

    // Convert UTC string to local time
    const localDate = new Date(utcString + "Z"); // Ensure it's treated as UTC

    if (isNaN(localDate.getTime())) return "Invalid Date";

    return localDate.toLocaleString(undefined, { 
        year: "numeric",
        month: "long",  // e.g., "March"
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit",
        hour12: true, // Use 12-hour format
    });
}

export default formatDateTime