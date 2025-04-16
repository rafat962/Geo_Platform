import AreaMeasurement2D from "@arcgis/core/widgets/AreaMeasurement2D";

let measureWidget = null; // Keep a persistent reference

const addAreaMeasure = (view, measure) => {
    if (measure) {
        if (!measureWidget) {
            measureWidget = new AreaMeasurement2D({
                view: view,
                id: "measure",
            });
            view.ui.add(measureWidget, {
                position: "top-right",
            });
        }
    } else {
        if (measureWidget) {
            view.ui.remove(measureWidget); // Remove widget from UI
            measureWidget.destroy(); // Destroy widget to free memory
            measureWidget = null; // Reset reference
        }
    }
};

export default addAreaMeasure;
