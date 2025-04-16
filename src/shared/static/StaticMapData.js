import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const layer = new FeatureLayer({
    portalItem: {
        id: "5f5a2fe774de40bc96d360d7feca07ef", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});

const center = [43, 18.5];
const zoom = 6;

// Function to apply labeling info to the layer once it is loaded
const applyLabelingInfo = (fieldInput) => {
    if (!fieldInput) return;
    // Wait for the layer to be fully loaded
    layer
        .load()
        .then(() => {
            // Define the labeling info
            const labelClass = {
                symbol: {
                    type: "text", // TextSymbol
                    color: "green",
                    borderLineColor: "green",
                    borderLineSize: 1,
                    yoffset: 5,
                    font: {
                        family: "Playfair Display",
                        size: 12,
                        weight: "bold",
                    },
                },
                labelPlacement: "above-center",
                labelExpressionInfo: {
                    expression: `$feature.${fieldInput}`, // Dynamically use the fieldInput
                },
            };
            // Apply the labeling info to the layer
            layer.labelingInfo = [labelClass];
            console.log("Labeling info applied to the layer.");
        })
        .catch((err) => {
            console.error("Error loading layer:", err);
        });
};

export { layer as PointsLayerService, center, zoom, applyLabelingInfo };
