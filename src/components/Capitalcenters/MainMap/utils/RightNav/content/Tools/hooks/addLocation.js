import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";
let LocationWidget = null; // Keep a persistent reference

const addLocation = (view, location) => {
    if (location) {
        if (!LocationWidget) {
            LocationWidget = new CoordinateConversion({
                view: view,
            });
            view.ui.add(LocationWidget, "top-right");
        }
    } else {
        if (LocationWidget) {
            view.ui.remove(LocationWidget); // Remove widget from UI
            LocationWidget.destroy(); // Destroy widget to free memory
            LocationWidget = null; // Reset reference
        }
    }
};

export default addLocation;
