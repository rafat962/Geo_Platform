import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point"; // Import Point geometry class

function useScrollToRecord(row = null, view, type) {
    if (!view) return;
    if (type === "scroll") {
        const record = row.geometry;
        // Correctly create a Point geometry with x and y
        const pointGeometry = new Point({
            x: record.x, // Use the geometry of the feature
            y: record.y, // Use the geometry of the feature
            spatialReference: { wkid: 4326 },
        });
        // Create a graphic using the Point geometry
        var pointGraphic = new Graphic({
            geometry: pointGeometry,
            symbol: {
                type: "simple-marker", // Change to 'simple-marker' for point symbol
                color: "red",
                size: 8,
            },
        });
        view.graphics.removeAll();
        // Add the graphic to the view's graphics layer
        view.graphics.add(pointGraphic);
        view?.goTo({
            center: [record?.x, record?.y],
            zoom: 15,
            duration: 1000, // Adjust the duration for animation (in milliseconds)
            easing: "ease-in-out", // You can change easing for different animation effects
        });
    } else {
        view.graphics.removeAll();
    }
}

export default useScrollToRecord;

// bad preformance example
// function useScrollToRecord(OBJECTID,view){
//     if(!view) return;
//     const layer = new FeatureLayer({
//         portalItem: {
//             id: "5f5a2fe774de40bc96d360d7feca07ef",
//         },

//     });
//     layer.queryFeatures({
//         where:`OBJECTID = ${OBJECTID}`,
//         returnGeometry:true,
//         outSpatialReference:{wkid:4326}
//     }).then((res)=>{
//         const record = res.features[0].geometry
//   // Correctly create a Point geometry with x and y
//         const pointGeometry = new Point({
//             x: record.x,  // Use the geometry of the feature
//             y: record.y,  // Use the geometry of the feature
//             spatialReference: { wkid: 4326 }
//         });

//         // Create a graphic using the Point geometry
//         var pointGraphic = new Graphic({
//             geometry: pointGeometry,
//             symbol: {
//                 type: 'simple-marker',  // Change to 'simple-marker' for point symbol
//                 color: "red",
//                 size: 8
//             }
//         });
//         view.graphics.removeAll()
//         // Add the graphic to the view's graphics layer
//         view.graphics.add(pointGraphic);
//         view?.goTo({
//             center:[record?.x,record?.y],
//             zoom:15,
//             duration: 1000, // Adjust the duration for animation (in milliseconds)
//             easing: "ease-in-out" // You can change easing for different animation effects
//         });
//     })
// }
