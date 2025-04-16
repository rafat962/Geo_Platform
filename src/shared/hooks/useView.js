import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map.js";
import { center, zoom } from "../static/StaticMapData";
function useView(viewRef3D, basemap = "streets-vector", ...layers) {
    let map = new Map({
        basemap,
    });
    map.addMany(layers);
    let view = new MapView({
        map,
        container: viewRef3D.current,
        center,
        zoom,
        ui: {
            components: [],
        },
    });

    return { view, map };
}

export default useView;
