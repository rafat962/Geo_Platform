function DataConvert(data) {
    const finalDate = new Date(data);
    if (finalDate instanceof Date && !isNaN(finalDate)) {
        return finalDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    }
    return ""; // Return an empty string if the date is invalid
}
// Helper function to convert hex to RGBA
function hexToRGBA(hex, alpha = 1) {
    // Remove the '#' from the hex string if it exists
    hex = hex.replace("#", "");

    // Convert the hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return the RGBA array
    return [r, g, b, alpha];
}
export { DataConvert, hexToRGBA };
