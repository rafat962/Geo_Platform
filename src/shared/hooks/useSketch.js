import Sketch from "@arcgis/core/widgets/Sketch.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference.js";
import * as projection from "@arcgis/core/geometry/projection.js";

function useSketch(view, map, searchParams, setSearchParams) {
    const gLayer = new GraphicsLayer();
    map.add(gLayer);
    const sketchVM = new Sketch({
        layer: gLayer,
        view,
        visibleElements: {
            createTools: {
                point: true,
                polyline: false,
                polygon: false,
                rectangle: false,
                circle: false,
            },
        },
    });
    // Listen to sketch widget's create event.
    sketchVM.on("create", function (event) {
        if (event.state === "complete") {
            let geometry = event.graphic.geometry;
            const wgs84SR = new SpatialReference({ wkid: 4326 });
            geometry = projection.project(geometry, wgs84SR);
            const customSymbol = {
                type: "simple-marker",
                style: "circle",
                color: "#ff0000",
                size: "12px",
                outline: {
                    color: "#ffffff",
                    width: 1,
                },
            };
            event.graphic.symbol = customSymbol;
            // use the graphic.geometry to query features that intersect it
            searchParams.set("x", geometry.x);
            searchParams.set("y", geometry.y);
            setSearchParams(searchParams);
            gLayer.removeAll();
            gLayer.add(event.graphic);
        }
    });
    view.ui.add(sketchVM, "top-right");
    sketchVM.create("point");
    return;
}

export default useSketch;
