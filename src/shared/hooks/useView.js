import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map.js";
import Legend from "@arcgis/core/widgets/Legend";
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand.js";
import Home from "@arcgis/core/widgets/Home.js";
import Fullscreen from "@arcgis/core/widgets/Fullscreen.js";
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
    // --------------------------- add legend ---------------------------
    let LegendWidget = new Legend({
        view: view,
        id: "Legend",
    });
    const LegendExpand = new Expand({
        expandIcon: "legend", // see https://developers.arcgis.com/calcite-design-system/icons/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: view,
        content: LegendWidget,
    });
    view.ui.add(LegendExpand, {
        position: "bottom-right",
    });
    // --------------------------- LayerList ---------------------------
    const layerList = new LayerList({
        view: view,
    });
    const layerListExpand = new Expand({
        expandIcon: "layers", // see https://developers.arcgis.com/calcite-design-system/icons/
        // expandTooltip: "Expand LayerList", // optional, defaults to "Expand" for English locale
        view: view,
        content: layerList,
    });
    view.ui.add(layerListExpand, "top-right");
    // --------------------------- home ---------------------------
    const home = new Home({
        view,
    });
    view.ui.add(home, {
        position: "top-left",
    });
    // --------------------------- fullscreen ---------------------------
    const fullscreen = new Fullscreen({
        view,
    });
    view.ui.add(fullscreen, {
        position: "top-left",
    });
    return { view, map };
}

export default useView;
