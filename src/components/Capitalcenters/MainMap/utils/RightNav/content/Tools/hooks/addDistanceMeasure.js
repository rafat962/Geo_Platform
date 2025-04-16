import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D.js";
let LineMeasureWidget = null; // Keep a persistent reference

const addLineMeasure = (view, lineMeasure) => {
    if (lineMeasure) {
        if (!LineMeasureWidget) {
            LineMeasureWidget = new DistanceMeasurement2D({
                view: view,
            });
            view.ui.add(LineMeasureWidget, {
                position: "top-right",
            });
        }
    } else {
        if (LineMeasureWidget) {
            view.ui.remove(LineMeasureWidget); // Remove widget from UI
            LineMeasureWidget.destroy(); // Destroy widget to free memory
            LineMeasureWidget = null; // Reset reference
        }
    }
};

export default addLineMeasure;
