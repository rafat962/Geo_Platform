import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map.js";
function useView(
    viewRef,
    zoom = 6,
    center = [43, 18.5],
    basemap = "streets-vector",
    ...layers
) {
    let map = new Map({
        basemap,
    });
    map.addMany(layers);
    let view = new MapView({
        map,
        container: viewRef.current,
        center,
        zoom,
        ui: {
            components: [],
        },
    });

    return { view, map };
}

export default useView;
