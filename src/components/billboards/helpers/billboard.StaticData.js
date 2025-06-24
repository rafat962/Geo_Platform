import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import esriConfig from "@arcgis/core/config.js";

const billboardsID = "60f26af44bd5498596232c7c6800bfe0";
const billboard_ContractsID = "f4588b25db6b41f49e28d41140328775";
// const billboardsID = "d4963f802e77468f8a290a8d3397fc7f";
// const billboard_ContractsID = "aa699dbd77844c66b09c5f331f0b30bf";

esriConfig.apiKey = JSON.parse(localStorage.getItem("LayerToken"));
const billboards = new FeatureLayer({
    portalItem: {
        id: billboardsID, // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const billboard_Contracts = new FeatureLayer({
    portalItem: {
        id: billboard_ContractsID, // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});

export { billboards, billboard_Contracts };
