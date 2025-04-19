// Function to get today's date in YYYY-MM-DD format
// We explicitly type the return value as string.
export default function getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    // Month is 0-indexed, so add 1. Use String() and padStart for formatting.
    const month = String(today.getMonth() + 1).padStart(2, '0');
    // Pad single digits with a leading zero.
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};