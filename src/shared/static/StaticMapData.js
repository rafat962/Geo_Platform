import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriConfig from "@arcgis/core/config.js";
esriConfig.apiKey = JSON.parse(localStorage.getItem("LayerToken"));
const layer = new FeatureLayer({
    // url:"https://services9.arcgis.com/ONBxkqBd9gmR0qpr/arcgis/rest/services/T1_ExportFeatures/FeatureServer",
    portalItem: {
        id: "5f5a2fe774de40bc96d360d7feca07ef", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});

const layerUrl =
    "https://services9.arcgis.com/ONBxkqBd9gmR0qpr/arcgis/rest/services/T1/FeatureServer";

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
        })
        .catch((err) => {
            console.error("Error loading layer:", err);
        });
};

export {
    layer as PointsLayerService,
    center,
    zoom,
    applyLabelingInfo,
    layerUrl,
};
