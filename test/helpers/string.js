const formattedDate = new Date(Date.now()).toLocaleString("en-GB", {
    weekday: "short", // e.g., "Mon"
    year: "numeric",
    month: "short", // e.g., "Jan"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Set to true for AM/PM format
});

module.exports = {
    formattedDate,
};
