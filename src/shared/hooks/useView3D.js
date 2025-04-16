import Map from "@arcgis/core/Map.js";
import { center, zoom } from "../static/StaticMapData";
import SceneView from "@arcgis/core/views/SceneView";
function useView3D(viewRef, basemap = "streets-vector", ...layers) {
    let map = new Map({
        basemap,
    });
    map.addMany(layers);
    let view3D = new SceneView({
        map,
        container: viewRef.current,
        center,
        zoom,
        ui: {
            components: [],
        },
    });

    return { view3D };
}

export default useView3D;
